const CACHE_NAME = 'snabba-lexin-v2';
const ASSETS = [
    './',
    './index.html',
    './games.html',
    './style.css',
    './games.css',
    './app.js',
    './games.js',
    './data.js',
    './wordConnectData.js',
    './wordConnectGame.js',
    './grammarData.js',
    './grammarGame.js',
    './flashcardsGame.js',
    './spellingGame.js',
    './wordWheelGame.js',
    './sentenceBuilderGame.js',
    './wordRainGame.js',
    './wordleGame.js',
    './missingWordGame.js',
    './pronunciationGame.js',
    './add.html',
    './add.js',
    './details.html',
    './details.js',
    './manifest.json',
    './icon.svg'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching assets');
                return cache.addAll(ASSETS);
            })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
    );
});
