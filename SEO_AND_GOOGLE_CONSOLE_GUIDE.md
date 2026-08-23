# 🚀 Medidhisubbaiah Trust — SEO & Google Search Console Guide

This guide provides step-by-step instructions for verifying **Medidhisubbaiah Trust** in **Google Search Console**, submitting your **XML Sitemap**, enabling **Rich Snippets (JSON-LD Schemas)**, and maximizing local search rankings across Andhra Pradesh, Telangana, and all of India.

---

## 🌐 Official Production Domain
- **URL**: `https://www.medidhisubbaiahtrust.org`
- **Sitemap**: `https://www.medidhisubbaiahtrust.org/sitemap.xml`
- **Robots**: `https://www.medidhisubbaiahtrust.org/robots.txt`
- **Manifest**: `https://www.medidhisubbaiahtrust.org/site.webmanifest`

---

## 🌟 1. Google Search Console Setup (Step-by-Step)

### Step 1: Access Google Search Console
1. Open [Google Search Console](https://search.google.com/search-console).
2. Sign in with your official Google / Gmail account.

### Step 2: Add Your Domain Property
1. In the property dropdown on the top-left, click **"Add Property"**.
2. Select **"URL prefix"** and enter:
   ```text
   https://www.medidhisubbaiahtrust.org
   ```
3. Click **Continue**.

### Step 3: Verify Ownership (Two Easy Methods Provided)

#### Method A: HTML Tag (Recommended — 10 Seconds)
1. Under *Other verification methods*, expand **"HTML tag"**.
2. Copy the content inside the `content="..."` attribute (or copy the entire `<meta>` tag).
3. Open your **Medidhisubbaiah Admin Portal**:
   - Go to [http://localhost:3000/#/admin](http://localhost:3000/#/admin) or `https://www.medidhisubbaiahtrust.org/#/admin`
   - Log in and click the **"SEO & Google Console"** tab in the sidebar.
   - Paste your verification code in the **"Google Verification Code / Meta Content"** field.
   - Click **"Save & Apply Token"**.
4. Go back to Google Search Console and click **"Verify"**.

#### Method B: HTML File Upload
1. If you select the **HTML file** verification method in Search Console, Google will give you a file named like `google<hash>.html`.
2. Place that file in the root directory of this project or copy the token into [`google-site-verification.html`](./google-site-verification.html).
3. Click **"Verify"** in Google Search Console.

---

## 🗺️ 2. Submitting Your XML Sitemap

1. In Google Search Console, click **"Sitemaps"** on the left navigation menu.
2. In the **"Add a new sitemap"** box, type:
   ```text
   sitemap.xml
   ```
3. Click **Submit**.
4. Google will immediately queue and index all primary routes:
   - `https://www.medidhisubbaiahtrust.org/` (Home)
   - `https://www.medidhisubbaiahtrust.org/#/about` (About Us & Stewardship)
   - `https://www.medidhisubbaiahtrust.org/#/services` (Free Tailoring, Blood Helpline, Food Relief)
   - `https://www.medidhisubbaiahtrust.org/#/events` (Upcoming Drives & Convocations)
   - `https://www.medidhisubbaiahtrust.org/#/news` (Press Releases & Media Reports)
   - `https://www.medidhisubbaiahtrust.org/#/gallery` (Photo & Video Documentation)
   - `https://www.medidhisubbaiahtrust.org/#/contact` (24/7 Helpline & Inquiries)

---

## ⚡ 3. Requesting Immediate Google Indexing

1. At the top of Google Search Console, find the **"Inspect any URL in 'https://www.medidhisubbaiahtrust.org'"** search bar.
2. Enter: `https://www.medidhisubbaiahtrust.org/` and press **Enter**.
3. Once the check completes, click **"Request Indexing"**.
4. Googlebot will prioritize crawling and indexing within 24–48 hours.

---

## 📊 4. Structured Data & Schema.org Graphs (Built-in)

The website is pre-configured with rich JSON-LD Schema graphs in [`index.html`](./index.html) to display rich star snippets, phone dials, FAQs, and organization cards directly in Google Search:

| Schema Type | Purpose | Google Feature |
| :--- | :--- | :--- |
| **`NGO` / `NonProfitOrganization`** | Official entity knowledge graph, leadership, 80G tax status, and helpline | Google Knowledge Panel & Organization Card |
| **`FAQPage`** | 5 frequently asked questions on free tailoring, 24/7 blood network, and donations | Google Search Interactive Dropdown Accordions |
| **`WebSite`** | Site query definition and canonical discovery | Sitelinks Searchbox |
| **`BreadcrumbList`** | Clean hierarchical navigation path | Breadcrumb Trail in Search Results |
| **`PostalAddress` & Local Area** | Geographic targeting for Tanuku, West Godavari, Hyderabad, AP & Telangana | Google Maps & Local Pack Integration |

### Testing Structured Data:
- Open [Google Rich Results Test](https://search.google.com/test/rich-results?url=https%3A%2F%2Fwww.medidhisubbaiahtrust.org%2F)
- Enter your live domain to verify valid structured data with zero warnings.

---

## 🤖 5. Robots.txt and Crawler Control

The [`robots.txt`](./robots.txt) file is optimized for search engines:
- Explicitly **allows** crawling of all public assets, images (`leadership.webp`, `logo.png`), styles, scripts, and sitemaps.
- **Disallows** indexing of administrative URLs (`/admin`, `/#/admin`, `/login`) to protect security and preserve crawl budget.
- Points to `https://www.medidhisubbaiahtrust.org/sitemap.xml`.
