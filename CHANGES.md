# healactive.in — SEO fixes (26 Oct 2026)

## Upload
Replace the 9 HTML files at the same paths, and add `robots.txt`, `sitemap.xml` and the 4 JPGs in `images/`. If the site already has a robots.txt, keep any rules it has and add the `Sitemap:` line.

## What changed
- **Canonicals and og:url** now point to healactive.in on every page (blog pages pointed to healactive.com).
- **Clean URLs** everywhere (`/about`, `/services#sports`, `/blogs/...`), matching what Google already indexes. Note: these won't resolve if you open files straight from disk (file://); they work on the live host.
- **Homepage**: title and meta say Ghatkopar West (were East); H1 now carries "Physiotherapy Clinic in Ghatkopar West, Mumbai" above the tagline; experience 4+ years; superlatives toned down; footer service links go to the right sections.
- **Placeholder contact details removed** from two blog posts (+91 98765 43210, info@healactive.com) and wrong Instagram/LinkedIn links fixed.
- **Footers**: full address linked to Google Maps on every page; keyword-stuffed line removed.
- **Structured data**: clinic (Physiotherapy/LocalBusiness) on home, Person on About, service catalogue on Services, breadcrumbs everywhere, blog schema corrected.
- **Social previews**: Open Graph/Twitter tags on every page; JPG share images replace SVGs.
- **Titles, H1s and meta descriptions** rewritten where they were missing a location or ran long.
- **Blog**: "Coming Soon" cards removed or replaced with real articles; contextual links to services; working share buttons; category label consistent.
- **Testimonials**: "All Reviews (47)" count removed (35 are shown); link to Google reviews added.
- **Services**: "Orthopedic Pain Management" renamed to match the menu; broken post-surgical sentence rewritten; related-article links added.
- **Thank-you page** set to noindex.
- **Google Analytics** now on every page (was homepage only), with phone and WhatsApp taps tracked as events and a `generate_lead` event on the thank-you page.

## After uploading
1. Search Console: submit `https://healactive.in/sitemap.xml`; request indexing for /services, /testimonials and the lower-back-pain post.
2. GA4 → Admin → Events: mark `phone_click`, `whatsapp_click` and `generate_lead` as key events.
3. If you own healactive.com, 301-redirect it to healactive.in.

## Still needs you
- **contactus.html** wasn't included — it needs the full address, hours, a location in the title, canonical and the GA tag.
- **Confirm** experience is 4+ years and the Google review count is 47+ (both now shown as such).
- **Add** your Maharashtra OT & PT Council registration number and certification issuers to About.
- Off-site items from the audit: Google Business Profile, Practo/Justdial listings, new service and blog pages.
