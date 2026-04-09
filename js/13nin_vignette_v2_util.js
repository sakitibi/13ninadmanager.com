(async function() {
    'use strict';

    let engine = null;
    const JSON_URL = "https://sakitibi.github.io/13ninadmanager.com/vignette_metadata.json";

    // 1. Wasmモジュールの初期化
    // 404エラー対策：locateFile を定義してURLの二重結合を防止
    const moduleArg = {
        locateFile: function(path, prefix) {
            // パスが既に絶対URL(http...)ならそのまま返す
            if (path.startsWith("http")) {
                return path;
            }
            return prefix + path;
        }
    };

    try {
        // 13nin_vignette_v2_main.js の定義に合わせて呼び出し
        // ※もしエラーが出る場合はビルド時の設定名に合わせて 13nin_vignette_v2_main() 等に変更してください
        const Module = await createVignetteModule(moduleArg);
        
        // C++ の AdEngine クラスをインスタンス化
        engine = new Module.AdEngine();

        // 2. メタデータの取得と C++ への転送
        const res = await fetch(JSON_URL);
        const data = await res.json();
        engine.setMetadata(data.src, data.times);
        console.log("Wasm Metadata initialized.");

        // 詳細ボタンのコールバック設定
        Module.onDetailsClick = function() {
            const adData = engine.getCurrentAdData();
            window.open(adData.site, "_blank");
        };

        // --- 以下、定期実行・イベントロジック ---

        // スキップボタンのカウントダウン
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
                    btn.onclick = () => engine.skipButtonClick();
                }
            }, 1000);
        };

        // 復元ガード
        window.initMutationGuard = function() {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.removedNodes.forEach(node => {
                        if (node.id === "adVideoFrame" || node.id === "skipAdButton") {
                            engine.playAdVideo();
                        }
                    });
                });
            });
            observer.observe(document.body, { childList: true, subtree: true });
        };

        // 初期広告チェック
        engine.pickAd();
        if (engine.shouldShowAd()) {
            const data = engine.getCurrentAdData();
            if (data.adFlag) {
                const url = new URL(location.href);
                url.searchParams.set("ad", "google_vignette");
                history.replaceState({}, '', url);
                engine.playAdVideo();
            }
        }

        // 150秒ごとの広告チェック
        setInterval(() => {
            if (engine && engine.shouldShowAd()) {
                engine.pickAd();
                if (engine.getCurrentAdData().adFlag) engine.playAdVideo();
            }
        }, 150000);

        // 50ms ごとの監視
        setInterval(() => {
            if (engine) engine.updateInterval(); 
        }, 50);

    } catch (err) {
        console.error("Initialization failed:", err);
    }
})();