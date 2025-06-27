// ==UserScript==
// @name         13nin_vignette＋復元ガード
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  動的広告表示＋要素復元ガード
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function(){
  'use strict';

  //───── 1. 初期化 ─────
  let isAdPlaying    = false;
  let adData         = {};
  const url          = new URL(location.href);
  const selects      = [
    { src: "S7O5-dFA420", base: 6, pat1:6 },
    { src: "Eh3cJyXCmBU", base: 483, pat1:483 },
    { src: "JQCGXDr5bd4", base: 735, pat1:735 },
    { src: "Arn-LtWbKxg", base: 934, pat1:934 },
    { src: "OaLgiEOYQqs", base:1028, pat1:1028 },
    { src: "_LhLyW4Yk-M", base:  32, pat1: 32 },
    { src: "Zh2W2fcRBT4", base:   6, pat1:  6 },
  ];

  window.blockAdBlock = false;
  window.canRunAds    = true;
  const devtools      = /./;
  devtools.toString   = () => "DevTools detected";

  //───── 2. 広告データをランダム設定 ─────
  function pickAd() {
    const rndPattern  = Math.random() < 0.5 ? 1 : 0;  // 0 or 1
    const rndAdParam  = (Math.floor(Math.random() * 11) === 10);
    const choice      = selects[Math.floor(Math.random() * selects.length)];

    adData.src        = `https://www.youtube.com/embed/${choice.src}?autoplay=1&controls=0`;
    adData.skipCount  = rndPattern ? choice.pat1 : choice.base;
    adData.adFlag     = rndAdParam;
    adData.pattern    = rndPattern;
  }

  pickAd();

  if (adData.adFlag) {
    url.searchParams.set("ad", "google_vignette");
  }
  history.replaceState({}, '', url);

  //───── 3. 広告再生関数 ─────
  function playAdVideo() {
    if (isAdPlaying) return;
    isAdPlaying = true;

    // iframe 作成
    const iframe = document.createElement("iframe");
    iframe.id     = "adVideo";
    iframe.src    = adData.src;
    Object.assign(iframe.style, {
      position: "fixed", top:0, left:0,
      width:"100vw", height:"100vh",
      zIndex:9999
    });
    iframe.allow = "autoplay";
    document.body.appendChild(iframe);

    // skip ボタン作成
    const skip = document.createElement("button");
    skip.id       = "skipAdButton";
    skip.disabled = true;
    skip.textContent = `スキップ あと${adData.skipCount}秒`;
    Object.assign(skip.style, {
      position:"fixed", bottom:"20px", right:"20px",
      padding:"10px 20px", fontSize:"18px", zIndex:10000
    });
    skip.addEventListener("click", () => {
      iframe.remove();
      skip.remove();
      isAdPlaying = false;
    });
    document.body.appendChild(skip);

    // カウントダウン
    let counter = adData.skipCount;
    const timer = setInterval(() => {
      counter--;
      if (counter > 0) {
        skip.textContent = `スキップ あと${counter}秒`;
      } else {
        clearInterval(timer);
        skip.disabled   = false;
        skip.textContent = "スキップ";
      }
    }, 1000);
  }

  //───── 4. 初回実行＆150秒ごと再実行 ─────
  if (url.searchParams.get("ad") === 'google_vignette') {
    playAdVideo();
  }
  setInterval(() => {
    // 再ピック＋URL更新＋実行判定
    pickAd();
    if (adData.adFlag) {
      url.searchParams.set("ad", "google_vignette");
      history.replaceState({}, '', url);
      playAdVideo();
    }
  }, 150000);

  //───── 5. MutationObserver：要素復元ガード ─────
  const cache = {
    videoButtonParent: null,
    iframeNode: null,
    buttonNode: null
  };

  // 広告出現時にキャッシュするヘルパー
  function cacheNodes() {
    const iframe = document.getElementById("adVideo");
    const btn    = document.getElementById("skipAdButton");
    if (iframe && btn && !cache.iframeNode) {
      cache.videoButtonParent = document.body;
      cache.iframeNode        = iframe.cloneNode(true);
      cache.buttonNode        = btn.cloneNode(true);
    }
  }

  // ページ全体を監視
  const observer = new MutationObserver(muts => {
    muts.forEach(m => {
      // 新しい iframe/button が出たらキャッシュ
      if (m.addedNodes.length) cacheNodes();

      // 削除されたら復元
      m.removedNodes.forEach(n => {
        if (n.id === "adVideo" && cache.iframeNode) {
          cache.videoButtonParent.appendChild(cache.iframeNode.cloneNode(true));
        }
        if (n.id === "skipAdButton" && cache.buttonNode) {
          cache.videoButtonParent.appendChild(cache.buttonNode.cloneNode(true));
        }
      });

      // 属性いじられたら復元
      if (m.type === "attributes") {
        const tgt = m.target;
        if (tgt.id === "skipAdButton" && cache.buttonNode) {
          const attr = m.attributeName;
          const val  = cache.buttonNode.getAttribute(attr);
          if (val == null) tgt.removeAttribute(attr);
          else tgt.setAttribute(attr, val);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true, subtree: true,
    attributes: true, attributeFilter: ["disabled", "style"]
  });

})();
