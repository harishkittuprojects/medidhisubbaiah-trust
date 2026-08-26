# ===================================================================
# Medidhisubbaiah Trust - Integrated Local Server & SMTP API Handler
# ===================================================================
import http.server
import socketserver
import json
import os
import secrets
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, timezone, timedelta
import urllib.parse
import mimetypes

PORT = int(os.environ.get("PORT", 4000))

# Load .env variables if present
def load_env():
    env_vars = {}
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    v = v.strip().strip('"').strip("'")
                    env_vars[k.strip()] = v
    return env_vars

ENV = load_env()

SMTP_HOST = os.environ.get('SMTP_HOST', ENV.get('SMTP_HOST', 'smtp.gmail.com'))
SMTP_PORT = int(os.environ.get('SMTP_PORT', ENV.get('SMTP_PORT', '587')))
SMTP_USER = os.environ.get('SMTP_USER', ENV.get('SMTP_USER', 'medidhisubbaiahtrustorg@gmail.com'))
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', ENV.get('SMTP_PASSWORD', 'iwwvmlluazdbjgak')).replace(" ", "")
SMTP_FROM = os.environ.get('SMTP_FROM', ENV.get('SMTP_FROM', 'Medidhisubbaiah Trust <medidhisubbaiahtrustorg@gmail.com>'))
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', ENV.get('ADMIN_EMAIL', 'medidhisubbaiahtrustorg@gmail.com'))

# Local State storage
STATE_FILE = os.path.join(os.path.dirname(__file__), '.admin_auth_state.json')

def load_auth_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {"custom_password": None, "resets": {}}

def save_auth_state(state):
    try:
        with open(STATE_FILE, 'w', encoding='utf-8') as f:
            json.dump(state, f, indent=2)
    except Exception as e:
        print("Error saving auth state:", e)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class TrustServerHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        super().end_headers()

    def do_POST(self):
        url_path = urllib.parse.urlparse(self.path).path

        try:
            if url_path in ['/api/forgot-password', '/api/forgot_password']:
                self.handle_forgot_password()
                return
            elif url_path in ['/api/reset-password', '/api/reset_password']:
                self.handle_reset_password()
                return
            elif url_path in ['/api/verify-reset-token']:
                self.handle_verify_token()
                return
            elif url_path in ['/api/admin-auth-check']:
                self.handle_auth_check()
                return
            
            self.send_error(404, "Endpoint not found")
        except Exception as e:
            print(f"Error handling POST {url_path}:", e)
            self.send_json(500, {"success": False, "error": str(e)})

    def read_json_body(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                return {}
            post_data = self.rfile.read(content_length)
            return json.loads(post_data.decode('utf-8'))
        except Exception as e:
            print("Error parsing JSON:", e)
            return {}

    def send_json(self, status_code, data):
        response_bytes = json.dumps(data).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(response_bytes)))
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
        self.wfile.write(response_bytes)
        self.wfile.flush()

    def handle_forgot_password(self):
        data = self.read_json_body()
        email = data.get('email', ADMIN_EMAIL).strip().lower()
        if not email:
            email = ADMIN_EMAIL.lower()

        # Generate secure token and OTP
        token = secrets.token_hex(24)
        otp = str(secrets.randbelow(900000) + 100000)
        expires_at = (datetime.now(timezone.utc) + timedelta(minutes=30)).isoformat()

        # Save to local state
        state = load_auth_state()
        state.setdefault("resets", {})[token] = {
            "email": email,
            "otp": otp,
            "expires_at": expires_at,
            "used": False
        }
        save_auth_state(state)

        # Base URL construction
        host_header = self.headers.get('Host', f'localhost:{PORT}')
        origin = self.headers.get('Origin', f'http://{host_header}')
        base_url = origin.split('/#')[0].rstrip('/')
        reset_link = f"{base_url}/#/reset-password?token={token}&email={urllib.parse.quote(email)}"

        # Send Email via Gmail SMTP
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = '🔒 Reset Your Admin Password - Medidhisubbaiah Trust'
            msg['From'] = SMTP_FROM
            msg['To'] = email

            text_content = f"""Hello Administrator,

A password reset request was initiated for your Medidhisubbaiah Trust Admin Portal account ({email}).

Reset Link: {reset_link}
Security Code (OTP): {otp}

This link and security code will expire in 30 minutes.

If you did not request this reset, please ignore this email.

Medidhisubbaiah Trust Security Team
"""

            html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password - Medidhisubbaiah Trust</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9; color: #1e293b;">
  <div style="max-width: 580px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
    <div style="background: linear-gradient(135deg, #065f46 0%, #059669 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
      <h1 style="font-size: 22px; font-weight: 800; margin: 0 0 6px 0; color: #ffffff; letter-spacing: -0.5px;">Medidhisubbaiah Trust</h1>
      <p style="font-size: 13px; color: #a7f3d0; margin: 0;">Official Administrator Security Center</p>
    </div>
    <div style="padding: 32px 28px;">
      <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">Hello Administrator,</div>
      <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
        We received a request to reset the password for your <strong>Medidhisubbaiah Trust Admin Portal</strong> account (<code>{email}</code>).
      </p>
      
      <div style="text-align: center; margin: 28px 0;">
        <a href="{reset_link}" target="_blank" style="background: #059669; color: #ffffff !important; padding: 14px 32px; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; display: inline-block; box-shadow: 0 4px 14px rgba(5,150,105,0.35);">
          Reset Admin Password
        </a>
      </div>

      <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 12px; padding: 16px; text-align: center; margin: 20px 0;">
        <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Or Use 6-Digit One-Time Security Code</div>
        <div style="font-family: monospace; font-size: 26px; font-weight: 800; letter-spacing: 6px; color: #059669;">{otp}</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 8px;">⏳ This reset link and security code will expire in <strong>30 minutes</strong>.</div>
      </div>

      <p style="font-size: 12px; color: #64748b; margin-top: 24px;">
        If the button above does not work, copy and paste this link into your browser:<br/>
        <a href="{reset_link}" style="word-break: break-all; font-size: 11px; color: #059669;">{reset_link}</a>
      </p>

      <p style="font-size: 12px; color: #ef4444; margin-bottom: 0;">
        ⚠️ If you did not request a password reset, please ignore this email or contact trust management immediately.
      </p>
    </div>
    <div style="background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
      © {datetime.now().year} Medidhisubbaiah Trust. All rights reserved.<br/>
      Tanuku, Andhra Pradesh &amp; Hyderabad, Telangana
    </div>
  </div>
