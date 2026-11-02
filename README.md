# Vetted Doors: static marketing site (draft)

Plain HTML, CSS and JS with no build step. Files: `index.html`, `assets/styles.css`, `assets/site.js`, `assets/favicon.svg`.

## Run it locally
    cd /workspace/vetted-doors && python3 -m http.server 8765

## Easy edits
- **Brand name, tagline, prices, email, brokerage name:** edit `window.SITE_CONFIG` at the top of `index.html`.
  Elements marked `data-cfg="..."` are filled in from it. The HTML defaults match the config, so if you
  rename the brand, also do a find-and-replace of "Vetted Doors" in `index.html` so the page reads correctly with JS off.
- **Colors and fonts:** edit the `:root` variables at the top of `assets/styles.css`.
- **Brokerage:** replace `[Brokerage Name]` (in `SITE_CONFIG.brokerage` and in the footer HTML).

## Waitlist form: switching from mailto to Formspree
Right now `assets/site.js` stops the form submit and opens a pre-filled `mailto:hardeep@apas.ai`.
To collect submissions without relying on the visitor's email app:
1. Create a form at https://formspree.io and copy its endpoint, for example `https://formspree.io/f/abcdwxyz`.
2. In `index.html`, change the `<form id="joinForm" ...>` to
   `action="https://formspree.io/f/abcdwxyz" method="POST"` (remove `enctype="text/plain"`).
3. In `assets/site.js`, delete the `f.addEventListener('submit', ...)` block, or replace it with a
   `fetch(f.action, {method:'POST', body:new FormData(f), headers:{Accept:'application/json'}})`
   call that shows a thank-you message.
4. Optionally add a hidden honeypot: `<input type="text" name="_gotcha" style="display:none">`.

## Compliance notes (keep these when editing)
- Never call the service a "home inspection" or Hardeep a "home inspector". The screen is a desk review.
- Keep the footer disclosure: licensed P.E. and licensed real estate sales associate; dual role disclosed in writing;
  engineering fees billed separately and not contingent on closing; real estate services through the employing brokerage;
  deal figures are estimates, not investment advice.
- Do not add testimonials, statistics, license numbers or client counts unless they are real and verified.
- The sample deals come from /workspace/fl-deals/seen.csv (Nov 1, 2026 sweep) and will go stale. Refresh them or remove them before launch.

Screenshots: `shots/mobile.png` (390px), `shots/desktop.png` (1280px).
