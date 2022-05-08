const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// install the SW
self.addEventListener('install', (ev) => {

    ev.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('cache opened');
            return cache.addAll(urlsToCache);
        })
    )
});

// listen for request
self.addEventListener('fetch', (ev) => {

    ev.respondWith(
        caches.match(ev.request)
        .then(() => {
            return fetch(ev.request)
            .catch(() => {
                return caches.match('offline.html')
            })
        })
    )
});

// activate SW
self.addEventListener('activate', (ev) => {

    const cacheList = [];
    cacheList.push(CACHE_NAME);

    ev.waitUntil(

        caches.keys()
        .then((names) => {
            
            Promise.all(
                names.map((name) => {
                    if(cacheList.includes(name)){
                        return caches.delete(name)
                    }
                })
            )
        })
    )
})

// listen for push notifications
self.addEventListener('push', (ev) => {

    const data = ev.data.json();

    self.registration.showNotification(data.title, {

        body: data.body,
        icon: data.icon
    })
})