
!function () {
    "use strict";

    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 1500,
        offset: 80,
        ignore: '[scroll-ignore]'
    });

    function t(t, n) {
        if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
    }

    function n() {
        Z = X.width(), Q = X.height(), tt = Y.height()
    }

    function e(t) {
        "function" == typeof t ? nt.push(t) : window.dispatchEvent(new Event("resize"))
    }

    function a() {
        var t = X.scrollTop(), n = "";
        n = t > ot ? "down" : t < ot ? "up" : "none", 0 === t ? n = "start" : t >= tt - Q && (n = "end");
        for (var e in it) "function" == typeof it[e] && it[e](n, t, ot, X);
        ot = t
    }

    function o(t) {
        it.push(t)
    }

    function r() {
        var t = document.createElement("div");
        t.className = "nk-body-scrollbar-measure", K[0].appendChild(t);
        var n = t.offsetWidth - t.clientWidth;
        return K[0].removeChild(t), n
    }

    function s() {
        var t = window.innerWidth;
        if (!t) {
            var n = document.documentElement.getBoundingClientRect();
            t = n.right - Math.abs(n.left)
        }
        st = K[0].clientWidth < t, lt = r()
    }

    function l() {
        "undefined" == typeof dt && (dt = K.css("padding-right") || ""), st && K.add(ct).css("paddingRight", lt + "px")
    }

    function d() {
        K.css("paddingRight", dt), ct.css("paddingRight", "")
    }

    function c(t) {
        t && !rt ? (rt = 1, s(), l(), K.css("overflow", "hidden")) : !t && rt && (rt = 0, K.css("overflow", ""), d())
    }

    function u(t, n) {
        var e = t[0].getBoundingClientRect(), i = 1;
        if (e.right <= 0 || e.left >= Z) i = 0; else if (e.bottom < 0 && e.top <= Q) i = 0; else {
            var a = Math.max(0, e.height + e.top), o = Math.max(0, e.height - (e.top + e.height - Q)),
                r = Math.max(0, -e.top), s = Math.max(0, e.top + e.height - Q);
            e.height < Q ? i = 1 - (r || s) / e.height : a <= Q ? i = a / Q : o <= Q && (i = o / Q), i = i < 0 ? 0 : i
        }
        return n ? [i, e] : i
    }

    function p(t, n) {
        var e = !1, i = this.options.scrollToAnchorSpeed / 1e3;
        e = "top" === t ? 0 : "bottom" === t ? Math.max(0, tt - Q) : "number" == typeof t ? t : !!t.offset && t.offset().top, e !== !1 && X.scrollTop() !== e ? (G.to(X, i, {
            scrollTo: {
                y: e,
                autoKill: !0
            }, ease: Power2.easeOut, autoKill: !0, overwrite: 5
        }), n && G.delayedCall(i, n)) : "function" == typeof n && n()
    }

    function h(t) {
        var n = this, e = W.extend({}, this.options.templates, t && t.templates || {}),
            i = W.extend({}, this.options.shortcuts, t && t.shortcuts || {}),
            a = W.extend({}, this.options.events, t && t.events || {});
        n.options = W.extend({}, n.options, t), n.options.templates = e, n.options.shortcuts = i, n.options.events = a
    }

    function f() {
        function t() {
            var t = X.scrollTop() >= l;
            t ? (o.addClass("nk-navbar-fixed"), d.show()) : (o.removeClass("nk-navbar-fixed"), d.hide())
        }

        function n(t) {
            if (t.parent().is(".nk-nav")) {
                var n = t.children(".dropdown"), e = t.parents(".nk-navbar:eq(0)"), i = "auto" !== n.css("right"),
                    a = {marginLeft: "", marginRight: "", marginTop: 0, display: "block"};
                n.css(a);
                var o = n[0].getBoundingClientRect(), r = t[0].getBoundingClientRect();
                o.left < 0 ? a.marginLeft = -o.left : o.right > Z && (a.marginLeft = Z - o.right);
                var s = o.left + (a.marginLeft || 0);
                s > r.left && (a.marginLeft = (a.marginLeft || 0) - (s - r.left)), i && (a.marginRight = -1 * a.marginLeft, a.marginLeft = ""), a.marginTop = e.innerHeight() - n.offset().top + e.offset().top, a.marginTop += 5, a.display = "none", n.css(a)
            }
        }

        function e(t) {
            t.length && (t.removeClass("open"), G.to(t.children(".dropdown"), .3, {
                opacity: 0,
                display: "none"
            }), X.trigger("nk-closed-submenu", [t]))
        }

        function i(t) {
            t.hasClass("open") || (n(t), G.to(t.children(".dropdown"), .3, {
                opacity: 1,
                display: "block"
            }), t.addClass("open"), X.trigger("nk-opened-submenu", [t]))
        }

        var a = this, o = W(".nk-navbar-top"), r = W("[data-nav-mobile]");
        if (r.length) {
            r.each(function () {
                var t = W(W(this).html()), n = W(W(this).attr("data-nav-mobile"));
                n.find(".nk-navbar-mobile-content > ul.nk-nav").append(t)
            });
            var s = W(".nk-navbar-mobile-content > ul.nk-nav");
            s.find(".bg-image, .bg-video").remove(), s.find(".nk-mega-item > .dropdown").each(function () {
                var t = W(this).children("ul").addClass("dropdown");
                t.find("> li > label").each(function () {
                    W(this).next().addClass("dropdown"), W(this).parent().addClass("nk-drop-item"), W(this).replaceWith(W('<a href="#"></a>').html(W(this).html()))
                }), W(this).replaceWith(t)
            }), s.find(".nk-mega-item").removeClass("nk-mega-item")
        }
        var l = o.length ? o.offset().top : 0, d = W("<div>").hide();
        o.hasClass("nk-navbar-sticky") && (X.on("scroll resize", t), t(), o.after(d), a.debounceResize(function () {
            d.height(o.innerHeight())
        }));
        var c = void 0;
        o.on("mouseenter", "li.nk-drop-item", function () {
            var t = W(this),
                n = t.siblings(".open").add(t.siblings().find(".open")).add(t.parents(".nk-nav:eq(0)").siblings().find(".open")).add(t.parents(".nk-nav:eq(0)").siblings(".open")).add(t.parents(".nk-nav:eq(0)").parent().siblings().find(".open"));
            clearTimeout(c), e(n), i(t)
        }).on("mouseleave", "li.nk-drop-item", function () {
            var t = W(this);
            clearTimeout(c), c = setTimeout(function () {
                e(t)
            }, 200)
        }), o.on("mouseleave", function () {
            clearTimeout(c), c = setTimeout(function () {
                e(o.find(".open"))
            }, 400)
        });
        var u = o.filter(".nk-navbar-autohide");
        a.throttleScroll(function (t, n) {
            var e = 400, i = "nk-onscroll-hide", a = "nk-onscroll-show";
            "down" === t && n > e ? u.removeClass(a).addClass(i) : "up" !== t && "end" !== t && "start" !== t || u.removeClass(i).addClass(a), o.hasClass("nk-navbar-transparent") && o[(n > 70 ? "add" : "remove") + "Class"]("nk-navbar-solid")
        })
    }

    function v() {
        function t() {
            W("[data-nav-toggle]").each(function () {
                var t = W(W(this).attr("data-nav-toggle")).hasClass("open");
                W(this)[(t ? "add" : "remove") + "Class"]("active")
            })
        }

        var n = this, e = W('<div class="nk-navbar-overlay">').appendTo(K), i = W(".nk-navbar-left-side"),
            a = W(".nk-navbar-right-side"), o = W(".nk-navbar-side");
        if (n.toggleSide = function (t, e) {
                n[t.hasClass("open") ? "closeSide" : "openSide"](t, e)
            }, n.openSide = function (n, i) {
                "none" !== n.css("display") && (n.addClass("open"), G.to(n, i || .4, {x: n.hasClass("nk-navbar-left-side") ? "100%" : "+100%"}), n.hasClass("nk-navbar-overlay-content") && G.to(e, .3, {
                    opacity: .6,
                    display: "block"
                }), t())
            }, n.closeSide = function (n, i) {
                n.each(function () {
                    W(this).removeClass("open"), G.to(this, i || .4, {x: "0%"}), t()
                }), o.filter(".nk-navbar-overlay-content.open").length || G.to(e, .3, {opacity: 0, display: "none"})
            }, Y.on("click", "[data-nav-toggle]", function (t) {
                var e = W(W(this).attr("data-nav-toggle"));
                e.hasClass("open") ? n.closeSide(e) : (W("[data-nav-toggle]").each(function () {
                    n.closeSide(W(W(this).attr("data-nav-toggle")))
                }), n.openSide(e)), t.preventDefault()
            }), Y.on("click", ".nk-navbar-overlay", function () {
                n.closeSide(o)
            }), n.debounceResize(function () {
                o.filter(".open").each(function () {
                    W(this).is(":visible") || n.closeSide(W(this))
                })
            }), J && "undefined" != typeof Hammer) {
            var r = 50, s = void 0, l = void 0, d = void 0, c = void 0, u = void 0, p = void 0, h = 0, f = void 0,
                v = !1, g = !1, m = !1, k = Hammer(document, {touchAction: "pan-x pan-y"});
            k.add(new Hammer.Pan({pointers: 1, threshold: 0})), k.on("panstart", function (t) {
                "panup" !== t.additionalEvent && "pandown" !== t.additionalEvent || (h = 1)
            }), k.on("panend", function (t) {
                if (!h) {
                    if (s) {
                        var e = v ? d ? v : c ? l - v : 0 : 0, i = Math.max(.15, .4 * (l - e) / l), a = 0;
                        if (e && e > 10) {
                            var o = Math.abs(t.velocityX) > .7;
                            (e >= l / 3 || o) && (a = 1, d ? n.openSide(s, i) : n.closeSide(s, i))
                        }
                        a || (d ? n.closeSide(s, i) : n.openSide(s, i))
                    }
                    d = c = u = p = f = v = s = g = m = !1
                }
                h = 0
            }), k.on("panleft panright panup pandown", function (t) {
                if (!h) {
                    var n = !1, e = t.isFinal;
                    if (g === !1 && (g = t.center.x, n = !0), m = t.center.x, n) f = 2 === t.direction ? "left" : 4 === t.direction && "right", a && a.length && (l = a.width(), Z - g <= r && !a.hasClass("open") && !i.hasClass("open") ? d = u = 1 : Z - g >= l - 100 && a.hasClass("open") && (c = u = 1)), i && i.length && !u && i.is(":visible") && (l = i.width(), g <= r && !a.hasClass("open") && !i.hasClass("open") ? d = p = 1 : g >= l - 100 && i.hasClass("open") && (c = p = 1)), s = p ? i : !!u && a; else if (!e && s) if (u && (d && "left" === f || c && "right" === f)) {
                        if (d && (v = Math.min(l, Math.max(0, g - m))), c) {
                            var o = g - m;
                            g < Z - l && (o = Z - l - m), v = l - Math.abs(Math.max(-l, Math.min(0, o)))
                        }
                        G.set(s, {x: -100 * v / l + "%"})
                    } else if (p && (d && "right" === f || c && "left" === f)) {
                        if (d && (v = Math.min(l, Math.max(0, m - g))), c) {
                            var k = m - g;
                            g > l && (k = m - l), v = l - Math.abs(Math.max(-l, Math.min(0, k)))
                        }
                        G.set(s, {x: 100 * v / l + "%"})
                    }
                    (u || p) && t.srcEvent.preventDefault()
                }
            })
        }
    }

    function g() {
        function t(t) {
            var n = t.parents(".nk-navbar:eq(0)"), i = n.find(".nk-nav"),
                a = n.find(".nk-drop-item.open > .dropdown:not(.closed)"), o = a.parents(".dropdown.closed:eq(0)"),
                r = t.parents(".nano:eq(0)"), s = r.children(".nano-content"),
                l = t.parents(".nk-nav-row:eq(0)").siblings(".nk-nav-row");
            if (a.length) {
                var d = a.innerHeight();
                if (n.hasClass("nk-navbar-align-center")) {
                    a.css({top: 0});
                    var c = r.innerHeight(), u = c, p = r.offset().top, h = a.offset().top;
                    l.length && l.each(function () {
                        u -= W(this).innerHeight()
                    });
                    var f = 0;
                    d < u ? (f = p - h - s.scrollTop(), f += (c - d) / 2) : f = -parseFloat(o.css("top")) || 0, a.css({top: f})
                }
                i.css("height", d), e.initPluginNano(n), G.to(s, .3, {scrollTo: {y: 0}, delay: .2})
            } else i.css("height", "");
            e.initPluginNano(n)
        }

        function n(t, n) {
            var e = n.find("> .dropdown > li > a"), i = n.parent().find("> li > a");
            if (t) n.addClass("open").parent().addClass("closed"); else {
                n.removeClass("open").parent().removeClass("closed");
                var a = e;
                e = i, i = a
            }
            G.set(e, {x: t ? "20%" : "-20%", opacity: 0, display: "block"}, .1), G.staggerTo(e, .2, {
                x: "0%",
                opacity: 1,
                delay: .1
            }, .05), G.staggerTo(i, .2, {x: t ? "-20%" : "20%", opacity: 0}, .05, function () {
                i.css("display", "none")
            })
        }

        var e = this, i = W(".nk-navbar-side, .nk-navbar-full");
        i.find(".dropdown").prepend('<li class="bropdown-back"><a href="#">' + e.options.templates.secondaryNavbarBackItem + "</a></li>"), i.on("click", ".nk-drop-item > a", function (e) {
            n(!0, W(this).parent()), t(W(this)), e.preventDefault()
        }), i.on("click", ".bropdown-back > a", function (e) {
            n(!1, W(this).parent().parent().parent()), t(W(this)), e.preventDefault()
        })
    }

    function m() {
        function t() {
            if (a) {
                var t = e.filter("[data-nk-count]"), o = i.filter("[data-nk-count]");
                a = t.length + o.length, e.filter("[data-nk-count]").each(function () {
                    var t = W(this);
                    if (n.isInViewport(t)) {
                        var e = {curr: t.attr("data-nk-count-from") || "0", to: t.attr("data-nk-count")},
                            i = t.find(".nk-progress-line > div"), a = t.find(".nk-progress-percent");
                        G.to(i, 1, {width: e.to + "%"}), G.to(e, 1, {
                            curr: e.to,
                            roundProps: "curr",
                            ease: Circ.easeIn,
                            onUpdate: function () {
                                a.text(e.curr + "%")
                            }
                        }), t.removeAttr("data-nk-count")
                    }
                }), i.filter("[data-nk-count]").each(function () {
                    var t = W(this);
                    if (n.isInViewport(t)) {
                        var e = {curr: t.text(), to: t.attr("data-nk-count")};
                        t.removeAttr("data-nk-count data-nk-count-from"), G.to(e, 1, {
                            curr: e.to,
                            roundProps: "curr",
                            ease: Circ.easeIn,
                            onUpdate: function () {
                                t.text(e.curr)
                            }
                        })
                    }
                })
            }
        }

        var n = this, e = W(".nk-progress.nk-count"), i = W(".nk-count:not(.nk-progress)");
        e.each(function () {
            W(this).attr("data-nk-count", W(this).attr("data-progress")).find(".nk-progress-line > div").css("width", (W(this).attr("data-nk-count-from") || "0") + "%").find(".nk-progress-percent").html("")
        }), i.each(function () {
            W(this).attr("data-nk-count", W(this).attr("data-nk-count") || parseInt(W(this).text(), 10)).html(W(this).attr("data-nk-count-from") || "0")
        });
        var a = 1;
        n.throttleScroll(t), t()
    }

    function k() {
        var t = this;
        Y.on("click", "a.nk-product-rating", function (n) {
            var e = this.hash;
            if (e) {
                var i = W(e).parents(".nk-tabs:eq(0)");
                i.length && t.scrollTo(i), W(".nk-tabs").find('[data-toggle="tab"][href="' + e + '"]').click()
            }
            n.preventDefault()
        })
    }

    function w() {
        Y.on("click", ".nk-news-box .nk-news-box-item", function () {
            var t = W(this), n = t.parents(".nk-news-box:eq(0)").find(".nk-news-box-each-info"), e = {
                title: t.find(".nk-news-box-item-title").html(),
                img: t.find(".nk-news-box-item-full-img").attr("src"),
                categories: t.find(".nk-news-box-item-categories").html(),
                text: t.find(".nk-news-box-item-text").html(),
                url: t.find(".nk-news-box-item-url").attr("href"),
                date: t.find(".nk-news-box-item-date").html()
            };
            n.find(".nk-news-box-item-title").html(e.title), n.find(".nk-news-box-item-image").css("background-image", 'url("' + e.img + '")'), n.find(".nk-news-box-item-categories").html(e.categories), n.find(".nk-news-box-item-text").html(e.text), n.find(".nk-news-box-item-more").attr("href", e.url), n.find(".nk-news-box-item-date").html(e.date), t.addClass("nk-news-box-item-active").siblings().removeClass("nk-news-box-item-active")
        }), W(".nk-news-box .nk-news-box-item-active").trigger("click")
    }

    function b() {
        function t() {
            a.closeSide(o), a.closeSide(r), a.closeFullscreenNavbar()
        }

        function n(t) {
            for (var n = 0; n < l.length; n++) if (l[n].hash === t) return n;
            return !1
        }

        function e() {
            for (var t = 0; t < l.length; t++) {
                var n = l[t], e = 0, i = Q;
                n.$block.length && (e = n.$block.offset().top, i = n.$block.innerHeight()), n.activate = e - Q / 2, n.deactivate = e + i - Q / 2
            }
        }

        function i(t, n) {
            for (var e = 0; e < l.length; e++) {
                var i = l[e], a = n >= i.activate && n < i.deactivate;
                i.$item[a ? "addClass" : "removeClass"]("active")
            }
        }

        var a = this, o = W(".nk-navbar-left-side"), r = W(".nk-navbar-right-side");
        Y.on("click", ".navbar a, .nk-navbar a, a.btn, a.nk-btn, a.nk-anchor", function (n) {
            var e = this.hash, i = this.baseURI === window.location.href;
            if (e && i) try {
                var o = W(e), r = e.replace(/^#/, "");
                (o.length || "top" === r || "bottom" === r) && (t(), o.length && (o.attr("id", ""), document.location.hash = r, o.attr("id", r)), a.scrollTo(o.length ? o : r), n.preventDefault())
            } catch (n) {
            }
        });
        var s = W('.nk-navbar .nk-nav > li > a[href*="#"]'), l = [];
        s.each(function () {
            var t = this.hash.replace(/^#/, "");
            if (t) {
                var e = W(this).parent(), i = W("#" + t);
                if (t && i.length || "top" === t) {
                    var a = n(t);
                    a === !1 ? l.push({hash: t, $item: e, $block: i}) : l[a].$item = l[a].$item.add(e)
                }
            }
        }), l.length && (e(), i("static", X.scrollTop()), a.throttleScroll(i), a.debounceResize(e))
    }

    function y() {
        function t(t) {
            t.find(".nk-video-plain-toggle").html(e.options.templates.plainVideoIcon)
        }

        function n(t) {
            t.find(".nk-video-plain-toggle").html(e.options.templates.plainVideoLoadIcon)
        }

        if ("undefined" != typeof window.VideoWorker) {
            var e = this;
            W(".nk-plain-video[data-video]").each(function () {
                var e = W(this), i = void 0, a = W(this).attr("data-video"),
                    o = new VideoWorker(a, {autoplay: 0, loop: 0, mute: 0, controls: 1});
                if (o && o.isValid()) {
                    var r = 0;
                    if (o.getIframe(function (a) {
                            i = W(a);
                            var s = i.parent();
                            G.set(a, {
                                opacity: 0,
                                display: "none"
                            }), i.appendTo(e), s.remove(), e.append('<span class="nk-video-plain-toggle"></span>'), t(e), e.on("click", function () {
                                return U ? void window.open(o.url) : (o.play(), void(r || n(e)))
                            })
                        }), o.getImageURL(function (t) {
                            e.css("background-image", 'url("' + t + '")')
                        }), U) return;
                    o.on("play", function () {
                        G.to(i, .5, {
                            opacity: 1, display: "block", onComplete: function () {
                                r || (t(e), r = 1)
                            }
                        }), "undefined" != typeof soundManager && soundManager.pauseAll()
                    }), o.on("pause", function () {
                        G.to(i, .5, {opacity: 0, display: "none"})
                    })
                }
            })
        }
    }

    function x() {
        function t(t, n) {
            var e = new Image;
            e.onload = function () {
                n()
            }, e.src = t
        }

        function n(e) {
            var i = W(e);
            e.gifPlaying || (e.gifPlaying = !0, e.khGifLoaded ? (i.addClass("nk-gif-playing"), i.find("img").attr("src", i.find("img").attr("data-gif"))) : e.khGifLoading || (e.khGifLoading = 1, i.addClass("nk-gif-loading"), t(i.find("img").attr("data-gif"), function () {
                e.khGifLoaded = 1, i.removeClass("nk-gif-loading"), e.gifPlaying && (e.gifPlaying = !1, n(e))
            })))
        }

        function e(t) {
            var n = W(t);
            t.gifPlaying && (t.gifPlaying = !1, n.removeClass("nk-gif-playing"), n.find("img").attr("src", n.find("img").attr("data-gif-static")))
        }

        var i = this;
        W(".nk-gif").each(function () {
            var t = W(this);
            t.append('<a class="nk-gif-toggle">' + i.options.templates.gifIcon + "</a>"), t.append('<div class="nk-loading-spinner"><i></i></div>'), t.find("img").attr("data-gif-static", t.find("img").attr("src"))
        }), W(".nk-gif-hover").on("mouseenter", function () {
            W(this).addClass("hover"), n(this)
        }).on("mouseleave", function () {
            W(this).removeClass("hover"), e(this)
        }), W(".nk-gif-click").on("click", function () {
            this.gifPlaying ? (W(this).removeClass("hover"), e(this)) : (W(this).addClass("hover"), n(this))
        });
        var a = W(".nk-gif-viewport");
        a.length && i.throttleScroll(function () {
            a.each(function () {
                var t = i.isInViewport(W(this), 1);
                t[0] ? t[1].height / Q < .7 ? 1 === t[0] ? n(this) : e(this) : t[0] >= .7 ? n(this) : e(this) : e(this)
            })
        }), W(".nk-gif:not(.nk-gif-click):not(.nk-gif-hover):not(.nk-gif-viewport)").each(function () {
            n(this)
        })
    }

    function _() {
        var t = this;
        Y.on("click", ".nk-info-box .nk-info-box-close", function (n) {
            n.preventDefault();
            var e = W(this).parents(".nk-info-box:eq(0)");
            G.to(e, .3, {
                opacity: 0, onComplete: function () {
                    G.to(e, .3, {
                        height: 0, padding: 0, margin: 0, display: "none", onComplete: function () {
                            t.debounceResize()
                        }
                    })
                }
            })
        })
    }

    function C() {
        if ("undefined" != typeof W.fn.ajaxSubmit && "undefined" != typeof W.validator) {
            var t = this;
            W("form:not(.nk-form-ajax):not(.nk-mchimp):not([novalidate])").each(function () {
                W(this).validate({
                    errorClass: "nk-error", errorElement: "div", errorPlacement: function (n, e) {
                        var i = e.parent(".input-group");
                        i.length ? i.after(n) : e.after(n), t.debounceResize()
                    }
                })
            }), W("form.nk-form-ajax:not([novalidate])").each(function () {
                W(this).validate({
                    errorClass: "nk-error", errorElement: "div", errorPlacement: function (n, e) {
                        var i = e.parent(".input-group");
                        i.length ? i.after(n) : e.after(n), t.debounceResize()
                    }, submitHandler: function (n) {
                        var e = W(n).find(".nk-form-response-success"), i = W(n).find(".nk-form-response-error");
                        W(n).ajaxSubmit({
                            type: "POST", success: function (a) {
                                a = JSON.parse(a), a.type && "success" === a.type ? (i.hide(), e.html(a.response).show(), n.reset()) : (e.hide(), i.html(a.response).show()), t.debounceResize()
                            }, error: function (n) {
                                e.hide(), i.html(n.responseText).show(), t.debounceResize()
                            }
                        })
                    }
                })
            })
        }
    }

    function P() {
        var t = W("form.nk-mchimp");
        if ("undefined" != typeof W.fn.ajaxSubmit && "undefined" != typeof W.validator && t.length) {
            var n = this;
            W.validator.addMethod("mc_birthday", function (t, n, e) {
                var i = !1, a = W("input:not(:hidden)", W(n).closest(e));
                if (0 === a.filter(":filled").length && this.optional(n)) i = !0; else {
                    var o = new Array;
                    o.month = a.filter('input[name*="[month]"]').val(), o.day = a.filter('input[name*="[day]"]').val(), o.month = o.month - 1;
                    var r = new Date(1970, o.month, o.day);
                    i = r.getDate() === o.day && r.getMonth() === o.month
                }
                return i
            }, "Please enter a valid month and day."), W.validator.addMethod("mc_date", function (t, n, e) {
                var i = !1, a = W("input:not(:hidden)", W(n).closest(e));
                if (0 === a.filter(":filled").length && this.optional(n)) i = !0; else {
                    var o = new Array;
                    o.month = a.filter('input[name*="[month]"]').val(), o.day = a.filter('input[name*="[day]"]').val(), o.year = a.filter('input[name*="[year]"]').val(), o.month = o.month - 1, o.year.length < 4 && (o.year = parseInt(o.year, 10) < 50 ? 2e3 + parseInt(o.year, 10) : 1900 + parseInt(o.year, 10));
                    var r = new Date(o.year, o.month, o.day);
                    i = r.getDate() === o.day && r.getMonth() === o.month && r.getFullYear() === o.year
                }
                return i
            }, "Please enter a valid date"), W.validator.addMethod("mc_phone", function (t, n, e) {
                var i = !1, a = W("input:filled:not(:hidden)", W(n).closest(e));
                return 0 === a.length && this.optional(n) ? i = !0 : (t = a.eq(0).val() + a.eq(1).val() + a.eq(2).val(), i = 10 === t.length && t.match(/[0-9]{9}/)), i
            }, "Please specify a valid phone number"), W.validator.addMethod("skip_or_complete_group", function (t, n, e) {
                var i = W("input:not(:hidden)", W(n).closest(e)), a = i.eq(0),
                    o = a.data("valid_skip") ? a.data("valid_skip") : W.extend({}, this), r = i.filter(function () {
                        return o.elementValue(this)
                    }).length, s = 0 === r || r === i.length;
                return a.data("valid_skip", o), W(n).data("being_validated") || (i.data("being_validated", !0), i.each(function () {
                    o.element(this)
                }), i.data("being_validated", !1)), s
            }, W.validator.format("Please supply missing fields.")), W.validator.addMethod("skip_or_fill_minimum", function (t, n, e) {
                var i = W(e[1], n.form), a = i.eq(0),
                    o = a.data("valid_skip") ? a.data("valid_skip") : W.extend({}, this), r = i.filter(function () {
                        return o.elementValue(this)
                    }).length, s = 0 === r || r >= e[0];
                return a.data("valid_skip", o), W(n).data("being_validated") || (i.data("being_validated", !0), i.each(function () {
                    o.element(this)
                }), i.data("being_validated", !1)), s
            }, W.validator.format("Please either skip these fields or fill at least {0} of them.")), W.validator.addMethod("zipcodeUS", function (t, n) {
                return this.optional(n) || /^\d{5}-\d{4}$|^\d{5}$/.test(t)
            }, "The specified US ZIP Code is invalid"), t.each(function () {
                var t = W(this);
                if (t.length) var e = t.validate({
                    errorClass: "nk-error", errorElement: "div", groups: function a() {
                        var a = {};
                        return t.find(".input-group").each(function () {
                            var t = W(this).find("input:text:not(:hidden)");
                            if (t.length > 1) {
                                var n = t.first().attr("name"), e = W.map(t, function (t) {
                                    return t.name
                                });
                                a[n.substring(0, n.indexOf("["))] = e.join(" ")
                            }
                        }), a
                    }, errorPlacement: function (t, e) {
                        e.closest(".input-group").after(t), n.debounceResize()
                    }, submitHandler: function () {
                        var a = t.find(".nk-form-response-success"), o = t.find(".nk-form-response-error"),
                            r = t.attr("action");
                        r = r.replace("/post?u=", "/post-json?u="), r += "&c=?", t.ajaxSubmit({
                            type: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            url: r,
                            success: function (r) {
                                if (a.hide(), o.hide(), "success" === r.result) a.show().html(r.msg), t[0].reset(); else {
                                    var s = -1, l = void 0;
                                    try {
                                        var d = r.msg.split(" - ", 2);
                                        "undefined" == typeof d[1] ? l = r.msg : (i = parseInt(d[0], 10), i.toString() === d[0] ? (s = d[0], l = d[1]) : (s = -1, l = r.msg))
                                    } catch (c) {
                                        s = -1, l = r.msg
                                    }
                                    try {
                                        if (s === -1) o.show().html(l); else {
                                            var u = t.find("input[name]:eq(" + s + ")").attr("name"), p = {};
                                            p[u] = l, e.showErrors(p)
                                        }
                                    } catch (c) {
                                        o.show().html(l)
                                    }
                                }
                                n.debounceResize()
                            },
                            error: function (t) {
                                a.hide(), o.html(t.responseText).show(), n.debounceResize()
                            }
                        })
                    }
                })
            }), W.validator.addClassRules("birthday", {
                digits: !0,
                mc_birthday: ".datefield"
            }), W.validator.addClassRules("datepart", {
                digits: !0,
                mc_date: ".datefield"
            }), W.validator.addClassRules("phonepart", {digits: !0, mc_phone: ".phonefield"})
        }
    }

    function T() {
        if ("undefined" != typeof soundManager) {
            var t = this, n = !1, e = W(".nk-audio-plain");
            e.prepend(t.options.templates.audioPlainButton);
            var i = function (t) {
                function n() {
                    t.addClass("nk-audio-plain-playing")
                }

                function e() {
                    i.seek(0), i.step(), i.$item.removeClass("nk-audio-plain-playing"), i.$timer.text(i.$timer.attr("data-duration"))
                }

                var i = this;
                i.$item = t, i.url = t.attr("data-src"), i.$playPauseBtn = t.find(".nk-audio-plain-play-pause"), i.$progress = t.find(".nk-audio-progress-current"), i.$timer = t.find(".nk-audio-plain-duration"), i.$timer.attr("data-duration", i.$timer.text()), i.api = soundManager.createSound({
                    volume: 100,
                    whileplaying: function () {
                        i.step()
                    },
                    onplay: n,
                    onresume: n,
                    onpause: function () {
                        i.$item.removeClass("nk-audio-plain-playing"), i.$timer.text(i.$timer.attr("data-duration"))
                    },
                    onstop: e,
                    onfinish: e,
                    onload: function (t) {
                        !t && this._iO && this._iO.onerror && this._iO.onerror()
                    }
                }), i.$playPauseBtn.on("click", function () {
                    !i.api.paused && i.api.playState && i.api.url ? i.pause() : i.play()
                })
            };
            if (i.prototype = {
                    play: function () {
                        soundManager.pauseAll(), this.api.play({url: this.url})
                    }, pause: function () {
                        soundManager.pauseAll()
                    }, seek: function (t) {
                        this.api.setPosition(this.api.duration * t)
                    }, step: function () {
                        var t = this, e = t.api.position || 0;
                        t.progress = e / t.api.duration, t.$timer[0].innerHTML = t.formatTime(Math.round(e)), n || (t.$progress[0].style.width = (100 * t.progress || 0) + "%")
                    }, formatTime: function (t) {
                        var n = Math.round(t / 1e3) || 0, e = Math.floor(n / 60) || 0;
                        e = (e < 10 ? "0" : 0) + e;
                        var i = n - 60 * e;
                        return e + ":" + (i < 10 ? "0" : "") + i
                    }
                }, "undefined" != typeof Hammer) {
                var a = e.find(".nk-audio-progress");
                a.each(function () {
                    var t = W(this), e = t.children(), i = void 0, a = void 0, o = void 0, r = !1,
                        s = new Hammer.Manager(t[0]);
                    s.add(new Hammer.Pan({
                        pointers: 1,
                        threshold: 0
                    })), s.add(new Hammer.Press({time: 1})), s.on("pan press pressup", function (s) {
                        "press" !== s.type && r !== !1 || (n = !0, a = t.width(), r = s.pointers[0].clientX - t[0].getBoundingClientRect().left, t.addClass("hover")), o = Math.min(1, Math.max(0, (r + s.deltaX) / a)), e[0].style.width = 100 * o + "%", (s.isFinal || "pressup" === s.type) && (i || (i = t.parents(".nk-audio-player-main, .nk-audio-plain")[0].audioAPI), i && i.seek(o), t.removeClass("hover"), n = !1, r = !1), s.preventDefault()
                    })
                })
            }
            soundManager.onready(function () {
                e.length && e.each(function () {
                    this.audioAPI = new i(W(this))
                })
            })
        }
    }

    function S() {
        function t(t, n, e) {
            t.$bgTransition.css({"background-image": "url('" + n.image + "')"}), G.set(t.$bgTransition, {
                scale: 1.4,
                opacity: 0
            }), G.to(t.$bgTransition, .5, {
                scale: 1, opacity: 1, zIndex: -1, onComplete: function () {
                    t.$bg.css({"background-image": "url('" + n.image + "')"}), G.set(t.$bgTransition, {
                        opacity: 0,
                        zIndex: -2
                    })
                }
            }), G.to(t.$contentWrapper, .5, {
                opacity: 0, onComplete: function () {
                    t.$content.html(n.content), n.content && G.to(t.$contentWrapper, .5, {opacity: 1}), e && e()
                }
            })
        }

        function n(n) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (!a) {
                a = 1;
                var i = n.data("nk-image-slider");
                e === !1 && (e = i.$thumbs.find(".nk-image-slider-thumbs-active").index() + 1);
                var o = i.slides[e];
                "undefined" == typeof o && (e = 0, o = i.slides[e]), i.stopAutoplay(), i.selectThumb(e), t(i, o, function () {
                    "undefined" != typeof W.fn.nanoScroller && i.$content.parent(".nano").nanoScroller(), i.runAutoplay(), a = 0
                })
            }
        }

        function e(t) {
            return Math.ceil(t / 1e3)
        }

        var i = W(".nk-image-slider"), a = 0;
        i.each(function () {
            function t() {
                k = g[0]._gsTransform && g[0]._gsTransform.x ? g[0]._gsTransform.x : 0, w = v.width(), b = g.width()
            }

            function i(n) {
                v.find("li:eq(" + n + ")").addClass("nk-image-slider-thumbs-active").siblings().removeClass("nk-image-slider-thumbs-active");
                var e = v.find("li:eq(" + (n + 1) + ")");
                e.length || (e = v.find("li:eq(0)")), t();
                var i = e.position().left;
                if (i < 0) G.to(g, .2, {x: k - i}); else {
                    var a = e.width();
                    i + a > w && G.to(g, .2, {x: k - (i + a - w)})
                }
            }

            function a() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                d && (clearInterval(x), t || v.find(".nk-image-slider-thumbs-count").remove())
            }

            function o() {
                if (d) {
                    var t = v.find(".nk-image-slider-thumbs-active"), i = t.next();
                    i.length || (i = v.find("li:eq(0)")), v.find(".nk-image-slider-thumbs-count").remove();
                    var o = W('<div class="nk-image-slider-thumbs-count"></div>').text(e(d));
                    i.append(o), _ = +new Date, a(1);
                    var r = d;
                    x = setInterval(function () {
                        if (!C) {
                            var t = _ + d - new Date;
                            t > d && (_ = +new Date, t = d), r !== e(t) && (r = e(t), o.text(r)), t <= 0 && (a(), n(l))
                        }
                    }, 100)
                }
            }

            function r() {
                C = +new Date
            }

            function s() {
                _ += new Date - C, C = !1
            }

            var l = W(this), d = parseInt(l.attr("data-autoplay"), 10) || !1, c = [], u = 0;
            if (l.find(".nk-image-slider-item").each(function () {
                    var t = W(this);
                    c.push({
                        image: t.find(".nk-image-slider-img").attr("src"),
                        thumb: t.find(".nk-image-slider-img").attr("data-thumb"),
                        content: t.find(".nk-image-slider-content").html() || ""
                    })
                }), !c.length) return void l.remove();
            var p = "";
            for (var h in c) p += '<li class="' + (h == u ? "nk-image-slider-thumbs-active" : "") + '" style="background-image: url(\'' + c[h].thumb + '\');"><div class="nk-image-slider-thumbs-overlay"></div></li>';
            var f = '\n            <div class="nk-image-slider-bg" style="background-image: url(\'' + c[u].image + '\');"></div>\n            <div class="nk-image-slider-bg-transition"></div>\n            <div class="nk-image-slider-content" style="' + (c[u].content ? "" : "opacity: 0;") + '">\n                <div class="nano">\n                    <div class="nano-content">' + c[u].content + '</div>\n                </div>\n            </div>\n            <div class="nk-image-slider-thumbs">\n                <ul>' + p + "</ul>\n            </div>\n        ";
            l.append(f);
            var v = l.find(".nk-image-slider-thumbs"), g = v.find("> ul"), m = !1, k = 0, w = 0, b = 0,
                y = new Hammer.Manager(v[0]);
            y.add(new Hammer.Pan({pointers: 1, threshold: 0})), y.on("pan press", function (n) {
                n.preventDefault(), m === !1 && (m = k, t(), v.addClass("is-dragging")), b > w && (k = Math.min(0, Math.max(n.deltaX + m, w - b)), G.set(g, {x: k})), n.isFinal && (v.removeClass("is-dragging"), m = !1)
            });
            var x = void 0, _ = new Date, C = void 0, P = {
                slides: c,
                autoplay: d,
                $thumbs: v,
                $thumbsCont: g,
                $content: l.find(".nk-image-slider-content .nano-content"),
                $contentWrapper: l.find(".nk-image-slider-content"),
                $bg: l.find(".nk-image-slider-bg"),
                $bgTransition: l.find(".nk-image-slider-bg-transition"),
                runAutoplay: o,
                stopAutoplay: a,
                pauseAutoplay: r,
                resumeAutoplay: s,
                selectThumb: i
            };
            l.data("nk-image-slider", P), o()
        }), Y.on("click", ".nk-image-slider .nk-image-slider-thumbs li:not(.nk-image-slider-thumbs-active)", function () {
            var t = W(this), e = t.parents(".nk-image-slider:eq(0)");
            n(e, t.index())
        }), Y.on("mouseenter", ".nk-image-slider", function () {
            var t = W(this).data("nk-image-slider");
            t && t.pauseAutoplay()
        }), Y.on("mouseleave", ".nk-image-slider", function () {
            var t = W(this).data("nk-image-slider");
            t && t.resumeAutoplay()
        })
    }

    function I() {
        if (W(".fb-page").length) {
            K.append('<div id="fb-root"></div>'), function (t, n, e) {
                if ("file:" !== location.protocol) {
                    var i = void 0, a = t.getElementsByTagName(n)[0];
                    t.getElementById(e) || (i = t.createElement(n), i.id = e, i.src = "../../connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4", a.parentNode.insertBefore(i, a))
                }
            }(document, "script", "facebook-jssdk")
        }
    }

    function M() {
        function t(t, n) {
            for (var e = ["link", "image", "caption"], i = 0, a = e.length; i < a; i++) n = n.replace(new RegExp("{{" + e[i] + "}}", "gi"), t[e[i]]);
            return n
        }

        var n = this, e = W(".nk-instagram");
        e.length && n.options.templates.instagram && e.each(function () {
            var e = W(this), i = {
                userID: e.attr("data-instagram-user-id") || null,
                count: e.attr("data-instagram-count") || 6,
                template: e.attr("data-instagram-template") || n.options.templates.instagram,
                quality: e.attr("data-instagram-quality") || "sm",
                loadingText: n.options.templates.instagramLoadingText,
                failText: n.options.templates.instagramFailText,
                apiPath: n.options.templates.instagramApiPath
            };
            return "file:" === window.location.protocol ? (e.html('<div class="col-12">' + i.failText + "</div>"), void console.error("You should run you website on webserver with PHP to get working Instagram")) : (e.html('<div class="col-12">' + i.loadingText + "</div>"), void W.getJSON(i.apiPath, {
                userID: i.userID,
                count: i.count
            }, function (a) {
                e.html("");
                for (var o = 0; o < i.count; o++) {
                    var r = !1;
                    if (a[o]) r = a[o]; else {
                        if (!a.statuses || !a.statuses[o]) break;
                        r = a.statuses[o]
                    }
                    var s = "thumbnail";
                    "md" === i.quality && (s = "low_resolution"), "lg" === i.quality && (s = "standard_resolution");
                    var l = {link: r.link, image: r.images[s].url, caption: r.caption};
                    e.append(t(l, i.template))
                }
                n.debounceResize()
            }).fail(function (t) {
                e.html('<div class="col-12">' + i.failText + "</div>"), W.error(t.responseText)
            }))
        })
    }

    function A() {
        function t(t, n) {
            for (var e = ["date", "tweet", "avatar", "url", "retweeted", "screen_name", "user_name"], i = 0, a = e.length; i < a; i++) n = n.replace(new RegExp("{{" + e[i] + "}}", "gi"), t[e[i]]);
            return n
        }

        var n = this, e = W(".nk-twitter-list");
        e.length && n.options.templates.twitter && e.each(function () {
            var e = W(this), i = {
                username: e.attr("data-twitter-user-name") || null,
                list: null,
                hashtag: e.attr("data-twitter-hashtag") || null,
                count: e.attr("data-twitter-count") || 2,
                hideReplies: "true" === e.attr("data-twitter-hide-replies"),
                template: e.attr("data-twitter-template") || n.options.templates.twitter,
                loadingText: n.options.templates.twitterLoadingText,
                failText: n.options.templates.twitterFailText,
                apiPath: n.options.templates.twitterApiPath
            };
            return "file:" === window.location.protocol ? (e.html(i.failText), void console.error("You should run you website on webserver with PHP to get working Twitter")) : (e.html("<span>" + i.loadingText + "</span>"), void W.getJSON(i.apiPath, {
                username: i.username,
                list: i.list,
                hashtag: i.hashtag,
                count: i.count,
                exclude_replies: i.hideReplies
            }, function (a) {
                e.html("");
                for (var o = 0; o < i.count; o++) {
                    var r = !1;
                    if (a[o]) r = a[o]; else {
                        if (!a.statuses || !a.statuses[o]) break;
                        r = a.statuses[o]
                    }
                    var s = {
                        user_name: r.user.name,
                        date: r.date_formatted,
                        tweet: r.text_entitled,
                        avatar: '<img src="' + r.user.profile_image_url + '" />',
                        url: "https://twitter.com/" + r.user.screen_name + "/status/" + r.id_str,
                        retweeted: r.retweeted,
                        screen_name: r.user.screen_name
                    };
                    e.append(t(s, i.template))
                }
                n.debounceResize()
            }).fail(function (t) {
                e.html(i.failText), W.error(t.responseText)
            }))
        })
    }

    function $() {
        function t(t, n, e) {
            var i = [];
            e = e || l;
            for (var a = 0; a < e.length; a++) e[a] && "undefined" != typeof e[a][t] && e[a][t] === n && i.push(e[a]);
            return i
        }

        function n(e) {
            c || d++;
            var i = e.find("> h2, > h3").eq(0).text(),
                a = "doc-" + i.replace(/\s+/g, "-").toLowerCase() + (c ? "-" + c : "");
            if (t("hash", a).length) return c++, n(e);
            e.attr("data-id", d);
            var o = !1, r = e.parents(".nk-doc-item:eq(0)");
            return r.length && (o = parseInt(r.attr("data-id"), 10)), c = 0, {
                id: d,
                title: i,
                hash: a,
                $block: e,
                parent: o
            }
        }

        function e(n) {
            var o = t("id", n)[0], r = t("parent", n)[0];
            if (r) return void e(r.id);
            if (o) {
                s.hide(), a.find("[data-id]").removeClass("active"), a.find("[data-id=" + n + "]").addClass("active");
                var l = t("id", o.parent)[0];
                l && (a.find("[data-id=" + o.parent + "]").addClass("active"), l.$block.show());
                var d = a.find("[data-id] + ul");
                d.each(function () {
                    var t = W(this), n = !!t.find("[data-id].active").length, e = t.hasClass("opened");
                    if (n && !e) {
                        t.css("height", ""), t.show();
                        var a = t.innerHeight();
                        t.hide(), G.set(t, {height: 0}), G.to(t, .4, {
                            height: a,
                            display: "block",
                            onComplete: function () {
                                i.debounceResize()
                            }
                        }), t.addClass("opened")
                    }
                    !n && e && (G.to(t, .4, {
                        height: 0, display: "none", onComplete: function () {
                            i.debounceResize()
                        }
                    }), t.removeClass("opened"))
                }), o.$block.show(), location.hash = o.hash, u || (i.debounceResize(), i.scrollTo(W(".nk-header-title").next())), u = 0
            }
        }

        var i = this, a = W(".nk-doc-links"), o = W(".nk-doc > .nk-doc-item"),
            r = W(".nk-doc > .nk-doc-item > .nk-doc-item"), s = o.add(r), l = [];
        if (s.length) {
            var d = 0, c = 0;
            o.each(function () {
                var t = n(W(this));
                l.push(t)
            }), r.each(function () {
                var t = n(W(this));
                l.push(t)
            });
            for (var u = 1, p = "", h = 0; h < l.length; h++) if (l[h].parent === !1) {
                var f = t("parent", l[h].id);
                if (p += '<li><div data-id="' + l[h].id + '">' + l[h].title + (f.length ? " <sup>[" + f.length + "]</sup>" : "") + "</div>", f.length) {
                    p += "<ul>";
                    for (var v = 0; v < f.length; v++) p += '<li><div data-id="' + f[v].id + '">' + f[v].title + "</div>";
                    p += "</ul>"
                }
                p += "</li>"
            }
            if (a.html("<ul>" + p + "</ul>"), a.on("click", "[data-id]:not(.active)", function () {
                    e(parseInt(W(this).attr("data-id"), 10))
                }), location.hash) {
                var g = t("hash", location.hash.replace("#", ""));
                g[0] && e(g[0].id)
            } else e(l[0].id)
        }
    }

    function R() {
        "undefined" != typeof W.fn.stick_in_parent && W(".nk-sidebar-sticky").each(function () {
            var t = W(this), n = t.parent();
            n.addClass("nk-sidebar-sticky-parent"), t.wrapInner("<div>").children().stick_in_parent({
                parent: n, recalc_every: 50,
                offset_top: parseInt(t.attr("data-offset-top"), 10) || 130, spacer: !1
            }).on("sticky_kit:unbottom sticky_kit:stick sticky_kit:bottom", function () {
                n.css("min-height", W(this).height())
            }).on("sticky_kit:unstick", function () {
                n.css("min-height", "")
            })
        })
    }

    function z() {
        "undefined" != typeof FastClick && FastClick.attach(document.body)
    }

    function D(t) {
        "undefined" != typeof W.fn.nanoScroller && (t || Y).find(".nano").nanoScroller()
    }

    function F() {
        if ("undefined" != typeof W.fn.jarallax) {
            var t = this;
            W(".bg-video[data-video]").each(function () {
                W(this).attr("data-jarallax-video", W(this).attr("data-video")), W(this).removeAttr("data-video")
            }), W(".bg-image-parallax, .bg-video-parallax").jarallax({speed: t.options.parallaxSpeed}), W(".bg-video:not(.bg-video-parallax)").jarallax({speed: 1})
        }
    }

    function q() {
        function t(t) {
            W('<div class="nk-flickity-arrow nk-flickity-arrow-prev"><span class="ion-ios-arrow-back"></span></div>').on("click", function () {
                t.flickity("previous")
            }).appendTo(t), W('<div class="nk-flickity-arrow nk-flickity-arrow-next"><span class="ion-ios-arrow-forward"></span></div>').on("click", function () {
                t.flickity("next")
            }).appendTo(t)
        }

        function n(t) {
            t.on("dragStart", function () {
                W(this).find(".flickity-viewport").addClass("is-dragging")
            }), t.on("dragEnd", function () {
                W(this).find(".flickity-viewport").removeClass("is-dragging")
            })
        }

        if ("undefined" != typeof window.Flickity) {
            W(".nk-carousel > .nk-carousel-inner").each(function () {
                W(this).flickity({
                    pageDots: "true" === W(this).parent().attr("data-dots") || !1,
                    autoPlay: parseFloat(W(this).parent().attr("data-autoplay")) || !1,
                    prevNextButtons: !1,
                    wrapAround: !0,
                    imagesLoaded: !0,
                    cellAlign: W(this).parent().attr("data-cell-align") || "center"
                }), "true" === W(this).parent().attr("data-arrows") && t(W(this)), n(W(this))
            })
        }
    }

    function B() {
        var t = W(".nk-popup-gallery");
        if ("undefined" != typeof PhotoSwipe && t.length) {
            var n = '<div id="gallery" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\n          <div class="pswp__bg"></div>\n          <div class="pswp__scroll-wrap">\n            <div class="pswp__container">\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n            </div>\n            <div class="pswp__ui pswp__ui--hidden">\n              <div class="pswp__top-bar">\n                <div class="pswp__counter"></div>\n                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n                <div class="pswp__preloader">\n                  <div class="pswp__preloader__icn">\n                    <div class="pswp__preloader__cut">\n                      <div class="pswp__preloader__donut"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="pswp__loading-indicator"><div class="pswp__loading-indicator__line"></div></div>\n              <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\n              <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\n              <div class="pswp__caption">\n                <div class="pswp__caption__center">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
            K.append(n);
            var e = function (t) {
                var n = W(t).find("a.nk-gallery-item"), e = [], i = void 0, a = void 0, o = void 0, r = void 0;
                return n.each(function () {
                    i = W(this).find("img"), a = W(this).next(".nk-gallery-item-description"), o = (this.getAttribute("data-size") || "1920x1080").split("x"), r = {
                        src: this.getAttribute("href"),
                        w: parseInt(o[0], 10),
                        h: parseInt(o[1], 10),
                        author: this.getAttribute("data-author")
                    }, a.length && (r.title = a.html()), r.el = this, i.length > 0 && (r.msrc = r.src, i.length > 1 && (r.title = W(i).filter(".photoswipe-description").html()));
                    var t = this.getAttribute("data-med") || r.src;
                    t && (o = (this.getAttribute("data-med-size") || this.getAttribute("data-size") || "1920x1080").split("x"), r.m = {
                        src: t,
                        w: parseInt(o[0], 10),
                        h: parseInt(o[1], 10)
                    }), r.o = {src: r.src, w: r.w, h: r.h}, e.push(r)
                }), e
            }, i = function (t, n, i, a) {
                var o = W(".pswp")[0], r = void 0, s = void 0, l = void 0;
                if (l = e(n), s = {
                        captionAndToolbarShowEmptyCaptions: !1,
                        mainClass: "pswp--minimal--dark",
                        barsSize: {top: 0, bottom: 0},
                        captionEl: !0,
                        fullscreenEl: !1,
                        shareEl: !1,
                        bgOpacity: .85,
                        tapToClose: !0,
                        tapToToggleControls: !1,
                        showHideOpacity: !0,
                        addCaptionHTMLFn: function (t, n) {
                            if (!t.title && !t.author) return n.children[0].innerHTML = "", !1;
                            var e = "";
                            return t.title && (e += t.title), t.author && (t.title && (e += "<br>"), e += "<small>" + t.author + "</small>"), n.children[0].innerHTML = e, !0
                        },
                        galleryUID: n.getAttribute("data-pswp-uid")
                    }, a) if (s.galleryPIDs) {
                    for (var d = 0; d < l.length; d++) if (l[d].pid === t) {
                        s.index = d;
                        break
                    }
                } else s.index = parseInt(t, 10) - 1; else s.index = parseInt(t, 10);
                if (!isNaN(s.index)) {
                    i && (s.showAnimationDuration = 0), r = new PhotoSwipe(o, PhotoSwipeUI_Default, l, s);
                    var c = void 0, u = !1, p = !0, h = void 0;
                    r.listen("beforeResize", function () {
                        var t = window.devicePixelRatio ? window.devicePixelRatio : 1;
                        t = Math.min(t, 2.5), c = r.viewportSize.x * t, c >= 1200 || !r.likelyTouchDevice && c > 800 || screen.width > 1200 ? u || (u = !0, h = !0) : u && (u = !1, h = !0), h && !p && r.invalidateCurrItems(), p && (p = !1), h = !1
                    }), r.listen("gettingData", function (t, n) {
                        u ? (n.src = n.o.src, n.w = n.o.w, n.h = n.o.h) : (n.src = n.m.src, n.w = n.m.w, n.h = n.m.h)
                    }), r.init()
                }
            }, a = function () {
                var t = window.location.hash.substring(1), n = {};
                if (t.length < 5) return n;
                for (var e = t.split("&"), i = 0; i < e.length; i++) if (e[i]) {
                    var a = e[i].split("=");
                    a.length < 2 || (n[a[0]] = a[1])
                }
                return n.gid && (n.gid = parseInt(n.gid, 10)), n
            }, o = 0;
            t.each(function () {
                var t = W(this);
                t.attr("data-pswp-uid", o + 1), t.on("click", "a.nk-gallery-item", function (n) {
                    n.preventDefault();
                    var e = 0, a = this;
                    t.find("a.nk-gallery-item").each(function (t) {
                        return this !== a || (e = t, !1)
                    }), i(e, t[0])
                }), o++
            });
            var r = a();
            r.pid && r.gid && i(r.pid, t.get(r.gid - 1), !0, !0)
        }
    }

    function H() {
        var t = this;
        X.on("shown.bs.tab", function () {
            t.debounceResize()
        })
    }

    function L() {
        var t = this;
        X.on("shown.bs.collapse", function () {
            t.debounceResize()
        })
    }

    function E() {
        if ("undefined" != typeof W.fn.countdown && "undefined" != typeof moment && "undefined" != typeof moment.tz) {
            var t = this;
            W(".nk-countdown").each(function () {
                var n = W(this).attr("data-timezone"), e = W(this).attr("data-end");
                e = moment.tz(e, n).toDate(), W(this).countdown(e, function (n) {
                    W(this).html(n.strftime(t.options.templates.countdown))
                })
            })
        }
    }

    function N(t) {
        function n(t, n) {
            for (var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i = 0; i < n.newValue.length; i++) "undefined" == typeof t[i] || !e && n.newValue[i] === n.oldValue[i] || t[i].text(n.newValue[i])
        }

        "undefined" != typeof W.fn.bootstrapSlider && W(".nk-input-slider").each(function () {
            for (var t = W(this), e = t.find("input"), i = [], a = 0; a < 3; a++) i.push(t.find(".nk-input-slider-value-" + a));
            e.bootstrapSlider().on("change", function (t) {
                t.value && t.value.newValue && n(i, t.value)
            }), n(i, {newValue: e.bootstrapSlider("getValue")}, !0)
        })
    }

    function V() {
        "undefined" != typeof W.fn.summernote && (W(".nk-summernote").summernote({
            height: 300,
            dialogsInBody: !0,
            toolbar: [["style", ["bold", "italic", "underline"]], ["fontsize", ["fontsize"]], ["color", ["color"]], ["insert", ["link", "picture", "video"]], ["para", ["ul", "ol", "paragraph"]], ["height", ["height"]], ["misc", ["codeview"]]]
        }), W(".note-popover").hide())
    }

    var j = function () {
            function t(t, n) {
                for (var e = 0; e < n.length; e++) {
                    var i = n[e];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            return function (n, e, i) {
                return e && t(n.prototype, e), i && t(n, i), n
            }
        }(), O = {
            scrollToAnchorSpeed: 700,
            templates: {
                secondaryNavbarBackItem: "Back",
                plainVideoIcon: '<span class="nk-video-icon"><span class="fa fa-play pl-5"></span></span>',
                plainVideoLoadIcon: '<span class="nk-video-icon"><span class="nk-loading-icon"></span></span>',
                audioPlainButton: '<div class="nk-audio-plain-play-pause">\n                <span class="nk-audio-plain-play">\n                    <span class="ion-play ml-3"></span>\n                </span>\n                <span class="nk-audio-plain-pause">\n                    <span class="ion-pause"></span>\n                </span>\n            </div>',
                instagram: '<div class="col-4">\n                <a href="{{link}}" target="_blank">\n                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">\n                </a>\n            </div>',
                instagramLoadingText: "Loading...",
                instagramFailText: "Failed to fetch data",
                instagramApiPath: "php/instagram/instagram.php",
                twitter: '<div class="nk-twitter">\n                <span class="nk-twitter-icon fa fa-twitter"></span>\n                <div class="nk-twitter-name">\n                      <a href="https://twitter.com/{{screen_name}}" target="_blank">@{{screen_name}}</a>\n                </div>\n                <div class="nk-twitter-date">\n                    <span>{{date}}</span>\n                </div>\n                <div class="nk-twitter-text">\n                   {{tweet}}\n                </div>\n            </div>',
                twitterLoadingText: "Loading...",
                twitterFailText: "Failed to fetch data",
                twitterApiPath: "php/twitter/tweet.php",
                countdown: '<div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%D</span>\n                Days\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%H</span>\n                Hours\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%M</span>\n                Minutes\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%S</span>\n                Seconds\n            </div>'
            }
        }, W = jQuery, G = window.TweenMax,
        U = (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera)),
        J = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
    W("html").addClass(U ? "is-mobile" : "is-desktop");
    var X = W(window), Y = W(document), K = W("body"), Z = 0, Q = 0, tt = 0;
    n(), X.on("resize load orientationchange", n);
    var nt = [], et = void 0;
    X.on("load resize orientationchange", function (t) {
        nt.length && (clearTimeout(et), et = setTimeout(function () {
            for (var n = 0; n < nt.length; n++) nt[n](t)
        }, 50))
    });
    var it = [], at = void 0, ot = 0;
    X.on("scroll load resize orientationchange", function () {
        it.length && (at = !0)
    }), setInterval(function () {
        at && (at = !1, window.requestAnimationFrame(a))
    }, 250);
    var rt = void 0, st = void 0, lt = void 0, dt = void 0, ct = W(".nk-header > *"), ut = function () {
        function n() {
            t(this, n), this.options = O
        }

        return j(n, [{
            key: "init", value: function () {
                var t = this;
                return t.initPluginStickySidebar(), t.initNavbar(), t.initNavbarSide(), t.initNavbarDropEffect1(), t.initStore(), t.initCounters(), t.initNewsBox(), t.initAnchors(), t.initVideoBlocks(), t.initGIF(), t.initInfoBoxes(), t.initForms(), t.initFormsMailChimp(), t.initAudioPlayer(), t.initImageSlider(), t.initFacebook(), t.initInstagram(), t.initTwitter(), t.initDoc(), t.initPluginFastClick(), t.initPluginNano(), t.initPluginJarallax(), t.initPluginFlickity(), t.initPluginPhotoswipe(), t.initPluginTabs(), t.initPluginAccordions(), t.initPluginCountdown(), t.initPluginSeiyriaBootstrapSlider(), t.initPluginSummernote(), t
            }
        }, {
            key: "setOptions", value: function (t) {
                return h.call(this, t)
            }
        }, {
            key: "debounceResize", value: function (t) {
                return e.call(this, t)
            }
        }, {
            key: "throttleScroll", value: function (t) {
                return o.call(this, t)
            }
        }, {
            key: "bodyOverflow", value: function (t) {
                return c.call(this, t)
            }
        }, {
            key: "isInViewport", value: function (t, n) {
                return u.call(this, t, n)
            }
        }, {
            key: "scrollTo", value: function (t, n) {
                return p.call(this, t, n)
            }
        }, {
            key: "initNavbar", value: function () {
                return f.call(this)
            }
        }, {
            key: "initNavbarSide", value: function () {
                return v.call(this)
            }
        }, {
            key: "initNavbarDropEffect1", value: function () {
                return g.call(this)
            }
        }, {
            key: "initCounters", value: function () {
                return m.call(this)
            }
        }, {
            key: "initStore", value: function () {
                return k.call(this)
            }
        }, {
            key: "initNewsBox", value: function () {
                return w.call(this)
            }
        }, {
            key: "initAnchors", value: function () {
                return b.call(this)
            }
        }, {
            key: "initVideoBlocks", value: function () {
                return y.call(this)
            }
        }, {
            key: "initGIF", value: function () {
                return x.call(this)
            }
        }, {
            key: "initInfoBoxes", value: function () {
                return _.call(this)
            }
        }, {
            key: "initForms", value: function () {
                return C.call(this)
            }
        }, {
            key: "initFormsMailChimp", value: function () {
                return P.call(this)
            }
        }, {
            key: "initAudioPlayer", value: function () {
                return T.call(this)
            }
        }, {
            key: "initImageSlider", value: function () {
                return S.call(this)
            }
        }, {
            key: "initFacebook", value: function () {
                return I.call(this)
            }
        }, {
            key: "initInstagram", value: function () {
                return M.call(this)
            }
        }, {
            key: "initTwitter", value: function () {
                return A.call(this)
            }
        }, {
            key: "initDoc", value: function () {
                return $.call(this)
            }
        }, {
            key: "initPluginStickySidebar", value: function () {
                return R.call(this)
            }
        }, {
            key: "initPluginFastClick", value: function () {
                return z.call(this)
            }
        }, {
            key: "initPluginNano", value: function (t) {
                return D.call(this, t)
            }
        }, {
            key: "initPluginJarallax", value: function (t) {
                return F.call(this, t)
            }
        }, {
            key: "initPluginFlickity", value: function (t) {
                return q.call(this, t)
            }
        }, {
            key: "initPluginPhotoswipe", value: function (t) {
                return B.call(this, t)
            }
        }, {
            key: "initPluginTabs", value: function (t) {
                return H.call(this, t)
            }
        }, {
            key: "initPluginAccordions", value: function (t) {
                return L.call(this, t)
            }
        }, {
            key: "initPluginCountdown", value: function (t) {
                return E.call(this, t)
            }
        }, {
            key: "initPluginSeiyriaBootstrapSlider", value: function (t) {
                return N.call(this, t)
            }
        }, {
            key: "initPluginSummernote", value: function (t) {
                return V.call(this, t)
            }
        }]), n
    }();
    window.GoodGames = new ut
}();

$('.nk-nav-table li:has(> div ul)').addClass("haschaid");

