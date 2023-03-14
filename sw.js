'use strict';

const Cache = 'kp-cache';

const ArchivosCache = [
  '/index.html',
  '/assets/img/1.JPG',
  '/assets/img/2.JPG',
  '/assets/img/3.JPG',
  '/assets/img/4.JPG',
  '/assets/img/5.JPG',
  '/assets/img/6.jpg',
  '/assets/img/7.jpg',
  '/assets/img/8.jpg',
  '/assets/img/9.jpg',
  '/assets/img/favicon.png',
  '/assets/img/apple-touch-icon.png',
  '/assets/img/nosotros.jpg',
  '/assets/img/footer-bg.jpg'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Instalado');
  evt.waitUntil(
      caches.open(Cache).then((cache) => {
        console.log('[ServiceWorker] pre-caching offline ¡hecho!');
        return cache.addAll(ArchivosCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activado');
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
      caches.open(Cache).then((cache) => {
        return cache.match(evt.request)
      })
  );
});

var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            randomNotification();
        }
    });
});

function randomNotification() {
  var randomItem = Math.floor(Math.random()*games.length);
  var notifTitle = games[randomItem].name;
  var notifBody = 'Creado por '+games[randomItem].author+'.';
  var notifImg = 'assets/img/logo.png';
  var options = {
      body: notifBody,
      icon: notifImg
  }
  var notif = new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}
