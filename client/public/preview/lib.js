!(function () {
    "use strict";
    var e = "AdlibTemplateEditor",
        t = "AdlibTemplateEditorSaving",
        n = "AdlibTemplateEditorSideEffectsFlushedBeforeTemplateSaving",
        i = "getValues",
        a = "video-status",
        d = "SCREENSHOT_PLAY",
        o = "SCREENSHOT",
        u = "VOLUME_UP",
        r = "VOLUME_MUTE",
        s = "playing",
        l = "pause",
        c = "ended",
        v = function (e) {
            var t = new RegExp("(#?|&)" + e + "(=([^&#]*)|&|#|$)"),
                n = window.location.href,
                i = (t.exec(n) || [])[3];
            return i ? decodeURIComponent(i.replace(/\+/g, " ")) : null;
        };
    function m (e, t, n) {
        var i = document.getElementById(e);
        if (i)
            switch (n) {
                case "image":
                    i.setAttribute("source", t), i.setAttribute("src", t);
                    break;
                case "text":
                    i.innerHTML = t;
                    break;
                case "url":
                    i.setAttribute("src", t);
            }
    }
    var f = function () {
        return null === v("adlibCreativeId") ? 0 : v("adlibCreativeId");
    },
        w = {
            getValueFromUrl: v,
            getCreativeId: f,
            isScreenshotEvent: function (e) {
                return void 0 === e && (e = ""), e.includes(o);
            },
            isTemplateEditorEvent: function (t) {
                return void 0 === t && (t = ""), t.includes(e);
            },
            removeSelectionOutline: function () {
                var e = window.document.getElementById("htmlEditorBorder");
                e && e.remove();
            },
            setValueInElement: m,
            setValues: function (e) {
                defaultValues = e
            },
            sendVideoStatus: function (e, t, n) {
                var i = { id: f(), status: e, type: a, muted: t, withBigPlayButton: n };
                window.parent.postMessage(i, "*");
            },
            isVolumeEvent: function (e) {
                return void 0 === e && (e = ""), e.includes("VOLUME");
            },
        };
    function E (e, i) {
        i === t &&
            (function (e) {
                var t = { type: n, eventTimestampId: e };
                w.removeSelectionOutline(), window.parent.postMessage(t, "*");
            })(e);
    }
    function p () {
        var e = w.getCreativeId(),
            t = { type: i, id: e };
        window.parent.postMessage(t, "*");
    }
    window.document.write(
        '\n  <style id="htmlEditorBorder">\n    .htmlEditorBorder {\n      outline: 1px solid rgba(255,0,0,0.8);\n    }\n  </style>\n'
    ),
        window.addEventListener("message", function (e) {
            var t = e.data;
            console.log(t)
            if (t) {
                var n,
                    i,
                    a = t.type,
                    o = t.eventTimestampId;
                switch (!0) {
                    case w.isVolumeEvent(a):
                        (n = a),
                            (i = document.getElementById("dynamic-video")) &&
                            (n === u && ((i.volume = 1), (i.muted = !1)),
                                n === r && ((i.volume = 0), (i.muted = !0)));
                        break;
                    case w.isScreenshotEvent(a):
                        console.log(a);
                        !(function (e) {
                            e === d
                                ? window.gwd.auto_PlayBtnClick()
                                : window.gwd.auto_PauseBtnClick();
                        })(a);
                        break;
                    case w.isTemplateEditorEvent(a):
                        E(o, a);
                        break;
                    default:
                        !(function (e) {
                            w.setValues(e?.data);
                        })(t);
                }
            }
        }),
        window.addEventListener("DOMContentLoaded", function () {
            var e, t, n;
            (e = document.getElementById("dynamic-video")),
                (t = document.getElementById("playButton")),
                (n = !0),
                e
                    ? (e.addEventListener("playing", function () {
                        if (!n) {
                            var t = e.hasAttribute("muted");
                            w.sendVideoStatus(s, t);
                        }
                        n = !1;
                    }),
                        e.addEventListener("pause", function () {
                            var n = e.hasAttribute("muted"),
                                i =
                                    "1" === (null == t ? void 0 : t.style.opacity) &&
                                    "none" !== (null == t ? void 0 : t.style.display);
                            w.sendVideoStatus(l, n, i);
                        }),
                        e.addEventListener("ended", function () {
                            var t = e.hasAttribute("muted");
                            w.sendVideoStatus(c, t);
                        }))
                    : w.sendVideoStatus(s, !1),
                p();
        }),
        window.addEventListener("adinitialized", function () {
            p();
        }),
        (document.domain = "storage.googleapis.com");
})();
