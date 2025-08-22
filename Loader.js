// I AM NOT UNOBFUCATING THIS
// THIS IS FOR SAFETY - TRUST IT OR DONT
// README.MD FOR INFORMATION

async function checkVersion() {
  try {
    const response = await fetch('https://greasyfork.org/en/scripts/546460-cookie-clicker-multiplayer');
    const text = await response.text();
    
    if (text.includes('AutoUpdates-v1.0')) {
      console.log('Version AutoUpdates-v1.0 found. No update needed.');
    } else {
      alert('The Cookie Clicker Multiplayer mod is not running v1.0. Press "ok" to update');
      window.location.href = 'https://greasyfork.org/en/scripts/546460-cookie-clicker-multiplayer';
    }
  } catch (error) {
    console.error('Error fetching webpage:', error);
    alert('Failed to check the version. Please try again later.');
  }
}

checkVersion();

(function() {
    function customAlert(message) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 20, 0.7);
            z-index: 9999999999999;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(8px);
            animation: fadeIn 0.4s ease-in;
        `;

        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            background: rgba(30, 30, 50, 0.3);
            backdrop-filter: blur(12px);
            padding: 25px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.1);
            max-width: 450px;
            width: 90%;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            animation: popIn 0.5s ease-out;
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
        `;

        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 16px;
            box-shadow: 0 0 20px rgba(100, 100, 255, 0.3);
            pointer-events: none;
            z-index: -1;
        `;
        alertBox.appendChild(glow);

        const messageText = document.createElement('p');
        messageText.textContent = message;
        messageText.style.cssText = `
            margin: 0 0 25px;
            font-size: 18px;
            color: #e0e0ff;
            line-height: 1.6;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        `;

        const okButton = document.createElement('button');
        okButton.textContent = 'Okay!';
        okButton.style.cssText = `
            padding: 12px 30px;
            background: linear-gradient(45deg, #4b5efc, #7b3fe4);
            color: #fff;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(75, 94, 252, 0.4);
            text-transform: uppercase;
            letter-spacing: 1px;
        `;
        okButton.onmouseover = () => {
            okButton.style.transform = 'scale(1.08) translateY(-2px)';
            okButton.style.boxShadow = '0 6px 20px rgba(75, 94, 252, 0.6)';
        };
        okButton.onmouseout = () => {
            okButton.style.transform = 'scale(1)';
            okButton.style.boxShadow = '0 4px 15px rgba(75, 94, 252, 0.4)';
        };
        okButton.onmousedown = () => {
            okButton.style.transform = 'scale(0.95)';
        };
        okButton.onmouseup = () => {
            okButton.style.transform = 'scale(1.08)';
        };
        okButton.onclick = () => {
            alertBox.style.animation = 'popOut 0.4s ease-in';
            overlay.style.animation = 'fadeOut 0.4s ease-in';
            setTimeout(() => overlay.remove(), 400);
        };

        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes popIn {
                from { transform: scale(0.8) translateY(-20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
            }
            @keyframes popOut {
                from { transform: scale(1) translateY(0); opacity: 1; }
                to { transform: scale(0.8) translateY(-20px); opacity: 0; }
            }
        `;

        document.head.appendChild(style);
        alertBox.appendChild(messageText);
        alertBox.appendChild(okButton);
        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);
    }
  
    customAlert('Thanks for using CC-MP! This is beta so expect bugs! Loader Version: V1.0.0');
})();

