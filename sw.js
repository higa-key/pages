const CACHE_NAME = 'v1';

self.addEventListener('install', event => {
  console.log('sw:install');

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('sw:activate');

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key === CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );

  event.waitUntil(self.clients.claim());

});

self.addEventListener('fetch', event => {
  console.log('sw:fetch', event.request.url);

  // レスポンスの横取り
  event.respondWith(
    // キャッシュ存在確認
    caches.match(event.request).then(response => {
      let res = response;

      // キャッシュなし
      if (!response) {
        res = fetch(event.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      }

      return res;
    })
  );
});
