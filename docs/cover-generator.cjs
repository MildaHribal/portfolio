/* eslint-disable @typescript-eslint/no-require-imports */
// Renders public/covers/*.webp from live-site screenshots (Playwright). Run from a folder holding the screenshots.
const {chromium}=require('playwright');
const D=__dirname+'/';
const css=`
*{box-sizing:border-box;margin:0}
body{width:1600px;height:1000px;overflow:hidden;position:relative;font-family:Inter,system-ui,sans-serif}
.win{position:absolute;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -20px rgba(0,0,0,.45),0 8px 18px -8px rgba(0,0,0,.3)}
.win .bar{height:34px;display:flex;align-items:center;gap:8px;padding:0 14px;background:#f1f1f1;border-bottom:1px solid #ddd}
.win .bar i{width:10px;height:10px;border-radius:50%;background:#cfcfcf;display:block}
.win .bar span{margin-left:14px;flex:1;max-width:340px;height:20px;border-radius:6px;background:#fff;font-size:12px;color:#666;display:flex;align-items:center;padding:0 10px}
.win img{display:block;width:100%}
.dark .bar{background:#1e1f22;border-color:#2c2d31}.dark .bar i{background:#3a3b40}.dark .bar span{background:#2a2b2f;color:#9a9a9a}
.phone{position:absolute;border-radius:58px;background:#0b0b0c;padding:12px;box-shadow:0 40px 70px -25px rgba(0,0,0,.6),0 10px 20px -10px rgba(0,0,0,.4),inset 0 0 0 2px #2a2a2c}
.phone img{display:block;width:100%;border-radius:46px}
.chip{position:absolute;border-radius:16px;overflow:hidden;box-shadow:0 30px 50px -18px rgba(0,0,0,.5);background:#fff}
.chip img{display:block}
`;
const covers={
 tynky:`<body style="background:#e889b5">
  <div class="win" style="left:60px;top:170px;width:1300px"><div class="bar"><i></i><i></i><i></i><span>tynkybordel.shop</span></div><img src="tynky.png"></div>
  <div class="phone" style="left:1170px;top:300px;width:370px"><img src="tynky-m.png"></div></body>`,
 budbuddy:`<body style="background:#123524">
  <div class="phone" style="left:170px;top:230px;width:400px"><img src="bb-plant.png"></div>
  <div class="phone" style="left:1030px;top:230px;width:400px"><img src="bb-AI.png"></div>
  <div class="phone" style="left:570px;top:110px;width:460px"><img src="budbuddy.png"></div></body>`,
 skinsmc:`<body style="background:#4e8a56">
  <div class="win" style="left:250px;top:170px;width:1300px"><div class="bar"><i></i><i></i><i></i><span>skinsmc.org</span></div><img src="skinsmc.png"></div>
  <div class="phone" style="left:70px;top:300px;width:370px"><img src="skinsmc-m.png"></div></body>`,
 mcip:`<body style="background:linear-gradient(180deg,#7fb6ec,#cfe4f7)">
  <div class="win" style="left:60px;top:170px;width:1300px"><div class="bar"><i></i><i></i><i></i><span>minecraftiplist.com</span></div><img src="mcip.png"></div>
  <div class="phone" style="left:1170px;top:300px;width:370px"><img src="mcip-m.png"></div></body>`,
 questie:`<body style="background:linear-gradient(135deg,#d6b8f5 0%,#9ec5f7 50%,#8ee8e0 100%)">
  <div class="win dark" style="left:60px;top:170px;width:1300px"><div class="bar"><i></i><i></i><i></i><span>questieapp.com</span></div><img src="questie-d.png"></div>
  <div class="phone" style="left:1170px;top:300px;width:370px"><img src="questie-mob.png"></div></body>`,
 dosmundos:`<body style="background:#3b2a20">
  <div class="win" style="left:80px;top:90px;width:780px;filter:grayscale(.5) brightness(.8)"><div class="bar"><i></i><i></i><i></i><span>Original site</span></div><img src="before.webp"></div>
  <div class="win" style="left:480px;top:320px;width:1060px"><div class="bar"><i></i><i></i><i></i><span>Concept redesign</span></div><img src="after-en.webp"></div></body>`,
 montana:`<body style="background:#8ad12e">
  <div class="win dark" style="left:120px;top:130px;width:1360px"><div class="bar"><i></i><i></i><i></i><span>montana.hribal.site</span></div><img src="montana.png"></div></body>`,
};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:2});
for(const [n,h] of Object.entries(covers)){ if(process.argv[2]&&process.argv[2]!==n) continue;
 require('fs').writeFileSync(D+'_c.html',`<html><head><style>${css}</style></head>${h}</html>`); await p.goto('file://'+D+'_c.html',{waitUntil:'load'});
 await p.waitForTimeout(300); await p.screenshot({path:`cover-${n}.png`}); console.log(n);}
await b.close();})();
