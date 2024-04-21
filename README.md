# workbox-offline-safari

There is a problem with `workbox.precaching` on `OSX Safari`/`iOS Safari`.
This code works perfectly fine on Chrome, but fails on `Safari`.

## Reproduction steps

1. Clone this repo.
2. Run `npx http-server .` in the root of the repo.
3. Open http://127.0.0.1:8080 in a **private** safari window, to avoid any cache-related artifacts.
4. Follow the instructions from the page in the browser.