</body>
</html>"""

            msg.attach(MIMEText(text_content, 'plain'))
            msg.attach(MIMEText(html_content, 'html'))

            server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15)
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, [email], msg.as_string())
            server.quit()

            print(f"[SMTP] Successfully sent password reset email to: {email}")
            self.send_json(200, {
                "success": True,
                "message": f"Password reset instructions sent to {email}",
                "resetToken": token,
                "expiresAt": expires_at
            })
        except Exception as err:
            print(f"[SMTP Error] Failed to send email: {err}")
            self.send_json(500, {
                "success": False,
                "error": f"Failed to send email: {str(err)}"
            })

    def handle_reset_password(self):
        data = self.read_json_body()
        token = data.get('token', '').strip()
        new_password = data.get('newPassword', '').strip()
        email = data.get('email', ADMIN_EMAIL).strip().lower()

        if not new_password or len(new_password) < 6:
            self.send_json(400, {"success": False, "error": "Password must be at least 6 characters."})
            return

        state = load_auth_state()
        state["custom_password"] = new_password
        if token and token in state.get("resets", {}):
            state["resets"][token]["used"] = True
        save_auth_state(state)

        print(f"[Auth] Admin password successfully updated for {email}")
        self.send_json(200, {
            "success": True,
            "message": "Admin password successfully updated! You can now login with your new password."
        })

    def handle_verify_token(self):
        data = self.read_json_body()
        token = data.get('token', '').strip()
        state = load_auth_state()
        record = state.get("resets", {}).get(token)

        if not record:
            self.send_json(404, {"success": False, "valid": False, "error": "Invalid or expired reset token."})
            return

        if record.get("used"):
            self.send_json(400, {"success": False, "valid": False, "error": "This reset link has already been used."})
            return

        self.send_json(200, {"success": True, "valid": True, "email": record.get("email")})

    def handle_auth_check(self):
        data = self.read_json_body()
        entered_password = data.get('password', '')
        state = load_auth_state()
        custom_pwd = state.get("custom_password")

        # If custom password is set, ONLY accept the custom password
        if custom_pwd:
            is_valid = (entered_password == custom_pwd)
        else:
            is_valid = (entered_password in ['trust2026', 'admin123'])

        self.send_json(200, {"success": True, "valid": is_valid})

def run_server():
    # Set proper MIME types
    mimetypes.add_type("application/javascript", ".js")
    mimetypes.add_type("text/javascript", ".jsx")
    mimetypes.add_type("application/json", ".json")

    handler = TrustServerHandler
    httpd = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), handler)
    print("==================================================")
    print(f"Medidhisubbaiah Trust Server Running on Port {PORT}")
    print(f"URL: http://localhost:{PORT}")
    print(f"SMTP Configured: {SMTP_HOST}:{SMTP_PORT} ({SMTP_USER})")
    print("==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()

if __name__ == '__main__':
    run_server()
