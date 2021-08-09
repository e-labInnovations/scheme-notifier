const CACHE = "walleto-v1"
const offlineFallbackPage = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/variables.css",
  "/images/offline.png",
  "/offline.html",
  "https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css",
  "https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js",
  "https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js",
  "js/app.js",
  "js/icons.js",
  "js/main.js",
  "js/pages/Home.js",
  "js/pages/components/ItemCard.js",
  "js/pages/components/DetailedItemModal.js"
  ];

const self = this;

// Install stage sets up the index page (home page) in the cache and opens a new cache
self.addEventListener("install", function (event) {
  console.log("Install Event processing");
 
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("Cached offline page during install");

      if (offlineFallbackPage === "offline.html") {
        return cache.add(new Response("Update the value of the offlineFallbackPage constant in the serviceworker."));
      }
      
      return cache.addAll(offlineFallbackPage);
    })
  );
});
 
// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
 
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        console.log("Add page to offline cache: " + response.url);
 
        // If request was success, add or update it in the cache
        event.waitUntil(updateCache(event.request, response.clone()));
 
        return response;
      })
      .catch(function (error) {        
        console.log("Network request Failed. Serving content from cache: " + error);
        return fromCache(event.request);
      })
  );
});
 
function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return error page
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }
 
      return matching;
    });
  });
}
 
function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}

