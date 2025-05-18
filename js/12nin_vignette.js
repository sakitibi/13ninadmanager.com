var target = document.getElementById('content');
var uri = target.baseURI;
const url = new URL(uri);
const params = new URLSearchParams(window.location.search)
let random = Math.floor(Math.random() * 11);
if (random === 10) {
    url.searchParams.set("ad", "google_vignette");
} else {
    url.searchParams.set("ad", "none");
}
const ad = params.get('ad');


if(ad === 'google_vignette'){
    console.log("!!!");
}
