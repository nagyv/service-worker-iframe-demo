/* global self, workbox, precacheManifest */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
    event.ports[0].postMessage(true)
  }
})

workbox.precaching.precacheAndRoute(precacheManifest)