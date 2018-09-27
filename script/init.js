// register serviceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pwa/sw.js').then((reg) => {
    if(reg.installing) {
    console.log('sw:installing');
  } else if(reg.waiting) {
    console.log('sw:installed');
  } else if(reg.active) {
    console.log('sw:active');
  }
}).catch(function(error) {
    console.log('sw:error' + error);
  });
}