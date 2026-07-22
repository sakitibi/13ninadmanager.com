(async function() {
    'use strict';

    let engine = null;
    const JSON_URL = [
        "https://14ninadmanagerclick.vercel.app/api/videoid",
        "https://sakitibi.github.io/13ninadmanager.com/vignette_metadata.json"
    ];

    const moduleArg = {
        locateFile: function(path, prefix) {
            if (path.startsWith("http")) return path;
            return prefix + path;
        }
    };

    try {
        // 1. Wasmモジュールのロード
        const Module = await createVignetteModule(moduleArg);

        // 2. C++ から呼ばれるグローバル関数の定義 (Engine 作成前に行うのが安全)
        
        // スキップタイマー
        window.startWasmTimer = function() {
            if (!engine) return;
            const adData = engine.getCurrentAdData();
            let counter = adData.skipCount;
            const btn = document.getElementById("skipAdButton");
            if (!btn) return;
            const inline = document.getElementById("skipAdButtonInline");
            const timer = setInterval(() => {
                if (counter >= 0) {
                    inline.textContent = `スキップ あと${counter}秒`;
                    counter--;
                } else {
                    clearInterval(timer);
                    btn.disabled = false;
                    inline.textContent = "スキップ";
                    // クリック時に C++ 側のフラグを下ろして要素を消す
                    btn.onclick = () => engine.skipButtonClick();
                }
            }, 1000);
        };

        // 詳細ボタン（Module経由）
        Module.onDetailsClick = function() {
            if (!engine) return;
            const adData = engine.getCurrentAdData();
            window.open(adData.site, "_blank");
        };

        // 3. Engine インスタンス化
        engine = new Module.AdEngine();

        // 4. メタデータの取得と転送
        /*const res1 = await fetch(JSON_URL[0], {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([
                "UU4YwPX5-38lsN_rlzSgd5kw",
                "UUhDD-mCbqd4182eI-T5wGbA",
                "UUONw_JcpiuvPpClHQi3CHXw",
                "UUy0DH4rgPPjDWVZO7wibcSQ",
                "UUE4m8LkxKQc40Pr0YB4d-5w",
                "UU_AoeaCVUk5afzONHvqFRjQ",
                "UUbECstWnFqR9Y8MN_uN4HfA",
                "UUJy7zfLsKBXoo2soFMum7JQ"
            ])
        })*/
        const res2 = await fetch(JSON_URL[1])
        const data = await Promise.all([
            //res1.json(),
            res2.json()
        ]);
        const srcArray = data[0].src/*.concat(data[1].src);*/
        const timesArray = data[0].times/*.concat(data[1].times);*/
        engine.setMetadata(srcArray, timesArray);
        console.log("Wasm Metadata initialized.");

        // 5. 初期広告チェック
        engine.pickAd();
        if (engine.shouldShowAd()) {
            const currentData = engine.getCurrentAdData();
            if (currentData.adFlag) {
                const url = new URL(location.href);
                url.searchParams.set("ad", "google_vignette");
                history.replaceState({}, '', url);
                
                // ここで playAdVideo が走っても、既に startWasmTimer が定義されているので
                // TypeError は発生しません。
                engine.playAdVideo();
            }
        }

        // --- タイマー処理 ---

        // 150秒ごとの広告チェック
        setInterval(() => {
            if (engine && engine.shouldShowAd()) {
                engine.pickAd();
                if (engine.getCurrentAdData().adFlag) engine.playAdVideo();
            }
        }, 150000);

        // 50ms ごとの Wasm 監視 (不正削除対策)
        setInterval(() => {
            if (engine) engine.updateInterval(); 
        }, 50);

    } catch (err) {
        console.error("Initialization failed:", err);
    }
})();