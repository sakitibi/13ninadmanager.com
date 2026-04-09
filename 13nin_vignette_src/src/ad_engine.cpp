#include "ad_engine.hpp"
#include "dom_utils.hpp"
#include <emscripten/val.h>
#include <algorithm>
#include <string>
#include <vector>

using namespace emscripten;

AdEngine::AdEngine() : isAdPlaying(false) {}

void AdEngine::setMetadata(val srcs, val times) {
    selects.clear();
    const std::string site_baseurl = "https://13ninadmanagerclick.vercel.app/ck/";
    
    // 元のUserScriptに基づいたパブリッシャーと遷移先キーの完全なリスト
    struct Meta { std::string pub; std::string key; };
    std::vector<Meta> metaList = {
        {"メテヲs7のゆっくり実況部屋", "9SrU_djJLoOmVc4UX0k8CM7hElCgVGFZnM9cDDQ9byD5q5Isz-yKD1lO-FTYajEawD6o-LUCdDwGzqRzab4I7R1QHCJQA15srIODy2Qk22RQtDM1uWr5TyW3n-lfMgnjyN0zm-fnTvqdV1KH2jQJpGd4B9zQXu"},
        {"Latte", "QxmTxWxnD4zsAHrRTDLW4ObxvHec4diHfmoCDhYhkWAW5XgFacyKtUAkfigfUTE48dceqhY2yBmCCgWZOdvfl_GWjAPUEoFMShziSNGH-U2swvis6crubVcdIMs-Q72cgcSs_S3av6rCC3UIsXyMKsYe1qqEHez4trJ"},
        {"ヒナの隠れ家", "IwV62n9DIUgcOfQSYSPBSWPsnSAypR-NJG6LVjSzRImGzvrKjyVEqoM7hC7Gil-O7QJ_3bj7WnpOKQEvkcyu7Nxtl4tgT8GdrVl5cdamSzhmEufQKkpDr4YwIzDZ79I54aW42c_kQZsQZvmCCw165t4SUmMFh0bP7uePJlyCaXBB3mtHuMyroZk9"},
        {"めめんともり", "TKQVLhl2WhWwQ82S6OqY3-vXny3k3cs-ORby3iXuGvRjwtU6L8kVnCrFv2QHgoop-KxTovTdn6d_QRjqZFWAI7WsHmLLOTkVhY2tAujmyUouoBcNUOzwfj"},
        {"原神-Genshin-公式", "wfT-jXAd_ayThE7j615gVbniRpgB2cGb02osMmyOhy9DvK1_kzZZDIe60hxbk8OHK2tguZ7xac83Yl26qaVm4ZHN46GKdf6k5kS5q1aH7Q"},
        {"みぞれch", "F0qm-fkYK8ZZN8jnr077MMu4Zl9E8rhmEeimB_ax8KJcy6UqhzbhqgbG6FtPsr3G3kerRXU7KFP-39-V0QRb7CNZojGyK2Xe2pXsDc7W2m6nVjZmcYeHRL"},
        {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
        {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
        {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
        {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
        {"ゆっくりウパパロン", "Flhv9cz5_Nl143zsAcuVhkyv1NicSoU4tv9bfMQJdbVkogsEzROVkvZY0na8rZg0-klWelCsgeXC2VWJDW9MO5dIsTp4jD6ZSbw2hTpG7RD_UhOegX2zzXfxFGvDvcF3Ed0Otsg7Tf-"},
        {"茶子 / ゆっくり実況", "DFtDSz_Gd9ln2mtRBn3jGzy8gk8ofJpOEsD5zUEV87csq3epjwwziPdP6Lf6vbjzeBOLC61WPfqPMI4NMg56-MT-nLYX9RkPfBTkf3XYxeW56l3krEwjgmI"},
        {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
        {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
        {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
        {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
        {"あかさかの箱", "CcRpgdMOX_yg1YHmtNaeR8unSC4ob_apwt64QDEP2EaWP3MNp5G4P4ZP5qF1ZGHSUpkck5GjxOf78KcZExWdowtCnIHj3XvcKYC17SKwCN9MkuKj660oQMomuvNtJB8iOF8_H400vG_ixVlEW94gN3bnH6XH0BX1zuzUB4ytgxiafpwb_x"}
    };

    // JSONから渡されたsrcs配列の長さ分ループ
    size_t len = srcs["length"].as<size_t>();
    for (size_t i = 0; i < len; ++i) {
        AdChoice ad;
        ad.src = srcs[i].as<std::string>(); // JSONのsrcデータ
        ad.pat1 = times[i].as<int>();       // JSONのtimesデータ
        
        if (i < metaList.size()) {
            ad.publisher = metaList[i].pub;
            ad.site = site_baseurl + metaList[i].key;
        } else {
            ad.publisher = "不明";
            ad.site = "./";
        }
        selects.push_back(ad);
    }
}

bool AdEngine::shouldShowAd() {
    val window = val::global("window");
    val localStorage = window["localStorage"];
    val lastStr = localStorage.call<val>("getItem", val("lastAdShown"));
    
    long long last = lastStr.isNull() ? 0 : std::stoll(lastStr.as<std::string>());
    long long now = window["Date"].call<val>("now").as<long long>();
    
    std::string origin = window["location"]["origin"].as<std::string>();
    // 元のロジック: 特定ドメインは30分、それ以外は15分
    long long threshold = (origin == "https://sakitibi.github.io" || origin == "https://asakura-wiki.vercel.app") ? 1800000 : 900000;
    
    return (now - last) > threshold;
}

void AdEngine::pickAd() {
    if (selects.empty()) return;

    double rnd = val::global("Math").call<double>("random");
    int idx = static_cast<int>(rnd * selects.size());
    AdChoice choice = selects[idx];

    bool rndPattern = val::global("Math").call<double>("random") < 0.5;
    
    currentAdData.set("src", val("https://www.youtube.com/embed/" + choice.src));
    currentAdData.set("skipCount", rndPattern ? choice.pat1 : 6);
    currentAdData.set("publisher", val(choice.publisher));
    currentAdData.set("site", val(choice.site));
    // 1/11の確率でフラグを立てる
    bool adFlag = (static_cast<int>(val::global("Math").call<double>("random") * 11) == 10);
    currentAdData.set("adFlag", adFlag);
}

void AdEngine::playAdVideo() {
    if (isAdPlaying) return;
    isAdPlaying = true;

    // 1. スタイル適用
    dom::injectStyle("https://sakitibi.github.io/elibrary-api/css/86f9642a-eaf9-219b-037c-f5bd248a143d.min.css");

    // 2. Iframe (動画)
    val iframe = dom::createElement("iframe", "adVideoFrame");
    std::string fullSrc = currentAdData["src"].as<std::string>();
    // URLからID部分のみ抽出してパラメータ付与
    std::string ytId = fullSrc.substr(fullSrc.find_last_of('/') + 1);
    iframe.set("src", val("https://sakitibi.github.io/13ninadmanager.com/13nin_vignette?src=" + ytId));

    // 3. スポンサー表示
    val sponsor = dom::createElement("div", "sponsor-container");
    val sponsorRow = dom::createElement("p", "sponsor-row", sponsor);
    val sponsorInline = dom::createElement("span", "sponsor-inline", sponsorRow);
    dom::setText(sponsorInline, "スポンサー: " + currentAdData["publisher"].as<std::string>());

    // 4. 詳細ボタン
    val detailsContainer = dom::createElement("div", "details-container");
    val detailsBtn = dom::createElement("button", "detailsButton", detailsContainer);
    val detailsSpan = dom::createElement("span", "detailsButtonInline", detailsBtn);
    dom::setText(detailsSpan, "詳細");
    
    // 詳細クリックイベント (JS側に委譲または直接記述)
    detailsBtn.set("onclick", val::module_property("onDetailsClick"));

    // 5. スキップボタン
    val skipBtn = dom::createElement("button", "skipAdButton");
    skipBtn.set("disabled", true);
    
    // カウントダウン開始
    val::global().call<void>("startWasmTimer");

    // 6. 復元ガード（MutationObserver）をJS側で開始させる
    val::global().call<void>("initMutationGuard");
}

void AdEngine::skipButtonClick() {
    isAdPlaying = false;
    dom::removeElement("adVideoFrame");
    dom::removeElement("skipAdButton");
    dom::removeElement("sponsor-container");
    dom::removeElement("details-container");
    
    val::global("localStorage").call<void>("setItem", val("lastAdShown"), val::global("Date").call<val>("now"));
}