document.addEventListener("DOMContentLoaded", () => {
    let AdRandom = Math.floor(Math.random() * 2);
    if (document.getElementById("main-contents-bottom") !== null){
        const MainContentsBottom = document.getElementById("main-contents-bottom");
    	if(AdRandom === 0){
    	    MainContentsBottom.innerHTML = (`
         		<iframe class="juusannninadmanager" src="https://sakitibi-com9.webnode.jp/page/0" width="336" height="280"></iframe>
    		    <iframe class="juusannninadmanager" src="https://sakitibi-com9.webnode.jp/page/0" width="336" height="280"></iframe>
         	`);
        }
    }
});
