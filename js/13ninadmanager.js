const RTBHouse = "https://sin.creativecdn.com/ad/imp-delivery?tk=";
const Criteo = "https://ads.as.criteo.com/delivery/r/afr.php?";
const Criteo2 = "https://ads.as.criteo.com/delivery/r/rtb/appnexus/display.aspx?creative=";
const SakitibiAdmanager = "https://sakitibi.github.io/13ninadmanager.com/";
const urls = [
    `${SakitibiAdmanager}SuperNewRoles-Logo`,
    `${SakitibiAdmanager}14ninad-1`,
];

document.addEventListener("DOMContentLoaded", () => {
    var r = Math.floor(Math.random() * urls.length);  
    var iframes = document.getElementsByClassName('juusannninadmanager');
    
    if (urls.length === 0) {
        console.error('URL配列が空です。');
        return;
    } else {
        console.log(r);
    }
    for(var i = 0; i < iframes.length; i++) {
        iframes[i].src = urls[r];
    }
});

setInterval (() => {
    r = Math.floor(Math.random() * urls.length);  
    iframes = document.getElementsByClassName('juusannninadmanager');
    
    if (urls.length === 0) {
        console.error('URL配列が空です。');
        return;
    } else {
        console.log(r);
    }
    for(i = 0; i < iframes.length; i++) {
        iframes[i].src = urls[r];
    }
}, 500000);
