# service-worker-iframe-demo

This is an example repo to show https://stackoverflow.com/questions/61280142/how-can-a-parent-frame-call-skipwaiting-of-an-iframe-on-the-same-domain

I have two service workers attached to my website

```
/index.html --> loads in the main frame
/index.js --> registers both service workers and acts as a single page app
/service_worker.js
/game/index.html --> loads in an iframe on some "pages" of the single page app
/game/index.js --> app for the iframe
/game/service_worker.js
```

I use [`workbox`](https://developers.google.com/web/tools/workbox), but the question is probably not related to it.

Setup:

- `index.js` registers both `service_worker.js` workers, where `/game/service_worker.js` is registered with `{scope: "/game/"}`
- I load `/game/index.html` into an iframe (as I'm navigating the `/` scope).

Whenever the main `index.js` loads, I would like to find out if any of my service workers got updated either in the parent frame or the iframe. If any of them has a new version, then I would like to present a UI to the user to reload the main frame after calling `skipWaiting` on the refreshed service workers.

Seemingly, even if I change my code in `/game/*` and simply reload the main frame, Chrome thinks that the main service worker has changed, instead of the iframe service worker. Once I navigate to a page that loads the iframe, then Chrome thinks that both service workers have changed, even though only the iframe has.

As a result, as long as I don't open the iframe, I'm not able to run `skipWaiting` on it.

- Is it possible to set up two service workers with different scopes from a single javascript context?
- How can I watch for updates on both service workers without loading assets from their scope?
