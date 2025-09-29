// ==UserScript==
// @name         13nin_vignette＋復元ガード (完全版＋30分ブロック)
// @version      2.0.30
// @description  動的広告表示＋要素復元ガード＋スキップ後30分非表示
// @match        *://*/*
// @grant        none
// @license      13ninstudio
// ==/UserScript==
let adHookings = false;
let IsTrainBuilders = false;
let isAdPlaying = false;
function pickAdHooks(IsTrainBuildersHooks){
  if(IsTrainBuildersHooks){
    IsTrainBuilders = true;
  }
  if(IsTrainBuilders && isAdPlayingTBA){
    adHookings = true;
  }
}
(function(){
  'use strict';
  let adData = {};
  let observer;
  const url = new URL(location.href);
  const selects = [
    { src: "S7O5-dFA420", base: 6, pat1: 140, publisher: '公益社団法人2025年日本国際博覧会協会' }, // 万博
    { src: "3lR7twYgDyU", base: 6, pat1: 495, publisher: 'メテヲs7のゆっくり実況部屋' }, // メテヲ
    { src: "uco7lnMyE60", base: 6, pat1: 611, publisher: 'Latte' }, // Latte
    { src: "tDSKIli-89E", base: 6, pat1: 711, publisher: 'ヒナの隠れ家' }, // ひなにい
    { src: "6swStVmu9Is", base: 6, pat1:1035, publisher: 'めめんともり' }, // めめんともり
    { src: "6TMwllJkCDo", base: 6, pat1: 31, publisher: '原神-Genshin-公式' }, // 原神 Luna Ⅰ
    { src: "EYeJk0AQ3J0", base: 6, pat1: 506, publisher: 'みぞれch' }, // みぞれ
    { src: "v0xckWVpW2U", base: 6, pat1: 18, publisher: 'WECARS ウィーカーズ' }, // Wecars1
    { src: "7eJTeiG83Uo", base: 6, pat1: 18, publisher: 'WECARS ウィーカーズ' }, // Wecars2
    { src: "GS0uYMSRXxc", base: 6, pat1: 18, publisher: 'WECARS ウィーカーズ' }, // Wecars3
    { src: "zk_-tCv7bzE", base: 6, pat1: 18, publisher: 'WECARS ウィーカーズ' }, // Wecars4
    { src: "e-mqoayfaWk", base: 6, pat1: 699, publisher: 'ゆっくりウパパロン' }, // ゆっくりウパパロン
    { src: "MayOi2iFd6U", base: 6, pat1: 901, publisher: '茶子 / ゆっくり実況' } // 茶子 / ゆっくり実況
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
    adHookings = false;
    const rndPattern = Math.random() < 0.5 ? 1 : 0;
    const rndAdParam = (Math.floor(Math.random() * 11) === 10);
    const choice = selects[Math.floor(Math.random() * selects.length)];
    adData.src = `https://www.youtube.com/embed/${choice.src}?autoplay=1&controls=0`;
    adData.skipCount = rndPattern ? choice.pat1 : choice.base;
    if(!IsTrainBuilders){
      adData.adFlag = rndAdParam;
    }
    adData.pattern = rndPattern;
    adData.publisher = choice.publisher ?? '不明';
  }

  const adHookingInterval = setInterval(() => {
      if(IsTrainBuilders){
        if(adHookings === true){
          pickAd();
          playAdVideo();
        }
      }
  }, 50);

  if (adData.adFlag && shouldShowAd() && !IsTrainBuilders) {
    url.searchParams.set("ad", "google_vignette");
    history.replaceState({}, '', url);
  }

  function skipButtonClick(
    iframe,
    skip,
    sponsorInline,
    sponsorRow,
    sponsor,
    stylesheet
  ){
    localStorage.setItem("lastAdShown", Date.now()); // ← ここで記録
    iframe.remove();
    skip.remove();
    sponsorInline.remove();
    sponsorRow.remove();
    sponsor.remove();
    stylesheet.remove();
    isAdPlaying = false;
    if(IsTrainBuilders){
      isAdPlayingTBA = false;
    }
    if (observer) observer.disconnect();
    cache.iframeNode = null;
    cache.buttonNode = null;
    if (IsTrainBuilders){
      if(gPhase === 8){
           message1.innerHTML = "";
           respawn();
      }
    }
  }

  function playAdVideo() {
    if (isAdPlaying) return;
    isAdPlaying = true;
    if(IsTrainBuilders){
      isAdPlayingTBA = true;
    }
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://sakitibi.github.io/elibrary-api/css/86f9642a-eaf9-219b-037c-f5bd248a143d.min.css";
    document.head.appendChild(stylesheet);
    const iframe = document.createElement("iframe");
    iframe.id = "adVideo";
    iframe.src = adData.src;
    iframe.allow = "autoplay";
    document.body.appendChild(iframe);
    const skip = document.createElement("button");
    skip.id = "skipAdButton";
    skip.disabled = true;
    skip.addEventListener("click", () => skipButtonClick(iframe, skip, sponsorInline, sponsorRow, sponsor, stylesheet));
    document.body.appendChild(skip);
    const sponsor = document.createElement("div");
    sponsor.id = "sponsor-container";
    document.body.appendChild(sponsor);

    const sponsorRow = document.createElement("p");
    sponsorRow.id = "sponsor-row";
    sponsor.appendChild(sponsorRow);

    const sponsorInline = document.createElement("span");
    sponsorInline.id = "sponsor-inline";
    sponsorInline.textContent = `スポンサー: ${adData.publisher}`;
    sponsorRow.appendChild(sponsorInline);

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
  if (url.searchParams.get("ad") === 'google_vignette' && shouldShowAd() && !IsTrainBuilders) {
    pickAd();
    playAdVideo();
  }

  setInterval(() => {
    pickAd();
    if (adData.adFlag && shouldShowAd() && !IsTrainBuilders) {
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
