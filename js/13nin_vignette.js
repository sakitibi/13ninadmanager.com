// ==UserScript==
// @name         13nin_vignette＋復元ガード (完全版＋30分ブロック)
// @version      2.0.10
// @description  動的広告表示＋要素復元ガード＋スキップ後30分非表示
// @match        *://*/*
// @grant        none
// @license      13ninstudio
// ==/UserScript==

(function(){
  'use strict';

  let isAdPlaying = false;
  let adData = {};
  let observer;
  const url = new URL(location.href);
  const selects = [
    { src: "S7O5-dFA420", base: 6, pat1: 140 }, // 万博
    { src: "sgVVR34sHio", base: 6, pat1: 483 }, // メテヲ
    { src: "cK_UNkNVSx4", base: 6, pat1: 690 }, // Latte
    { src: "ch6RD5KlNaI", base: 6, pat1: 868 }, // ひなにい
    { src: "2A1NyXDNP2Y", base: 6, pat1:1007 }, // めめんともり
    { src: "_LhLyW4Yk-M", base: 6, pat1: 32 }, // 原神 v5.7
    { src: "c_LPwf5KbMc", base: 6, pat1: 567 }, // みぞれ
    { src: "7eJTeiG83Uo", base: 6, pat1: 17 } // Wecars
  ];

  function shouldShowAd() {
    const last = parseInt(localStorage.getItem("lastAdShown") || "0", 10);
    if(location.origin === "https://sakitibi.github.io" || location.origin === "https://asakura-wiki.vercel.app"){
      return (Date.now() - last) > 1800000;
    } else {
      return (Date.now() - last) > 900000;
    }
  }

  function pickAd() {
    const rndPattern = Math.random() < 0.5 ? 1 : 0;
    const rndAdParam = (Math.floor(Math.random() * 11) === 10);
    const choice = selects[Math.floor(Math.random() * selects.length)];
    adData.src = `https://www.youtube.com/embed/${choice.src}?autoplay=1&controls=0`;
    adData.skipCount = rndPattern ? choice.pat1 : choice.base;
    adData.adFlag = rndAdParam;
    adData.pattern = rndPattern;
  }

  pickAd();

  if (adData.adFlag && shouldShowAd()) {
    url.searchParams.set("ad", "google_vignette");
    history.replaceState({}, '', url);
  }

  function playAdVideo() {
    if (isAdPlaying) return;
    isAdPlaying = true;

    const iframe = document.createElement("iframe");
    iframe.id = "adVideo";
    iframe.src = adData.src;
    Object.assign(iframe.style, {
      position: "fixed", top: 0, left: 0,
      width: "100vw", height: "100vh",
      zIndex: 9999
    });
    iframe.allow = "autoplay";
    document.body.appendChild(iframe);

    const skip = document.createElement("button");
    skip.id = "skipAdButton";
    skip.disabled = true;
    Object.assign(skip.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "10px 20px",
      fontSize: "18px",
      zIndex: 10000
    });

    skip.addEventListener("click", () => {
      localStorage.setItem("lastAdShown", Date.now()); // ← ここで記録
      iframe.remove();
      skip.remove();
      isAdPlaying = false;
      if (observer) observer.disconnect();
      cache.iframeNode = null;
      cache.buttonNode = null;
    });

    document.body.appendChild(skip);

    const span = document.createElement("span");
    span.textContent = `スキップ あと${adData.skipCount}秒`;
    skip.appendChild(span);

    let counter = adData.skipCount;
      const timer = setInterval(() => {
          if (counter >= 0) {
            span.textContent = `スキップ あと${counter}秒`;
            counter--;
          } else {
            clearInterval(timer);
            skip.disabled = false;
            span.textContent = "スキップ";
          }
      }, 1000);
    }
  if (url.searchParams.get("ad") === 'google_vignette' && shouldShowAd()) {
    playAdVideo();
  }

  setInterval(() => {
    pickAd();
    if (adData.adFlag && shouldShowAd()) {
      url.searchParams.set("ad", "google_vignette");
      history.replaceState({}, '', url);
      playAdVideo();
    }
  }, 150000);

  const cache = { videoButtonParent: null, iframeNode: null, buttonNode: null };

  function cacheNodes() {
    const iframe = document.getElementById("adVideo");
    const btn = document.getElementById("skipAdButton");
    if (iframe && btn && !cache.iframeNode) {
      cache.videoButtonParent = document.body;
      cache.iframeNode = iframe.cloneNode(true);
      cache.buttonNode = btn.cloneNode(true);
    }
  }

  observer = new MutationObserver(muts => {
    muts.forEach(m => {
      if (m.addedNodes.length) cacheNodes();
      m.removedNodes.forEach(n => {
        if (n.id === "adVideo" && cache.iframeNode) {
          cache.videoButtonParent.appendChild(cache.iframeNode.cloneNode(true));
        }
        if (n.id === "skipAdButton" && cache.buttonNode) {
          cache.videoButtonParent.appendChild(cache.buttonNode.cloneNode(true));
        }
      });
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
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style"]
  });
})();
