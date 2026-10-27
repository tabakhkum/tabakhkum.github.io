/* التطبيق انتقل: هذا الملف يلغي نفسه ويمسح الكاش القديم. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(x=>caches.delete(x)))).then(()=>self.registration.unregister()).then(()=>self.clients.matchAll({type:'window'})).then(cs=>cs.forEach(c=>{try{c.navigate('https://tabakhkum-provider.github.io/')}catch(e){}})))});
