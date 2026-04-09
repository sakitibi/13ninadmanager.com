#include "ad_engine.hpp"
#include "dom_utils.hpp"
#include "ad_data.hpp"
#include <emscripten/val.h>
#include <algorithm>
#include <string>
#include <vector>
#include <iostream>

using namespace emscripten;

// ヘルパー：JSのconsole.logを呼ぶ
void js_log(const std::string& msg) {
    val::global("console").call<void>("log", val("[Wasm Engine] " + msg));
}

AdEngine::AdEngine() : isAdPlaying(false) {
    js_log("Engine Instance Created");
}

void AdEngine::setMetadata(val srcs, val times) {
    selects.clear();

    size_t len = srcs["length"].as<size_t>();
    for (size_t i = 0; i < len; ++i) {
        AdChoice ad;
        ad.src = srcs[i].as<std::string>();
        ad.pat1 = times[i].as<int>();
        
        if (i < AdData::AD_META_LIST.size()) {
            ad.publisher = AdData::AD_META_LIST[i].pub;
            ad.site = AdData::SITE_BASEURL + AdData::AD_META_LIST[i].key;
        } else {
            ad.publisher = "不明";
            ad.site = "./";
        }
        selects.push_back(ad);
    }
    js_log("Metadata Initialized. Loaded: " + std::to_string(selects.size()) + " items.");
}

void AdEngine::updateInterval() {
    // 1. 再生フラグが折れていれば何もしない
    if (!isAdPlaying) return;

    val document = val::global("document");
    std::vector<std::string> targetIds = {
        "adVideoFrame",
        "skipAdButton",
        "sponsor-container",
        "details-container"
    };

    int missingCount = 0;
    for (const auto& id : targetIds) {
        val el = document.call<val>("getElementById", val(id));
        if (el.isNull()) {
            missingCount++;
        }
    }

    // 要素が全く消えていないなら正常なので終了
    if (missingCount == 0) return;

    // --- 判定ロジック ---
    
    // 2. 全ての要素が消えている場合
    // skipButtonClick によって意図的に消されたと判断する。
    // フラグを折って、これ以上の監視（再描画）を止める。
    if (missingCount == (int)targetIds.size()) {
        js_log("All elements cleared. Monitoring stopped.");
        isAdPlaying = false; 
        return;
    }

    // 3. 一部の要素だけが消えている場合 (1つ以上、4つ未満)
    // アドブロック等による部分的な削除とみなし、再描画を行う。
    js_log("Partial element loss detected! Recovering ad...");
    isAdPlaying = false; 
    playAdVideo();
}

bool AdEngine::shouldShowAd() {
    val window = val::global("window");
    val localStorage = window["localStorage"];
    val lastStr = localStorage.call<val>("getItem", val("lastAdShown"));
    
    long long last = lastStr.isNull() ? 0 : std::stoll(lastStr.as<std::string>());
    long long now = window["Date"].call<val>("now").as<long long>();
    
    std::string origin = window["location"]["origin"].as<std::string>();
    long long threshold = (origin == "https://sakitibi.github.io" || origin == "https://asakura-wiki.vercel.app") ? 1800000 : 900000;
    
    bool result = (now - last) > threshold;
    if (result) js_log("Threshold exceeded. Ready to show ad.");
    return result;
}

void AdEngine::pickAd() {
    if (selects.empty()) {
        js_log("Error: selects list is empty. Cannot pick ad.");
        return;
    }

    double rnd = val::global("Math").call<double>("random");
    int idx = static_cast<int>(rnd * selects.size());
    AdChoice choice = selects[idx];

    bool rndPattern = val::global("Math").call<double>("random") < 0.5;
    
    currentAdData.set("src", val("https://www.youtube.com/embed/" + choice.src));
    currentAdData.set("skipCount", rndPattern ? choice.pat1 : 6);
    currentAdData.set("publisher", val(choice.publisher));
    currentAdData.set("site", val(choice.site));
    
    bool adFlag = (static_cast<int>(val::global("Math").call<double>("random") * 11) == 10);
    currentAdData.set("adFlag", adFlag);

    js_log("Ad Picked: " + choice.publisher + (adFlag ? " [FLAGGED]" : " [NOT FLAGGED]"));
}

void AdEngine::playAdVideo() {
    if (isAdPlaying) return;
    isAdPlaying = true;
    
    js_log("Starting Ad Playback: " + currentAdData["publisher"].as<std::string>());

    dom::injectStyle("https://sakitibi.github.io/elibrary-api/css/86f9642a-eaf9-219b-037c-f5bd248a143d.min.css");

    val iframe = dom::createElement("iframe", "adVideoFrame");
    std::string fullSrc = currentAdData["src"].as<std::string>();
    std::string ytId = fullSrc.substr(fullSrc.find_last_of('/') + 1);
    iframe.set("src", val("https://sakitibi.github.io/13ninadmanager.com/13nin_vignette?src=" + ytId));

    val sponsor = dom::createElement("div", "sponsor-container");
    val sponsorRow = dom::createElement("p", "sponsor-row", sponsor);
    val sponsorInline = dom::createElement("span", "sponsor-inline", sponsorRow);
    dom::setText(sponsorInline, "スポンサー: " + currentAdData["publisher"].as<std::string>());

    val detailsContainer = dom::createElement("div", "details-container");
    val detailsBtn = dom::createElement("button", "detailsButton", detailsContainer);
    val detailsSpan = dom::createElement("span", "detailsButtonInline", detailsBtn);
    dom::setText(detailsSpan, "詳細");
    
    detailsBtn.set("onclick", val::module_property("onDetailsClick"));

    val skipBtn = dom::createElement("button", "skipAdButton");
    skipBtn.set("disabled", true);
    
    val::global().call<void>("startWasmTimer");
    val::global().call<void>("initMutationGuard");
}

void AdEngine::skipButtonClick() {
    js_log("Skip button clicked. Cleaning up.");
    isAdPlaying = false;
    dom::removeElement("adVideoFrame");
    dom::removeElement("skipAdButton");
    dom::removeElement("sponsor-container");
    dom::removeElement("details-container");
    
    long long now = val::global("Date").call<val>("now").as<long long>();
    val::global("localStorage").call<void>("setItem", val("lastAdShown"), val(std::to_string(now)));
    js_log("Timestamp updated in localStorage.");
}