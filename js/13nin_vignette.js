// ==UserScript==
// @name         13nin_vignette＋復元ガード (完全版)
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  動的広告表示＋要素復元ガード（スキップ制御完全対応）
// @match        *://*/*
// @grant        none
// @lisence      13ninstudio
// ==/UserScript==

(function(){
  'use strict';

  //───── 1. 初期化 ─────
  let isAdPlaying = false;
  let adData       = {};
  let observer;  // 後でdisconnectするため外側に宣言
  const url        = new URL(location.href);
  const selects    = [
    { src: "S7O5-dFA420", base:   6, pat1: 140 },
    { src: "Eh3cJyXCmBU", base:   6, pat1: 483 },
    { src: "JQCGXDr5bd4", base:   6, pat1: 735 },
    { src: "Arn-LtWbKxg", base:   6, pat1: 934 },
    { src: "OaLgiEOYQqs", base:   6, pat1:1028 },
    { src: "_LhLyW4Yk-M", base:   6, pat1:  32 },
    { src: "zIqNvunFAXs", base:   6, pat1:   6 }
  ];

  window.blockAdBlock = false;
  window.canRunAds    = true;
  const devtools      = /./;
  devtools.toString   = () => "DevTools detected";

  //───── 2. 広告データをランダム設定 ─────
  function pickAd() {
    const rndPattern = Math.random() < 0.5 ? 1 : 0;
    const rndAdParam = (Math.floor(Math.random() * 11) === 10);
    const choice     = selects[Math.floor(Math.random() * selects.length)];

    adData.src       = `https://www.youtube.com/embed/${choice.src}?autoplay=1&controls=0`;
    adData.skipCount = rndPattern ? choice.pat1 : choice.base;
    adData.adFlag    = rndAdParam;
    adData.pattern   = rndPattern;
  }
  pickAd();

  if (adData.adFlag) {
    url.searchParams.set("ad", "google_vignette");
    history.replaceState({}, '', url);
  }

  //───── 3. 広告再生関数 ─────
  function playAdVideo() {
    if (isAdPlaying) return;
    isAdPlaying = true;

    // iframe 作成
    const iframe = document.createElement("iframe");
    iframe.id    = "adVideo";
    iframe.src   = adData.src;
    Object.assign(iframe.style, {
      position: "fixed", top:0, left:0,
      width:    "100vw", height:"100vh",
      zIndex:   9999
    });
    iframe.allow = "autoplay";
    document.body.appendChild(iframe);

    // skip ボタン作成
    const skip = document.createElement("button");
    skip.id         = "skipAdButton";
    skip.disabled   = true;
    skip.textContent= `スキップ あと${adData.skipCount}秒`;
    Object.assign(skip.style, {
      position: "fixed",
      bottom:   "20px",
      right:    "20px",
      padding:  "10px 20px",
      fontSize: "18px",
      zIndex:   10000
    });

    // クリック時に observer を止めキャッシュクリア
    skip.addEventListener("click", () => {
      iframe.remove();
      skip.remove();
      isAdPlaying = false;
      if (observer) observer.disconnect();
      cache.iframeNode = null;
      cache.buttonNode = null;
    });

    document.body.appendChild(skip);

    // カウントダウン（0秒も表示）
    let counter = adData.skipCount;
    const timer = setInterval(() => {
      if (counter >= 0) {
        skip.textContent = `スキップ あと${counter}秒`;
        counter--;
      } else {
        clearInterval(timer);
        skip.disabled   = false;
        skip.textContent= "スキップ";
      }
    }, 1000);
  }

  //───── 4. 初回実行＆150秒ごと再実行 ─────
  if (url.searchParams.get("ad") === 'google_vignette') {
    playAdVideo();
  }
  setInterval(() => {
    pickAd();
    if (adData.adFlag) {
      url.searchParams.set("ad", "google_vignette");
      history.replaceState({}, '', url);
      playAdVideo();
    }
  }, 150000);

  //───── 5. MutationObserver：要素復元ガード ─────
  const cache = { videoButtonParent: null, iframeNode: null, buttonNode: null };

  // 初回キャッシュ取得
  function cacheNodes() {
    const iframe = document.getElementById("adVideo");
    const btn    = document.getElementById("skipAdButton");
    if (iframe && btn && !cache.iframeNode) {
      cache.videoButtonParent = document.body;
      cache.iframeNode        = iframe.cloneNode(true);
      cache.buttonNode        = btn.cloneNode(true);
    }
  }

  observer = new MutationObserver(muts => {
    muts.forEach(m => {
      if (m.addedNodes.length) cacheNodes();

      // 削除されたら復元（disconnect前なら動作）
      m.removedNodes.forEach(n => {
        if (n.id === "adVideo" && cache.iframeNode) {
          cache.videoButtonParent.appendChild(cache.iframeNode.cloneNode(true));
        }
        if (n.id === "skipAdButton" && cache.buttonNode) {
          cache.videoButtonParent.appendChild(cache.buttonNode.cloneNode(true));
        }
      });

      // style 属性の改変だけ復元対象
      if (m.type === "attributes" && m.attributeName === "style") {
        const tgt = m.target;
        if (tgt.id === "skipAdButton" && cache.buttonNode) {
          const val = cache.buttonNode.getAttribute("style");
          if (val) tgt.setAttribute("style", val);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList:    true,
    subtree:      true,
    attributes:   true,
    // disabled を除外し、押下後の有効化を維持
    attributeFilter: ["style"]
  });

})();
