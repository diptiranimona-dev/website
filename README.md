# बेदिका साहू मैम — वेबसाइट

Plain HTML + CSS + JavaScript. No installation or API keys.

## Run
1. Unzip the folder.
2. Double-click `index.html` (any modern browser).
   Optional local server: `python3 -m http.server 8000`, then open http://localhost:8000

Fonts (DM Sans, Noto Sans Devanagari) load from Google Fonts when online; the site falls back to system fonts offline.

## Structure
- `index.html`, `style.css`, `script.js`
- `assets/brand` logo, full poster, letterhead
- `assets/activities` training photos
- `assets/gallery` event photos
- `assets/newspaper` Dainik Bhaskar clippings (12-05-2026, 18-05-2026) and their photos
- `assets/people` portrait cropped from the office-bearers poster

## Editing
- Contact details: `#contact` section in `index.html`
- Add a gallery photo: copy an `<a class="g" data-lightbox data-group="gallery">` block, then add a grid class in `style.css`
