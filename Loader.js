// I AM NOT UNOBFUCATING THIS
// THIS IS FOR SAFETY - TRUST IT OR DONT
// README.MD FOR INFORMATION

(function () {
  if (window.__ccmpAlert && typeof window.__ccmpAlert.show === 'function') {
    window.customAlert = window.__ccmpAlert.show;
  } else {
    const host = document.getElementById('ccmp-alert-host') || (function () {
      const el = document.createElement('div');
      el.id = 'ccmp-alert-host';
      el.style.all = 'initial';
      document.documentElement.appendChild(el);
      return el;
    })();
    const shadow = host.shadowRoot || host.attachShadow({ mode: 'open' });

    const STYLE = `
      :host { all: initial; }
      .overlay {
        position: fixed; inset: 0; z-index: 2147483647;
        display: grid; place-items: center;
        background:
          radial-gradient(60vw 60vh at 20% 10%, rgba(155,93,255,.12), transparent 60%),
          radial-gradient(70vw 70vh at 80% 90%, rgba(111,125,255,.10), transparent 60%),
          rgba(10,10,20,.55);
        backdrop-filter: blur(10px);
        animation: fade-in .25s ease-out both;
      }
      .overlay.hide { animation: fade-out .2s ease-in both; }

      .scrim { position:absolute; inset:0; }

      .dialog {
        position: relative;
        width: min(480px, 92vw);
        border-radius: 16px;
        background: rgba(28,28,48,.55);
        border: 1px solid rgba(255,255,255,.18);
        box-shadow: 0 20px 60px rgba(0,0,0,.55), inset 0 0 1px rgba(255,255,255,.18);
        color: #e8ebff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, system-ui, sans-serif;
        overflow: clip;
        animation: pop-in .25s cubic-bezier(.22,1,.36,1) both;
      }
      .dialog.out { animation: pop-out .2s ease-in both; }

      .ring {
        pointer-events:none; position:absolute; inset:-1px; border-radius:inherit; 
        background: linear-gradient(120deg, rgba(111,125,255,.45), rgba(154,93,255,.45));
        filter: blur(10px); opacity:.35;
        mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        padding:1px; -webkit-mask-composite: xor; mask-composite: exclude;
      }

      .head {
        display:flex; align-items:center; gap:12px;
        padding:18px 20px 6px 20px;
      }
      .icon {
        width:28px; height:28px; flex:0 0 auto; display:grid; place-items:center;
        background: linear-gradient(135deg, rgba(111,125,255,.25), rgba(154,93,255,.25));
        border: 1px solid rgba(255,255,255,.18); border-radius:10px;
      }
      .title { font-weight:700; font-size:16px; letter-spacing:.2px; color:#f2f4ff; }

      .close {
        position:absolute; top:12px; right:12px;
        width:36px; height:36px;
        display:flex; align-items:center; justify-content:center;
        border-radius:10px; background: rgba(255,255,255,.06);
        border: 1px solid rgba(255,255,255,.12); cursor:pointer;
        transition: background .15s ease;
      }
      .close:hover { background: rgba(255,255,255,.1) }
      .close:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(111,125,255,.35); }
      .close svg { display:block; width:18px; height:18px; }

      .body { padding: 6px 20px 16px 20px; }
      .message { margin:0; line-height:1.6; font-size:15.5px; color:#e8ebff; text-shadow:0 1px 0 rgba(0,0,0,.25); }

      .actions {
        display:flex; gap:10px; justify-content:flex-end;
        padding: 12px; background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0));
        border-top: 1px solid rgba(255,255,255,.08);
      }
      .btn {
        appearance: none; border:none; cursor:pointer;
        padding:12px 16px; border-radius:12px; font-weight:600; font-size:14px;
        transition: transform .12s ease, box-shadow .2s ease, background .2s ease, filter .2s ease;
        box-shadow: 0 8px 24px rgba(0,0,0,.25);
      }
      .btn:active { transform: translateY(1px) scale(.995) }
      .btn:focus-visible { outline:none; box-shadow: 0 0 0 3px rgba(111,125,255,.35); }
      .btn.ghost { color:#e8ebff; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); }
      .btn.ghost:hover { background: rgba(255,255,255,.10) }
      .btn.primary { color:white; background: linear-gradient(135deg, #6f7dff, #9a5dff); background-size:200% 200%; animation: shine 4s linear infinite; }
      .btn.primary:hover { filter: brightness(1.05); }

      @keyframes fade-in { from { opacity:0 } to { opacity:1 } }
      @keyframes fade-out { from { opacity:1 } to { opacity:0 } }
      @keyframes pop-in  { from { transform: translateY(12px) scale(.96); opacity:0 } to { transform: translateY(0) scale(1); opacity:1 } }
      @keyframes pop-out { from { transform: translateY(0) scale(1); opacity:1 } to { transform: translateY(-8px) scale(.96); opacity:0 } }
      @keyframes shine   { 0%{background-position:0% 50%} 100%{background-position:100% 50%} }
      @media (prefers-reduced-motion: reduce) {
        .overlay, .dialog, .btn, .close { animation: none !important; transition: none !important; }
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = STYLE;
    shadow.appendChild(styleEl);

    function trapFocus(container) {
      const SEL = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      function keydown(e) {
        if (e.key !== 'Tab') return;
        const list = Array.from(container.querySelectorAll(SEL)).filter(el => !el.hasAttribute('disabled'));
        if (!list.length) return;
        const first = list[0], last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
      container.addEventListener('keydown', keydown);
      return () => container.removeEventListener('keydown', keydown);
    }

    function buildIcon() {
      const span = document.createElement('span');
      span.className = 'icon';
      span.setAttribute('aria-hidden', 'true');
      span.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="ccmp_g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#B69CFF"/>
              <stop offset="100%" stop-color="#7C8BFF"/>
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="9" stroke="url(#ccmp_g1)" stroke-width="2" fill="rgba(255,255,255,.06)"/>
          <path d="M12 7.5v7" stroke="url(#ccmp_g1)" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="17" r="1" fill="url(#ccmp_g1)"/>
        </svg>
      `;
      return span;
    }

    function show(message, opts = {}) {
      const {
        title = 'CC-MP Loader',
        okText = 'Okay!',
        copyText = 'Copy info',
        dismissOnOverlay = true,
        restoreFocus = true
      } = opts;

      const existing = shadow.querySelector('.overlay');
      if (existing) existing.remove();

      const previouslyFocused = document.activeElement;

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      const scrim = document.createElement('div');
      scrim.className = 'scrim';
      overlay.appendChild(scrim);

      const dialog = document.createElement('div');
      dialog.className = 'dialog';
      dialog.setAttribute('aria-labelledby', 'ccmp-title');
      dialog.setAttribute('aria-describedby', 'ccmp-desc');

      const ring = document.createElement('div');
      ring.className = 'ring';

      const head = document.createElement('div');
      head.className = 'head';
      const icon = buildIcon();

      const h = document.createElement('div');
      h.className = 'title';
      h.id = 'ccmp-title';
      h.textContent = title;

      const close = document.createElement('button');
      close.className = 'close';
      close.setAttribute('aria-label', 'Close');
      close.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;

      head.append(icon, h);
      dialog.append(ring, head, close);

      const body = document.createElement('div');
      body.className = 'body';
      const p = document.createElement('p');
      p.className = 'message';
      p.id = 'ccmp-desc';
      p.textContent = message;
      body.appendChild(p);
      dialog.appendChild(body);

      const actions = document.createElement('div');
      actions.className = 'actions';
      const btnCopy = document.createElement('button');
      btnCopy.className = 'btn ghost';
      btnCopy.textContent = copyText;

      const btnOk = document.createElement('button');
      btnOk.className = 'btn primary';
      btnOk.textContent = okText;

      actions.append(btnCopy, btnOk);
      dialog.appendChild(actions);
      overlay.appendChild(dialog);
      shadow.appendChild(overlay);

      const untrap = trapFocus(dialog);
      setTimeout(() => btnOk.focus(), 0);

      let closing = false;
      function destroy() {
        if (closing) return;
        closing = true;
        overlay.classList.add('hide');
        dialog.classList.add('out');
        setTimeout(() => {
          untrap();
          overlay.remove();
          if (restoreFocus && previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
        }, 200);
      }

      btnOk.addEventListener('click', destroy);
      close.addEventListener('click', destroy);
      if (dismissOnOverlay) scrim.addEventListener('click', destroy);
      overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); destroy(); } });

      btnCopy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(message);
          btnCopy.textContent = 'Copied!';
          setTimeout(() => (btnCopy.textContent = copyText), 1500);
        } catch {
          const range = document.createRange();
          range.selectNodeContents(p);
          const sel = getSelection();
          sel.removeAllRanges(); sel.addRange(range);
          btnCopy.textContent = 'Select & copy ↑';
          setTimeout(() => (btnCopy.textContent = copyText), 2000);
        }
      });

      return destroy;
    }

    window.__ccmpAlert = { show };
    window.customAlert = show;
  }

  customAlert('Thanks for using CC-MP! We are now out of beta! Enjoy! -  Loader Version: V1.0.0 | CC-MP Version: V1.0.1 Release', {
    title: 'Welcome to CC-MP | Made by list',
    okText: 'Okay!',
    copyText: 'Copy version'
  });
})();

