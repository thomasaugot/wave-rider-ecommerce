if (!self.define) {
  let registry = {};
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      new Promise(resolve => {
        if ("document" in self) {
          const script = document.createElement("script");
          script.src = uri;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          nextDefineUri = uri;
          importScripts(uri);
          resolve();
        }
      }).then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require,
    };
    registry[uri] = Promise.all(depsNames.map(depName => specialDeps[depName] || require(depName)))
      .then(deps => {
        factory(...deps);
        return exports;
      });
  };
}

define(['./workbox-631a4576'], (function (workbox) {
  'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();

  // Cache the start URL
  workbox.registerRoute("/", new workbox.NetworkFirst({
    cacheName: "start-url",
    plugins: [{
      cacheWillUpdate: async ({ response }) => response && response.type === "opaqueredirect"
        ? new Response(response.body, {
            status: 200,
            statusText: "OK",
            headers: response.headers,
          })
        : response,
    }],
  }), 'GET');

  // Cache all other pages with a NetworkFirst strategy
  workbox.registerRoute(/.*/i, new workbox.NetworkFirst({
    cacheName: "default-cache",
    plugins: [],
    fetchOptions: {
      mode: 'cors',
      credentials: 'same-origin',
    },
  }), 'GET');

  // Offline fallback handling
  workbox.routing.setCatchHandler(async ({ event }) => {
    console.log("Handling fallback for: ", event.request.url);
    switch (event.request.destination) {
      case 'document':
        // Serve offline.html when offline
        return caches.match('/offline.html');
      case 'image':
        // Optionally, serve a placeholder image when offline
        return caches.match('/images/offline-placeholder.png');
      case 'font':
        return caches.match('/fonts/fallback-font.woff2');
      default:
        return Response.error();
    }
  });

}));
