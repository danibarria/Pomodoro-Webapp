/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-cond-assign */
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
import { precacheAndRoute } from 'workbox-precaching'
import { Queue } from 'workbox-background-sync'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

precacheAndRoute(self.__WB_MANIFEST)

let backgroundSyncSupported = 'sync' in self.registration ? true : false
let createPostQueue = null

if (backgroundSyncSupported) {
  createPostQueue = new Queue('createPostQueue', {
    onSync: async ({ queue }) => {
      let entry
      while (entry = await queue.shiftRequest()) {
        try {
          await fetch(entry.request)
          const clients = await self.clients.matchAll({ type: 'window' })
          for (const client in clients) {
            client.postMessage({
              msg: 'offline-post-updated'
            })
          }
        } catch (error) {
          console.error('Replay failed for request', entry.request, error)

          await queue.unshiftRequest(entry)
          throw error
        }
      }
      console.log('Replay complete')
    }
  })
}

if (backgroundSyncSupported) {
  self.addEventListener('fetch', (event) => {
    if (event.request.url === 'https://danibarria.com.ar/pomodoro/public/tags/add' ||
      event.request.url === 'https://danibarria.com.ar/pomodoro/public/pomodoros' ||
      event.request.url === 'https://danibarria.com.ar/pomodoro/public/tags'
    ) {
      if (!self.navigator.onLine) {
        const promiseChain = fetch(event.request.clone())
          .catch(() => {
            return createPostQueue.pushRequest({ request: event.request })
          })
        event.waitUntil(promiseChain)
      }
    }
  })
}

/** cache css and javascript files */
registerRoute(({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources'
  })
)

registerRoute(
  ({ url }) => url.origin === 'https://danibarria.com.ar/pomodoro/public',
  new StaleWhileRevalidate()
)

registerRoute(
  ({ url }) => url.origin === self.location.origin &&
             url.pathname.startsWith('/js/'),
  new StaleWhileRevalidate()
)

registerRoute(
  new RegExp('^http'),
  new StaleWhileRevalidate()
)

registerRoute(
  new RegExp('^https:\/\/danibarria.com.ar\/pomodoro\/public'),
  new NetworkFirst(),
  'GET'
)

registerRoute(
  new RegExp('^https://fonts.'),
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)
