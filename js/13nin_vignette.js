// ==UserScript==
// @name         13nin_vignette＋復元ガード (完全版＋30分ブロック)
// @version      2.0.70
// @description  動的広告表示＋要素復元ガード＋スキップ後30分非表示
// @match        *://*/*
// @grant        none
// @license      13ninstudio
// ==/UserScript==
let adHookings = false;
let IsTrainBuilders = false;
let isAdPlaying = false;
let hooks_counter = 0;
function pickAdHooks(IsTrainBuildersHooks){
  if(hooks_counter > 0) return;
  console.log("pickAdHooks called");
  hooks_counter++;
  if(IsTrainBuildersHooks){
    IsTrainBuilders = true;
  }
  if(IsTrainBuilders && !isAdPlayingTBA){
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
  const site_baseurl = "https://13ninadmanagerclick.vercel.app/ck/";
  const selects = [
    { src: srcs[0], pat1: 495, publisher: 'メテヲs7のゆっくり実況部屋', site: `${site_baseurl}9SrU_djJLoOmVc4UX0k8CM7hElCgVGFZnM9cDDQ9byD5q5Isz-yKD1lO-FTYajEawD6o-LUCdDwGzqRzab4I7R1QHCJQA15srIODy2Qk22RQtDM1uWr5TyW3n-lfMgnjyN0zm-fnTvqdV1KH2jQJpGd4B9zQXu` }, // メテヲ
    { src: srcs[1], pat1: 628, publisher: 'Latte', site: `${site_baseurl}QxmTxWxnD4zsAHrRTDLW4ObxvHec4diHfmoCDhYhkWAW5XgFacyKtUAkfigfUTE48dceqhY2yBmCCgWZOdvfl_GWjAPUEoFMShziSNGH-U2swvis6crubVcdIMs-Q72cgcSs_S3av6rCC3UIsXyMKsYe1qqEHez4trJ` }, // Latte
    { src: srcs[2], pat1: 998, publisher: 'ヒナの隠れ家', site: `${site_baseurl}IwV62n9DIUgcOfQSYSPBSWPsnSAypR-NJG6LVjSzRImGzvrKjyVEqoM7hC7Gil-O7QJ_3bj7WnpOKQEvkcyu7Nxtl4tgT8GdrVl5cdamSzhmEufQKkpDr4YwIzDZ79I54aW42c_kQZsQZvmCCw165t4SUmMFh0bP7uePJlyCaXBB3mtHuMyroZk9` }, // ひなにい
    { src: srcs[3], pat1: 1072, publisher: 'めめんともり', site: `${site_baseurl}TKQVLhl2WhWwQ82S6OqY3-vXny3k3cs-ORby3iXuGvRjwtU6L8kVnCrFv2QHgoop-KxTovTdn6d_QRjqZFWAI7WsHmLLOTkVhY2tAujmyUouoBcNUOzwfj` }, // めめんともり
    { src: srcs[4], pat1: 32, publisher: '原神-Genshin-公式', site: `${site_baseurl}wfT-jXAd_ayThE7j615gVbniRpgB2cGb02osMmyOhy9DvK1_kzZZDIe60hxbk8OHK2tguZ7xac83Yl26qaVm4ZHN46GKdf6k5kS5q1aH7Q` }, // 原神 Luna Ⅳ
    { src: srcs[5], pat1: 544, publisher: 'みぞれch', site: `${site_baseurl}F0qm-fkYK8ZZN8jnr077MMu4Zl9E8rhmEeimB_ax8KJcy6UqhzbhqgbG6FtPsr3G3kerRXU7KFP-39-V0QRb7CNZojGyK2Xe2pXsDc7W2m6nVjZmcYeHRL` }, // みぞれ
    { src: srcs[6], pat1: 18, publisher: 'WECARS ウィーカーズ', site: `${site_baseurl}6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka` }, // Wecars1
    { src: srcs[7], pat1: 18, publisher: 'WECARS ウィーカーズ', site: `${site_baseurl}6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka` }, // Wecars2
    { src: srcs[8], pat1: 18, publisher: 'WECARS ウィーカーズ', site: `${site_baseurl}6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka` }, // Wecars3
    { src: srcs[9], pat1: 18, publisher: 'WECARS ウィーカーズ', site: `${site_baseurl}6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka` }, // Wecars4
    { src: srcs[10], pat1: 1454, publisher: 'ゆっくりウパパロン', site: `${site_baseurl}Flhv9cz5_Nl143zsAcuVhkyv1NicSoU4tv9bfMQJdbVkogsEzROVkvZY0na8rZg0-klWelCsgeXC2VWJDW9MO5dIsTp4jD6ZSbw2hTpG7RD_UhOegX2zzXfxFGvDvcF3Ed0Otsg7Tf-` }, // ゆっくりウパパロン
    { src: srcs[11], pat1: 655, publisher: '茶子 / ゆっくり実況', site: `${site_baseurl}DFtDSz_Gd9ln2mtRBn3jGzy8gk8ofJpOEsD5zUEV87csq3epjwwziPdP6Lf6vbjzeBOLC61WPfqPMI4NMg56-MT-nLYX9RkPfBTkf3XYxeW56l3krEwjgmI` }, // 茶子 / ゆっくり実況
    { src: srcs[12], pat1: 18, publisher: 'WECARS ウィーカーズ', site: `${site_baseurl}6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka` }, // Wecars5
    { src: srcs[13], pat1: 18, publisher: 'WECARS ウィーカーズ', site: `${site_baseurl}6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka` }, // Wecars6
    { src: srcs[14], pat1: 18, publisher: 'WECARS ウィーカーズ', site: `${site_baseurl}6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka` }, // Wecars6別バージョン
    { src: srcs[15], pat1: 18, publisher: 'WECARS ウィーカーズ', site: `${site_baseurl}6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka` }, // Wecars7
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
    adData.site = choice.site ?? "./";
    console.log("adData: ", adData);
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
        console.log("adHookingInterval IsTrainBuilders true");
        if(adHookings){
          adHookings = false;
          console.log("playAdVideo of TrainBuilders", adHookings);
          pickAd();
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
    hooks_counter = 0;
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
    detailsButton.addEventListener("click", () => {
      if(IsTrainBuilders){
        sessionStorage.setItem("open_adlink", adData.site ?? "./");
      } else {
        window.open(adData.site ?? "./", "_blank")
      }
    });
    detailsContainer.appendChild(detailsButton);

    const detailsButtonInline = document.createElement("span");
    detailsButtonInline.id = "detailsButtonInline";
    detailsButtonInline.textContent = "詳細";
    detailsButton.appendChild(detailsButtonInline);

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
