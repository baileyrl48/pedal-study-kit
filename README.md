# Pedal Schematic Study Kit

A pocket study app for learning to read guitar pedal schematics: flashcards, 10-question quizzes, a tap-to-find example overdrive schematic, and a "which end is which" guide for diodes, caps, transistors, chips, pots and jacks.

It's a single web page that installs to your phone's home screen and works offline. No accounts, no server, no Claude needed.

**Open it:** https://baileyrl48.github.io/pedal-study-kit/

## Put it on your phone

**iPhone (Safari):** open the link, tap the Share button, then **Add to Home Screen**.

**Android (Chrome):** open the link, tap the ⋮ menu, then **Add to Home screen** or **Install app**.

Open it once while online. After that it works with no connection.

## Your progress

Cards you mark "Got it" and your best quiz scores are saved on the phone itself (browser storage). They aren't uploaded anywhere, so they won't follow you to another device. Deleting the home-screen app or clearing Safari/Chrome website data erases them.

## Making changes

| File | What it is |
| --- | --- |
| `index.html` | The whole app: styles, card decks, schematic, logic |
| `sw.js` | Offline support |
| `manifest.webmanifest` | App name, colors and icon for the home screen |
| `icons/` | Home-screen and browser icons |

After editing, open `sw.js` and bump `VERSION` (for example `'v1'` to `'v2'`), then commit and push. GitHub Pages republishes in a minute or two. The phone picks up the new version the next time you open the app online; if it doesn't, close the app fully and reopen it.

To try it on your computer first:

```bash
python -m http.server 8765
```

Then open http://localhost:8765.
