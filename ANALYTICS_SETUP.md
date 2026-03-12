# 📊 Analytics Setup Guide

Your site already has all the analytics code installed and ready to go! You just need to connect it to a free Google Analytics account to start seeing your visitor data.

---

## What You'll Be Able to See

Once set up, you'll have a free dashboard showing you:

- **Who's visiting** — how many people view your site each day, week, and month
- **Which pages are most popular** — home page, resume, case studies, etc.
- **Where visitors come from** — LinkedIn, Google searches, direct links
- **What people click** — LinkedIn button, GitHub, email, CTA buttons
- **How long they stay** — time spent on each page
- **What device they use** — mobile, tablet, or desktop

---

## One-Time Setup (Takes ~5 Minutes)

### Step 1 — Create a Free Google Analytics Account

1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Gmail/Google account (or create one for free)
3. Click **"Start measuring"**
4. Fill in your **Account name** (e.g., "Maggie Conboy Portfolio")
5. Click **Next**, then fill in your **Property name** (e.g., "maggieconboy.github.io")
6. Select your **Industry** (Business & Industrial → Consulting) and **Time zone**
7. Click **Next**, choose **Web** as your platform
8. Enter your website URL: `https://maggieconboy.github.io/Personal-Repo/`
9. Click **Create stream**

### Step 2 — Copy Your Measurement ID

After creating your stream, you'll see a **Measurement ID** that looks like: `G-A1B2C3D4E5`

Copy that ID.

### Step 3 — Update the ID in the Site

1. Open the file `js/analytics.js` in this repository
2. Find this line near the top (the exact ID value may be different):
   ```
   var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
   ```
3. Replace whatever is inside the quotes with your actual Measurement ID, for example:
   ```
   var GA_MEASUREMENT_ID = 'G-A1B2C3D4E5';
   ```
4. Save and commit the file

That's it! Analytics will be live within a few minutes of deploying.

---

## Viewing Your Analytics

Once set up, visit [analytics.google.com](https://analytics.google.com) anytime to see your data.

**Useful reports to check:**
- **Reports → Realtime** — see who's on your site right now
- **Reports → Acquisition → Traffic acquisition** — where visitors come from
- **Reports → Engagement → Pages and screens** — most visited pages
- **Reports → Engagement → Events** — button/link clicks tracked on your site

---

## What's Already Tracked Automatically

The analytics code installed on your site automatically tracks:

| Event | What it tracks |
|-------|---------------|
| Page views | Every page load on your site |
| `outbound_click` → LinkedIn | Clicks on your LinkedIn profile link |
| `outbound_click` → GitHub | Clicks on your GitHub profile link |
| `contact_click` → Email | Clicks on your email address |
| `cta_click` | Clicks on any CTA button (Connect, See Case Study, etc.) |
| `section_view` | When visitors scroll down to key sections |
| `time_on_page` | How long visitors spend on each page |

---

## Privacy Note

Google Analytics 4 collects anonymized, aggregated data. No personal information about your visitors is stored. If you'd prefer a cookie-free alternative, [Plausible](https://plausible.io) and [GoatCounter](https://www.goatcounter.com) are great privacy-focused options with similar setup steps.

---

*This guide was created by GitHub Copilot as part of the analytics implementation.*
