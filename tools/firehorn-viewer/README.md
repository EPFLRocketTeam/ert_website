# Firehorn II 3D viewer

Small three.js viewer, used in two places:

- **Home page, "Our projects" block** (`layouts/shortcodes/our-projects.html`):
  `ERTFirehornViewer.mount()` — diagonal pose like the old picture, slow spin
  around the long axis, drag to spin.
- **Firehorn project page** (`{{< rocket-3d >}}`, `layouts/shortcodes/rocket-3d.html`):
  `ERTFirehornViewer.mountExplorer()` — orbit all around, zoom (pinch,
  Ctrl/Cmd + wheel, +/- buttons; a plain wheel keeps scrolling the page), pan
  (right-drag / two fingers), reset, fullscreen (fixed overlay on iPhone, where
  the Fullscreen API doesn't exist). Horizontal in wide boxes, vertical on phones.
  Optional params: `src`, `poster`, `title`.

What ends up on the site (all under `hugo/static/`, so Hugo copies them as-is):

| File | What | Size |
|---|---|---|
| `js/firehorn-viewer.min.js` | this viewer + the parts of three.js it uses (built from `src/`) | ~570 KB (~145 KB gzip) |
| `models/firehorn_ii.glb` | the model: outer shell only, ~29k triangles, Draco-compressed, 2048 px livery texture | ~640 KB |
| `vendor/draco/` | Draco decoder from three.js (`draco_decoder.wasm`, `draco_wasm_wrapper.js`) | ~250 KB |

Behaviour: the rocket is shown diagonally like the old picture and slowly spins
around its long axis; dragging spins it by hand. The files are only fetched when
the block is near the screen and the page has finished loading. The picture
`images/op/op_firehorn.webp` stays as the fallback (no WebGL, Save-Data / 2G,
load error). Rendering pauses when the block is off screen, the tab is hidden or
another project is hovered. With `prefers-reduced-motion` it does not spin on its own.

## Rebuild

```
cd tools/firehorn-viewer
npm install
npm run build    # -> hugo/static/js/firehorn-viewer.min.js
npm run draco    # -> hugo/static/vendor/draco/ (only needed when three.js is upgraded)
```

## Updating the model

The model comes from the engineering STEP (`310000_Firehorn_II_Structure.STEP`),
cleaned up in Blender: internal parts and fasteners removed, decimated, livery
baked into one texture, exported as glTF Binary (+Y up, nose up, meters,
Draco level 6). Replace `hugo/static/models/firehorn_ii.glb` with the new export
(keep it under ~2 MB). Pose, spin speed and framing are options of `mount()` in
`src/firehorn-viewer.js`.
