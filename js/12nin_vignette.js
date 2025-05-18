let random = Math.floor(Math.random() * 11);

// URLオブジェクトを現在のURLから作成
const url = new URL(window.location.href);

// 条件に応じて ad パラメータを設定
if (random === 10) {
    url.searchParams.set("ad", "google_vignette");
} else {
    url.searchParams.set("ad", "none");
}

// 履歴を書き換えてURLを更新（リロードなしで）
window.history.replaceState({}, '', url);

// クエリパラメータを再取得
const params = new URLSearchParams(window.location.search);
const ad = params.get('ad');

// 条件に応じて処理を実行
if (ad === 'google_vignette') {
    console.log("!!!");
}
