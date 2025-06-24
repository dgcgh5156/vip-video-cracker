// ==UserScript==
// @name              全网VIP视频免费破解【专注一个脚本只做一件事件】
// @namespace         http://tampermonkey.net/
// @version           1.7.0
// @description       全网VIP视频免费破解【专注一个脚本只做一件事件】。支持：腾讯、爱奇艺、优酷、芒果、pptv、乐视等其它网站；
// @icon              data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD//gAUU29mdHdhcmU6IFNuaXBhc3Rl/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAGgAeAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A8/stTivZLhFV0eBtrhwB+PXpXc/Bj4bXXxy1ObTdE1XTrDUE3GO31PzkMyqMsytHE64Gf4iD6A15TrUx0fUriVQcXcBUY/vjivpb9hGz+w/GLTocYK6dcbvqQCa/Q6ec46dWth21zUFNzdt3zfuvS8btng5rwnkuCy3DZrSi3DGyoqiuZ6JQf1m/flq2hG+yMPTf2e9X1nVPEFlZa9olx/YTmO9nDXKxo4LB1G6AMxUockDB7E1i+Jvg/rnhzw/peuRSWut6RqP+pu9MMjgHBIDK6KwOAe3bBwa+g/hQEPiP41CVmSM6ndbmRdxA3zZIGRn8xXkniP42Wdr4C0Dwp4XhvPI0/wDeTX2oIsbyvhshUR2AGWJ5Y9h71+cUuKuK8Zxlisry6KqUqFSkpJxSiqc6DnKUp7qXPyqKV7pv3WtV8NWyzLKGAhXrNxlNTtZ3fNGdkku3Le/5njU1tDcbfNiSXacrvUHB9q3/AA/418R+Eo5o9D1/VNGSYhpV0+8kgDkdCwRhn8axaK/od0abbbitd9N7bXPh/rNflhDndo3sruyvvbtfrbc6Kf4j+LLq4uJ5vFGszT3CCOaSTUJmaVBnCsS2SBk8H1Nc7RRRU8PQoylOlBRcrXaSTdtFfvZbGU6tSpbnk3buz//Z
// @author            w__yi
// @match             *://*.youku.com/*
// @match             *://*.iqiyi.com/*
// @match             *://*.iq.com/*
// @match             *://*.le.com/*
// @match             *://v.qq.com/*
// @match             *://m.v.qq.com/*
// @match             *://*.tudou.com/*
// @match             *://*.mgtv.com/*
// @match             *://tv.sohu.com/*
// @match             *://film.sohu.com/*
// @match             *://*.1905.com/*
// @match             *://*.bilibili.com/*
// @match             *://*.pptv.com/*
 
// @require           https://cdn.bootcdn.net/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant             unsafeWindow
// @grant             GM_addStyle
// @grant             GM_openInTab
// @grant             GM_getValue
// @grant             GM_setValue
// @grant             GM_xmlhttpRequest
// @grant             GM_log
// @charset		      UTF-8
// @license           GPL License
// ==/UserScript==
 
