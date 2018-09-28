if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pages/sw.js').then((reg) => {
    console.log(
      reg.installing ? 'init:installing' : '',
      reg.waiting ? 'init:waiting' : '',
      reg.active ? 'init:active' : '',
    );
  });

  navigator.serviceWorker.addEventListener('message', onMessage);
}

function onMessage(event) {
  $('#messages').append(`<p>${event.data.message}</p>`);
}