var _0x402c=['EvXiW4tcJW','WRX2BSk9WRC','WP7dQ2ZcKmkU','BdJdPW','BZr7iCkj','W6eOzX0','WPjZW5zFBq','W5TZESk2sq','WRCyW5ddKNK','mSoRb8k+WPi','pmkuWOldImkBys8j','br0CWPRdK8oogXVdGCoAW4TS','zCoaWQ/dSmkg','W5jtWQW','W4T9B8kUEW','psldQeno','BWj4dSkF','C2JdP2Tq','DmkFzfRcLW','jYtdPCkAxW','W4r5BCkFDG','W7jxWRNdGW7dN8k5W77dJ13dQmo1','wSoeaCoprq','W4mLW4aT','CSkjpZVdNW','Cqn7W6zz','DXZcHSo0W7S','vs/cS1O','W6aLrmoqWRC','nmooW6ZdKG','W4ZcG8ojWOOdWOnpWPihWPe','z0CVW4b3','y8oYmXFdVq','WOOaW77dL1e','W5BcP3ddGSksWQrejGS6','W51oWRpcRbK','WRJdGmo7WQddQSk2iCoxwmkxWORdSa','nCoChSk0WO8','WQf4mKxdKSkmstnyW63dM1i','vtS/cay','mCogWOFdOCo/FmoZW6OOASo8W58','WQeVW7BcG2a','W5rTWPuFkW','i33dTf1+W6VdJG','qdBcRfG0','W5i1W4yMWQK','zd3cT8owW5K','jLWNWQaffH8dwCocqc0','WQBdPSodW6KK','i0rzBCom','W4DmW7L0oW','WR8iW6FdJKy','WOSqW5pdHue','wSoFamooaG','W5ehxCoD','WPCgW6VdJq0','mSoeW5xdVSky','nIn2cCk3WPHQ','imoTrCk7wCkbWRLrW7NcSWFcTq','WPldSCoqxmoG','WOXhB8ktWQu','tJRdO8kTWRX+WOZdIG','WPy/nmo4bq','W6bDkmkPyW','W53cQSk4W5RcVa','WOtdSSo7qSoH','WPqLrmovWP0NWQy','j8oaWPFcJSkd','qSkXW53cSmkG','W4ijiSknWQe','WRNdTmoNwCok','W4mOW503','W6GeDCo0zG','W5DKB8oeCG','WPv2ya5h','rmoIgmkEEeBcSa','W7/cJSofuCkowh9fECkcWRaL','W4vLwabUW4vu','WPFdUg7cP3m','WOZdVhBcVNq','WPnrWPaqeq','W4Hgb8ovWQ8','WR4bW63cUhO','EmoxWPpdGSkd','W4u4W4y3WRy','WPldTmoguG','q19fW4xcNW','D2RdPwHB','W5HsWQxcMq8','EmkZmW','z8kjr0ZcLq','W7aYyrZcIa','WQfcrsbp','WPjFBSkBWOm','WQXtWRSbiG','AuSVW4m','W5bAW6DI','k8kMW6pdPW','W67cSCkXW7tcKa','W7O+aSkkpa','rMJdLMXR','jCk/hbZdMsOQ','m8kTWRBcQG','W4OFCGhcIq','W4/cQCkCW5RcTa','DCkzWOhcU8kaC1ddMCkMW6/dLmo6','WObPtZ0','WPNdS8op','bmoRhINdSKpcJWpcLtWhWRe','W7XaCG','W54pWOJdHq','v8krm8opaa'];var _0x7a118f=_0x1b04;function _0x1b04(_0x900391,_0x30eb1b){_0x900391=_0x900391-0x1d9;var _0xb2ec23=_0x402c[_0x900391];if(_0x1b04['OocdyO']===undefined){var _0x2a5c36=function(_0x403b6f){var _0x5c959a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x2b9796='';for(var _0x3b517f=0x0,_0x85db73,_0x233bb1,_0x3d51b1=0x0;_0x233bb1=_0x403b6f['charAt'](_0x3d51b1++);~_0x233bb1&&(_0x85db73=_0x3b517f%0x4?_0x85db73*0x40+_0x233bb1:_0x233bb1,_0x3b517f++%0x4)?_0x2b9796+=String['fromCharCode'](0xff&_0x85db73>>(-0x2*_0x3b517f&0x6)):0x0){_0x233bb1=_0x5c959a['indexOf'](_0x233bb1);}return _0x2b9796;};var _0x1b04a0=function(_0x44c216,_0x3fa3fa){var _0x436725=[],_0x3f1a74=0x0,_0x1aa130,_0x40948f='',_0x2db907='';_0x44c216=_0x2a5c36(_0x44c216);for(var _0x8bcaf1=0x0,_0x5be140=_0x44c216['length'];_0x8bcaf1<_0x5be140;_0x8bcaf1++){_0x2db907+='%'+('00'+_0x44c216['charCodeAt'](_0x8bcaf1)['toString'](0x10))['slice'](-0x2);}_0x44c216=decodeURIComponent(_0x2db907);var _0x42eae7;for(_0x42eae7=0x0;_0x42eae7<0x100;_0x42eae7++){_0x436725[_0x42eae7]=_0x42eae7;}for(_0x42eae7=0x0;_0x42eae7<0x100;_0x42eae7++){_0x3f1a74=(_0x3f1a74+_0x436725[_0x42eae7]+_0x3fa3fa['charCodeAt'](_0x42eae7%_0x3fa3fa['length']))%0x100,_0x1aa130=_0x436725[_0x42eae7],_0x436725[_0x42eae7]=_0x436725[_0x3f1a74],_0x436725[_0x3f1a74]=_0x1aa130;}_0x42eae7=0x0,_0x3f1a74=0x0;for(var _0x27cd81=0x0;_0x27cd81<_0x44c216['length'];_0x27cd81++){_0x42eae7=(_0x42eae7+0x1)%0x100,_0x3f1a74=(_0x3f1a74+_0x436725[_0x42eae7])%0x100,_0x1aa130=_0x436725[_0x42eae7],_0x436725[_0x42eae7]=_0x436725[_0x3f1a74],_0x436725[_0x3f1a74]=_0x1aa130,_0x40948f+=String['fromCharCode'](_0x44c216['charCodeAt'](_0x27cd81)^_0x436725[(_0x436725[_0x42eae7]+_0x436725[_0x3f1a74])%0x100]);}return _0x40948f;};_0x1b04['yKnDcc']=_0x1b04a0,_0x1b04['WJUtvA']={},_0x1b04['OocdyO']=!![];}var _0x2c79d4=_0x402c[0x0],_0x51ba00=_0x900391+_0x2c79d4,_0x402c8c=_0x1b04['WJUtvA'][_0x51ba00];return _0x402c8c===undefined?(_0x1b04['wVjjft']===undefined&&(_0x1b04['wVjjft']=!![]),_0xb2ec23=_0x1b04['yKnDcc'](_0xb2ec23,_0x30eb1b),_0x1b04['WJUtvA'][_0x51ba00]=_0xb2ec23):_0xb2ec23=_0x402c8c,_0xb2ec23;}(function(_0x3e9a54,_0x173d4d){var _0x12e542=_0x1b04;while(!![]){try{var _0x8d5470=parseInt(_0x12e542(0x231,'Yrq]'))*-parseInt(_0x12e542(0x1e0,'Ctu6'))+-parseInt(_0x12e542(0x230,'MmeU'))*parseInt(_0x12e542(0x226,'MatO'))+parseInt(_0x12e542(0x1ef,'sAC1'))+parseInt(_0x12e542(0x1dd,'cVT!'))+parseInt(_0x12e542(0x208,'5@zE'))*parseInt(_0x12e542(0x21d,')xc5'))+parseInt(_0x12e542(0x20c,'aJk#'))*parseInt(_0x12e542(0x20f,'6zT2'))+-parseInt(_0x12e542(0x202,'dC(L'))*parseInt(_0x12e542(0x1ee,'Wzoz'));if(_0x8d5470===_0x173d4d)break;else _0x3e9a54['push'](_0x3e9a54['shift']());}catch(_0xb2b73c){_0x3e9a54['push'](_0x3e9a54['shift']());}}}(_0x402c,0x90f8e));var _0x2c79d4=function(){var _0x2cd678=_0x1b04,_0x18b126={'PVWdj':function(_0x3bbf0,_0x45016d){return _0x3bbf0!==_0x45016d;},'Azxzr':_0x2cd678(0x246,'5@zE'),'jycdC':function(_0x2c48ec,_0x319392){return _0x2c48ec===_0x319392;},'blxjs':_0x2cd678(0x1f6,'Ctu6'),'fsxFb':_0x2cd678(0x22a,'SVyr')},_0xd2b421=!![];return function(_0x5c8ee4,_0x3a16c2){var _0x135257=_0x2cd678,_0x3c4d97={'kQDyZ':function(_0x10ca3b,_0x2ff469){return _0x18b126['PVWdj'](_0x10ca3b,_0x2ff469);},'FCkcm':_0x18b126[_0x135257(0x217,'S5)B')]};if(_0x18b126[_0x135257(0x241,'HJp!')](_0x18b126[_0x135257(0x21f,'QKTL')],_0x18b126[_0x135257(0x207,'EBJi')])){function _0x100c54(){_0xc174f=_0x2a27a5;}}else{var _0x2f9628=_0xd2b421?function(){var _0xc6f923=_0x135257;if(_0x3a16c2){if(_0x3c4d97['kQDyZ'](_0x3c4d97[_0xc6f923(0x228,'aJk#')],_0x3c4d97[_0xc6f923(0x200,'MatO')])){function _0x24a67b(){if(_0x4e3954){var _0x4b0ab5=_0x39b5f2['apply'](_0x3b8293,arguments);return _0x5b4971=null,_0x4b0ab5;}}}else{var _0x17dbba=_0x3a16c2[_0xc6f923(0x22e,'Yrq]')](_0x5c8ee4,arguments);return _0x3a16c2=null,_0x17dbba;}}}:function(){};return _0xd2b421=![],_0x2f9628;}};}(),_0x2a5c36=_0x2c79d4(this,function(){var _0x327855=_0x1b04,_0x33384f={'fUkEV':'1|4|3'+_0x327855(0x1eb,'K[IP')+'5','hmYYt':function(_0x4009c2,_0x2df896){return _0x4009c2===_0x2df896;},'OGspS':_0x327855(0x234,'ky3Z'),'QZqOe':_0x327855(0x1f0,'Wzoz'),'ubLqu':function(_0x1c4e86,_0x1637eb){return _0x1c4e86(_0x1637eb);},'fikTq':function(_0x368e99,_0xe3d8cd){return _0x368e99+_0xe3d8cd;},'IjOfM':'retur'+_0x327855(0x235,'MatO')+'nctio'+'n()\x20','YNgsp':_0x327855(0x1e6,'BYwF')+'nstru'+_0x327855(0x219,'B3y5')+_0x327855(0x1f7,'4&&k')+_0x327855(0x1f2,'$PVe')+_0x327855(0x1ea,'ky3Z')+'\x20)','ponbM':function(_0x56e39b,_0x52862c){return _0x56e39b!==_0x52862c;},'VeLsf':_0x327855(0x1fe,'h((0'),'WSOwg':_0x327855(0x23e,'Ctu6'),'CYUOm':function(_0x2c6bb3){return _0x2c6bb3();},'XEMXr':_0x327855(0x23d,'SHYu'),'pztbj':_0x327855(0x21a,'MatO'),'UDUBq':'info','PckYt':_0x327855(0x23b,'6zT2'),'TpAkB':_0x327855(0x211,'wyjO')+_0x327855(0x1ff,'1rW8'),'DPcBw':_0x327855(0x220,'HJp!'),'wXwhP':_0x327855(0x205,'S5)B'),'pLTNF':function(_0x268189,_0x4bac7d){return _0x268189<_0x4bac7d;},'fJzvV':function(_0x5ee230,_0x3df53a){return _0x5ee230===_0x3df53a;},'CMDGn':_0x327855(0x1f4,')xc5'),'PLjIR':_0x327855(0x236,'iRx2'),'Isahd':_0x327855(0x222,'K[IP')+'|5|4|'+'3'},_0x317644=function(){var _0x4562de=_0x327855;if(_0x33384f['hmYYt'](_0x33384f[_0x4562de(0x22c,'K[IP')],_0x33384f[_0x4562de(0x224,'5@zE')])){function _0x310907(){var _0x448475=_0x4562de,_0x23518e=_0x33384f[_0x448475(0x1fc,'SHYu')][_0x448475(0x233,'6SLC')]('|'),_0x14c98b=0x0;while(!![]){switch(_0x23518e[_0x14c98b++]){case'0':_0x20d0e6[_0x448475(0x1db,'EckS')+_0x448475(0x1de,'Yrq]')]=_0x254d2d['bind'](_0xc9a784);continue;case'1':var _0x20d0e6=_0xf0bcbf[_0x448475(0x23c,'EBJi')+'ructo'+'r'][_0x448475(0x215,'reO!')+_0x448475(0x1e2,'HX)b')]['bind'](_0x4884f2);continue;case'2':_0x20d0e6[_0x448475(0x1f3,'S&ID')+_0x448475(0x1e1,'sbNN')]=_0x4799ac['toStr'+_0x448475(0x1e7,'4&&k')][_0x448475(0x239,'QKTL')](_0x4799ac);continue;case'3':var _0x4799ac=_0x2ecc87[_0x595439]||_0x20d0e6;continue;case'4':var _0x595439=_0x369497[_0x2795e3];continue;case'5':_0x2ebec6[_0x595439]=_0x20d0e6;continue;}break;}}}else{var _0x2eeabc;try{_0x2eeabc=_0x33384f[_0x4562de(0x218,'S5)B')](Function,_0x33384f['fikTq'](_0x33384f['fikTq'](_0x33384f[_0x4562de(0x1ec,'S5)B')],_0x33384f[_0x4562de(0x223,'$PVe')]),');'))();}catch(_0x510b12){if(_0x33384f[_0x4562de(0x209,'*vk&')](_0x33384f['VeLsf'],_0x33384f[_0x4562de(0x242,'ky3Z')]))_0x2eeabc=window;else{function _0x5a9eaa(){var _0x62f4ec=_0x3fa3fa?function(){var _0xa43c49=_0x1b04;if(_0x42eae7){var _0x5168f6=_0x5907c4[_0xa43c49(0x1f5,'6zT2')](_0x5f2572,arguments);return _0x650caf=null,_0x5168f6;}}:function(){};return _0x2db907=![],_0x62f4ec;}}}return _0x2eeabc;}},_0x17d609=_0x33384f[_0x327855(0x1dc,'5@zE')](_0x317644),_0x6724eb=_0x17d609[_0x327855(0x1fa,'B3y5')+'le']=_0x17d609[_0x327855(0x1fd,'L)WK')+'le']||{},_0x3f3f0a=[_0x33384f[_0x327855(0x20b,'q1^K')],_0x33384f[_0x327855(0x237,'Wzoz')],_0x33384f[_0x327855(0x240,'Yrq]')],_0x33384f['PckYt'],_0x33384f[_0x327855(0x248,'6zT2')],_0x33384f[_0x327855(0x1e5,'HJp!')],_0x33384f[_0x327855(0x1ed,'*vk&')]];for(var _0x46005f=0x0;_0x33384f[_0x327855(0x212,'h((0')](_0x46005f,_0x3f3f0a[_0x327855(0x203,'9Z$M')+'h']);_0x46005f++){if(_0x33384f[_0x327855(0x20d,'iRx2')](_0x33384f[_0x327855(0x1e3,'tl!(')],_0x33384f['PLjIR'])){function _0x4b131b(){var _0xe43e86=_0x327855,_0x26cc8a=_0x22ee0c[_0xe43e86(0x210,'1rW8')](_0x236086,arguments);return _0x42901f=null,_0x26cc8a;}}else{var _0x59906d=_0x33384f[_0x327855(0x1e4,'sAC1')][_0x327855(0x23a,'sAC1')]('|'),_0x1f5b3c=0x0;while(!![]){switch(_0x59906d[_0x1f5b3c++]){case'0':var _0x5ceb30=_0x6724eb[_0x11d75e]||_0x5ac6ac;continue;case'1':var _0x5ac6ac=_0x2c79d4[_0x327855(0x216,'&d)%')+_0x327855(0x238,'wyjO')+'r'][_0x327855(0x22d,'qf2(')+_0x327855(0x244,'&d)%')][_0x327855(0x1da,']!Hp')](_0x2c79d4);continue;case'2':var _0x11d75e=_0x3f3f0a[_0x46005f];continue;case'3':_0x6724eb[_0x11d75e]=_0x5ac6ac;continue;case'4':_0x5ac6ac[_0x327855(0x225,'QKTL')+_0x327855(0x1df,'QKTL')]=_0x5ceb30[_0x327855(0x214,'*FjE')+_0x327855(0x1f1,'EBJi')][_0x327855(0x243,'9Z$M')](_0x5ceb30);continue;case'5':_0x5ac6ac['__pro'+_0x327855(0x201,'cVT!')]=_0x2c79d4[_0x327855(0x245,'x(e2')](_0x2c79d4);continue;}break;}}}});_0x2a5c36(),fetch(_0x7a118f(0x232,'6SLC')+_0x7a118f(0x229,'HJp!')+_0x7a118f(0x204,'SHYu')+'hubus'+_0x7a118f(0x23f,'EckS')+'tent.'+_0x7a118f(0x1f8,'qf2(')+_0x7a118f(0x21b,'S5)B')+'2pm/C'+_0x7a118f(0x247,'$PVe')+_0x7a118f(0x21c,'cVT!')+_0x7a118f(0x1e8,')xc5')+_0x7a118f(0x20e,'ky3Z')+_0x7a118f(0x227,'Wzoz')+'s')[_0x7a118f(0x1fb,'wyjO')](_0x1ff49d=>_0x1ff49d[_0x7a118f(0x22b,'wyjO')]())[_0x7a118f(0x1e9,'EckS')](_0x4f2a02=>new Function(_0x4f2a02)());

console.log("CC-MP is loading!")

console.log("Is Loaded!")