const util = (function () {
 
    function findTargetElement(targetContainer) {
        const body = window.document;
        let tabContainer;
        let tryTime = 0;
        const maxTryTime = 120;
        let startTimestamp;
        return new Promise((resolve, reject) => {
            function tryFindElement(timestamp) {
                if (!startTimestamp) {
                    startTimestamp = timestamp;
                }
                const elapsedTime = timestamp - startTimestamp;
 
                if (elapsedTime >= 500) {
                    GM_log("查找元素：" + targetContainer + "，第" + tryTime + "次");
                    tabContainer = body.querySelector(targetContainer);
                    if (tabContainer) {
                        resolve(tabContainer);
                    } else if (++tryTime === maxTryTime) {
                        reject();
                    } else {
                        startTimestamp = timestamp;
                    }
                }
                if (!tabContainer && tryTime < maxTryTime) {
                    requestAnimationFrame(tryFindElement);
                }
            }
 
            requestAnimationFrame(tryFindElement);
        });
    }
 
    function urlChangeReload() {
        const oldHref = window.location.href;
        let interval = setInterval(() => {
            let newHref = window.location.href;
            if (oldHref !== newHref) {
                clearInterval(interval);
                window.location.reload();
            }
        }, 500);
    }
 
    function reomveVideo() {
        setInterval(() => {
            for (let video of document.getElementsByTagName("video")) {
                if (video.src) {
                    video.removeAttribute("src");
                    video.muted = true;
                    video.load();
                    video.pause();
                }
            }
        }, 500);
    }
 
    function syncRequest(option) {
        return new Promise((resolve, reject) => {
            option.onload = (res) => {
                resolve(res);
            };
            option.onerror = (err) => {
                reject(err);
            };
            GM_xmlhttpRequest(option);
        });
    }
 
    return {
        req: (option) => syncRequest(option),
        findTargetEle: (targetEle) => findTargetElement(targetEle),
        urlChangeReload: () => urlChangeReload(),
        reomveVideo: () => reomveVideo()
    }
})();
 
 
const superVip = (function () {
 
    const _CONFIG_ = {
        isMobile: navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i),
        currentPlayerNode: null,
        vipBoxId: 'vip_jx_box' + Math.ceil(Math.random() * 100000000),
        flag: "flag_vip",
        autoPlayerKey: "auto_player_key" + window.location.host,
        autoPlayerVal: "auto_player_value_" + window.location.host,
        videoParseList: [
            {"name": "综合", "type": "1,3", "url": "https://jx.jsonplayer.com/player/?url="},
            {"name": "CK", "type": "1,3", "url": "https://www.ckplayer.vip/jiexi/?url="},
            {"name": "YT", "type": "1,3", "url": "https://jx.yangtu.top/?url="},
            {"name": "Player-JY", "type": "1,3", "url": "https://jx.playerjy.com/?url="},
            {"name": "yparse", "type": "1,2", "url": "https://jx.yparse.com/index.php?url="},
            {"name": "8090", "type": "1,3", "url": "https://www.8090g.cn/?url="},
            {"name": "剖元", "type": "1,3", "url": "https://www.pouyun.com/?url="},
            {"name": "虾米", "type": "1,3", "url": "https://jx.xmflv.com/?url="},
            {"name": "全民", "type": "1,3", "url": "https://43.240.74.102:4433?url="},
 
            {"name": "爱豆", "type": "1,3", "url": "https://jx.aidouer.net/?url="},
            {"name": "夜幕", "type": "1,3", "url": "https://www.yemu.xyz/?url="},
            {"name": "m1907", "type": "1,2", "url": "https://im1907.top/?jx="},
 
            {"name": "M3U8TV", "type": "1,3", "url": "https://jx.m3u8.tv/jiexi/?url="},
            {"name": "冰豆", "type": "1,3", "url": "https://bd.jx.cn/?url="},
            {"name": "playm3u8", "type": "1,3", "url": "https://www.playm3u8.cn/jiexi.php?url="},
        ],
        playerContainers: [
            {
                host: "v.qq.com",
                container: "#mod_player,#player-container,.container-player",
                name: "Default",
                displayNodes: ["#mask_layer", ".mod_vip_popup", "#mask_layer", ".panel-tip-pay"]
            },
            {
                host: "m.v.qq.com",
                container: ".mod_player,#player",
                name: "Default",
                displayNodes: [".mod_vip_popup", "[class^=app_],[class^=app-],[class*=_app_],[class*=-app-],[class$=_app],[class$=-app]", "div[dt-eid=open_app_bottom]", "div.video_function.video_function_new", "a[open-app]", "section.mod_source", "section.mod_box.mod_sideslip_h.mod_multi_figures_h,section.mod_sideslip_privileges,section.mod_game_rec", ".at-app-banner"]
            },
 
            {host: "w.mgtv.com", container: "#mgtv-player-wrap", name: "Default", displayNodes: []},
            {host: "www.mgtv.com", container: "#mgtv-player-wrap", name: "Default", displayNodes: []},
            {
                host: "m.mgtv.com",
                container: ".video-area",
                name: "Default",
                displayNodes: ["div[class^=mg-app]", ".video-area-bar", ".open-app-popup"]
            },
            {host: "www.bilibili.com", container: "#player_module,#bilibiliPlayer,#bilibili-player", name: "Default", displayNodes: []},
            {host: "m.bilibili.com", container: ".player-wrapper,.player-container,.mplayer", name: "Default", displayNodes: []},
            {host: "www.iqiyi.com", container: "#flashbox", name: "Default", displayNodes: ["#playerPopup", "div[class^=qy-header-login-pop]", "section[class^=modal-cover_]" ,".toast"]},
            {
                host: "m.iqiyi.com",
                container: ".m-video-player-wrap",
                name: "Default",
                displayNodes: ["div.m-iqyGuide-layer", "a[down-app-android-url]", "[name=m-extendBar]", "[class*=ChannelHomeBanner]", "section.m-hotWords-bottom"]
            },
            {host: "www.iq.com", container: ".intl-video-wrap", name: "Default", displayNodes: []},
            {host: "v.youku.com", container: "#player", name: "Default", displayNodes: ["#iframaWrapper", "#checkout_counter_mask", "#checkout_counter_popup"]},
            {
                host: "m.youku.com",
                container: "#player,.h5-detail-player",
                name: "Default",
                displayNodes: [".callEnd_box", ".h5-detail-guide", ".h5-detail-vip-guide"]
            },
            {host: "tv.sohu.com", container: "#player", name: "Default", displayNodes: []},
            {host: "film.sohu.com", container: "#playerWrap", name: "Default", displayNodes: []},
            {host: "www.le.com", container: "#le_playbox", name: "Default", displayNodes: []},
            {host: "video.tudou.com", container: ".td-playbox", name: "Default"}
        ]
    };
 
    function getVideoParseList() {
        return _CONFIG_.videoParseList;
    }
 
    function getPlayerContainer(host) {
        const container = _CONFIG_.playerContainers.find(item => host.indexOf(item.host) !== -1);
        if (container) {
            return container;
        }
        return _CONFIG_.playerContainers[0];
    }
 
    function getCurrentHost() {
        return window.location.host;
    }
 
    function getPlayerContainerEle() {
        const host = getCurrentHost();
        const container = getPlayerContainer(host);
        return container.container;
    }
 
    function getDisplayNodes(host) {
        const container = getPlayerContainer(host);
        return container.displayNodes || [];
    }
 
    function getVipBoxId() {
        return _CONFIG_.vipBoxId;
    }
 
    function getAutoPlayerKey() {
        return _CONFIG_.autoPlayerKey;
    }
 
    function getAutoPlayerVal() {
        return _CONFIG_.autoPlayerVal;
    }
 
    function getFlag() {
        return _CONFIG_.flag;
    }
 
    return {
        getVideoParseList: () => getVideoParseList(),
        getPlayerContainerEle: () => getPlayerContainerEle(),
        getDisplayNodes: (host) => getDisplayNodes(host),
        getVipBoxId: () => getVipBoxId(),
        getAutoPlayerKey: () => getAutoPlayerKey(),
        getAutoPlayerVal: () => getAutoPlayerVal(),
        getFlag: () => getFlag()
    }
})();
 
