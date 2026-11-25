# Integrating the Playground with the Hub (Ghost)

For the tech team. How to put each Playground page on the Hub, either embedded in a
Ghost post or linked from one, with copy-paste snippets and sizing notes.

Throughout, replace `https://PLAYGROUND-HOST` with the public address the app is
served from. It must be reachable without a login: Vercel preview URLs behind
Vercel's login will not load inside a Ghost page for visitors.

## Embed or link: when to choose which

Embed a walk-through when it is the hands-on heart of a story page: the visitor reads
the story and tries the piece without leaving the post. That is our recommendation for
the three story walk-throughs. Link out when the page is a destination in its own
right, or when the post will also go out as an email: email clients drop iframes and
scripts, so an embed simply disappears from a newsletter. That is our recommendation
for the landing page and the comparison page. Either way, **always put a plain link
next to an embed**, so the piece survives email, print and any reader whose browser
blocks the frame.

| Page | Recommendation | Fixed height if no resize script (desktop) |
|---|---|---|
| `petabencana.html` | Embed in the PetaBencana story post, plus link | 2200px |
| `floralebanon.html` | Embed in the Taxonomy meets Tech story post, plus link | 2300px |
| `ghana-crops.html` | Embed in the crop disease detection in Ghana story post, plus link | 1500px |
| `comparison.html` | Link (bookmark card or plain link) until results exist | 2500px if embedded |
| `index.html` | Link only; the Hub's own Playground page in Ghost is the real front door | 2000px if embedded |

## How embedding works on Ghost

- Use an **HTML card** in the Ghost editor for the iframe. Do not use the embed card:
  it only recognizes known media providers and will fall back to a bookmark card.
- Add `?embed=1` to the page address. This hides the Playground's own top bar, menu
  and footer so the walk-through sits cleanly in the post. Pages also switch to embed
  mode by themselves when framed; `?embed=0` forces the full layout.
- Pages flow at their natural height and never scroll sideways, down to 390px wide.
- Links inside an embedded page that lead elsewhere open in a new tab, so visitors do
  not lose their place in the post.
- The pages make no requests to other sites, set no cookies and collect nothing, so no
  consent banner or privacy setting is needed for the embed itself.
- **Test first.** Ghost's documentation does not say outright that the HTML card passes
  an iframe and a script through unchanged on every plan. One test post on the Hub
  instance settles it. Scripts do not run in the editor preview; check the published
  post.

## Sizing: the resize script (recommended)

Each page reports its height to the Ghost page every time it changes (for example when a
visitor moves to the next step), with this message:

```js
{ type: 'ter-playground:height', height: 1234 }
```

Paste this once into **Settings, Code injection, Site footer** (or into a single post's
code injection footer). It resizes any Playground iframe to fit its content, so there is
no scrollbar inside the frame:

```html
<script>
  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://PLAYGROUND-HOST') return;
    if (!e.data || e.data.type !== 'ter-playground:height') return;
    var frames = document.querySelectorAll('iframe[data-ter-playground]');
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) {
        frames[i].style.height = (e.data.height + 16) + 'px';
      }
    }
  });
</script>
```

Without the script, the iframe uses the fixed height in its `style` attribute (table
above) and scrolls inside itself when a step is taller, which is mostly on phones.
Heights measured on November 25, 2026 at a 720px column: the tallest step is about
2,160px (PetaBencana), 2,270px (Taxonomy meets Tech) and 1,440px (Ghana). On a phone
the tallest steps reach 2,600px to 3,300px, which is why the script is worth adding.

## Snippets, page by page

Paste each snippet into an HTML card. The paragraph under the iframe is the link
fallback; keep it.

### PetaBencana: 'Report a flood, then see it on the map' (embed)

```html
<iframe src="https://PLAYGROUND-HOST/petabencana.html?embed=1"
        title="Walk-through: report a flood, then see it on the map (example data)"
        data-ter-playground loading="lazy"
        style="display:block;width:100%;height:2200px;border:0;"></iframe>
<p><a href="https://PLAYGROUND-HOST/petabencana.html">Open the flood report walk-through in a new page</a></p>
```

### Taxonomy meets Tech: 'Photograph a plant so a model can learn from it' (embed)

```html
<iframe src="https://PLAYGROUND-HOST/floralebanon.html?embed=1"
        title="Walk-through: photograph a plant so a model can learn from it (example data)"
        data-ter-playground loading="lazy"
        style="display:block;width:100%;height:2300px;border:0;"></iframe>
<p><a href="https://PLAYGROUND-HOST/floralebanon.html">Open the plant photo walk-through in a new page</a></p>
```

Also put the walk-through's 'try it near you' checklist as plain text in the Ghost
post itself, so it survives in email and print.

### Crop disease detection in Ghana: 'From photo to diagnosis, confidence and an expert' (embed)

```html
<iframe src="https://PLAYGROUND-HOST/ghana-crops.html?embed=1"
        title="Walk-through: from photo to diagnosis, confidence and an expert (example data)"
        data-ter-playground loading="lazy"
        style="display:block;width:100%;height:1500px;border:0;"></iframe>
<p><a href="https://PLAYGROUND-HOST/ghana-crops.html">Open the crop diagnosis walk-through in a new page</a></p>
```

If the team later agrees to a 'try the app' link, put it in the Ghost post as a plain
link, not inside the walk-through, so it can change without touching the app.

### Comparison experiment (link)

Use a bookmark card with `https://PLAYGROUND-HOST/comparison.html`, or a plain link:

```html
<p><a href="https://PLAYGROUND-HOST/comparison.html">Large or small model: what does each cost? (experiment design, not yet run)</a></p>
```

Once results exist, rebuild the results table and chart natively in a Ghost post
(a table and an image). That is sturdier than embedding a static result.

### Landing page (link)

The Hub's own Playground page should be written in Ghost, so it uses Ghost's
navigation, tags and member settings, with each story post embedding its walk-through.
Link to the static landing only where a standalone entry point helps (reviews, demos,
links from outside the Hub):

```html
<p><a href="https://PLAYGROUND-HOST/index.html">AI Playground for Climate Action: all walk-throughs</a></p>
```

If you do embed it, use the PetaBencana pattern with `index.html?embed=1` and a height
of 2000px. Its story buttons will open in a new tab.

## Email and newsletters

If story posts go out by email, the iframe will be dropped. The link paragraph under
each embed is what email readers see. Ghost's workaround is a screenshot linked to the
page; if you use one, take it of our example-data page, never of an initiative's tool.

## Checklist before going live

- [ ] App served from a public address, not behind a login.
- [ ] One test post: the HTML card iframe renders on the published page.
- [ ] Resize script added in code injection, with the real `PLAYGROUND-HOST`, and
      tested on a phone.
- [ ] Every embed has its link paragraph.
- [ ] Each story post states which elements are still to confirm with the initiative,
      matching the notes in the walk-through.
