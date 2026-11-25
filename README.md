# AI Playground for Climate Action

An early version of the hands-on pieces for the AI Playground, part of The Engine
Room's AI Collaborative. Static HTML, CSS and JavaScript: no build step, no
dependencies, no external requests.

## Pages

| Page | What it is |
|---|---|
| `index.html` | Playground landing: what this is, the three lenses, the three stories |
| `petabencana.html` | PetaBencana walk-through (frugal): report a flood, then see it on the map |
| `floralebanon.html` | Taxonomy meets Tech walk-through (community-centered): the plant photo protocol |
| `ghana-crops.html` | Crop disease detection in Ghana walk-through (ecological): photo, diagnosis, confidence, expert |
| `comparison.html` | Large or small model comparison experiment: the design, not yet run |

The four earlier demo pages (`AI_chatbot.html`, `custom_tool.html`,
`interactive_learning.html`, `interactive_playgounds.html`) now redirect to
`index.html` so links already shared still land somewhere sensible.

## Example data

Everything inside the walk-throughs is synthetic example data, labeled as such on
the page. Each walk-through's data lives in `data/*.example.js`, loaded with a
plain script tag so pages also work when opened straight from disk. No
initiative data, images or screenshots are included; where those would go, the
page shows a 'to confirm with the initiative' note.

## Run locally

Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000

## Embedding in the Hub (Ghost)

Every page works standalone and inside an iframe. Add `?embed=1` to hide the
Playground's own navigation (this also happens automatically when a page is
framed). See `INTEGRATION.md` for snippets and sizing.

## Shared files

- `assets/playground.css`: all styles, including embed mode and narrow screens
- `assets/playground.js`: embed mode, iframe height messages, step navigation
- `assets/fonts/`: Roboto and Roboto Condensed, subset, Apache License 2.0
- `assets/ter-wordmark-navy.png`: The Engine Room wordmark
