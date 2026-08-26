// ===================================================================
// Medidhisubbaiah Trust - Admin Forgot Password API (Node / Vercel / Nodemailer)
// ===================================================================
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'medidhisubbaiahtrustorg@gmail.com',
    pass: (process.env.SMTP_PASSWORD || 'iwwvmlluazdbjgak').replace(/\s+/g, '')
  },
  tls: {
    rejectUnauthorized: false
  }
};

const SMTP_FROM = process.env.SMTP_FROM || 'Medidhisubbaiah Trust <medidhisubbaiahtrustorg@gmail.com>';

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { email } = req.body || {};
    const targetEmail = (email || 'medidhisubbaiahtrustorg@gmail.com').toLowerCase().trim();

    // Generate secure random reset token and 6-digit OTP
    const resetToken = crypto.randomBytes(32).toString('hex');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes

    // Determine base URL
    const origin = req.headers.origin || req.headers.referer || 'https://www.medidhisubbaiahtrust.org';
    const baseUrl = origin.replace(/\/+$/, '').split('/#')[0];
    const resetLink = `${baseUrl}/#/reset-password?token=${resetToken}&email=${encodeURIComponent(targetEmail)}`;

    // Optional Supabase DB insert if keys exist
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://plbdgerejabjrrqttlba.supabase.co';
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/admin_password_resets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            id: 'rst_' + Date.now(),
            email: targetEmail,
            token: resetToken,
            otp: otp,
            expires_at: expiresAt,
            used: false
          })
        });
      } catch (dbErr) {
        console.warn('Supabase token persistence notice:', dbErr.message);
      }
    }

    // Initialize Nodemailer Transporter
    const transporter = nodemailer.createTransport(SMTP_CONFIG);

    // HTML Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Medidhisubbaiah Trust</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9; color: #1e293b; }
          .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #065f46 0%, #059669 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .logo-badge { width: 64px; height: 64px; background: #ffffff; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
          .title { font-size: 22px; font-weight: 800; margin: 0 0 6px 0; color: #ffffff; letter-spacing: -0.5px; }
          .subtitle { font-size: 13px; color: #a7f3d0; margin: 0; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
          .paragraph { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
          .btn-container { text-align: center; margin: 28px 0; }
          .reset-btn { background: #059669; color: #ffffff !important; padding: 14px 32px; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; display: inline-block; box-shadow: 0 4px 14px rgba(5,150,105,0.35); }
          .otp-box { background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 12px; padding: 16px; text-align: center; margin: 20px 0; }
          .otp-code { font-family: monospace; font-size: 26px; font-weight: 800; letter-spacing: 6px; color: #059669; }
          .expiry-note { font-size: 12px; color: #64748b; margin-top: 8px; }
          .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
          .link-fallback { word-break: break-all; font-size: 11px; color: #059669; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Medidhisubbaiah Trust</h1>
            <p class="subtitle">Official Administrator Security Center</p>
          </div>
          <div class="content">
            <div class="greeting">Hello Administrator,</div>
            <p class="paragraph">
              We received a request to reset the password for your <strong>Medidhisubbaiah Trust Admin Portal</strong> account (<code>${targetEmail}</code>).
            </p>
            
            <div class="btn-container">
              <a href="${resetLink}" target="_blank" class="reset-btn">
                Reset Admin Password
              </a>
            </div>

            <div class="otp-box">
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Or Use 6-Digit One-Time Security Code</div>
              <div class="otp-code">${otp}</div>
              <div class="expiry-note">⏳ This reset link and security code will expire in <strong>30 minutes</strong>.</div>
            </div>

            <p class="paragraph" style="font-size: 12px; color: #64748b; margin-top: 24px;">
              If the button above does not work, copy and paste this link into your browser:<br/>
              <a href="${resetLink}" class="link-fallback">${resetLink}</a>
            </p>

            <p class="paragraph" style="font-size: 12px; color: #ef4444; margin-bottom: 0;">
              ⚠️ If you did not request a password reset, please ignore this email or contact the trust management immediately.
            </p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Medidhisubbaiah Trust. All rights reserved.<br/>
            Tanuku, Andhra Pradesh &amp; Hyderabad, Telangana
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: SMTP_FROM,
      to: targetEmail,
      subject: '🔒 Reset Your Admin Password - Medidhisubbaiah Trust',
      text: `Hello Administrator,\n\nClick the link below to reset your Medidhisubbaiah Trust Admin Portal password:\n${resetLink}\n\nSecurity OTP: ${otp}\n\nThis link will expire in 30 minutes.`,
      html: htmlContent
    });

    return res.status(200).json({
      success: true,
      message: `Password reset instructions sent to ${targetEmail}`,
      resetToken: resetToken // Also returned for instant local testing environments
    });

  } catch (error) {
    console.error('Error sending reset email:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send password reset email.'
    });
  }
};
