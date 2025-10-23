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
(async function(){
  'use strict';
  let adData = {};
  let observer;
  const url = new URL(location.href);
  let srcs = [];
  async function fetched(){
    const res = await fetch("https://sakitibi.github.io/13ninadmanager.com/vignette_metadata.json");
    const data = await res.json();
    srcs = data.src;
  }
  await fetched();
  const selects = [
    { src: srcs[0], pat1: 490, publisher: 'メテヲs7のゆっくり実況部屋' }, // メテヲ
    { src: srcs[1], pat1: 717, publisher: 'Latte' }, // Latte
    { src: srcs[2], pat1: 902, publisher: 'ヒナの隠れ家' }, // ひなにい
    { src: srcs[3], pat1:1028, publisher: 'めめんともり' }, // めめんともり
    { src: srcs[4], pat1: 31, publisher: '原神-Genshin-公式' }, // 原神 Luna Ⅰ
    { src: srcs[5], pat1: 537, publisher: 'みぞれch' }, // みぞれ
    { src: srcs[6], pat1: 18, publisher: 'WECARS ウィーカーズ' }, // Wecars1
    { src: srcs[7], pat1: 18, publisher: 'WECARS ウィーカーズ' }, // Wecars2
    { src: srcs[8], pat1: 18, publisher: 'WECARS ウィーカーズ' }, // Wecars3
    { src: srcs[9], pat1: 18, publisher: 'WECARS ウィーカーズ' }, // Wecars4
    { src: srcs[10], pat1: 726, publisher: 'ゆっくりウパパロン' }, // ゆっくりウパパロン
    { src: srcs[11], pat1: 641, publisher: '茶子 / ゆっくり実況' }, // 茶子 / ゆっくり実況
    { src: srcs[12], pat1: 18, publisher: 'WECARS ウィーカーズ' }, // Wecars5
  ];

  function shouldShowAd() {
    const last = parseInt(localStorage.getItem("lastAdShown") || "0", 10);
    if(location.origin === "https://sakitibi.github.io" || location.origin === "https://asakura-wiki.vercel.app"){
      return (Date.now() - last) > 18e5;
    } else {
      return (Date.now() - last) > 9e5;
    }
  }

  function pickAd() {
    const rndPattern = Math.random() < 0.5 ? 1 : 0;
    const rndAdParam = (Math.floor(Math.random() * 11) === 10);
    const choice = selects[Math.floor(Math.random() * selects.length)];
    adData.src = `https://www.youtube.com/embed/${choice.src}`;
    adData.skipCount = rndPattern ? choice.pat1 : 6;
    if(!IsTrainBuilders){
      adData.adFlag = rndAdParam;
    }
    adData.pattern = rndPattern;
    adData.publisher = choice.publisher ?? '不明';
  }

  pickAd();
  
  if (adData.adFlag && shouldShowAd() && !IsTrainBuilders) {
    url.searchParams.set("ad", "google_vignette");
    history.replaceState({}, '', url);
  }

  if (url.searchParams.get("ad") === 'google_vignette' && shouldShowAd() && !IsTrainBuilders) {
    playAdVideo();
  }
  
  const adHookingInterval = setInterval(() => {
      if(IsTrainBuilders){
        if(adHookings === true){
          playAdVideo();
        }
      }
  }, 50);

  function skipButtonClick(
    iframe,
    skip,
    sponsor,
    detailsContainer,
    stylesheet
  ){
    console.log("ad skiped", {
      iframe,
      skip,
      sponsor,
      detailsContainer,
      stylesheet,
    });
    observer.disconnect();
    cache.iframeNode = null;
    cache.buttonNode = null;
    localStorage.setItem("lastAdShown", Date.now()); // ← ここで記録
    iframe.remove();
    skip.remove();
    sponsor.remove();
    detailsContainer.remove();
    stylesheet.remove();
    if(IsTrainBuilders){
      isAdPlayingTBA = false;
      localStorage.setItem("isAdPlayingTBA", false);
    }
    isAdPlaying = false;
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
      adHookings = false;
      isAdPlayingTBA = true;
    }
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://sakitibi.github.io/elibrary-api/css/86f9642a-eaf9-219b-037c-f5bd248a143d.min.css";
    document.head.appendChild(stylesheet);
    const iframe = document.createElement("iframe");
    iframe.id = "adVideoFrame";
    iframe.src = `https://sakitibi.github.io/13ninadmanager.com/13nin_vignette?src=${adData.src.slice(30,adData.src.length)}`;
    document.body.appendChild(iframe);
    const skip = document.createElement("button");
    skip.id = "skipAdButton";
    skip.disabled = true;
    skip.addEventListener("click", () => skipButtonClick(
      iframe,
      skip,
      sponsor,
      detailsContainer,
      stylesheet
    ));
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

    const detailsContainer = document.createElement("div");
    detailsContainer.id = "details-container";
    document.body.appendChild(detailsContainer);

    const detailsDescContainer = document.createElement("div");
    detailsDescContainer.id = "detailsDescriptionContainer";
    detailsContainer.appendChild(detailsDescContainer);

    const detailsDescTexts = document.createElement("div");
    detailsDescTexts.id = "detailsDescriptionTexts";
    detailsDescTexts.textContent = adData.description ?? "";
    detailsDescContainer.appendChild(detailsDescTexts);

    const detailsDescUrls = document.createElement("div");
    detailsDescUrls.id = "detailsDescriptionUrls";
    detailsDescUrls.textContent = adData.urls ?? "";
    detailsDescContainer.appendChild(detailsDescUrls);

    const detailsButton = document.createElement("button");
    detailsButton.id = "detailsButton";
    detailsButton.textContent = "詳細";
    detailsContainer.appendChild(detailsButton);

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
      }, 1e3);
    }

  setInterval(() => {
    pickAd();
    if (adData.adFlag && shouldShowAd() && !IsTrainBuilders) {
      url.searchParams.set("ad", "google_vignette");
      history.replaceState({}, '', url);
      playAdVideo();
    }
  }, 15e4);

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