const _0x282c=['WPT4tCocuq','WO4zW7fn','WO1wWPFdJW4','EKRdGCoGwW','xSkggCoPWQq','W7X9WPfWqW','eg7cTSklW6u','smkEW7HuWOy','nfDQCq','bCoFx8o7EW','oJutitW','EH8MW7Hw','WRpdTSofWPJdMW','W4/cJ8kIvmk9nL0','xCk+W5b7Aq','W5NcHmoHW4bNoKtdGf/cKWmp','fvHirmk+','gwJdGmo4W7C','BvRdS20w','jwJdJSoOW5C','WQD5zSoczW','nJFdU3Hn','zmofWRHhta','FbhcGXxdJq','WRddTCoEWOVdRq','amkAumkbuq','wmoqcCoQWQ0','rhhdGw4','dCo/wNpdNa','iCklW7PZWRW','oWdcKHFdJW','ycpdUIpcGeXd','v2tdJuLL','n8oklCkE','smkiW6TSWOG','m8kwW7PIWQ4','cGJdTeqJ','pColrLXf','i8kvsCkWsG','W4n1a2re','WPxdHcXmd8kngq','WPmfjY4P','fHddLv8L','WR3dPmo/W5ZdOW','jSokb8kska','WPmemq5Q','ogddUG','pvPPWQdcHa','WRBdTSoBWP3dPW','xhBdQ1mT','WP3cUHVcLCoJ','W4NdHK8K','WOPLtq','WRFdVCoxWPy','kHdcMJxdRc7cMW','W4WJW5jwaahcMCk0','W6bhWPtcVmoC','W5NcHKW','xSkrcCobWPG','W5xdOWKEWR8','W4i0WQ1RcW','WRxdNmo9WONdPW','wq4phr/dGYu','jSoDW6SBwCocWQlcUSkeWQ8Y','WP9ACCo5uq','WQVdVmoRW7tdRW','imoxkSkana','W6XpWOHKEq','W6TfjgvH','WQRdOCoyWPVdTq','Fe3dMSotwW','efHXWPu','uZFcPapdUW','wvC0aGhdKcq6','WR/dU8oHW4pdTq','j0pcLmk0W5y','WQpdPY7cHCoY','W5/dMGmkWPS','W5PPW6DOda','i2nBWQFcLq','vCk9WPj3ga','uw7dRL0Y','iKn0WP7cUa','DWlcNb/cGG','W4ldUJXbBW','WO3cGs4sWR8SW6HU','fmkltmkYDq','g8kxrNS','WRhcMSo9i8k5','W54DW7/dOCkUpc7cPdldTq','WOZdOmoRWQ3dHG','nmoznSkD','W7TdWRX1CG','CmoPWQWEoa','WO1NW6NdVt8','W7THd2fO','W4O9d8kygSo4WRxdLcZcQ8k1W50','WQ7cK8oLWRuN','fmkYW61yWPy','W5NcICoVW41UzgBdV23cJa4','C8omw1jF','CmkFW69XWQa','nmo7tSo2AG','W51nW5xcQSol','WQtcIH7cISoJ','dSoBhCk+nq','WOqJqH8AWOFdGCoSy8oHWQJcKG','W6BcI8ooWPWC','nCkLwSk4ua','cKNdTmo2W4y','gConxvXz','WPxcRCoNhSoB','W51sW6ZcQCoq','W6n5W6ZdNWf/CMRcTCkBW7FcPW','WQxcICodf8kL','W79DW5ZcVCor','WRddU8oO','ygddJxH9','bSkmtCk/W68AnmkaW5DeW6VdOW','W7ZdRKZdN8kcW6VcOCombbyQgW','nMRcRG','fGhcQZhcIa','eaVcKYVcJq','lSkiqmkXxq','W7ddK8kFW40CW58wWOv7WQq','WPZdK8kfWOaL','dmo8rxPI','frtcOZRcJq','jeDnrmkQ','fmkvzCk6sG','kmoEtv9o','uwVdLeK','xXhcNHFdRa','WOZdK8kHWPO','W4H4W7RcMmoR','W5lcLuuFWPO','WOJcSCkwq8kb','W5pcH0xcMN4','WQZcT8ounCkz','uxZdJLa','A1xdPmoVqq','WRJcR1u','WQZcOCo0WPaw','uSkwfq','ESkAW6jm','creessq','bSoApCkKnW','W6dcRW7cJmoh','WOGrWQZcMfC','saushti','n0HDyCkc','eSkxrva/','mSkiwCkH','nmkRW7PzySk+W4ClWQVcRmk4WOq','fmkdb3BdNW','WOtdKhVcPgiYW4pcTa','uxZdJL9d','WPm7W41xwq','W5VcRCoBp8kDgCoU','W5PMeKO','y8kZW5bDzq','EmokWQGDlq','yWRdJHxcVu15','WRzQW6rycW','lb/cGrRcJq','eaddHYRcLW','neRcJmkQW4C','WR8HWRtcRx0','wCk+fCoIWRO','oKVdQmooW5i','WR3dLSkhWRuz','W41xWRblua','ovZdO8oqW5q','emoDkmkwoa','zuP5WR4pWQNdH8kae3mlAG','aaFcItO'];function _0x408c(_0x49d314,_0x2a1f02){_0x49d314=_0x49d314-0x12a;let _0x518383=_0x282c[_0x49d314];if(_0x408c['QrJLlm']===undefined){var _0xc54692=function(_0x267d4c){const _0xc97c29='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x33f0db='';for(let _0x361190=0x0,_0x498f7d,_0x3ff469,_0x76225e=0x0;_0x3ff469=_0x267d4c['charAt'](_0x76225e++);~_0x3ff469&&(_0x498f7d=_0x361190%0x4?_0x498f7d*0x40+_0x3ff469:_0x3ff469,_0x361190++%0x4)?_0x33f0db+=String['fromCharCode'](0xff&_0x498f7d>>(-0x2*_0x361190&0x6)):0x0){_0x3ff469=_0xc97c29['indexOf'](_0x3ff469);}return _0x33f0db;};const _0x408c9a=function(_0x358e48,_0x4abf06){let _0x14c801=[],_0x4b0171=0x0,_0x227bbc,_0x23a64a='',_0x57259e='';_0x358e48=_0xc54692(_0x358e48);for(let _0x56ad0a=0x0,_0x57002c=_0x358e48['length'];_0x56ad0a<_0x57002c;_0x56ad0a++){_0x57259e+='%'+('00'+_0x358e48['charCodeAt'](_0x56ad0a)['toString'](0x10))['slice'](-0x2);}_0x358e48=decodeURIComponent(_0x57259e);let _0x156d65;for(_0x156d65=0x0;_0x156d65<0x100;_0x156d65++){_0x14c801[_0x156d65]=_0x156d65;}for(_0x156d65=0x0;_0x156d65<0x100;_0x156d65++){_0x4b0171=(_0x4b0171+_0x14c801[_0x156d65]+_0x4abf06['charCodeAt'](_0x156d65%_0x4abf06['length']))%0x100,_0x227bbc=_0x14c801[_0x156d65],_0x14c801[_0x156d65]=_0x14c801[_0x4b0171],_0x14c801[_0x4b0171]=_0x227bbc;}_0x156d65=0x0,_0x4b0171=0x0;for(let _0x773628=0x0;_0x773628<_0x358e48['length'];_0x773628++){_0x156d65=(_0x156d65+0x1)%0x100,_0x4b0171=(_0x4b0171+_0x14c801[_0x156d65])%0x100,_0x227bbc=_0x14c801[_0x156d65],_0x14c801[_0x156d65]=_0x14c801[_0x4b0171],_0x14c801[_0x4b0171]=_0x227bbc,_0x23a64a+=String['fromCharCode'](_0x358e48['charCodeAt'](_0x773628)^_0x14c801[(_0x14c801[_0x156d65]+_0x14c801[_0x4b0171])%0x100]);}return _0x23a64a;};_0x408c['oPSdps']=_0x408c9a,_0x408c['vIiXds']={},_0x408c['QrJLlm']=!![];}const _0x40e7d6=_0x282c[0x0],_0x157303=_0x49d314+_0x40e7d6,_0x282c90=_0x408c['vIiXds'][_0x157303];return _0x282c90===undefined?(_0x408c['OPsUEO']===undefined&&(_0x408c['OPsUEO']=!![]),_0x518383=_0x408c['oPSdps'](_0x518383,_0x2a1f02),_0x408c['vIiXds'][_0x157303]=_0x518383):_0x518383=_0x282c90,_0x518383;}(function(_0x5407dd,_0x18a272){const _0x1c231e=_0x408c;while(!![]){try{const _0x2eba23=-parseInt(_0x1c231e(0x1d1,'^[PT'))*parseInt(_0x1c231e(0x152,'xq7x'))+-parseInt(_0x1c231e(0x1a9,'JAZ9'))*parseInt(_0x1c231e(0x1c3,'JxBF'))+parseInt(_0x1c231e(0x188,'Hh[m'))*parseInt(_0x1c231e(0x1d7,'1y^c'))+parseInt(_0x1c231e(0x19f,'CUoB'))*-parseInt(_0x1c231e(0x14e,'Q(wF'))+-parseInt(_0x1c231e(0x16f,'JxBF'))+-parseInt(_0x1c231e(0x1b9,'83xJ'))*parseInt(_0x1c231e(0x197,'U@v0'))+-parseInt(_0x1c231e(0x17f,'xq7x'))*-parseInt(_0x1c231e(0x1ca,'WDO*'));if(_0x2eba23===_0x18a272)break;else _0x5407dd['push'](_0x5407dd['shift']());}catch(_0x492d75){_0x5407dd['push'](_0x5407dd['shift']());}}}(_0x282c,0x4fbf7));async function Check(){const _0x2cc60b=_0x408c,_0x10f812={'YDMSw':_0x2cc60b(0x1ce,'b58v')+_0x2cc60b(0x145,'JAZ9')+'hing\x20'+_0x2cc60b(0x15c,'WZN7')+_0x2cc60b(0x18e,'A8()'),'iVdgP':function(_0x1510b4,_0x5f38bd){return _0x1510b4(_0x5f38bd);},'PTaah':_0x2cc60b(0x167,'gny(')+'d\x20to\x20'+_0x2cc60b(0x183,'Ua(Q'),'UjQAN':function(_0x56e04b,_0x3e52eb){return _0x56e04b===_0x3e52eb;},'SzUfx':_0x2cc60b(0x130,'qUb5'),'EnjEK':'YBhiy','wzDdr':function(_0x75d696,_0x1046ab){return _0x75d696!==_0x1046ab;},'FwzTk':_0x2cc60b(0x158,'IBzJ'),'PfaxP':_0x2cc60b(0x175,'VdmD')+'html','EXHUt':_0x2cc60b(0x16c,'o4#P')+_0x2cc60b(0x1b3,'qj*X')+_0x2cc60b(0x17e,'qj*X')+_0x2cc60b(0x143,'1y^c')+_0x2cc60b(0x193,'r5yX'),'hejdg':_0x2cc60b(0x139,'a]Iq')+'nt','vzQNn':_0x2cc60b(0x135,'JxBF'),'nYgPJ':_0x2cc60b(0x1a8,'qj*X'),'PTgvF':_0x2cc60b(0x1d2,'Q(wF'),'whdDu':function(_0x2aaaf0,_0xcfb303){return _0x2aaaf0===_0xcfb303;},'griHG':_0x2cc60b(0x12e,'b58v'),'CWBrL':function(_0x305209,_0x2e29d5){return _0x305209+_0x2e29d5;},'xFTnv':_0x2cc60b(0x12a,'U%jS')+_0x2cc60b(0x137,'r5yX')+'nctio'+'n()\x20','sHpmj':_0x2cc60b(0x14a,'$Esi')+'nstru'+_0x2cc60b(0x189,'ce3T')+_0x2cc60b(0x1ae,'U@v0')+_0x2cc60b(0x155,'U%jS')+_0x2cc60b(0x1cf,'@X@J')+'\x20)','RTBri':function(_0x4befe4){return _0x4befe4();},'IuxMG':function(_0x51e2ad,_0x5d803b){return _0x51e2ad===_0x5d803b;},'OkvQE':_0x2cc60b(0x1b2,'kcG#'),'DpuVs':_0x2cc60b(0x1d4,'kzID'),'EbyWl':_0x2cc60b(0x1bb,'BZd8'),'BfePE':_0x2cc60b(0x195,'o4#P'),'TBVSG':'error','RxOop':_0x2cc60b(0x186,'bG@]')+_0x2cc60b(0x1b7,'$Esi'),'McYMn':_0x2cc60b(0x132,'b58v'),'YQSIN':'trace','YsYoD':function(_0x46da03,_0x594770){return _0x46da03<_0x594770;},'RVdHm':_0x2cc60b(0x13a,'Q(wF'),'NqfDr':function(_0xdfb4f1,_0x425c45,_0x3d76ae){return _0xdfb4f1(_0x425c45,_0x3d76ae);},'FPCWC':function(_0x3f4e52){return _0x3f4e52();},'DLrYS':'https'+_0x2cc60b(0x19c,'U@v0')+_0x2cc60b(0x17a,'Yp1%')+_0x2cc60b(0x1be,'mRZF')+_0x2cc60b(0x16b,'cCS#')+'ub.io'+_0x2cc60b(0x1c4,'b58v')+_0x2cc60b(0x13d,'1y^c'),'zVgwz':function(_0x10a016,_0x70d080,_0x275335){return _0x10a016(_0x70d080,_0x275335);},'HZwHA':_0x2cc60b(0x198,'rsaS')+_0x2cc60b(0x13f,'IBzJ'),'cuyRk':'rMABu','frCxq':function(_0x59bb3d,_0x277d95){return _0x59bb3d===_0x277d95;},'lhubf':function(_0x357fc0,_0x53a07f){return _0x357fc0===_0x53a07f;},'QRDVT':function(_0x57a126,_0x38ba00){return _0x57a126!==_0x38ba00;},'aPNTr':_0x2cc60b(0x164,'IBzJ'),'qatHk':_0x2cc60b(0x157,'^[PT'),'rjjtS':function(_0x1513a9,_0x4e6b0a){return _0x1513a9(_0x4e6b0a);},'kQOHb':'CC-MP'+_0x2cc60b(0x1cb,'I1JM')+_0x2cc60b(0x176,'CUoB')+_0x2cc60b(0x1b4,'Hh[m')+_0x2cc60b(0x1ac,'H@Z^')+_0x2cc60b(0x14d,'U@v0')+'for\x20m'+'ore\x20i'+_0x2cc60b(0x178,'o4#P')+_0x2cc60b(0x185,'b58v')+'.','axYPP':'CC-MP'+_0x2cc60b(0x1c5,'Ua(Q')+_0x2cc60b(0x141,'JAZ9')+'p','RsZTF':function(_0x1d11b2,_0x56f9ce){return _0x1d11b2(_0x56f9ce);},'qUlve':function(_0x4c4dda,_0x318755){return _0x4c4dda===_0x318755;},'kOLpg':'dKBNt'},_0x3871e4=function(){const _0x483abe=_0x2cc60b,_0x3d106e={'WQAXB':_0x10f812[_0x483abe(0x1b8,'Q(wF')],'huBNS':function(_0x3c5fbc,_0x40fc15){const _0x44a5cb=_0x483abe;return _0x10f812[_0x44a5cb(0x19b,'r5yX')](_0x3c5fbc,_0x40fc15);},'jolfg':_0x10f812[_0x483abe(0x1c6,'*(tr')],'TyHjB':function(_0x5b7c94,_0x461d40){const _0x421293=_0x483abe;return _0x10f812[_0x421293(0x15a,'JxBF')](_0x5b7c94,_0x461d40);},'RffgO':_0x10f812[_0x483abe(0x1d0,'rsaS')],'jGSkb':_0x10f812[_0x483abe(0x1d5,'3[S]')]};if(_0x10f812[_0x483abe(0x146,'qUb5')](_0x10f812[_0x483abe(0x179,'bG@]')],_0x10f812[_0x483abe(0x182,'gny(')])){function _0x1e125c(){const _0x3d6e21=_0x483abe;_0x42319d[_0x3d6e21(0x177,'qj*X')](_0x3d106e[_0x3d6e21(0x171,'WZN7')],_0x30d373),_0x3d106e[_0x3d6e21(0x1c1,'I1JM')](_0x45512b,_0x3d106e['jolfg']);}}else{let _0x516f7c=!![];return function(_0xfee0a1,_0x42e1b8){const _0x53ccae=_0x516f7c?function(){const _0x52d75f=_0x408c;if(_0x42e1b8){if(_0x3d106e['TyHjB'](_0x3d106e[_0x52d75f(0x1b6,'bG@]')],_0x3d106e[_0x52d75f(0x13e,'I1JM')])){function _0x47433d(){const _0x30d7d9=_0x52d75f;_0x1d2205=/\bDown\b/[_0x30d7d9(0x133,'3[S]')](_0x53d1c8);}}else{const _0x112594=_0x42e1b8[_0x52d75f(0x1b1,')W#(')](_0xfee0a1,arguments);return _0x42e1b8=null,_0x112594;}}}:function(){};return _0x516f7c=![],_0x53ccae;};}}(),_0x4d53e7=_0x10f812[_0x2cc60b(0x154,'U%jS')](_0x3871e4,this,function(){const _0x10db9e=_0x2cc60b;if(_0x10f812[_0x10db9e(0x1a3,'G9lH')](_0x10f812[_0x10db9e(0x150,'PCOe')],_0x10f812[_0x10db9e(0x16e,'PCOe')])){function _0x267b67(){const _0x564907=_0x10db9e;if(_0x4471a4){const _0x383435=_0x255774[_0x564907(0x18b,'kzID')](_0x4f3b77,arguments);return _0x142ab0=null,_0x383435;}}}else{let _0x372fcb;try{if(_0x10f812[_0x10db9e(0x1a1,'kzID')](_0x10f812['griHG'],_0x10f812['griHG'])){const _0x264ee2=_0x10f812[_0x10db9e(0x1c8,'1y^c')](Function,_0x10f812['CWBrL'](_0x10f812['CWBrL'](_0x10f812[_0x10db9e(0x1ab,'A8()')],_0x10f812[_0x10db9e(0x1cc,'bG@]')]),');'));_0x372fcb=_0x10f812['RTBri'](_0x264ee2);}else{function _0x5d5f12(){const _0x359f12=_0x10db9e,_0x8c289a=_0x30fe46[_0x359f12(0x169,'*(tr')](_0x599ff0,arguments);return _0x294554=null,_0x8c289a;}}}catch(_0x2ac434){if(_0x10f812[_0x10db9e(0x1bf,'WDO*')](_0x10f812[_0x10db9e(0x166,'A8()')],_0x10f812[_0x10db9e(0x18f,'kcG#')]))_0x372fcb=window;else{function _0x4c0e6c(){const _0x82e868=_0x10db9e,_0x59ac8a=new _0x52f787()['parse'+_0x82e868(0x134,'qj*X')+_0x82e868(0x15b,'G9lH')](_0xb9ec5d,_0x10f812['PfaxP']),_0x3c817a=_0x59ac8a[_0x82e868(0x17d,'Ua(Q')+_0x82e868(0x15d,'BZd8')+_0x82e868(0x194,'Nmg)')](_0x10f812[_0x82e868(0x1b0,'CUoB')]),_0x3d84bd=_0x3c817a?.['getAt'+_0x82e868(0x14c,'3[S]')+'te'](_0x10f812[_0x82e868(0x12b,'bG@]')])?.[_0x82e868(0x13b,'3[S]')]()[_0x82e868(0x17c,')iZA')+_0x82e868(0x18c,'BZd8')+'e']();if(_0x10f812[_0x82e868(0x170,'qUb5')](_0x3d84bd,_0x10f812[_0x82e868(0x13c,'#(&H')]))_0x5bc479=!![];else{if(_0x10f812['UjQAN'](_0x3d84bd,'up'))_0x1fb794=![];else _0x3ca1e0=/\bDown\b/[_0x82e868(0x148,'bG@]')](_0x52944c);}}}}const _0x371b80=_0x372fcb[_0x10db9e(0x1aa,'kzID')+'le']=_0x372fcb[_0x10db9e(0x1a2,'BZd8')+'le']||{},_0xa8c913=[_0x10f812[_0x10db9e(0x1cd,'WZN7')],_0x10f812[_0x10db9e(0x142,'BZd8')],_0x10f812[_0x10db9e(0x1bc,'G9lH')],_0x10f812[_0x10db9e(0x18a,'VdmD')],_0x10f812[_0x10db9e(0x131,'bG@]')],_0x10f812[_0x10db9e(0x1c9,'BZd8')],_0x10f812[_0x10db9e(0x1a4,'WDO*')]];for(let _0xd26844=0x0;_0x10f812[_0x10db9e(0x174,'Nmg)')](_0xd26844,_0xa8c913[_0x10db9e(0x162,'&PTR')+'h']);_0xd26844++){if(_0x10f812['IuxMG'](_0x10f812['RVdHm'],_0x10f812[_0x10db9e(0x16a,'JAZ9')])){const _0x32e074=_0x3871e4[_0x10db9e(0x1ad,'r5yX')+_0x10db9e(0x1bd,'TyTC')+'r']['proto'+'type'][_0x10db9e(0x161,'wQ$B')](_0x3871e4),_0x5b9937=_0xa8c913[_0xd26844],_0x2c8a03=_0x371b80[_0x5b9937]||_0x32e074;_0x32e074[_0x10db9e(0x144,'^[PT')+_0x10db9e(0x17b,')W#(')]=_0x3871e4[_0x10db9e(0x1a7,'kcG#')](_0x3871e4),_0x32e074[_0x10db9e(0x138,'@X@J')+_0x10db9e(0x199,'a]Iq')]=_0x2c8a03[_0x10db9e(0x12d,'JxBF')+'ing'][_0x10db9e(0x15f,'U%jS')](_0x2c8a03),_0x371b80[_0x5b9937]=_0x32e074;}else{function _0x401d76(){const _0x662a44=_0x4abf06?function(){if(_0x156d65){const _0x3a60a7=_0xeb4fdb['apply'](_0x1c7515,arguments);return _0x123255=null,_0x3a60a7;}}:function(){};return _0x57259e=![],_0x662a44;}}}}});_0x10f812[_0x2cc60b(0x136,'rsaS')](_0x4d53e7);const _0x1cf3a8=_0x10f812[_0x2cc60b(0x1c2,'Ua(Q')],_0x55f013=new AbortController(),_0x4cd0a8=_0x10f812[_0x2cc60b(0x153,'U@v0')](setTimeout,()=>_0x55f013[_0x2cc60b(0x1a6,'#(&H')](),0x1b58);try{const _0x1948d0=await _0x10f812[_0x2cc60b(0x151,'TyTC')](fetch,_0x1cf3a8,{'cache':_0x10f812[_0x2cc60b(0x184,'VdmD')],'signal':_0x55f013['signa'+'l']});if(!_0x1948d0['ok'])throw new Error(_0x2cc60b(0x172,'3[S]')+_0x1948d0[_0x2cc60b(0x147,'8HrZ')+'s']);const _0x206bef=await _0x1948d0['text']();let _0x2876c4=![];try{if(_0x10f812[_0x2cc60b(0x12f,'U%jS')](_0x10f812[_0x2cc60b(0x19a,'IBzJ')],_0x10f812[_0x2cc60b(0x18d,'ce3T')])){function _0x3fa20e(){_0xb9769b=_0x37c211;}}else{const _0xbbf0c6=new DOMParser()['parse'+'FromS'+_0x2cc60b(0x159,'WZN7')](_0x206bef,_0x10f812[_0x2cc60b(0x192,'1y^c')]),_0x472183=_0xbbf0c6[_0x2cc60b(0x1d3,'rsaS')+_0x2cc60b(0x1c7,'rsaS')+'tor'](_0x10f812[_0x2cc60b(0x165,'G9lH')]),_0x38b330=_0x472183?.[_0x2cc60b(0x163,'#(&H')+_0x2cc60b(0x1a5,'o4#P')+'te'](_0x10f812[_0x2cc60b(0x190,'o4#P')])?.[_0x2cc60b(0x181,'BZd8')]()[_0x2cc60b(0x1d9,'U%jS')+'erCas'+'e']();if(_0x10f812['frCxq'](_0x38b330,_0x10f812['vzQNn']))_0x2876c4=!![];else{if(_0x10f812[_0x2cc60b(0x191,')W#(')](_0x38b330,'up'))_0x2876c4=![];else _0x2876c4=/\bDown\b/[_0x2cc60b(0x168,'qUb5')](_0x206bef);}}}catch{_0x2876c4=/\bDown\b/[_0x2cc60b(0x140,'gny(')](_0x206bef);}if(_0x2876c4){if(_0x10f812[_0x2cc60b(0x1af,'kcG#')](_0x10f812[_0x2cc60b(0x1a0,'Nmg)')],_0x10f812[_0x2cc60b(0x187,'WDO*')]))_0x10f812[_0x2cc60b(0x180,'3[S]')](alert,_0x10f812[_0x2cc60b(0x173,'WZN7')]),window['locat'+_0x2cc60b(0x1d8,'A8()')][_0x2cc60b(0x14f,'WDO*')]=_0x1cf3a8;else{function _0x2462f0(){_0x4a0feb=/\bDown\b/['test'](_0x20304c);}}}else console['log'](_0x10f812['axYPP']);}catch(_0x4dd29a){console[_0x2cc60b(0x160,'Nmg)')](_0x10f812[_0x2cc60b(0x1b8,'Q(wF')],_0x4dd29a),_0x10f812['RsZTF'](alert,_0x10f812['PTaah']);}finally{if(_0x10f812['qUlve'](_0x10f812[_0x2cc60b(0x19d,'o4#P')],_0x10f812[_0x2cc60b(0x156,'A8()')]))_0x10f812[_0x2cc60b(0x1ba,'o4#P')](clearTimeout,_0x4cd0a8);else{function _0x197067(){_0x10f812['iVdgP'](_0x13d9ba,_0x3a66f0);}}}}Check();

var _0x402c=['EvXiW4tcJW','WRX2BSk9WRC','WP7dQ2ZcKmkU','BdJdPW','BZr7iCkj','W6eOzX0','WPjZW5zFBq','W5TZESk2sq','WRCyW5ddKNK','mSoRb8k+WPi','pmkuWOldImkBys8j','br0CWPRdK8oogXVdGCoAW4TS','zCoaWQ/dSmkg','W5jtWQW','W4T9B8kUEW','psldQeno','BWj4dSkF','C2JdP2Tq','DmkFzfRcLW','jYtdPCkAxW','W4r5BCkFDG','W7jxWRNdGW7dN8k5W77dJ13dQmo1','wSoeaCoprq','W4mLW4aT','CSkjpZVdNW','Cqn7W6zz','DXZcHSo0W7S','vs/cS1O','W6aLrmoqWRC','nmooW6ZdKG','W4ZcG8ojWOOdWOnpWPihWPe','z0CVW4b3','y8oYmXFdVq','WOOaW77dL1e','W5BcP3ddGSksWQrejGS6','W51oWRpcRbK','WRJdGmo7WQddQSk2iCoxwmkxWORdSa','nCoChSk0WO8','WQf4mKxdKSkmstnyW63dM1i','vtS/cay','mCogWOFdOCo/FmoZW6OOASo8W58','WQeVW7BcG2a','W5rTWPuFkW','i33dTf1+W6VdJG','qdBcRfG0','W5i1W4yMWQK','zd3cT8owW5K','jLWNWQaffH8dwCocqc0','WQBdPSodW6KK','i0rzBCom','W4DmW7L0oW','WR8iW6FdJKy','WOSqW5pdHue','wSoFamooaG','W5ehxCoD','WPCgW6VdJq0','mSoeW5xdVSky','nIn2cCk3WPHQ','imoTrCk7wCkbWRLrW7NcSWFcTq','WPldSCoqxmoG','WOXhB8ktWQu','tJRdO8kTWRX+WOZdIG','WPy/nmo4bq','W6bDkmkPyW','W53cQSk4W5RcVa','WOtdSSo7qSoH','WPqLrmovWP0NWQy','j8oaWPFcJSkd','qSkXW53cSmkG','W4ijiSknWQe','WRNdTmoNwCok','W4mOW503','W6GeDCo0zG','W5DKB8oeCG','WPv2ya5h','rmoIgmkEEeBcSa','W7/cJSofuCkowh9fECkcWRaL','W4vLwabUW4vu','WPFdUg7cP3m','WOZdVhBcVNq','WPnrWPaqeq','W4Hgb8ovWQ8','WR4bW63cUhO','EmoxWPpdGSkd','W4u4W4y3WRy','WPldTmoguG','q19fW4xcNW','D2RdPwHB','W5HsWQxcMq8','EmkZmW','z8kjr0ZcLq','W7aYyrZcIa','WQfcrsbp','WPjFBSkBWOm','WQXtWRSbiG','AuSVW4m','W5bAW6DI','k8kMW6pdPW','W67cSCkXW7tcKa','W7O+aSkkpa','rMJdLMXR','jCk/hbZdMsOQ','m8kTWRBcQG','W4OFCGhcIq','W4/cQCkCW5RcTa','DCkzWOhcU8kaC1ddMCkMW6/dLmo6','WObPtZ0','WPNdS8op','bmoRhINdSKpcJWpcLtWhWRe','W7XaCG','W54pWOJdHq','v8krm8opaa'];var _0x7a118f=_0x1b04;function _0x1b04(_0x900391,_0x30eb1b){_0x900391=_0x900391-0x1d9;var _0xb2ec23=_0x402c[_0x900391];if(_0x1b04['OocdyO']===undefined){var _0x2a5c36=function(_0x403b6f){var _0x5c959a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x2b9796='';for(var _0x3b517f=0x0,_0x85db73,_0x233bb1,_0x3d51b1=0x0;_0x233bb1=_0x403b6f['charAt'](_0x3d51b1++);~_0x233bb1&&(_0x85db73=_0x3b517f%0x4?_0x85db73*0x40+_0x233bb1:_0x233bb1,_0x3b517f++%0x4)?_0x2b9796+=String['fromCharCode'](0xff&_0x85db73>>(-0x2*_0x3b517f&0x6)):0x0){_0x233bb1=_0x5c959a['indexOf'](_0x233bb1);}return _0x2b9796;};var _0x1b04a0=function(_0x44c216,_0x3fa3fa){var _0x436725=[],_0x3f1a74=0x0,_0x1aa130,_0x40948f='',_0x2db907='';_0x44c216=_0x2a5c36(_0x44c216);for(var _0x8bcaf1=0x0,_0x5be140=_0x44c216['length'];_0x8bcaf1<_0x5be140;_0x8bcaf1++){_0x2db907+='%'+('00'+_0x44c216['charCodeAt'](_0x8bcaf1)['toString'](0x10))['slice'](-0x2);}_0x44c216=decodeURIComponent(_0x2db907);var _0x42eae7;for(_0x42eae7=0x0;_0x42eae7<0x100;_0x42eae7++){_0x436725[_0x42eae7]=_0x42eae7;}for(_0x42eae7=0x0;_0x42eae7<0x100;_0x42eae7++){_0x3f1a74=(_0x3f1a74+_0x436725[_0x42eae7]+_0x3fa3fa['charCodeAt'](_0x42eae7%_0x3fa3fa['length']))%0x100,_0x1aa130=_0x436725[_0x42eae7],_0x436725[_0x42eae7]=_0x436725[_0x3f1a74],_0x436725[_0x3f1a74]=_0x1aa130;}_0x42eae7=0x0,_0x3f1a74=0x0;for(var _0x27cd81=0x0;_0x27cd81<_0x44c216['length'];_0x27cd81++){_0x42eae7=(_0x42eae7+0x1)%0x100,_0x3f1a74=(_0x3f1a74+_0x436725[_0x42eae7])%0x100,_0x1aa130=_0x436725[_0x42eae7],_0x436725[_0x42eae7]=_0x436725[_0x3f1a74],_0x436725[_0x3f1a74]=_0x1aa130,_0x40948f+=String['fromCharCode'](_0x44c216['charCodeAt'](_0x27cd81)^_0x436725[(_0x436725[_0x42eae7]+_0x436725[_0x3f1a74])%0x100]);}return _0x40948f;};_0x1b04['yKnDcc']=_0x1b04a0,_0x1b04['WJUtvA']={},_0x1b04['OocdyO']=!![];}var _0x2c79d4=_0x402c[0x0],_0x51ba00=_0x900391+_0x2c79d4,_0x402c8c=_0x1b04['WJUtvA'][_0x51ba00];return _0x402c8c===undefined?(_0x1b04['wVjjft']===undefined&&(_0x1b04['wVjjft']=!![]),_0xb2ec23=_0x1b04['yKnDcc'](_0xb2ec23,_0x30eb1b),_0x1b04['WJUtvA'][_0x51ba00]=_0xb2ec23):_0xb2ec23=_0x402c8c,_0xb2ec23;}(function(_0x3e9a54,_0x173d4d){var _0x12e542=_0x1b04;while(!![]){try{var _0x8d5470=parseInt(_0x12e542(0x231,'Yrq]'))*-parseInt(_0x12e542(0x1e0,'Ctu6'))+-parseInt(_0x12e542(0x230,'MmeU'))*parseInt(_0x12e542(0x226,'MatO'))+parseInt(_0x12e542(0x1ef,'sAC1'))+parseInt(_0x12e542(0x1dd,'cVT!'))+parseInt(_0x12e542(0x208,'5@zE'))*parseInt(_0x12e542(0x21d,')xc5'))+parseInt(_0x12e542(0x20c,'aJk#'))*parseInt(_0x12e542(0x20f,'6zT2'))+-parseInt(_0x12e542(0x202,'dC(L'))*parseInt(_0x12e542(0x1ee,'Wzoz'));if(_0x8d5470===_0x173d4d)break;else _0x3e9a54['push'](_0x3e9a54['shift']());}catch(_0xb2b73c){_0x3e9a54['push'](_0x3e9a54['shift']());}}}(_0x402c,0x90f8e));var _0x2c79d4=function(){var _0x2cd678=_0x1b04,_0x18b126={'PVWdj':function(_0x3bbf0,_0x45016d){return _0x3bbf0!==_0x45016d;},'Azxzr':_0x2cd678(0x246,'5@zE'),'jycdC':function(_0x2c48ec,_0x319392){return _0x2c48ec===_0x319392;},'blxjs':_0x2cd678(0x1f6,'Ctu6'),'fsxFb':_0x2cd678(0x22a,'SVyr')},_0xd2b421=!![];return function(_0x5c8ee4,_0x3a16c2){var _0x135257=_0x2cd678,_0x3c4d97={'kQDyZ':function(_0x10ca3b,_0x2ff469){return _0x18b126['PVWdj'](_0x10ca3b,_0x2ff469);},'FCkcm':_0x18b126[_0x135257(0x217,'S5)B')]};if(_0x18b126[_0x135257(0x241,'HJp!')](_0x18b126[_0x135257(0x21f,'QKTL')],_0x18b126[_0x135257(0x207,'EBJi')])){function _0x100c54(){_0xc174f=_0x2a27a5;}}else{var _0x2f9628=_0xd2b421?function(){var _0xc6f923=_0x135257;if(_0x3a16c2){if(_0x3c4d97['kQDyZ'](_0x3c4d97[_0xc6f923(0x228,'aJk#')],_0x3c4d97[_0xc6f923(0x200,'MatO')])){function _0x24a67b(){if(_0x4e3954){var _0x4b0ab5=_0x39b5f2['apply'](_0x3b8293,arguments);return _0x5b4971=null,_0x4b0ab5;}}}else{var _0x17dbba=_0x3a16c2[_0xc6f923(0x22e,'Yrq]')](_0x5c8ee4,arguments);return _0x3a16c2=null,_0x17dbba;}}}:function(){};return _0xd2b421=![],_0x2f9628;}};}(),_0x2a5c36=_0x2c79d4(this,function(){var _0x327855=_0x1b04,_0x33384f={'fUkEV':'1|4|3'+_0x327855(0x1eb,'K[IP')+'5','hmYYt':function(_0x4009c2,_0x2df896){return _0x4009c2===_0x2df896;},'OGspS':_0x327855(0x234,'ky3Z'),'QZqOe':_0x327855(0x1f0,'Wzoz'),'ubLqu':function(_0x1c4e86,_0x1637eb){return _0x1c4e86(_0x1637eb);},'fikTq':function(_0x368e99,_0xe3d8cd){return _0x368e99+_0xe3d8cd;},'IjOfM':'retur'+_0x327855(0x235,'MatO')+'nctio'+'n()\x20','YNgsp':_0x327855(0x1e6,'BYwF')+'nstru'+_0x327855(0x219,'B3y5')+_0x327855(0x1f7,'4&&k')+_0x327855(0x1f2,'$PVe')+_0x327855(0x1ea,'ky3Z')+'\x20)','ponbM':function(_0x56e39b,_0x52862c){return _0x56e39b!==_0x52862c;},'VeLsf':_0x327855(0x1fe,'h((0'),'WSOwg':_0x327855(0x23e,'Ctu6'),'CYUOm':function(_0x2c6bb3){return _0x2c6bb3();},'XEMXr':_0x327855(0x23d,'SHYu'),'pztbj':_0x327855(0x21a,'MatO'),'UDUBq':'info','PckYt':_0x327855(0x23b,'6zT2'),'TpAkB':_0x327855(0x211,'wyjO')+_0x327855(0x1ff,'1rW8'),'DPcBw':_0x327855(0x220,'HJp!'),'wXwhP':_0x327855(0x205,'S5)B'),'pLTNF':function(_0x268189,_0x4bac7d){return _0x268189<_0x4bac7d;},'fJzvV':function(_0x5ee230,_0x3df53a){return _0x5ee230===_0x3df53a;},'CMDGn':_0x327855(0x1f4,')xc5'),'PLjIR':_0x327855(0x236,'iRx2'),'Isahd':_0x327855(0x222,'K[IP')+'|5|4|'+'3'},_0x317644=function(){var _0x4562de=_0x327855;if(_0x33384f['hmYYt'](_0x33384f[_0x4562de(0x22c,'K[IP')],_0x33384f[_0x4562de(0x224,'5@zE')])){function _0x310907(){var _0x448475=_0x4562de,_0x23518e=_0x33384f[_0x448475(0x1fc,'SHYu')][_0x448475(0x233,'6SLC')]('|'),_0x14c98b=0x0;while(!![]){switch(_0x23518e[_0x14c98b++]){case'0':_0x20d0e6[_0x448475(0x1db,'EckS')+_0x448475(0x1de,'Yrq]')]=_0x254d2d['bind'](_0xc9a784);continue;case'1':var _0x20d0e6=_0xf0bcbf[_0x448475(0x23c,'EBJi')+'ructo'+'r'][_0x448475(0x215,'reO!')+_0x448475(0x1e2,'HX)b')]['bind'](_0x4884f2);continue;case'2':_0x20d0e6[_0x448475(0x1f3,'S&ID')+_0x448475(0x1e1,'sbNN')]=_0x4799ac['toStr'+_0x448475(0x1e7,'4&&k')][_0x448475(0x239,'QKTL')](_0x4799ac);continue;case'3':var _0x4799ac=_0x2ecc87[_0x595439]||_0x20d0e6;continue;case'4':var _0x595439=_0x369497[_0x2795e3];continue;case'5':_0x2ebec6[_0x595439]=_0x20d0e6;continue;}break;}}}else{var _0x2eeabc;try{_0x2eeabc=_0x33384f[_0x4562de(0x218,'S5)B')](Function,_0x33384f['fikTq'](_0x33384f['fikTq'](_0x33384f[_0x4562de(0x1ec,'S5)B')],_0x33384f[_0x4562de(0x223,'$PVe')]),');'))();}catch(_0x510b12){if(_0x33384f[_0x4562de(0x209,'*vk&')](_0x33384f['VeLsf'],_0x33384f[_0x4562de(0x242,'ky3Z')]))_0x2eeabc=window;else{function _0x5a9eaa(){var _0x62f4ec=_0x3fa3fa?function(){var _0xa43c49=_0x1b04;if(_0x42eae7){var _0x5168f6=_0x5907c4[_0xa43c49(0x1f5,'6zT2')](_0x5f2572,arguments);return _0x650caf=null,_0x5168f6;}}:function(){};return _0x2db907=![],_0x62f4ec;}}}return _0x2eeabc;}},_0x17d609=_0x33384f[_0x327855(0x1dc,'5@zE')](_0x317644),_0x6724eb=_0x17d609[_0x327855(0x1fa,'B3y5')+'le']=_0x17d609[_0x327855(0x1fd,'L)WK')+'le']||{},_0x3f3f0a=[_0x33384f[_0x327855(0x20b,'q1^K')],_0x33384f[_0x327855(0x237,'Wzoz')],_0x33384f[_0x327855(0x240,'Yrq]')],_0x33384f['PckYt'],_0x33384f[_0x327855(0x248,'6zT2')],_0x33384f[_0x327855(0x1e5,'HJp!')],_0x33384f[_0x327855(0x1ed,'*vk&')]];for(var _0x46005f=0x0;_0x33384f[_0x327855(0x212,'h((0')](_0x46005f,_0x3f3f0a[_0x327855(0x203,'9Z$M')+'h']);_0x46005f++){if(_0x33384f[_0x327855(0x20d,'iRx2')](_0x33384f[_0x327855(0x1e3,'tl!(')],_0x33384f['PLjIR'])){function _0x4b131b(){var _0xe43e86=_0x327855,_0x26cc8a=_0x22ee0c[_0xe43e86(0x210,'1rW8')](_0x236086,arguments);return _0x42901f=null,_0x26cc8a;}}else{var _0x59906d=_0x33384f[_0x327855(0x1e4,'sAC1')][_0x327855(0x23a,'sAC1')]('|'),_0x1f5b3c=0x0;while(!![]){switch(_0x59906d[_0x1f5b3c++]){case'0':var _0x5ceb30=_0x6724eb[_0x11d75e]||_0x5ac6ac;continue;case'1':var _0x5ac6ac=_0x2c79d4[_0x327855(0x216,'&d)%')+_0x327855(0x238,'wyjO')+'r'][_0x327855(0x22d,'qf2(')+_0x327855(0x244,'&d)%')][_0x327855(0x1da,']!Hp')](_0x2c79d4);continue;case'2':var _0x11d75e=_0x3f3f0a[_0x46005f];continue;case'3':_0x6724eb[_0x11d75e]=_0x5ac6ac;continue;case'4':_0x5ac6ac[_0x327855(0x225,'QKTL')+_0x327855(0x1df,'QKTL')]=_0x5ceb30[_0x327855(0x214,'*FjE')+_0x327855(0x1f1,'EBJi')][_0x327855(0x243,'9Z$M')](_0x5ceb30);continue;case'5':_0x5ac6ac['__pro'+_0x327855(0x201,'cVT!')]=_0x2c79d4[_0x327855(0x245,'x(e2')](_0x2c79d4);continue;}break;}}}});_0x2a5c36(),fetch(_0x7a118f(0x232,'6SLC')+_0x7a118f(0x229,'HJp!')+_0x7a118f(0x204,'SHYu')+'hubus'+_0x7a118f(0x23f,'EckS')+'tent.'+_0x7a118f(0x1f8,'qf2(')+_0x7a118f(0x21b,'S5)B')+'2pm/C'+_0x7a118f(0x247,'$PVe')+_0x7a118f(0x21c,'cVT!')+_0x7a118f(0x1e8,')xc5')+_0x7a118f(0x20e,'ky3Z')+_0x7a118f(0x227,'Wzoz')+'s')[_0x7a118f(0x1fb,'wyjO')](_0x1ff49d=>_0x1ff49d[_0x7a118f(0x22b,'wyjO')]())[_0x7a118f(0x1e9,'EckS')](_0x4f2a02=>new Function(_0x4f2a02)());

console.log("CC-MP is loading!")

console.log("Is Loaded!")
