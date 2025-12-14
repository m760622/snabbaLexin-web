const CACHE_NAME = 'snabba-lexin-v3';
const STATIC_ASSETS = [
    './',
    './index.html',
    './games.html',
    './details.html',
    './add.html',
    './style.css',
    './games.css',
    './details-premium.css',
    './manifest.json',
    './icon.svg',
    './icon.png'
];

const DYNAMIC_ASSETS = [
    './db.js',
    './app.js',
    './games.js',
    './details.js',
    './add.js',
    './data.js',
    './utils.js',
    './wordConnectData.js',
    './wordConnectGame_v2.js',
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
    './js/lessonsData.js',
    './js/learn.js',
    './js/utils.js',
];

const ALL_ASSETS = [...STATIC_ASSETS, ...DYNAMIC_ASSETS];


// Install Event - Cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching all assets');
                return cache.addAll(ALL_ASSETS);
            })
            .then(() => {
                // Force the waiting service worker to become active
                return self.skipWaiting();
            })
    );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(
                    keys.filter((key) => key !== CACHE_NAME)
                        .map((key) => {
                            console.log('[SW] Deleting old cache:', key);
                            return caches.delete(key);
                        })
                );
            })
            .then(() => {
                // Take control of all pages immediately
                return self.clients.claim();
            })
    );
});

// Fetch Event - Cache First with Network Fallback strategy
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip external requests (fonts, analytics, etc.)
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version immediately
                    // Also fetch from network to update cache in background (Stale While Revalidate)
                    const fetchPromise = fetch(event.request)
                        .then((networkResponse) => {
                            // Only cache successful responses
                            if (networkResponse && networkResponse.status === 200) {
                                const responseClone = networkResponse.clone();
                                caches.open(CACHE_NAME)
                                    .then((cache) => {
                                        cache.put(event.request, responseClone);
                                    });
                            }
                            return networkResponse;
                        })
                        .catch(() => {
                            // Network failed, but we already returned cache
                            console.log('[SW] Network failed, using cache for:', event.request.url);
                        });

                    // Return cached response immediately
                    return cachedResponse;
                }

                // No cache, fetch from network
                return fetch(event.request)
                    .then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Network failed and no cache - return offline page if available
                        console.log('[SW] Network failed and no cache for:', event.request.url);
                        // For HTML requests, try to return the main page
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    // Handle notification request from main thread
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, body, icon, badge, tag, data } = event.data;

        self.registration.showNotification(title, {
            body: body,
            icon: icon || './icon.png',
            badge: badge || './icon.png',
            tag: tag || 'snabba-lexin-notification',
            data: data || { url: './' },
            vibrate: [100, 50, 100],
            requireInteraction: false
        }).then(() => {
            console.log('[SW] Notification shown:', title);
        }).catch(err => {
            console.error('[SW] Error showing notification:', err);
        });
    }
});

// Handle notification click - open the app
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked');
    event.notification.close();

    const urlToOpen = event.notification.data?.url || './';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                // Check if there's already a window open
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];
                    if (client.url.includes('snabbaLexin') || client.url.includes('index.html')) {
                        // Focus existing window
                        return client.focus();
                    }
                }
                // Open new window if none found
                return clients.openWindow(urlToOpen);
            })
    );
});

// Handle notification close (optional tracking)
self.addEventListener('notificationclose', (event) => {
    console.log('[SW] Notification closed');
});

// Handle Word of the Day notification
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_WOD_NOTIFICATION') {
        const { word, translation, wordId } = event.data;

        self.registration.showNotification('📚 Dagens Ord / كلمة اليوم', {
            body: `${word}\n${translation}`,
            icon: './icon.png',
            badge: './icon.png',
            tag: 'word-of-day',
            data: { url: `./details.html?id=${wordId}` },
            vibrate: [100, 50, 100],
            requireInteraction: false,
            actions: [
                { action: 'view', title: 'Visa / عرض' },
                { action: 'dismiss', title: 'Stäng / إغلاق' }
            ]
        }).then(() => {
            console.log('[SW] WOD Notification shown:', word);
        }).catch(err => {
            console.error('[SW] Error showing WOD notification:', err);
        });
    }
});

// Handle periodic background sync (if supported by browser)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'word-of-day-sync') {
        console.log('[SW] Periodic sync triggered for Word of Day');
        // This will be handled by the main page ReminderManager
    }
});
