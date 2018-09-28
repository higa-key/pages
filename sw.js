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

  sendMessage(`リクエストに介入`);

  // レスポンスの横取り
  event.respondWith(
    // キャッシュ存在確認
    caches.match(event.request).then(response => {
      let res = response;
      let m = event.request.url.match(/.*\/pages\/(.*)/);
      const file_name = m[1];

      // キャッシュなし
      if (!response) {
        sendMessage(`${file_name} : Cache Storage あり`);

        res = fetch(event.request).then(response => {
          sendMessage(`${file_name} : ダウンロード`);
          return caches.open(CACHE_NAME).then(cache => {
            sendMessage(`${file_name} : Cache Storage に格納`);
            cache.put(event.request.url, response.clone());
            return response;
          })
        });
      } else {
        sendMessage(`${file_name} : Cache Storage なし`);
      }

      return res;
    })
  );
});

function sendMessage(message) {
  self.clients.matchAll().then(clients =>
    clients.forEach(client => client.postMessage({'message': message})));
}