/**
 * lib/mailer.js
 * Nodemailer transport using Gmail SMTP.
 *
 * Required env variables (.env.local):
 *   GMAIL_USER=your_gmail@gmail.com
 *   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   ← Gmail App Password (not your normal password)
 *
 * How to get Gmail App Password:
 *   1. Google Account → Security → 2-Step Verification (enable it first)
 *   2. Then search "App passwords" → Create one for "Mail"
 *   3. Copy the 16-char password here
 */

import nodemailer from "nodemailer";

// Singleton transport (created once, reused)
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return transporter;
}

/**
 * Send an email.
 * @param {{ to: string, subject: string, html: string }} options
 */
export async function sendMail({ to, subject, html }) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("⚠️ Email not sent — GMAIL_USER or GMAIL_APP_PASSWORD missing in .env.local");
    return;
  }

  const transport = getTransporter();
  await transport.sendMail({
    from: `"Vuxion" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

// ── Email Templates ────────────────────────────────────────────────────────────

/**
 * HTML email sent to the USER who filled the contact form (auto-reply)
 */
export function userConfirmationEmail({ name }) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f7ff; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
        <tr><td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(79,70,229,0.10);">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 36px 40px; text-align: center;">
                <span style="display:inline-block; background:#fff; color:#4f46e5; font-size:22px; font-weight:900; padding: 8px 20px; border-radius: 10px; letter-spacing: 1px;">V Vuxion</span>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding: 36px 40px;">
                <h2 style="color: #1e1b4b; margin: 0 0 12px 0; font-size: 22px;">Hey ${name}! 👋</h2>
                <p style="color: #4b5563; line-height: 1.7; margin: 0 0 20px 0; font-size: 15px;">
                  Thanks for reaching out to <strong>Vuxion</strong>. We've received your message and one of our team members will get back to you within <strong>24 hours</strong>.
                </p>
                <div style="background: #f5f3ff; border-left: 4px solid #4f46e5; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                  <p style="margin: 0; color: #4f46e5; font-size: 14px; font-weight: 600;">In the meantime, feel free to explore our work!</p>
                </div>
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  Warm regards,<br/>
                  <strong style="color: #4f46e5;">The Vuxion Team</strong>
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background: #f9fafb; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} Vuxion, Noida, India · hello@vuxion.com</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * HTML email sent to the ADMIN when a new lead comes in
 */
export function adminAlertEmail({ name, email, message }) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f7ff; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
        <tr><td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(79,70,229,0.10);">
            <!-- Header -->
            <tr>
              <td style="background: #1e1b4b; padding: 24px 40px;">
                <p style="margin: 0; color: #a5b4fc; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">🔔 New Lead Alert</p>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding: 36px 40px;">
                <h2 style="color: #1e1b4b; margin: 0 0 24px 0; font-size: 20px;">You have a new contact form submission!</h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                      <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">Name</span><br/>
                      <span style="color: #111827; font-size: 16px; font-weight: 700;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                      <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">Email</span><br/>
                      <a href="mailto:${email}" style="color: #4f46e5; font-size: 15px;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">
                      <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">Message</span><br/>
                      <span style="color: #374151; font-size: 15px; line-height: 1.6;">${message}</span>
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 28px;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="display:inline-block; background:#4f46e5; color:#fff; padding:12px 28px; border-radius:10px; text-decoration:none; font-weight:700; font-size:14px;">
                    View in Admin Panel →
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}
