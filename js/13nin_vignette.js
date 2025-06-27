let srcrandom = Math.floor(Math.random() * 7);
let srcs = "https://www.youtube.com/embed/S7O5-dFA420?autoplay=1&controls=0";
let random = Math.floor(Math.random() * 11);
let isAdPlaying = false;
let SkipCoundDown = 6;
let AdPattern = Math.floor(Math.random() * 2);

// URLオブジェクトを現在のURLから作成
const url = new URL(window.location.href);

// 条件に応じて ad パラメータを設定
if (random === 10) {
    url.searchParams.set("ad", "google_vignette");
}

if(AdPattern === 1){
    SkipCoundDown = 140;
}

if(srcrandom === 1){
    srcs = "https://www.youtube.com/embed/Eh3cJyXCmBU?autoplay=1&controls=0";
    if(AdPattern === 1){
	SkipCoundDown = 483;
    }
} else if(srcrandom === 2){
    srcs = "https://www.youtube.com/embed/JQCGXDr5bd4?autoplay=1&controls=0";
    if(AdPattern === 1){
	SkipCoundDown = 735;
    }
} else if(srcrandom === 3){
    srcs = "https://www.youtube.com/embed/Arn-LtWbKxg?autoplay=1&controls=0";
    if(AdPattern === 1){
	SkipCoundDown = 934;
    }
} else if(srcrandom === 4){
    srcs = "https://www.youtube.com/embed/OaLgiEOYQqs?autoplay=1&controls=0";
    if(AdPattern === 1){
	SkipCoundDown = 1028;
    }
} else if(srcrandom === 5){
    srcs = "https://www.youtube.com/embed/_LhLyW4Yk-M?autoplay=1&controls=0";
    if(AdPattern === 1){
	SkipCoundDown = 32;
    }
} else if(srcrandom === 6){
    srcs = "https://www.youtube.com/embed/Zh2W2fcRBT4?autoplay=1&controls=0";
    SkipCoundDown = 6;
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
	skip.disabled = true;
	skip.textContent = `スキップ あと${SkipCoundDown}秒`;
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
	let SkipCound = setInterval(() => {
            if(SkipCoundDown > 0){
                SkipCoundDown -= 1;
                skip.textContent = `スキップ あと${SkipCoundDown}秒`;
		if(SkipCoundDown < 1){
		    skip.disabled = false;
	            skip.textContent = "スキップ";
	            clearInterval(SkipCoundDown);
		    SkipCound = null;
		}
            } else {
                skip.disabled = false;
                skip.textContent = "スキップ";
                clearInterval(SkipCoundDown);
		SkipCound = null;
            }
	}, 1000);
}

// 条件に応じて処理を実行
if (ad === 'google_vignette') {
    playAdVideo();
}

setInterval(() => {
    if(document.getElementById("skipAdButton")){
	if(SkipCoundDown > 0){
	    document.getElementById("skipAdButton").setAttribute("disabled", "true");
	} else {
	    document.getElementById("skipAdButton").removeAttribute("disabled");
	}
    }
}, 50);

setInterval(() => {
    if(SkipCoundDown <= 0){
	random = Math.floor(Math.random() * 11);
    	srcrandom = Math.floor(Math.random() * 5);
	SkipCoundDown = 6;
	AdPattern = Math.floor(Math.random() * 2);
    	// 条件に応じて ad パラメータを設定
	if (random === 10) {
	    url.searchParams.set("ad", "google_vignette");
	}
	if(srcrandom === 1){
	    srcs = "https://www.youtube.com/embed/Eh3cJyXCmBU?autoplay=1&controls=0";
	    if(AdPattern === 1){
		SkipCoundDown = 483;
	    }
	} else if(srcrandom === 2){
	    srcs = "https://www.youtube.com/embed/JQCGXDr5bd4?autoplay=1&controls=0";
	    if(AdPattern === 1){
		SkipCoundDown = 735;
	    }
	} else if(srcrandom === 3){
	    srcs = "https://www.youtube.com/embed/Arn-LtWbKxg?autoplay=1&controls=0";
	    if(AdPattern === 1){
		SkipCoundDown = 934;
	    }
	} else if(srcrandom === 4){
	    srcs = "https://www.youtube.com/embed/OaLgiEOYQqs?autoplay=1&controls=0";
	    if(AdPattern === 1){
		SkipCoundDown = 1028;
	    }
	} else if(srcrandom === 5){
	    srcs = "https://www.youtube.com/embed/_LhLyW4Yk-M?autoplay=1&controls=0";
	    if(AdPattern === 1){
		SkipCoundDown = 32;
	    }
	}
	
	// 履歴を書き換えてURLを更新（リロードなしで）
	window.history.replaceState({}, '', url);
	
	// クエリパラメータを再取得
	const params = new URLSearchParams(window.location.search);
	const ad = params.get('ad');
	
	// 条件に応じて処理を実行
	if (ad === 'google_vignette') {
	    playAdVideo();
	}
    }
}, 150000);
