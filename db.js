// SW 念の為削除
navigator.serviceWorker.getRegistrations().then(registrations => {
  for (let registration of registrations) registration.unregister();
});

// 動画ファイルパス
const MP4_PATH = '/pages/sample1.mp4';

function dbConnect() {
  onMessage('DB 接続');
  const db = new Promise((resolve, reject) => {
    const request = window.indexedDB.open('v1', 1);
    request.onupgradeneeded = event => event.target.result.createObjectStore('videos', {
      keyPath: 'id',
      autoIncrement: true
    });
    request.onsuccess = event => resolve(event.target.result);
  });
  return db;
}

async function dbGet(id) {
  onMessage('DB 動画データ 検索');
  const db = await dbConnect();
  return new Promise((resolve, reject) => {
    const objectStore = db.transaction('videos').objectStore('videos');
    const request = objectStore.get(id);
    request.onsuccess = () => resolve(request.result);
  });
}

async function dbAdd(blob) {
  onMessage('DB 動画データ 格納');
  const db = await dbConnect();
  db.transaction(['videos'], 'readwrite')
    .objectStore('videos')
    .add({blob: blob});
}

// 動画ソースのセット
setVideoSrc(MP4_PATH);

async function setVideoSrc(path) {
  let dbFetch = await dbGet(1);
  let blob = null;

  if (!dbFetch) {
    onMessage('DB 動画データ なし');

    onMessage('動画データ ダウンロード');
    let mp4Blob = await fetch(path).then(response =>
      response.blob()
    );

    blob = mp4Blob;

    dbAdd(mp4Blob);
  } else {
    onMessage('DB 動画データ あり');

    blob = dbFetch.blob;
  }

  onMessage('動画データ VIDEO要素にセット');
  let mp4URL = URL.createObjectURL(blob);
  document.querySelector('video').src = mp4URL;
}

function onMessage(message) {
  $('#messages').append(`<p>${message}</p>`);
}