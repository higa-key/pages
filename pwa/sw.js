// // self.addEventListener('install', ev => ev.waitUntil(aaa()));
// // self.addEventListener('activate', ev => ev.waitUntil(aaa()));
// // // self.addEventListener('fetch', ev => ev.respondWith(onFetch(ev.request)));
// //
// // async function aaa() {
// //
// // }
//
// self.addEventListener('install', (e) => {
//   e.waitUntil(
//     caches.open('v1').then((cache) => {
//       // 画像をキャッシュ対象に追加
//       cache.addAll([
//         'https://robohash.org/1',
//         'https://robohash.org/2',
//         'https://robohash.org/3',
//         // ...
//       ])
//     })
//   )
// });
//
// // ネットワークリクエスト時に呼び出される
// self.addEventListener('fetch', (e) => {
//   e.respondWith(caches.match(e.request).then(response => response ? response : fetch(e.request)))
// });