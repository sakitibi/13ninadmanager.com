let srcrandom = Math.floor(Math.random() * 3);
let srcs = "https://www.youtube.com/embed/S7O5-dFA420?autoplay=1&controls=0";
let random = Math.floor(Math.random() * 11);
let isAdPlaying = false;

// URLオブジェクトを現在のURLから作成
const url = new URL(window.location.href);

// 条件に応じて ad パラメータを設定
if (random === 10) {
    if(srcrandom === 1){
	srcs = "https://www.youtube.com/embed/Eh3cJyXCmBU?autoplay=1&controls=0";
    } else if(srcrandom === 2){
	srcs = "https://www.youtube.com/embed/04EmFj46LJc?autoplay=1&controls=0";
    }
    url.searchParams.set("ad", "google_vignette");
}

// 履歴を書き換えてURLを更新（リロードなしで）
window.history.replaceState({}, '', url);

// クエリパラメータを再取得
const params = new URLSearchParams(window.location.search);
const ad = params.get('ad');

function playAdVideo() {
	if (isAdPlaying) return;
	isAdPlaying = true;

	const iframe = document.createElement("iframe");
	iframe.id = "adVideo";
	iframe.src = srcs;
	iframe.style.position = "fixed";
	iframe.style.top = "0";
	iframe.style.left = "0";
	iframe.style.width = "100vw";
	iframe.style.height = "100vh";
	iframe.style.zIndex = "9999";
	iframe.allow = "autoplay";

	document.body.appendChild(iframe);

	const skip = document.createElement("button");
	skip.id = "skipAdButton";
	skip.textContent = "スキップ";
	skip.style.position = "fixed";
	skip.style.bottom = "20px";
	skip.style.right = "20px";
	skip.style.padding = "10px 20px";
	skip.style.fontSize = "18px";
	skip.style.zIndex = "10000";
	skip.onclick = () => {
		iframe.remove();
		skip.remove();
		isAdPlaying = false;
	};
	document.body.appendChild(skip);
}

// 条件に応じて処理を実行
if (ad === 'google_vignette') {
    playAdVideo();
}
