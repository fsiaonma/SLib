/**
 * browser 类
 * @class sl.browser
 * @constructor
 */
sl.browser = (function() {
    var u = navigator.userAgent; 
    var app = navigator.appVersion;

    /**Mobile HttpRequest User-Agent*/
    var MOBILE_USER_AGENTS = [
        "Nokia",//诺基亚
        "SAMSUNG",//三星手机
        "MIDP-2",//j2me2.0
        "SymbianOS",//塞班系统的， "MAUI",//MTK山寨机默认ua
        "UNTRUSTED/1.0",//疑似山寨机的ua，基本可以确定还是手机
        "Windows CE",//Windows CE
        "iPhone",//iPhone
        "iPad",//iPad
        "Android",//Android
        "BlackBerry",//BlackBerry
        "UCWEB",//ucweb是否只给wap页面？ Nokia5800 XpressMusic/UCWEB7.5.0.66/50/999
        "ucweb",//小写的ucweb,
        "BREW",//很奇怪的ua
        "J2ME",//,很奇怪的ua，只有J2ME四个字母
        "YULONG",//宇龙手机
        "YuLong",//还是宇龙
        "COOLPAD",//宇龙酷派
        "TIANYU",//天语手机
        "TY-",//天语
        "K-Touch",//还是天语
        "Haier",//海尔手机
        "DOPOD",//多普达手机
        "Lenovo",//联想手机
        "LENOVO",//联想手机
        "HUAQIN",//华勤手机
        "AIGO-",//爱国者居手机
        "CTC/1.0",//含义不明
        "CTC/2.0",//含义不明
        "CMCC",//移动定制手机
        "DAXIAN",//大显手机
        "MOT-",//摩托罗拉
        "SonyEricsson",//索爱手机
        "GIONEE",//金立手机
        "HTC",//HTC手机
        "ZTE",//中兴手机
        "HUAWEI",//华为手机
        "webOS",//palm手机
        "GoBrowser",//3g GoBrowser.User-Agent=Nokia5230/GoBrowser/2.0.290 Safari
        "IEMobile",//Windows CE手机自带浏览器
        "WAP2.0"//支持wap 2.0的
    ];

    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        language: (navigator.browserLanguage || navigator.language).toLowerCase(), // 语言
        isMobile: function() {
            var userAgent = navigator.userAgent;
            for (var i = 0, len = MOBILE_USER_AGENTS.length; i < len; ++i) {
                var mobile = MOBILE_USER_AGENTS[i];
                if (userAgent.indexOf(mobile) > -1 || userAgent.indexOf(mobile.toUpperCase()) > -1 ||
                    userAgent.indexOf(mobile.toLowerCase()) > 1) {
                    return true;
                }
            }
            return false;
        }
    }
})();