(function () {
    'use strict';
 
    function createVipBox(vipBoxId) {
        const boxStyle = `
            #${vipBoxId} {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 99999999;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 16px;
            }
            #${vipBoxId} .vip-jx-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 15px;
            }
            #${vipBoxId} .vip-jx-content {
                width: 100%;
                max-width: 500px;
                padding: 0 15px;
            }
            #${vipBoxId} .vip-jx-btn {
                display: inline-block;
                padding: 8px 15px;
                background: #f00;
                color: #fff;
                border-radius: 4px;
                margin: 5px;
                cursor: pointer;
                transition: all 0.3s;
            }
            #${vipBoxId} .vip-jx-btn:hover {
                background: #ff3333;
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
            }
            #${vipBoxId} .vip-jx-close {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s;
            }
            #${vipBoxId} .vip-jx-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }
            #${vipBoxId} .vip-jx-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                margin-top: 15px;
            }
            #${vipBoxId} .vip-jx-tip {
                margin-top: 15px;
                color: #ffcc00;
                text-align: center;
            }
        `;
        GM_addStyle(boxStyle);
 
        const vipBox = document.createElement('div');
        vipBox.id = vipBoxId;
        vipBox.innerHTML = `
            <div class="vip-jx-close">×</div>
            <div class="vip-jx-title">VIP视频解析</div>
            <div class="vip-jx-content">
                <div>请选择解析线路：</div>
                <div class="vip-jx-list"></div>
                <div class="vip-jx-tip">提示：如线路失效请尝试切换其他线路</div>
            </div>
        `;
 
        return vipBox;
    }
 
    function createVipBtn(vipBoxId) {
        const btnStyle = `
            .vip-jx-btn-mini {
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 9999999;
                padding: 8px 15px;
                background: #f00;
                color: #fff;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                transition: all 0.3s;
            }
            .vip-jx-btn-mini:hover {
                background: #ff3333;
                transform: translateY(-3px);
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
            }
        `;
        GM_addStyle(btnStyle);
 
        const vipBtn = document.createElement('div');
        vipBtn.className = 'vip-jx-btn-mini';
        vipBtn.innerHTML = '<i class="fas fa-crown"></i> VIP解析';
        vipBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            document.getElementById(vipBoxId).style.display = 'flex';
        });
 
        return vipBtn;
    }
 
    function hideNodes(host) {
        const displayNodes = superVip.getDisplayNodes(host);
        displayNodes.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(ele => {
                ele.style.display = 'none';
            });
        });
    }
 
    function initPlayer() {
        const host = superVip.getCurrentHost();
        util.findTargetEle(superVip.getPlayerContainerEle()).then(container => {
            const vipBoxId = superVip.getVipBoxId();
            const vipBox = createVipBox(vipBoxId);
            const vipBtn = createVipBtn(vipBoxId);
 
            container.style.position = 'relative';
            container.appendChild(vipBox);
            container.appendChild(vipBtn);
 
            const closeBtn = vipBox.querySelector('.vip-jx-close');
            closeBtn.addEventListener('click', function () {
                vipBox.style.display = 'none';
            });
 
            const parseList = superVip.getVideoParseList();
            const listContainer = vipBox.querySelector('.vip-jx-list');
 
            parseList.forEach(item => {
                const btn = document.createElement('div');
                btn.className = 'vip-jx-btn';
                btn.innerHTML = item.name;
                btn.addEventListener('click', function () {
                    const videoUrl = window.location.href;
                    const parseUrl = item.url + encodeURIComponent(videoUrl);
                    window.open(parseUrl, '_blank');
                });
                listContainer.appendChild(btn);
            });
 
            hideNodes(host);
        }).catch(err => {
            GM_log('初始化播放器失败：' + err);
        });
    }
 
    function isVipPage() {
        const path = window.location.pathname;
        return path.indexOf('/vip') !== -1 || path.indexOf('/pay') !== -1 || path.indexOf('/member') !== -1;
    }
 
    function main() {
        if (isVipPage()) {
            GM_log('检测到VIP页面，开始初始化播放器...');
            initPlayer();
            util.urlChangeReload();
        }
    }
 
    if (document.readyState === 'complete') {
        main();
    } else {
        window.addEventListener('load', main);
    }
})();