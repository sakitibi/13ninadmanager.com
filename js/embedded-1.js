var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

var wi_adslot_rectangle = [[300,250],[1,1]];
var wi_adslot = [[300,250],[1,1]];
if (document.documentElement.clientWidth > 406) {
  wi_adslot_rectangle = [[300,250],[336,280],[1,1]];
  wi_adslot = [[468,60],[300,250],[1,1]];
}

window.defineSlotFlux = [];
defineSlotFlux.push({"slotID": "div-gpt-ad-1567408559923-0", "sizes": [[300,250]], "slotName":"WIKIWIKI_PC_BOTTOM_LEFT"});
defineSlotFlux.push({"slotID": "div-gpt-ad-1658912377789-0", "sizes": [[300,250]], "slotName":"WIKIWIKI_PC_BOTTOM_RIGHT"});

if (defineSlotFlux.length) {
    var readyBids = {
        prebid: false,
        amazon: false,
        google: false
    };
    var failSafeTimeout = 3e3;
    var launchAdServer = function () {
        if (!readyBids.amazon || !readyBids.prebid) {
            return;
        }
        requestAdServer();
    };
    var requestAdServer = function () {
        if (!readyBids.google) {
            readyBids.google = true;
            googletag.cmd.push(function () {
                pbjs.que.push(function () {
                    pbjs.setTargetingForGPTAsync();
                });
                apstag.setDisplayBids();
                googletag.pubads().refresh();
            });
        }
    };
}

googletag.cmd.push(function() {
    googletag.defineSlot('/19033742/WIKIWIKI_PC_BOTTOM_LEFT',[[336,280],[300,250]],
    'div-gpt-ad-1567408559923-0').addService(googletag.pubads());
    googletag.defineSlot('/19033742/WIKIWIKI_PC_BOTTOM_RIGHT',[[336,280],[300,250]],
    'div-gpt-ad-1658912377789-0').addService(googletag.pubads());
    googletag.pubads().setTargeting("gpolicy","sunny");
    googletag.pubads().setTargeting("site","12ninstudio");
    googletag.pubads().collapseEmptyDivs();
    googletag.pubads().enableSingleRequest();
    // ナビゲーションの矢印がオーバーレイ広告にかぶらないように、
    // オーバーレイ広告の render が終わったら高さが取得できるようイベントを発行してあげる
    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
        var slot = event.slot;
        if (document.getElementById(slot.getSlotElementId()) != null){
            var slotElm = document.getElementById(slot.getSlotElementId());
            if (slotElm && slotElm.className === 'overlay-ad-wrapper') {
                var overlayRenderedEvent = document.createEvent('Event');
                overlayRenderedEvent.initEvent('overlay-ad-rendered', true, true);
                slotElm.dispatchEvent(overlayRenderedEvent);
            }
        }
    });
    if (defineSlotFlux.length) {googletag.pubads().disableInitialLoad();};
    googletag.enableServices();
    if (defineSlotFlux.length) {
        pbjs.que.push(function () {
            pbFlux.prebidBidder();
        });
    }
});

if (defineSlotFlux.length) {
    !function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},setDisplayBids:function(){},targetingKeys:function(){return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",window,document,"script","https://wikiwiki.jp//c.amazon-adsystem.com/aax2/apstag.js");
    apstag.init({
        pubID: '138f2e02-8341-4255-b4f3-872c3ced0f91',
        adServer: 'googletag',
        bidTimeout: 2e3
    });
    apstag.fetchBids({
        slots: defineSlotFlux
    }, function(bids) {
        googletag.cmd.push(function(){
            readyBids.amazon = true;
            launchAdServer();
        });
    });
}

if (defineSlotFlux.length) {
    // set failsafe timeout
    setTimeout(function () {
        requestAdServer();
    }, failSafeTimeout);
}

googletag.cmd.push(function() {
  googletag.pubads()
    .setTargeting("wi_agreement",     String(wi_data.agreementStatus || "false"))
    .setTargeting("wi_group",     String(wi_data.group || "N"))
    .setTargeting("wi_comment",   wi_comment.length.toString())
    .setTargeting("wi_edit",      wi_edit.length.toString())
    .setTargeting("wi_freeze",    wi_freeze.length.toString())
    .setTargeting("wi_smsAuth",   String(wi_data.smsAuth || false))
    .setTargeting("wi_hasPosted", String(wi_data.hasPosted || false))
    .setTargeting("wi_referer",   String(wi_referer || "unknown"))
    .setTargeting("wi_random110", String(wi_random110 || "0"));
});

googletag.cmd.push(function() {
    const pcCaptionPaths = [
        '/19033742/WIKIWIKI_PC_CAPTION',
        '/19033742/WIKIWIKI_PC_CAPTION_SIDE_BY',
        '/19033742/WIKIWIKI_PC_CAPTION_20TH',
        '/19033742/WIKIWIKI_CAPTION_B'
    ];

    const spCaptionPaths = [
        '/19033742/WIKIWIKI_SP_CAPTION',
        '/19033742/WIKIWIKI_SP_CAPTION_300x600'
    ];

    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
        const slotElement = document.getElementById(event.slot.getSlotElementId());
        const parent = slotElement?.parentNode;

        if (parent && !event.isEmpty) {
            if (pcCaptionPaths.includes(event.slot.getAdUnitPath())) {
                parent.classList.add(parent.clientWidth < 769 ? "pc-caption-ad-center" : "pc-caption-ad-default");
            } else if (spCaptionPaths.includes(event.slot.getAdUnitPath())) {
                parent.classList.add("pc-caption-ad-mobile");
            } else if (event.slot.getAdUnitPath() === '/19033742/WIKIWIKI_SP_OVERLAY') {
                document.querySelector('#pc-overlay-ad-close-button svg').style.fill =
                `rgba(${getComputedStyle(document.body).backgroundColor.match(/\d+/g).map(c => 255 - c).join(",")}, 0.5)`;
                document.getElementById('pc-overlay-ad-parent-container').style.visibility = 'visible';
                document.getElementById('pc-overlay-ad-close-button').style.visibility = 'visible';
            }
        }
    });

    googletag.pubads().addEventListener('slotOnload', function(event) {
        const slotElement = document.getElementById(event.slot.getSlotElementId());
        slotElement?.parentNode?.classList.remove("default-advertisement");
    });
});
