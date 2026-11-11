import { Resend } from 'resend';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Email service unconfigured on host.' });
  }

  const cleanName = escapeHtml(name.trim().slice(0, 100));
  const cleanEmail = escapeHtml(email.trim().slice(0, 100));
  const cleanMessage = escapeHtml(message.trim().slice(0, 2000)).replace(/\n/g, '<br/>');

  try {
    const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'rakibhassan.rh66@protonmail.com',
      replyTo: email.trim(),
      subject: `[Portfolio Inquiry] From ${cleanName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">New Portfolio Engineering Message</h2>
          <p style="font-size: 14px; color: #475569; margin: 4px 0;"><strong>Sender:</strong> ${cleanName} (&lt;${cleanEmail}&gt;)</p>
          <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; line-height: 1.6;">
            ${cleanMessage}
          </div>
          <p style="font-size: 11px; color: #94a3b8; margin-top: 24px;">Dispatched from rakibhassanrh66.github.io</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
