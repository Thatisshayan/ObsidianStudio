// Netlify Function: /api/contact  ->  /.netlify/functions/contact
// Handles lead capture for Obsidian Studio.
// - Validates input
// - Sends notification email via Resend
// - Optionally creates/updates a HubSpot contact (+ note, +deal)
// - Optionally forwards to a generic CRM webhook
// All integrations fail independently and silently - email always tries first.

const PACKAGE_VALUES = {
  starter: { label: "Starter Landing Page", value: 249 },
  business: { label: "Business Website", value: 475 },
  premium: { label: "Premium Multi-Page", value: 900 },
};

const MAX = {
  name: 120,
  email: 200,
  phone: 40,
  business: 160,
  link: 500,
  package: 40,
  timeline: 80,
  details: 4000,
  source: 200,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const clip = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function json(status, body) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { ok: false, error: "Method not allowed" });

  const ct = (event.headers["content-type"] || event.headers["Content-Type"] || "").toLowerCase();
  if (!ct.includes("application/json")) return json(415, { ok: false, error: "Unsupported content type" });

  let raw;
  try {
    raw = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  // Honeypot - bots fill hidden field
  if (raw.company_website && String(raw.company_website).trim() !== "") {
    return json(200, { ok: true });
  }

  const data = {
    name: clip(raw.name, MAX.name),
    email: clip(raw.email, MAX.email).toLowerCase(),
    phone: clip(raw.phone, MAX.phone),
    business: clip(raw.business, MAX.business),
    link: clip(raw.link, MAX.link),
    package: clip(raw.package, MAX.package).toLowerCase(),
    timeline: clip(raw.timeline, MAX.timeline),
    details: clip(raw.details, MAX.details),
    source: clip(raw.source, MAX.source) || "obsidianstudios.online",
    submittedAt: new Date().toISOString(),
    ip: event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"] || "",
  };

  if (!data.name) return json(400, { ok: false, error: "Name is required." });
  if (!EMAIL_RE.test(data.email)) return json(400, { ok: false, error: "Valid email is required." });
  if (!data.details) return json(400, { ok: false, error: "Please describe your project." });

  const pkgInfo = PACKAGE_VALUES[data.package] || { label: data.package || "Not specified", value: null };

  // ---------- Email via Resend ----------
  let emailStatus = "skipped";
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      const { Resend } = require("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.CONTACT_FROM_EMAIL || "Obsidian Studio <onboarding@resend.dev>";

      const html = `
        <div style="font-family:Inter,system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#0a0a0b;color:#f4f4f2;border-radius:14px">
          <h2 style="margin:0 0 16px;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;letter-spacing:.5px">New Obsidian Studio lead</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${[
              ["Name", data.name],
              ["Email", data.email],
              ["Phone", data.phone || "-"],
              ["Business", data.business || "-"],
              ["Current link", data.link || "-"],
              ["Package", pkgInfo.label],
              ["Timeline", data.timeline || "-"],
              ["Source", data.source],
              ["Submitted", data.submittedAt],
            ]
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:8px 12px;border-bottom:1px solid #222;color:#9d9d99;width:140px">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #222">${esc(v)}</td></tr>`
              )
              .join("")}
          </table>
          <h3 style="margin:24px 0 8px;font-size:14px;color:#9d9d99;text-transform:uppercase;letter-spacing:1.5px">Project details</h3>
          <div style="padding:16px;background:#101012;border-radius:10px;white-space:pre-wrap;line-height:1.6">${esc(data.details)}</div>
        </div>`;

      const text = [
        "New Obsidian Studio lead",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Business: ${data.business}`,
        `Link: ${data.link}`,
        `Package: ${pkgInfo.label}`,
        `Timeline: ${data.timeline}`,
        `Source: ${data.source}`,
        `Submitted: ${data.submittedAt}`,
        "",
        "Details:",
        data.details,
      ].join("\n");

      await resend.emails.send({
        from,
        to: [process.env.CONTACT_TO_EMAIL],
        replyTo: data.email,
        subject: `New lead - ${data.business || data.name} (${pkgInfo.label})`,
        html,
        text,
      });
      emailStatus = "sent";
    } catch (err) {
      console.error("Email error:", err && err.message ? err.message : "unknown");
      emailStatus = "failed";
    }
  }

  // ---------- HubSpot (optional) ----------
  let hubspotStatus = "skipped";
  if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    try {
      const { Client } = require("@hubspot/api-client");
      const hs = new Client({ accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN });

      const [firstname, ...rest] = data.name.split(" ");
      const lastname = rest.join(" ") || "";

      const props = {
        email: data.email,
        firstname,
        lastname,
        phone: data.phone || undefined,
        company: data.business || undefined,
        website: data.link || undefined,
        lifecyclestage: "lead",
      };

      let contactId;
      try {
        const created = await hs.crm.contacts.basicApi.create({ properties: props });
        contactId = created.id;
      } catch (e) {
        // Likely already exists - update via search
        const found = await hs.crm.contacts.searchApi.doSearch({
          filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: data.email }] }],
          limit: 1,
        });
        if (found.results && found.results[0]) {
          contactId = found.results[0].id;
          await hs.crm.contacts.basicApi.update(contactId, { properties: props });
        }
      }

      // Note
      if (contactId) {
        try {
          const noteBody =
            `Source: Obsidian Studio Website Form\n` +
            `Package: ${pkgInfo.label}\n` +
            `Timeline: ${data.timeline || "-"}\n` +
            `Current link: ${data.link || "-"}\n\n` +
            `Details:\n${data.details}`;
          await hs.crm.objects.notes.basicApi.create({
            properties: {
              hs_note_body: noteBody,
              hs_timestamp: Date.now().toString(),
            },
            associations: [
              {
                to: { id: contactId },
                types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }],
              },
            ],
          });
        } catch (e) {
          console.error("HubSpot note error:", e && e.message);
        }
      }

      // Deal
      if (contactId && process.env.HUBSPOT_CREATE_DEAL === "true") {
        try {
          await hs.crm.deals.basicApi.create({
            properties: {
              dealname: `Obsidian Studio Lead - ${data.business || data.name}`,
              amount: pkgInfo.value ? String(pkgInfo.value) : undefined,
              dealstage: "appointmentscheduled",
              pipeline: "default",
            },
            associations: [
              {
                to: { id: contactId },
                types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }],
              },
            ],
          });
        } catch (e) {
          console.error("HubSpot deal error:", e && e.message);
        }
      }

      hubspotStatus = contactId ? "synced" : "failed";
    } catch (err) {
      console.error("HubSpot error:", err && err.message ? err.message : "unknown");
      hubspotStatus = "failed";
    }
  }

  // ---------- Generic CRM webhook (optional) ----------
  if (process.env.CRM_WEBHOOK_URL) {
    try {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, package: pkgInfo.label, packageValue: pkgInfo.value }),
      });
    } catch (err) {
      console.error("CRM webhook error:", err && err.message ? err.message : "unknown");
    }
  }

  return json(200, { ok: true, email: emailStatus, hubspot: hubspotStatus });
};

