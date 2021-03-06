//This is the service worker with the Cache-first network

var CACHE = 'MathajiDaybookAdminApp';
var precacheFiles = [
		"./manifest.json",
		"./images/144.png",
		"./images/512.png",
		"./images/192.png",
		"./images/1024.png",
		"./images/96.png",
		"./css/bootstrap.min.css",
		"./js/jquery-3.3.1.slim.min.js",
		"./js/bootstrap.min.js",
		"./js/jquery.min.js",
		"https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.10.18/b-1.5.4/b-colvis-1.5.4/b-flash-1.5.4/b-html5-1.5.4/b-print-1.5.4/fc-3.2.5/fh-3.1.4/sc-1.5.0/datatables.min.css",
		"https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.10.18/b-1.5.4/b-colvis-1.5.4/b-flash-1.5.4/b-html5-1.5.4/b-print-1.5.4/fc-3.2.5/fh-3.1.4/sc-1.5.0/datatables.min.js",
    "./js/admin.js",
		"./table.php",
		"./admin.php",
		"./button.php",
    "./down.php",
    "./projectview.php"
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('Skip waiting on install');
    return self.skipWaiting();
  }));
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
  console.log('Claiming clients for current page');
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  if(evt.request.url.indexOf('update.php') == -1 && evt.request.url.indexOf('fetch.php') == -1 && evt.request.url.indexOf('shutdown.php') == -1){
		evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
		evt.waitUntil(update(evt.request));
  }
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cache to go to the server and get it
  return fetch(request).then(function(response){ return response});
}
