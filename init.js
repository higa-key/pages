if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pages/sw.js', {scope: '.'}).then((reg) => {

    console.log(
      reg.installing ? 'init:installing' : '',
      reg.waiting ? 'init:waiting' : '',
      reg.active ? 'init:active' : '',
    );

  }).catch(function (error) {
    console.log('init:error' + error);
  });
}