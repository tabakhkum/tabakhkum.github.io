/* Tabakhkum: التطبيق يفتح بسرعة حتى لو الإنترنت ضعيف، والتحديث ما ينزل إلا بعد موافقة المستخدم. ما يخزّن الفيديوهات ولا بيانات الحسابات. */
const V='tk-v14';
const SHELL=['index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>{if(r&&r.ok)return c.put(u,r)}).catch(()=>{})))));
});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(u.pathname.indexOf('/provider')===0)return;
 if(r.mode==='navigate'){
  e.respondWith(caches.match('index.html',{cacheName:V}).then(m=>m||fetch(r).catch(()=>caches.match('index.html'))));
  return;
 }
 e.respondWith(caches.match(r,{ignoreSearch:true,cacheName:V}).then(m=>m||fetch(r)));
});
