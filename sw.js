/* طباخكم: يخلي التطبيق يفتح حتى لو الإنترنت ضعيف. ما يخزّن الفيديوهات ولا بيانات الحسابات. */
const V='tk-v12';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);if(u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok&&r.mode==='navigate'){const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp)).catch(()=>{})}return res}).catch(()=>caches.match(r.mode==='navigate'?'index.html':r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));
});
