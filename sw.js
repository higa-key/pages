self.addEventListener('fetch', event => {

  console.log('sw:fetch');

  event.respondWith(
    caches.match(event.request.url).then(response => {
      console.log(response);
      return fetch(event.request.clone());
    })
  );
});