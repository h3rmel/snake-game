export type {};
declare const self: ServiceWorkerGlobalScope;

const cacheName = "::hermelserviceworker";
const version = "v1.0.0";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(version + cacheName).then((cache) => {
      return cache.addAll(["/", "/offline"]);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key.indexOf(version) !== 0;
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;

  // Always fetch non-GET requests from the network
  if (request.method !== "GET") {
    event.respondWith(
      fetch(request).catch(function () {
        return caches.match("/offline");
      }) as Promise<Response>
    );
    return;
  }
});
