// Ideas stolen from Raphael Marx

// DUMMY WORKER
// this.addEventListener('fetch', event => {
//   console.log('service worker handling', event.request.url)
//   event.respondWith(
//     // normal operation
//     fetch(event.request)
//   )
// }



// TROLL WORKER
// * curl localhost works fine
// * page load is buggered
// * fetch('/api/user/').then(r => r.text()).then(console.log)
// this.addEventListener('fetch', event => {
//   console.log('service worker handling', event.request.url)
//   event.respondWith(
//     // troll
//     new Response('didnt work lol')
//   )
// }



// CACHE AGGRESSIVELY
// this.addEventListener('fetch', event => {
//   console.log('service worker handling', event.request.url)
//   event.respondWith(
//     // Get network or cache
//     networkOrCache(event.request)
//   )

//   // Write to cache
//   console.log('adding request to cache')
//   event.waitUntil(addToCache(event.request))
// })

// const networkOrCache = request =>
//   fetch(request)
//   .catch(() => fromCache(request))

// const fromCache = request =>
//   caches.open('muh-cache')
//   .then(cache => cache.match(request))
//   .then(matching => matching)

// const addToCache = request =>
//   caches.open('muh-cache')
//   .then(cache => 
//     fetch(request)
//     .then(response => cache.put(request, response))
//   )


// PRECACHE
// * we're off the internet as well!
// * fetch('/api/user/').then(r => r.text()).then(console.log)
this.addEventListener('install', event =>
  event.waitUntil(precache())
)

const precache = () => 
  caches.open('pre-cache')
  .then(cache => cache.addAll([
    '{% url "offline" %}'
  ]))


this.addEventListener('fetch', event => {
  console.log('service worker handling', event.request.url)
  event.respondWith(
    // Get network or cache
    networkOrCache(event.request)
  )
})

const networkOrCache = request =>
  fetch(request)
  .catch(() => caches.open('pre-cache')
    .then(cache => cache.match('{% url "offline" %}'))
    .then(matching => matching)
  )
