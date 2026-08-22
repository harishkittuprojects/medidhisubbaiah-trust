# Medidhisubbaiah Trust Website

A modern, responsive, and dynamic web application for **Medidhisubbaiah Trust** — a non-profit social-service organization dedicated to community welfare, free vocational training, emergency healthcare, educational support, and youth development.

---

## 🌿 Key Architecture & Features

- **Supabase Cloud Database Integration**:
  - Live data persistence for **Events**, **Media & News**, **Photo/Video Gallery**, **Services & Causes**, **Contact Inquiries**, and **Donation Records**.
  - Automatic cloud syncing with instant state reactivity and offline local storage fallback.
- **Cloudinary Media Storage (`mxpyrhmt`)**:
  - Direct authenticated uploads (SHA1 signature) for **Images**, **Full HD Videos**, and **PDF Press Releases & Reports**.
  - Built-in drag-and-drop uploader with real-time percentage upload progress bar.
- **Comprehensive Admin Portal (`/admin` or `#/admin`)**:
  - **Email & Password Authentication**: Secure access via demo credentials or Supabase Auth.
  - **Events Hub**: Create, Update / Edit, and Delete events with Cloudinary banner upload.
  - **Gallery & Video Hub**: Add, Update / Edit, and Delete photos & videos with Cloudinary media upload.
  - **Media & News Hub**: Publish, Edit, and Delete news articles with Cloudinary thumbnail and PDF document attachment.
  - **Services Hub**: Manage 9 core causes with details and progress.
  - **Inquiries Inbox**: Real-time submissions from contact forms.
  - **1-Click Supabase SQL Copier**: Instant schema copier for Supabase SQL Editor.
- **Visual Design**:
  - Emerald (`#059669`) & Deep Teal (`#0F6E6E`) theme with **Outfit** and **Inter** typography.
  - Live Marquee Announcement Ticker.
  - 24/7 Emergency Blood Helpline with pulsing indicators and quick-dial buttons.
  - Online Donation Modal with 80G tax exemption note & UPI one-click copy (`medidhisubbaiah@sbi`).

---

## 🚀 Running Locally

```bash
# Using Python
python -m http.server 3000

# Open in browser:
http://localhost:3000
```

---

## 🔑 Admin Portal Access

- **URL**: [http://localhost:3000/#/admin](http://localhost:3000/#/admin) or [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email / Username**: `admin@medidhisubbaiah.org`
- **Password**: `trust2026`
- *(Or click the **"Auto Fill"** button on the login screen)*

---

## 🗄️ Supabase Setup (One-Time SQL Setup)

1. Open your Supabase Dashboard: [https://plbdgerejabjrrqttlba.supabase.co](https://plbdgerejabjrrqttlba.supabase.co)
2. Go to **SQL Editor** on the left menu.
3. Open [`supabase_schema.sql`](./supabase_schema.sql) in this repo (or click **"Copy SQL Schema"** inside the Admin Portal).
4. Paste and click **Run**.
