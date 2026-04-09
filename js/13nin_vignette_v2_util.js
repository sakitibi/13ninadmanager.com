(async function() {
    'use strict';

    let engine = null;
    const JSON_URL = "https://sakitibi.github.io/13ninadmanager.com/vignette_metadata.json";

    // 1. Wasmモジュールの初期化
    // createAdEngineModule は Emscripten が生成する関数名
    const Module = await createAdEngineModule();
    
    // C++ の AdEngine クラスをインスタンス化
    engine = new Module.AdEngine();

    // 2. メタデータの取得と C++ への転送
    async function initMetadata() {
        try {
            const res = await fetch(JSON_URL);
            const data = await res.json();
            
            // C++ 側の setMetadata(val srcs, val times) を呼び出す
            engine.setMetadata(data.src, data.times);
            console.log("Wasm Metadata initialized.");
        } catch (err) {
            console.error("Failed to fetch metadata:", err);
        }
    }

    await initMetadata();

    // 3. C++ から呼ばれる/C++ を呼ぶためのヘルパー関数群
    
    // スキップボタンのカウントダウンタイマー (C++からキックされる)
    window.startWasmTimer = function() {
        const adData = engine.getCurrentAdData();
        let counter = adData.skipCount;
        const btn = document.getElementById("skipAdButton");
        if (!btn) return;

        const timer = setInterval(() => {
            if (counter >= 0) {
                btn.textContent = `スキップ あと${counter}秒`;
                counter--;
            } else {
                clearInterval(timer);
                btn.disabled = false;
                btn.textContent = "スキップ";
                // クリックイベントを Wasm の skipButtonClick に繋ぐ
                btn.onclick = () => {
                    engine.skipButtonClick();
                };
            }
        }, 1000);
    };

    // 復元ガード (MutationObserver) の初期化
    window.initMutationGuard = function() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                // 要素が削除されたら Wasm 側に再描画を依頼
                mutation.removedNodes.forEach(node => {
                    if (node.id === "adVideoFrame" || node.id === "skipAdButton") {
                        console.warn("Element removed! Recovering via Wasm...");
                        engine.playAdVideo();
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    // 詳細ボタンのコールバック (C++ 側の EMSCRIPTEN_BINDINGS で定義した名前)
    Module.onDetailsClick = function() {
        const adData = engine.getCurrentAdData();
        window.open(adData.site, "_blank");
    };

    // 4. 定期実行ロジック (元の UserScript を再現)

    // 初期チェック
    engine.pickAd();
    if (engine.shouldShowAd()) {
        const data = engine.getCurrentAdData();
        if (data.adFlag) {
            // URLにパラメータを付与
            const url = new URL(location.href);
            url.searchParams.set("ad", "google_vignette");
            history.replaceState({}, '', url);
            
            engine.playAdVideo();
        }
    }

    // 150秒ごとの広告チェック
    setInterval(() => {
        if (engine.shouldShowAd()) {
            engine.pickAd();
            const data = engine.getCurrentAdData();
            if (data.adFlag) {
                engine.playAdVideo();
            }
        }
    }, 150000);

    // 50ms ごとの TrainBuilders 等の監視 (必要であれば)
    setInterval(() => {
        // C++ 側の内部状態を更新し、必要なら playAdVideo を呼ぶ処理
        engine.updateInterval(); 
    }, 50);

})();