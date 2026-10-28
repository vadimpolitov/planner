const CACHE_NAME = "ritm-app-shell-v3";
const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/ritm-192.png",
  "./icons/ritm-512.png",
  "./icons/ritm-maskable-512.png",
  "./images/exercises/open-source/bench.png",
  "./images/exercises/open-source/biceps-curl.png",
  "./images/exercises/open-source/bulgarian-split-squat.png",
  "./images/exercises/open-source/cable-crunch.png",
  "./images/exercises/open-source/deadlift.jpg",
  "./images/exercises/open-source/goblet-squat.svg",
  "./images/exercises/open-source/dumbbell-bench-press.svg",
  "./images/exercises/open-source/one-arm-dumbbell-row.svg",
  "./images/exercises/open-source/dumbbell-romanian-deadlift.svg",
  "./images/exercises/open-source/barbell-hip-thrust.svg",
  "./images/exercises/open-source/incline-dumbbell-press.svg",
  "./images/exercises/open-source/incline-press.png",
  "./images/exercises/open-source/lateral-raise.png",
  "./images/exercises/open-source/leg-curl.png",
  "./images/exercises/open-source/pallof-press-sequence.svg",
  "./images/exercises/open-source/pallof-press.svg",
  "./images/exercises/open-source/pullup-commons.jpg",
  "./images/exercises/open-source/pullup-landscape.jpg",
  "./images/exercises/open-source/pullup.jpg",
  "./images/exercises/open-source/romanian-deadlift.png",
  "./images/exercises/open-source/row.svg.png",
  "./images/exercises/open-source/shoulder-press.png",
  "./images/exercises/open-source/squat.png",
  "./images/exercises/open-source/triceps-pushdown.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("ritm-app-shell-") && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then((response) => {
      if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", response.clone()));
      return response;
    }).catch(() => caches.match("./index.html")));
    return;
  }

  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
    return response;
  })));
});
