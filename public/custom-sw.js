// this code is a custom sw so that if user fills up forms and submits them, data is locally ccached and sent to server once conection is reestablished

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Intercept POST requests and cache them locally if offline
  if (request.method === 'POST') {
    event.respondWith(
      (async () => {
        const cache = await caches.open('offline-requests');
        try {
          const response = await fetch(request);
          return response;
        } catch (err) {
          const clonedRequest = request.clone();
          const body = await clonedRequest.json();
          await cache.put(request.url, new Response(JSON.stringify(body)));
          return new Response(JSON.stringify({ status: 'offline' }));
        }
      })()
    );
  }
});
