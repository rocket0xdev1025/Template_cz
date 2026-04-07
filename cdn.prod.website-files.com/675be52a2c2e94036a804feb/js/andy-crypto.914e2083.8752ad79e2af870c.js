(() => {
  var e = {
      5897: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          cleanupElement: function () {
            return p;
          },
          createInstance: function () {
            return f;
          },
          destroy: function () {
            return I;
          },
          init: function () {
            return E;
          },
          ready: function () {
            return g;
          },
        }),
          n(2897),
          n(233),
          n(9754),
          n(971),
          n(2374),
          n(5152),
          n(5273),
          n(172);
        let i = (function (e) {
            return e && e.__esModule ? e : { default: e };
          })(n(3142)),
          a = n(7933),
          r = (e) => e.Webflow.require("lottie").lottie,
          o = (e) => !!(e.Webflow.env("design") || e.Webflow.env("preview")),
          l = { Playing: "playing", Stopped: "stopped" },
          c = new (class e {
            _cache = [];
            set(e, t) {
              let n = (0, i.default)(this._cache, ({ wrapper: t }) => t === e);
              -1 !== n && this._cache.splice(n, 1),
                this._cache.push({ wrapper: e, instance: t });
            }
            delete(e) {
              let t = (0, i.default)(this._cache, ({ wrapper: t }) => t === e);
              -1 !== t && this._cache.splice(t, 1);
            }
            get(e) {
              let t = (0, i.default)(this._cache, ({ wrapper: t }) => t === e);
              return -1 !== t ? this._cache[t].instance : null;
            }
          })(),
          u = {};
        class s {
          config = null;
          currentState = l.Stopped;
          animationItem;
          handlers = {
            enterFrame: [],
            complete: [],
            loop: [],
            dataReady: [],
            destroy: [],
            error: [],
          };
          load(e) {
            let t = (e.dataset || u).src || "";
            t.endsWith(".lottie")
              ? (0, a.fetchLottie)(t).then((t) => {
                  this._loadAnimation(e, t);
                })
              : this._loadAnimation(e, void 0),
              c.set(e, this),
              (this.container = e);
          }
          _loadAnimation(e, t) {
            let n = e.dataset || u,
              i = n.src || "",
              a = n.preserveAspectRatio || "xMidYMid meet",
              c = n.renderer || "svg",
              s = 1 === parseFloat(n.loop),
              d = parseFloat(n.direction) || 1,
              f = 1 === parseFloat(n.autoplay),
              p = parseFloat(n.duration) || 0,
              E = 1 === parseFloat(n.isIx2Target),
              I = parseFloat(n.ix2InitialState);
            isNaN(I) && (I = null);
            let g = {
              src: i,
              loop: s,
              autoplay: f,
              renderer: c,
              direction: d,
              duration: p,
              hasIx2: E,
              ix2InitialValue: I,
              preserveAspectRatio: a,
            };
            if (
              this.animationItem &&
              this.config &&
              this.config.src === i &&
              c === this.config.renderer &&
              a === this.config.preserveAspectRatio
            ) {
              if (
                (s !== this.config.loop && this.setLooping(s),
                !E &&
                  (d !== this.config.direction && this.setDirection(d),
                  p !== this.config.duration &&
                    (p > 0 && p !== this.duration
                      ? this.setSpeed(this.duration / p)
                      : this.setSpeed(1))),
                f && this.play(),
                I && I !== this.config.ix2InitialValue)
              ) {
                let e = I / 100;
                this.goToFrame(this.frames * e);
              }
              this.config = g;
              return;
            }
            let T = e.ownerDocument.defaultView;
            try {
              this.animationItem && this.destroy(),
                (this.animationItem = r(T).loadAnimation({
                  container: e,
                  loop: s,
                  autoplay: f,
                  renderer: c,
                  rendererSettings: {
                    preserveAspectRatio: a,
                    progressiveLoad: !0,
                    hideOnTransparent: !0,
                  },
                  ...(t ? { animationData: t } : { path: i }),
                }));
            } catch (e) {
              this.handlers.error.forEach((t) => t(e));
              return;
            }
            this.animationItem &&
              (o(T) &&
                (this.animationItem.addEventListener("enterFrame", () => {
                  if (!this.isPlaying) return;
                  let {
                      currentFrame: e,
                      totalFrames: t,
                      playDirection: n,
                    } = this.animationItem,
                    i = (e / t) * 100,
                    a = Math.round(1 === n ? i : 100 - i);
                  this.handlers.enterFrame.forEach((t) => t(a, e));
                }),
                this.animationItem.addEventListener("complete", () => {
                  if (
                    this.currentState !== l.Playing ||
                    !this.animationItem.loop
                  ) {
                    this.handlers.complete.forEach((e) => e());
                    return;
                  }
                  this.currentState = l.Stopped;
                }),
                this.animationItem.addEventListener("loopComplete", (e) => {
                  this.handlers.loop.forEach((t) => t(e));
                }),
                this.animationItem.addEventListener("data_failed", (e) => {
                  this.handlers.error.forEach((t) => t(e));
                }),
                this.animationItem.addEventListener("error", (e) => {
                  this.handlers.error.forEach((t) => t(e));
                })),
              this.isLoaded
                ? (this.handlers.dataReady.forEach((e) => e()),
                  f && this.play())
                : this.animationItem.addEventListener("data_ready", () => {
                    if (
                      (this.handlers.dataReady.forEach((e) => e()),
                      !E &&
                        (this.setDirection(d),
                        p > 0 &&
                          p !== this.duration &&
                          this.setSpeed(this.duration / p),
                        f && this.play()),
                      I)
                    ) {
                      let e = I / 100;
                      this.goToFrame(this.frames * e);
                    }
                  }),
              (this.config = g));
          }
          onFrameChange(e) {
            -1 === this.handlers.enterFrame.indexOf(e) &&
              this.handlers.enterFrame.push(e);
          }
          onPlaybackComplete(e) {
            -1 === this.handlers.complete.indexOf(e) &&
              this.handlers.complete.push(e);
          }
          onLoopComplete(e) {
            -1 === this.handlers.loop.indexOf(e) && this.handlers.loop.push(e);
          }
          onDestroy(e) {
            -1 === this.handlers.destroy.indexOf(e) &&
              this.handlers.destroy.push(e);
          }
          onDataReady(e) {
            -1 === this.handlers.dataReady.indexOf(e) &&
              this.handlers.dataReady.push(e);
          }
          onError(e) {
            -1 === this.handlers.error.indexOf(e) &&
              this.handlers.error.push(e);
          }
          play() {
            if (!this.animationItem) return;
            let e = 1 === this.animationItem.playDirection ? 0 : this.frames;
            this.animationItem.goToAndPlay(e, !0),
              (this.currentState = l.Playing);
          }
          stop() {
            if (this.animationItem) {
              if (this.isPlaying) {
                let { playDirection: e } = this.animationItem,
                  t = 1 === e ? 0 : this.frames;
                this.animationItem.goToAndStop(t, !0);
              }
              this.currentState = l.Stopped;
            }
          }
          destroy() {
            this.animationItem &&
              (this.isPlaying && this.stop(),
              this.handlers.destroy.forEach((e) => e()),
              this.container && c.delete(this.container),
              this.animationItem.destroy(),
              Object.keys(this.handlers).forEach(
                (e) => (this.handlers[e].length = 0)
              ),
              (this.animationItem = null),
              (this.container = null),
              (this.config = null));
          }
          get isPlaying() {
            return !!this.animationItem && !this.animationItem.isPaused;
          }
          get isPaused() {
            return !!this.animationItem && this.animationItem.isPaused;
          }
          get duration() {
            return this.animationItem ? this.animationItem.getDuration() : 0;
          }
          get frames() {
            return this.animationItem ? this.animationItem.totalFrames : 0;
          }
          get direction() {
            return this.animationItem ? this.animationItem.playDirection : 1;
          }
          get isLoaded() {
            return !this.animationItem, this.animationItem.isLoaded;
          }
          get ix2InitialValue() {
            return this.config ? this.config.ix2InitialValue : null;
          }
          goToFrame(e) {
            this.animationItem && this.animationItem.setCurrentRawFrameValue(e);
          }
          setSubframe(e) {
            this.animationItem && this.animationItem.setSubframe(e);
          }
          setSpeed(e = 1) {
            this.animationItem &&
              (this.isPlaying && this.stop(), this.animationItem.setSpeed(e));
          }
          setLooping(e) {
            this.animationItem &&
              (this.isPlaying && this.stop(), (this.animationItem.loop = e));
          }
          setDirection(e) {
            this.animationItem &&
              (this.isPlaying && this.stop(),
              this.animationItem.setDirection(e),
              this.goToFrame(1 === e ? 0 : this.frames));
          }
        }
        let d = () =>
            Array.from(
              document.querySelectorAll('[data-animation-type="lottie"]')
            ),
          f = (e) => {
            let t = c.get(e);
            return null == t && (t = new s()), t.load(e), t;
          },
          p = (e) => {
            let t = c.get(e);
            t && t.destroy();
          },
          E = () => {
            d().forEach((e) => {
              1 !== parseFloat(e.getAttribute("data-is-ix2-target")) && p(e),
                f(e);
            });
          },
          I = () => {
            d().forEach(p);
          },
          g = E;
      },
      2444: function (e, t, n) {
        "use strict";
        var i = n(3949),
          a = n(5897),
          r = n(8724);
        i.define(
          "lottie",
          (e.exports = function () {
            return {
              lottie: r,
              createInstance: a.createInstance,
              cleanupElement: a.cleanupElement,
              init: a.init,
              destroy: a.destroy,
              ready: a.ready,
            };
          })
        );
      },
      9904: function () {
        "use strict";
        !(function () {
          if ("undefined" == typeof window) return;
          let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
            t = !!e && parseInt(e[1], 10) >= 16;
          if ("objectFit" in document.documentElement.style != !1 && !t) {
            window.objectFitPolyfill = function () {
              return !1;
            };
            return;
          }
          let n = function (e) {
              let t = window.getComputedStyle(e, null),
                n = t.getPropertyValue("position"),
                i = t.getPropertyValue("overflow"),
                a = t.getPropertyValue("display");
              (!n || "static" === n) && (e.style.position = "relative"),
                "hidden" !== i && (e.style.overflow = "hidden"),
                (!a || "inline" === a) && (e.style.display = "block"),
                0 === e.clientHeight && (e.style.height = "100%"),
                -1 === e.className.indexOf("object-fit-polyfill") &&
                  (e.className += " object-fit-polyfill");
            },
            i = function (e) {
              let t = window.getComputedStyle(e, null),
                n = {
                  "max-width": "none",
                  "max-height": "none",
                  "min-width": "0px",
                  "min-height": "0px",
                  top: "auto",
                  right: "auto",
                  bottom: "auto",
                  left: "auto",
                  "margin-top": "0px",
                  "margin-right": "0px",
                  "margin-bottom": "0px",
                  "margin-left": "0px",
                };
              for (let i in n)
                t.getPropertyValue(i) !== n[i] && (e.style[i] = n[i]);
            },
            a = function (e) {
              let t = e.parentNode;
              n(t),
                i(e),
                (e.style.position = "absolute"),
                (e.style.height = "100%"),
                (e.style.width = "auto"),
                e.clientWidth > t.clientWidth
                  ? ((e.style.top = "0"),
                    (e.style.marginTop = "0"),
                    (e.style.left = "50%"),
                    (e.style.marginLeft = -(e.clientWidth / 2) + "px"))
                  : ((e.style.width = "100%"),
                    (e.style.height = "auto"),
                    (e.style.left = "0"),
                    (e.style.marginLeft = "0"),
                    (e.style.top = "50%"),
                    (e.style.marginTop = -(e.clientHeight / 2) + "px"));
            },
            r = function (e) {
              if (void 0 === e || e instanceof Event)
                e = document.querySelectorAll("[data-object-fit]");
              else if (e && e.nodeName) e = [e];
              else if ("object" != typeof e || !e.length || !e[0].nodeName)
                return !1;
              for (let n = 0; n < e.length; n++) {
                if (!e[n].nodeName) continue;
                let i = e[n].nodeName.toLowerCase();
                if ("img" === i) {
                  if (t) continue;
                  e[n].complete
                    ? a(e[n])
                    : e[n].addEventListener("load", function () {
                        a(this);
                      });
                } else
                  "video" === i
                    ? e[n].readyState > 0
                      ? a(e[n])
                      : e[n].addEventListener("loadedmetadata", function () {
                          a(this);
                        })
                    : a(e[n]);
              }
              return !0;
            };
          "loading" === document.readyState
            ? document.addEventListener("DOMContentLoaded", r)
            : r(),
            window.addEventListener("resize", r),
            (window.objectFitPolyfill = r);
        })();
      },
      1724: function () {
        "use strict";
        !(function () {
          function e(e) {
            if (!Webflow.env("design"))
              $("video").each(function () {
                e && $(this).prop("autoplay") ? this.play() : this.pause();
              }),
                $(".w-background-video--control").each(function () {
                  e ? n($(this)) : t($(this));
                });
          }
          function t(e) {
            e.find("> span").each(function (e) {
              $(this).prop("hidden", () => 0 === e);
            });
          }
          function n(e) {
            e.find("> span").each(function (e) {
              $(this).prop("hidden", () => 1 === e);
            });
          }
          "undefined" != typeof window &&
            $(document).ready(() => {
              let i = window.matchMedia("(prefers-reduced-motion: reduce)");
              i.addEventListener("change", (t) => {
                e(!t.matches);
              }),
                i.matches && e(!1),
                $("video:not([autoplay])").each(function () {
                  $(this)
                    .parent()
                    .find(".w-background-video--control")
                    .each(function () {
                      t($(this));
                    });
                }),
                $(document).on(
                  "click",
                  ".w-background-video--control",
                  function (e) {
                    if (Webflow.env("design")) return;
                    let i = $(e.currentTarget),
                      a = $(`video#${i.attr("aria-controls")}`).get(0);
                    if (a) {
                      if (a.paused) {
                        let e = a.play();
                        n(i),
                          e &&
                            "function" == typeof e.catch &&
                            e.catch(() => {
                              t(i);
                            });
                      } else a.pause(), t(i);
                    }
                  }
                );
            });
        })();
      },
      941: function (e, t, n) {
        "use strict";
        var i = n(3949),
          a = n(6011);
        a.setEnv(i.env),
          i.define(
            "ix2",
            (e.exports = function () {
              return a;
            })
          );
      },
      3487: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          strFromU8: function () {
            return W;
          },
          unzip: function () {
            return H;
          },
        });
        let n = {},
          i = function (e, t, i, a, r) {
            let o = new Worker(
              n[t] ||
                (n[t] = URL.createObjectURL(
                  new Blob(
                    [
                      e +
                        ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})',
                    ],
                    { type: "text/javascript" }
                  )
                ))
            );
            return (
              (o.onmessage = function (e) {
                let t = e.data,
                  n = t.$e$;
                if (n) {
                  let e = Error(n[0]);
                  (e.code = n[1]), (e.stack = n[2]), r(e, null);
                } else r(null, t);
              }),
              o.postMessage(i, a),
              o
            );
          },
          a = Uint8Array,
          r = Uint16Array,
          o = Uint32Array,
          l = new a([
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
            4, 5, 5, 5, 5, 0, 0, 0, 0,
          ]),
          c = new a([
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
            10, 10, 11, 11, 12, 12, 13, 13, 0, 0,
          ]),
          u = new a([
            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
          ]),
          s = function (e, t) {
            let n = new r(31);
            for (var i = 0; i < 31; ++i) n[i] = t += 1 << e[i - 1];
            let a = new o(n[30]);
            for (i = 1; i < 30; ++i)
              for (let e = n[i]; e < n[i + 1]; ++e)
                a[e] = ((e - n[i]) << 5) | i;
            return [n, a];
          },
          d = s(l, 2),
          f = d[0],
          p = d[1];
        (f[28] = 258), (p[258] = 28);
        let E = s(c, 0)[0],
          I = new r(32768);
        for (var g = 0; g < 32768; ++g) {
          let e = ((43690 & g) >>> 1) | ((21845 & g) << 1);
          (e =
            ((61680 & (e = ((52428 & e) >>> 2) | ((13107 & e) << 2))) >>> 4) |
            ((3855 & e) << 4)),
            (I[g] = (((65280 & e) >>> 8) | ((255 & e) << 8)) >>> 1);
        }
        let T = function (e, t, n) {
            let i;
            let a = e.length,
              o = 0,
              l = new r(t);
            for (; o < a; ++o) e[o] && ++l[e[o] - 1];
            let c = new r(t);
            for (o = 0; o < t; ++o) c[o] = (c[o - 1] + l[o - 1]) << 1;
            if (n) {
              i = new r(1 << t);
              let n = 15 - t;
              for (o = 0; o < a; ++o)
                if (e[o]) {
                  let a = (o << 4) | e[o],
                    r = t - e[o],
                    l = c[e[o] - 1]++ << r;
                  for (let e = l | ((1 << r) - 1); l <= e; ++l)
                    i[I[l] >>> n] = a;
                }
            } else
              for (i = new r(a), o = 0; o < a; ++o)
                e[o] && (i[o] = I[c[e[o] - 1]++] >>> (15 - e[o]));
            return i;
          },
          y = new a(288);
        for (g = 0; g < 144; ++g) y[g] = 8;
        for (g = 144; g < 256; ++g) y[g] = 9;
        for (g = 256; g < 280; ++g) y[g] = 7;
        for (g = 280; g < 288; ++g) y[g] = 8;
        let m = new a(32);
        for (g = 0; g < 32; ++g) m[g] = 5;
        let _ = T(y, 9, 1),
          O = T(m, 5, 1),
          b = function (e) {
            let t = e[0];
            for (let n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
            return t;
          },
          h = function (e, t, n) {
            let i = (t / 8) | 0;
            return ((e[i] | (e[i + 1] << 8)) >> (7 & t)) & n;
          },
          L = function (e, t) {
            let n = (t / 8) | 0;
            return (e[n] | (e[n + 1] << 8) | (e[n + 2] << 16)) >> (7 & t);
          },
          S = function (e) {
            return ((e + 7) / 8) | 0;
          },
          R = function (e, t, n) {
            (null == t || t < 0) && (t = 0),
              (null == n || n > e.length) && (n = e.length);
            let i = new (
              2 === e.BYTES_PER_ELEMENT ? r : 4 === e.BYTES_PER_ELEMENT ? o : a
            )(n - t);
            return i.set(e.subarray(t, n)), i;
          },
          N = [
            "unexpected EOF",
            "invalid block type",
            "invalid length/literal",
            "invalid distance",
            "stream finished",
            "no stream handler",
            ,
            "no callback",
            "invalid UTF-8 data",
            "extra field too long",
            "date not in range 1980-2099",
            "filename too long",
            "stream finishing",
            "invalid zip data",
          ];
        var A = function (e, t, n) {
          let i = Error(t || N[e]);
          if (
            ((i.code = e),
            Error.captureStackTrace && Error.captureStackTrace(i, A),
            !n)
          )
            throw i;
          return i;
        };
        let C = function (e, t, n) {
            let i = e.length;
            if (!i || (n && n.f && !n.l)) return t || new a(0);
            let r = !t || n,
              o = !n || n.i;
            n || (n = {}), t || (t = new a(3 * i));
            let s = function (e) {
                let n = t.length;
                if (e > n) {
                  let i = new a(Math.max(2 * n, e));
                  i.set(t), (t = i);
                }
              },
              d = n.f || 0,
              p = n.p || 0,
              I = n.b || 0,
              g = n.l,
              y = n.d,
              m = n.m,
              N = n.n,
              C = 8 * i;
            do {
              if (!g) {
                d = h(e, p, 1);
                let l = h(e, p + 1, 3);
                if (((p += 3), !l)) {
                  let a = e[(F = S(p) + 4) - 4] | (e[F - 3] << 8),
                    l = F + a;
                  if (l > i) {
                    o && A(0);
                    break;
                  }
                  r && s(I + a),
                    t.set(e.subarray(F, l), I),
                    (n.b = I += a),
                    (n.p = p = 8 * l),
                    (n.f = d);
                  continue;
                }
                if (1 === l) (g = _), (y = O), (m = 9), (N = 5);
                else if (2 === l) {
                  let t = h(e, p, 31) + 257,
                    n = h(e, p + 10, 15) + 4,
                    i = t + h(e, p + 5, 31) + 1;
                  p += 14;
                  let r = new a(i),
                    o = new a(19);
                  for (var v = 0; v < n; ++v) o[u[v]] = h(e, p + 3 * v, 7);
                  p += 3 * n;
                  let l = b(o),
                    c = (1 << l) - 1,
                    s = T(o, l, 1);
                  for (v = 0; v < i; ) {
                    let t = s[h(e, p, c)];
                    if (((p += 15 & t), (F = t >>> 4) < 16)) r[v++] = F;
                    else {
                      var F,
                        P = 0;
                      let t = 0;
                      for (
                        16 === F
                          ? ((t = 3 + h(e, p, 3)), (p += 2), (P = r[v - 1]))
                          : 17 === F
                          ? ((t = 3 + h(e, p, 7)), (p += 3))
                          : 18 === F && ((t = 11 + h(e, p, 127)), (p += 7));
                        t--;

                      )
                        r[v++] = P;
                    }
                  }
                  let d = r.subarray(0, t);
                  var M = r.subarray(t);
                  (m = b(d)), (N = b(M)), (g = T(d, m, 1)), (y = T(M, N, 1));
                } else A(1);
                if (p > C) {
                  o && A(0);
                  break;
                }
              }
              r && s(I + 131072);
              let R = (1 << m) - 1,
                D = (1 << N) - 1,
                G = p;
              for (; ; G = p) {
                let n = (P = g[L(e, p) & R]) >>> 4;
                if ((p += 15 & P) > C) {
                  o && A(0);
                  break;
                }
                if ((P || A(2), n < 256)) t[I++] = n;
                else {
                  if (256 === n) {
                    (G = p), (g = null);
                    break;
                  }
                  {
                    let i = n - 254;
                    if (n > 264) {
                      var w = l[(v = n - 257)];
                      (i = h(e, p, (1 << w) - 1) + f[v]), (p += w);
                    }
                    let a = y[L(e, p) & D],
                      u = a >>> 4;
                    if (
                      (a || A(3),
                      (p += 15 & a),
                      (M = E[u]),
                      u > 3 &&
                        ((w = c[u]), (M += L(e, p) & ((1 << w) - 1)), (p += w)),
                      p > C)
                    ) {
                      o && A(0);
                      break;
                    }
                    r && s(I + 131072);
                    let d = I + i;
                    for (; I < d; I += 4)
                      (t[I] = t[I - M]),
                        (t[I + 1] = t[I + 1 - M]),
                        (t[I + 2] = t[I + 2 - M]),
                        (t[I + 3] = t[I + 3 - M]);
                    I = d;
                  }
                }
              }
              (n.l = g),
                (n.p = G),
                (n.b = I),
                (n.f = d),
                g && ((d = 1), (n.m = m), (n.d = y), (n.n = N));
            } while (!d);
            return I === t.length ? t : R(t, 0, I);
          },
          v = function (e, t) {
            let n = {};
            for (var i in e) n[i] = e[i];
            for (var i in t) n[i] = t[i];
            return n;
          },
          F = function (e, t, n) {
            let i = e(),
              a = e.toString(),
              r = a
                .slice(a.indexOf("[") + 1, a.lastIndexOf("]"))
                .replace(/\s+/g, "")
                .split(",");
            for (let e = 0; e < i.length; ++e) {
              let a = i[e],
                o = r[e];
              if ("function" == typeof a) {
                t += ";" + o + "=";
                let e = a.toString();
                if (a.prototype) {
                  if (-1 !== e.indexOf("[native code]")) {
                    let n = e.indexOf(" ", 8) + 1;
                    t += e.slice(n, e.indexOf("(", n));
                  } else
                    for (let n in ((t += e), a.prototype))
                      t +=
                        ";" +
                        o +
                        ".prototype." +
                        n +
                        "=" +
                        a.prototype[n].toString();
                } else t += e;
              } else n[o] = a;
            }
            return [t, n];
          },
          P = [],
          M = function (e) {
            let t = [];
            for (let n in e)
              e[n].buffer && t.push((e[n] = new e[n].constructor(e[n])).buffer);
            return t;
          },
          w = function (e, t, n, a) {
            let r;
            if (!P[n]) {
              let t = "",
                i = {},
                a = e.length - 1;
              for (let n = 0; n < a; ++n)
                (t = (r = F(e[n], t, i))[0]), (i = r[1]);
              P[n] = F(e[a], t, i);
            }
            let o = v({}, P[n][1]);
            return i(
              P[n][0] +
                ";onmessage=function(e){for(var kz in e.data)self[kz]=e.data[kz];onmessage=" +
                t.toString() +
                "}",
              n,
              o,
              M(o),
              a
            );
          },
          D = function () {
            return [
              a,
              r,
              o,
              l,
              c,
              u,
              f,
              E,
              _,
              O,
              I,
              N,
              T,
              b,
              h,
              L,
              S,
              R,
              A,
              C,
              B,
              G,
              V,
            ];
          };
        var G = function (e) {
            return postMessage(e, [e.buffer]);
          },
          V = function (e) {
            return e && e.size && new a(e.size);
          };
        let U = function (e, t, n, i, a, r) {
            var o = w(n, i, a, function (e, t) {
              o.terminate(), r(e, t);
            });
            return (
              o.postMessage([e, t], t.consume ? [e.buffer] : []),
              function () {
                o.terminate();
              }
            );
          },
          k = function (e, t) {
            return e[t] | (e[t + 1] << 8);
          },
          x = function (e, t) {
            return (
              (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>>
              0
            );
          };
        function B(e, t) {
          return C(e, t);
        }
        let X = "undefined" != typeof TextDecoder && new TextDecoder(),
          j = function (e) {
            for (let t = "", n = 0; ; ) {
              let i = e[n++],
                a = (i > 127) + (i > 223) + (i > 239);
              if (n + a > e.length) return [t, R(e, n - 1)];
              a
                ? 3 === a
                  ? (t += String.fromCharCode(
                      55296 |
                        ((i =
                          (((15 & i) << 18) |
                            ((63 & e[n++]) << 12) |
                            ((63 & e[n++]) << 6) |
                            (63 & e[n++])) -
                          65536) >>
                          10),
                      56320 | (1023 & i)
                    ))
                  : (t +=
                      1 & a
                        ? String.fromCharCode(((31 & i) << 6) | (63 & e[n++]))
                        : String.fromCharCode(
                            ((15 & i) << 12) |
                              ((63 & e[n++]) << 6) |
                              (63 & e[n++])
                          ))
                : (t += String.fromCharCode(i));
            }
          };
        function W(e, t) {
          if (t) {
            let t = "";
            for (let n = 0; n < e.length; n += 16384)
              t += String.fromCharCode.apply(null, e.subarray(n, n + 16384));
            return t;
          }
          if (X) return X.decode(e);
          {
            let t = j(e),
              n = t[0];
            return t[1].length && A(8), n;
          }
        }
        let Q = function (e, t, n) {
            let i = k(e, t + 28),
              a = W(e.subarray(t + 46, t + 46 + i), !(2048 & k(e, t + 8))),
              r = t + 46 + i,
              o = x(e, t + 20),
              l =
                n && 0xffffffff === o
                  ? z64e(e, r)
                  : [o, x(e, t + 24), x(e, t + 42)],
              c = l[0],
              u = l[1],
              s = l[2];
            return [k(e, t + 10), c, u, a, r + k(e, t + 30) + k(e, t + 32), s];
          },
          Y =
            "function" == typeof queueMicrotask
              ? queueMicrotask
              : "function" == typeof setTimeout
              ? setTimeout
              : function (e) {
                  e();
                };
        function H(e, t, n) {
          n || ((n = t), (t = {})), "function" != typeof n && A(7);
          let i = [],
            r = function () {
              for (let e = 0; e < i.length; ++e) i[e]();
            },
            o = {},
            l = function (e, t) {
              Y(function () {
                n(e, t);
              });
            };
          Y(function () {
            l = n;
          });
          let c = e.length - 22;
          for (; 0x6054b50 !== x(e, c); --c)
            if (!c || e.length - c > 65558) return l(A(13, 0, 1), null), r;
          let u = k(e, c + 8);
          if (u) {
            let n = u,
              s = x(e, c + 16),
              d = 0xffffffff === s || 65535 === n;
            if (d) {
              let t = x(e, c - 12);
              (d = 0x6064b50 === x(e, t)) &&
                ((n = u = x(e, t + 32)), (s = x(e, t + 48)));
            }
            let f = t && t.filter;
            for (let t = 0; t < n; ++t)
              !(function () {
                var t, n, c, p, E, I, g;
                let T = Q(e, s, d),
                  y = T[0],
                  m = T[1],
                  _ = T[2],
                  O = T[3],
                  b = T[4],
                  h = T[5],
                  L = ((t = e), (n = h) + 30 + k(t, n + 26) + k(t, n + 28));
                s = b;
                let S = function (e, t) {
                  e ? (r(), l(e, null)) : (t && (o[O] = t), --u || l(null, o));
                };
                if (
                  !f ||
                  f({ name: O, size: m, originalSize: _, compression: y })
                ) {
                  if (y) {
                    if (8 === y) {
                      let t = e.subarray(L, L + m);
                      if (m < 32e4)
                        try {
                          S(null, ((c = t), (p = new a(_)), C(c, p)));
                        } catch (e) {
                          S(e, null);
                        }
                      else {
                        i.push(
                          ((E = t),
                          (I = { size: _ }),
                          (g = S) || ((g = I), (I = {})),
                          "function" != typeof g && A(7),
                          U(
                            E,
                            I,
                            [D],
                            function (e) {
                              return G(
                                (function (e, t) {
                                  return C(e, t);
                                })(e.data[0], V(e.data[1]))
                              );
                            },
                            1,
                            g
                          ))
                        );
                      }
                    } else S(A(14, "unknown compression type " + y, 1), null);
                  } else S(null, R(e, L, L + m));
                } else S(null, null);
              })(t);
          } else l(null, {});
          return r;
        }
      },
      7933: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          fetchLottie: function () {
            return u;
          },
          unZipDotLottie: function () {
            return c;
          },
        });
        let i = n(3487);
        async function a(e) {
          return await fetch(new URL(e, window?.location?.href).href).then(
            (e) => e.arrayBuffer()
          );
        }
        async function r(e) {
          return (
            await new Promise((t) => {
              let n = new FileReader();
              n.readAsDataURL(new Blob([e])), (n.onload = () => t(n.result));
            })
          ).split(",", 2)[1];
        }
        async function o(e) {
          let t = new Uint8Array(e),
            n = await new Promise((e, n) => {
              (0, i.unzip)(t, (t, i) => (t ? n(t) : e(i)));
            });
          return {
            read: (e) => (0, i.strFromU8)(n[e]),
            readB64: async (e) => await r(n[e]),
          };
        }
        async function l(e, t) {
          if (!("assets" in e)) return e;
          async function n(e) {
            let { p: n } = e;
            if (null == n || null == t.read(`images/${n}`)) return e;
            let i = n.split(".").pop(),
              a = await t.readB64(`images/${n}`);
            if (i?.startsWith("data:")) return (e.p = i), (e.e = 1), e;
            switch (i) {
              case "svg":
              case "svg+xml":
                e.p = `data:image/svg+xml;base64,${a}`;
                break;
              case "png":
              case "jpg":
              case "jpeg":
              case "gif":
              case "webp":
                e.p = `data:image/${i};base64,${a}`;
                break;
              default:
                e.p = `data:;base64,${a}`;
            }
            return (e.e = 1), e;
          }
          return (
            (await Promise.all(e.assets.map(n))).map((t, n) => {
              e.assets[n] = t;
            }),
            e
          );
        }
        async function c(e) {
          let t = await o(e),
            n = (function (e) {
              let t = JSON.parse(e);
              if (!("animations" in t)) throw Error("Manifest not found");
              if (0 === t.animations.length)
                throw Error("No animations listed in the manifest");
              return t;
            })(t.read("manifest.json"));
          return (
            await Promise.all(
              n.animations.map((e) =>
                l(JSON.parse(t.read(`animations/${e.id}.json`)), t)
              )
            )
          )[0];
        }
        async function u(e) {
          let t = await a(e);
          return (function (e) {
            let t = new Uint8Array(e, 0, 32);
            return 80 === t[0] && 75 === t[1] && 3 === t[2] && 4 === t[3];
          })(t)
            ? await c(t)
            : JSON.parse(new TextDecoder().decode(t));
        }
      },
      3946: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          actionListPlaybackChanged: function () {
            return j;
          },
          animationFrameChanged: function () {
            return V;
          },
          clearRequested: function () {
            return M;
          },
          elementStateChanged: function () {
            return X;
          },
          eventListenerAdded: function () {
            return w;
          },
          eventStateChanged: function () {
            return G;
          },
          instanceAdded: function () {
            return k;
          },
          instanceRemoved: function () {
            return B;
          },
          instanceStarted: function () {
            return x;
          },
          mediaQueriesDefined: function () {
            return Q;
          },
          parameterChanged: function () {
            return U;
          },
          playbackRequested: function () {
            return F;
          },
          previewRequested: function () {
            return v;
          },
          rawDataImported: function () {
            return R;
          },
          sessionInitialized: function () {
            return N;
          },
          sessionStarted: function () {
            return A;
          },
          sessionStopped: function () {
            return C;
          },
          stopRequested: function () {
            return P;
          },
          testFrameRendered: function () {
            return D;
          },
          viewportWidthChanged: function () {
            return W;
          },
        });
        let i = n(7087),
          a = n(9468),
          {
            IX2_RAW_DATA_IMPORTED: r,
            IX2_SESSION_INITIALIZED: o,
            IX2_SESSION_STARTED: l,
            IX2_SESSION_STOPPED: c,
            IX2_PREVIEW_REQUESTED: u,
            IX2_PLAYBACK_REQUESTED: s,
            IX2_STOP_REQUESTED: d,
            IX2_CLEAR_REQUESTED: f,
            IX2_EVENT_LISTENER_ADDED: p,
            IX2_TEST_FRAME_RENDERED: E,
            IX2_EVENT_STATE_CHANGED: I,
            IX2_ANIMATION_FRAME_CHANGED: g,
            IX2_PARAMETER_CHANGED: T,
            IX2_INSTANCE_ADDED: y,
            IX2_INSTANCE_STARTED: m,
            IX2_INSTANCE_REMOVED: _,
            IX2_ELEMENT_STATE_CHANGED: O,
            IX2_ACTION_LIST_PLAYBACK_CHANGED: b,
            IX2_VIEWPORT_WIDTH_CHANGED: h,
            IX2_MEDIA_QUERIES_DEFINED: L,
          } = i.IX2EngineActionTypes,
          { reifyState: S } = a.IX2VanillaUtils,
          R = (e) => ({ type: r, payload: { ...S(e) } }),
          N = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
            type: o,
            payload: { hasBoundaryNodes: e, reducedMotion: t },
          }),
          A = () => ({ type: l }),
          C = () => ({ type: c }),
          v = ({ rawData: e, defer: t }) => ({
            type: u,
            payload: { defer: t, rawData: e },
          }),
          F = ({
            actionTypeId: e = i.ActionTypeConsts.GENERAL_START_ACTION,
            actionListId: t,
            actionItemId: n,
            eventId: a,
            allowEvents: r,
            immediate: o,
            testManual: l,
            verbose: c,
            rawData: u,
          }) => ({
            type: s,
            payload: {
              actionTypeId: e,
              actionListId: t,
              actionItemId: n,
              testManual: l,
              eventId: a,
              allowEvents: r,
              immediate: o,
              verbose: c,
              rawData: u,
            },
          }),
          P = (e) => ({ type: d, payload: { actionListId: e } }),
          M = () => ({ type: f }),
          w = (e, t) => ({
            type: p,
            payload: { target: e, listenerParams: t },
          }),
          D = (e = 1) => ({ type: E, payload: { step: e } }),
          G = (e, t) => ({ type: I, payload: { stateKey: e, newState: t } }),
          V = (e, t) => ({ type: g, payload: { now: e, parameters: t } }),
          U = (e, t) => ({ type: T, payload: { key: e, value: t } }),
          k = (e) => ({ type: y, payload: { ...e } }),
          x = (e, t) => ({ type: m, payload: { instanceId: e, time: t } }),
          B = (e) => ({ type: _, payload: { instanceId: e } }),
          X = (e, t, n, i) => ({
            type: O,
            payload: {
              elementId: e,
              actionTypeId: t,
              current: n,
              actionItem: i,
            },
          }),
          j = ({ actionListId: e, isPlaying: t }) => ({
            type: b,
            payload: { actionListId: e, isPlaying: t },
          }),
          W = ({ width: e, mediaQueries: t }) => ({
            type: h,
            payload: { width: e, mediaQueries: t },
          }),
          Q = () => ({ type: L });
      },
      6011: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          actions: function () {
            return o;
          },
          destroy: function () {
            return d;
          },
          init: function () {
            return s;
          },
          setEnv: function () {
            return u;
          },
          store: function () {
            return c;
          },
        });
        let i = n(9516),
          a = (function (e) {
            return e && e.__esModule ? e : { default: e };
          })(n(7243)),
          r = n(1970),
          o = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = l(t);
            if (n && n.has(e)) return n.get(e);
            var i = { __proto__: null },
              a = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var r in e)
              if (
                "default" !== r &&
                Object.prototype.hasOwnProperty.call(e, r)
              ) {
                var o = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                o && (o.get || o.set)
                  ? Object.defineProperty(i, r, o)
                  : (i[r] = e[r]);
              }
            return (i.default = e), n && n.set(e, i), i;
          })(n(3946));
        function l(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (l = function (e) {
            return e ? n : t;
          })(e);
        }
        let c = (0, i.createStore)(a.default);
        function u(e) {
          e() && (0, r.observeRequests)(c);
        }
        function s(e) {
          d(), (0, r.startEngine)({ store: c, rawData: e, allowEvents: !0 });
        }
        function d() {
          (0, r.stopEngine)(c);
        }
      },
      5012: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          elementContains: function () {
            return T;
          },
          getChildElements: function () {
            return m;
          },
          getClosestElement: function () {
            return O;
          },
          getProperty: function () {
            return f;
          },
          getQuerySelector: function () {
            return E;
          },
          getRefType: function () {
            return b;
          },
          getSiblingElements: function () {
            return _;
          },
          getStyle: function () {
            return d;
          },
          getValidDocument: function () {
            return I;
          },
          isSiblingNode: function () {
            return y;
          },
          matchSelector: function () {
            return p;
          },
          queryDocument: function () {
            return g;
          },
          setStyle: function () {
            return s;
          },
        });
        let i = n(9468),
          a = n(7087),
          { ELEMENT_MATCHES: r } = i.IX2BrowserSupport,
          {
            IX2_ID_DELIMITER: o,
            HTML_ELEMENT: l,
            PLAIN_OBJECT: c,
            WF_PAGE: u,
          } = a.IX2EngineConstants;
        function s(e, t, n) {
          e.style[t] = n;
        }
        function d(e, t) {
          return t.startsWith("--")
            ? window
                .getComputedStyle(document.documentElement)
                .getPropertyValue(t)
            : e.style instanceof CSSStyleDeclaration
            ? e.style[t]
            : void 0;
        }
        function f(e, t) {
          return e[t];
        }
        function p(e) {
          return (t) => t[r](e);
        }
        function E({ id: e, selector: t }) {
          if (e) {
            let t = e;
            if (-1 !== e.indexOf(o)) {
              let n = e.split(o),
                i = n[0];
              if (((t = n[1]), i !== document.documentElement.getAttribute(u)))
                return null;
            }
            return `[data-w-id="${t}"], [data-w-id^="${t}_instance"]`;
          }
          return t;
        }
        function I(e) {
          return null == e || e === document.documentElement.getAttribute(u)
            ? document
            : null;
        }
        function g(e, t) {
          return Array.prototype.slice.call(
            document.querySelectorAll(t ? e + " " + t : e)
          );
        }
        function T(e, t) {
          return e.contains(t);
        }
        function y(e, t) {
          return e !== t && e.parentNode === t.parentNode;
        }
        function m(e) {
          let t = [];
          for (let n = 0, { length: i } = e || []; n < i; n++) {
            let { children: i } = e[n],
              { length: a } = i;
            if (!!a) for (let e = 0; e < a; e++) t.push(i[e]);
          }
          return t;
        }
        function _(e = []) {
          let t = [],
            n = [];
          for (let i = 0, { length: a } = e; i < a; i++) {
            let { parentNode: a } = e[i];
            if (!a || !a.children || !a.children.length || -1 !== n.indexOf(a))
              continue;
            n.push(a);
            let r = a.firstElementChild;
            for (; null != r; )
              -1 === e.indexOf(r) && t.push(r), (r = r.nextElementSibling);
          }
          return t;
        }
        let O = Element.prototype.closest
          ? (e, t) =>
              document.documentElement.contains(e) ? e.closest(t) : null
          : (e, t) => {
              if (!document.documentElement.contains(e)) return null;
              let n = e;
              do {
                if (n[r] && n[r](t)) return n;
                n = n.parentNode;
              } while (null != n);
              return null;
            };
        function b(e) {
          return null != e && "object" == typeof e
            ? e instanceof Element
              ? l
              : c
            : null;
        }
      },
      1970: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          observeRequests: function () {
            return K;
          },
          startActionGroup: function () {
            return ep;
          },
          startEngine: function () {
            return en;
          },
          stopActionGroup: function () {
            return ef;
          },
          stopAllActionGroups: function () {
            return ed;
          },
          stopEngine: function () {
            return ei;
          },
        });
        let i = g(n(9777)),
          a = g(n(4738)),
          r = g(n(4659)),
          o = g(n(3452)),
          l = g(n(6633)),
          c = g(n(3729)),
          u = g(n(2397)),
          s = g(n(5082)),
          d = n(7087),
          f = n(9468),
          p = n(3946),
          E = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = T(t);
            if (n && n.has(e)) return n.get(e);
            var i = { __proto__: null },
              a = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var r in e)
              if (
                "default" !== r &&
                Object.prototype.hasOwnProperty.call(e, r)
              ) {
                var o = a ? Object.getOwnPropertyDescriptor(e, r) : null;
                o && (o.get || o.set)
                  ? Object.defineProperty(i, r, o)
                  : (i[r] = e[r]);
              }
            return (i.default = e), n && n.set(e, i), i;
          })(n(5012)),
          I = g(n(8955));
        function g(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function T(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (T = function (e) {
            return e ? n : t;
          })(e);
        }
        let y = Object.keys(d.QuickEffectIds),
          m = (e) => y.includes(e),
          {
            COLON_DELIMITER: _,
            BOUNDARY_SELECTOR: O,
            HTML_ELEMENT: b,
            RENDER_GENERAL: h,
            W_MOD_IX: L,
          } = d.IX2EngineConstants,
          {
            getAffectedElements: S,
            getElementId: R,
            getDestinationValues: N,
            observeStore: A,
            getInstanceId: C,
            renderHTMLElement: v,
            clearAllStyles: F,
            getMaxDurationItemIndex: P,
            getComputedStyle: M,
            getInstanceOrigin: w,
            reduceListToGroup: D,
            shouldNamespaceEventParameter: G,
            getNamespacedParameterId: V,
            shouldAllowMediaQuery: U,
            cleanupHTMLElement: k,
            clearObjectCache: x,
            stringifyTarget: B,
            mediaQueriesEqual: X,
            shallowEqual: j,
          } = f.IX2VanillaUtils,
          {
            isPluginType: W,
            createPluginInstance: Q,
            getPluginDuration: Y,
          } = f.IX2VanillaPlugins,
          H = navigator.userAgent,
          z = H.match(/iPad/i) || H.match(/iPhone/);
        function K(e) {
          A({ store: e, select: ({ ixRequest: e }) => e.preview, onChange: q }),
            A({
              store: e,
              select: ({ ixRequest: e }) => e.playback,
              onChange: J,
            }),
            A({ store: e, select: ({ ixRequest: e }) => e.stop, onChange: ee }),
            A({
              store: e,
              select: ({ ixRequest: e }) => e.clear,
              onChange: et,
            });
        }
        function q({ rawData: e, defer: t }, n) {
          let i = () => {
            en({ store: n, rawData: e, allowEvents: !0 }), Z();
          };
          t ? setTimeout(i, 0) : i();
        }
        function Z() {
          document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
        }
        function J(e, t) {
          let {
              actionTypeId: n,
              actionListId: i,
              actionItemId: a,
              eventId: r,
              allowEvents: o,
              immediate: l,
              testManual: c,
              verbose: u = !0,
            } = e,
            { rawData: s } = e;
          if (i && a && s && l) {
            let e = s.actionLists[i];
            e && (s = D({ actionList: e, actionItemId: a, rawData: s }));
          }
          if (
            (en({ store: t, rawData: s, allowEvents: o, testManual: c }),
            (i && n === d.ActionTypeConsts.GENERAL_START_ACTION) || m(n))
          ) {
            ef({ store: t, actionListId: i }),
              es({ store: t, actionListId: i, eventId: r });
            let e = ep({
              store: t,
              eventId: r,
              actionListId: i,
              immediate: l,
              verbose: u,
            });
            u &&
              e &&
              t.dispatch(
                (0, p.actionListPlaybackChanged)({
                  actionListId: i,
                  isPlaying: !l,
                })
              );
          }
        }
        function ee({ actionListId: e }, t) {
          e ? ef({ store: t, actionListId: e }) : ed({ store: t }), ei(t);
        }
        function et(e, t) {
          ei(t), F({ store: t, elementApi: E });
        }
        function en({ store: e, rawData: t, allowEvents: n, testManual: o }) {
          let { ixSession: l } = e.getState();
          if ((t && e.dispatch((0, p.rawDataImported)(t)), !l.active)) {
            if (
              (e.dispatch(
                (0, p.sessionInitialized)({
                  hasBoundaryNodes: !!document.querySelector(O),
                  reducedMotion:
                    document.body.hasAttribute("data-wf-ix-vacation") &&
                    window.matchMedia("(prefers-reduced-motion)").matches,
                })
              ),
              n &&
                ((function (e) {
                  let { ixData: t } = e.getState(),
                    { eventTypeMap: n } = t;
                  eo(e),
                    (0, u.default)(n, (t, n) => {
                      let o = I.default[n];
                      if (!o) {
                        console.warn(`IX2 event type not configured: ${n}`);
                        return;
                      }
                      (function ({ logic: e, store: t, events: n }) {
                        (function (e) {
                          if (!z) return;
                          let t = {},
                            n = "";
                          for (let i in e) {
                            let { eventTypeId: a, target: r } = e[i],
                              o = E.getQuerySelector(r);
                            if (!t[o])
                              (a === d.EventTypeConsts.MOUSE_CLICK ||
                                a === d.EventTypeConsts.MOUSE_SECOND_CLICK) &&
                                ((t[o] = !0),
                                (n +=
                                  o +
                                  "{cursor: pointer;touch-action: manipulation;}"));
                          }
                          if (n) {
                            let e = document.createElement("style");
                            (e.textContent = n), document.body.appendChild(e);
                          }
                        })(n);
                        let { types: o, handler: l } = e,
                          { ixData: c } = t.getState(),
                          { actionLists: f } = c,
                          I = el(n, eu);
                        if (!(0, r.default)(I)) return;
                        (0, u.default)(I, (e, r) => {
                          let o = n[r],
                            {
                              action: l,
                              id: u,
                              mediaQueries: s = c.mediaQueryKeys,
                            } = o,
                            { actionListId: I } = l.config;
                          !X(s, c.mediaQueryKeys) &&
                            t.dispatch((0, p.mediaQueriesDefined)()),
                            l.actionTypeId ===
                              d.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
                              (Array.isArray(o.config)
                                ? o.config
                                : [o.config]
                              ).forEach((n) => {
                                let { continuousParameterGroupId: r } = n,
                                  o = (0, a.default)(
                                    f,
                                    `${I}.continuousParameterGroups`,
                                    []
                                  ),
                                  l = (0, i.default)(o, ({ id: e }) => e === r),
                                  c = (n.smoothing || 0) / 100,
                                  s = (n.restingState || 0) / 100;
                                if (!!l)
                                  e.forEach((e, i) => {
                                    !(function ({
                                      store: e,
                                      eventStateKey: t,
                                      eventTarget: n,
                                      eventId: i,
                                      eventConfig: r,
                                      actionListId: o,
                                      parameterGroup: l,
                                      smoothing: c,
                                      restingValue: u,
                                    }) {
                                      let { ixData: s, ixSession: f } =
                                          e.getState(),
                                        { events: p } = s,
                                        I = p[i],
                                        { eventTypeId: g } = I,
                                        T = {},
                                        y = {},
                                        m = [],
                                        { continuousActionGroups: b } = l,
                                        { id: h } = l;
                                      G(g, r) && (h = V(t, h));
                                      let L =
                                        f.hasBoundaryNodes && n
                                          ? E.getClosestElement(n, O)
                                          : null;
                                      b.forEach((e) => {
                                        let { keyframe: t, actionItems: i } = e;
                                        i.forEach((e) => {
                                          let { actionTypeId: i } = e,
                                            { target: a } = e.config;
                                          if (!a) return;
                                          let r = a.boundaryMode ? L : null,
                                            o = B(a) + _ + i;
                                          if (
                                            ((y[o] = (function (e = [], t, n) {
                                              let i;
                                              let a = [...e];
                                              return (
                                                a.some(
                                                  (e, n) =>
                                                    e.keyframe === t &&
                                                    ((i = n), !0)
                                                ),
                                                null == i &&
                                                  ((i = a.length),
                                                  a.push({
                                                    keyframe: t,
                                                    actionItems: [],
                                                  })),
                                                a[i].actionItems.push(n),
                                                a
                                              );
                                            })(y[o], t, e)),
                                            !T[o])
                                          ) {
                                            T[o] = !0;
                                            let { config: t } = e;
                                            S({
                                              config: t,
                                              event: I,
                                              eventTarget: n,
                                              elementRoot: r,
                                              elementApi: E,
                                            }).forEach((e) => {
                                              m.push({ element: e, key: o });
                                            });
                                          }
                                        });
                                      }),
                                        m.forEach(({ element: t, key: n }) => {
                                          let r = y[n],
                                            l = (0, a.default)(
                                              r,
                                              "[0].actionItems[0]",
                                              {}
                                            ),
                                            { actionTypeId: s } = l,
                                            f = (
                                              s ===
                                              d.ActionTypeConsts.PLUGIN_RIVE
                                                ? 0 ===
                                                  (
                                                    l.config?.target
                                                      ?.selectorGuids || []
                                                  ).length
                                                : W(s)
                                            )
                                              ? Q(s)?.(t, l)
                                              : null,
                                            p = N(
                                              {
                                                element: t,
                                                actionItem: l,
                                                elementApi: E,
                                              },
                                              f
                                            );
                                          eE({
                                            store: e,
                                            element: t,
                                            eventId: i,
                                            actionListId: o,
                                            actionItem: l,
                                            destination: p,
                                            continuous: !0,
                                            parameterId: h,
                                            actionGroups: r,
                                            smoothing: c,
                                            restingValue: u,
                                            pluginInstance: f,
                                          });
                                        });
                                    })({
                                      store: t,
                                      eventStateKey: u + _ + i,
                                      eventTarget: e,
                                      eventId: u,
                                      eventConfig: n,
                                      actionListId: I,
                                      parameterGroup: l,
                                      smoothing: c,
                                      restingValue: s,
                                    });
                                  });
                              }),
                            (l.actionTypeId ===
                              d.ActionTypeConsts.GENERAL_START_ACTION ||
                              m(l.actionTypeId)) &&
                              es({ store: t, actionListId: I, eventId: u });
                        });
                        let g = (e) => {
                            let { ixSession: i } = t.getState();
                            ec(I, (a, r, o) => {
                              let u = n[r],
                                s = i.eventState[o],
                                {
                                  action: f,
                                  mediaQueries: E = c.mediaQueryKeys,
                                } = u;
                              if (!U(E, i.mediaQueryKey)) return;
                              let I = (n = {}) => {
                                let i = l(
                                  {
                                    store: t,
                                    element: a,
                                    event: u,
                                    eventConfig: n,
                                    nativeEvent: e,
                                    eventStateKey: o,
                                  },
                                  s
                                );
                                !j(i, s) &&
                                  t.dispatch((0, p.eventStateChanged)(o, i));
                              };
                              f.actionTypeId ===
                              d.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
                                ? (Array.isArray(u.config)
                                    ? u.config
                                    : [u.config]
                                  ).forEach(I)
                                : I();
                            });
                          },
                          T = (0, s.default)(g, 12),
                          y = ({
                            target: e = document,
                            types: n,
                            throttle: i,
                          }) => {
                            n.split(" ")
                              .filter(Boolean)
                              .forEach((n) => {
                                let a = i ? T : g;
                                e.addEventListener(n, a),
                                  t.dispatch(
                                    (0, p.eventListenerAdded)(e, [n, a])
                                  );
                              });
                          };
                        Array.isArray(o)
                          ? o.forEach(y)
                          : "string" == typeof o && y(e);
                      })({ logic: o, store: e, events: t });
                    });
                  let { ixSession: o } = e.getState();
                  o.eventListeners.length &&
                    (function (e) {
                      let t = () => {
                        eo(e);
                      };
                      er.forEach((n) => {
                        window.addEventListener(n, t),
                          e.dispatch((0, p.eventListenerAdded)(window, [n, t]));
                      }),
                        t();
                    })(e);
                })(e),
                (function () {
                  let { documentElement: e } = document;
                  -1 === e.className.indexOf(L) && (e.className += ` ${L}`);
                })(),
                e.getState().ixSession.hasDefinedMediaQueries))
            ) {
              var c;
              A({
                store: (c = e),
                select: ({ ixSession: e }) => e.mediaQueryKey,
                onChange: () => {
                  ei(c),
                    F({ store: c, elementApi: E }),
                    en({ store: c, allowEvents: !0 }),
                    Z();
                },
              });
            }
            e.dispatch((0, p.sessionStarted)()),
              (function (e, t) {
                let n = (i) => {
                  let { ixSession: a, ixParameters: r } = e.getState();
                  a.active &&
                    (e.dispatch((0, p.animationFrameChanged)(i, r)),
                    t
                      ? !(function (e, t) {
                          let n = A({
                            store: e,
                            select: ({ ixSession: e }) => e.tick,
                            onChange: (e) => {
                              t(e), n();
                            },
                          });
                        })(e, n)
                      : requestAnimationFrame(n));
                };
                n(window.performance.now());
              })(e, o);
          }
        }
        function ei(e) {
          let { ixSession: t } = e.getState();
          if (t.active) {
            let { eventListeners: n } = t;
            n.forEach(ea), x(), e.dispatch((0, p.sessionStopped)());
          }
        }
        function ea({ target: e, listenerParams: t }) {
          e.removeEventListener.apply(e, t);
        }
        let er = ["resize", "orientationchange"];
        function eo(e) {
          let { ixSession: t, ixData: n } = e.getState(),
            i = window.innerWidth;
          if (i !== t.viewportWidth) {
            let { mediaQueries: t } = n;
            e.dispatch(
              (0, p.viewportWidthChanged)({ width: i, mediaQueries: t })
            );
          }
        }
        let el = (e, t) => (0, o.default)((0, c.default)(e, t), l.default),
          ec = (e, t) => {
            (0, u.default)(e, (e, n) => {
              e.forEach((e, i) => {
                t(e, n, n + _ + i);
              });
            });
          },
          eu = (e) =>
            S({
              config: { target: e.target, targets: e.targets },
              elementApi: E,
            });
        function es({ store: e, actionListId: t, eventId: n }) {
          let { ixData: i, ixSession: r } = e.getState(),
            { actionLists: o, events: l } = i,
            c = l[n],
            u = o[t];
          if (u && u.useFirstGroupAsInitialState) {
            let o = (0, a.default)(u, "actionItemGroups[0].actionItems", []);
            if (
              !U(
                (0, a.default)(c, "mediaQueries", i.mediaQueryKeys),
                r.mediaQueryKey
              )
            )
              return;
            o.forEach((i) => {
              let { config: a, actionTypeId: r } = i,
                o = S({
                  config:
                    a?.target?.useEventTarget === !0 &&
                    a?.target?.objectId == null
                      ? { target: c.target, targets: c.targets }
                      : a,
                  event: c,
                  elementApi: E,
                }),
                l = W(r);
              o.forEach((a) => {
                let o = l ? Q(r)?.(a, i) : null;
                eE({
                  destination: N(
                    { element: a, actionItem: i, elementApi: E },
                    o
                  ),
                  immediate: !0,
                  store: e,
                  element: a,
                  eventId: n,
                  actionItem: i,
                  actionListId: t,
                  pluginInstance: o,
                });
              });
            });
          }
        }
        function ed({ store: e }) {
          let { ixInstances: t } = e.getState();
          (0, u.default)(t, (t) => {
            if (!t.continuous) {
              let { actionListId: n, verbose: i } = t;
              eI(t, e),
                i &&
                  e.dispatch(
                    (0, p.actionListPlaybackChanged)({
                      actionListId: n,
                      isPlaying: !1,
                    })
                  );
            }
          });
        }
        function ef({
          store: e,
          eventId: t,
          eventTarget: n,
          eventStateKey: i,
          actionListId: r,
        }) {
          let { ixInstances: o, ixSession: l } = e.getState(),
            c = l.hasBoundaryNodes && n ? E.getClosestElement(n, O) : null;
          (0, u.default)(o, (n) => {
            let o = (0, a.default)(n, "actionItem.config.target.boundaryMode"),
              l = !i || n.eventStateKey === i;
            if (n.actionListId === r && n.eventId === t && l) {
              if (c && o && !E.elementContains(c, n.element)) return;
              eI(n, e),
                n.verbose &&
                  e.dispatch(
                    (0, p.actionListPlaybackChanged)({
                      actionListId: r,
                      isPlaying: !1,
                    })
                  );
            }
          });
        }
        function ep({
          store: e,
          eventId: t,
          eventTarget: n,
          eventStateKey: i,
          actionListId: r,
          groupIndex: o = 0,
          immediate: l,
          verbose: c,
        }) {
          let { ixData: u, ixSession: s } = e.getState(),
            { events: d } = u,
            f = d[t] || {},
            { mediaQueries: p = u.mediaQueryKeys } = f,
            { actionItemGroups: I, useFirstGroupAsInitialState: g } = (0,
            a.default)(u, `actionLists.${r}`, {});
          if (!I || !I.length) return !1;
          o >= I.length && (0, a.default)(f, "config.loop") && (o = 0),
            0 === o && g && o++;
          let T =
              (0 === o || (1 === o && g)) && m(f.action?.actionTypeId)
                ? f.config.delay
                : void 0,
            y = (0, a.default)(I, [o, "actionItems"], []);
          if (!y.length || !U(p, s.mediaQueryKey)) return !1;
          let _ = s.hasBoundaryNodes && n ? E.getClosestElement(n, O) : null,
            b = P(y),
            h = !1;
          return (
            y.forEach((a, u) => {
              let { config: s, actionTypeId: d } = a,
                p = W(d),
                { target: I } = s;
              if (!!I)
                S({
                  config: s,
                  event: f,
                  eventTarget: n,
                  elementRoot: I.boundaryMode ? _ : null,
                  elementApi: E,
                }).forEach((s, f) => {
                  let I = p ? Q(d)?.(s, a) : null,
                    g = p ? Y(d)(s, a) : null;
                  h = !0;
                  let y = M({ element: s, actionItem: a }),
                    m = N({ element: s, actionItem: a, elementApi: E }, I);
                  eE({
                    store: e,
                    element: s,
                    actionItem: a,
                    eventId: t,
                    eventTarget: n,
                    eventStateKey: i,
                    actionListId: r,
                    groupIndex: o,
                    isCarrier: b === u && 0 === f,
                    computedStyle: y,
                    destination: m,
                    immediate: l,
                    verbose: c,
                    pluginInstance: I,
                    pluginDuration: g,
                    instanceDelay: T,
                  });
                });
            }),
            h
          );
        }
        function eE(e) {
          let t;
          let { store: n, computedStyle: i, ...a } = e,
            {
              element: r,
              actionItem: o,
              immediate: l,
              pluginInstance: c,
              continuous: u,
              restingValue: s,
              eventId: f,
            } = a,
            I = C(),
            { ixElements: g, ixSession: T, ixData: y } = n.getState(),
            m = R(g, r),
            { refState: _ } = g[m] || {},
            O = E.getRefType(r),
            b = T.reducedMotion && d.ReducedMotionTypes[o.actionTypeId];
          if (b && u)
            switch (y.events[f]?.eventTypeId) {
              case d.EventTypeConsts.MOUSE_MOVE:
              case d.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
                t = s;
                break;
              default:
                t = 0.5;
            }
          let h = w(r, _, i, o, E, c);
          if (
            (n.dispatch(
              (0, p.instanceAdded)({
                instanceId: I,
                elementId: m,
                origin: h,
                refType: O,
                skipMotion: b,
                skipToValue: t,
                ...a,
              })
            ),
            eg(document.body, "ix2-animation-started", I),
            l)
          ) {
            (function (e, t) {
              let { ixParameters: n } = e.getState();
              e.dispatch((0, p.instanceStarted)(t, 0)),
                e.dispatch((0, p.animationFrameChanged)(performance.now(), n));
              let { ixInstances: i } = e.getState();
              eT(i[t], e);
            })(n, I);
            return;
          }
          A({ store: n, select: ({ ixInstances: e }) => e[I], onChange: eT }),
            !u && n.dispatch((0, p.instanceStarted)(I, T.tick));
        }
        function eI(e, t) {
          eg(document.body, "ix2-animation-stopping", {
            instanceId: e.id,
            state: t.getState(),
          });
          let { elementId: n, actionItem: i } = e,
            { ixElements: a } = t.getState(),
            { ref: r, refType: o } = a[n] || {};
          o === b && k(r, i, E), t.dispatch((0, p.instanceRemoved)(e.id));
        }
        function eg(e, t, n) {
          let i = document.createEvent("CustomEvent");
          i.initCustomEvent(t, !0, !0, n), e.dispatchEvent(i);
        }
        function eT(e, t) {
          let {
              active: n,
              continuous: i,
              complete: a,
              elementId: r,
              actionItem: o,
              actionTypeId: l,
              renderType: c,
              current: u,
              groupIndex: s,
              eventId: d,
              eventTarget: f,
              eventStateKey: I,
              actionListId: g,
              isCarrier: T,
              styleProp: y,
              verbose: m,
              pluginInstance: _,
            } = e,
            { ixData: O, ixSession: L } = t.getState(),
            { events: S } = O,
            { mediaQueries: R = O.mediaQueryKeys } = S && S[d] ? S[d] : {};
          if (!!U(R, L.mediaQueryKey)) {
            if (i || n || a) {
              if (u || (c === h && a)) {
                t.dispatch((0, p.elementStateChanged)(r, l, u, o));
                let { ixElements: e } = t.getState(),
                  { ref: n, refType: i, refState: a } = e[r] || {},
                  s = a && a[l];
                (i === b || W(l)) && v(n, a, s, d, o, y, E, c, _);
              }
              if (a) {
                if (T) {
                  let e = ep({
                    store: t,
                    eventId: d,
                    eventTarget: f,
                    eventStateKey: I,
                    actionListId: g,
                    groupIndex: s + 1,
                    verbose: m,
                  });
                  m &&
                    !e &&
                    t.dispatch(
                      (0, p.actionListPlaybackChanged)({
                        actionListId: g,
                        isPlaying: !1,
                      })
                    );
                }
                eI(e, t);
              }
            }
          }
        }
      },
      8955: function (e, t, n) {
        "use strict";
        let i, a, r;
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "default", {
            enumerable: !0,
            get: function () {
              return eg;
            },
          });
        let o = p(n(5801)),
          l = p(n(4738)),
          c = p(n(3789)),
          u = n(7087),
          s = n(1970),
          d = n(3946),
          f = n(9468);
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let {
            MOUSE_CLICK: E,
            MOUSE_SECOND_CLICK: I,
            MOUSE_DOWN: g,
            MOUSE_UP: T,
            MOUSE_OVER: y,
            MOUSE_OUT: m,
            DROPDOWN_CLOSE: _,
            DROPDOWN_OPEN: O,
            SLIDER_ACTIVE: b,
            SLIDER_INACTIVE: h,
            TAB_ACTIVE: L,
            TAB_INACTIVE: S,
            NAVBAR_CLOSE: R,
            NAVBAR_OPEN: N,
            MOUSE_MOVE: A,
            PAGE_SCROLL_DOWN: C,
            SCROLL_INTO_VIEW: v,
            SCROLL_OUT_OF_VIEW: F,
            PAGE_SCROLL_UP: P,
            SCROLLING_IN_VIEW: M,
            PAGE_FINISH: w,
            ECOMMERCE_CART_CLOSE: D,
            ECOMMERCE_CART_OPEN: G,
            PAGE_START: V,
            PAGE_SCROLL: U,
          } = u.EventTypeConsts,
          k = "COMPONENT_ACTIVE",
          x = "COMPONENT_INACTIVE",
          { COLON_DELIMITER: B } = u.IX2EngineConstants,
          { getNamespacedParameterId: X } = f.IX2VanillaUtils,
          j = (e) => (t) => !!("object" == typeof t && e(t)) || t,
          W = j(({ element: e, nativeEvent: t }) => e === t.target),
          Q = j(({ element: e, nativeEvent: t }) => e.contains(t.target)),
          Y = (0, o.default)([W, Q]),
          H = (e, t) => {
            if (t) {
              let { ixData: n } = e.getState(),
                { events: i } = n,
                a = i[t];
              if (a && !ei[a.eventTypeId]) return a;
            }
            return null;
          },
          z = ({ store: e, event: t }) => {
            let { action: n } = t,
              { autoStopEventId: i } = n.config;
            return !!H(e, i);
          },
          K = ({ store: e, event: t, element: n, eventStateKey: i }, a) => {
            let { action: r, id: o } = t,
              { actionListId: c, autoStopEventId: u } = r.config,
              d = H(e, u);
            return (
              d &&
                (0, s.stopActionGroup)({
                  store: e,
                  eventId: u,
                  eventTarget: n,
                  eventStateKey: u + B + i.split(B)[1],
                  actionListId: (0, l.default)(d, "action.config.actionListId"),
                }),
              (0, s.stopActionGroup)({
                store: e,
                eventId: o,
                eventTarget: n,
                eventStateKey: i,
                actionListId: c,
              }),
              (0, s.startActionGroup)({
                store: e,
                eventId: o,
                eventTarget: n,
                eventStateKey: i,
                actionListId: c,
              }),
              a
            );
          },
          q = (e, t) => (n, i) => !0 === e(n, i) ? t(n, i) : i,
          Z = { handler: q(Y, K) },
          J = { ...Z, types: [k, x].join(" ") },
          ee = [
            { target: window, types: "resize orientationchange", throttle: !0 },
            {
              target: document,
              types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
              throttle: !0,
            },
          ],
          et = "mouseover mouseout",
          en = { types: ee },
          ei = { PAGE_START: V, PAGE_FINISH: w },
          ea = (() => {
            let e = void 0 !== window.pageXOffset,
              t =
                "CSS1Compat" === document.compatMode
                  ? document.documentElement
                  : document.body;
            return () => ({
              scrollLeft: e ? window.pageXOffset : t.scrollLeft,
              scrollTop: e ? window.pageYOffset : t.scrollTop,
              stiffScrollTop: (0, c.default)(
                e ? window.pageYOffset : t.scrollTop,
                0,
                t.scrollHeight - window.innerHeight
              ),
              scrollWidth: t.scrollWidth,
              scrollHeight: t.scrollHeight,
              clientWidth: t.clientWidth,
              clientHeight: t.clientHeight,
              innerWidth: window.innerWidth,
              innerHeight: window.innerHeight,
            });
          })(),
          er = (e, t) =>
            !(
              e.left > t.right ||
              e.right < t.left ||
              e.top > t.bottom ||
              e.bottom < t.top
            ),
          eo = ({ element: e, nativeEvent: t }) => {
            let { type: n, target: i, relatedTarget: a } = t,
              r = e.contains(i);
            if ("mouseover" === n && r) return !0;
            let o = e.contains(a);
            return ("mouseout" === n && !!r && !!o) || !1;
          },
          el = (e) => {
            let {
                element: t,
                event: { config: n },
              } = e,
              { clientWidth: i, clientHeight: a } = ea(),
              r = n.scrollOffsetValue,
              o = n.scrollOffsetUnit,
              l = "PX" === o ? r : (a * (r || 0)) / 100;
            return er(t.getBoundingClientRect(), {
              left: 0,
              top: l,
              right: i,
              bottom: a - l,
            });
          },
          ec = (e) => (t, n) => {
            let { type: i } = t.nativeEvent,
              a = -1 !== [k, x].indexOf(i) ? i === k : n.isActive,
              r = { ...n, isActive: a };
            return n && r.isActive === n.isActive ? r : e(t, r) || r;
          },
          eu = (e) => (t, n) => {
            let i = { elementHovered: eo(t) };
            return (
              ((n ? i.elementHovered !== n.elementHovered : i.elementHovered) &&
                e(t, i)) ||
              i
            );
          },
          es =
            (e) =>
            (t, n = {}) => {
              let i, a;
              let { stiffScrollTop: r, scrollHeight: o, innerHeight: l } = ea(),
                {
                  event: { config: c, eventTypeId: u },
                } = t,
                { scrollOffsetValue: s, scrollOffsetUnit: d } = c,
                f = o - l,
                p = Number((r / f).toFixed(2));
              if (n && n.percentTop === p) return n;
              let E = ("PX" === d ? s : (l * (s || 0)) / 100) / f,
                I = 0;
              n &&
                ((i = p > n.percentTop),
                (I = (a = n.scrollingDown !== i) ? p : n.anchorTop));
              let g = u === C ? p >= I + E : p <= I - E,
                T = {
                  ...n,
                  percentTop: p,
                  inBounds: g,
                  anchorTop: I,
                  scrollingDown: i,
                };
              return (
                (n && g && (a || T.inBounds !== n.inBounds) && e(t, T)) || T
              );
            },
          ed = (e, t) =>
            e.left > t.left &&
            e.left < t.right &&
            e.top > t.top &&
            e.top < t.bottom,
          ef =
            (e) =>
            (t, n = { clickCount: 0 }) => {
              let i = { clickCount: (n.clickCount % 2) + 1 };
              return (i.clickCount !== n.clickCount && e(t, i)) || i;
            },
          ep = (e = !0) => ({
            ...J,
            handler: q(
              e ? Y : W,
              ec((e, t) => (t.isActive ? Z.handler(e, t) : t))
            ),
          }),
          eE = (e = !0) => ({
            ...J,
            handler: q(
              e ? Y : W,
              ec((e, t) => (t.isActive ? t : Z.handler(e, t)))
            ),
          });
        let eI = {
          ...en,
          handler:
            ((i = (e, t) => {
              let { elementVisible: n } = t,
                { event: i, store: a } = e,
                { ixData: r } = a.getState(),
                { events: o } = r;
              return !o[i.action.config.autoStopEventId] && t.triggered
                ? t
                : (i.eventTypeId === v) === n
                ? (K(e), { ...t, triggered: !0 })
                : t;
            }),
            (e, t) => {
              let n = { ...t, elementVisible: el(e) };
              return (
                ((t
                  ? n.elementVisible !== t.elementVisible
                  : n.elementVisible) &&
                  i(e, n)) ||
                n
              );
            }),
        };
        let eg = {
          [b]: ep(),
          [h]: eE(),
          [O]: ep(),
          [_]: eE(),
          [N]: ep(!1),
          [R]: eE(!1),
          [L]: ep(),
          [S]: eE(),
          [G]: { types: "ecommerce-cart-open", handler: q(Y, K) },
          [D]: { types: "ecommerce-cart-close", handler: q(Y, K) },
          [E]: {
            types: "click",
            handler: q(
              Y,
              ef((e, { clickCount: t }) => {
                z(e) ? 1 === t && K(e) : K(e);
              })
            ),
          },
          [I]: {
            types: "click",
            handler: q(
              Y,
              ef((e, { clickCount: t }) => {
                2 === t && K(e);
              })
            ),
          },
          [g]: { ...Z, types: "mousedown" },
          [T]: { ...Z, types: "mouseup" },
          [y]: {
            types: et,
            handler: q(
              Y,
              eu((e, t) => {
                t.elementHovered && K(e);
              })
            ),
          },
          [m]: {
            types: et,
            handler: q(
              Y,
              eu((e, t) => {
                !t.elementHovered && K(e);
              })
            ),
          },
          [A]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: n,
                nativeEvent: i,
                eventStateKey: a,
              },
              r = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: o,
                  selectedAxis: l,
                  continuousParameterGroupId: c,
                  reverse: s,
                  restingState: f = 0,
                } = n,
                {
                  clientX: p = r.clientX,
                  clientY: E = r.clientY,
                  pageX: I = r.pageX,
                  pageY: g = r.pageY,
                } = i,
                T = "X_AXIS" === l,
                y = "mouseout" === i.type,
                m = f / 100,
                _ = c,
                O = !1;
              switch (o) {
                case u.EventBasedOn.VIEWPORT:
                  m = T
                    ? Math.min(p, window.innerWidth) / window.innerWidth
                    : Math.min(E, window.innerHeight) / window.innerHeight;
                  break;
                case u.EventBasedOn.PAGE: {
                  let {
                    scrollLeft: e,
                    scrollTop: t,
                    scrollWidth: n,
                    scrollHeight: i,
                  } = ea();
                  m = T ? Math.min(e + I, n) / n : Math.min(t + g, i) / i;
                  break;
                }
                case u.EventBasedOn.ELEMENT:
                default: {
                  _ = X(a, c);
                  let e = 0 === i.type.indexOf("mouse");
                  if (e && !0 !== Y({ element: t, nativeEvent: i })) break;
                  let n = t.getBoundingClientRect(),
                    { left: r, top: o, width: l, height: u } = n;
                  if (!e && !ed({ left: p, top: E }, n)) break;
                  (O = !0), (m = T ? (p - r) / l : (E - o) / u);
                }
              }
              return (
                y && (m > 0.95 || m < 0.05) && (m = Math.round(m)),
                (o !== u.EventBasedOn.ELEMENT || O || O !== r.elementHovered) &&
                  ((m = s ? 1 - m : m),
                  e.dispatch((0, d.parameterChanged)(_, m))),
                {
                  elementHovered: O,
                  clientX: p,
                  clientY: E,
                  pageX: I,
                  pageY: g,
                }
              );
            },
          },
          [U]: {
            types: ee,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: n, reverse: i } = t,
                { scrollTop: a, scrollHeight: r, clientHeight: o } = ea(),
                l = a / (r - o);
              (l = i ? 1 - l : l), e.dispatch((0, d.parameterChanged)(n, l));
            },
          },
          [M]: {
            types: ee,
            handler: (
              { element: e, store: t, eventConfig: n, eventStateKey: i },
              a = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: r,
                  scrollTop: o,
                  scrollWidth: l,
                  scrollHeight: c,
                  clientHeight: s,
                } = ea(),
                {
                  basedOn: f,
                  selectedAxis: p,
                  continuousParameterGroupId: E,
                  startsEntering: I,
                  startsExiting: g,
                  addEndOffset: T,
                  addStartOffset: y,
                  addOffsetValue: m = 0,
                  endOffsetValue: _ = 0,
                } = n;
              if (f === u.EventBasedOn.VIEWPORT) {
                let e = "X_AXIS" === p ? r / l : o / c;
                return (
                  e !== a.scrollPercent &&
                    t.dispatch((0, d.parameterChanged)(E, e)),
                  { scrollPercent: e }
                );
              }
              {
                let n = X(i, E),
                  r = e.getBoundingClientRect(),
                  o = (y ? m : 0) / 100,
                  l = (T ? _ : 0) / 100;
                (o = I ? o : 1 - o), (l = g ? l : 1 - l);
                let u = r.top + Math.min(r.height * o, s),
                  f = r.top + r.height * l,
                  p = Math.min(s + (f - u), c),
                  O = Math.min(Math.max(0, s - u), p) / p;
                return (
                  O !== a.scrollPercent &&
                    t.dispatch((0, d.parameterChanged)(n, O)),
                  { scrollPercent: O }
                );
              }
            },
          },
          [v]: eI,
          [F]: eI,
          [C]: {
            ...en,
            handler: es((e, t) => {
              t.scrollingDown && K(e);
            }),
          },
          [P]: {
            ...en,
            handler: es((e, t) => {
              !t.scrollingDown && K(e);
            }),
          },
          [w]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: q(
              W,
              ((a = K),
              (e, t) => {
                let n = { finished: "complete" === document.readyState };
                return n.finished && !(t && t.finshed) && a(e), n;
              })
            ),
          },
          [V]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: q(W, ((r = K), (e, t) => (t || r(e), { started: !0 }))),
          },
        };
      },
      4609: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "ixData", {
            enumerable: !0,
            get: function () {
              return a;
            },
          });
        let { IX2_RAW_DATA_IMPORTED: i } = n(7087).IX2EngineActionTypes,
          a = (e = Object.freeze({}), t) => {
            if (t.type === i) return t.payload.ixData || Object.freeze({});
            return e;
          };
      },
      7718: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "ixInstances", {
            enumerable: !0,
            get: function () {
              return O;
            },
          });
        let i = n(7087),
          a = n(9468),
          r = n(1185),
          {
            IX2_RAW_DATA_IMPORTED: o,
            IX2_SESSION_STOPPED: l,
            IX2_INSTANCE_ADDED: c,
            IX2_INSTANCE_STARTED: u,
            IX2_INSTANCE_REMOVED: s,
            IX2_ANIMATION_FRAME_CHANGED: d,
          } = i.IX2EngineActionTypes,
          {
            optimizeFloat: f,
            applyEasing: p,
            createBezierEasing: E,
          } = a.IX2EasingUtils,
          { RENDER_GENERAL: I } = i.IX2EngineConstants,
          {
            getItemConfigByKey: g,
            getRenderType: T,
            getStyleProp: y,
          } = a.IX2VanillaUtils,
          m = (e, t) => {
            let n, i, a, o;
            let {
                position: l,
                parameterId: c,
                actionGroups: u,
                destinationKeys: s,
                smoothing: d,
                restingValue: E,
                actionTypeId: I,
                customEasingFn: T,
                skipMotion: y,
                skipToValue: m,
              } = e,
              { parameters: _ } = t.payload,
              O = Math.max(1 - d, 0.01),
              b = _[c];
            null == b && ((O = 1), (b = E));
            let h = f((Math.max(b, 0) || 0) - l),
              L = y ? m : f(l + h * O),
              S = 100 * L;
            if (L === l && e.current) return e;
            for (let e = 0, { length: t } = u; e < t; e++) {
              let { keyframe: t, actionItems: r } = u[e];
              if ((0 === e && (n = r[0]), S >= t)) {
                n = r[0];
                let l = u[e + 1],
                  c = l && S !== t;
                (i = c ? l.actionItems[0] : null),
                  c && ((a = t / 100), (o = (l.keyframe - t) / 100));
              }
            }
            let R = {};
            if (n && !i)
              for (let e = 0, { length: t } = s; e < t; e++) {
                let t = s[e];
                R[t] = g(I, t, n.config);
              }
            else if (n && i && void 0 !== a && void 0 !== o) {
              let e = (L - a) / o,
                t = p(n.config.easing, e, T);
              for (let e = 0, { length: a } = s; e < a; e++) {
                let a = s[e],
                  r = g(I, a, n.config),
                  o = (g(I, a, i.config) - r) * t + r;
                R[a] = o;
              }
            }
            return (0, r.merge)(e, { position: L, current: R });
          },
          _ = (e, t) => {
            let {
                active: n,
                origin: i,
                start: a,
                immediate: o,
                renderType: l,
                verbose: c,
                actionItem: u,
                destination: s,
                destinationKeys: d,
                pluginDuration: E,
                instanceDelay: g,
                customEasingFn: T,
                skipMotion: y,
              } = e,
              m = u.config.easing,
              { duration: _, delay: O } = u.config;
            null != E && (_ = E),
              (O = null != g ? g : O),
              l === I ? (_ = 0) : (o || y) && (_ = O = 0);
            let { now: b } = t.payload;
            if (n && i) {
              let t = b - (a + O);
              if (c) {
                let t = _ + O,
                  n = f(Math.min(Math.max(0, (b - a) / t), 1));
                e = (0, r.set)(e, "verboseTimeElapsed", t * n);
              }
              if (t < 0) return e;
              let n = f(Math.min(Math.max(0, t / _), 1)),
                o = p(m, n, T),
                l = {},
                u = null;
              return (
                d.length &&
                  (u = d.reduce((e, t) => {
                    let n = s[t],
                      a = parseFloat(i[t]) || 0,
                      r = parseFloat(n) - a;
                    return (e[t] = r * o + a), e;
                  }, {})),
                (l.current = u),
                (l.position = n),
                1 === n && ((l.active = !1), (l.complete = !0)),
                (0, r.merge)(e, l)
              );
            }
            return e;
          },
          O = (e = Object.freeze({}), t) => {
            switch (t.type) {
              case o:
                return t.payload.ixInstances || Object.freeze({});
              case l:
                return Object.freeze({});
              case c: {
                let {
                    instanceId: n,
                    elementId: i,
                    actionItem: a,
                    eventId: o,
                    eventTarget: l,
                    eventStateKey: c,
                    actionListId: u,
                    groupIndex: s,
                    isCarrier: d,
                    origin: f,
                    destination: p,
                    immediate: I,
                    verbose: g,
                    continuous: m,
                    parameterId: _,
                    actionGroups: O,
                    smoothing: b,
                    restingValue: h,
                    pluginInstance: L,
                    pluginDuration: S,
                    instanceDelay: R,
                    skipMotion: N,
                    skipToValue: A,
                  } = t.payload,
                  { actionTypeId: C } = a,
                  v = T(C),
                  F = y(v, C),
                  P = Object.keys(p).filter(
                    (e) => null != p[e] && "string" != typeof p[e]
                  ),
                  { easing: M } = a.config;
                return (0, r.set)(e, n, {
                  id: n,
                  elementId: i,
                  active: !1,
                  position: 0,
                  start: 0,
                  origin: f,
                  destination: p,
                  destinationKeys: P,
                  immediate: I,
                  verbose: g,
                  current: null,
                  actionItem: a,
                  actionTypeId: C,
                  eventId: o,
                  eventTarget: l,
                  eventStateKey: c,
                  actionListId: u,
                  groupIndex: s,
                  renderType: v,
                  isCarrier: d,
                  styleProp: F,
                  continuous: m,
                  parameterId: _,
                  actionGroups: O,
                  smoothing: b,
                  restingValue: h,
                  pluginInstance: L,
                  pluginDuration: S,
                  instanceDelay: R,
                  skipMotion: N,
                  skipToValue: A,
                  customEasingFn:
                    Array.isArray(M) && 4 === M.length ? E(M) : void 0,
                });
              }
              case u: {
                let { instanceId: n, time: i } = t.payload;
                return (0, r.mergeIn)(e, [n], {
                  active: !0,
                  complete: !1,
                  start: i,
                });
              }
              case s: {
                let { instanceId: n } = t.payload;
                if (!e[n]) return e;
                let i = {},
                  a = Object.keys(e),
                  { length: r } = a;
                for (let t = 0; t < r; t++) {
                  let r = a[t];
                  r !== n && (i[r] = e[r]);
                }
                return i;
              }
              case d: {
                let n = e,
                  i = Object.keys(e),
                  { length: a } = i;
                for (let o = 0; o < a; o++) {
                  let a = i[o],
                    l = e[a],
                    c = l.continuous ? m : _;
                  n = (0, r.set)(n, a, c(l, t));
                }
                return n;
              }
              default:
                return e;
            }
          };
      },
      1540: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "ixParameters", {
            enumerable: !0,
            get: function () {
              return o;
            },
          });
        let {
            IX2_RAW_DATA_IMPORTED: i,
            IX2_SESSION_STOPPED: a,
            IX2_PARAMETER_CHANGED: r,
          } = n(7087).IX2EngineActionTypes,
          o = (e = {}, t) => {
            switch (t.type) {
              case i:
                return t.payload.ixParameters || {};
              case a:
                return {};
              case r: {
                let { key: n, value: i } = t.payload;
                return (e[n] = i), e;
              }
              default:
                return e;
            }
          };
      },
      7243: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "default", {
            enumerable: !0,
            get: function () {
              return d;
            },
          });
        let i = n(9516),
          a = n(4609),
          r = n(628),
          o = n(5862),
          l = n(9468),
          c = n(7718),
          u = n(1540),
          { ixElements: s } = l.IX2ElementsReducer,
          d = (0, i.combineReducers)({
            ixData: a.ixData,
            ixRequest: r.ixRequest,
            ixSession: o.ixSession,
            ixElements: s,
            ixInstances: c.ixInstances,
            ixParameters: u.ixParameters,
          });
      },
      628: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "ixRequest", {
            enumerable: !0,
            get: function () {
              return d;
            },
          });
        let i = n(7087),
          a = n(1185),
          {
            IX2_PREVIEW_REQUESTED: r,
            IX2_PLAYBACK_REQUESTED: o,
            IX2_STOP_REQUESTED: l,
            IX2_CLEAR_REQUESTED: c,
          } = i.IX2EngineActionTypes,
          u = { preview: {}, playback: {}, stop: {}, clear: {} },
          s = Object.create(null, {
            [r]: { value: "preview" },
            [o]: { value: "playback" },
            [l]: { value: "stop" },
            [c]: { value: "clear" },
          }),
          d = (e = u, t) => {
            if (t.type in s) {
              let n = [s[t.type]];
              return (0, a.setIn)(e, [n], { ...t.payload });
            }
            return e;
          };
      },
      5862: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "ixSession", {
            enumerable: !0,
            get: function () {
              return g;
            },
          });
        let i = n(7087),
          a = n(1185),
          {
            IX2_SESSION_INITIALIZED: r,
            IX2_SESSION_STARTED: o,
            IX2_TEST_FRAME_RENDERED: l,
            IX2_SESSION_STOPPED: c,
            IX2_EVENT_LISTENER_ADDED: u,
            IX2_EVENT_STATE_CHANGED: s,
            IX2_ANIMATION_FRAME_CHANGED: d,
            IX2_ACTION_LIST_PLAYBACK_CHANGED: f,
            IX2_VIEWPORT_WIDTH_CHANGED: p,
            IX2_MEDIA_QUERIES_DEFINED: E,
          } = i.IX2EngineActionTypes,
          I = {
            active: !1,
            tick: 0,
            eventListeners: [],
            eventState: {},
            playbackState: {},
            viewportWidth: 0,
            mediaQueryKey: null,
            hasBoundaryNodes: !1,
            hasDefinedMediaQueries: !1,
            reducedMotion: !1,
          },
          g = (e = I, t) => {
            switch (t.type) {
              case r: {
                let { hasBoundaryNodes: n, reducedMotion: i } = t.payload;
                return (0, a.merge)(e, {
                  hasBoundaryNodes: n,
                  reducedMotion: i,
                });
              }
              case o:
                return (0, a.set)(e, "active", !0);
              case l: {
                let {
                  payload: { step: n = 20 },
                } = t;
                return (0, a.set)(e, "tick", e.tick + n);
              }
              case c:
                return I;
              case d: {
                let {
                  payload: { now: n },
                } = t;
                return (0, a.set)(e, "tick", n);
              }
              case u: {
                let n = (0, a.addLast)(e.eventListeners, t.payload);
                return (0, a.set)(e, "eventListeners", n);
              }
              case s: {
                let { stateKey: n, newState: i } = t.payload;
                return (0, a.setIn)(e, ["eventState", n], i);
              }
              case f: {
                let { actionListId: n, isPlaying: i } = t.payload;
                return (0, a.setIn)(e, ["playbackState", n], i);
              }
              case p: {
                let { width: n, mediaQueries: i } = t.payload,
                  r = i.length,
                  o = null;
                for (let e = 0; e < r; e++) {
                  let { key: t, min: a, max: r } = i[e];
                  if (n >= a && n <= r) {
                    o = t;
                    break;
                  }
                }
                return (0, a.merge)(e, { viewportWidth: n, mediaQueryKey: o });
              }
              case E:
                return (0, a.set)(e, "hasDefinedMediaQueries", !0);
              default:
                return e;
            }
          };
      },
      7377: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          clearPlugin: function () {
            return c;
          },
          createPluginInstance: function () {
            return o;
          },
          getPluginConfig: function () {
            return n;
          },
          getPluginDestination: function () {
            return r;
          },
          getPluginDuration: function () {
            return i;
          },
          getPluginOrigin: function () {
            return a;
          },
          renderPlugin: function () {
            return l;
          },
        });
        let n = (e) => e.value,
          i = (e, t) => {
            if ("auto" !== t.config.duration) return null;
            let n = parseFloat(e.getAttribute("data-duration"));
            return n > 0
              ? 1e3 * n
              : 1e3 * parseFloat(e.getAttribute("data-default-duration"));
          },
          a = (e) => e || { value: 0 },
          r = (e) => ({ value: e.value }),
          o = (e) => {
            let t = window.Webflow.require("lottie");
            if (!t) return null;
            let n = t.createInstance(e);
            return n.stop(), n.setSubframe(!0), n;
          },
          l = (e, t, n) => {
            if (!e) return;
            let i = t[n.actionTypeId].value / 100;
            e.goToFrame(e.frames * i);
          },
          c = (e) => {
            let t = window.Webflow.require("lottie");
            t && t.createInstance(e).stop();
          };
      },
      2570: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          clearPlugin: function () {
            return f;
          },
          createPluginInstance: function () {
            return s;
          },
          getPluginConfig: function () {
            return o;
          },
          getPluginDestination: function () {
            return u;
          },
          getPluginDuration: function () {
            return l;
          },
          getPluginOrigin: function () {
            return c;
          },
          renderPlugin: function () {
            return d;
          },
        });
        let n = "--wf-rive-fit",
          i = "--wf-rive-alignment",
          a = (e) => document.querySelector(`[data-w-id="${e}"]`),
          r = () => window.Webflow.require("rive"),
          o = (e, t) => e.value.inputs[t],
          l = () => null,
          c = (e, t) => {
            if (e) return e;
            let n = {},
              { inputs: i = {} } = t.config.value;
            for (let e in i) null == i[e] && (n[e] = 0);
            return n;
          },
          u = (e) => e.value.inputs ?? {},
          s = (e, t) => {
            if ((t.config?.target?.selectorGuids || []).length > 0) return e;
            let n = t?.config?.target?.pluginElement;
            return n ? a(n) : null;
          },
          d = (e, { PLUGIN_RIVE: t }, a) => {
            let o = r();
            if (!o) return;
            let l = o.getInstance(e),
              c = o.rive.StateMachineInputType,
              { name: u, inputs: s = {} } = a.config.value || {};
            function d(e) {
              if (e.loaded) a();
              else {
                let t = () => {
                  a(), e?.off("load", t);
                };
                e?.on("load", t);
              }
              function a() {
                let a = e.stateMachineInputs(u);
                if (null != a) {
                  if ((!e.isPlaying && e.play(u, !1), n in s || i in s)) {
                    let t = e.layout,
                      a = s[n] ?? t.fit,
                      r = s[i] ?? t.alignment;
                    (a !== t.fit || r !== t.alignment) &&
                      (e.layout = t.copyWith({ fit: a, alignment: r }));
                  }
                  for (let e in s) {
                    if (e === n || e === i) continue;
                    let r = a.find((t) => t.name === e);
                    if (null != r)
                      switch (r.type) {
                        case c.Boolean:
                          if (null != s[e]) {
                            let t = !!s[e];
                            r.value = t;
                          }
                          break;
                        case c.Number: {
                          let n = t[e];
                          null != n && (r.value = n);
                          break;
                        }
                        case c.Trigger:
                          s[e] && r.fire();
                      }
                  }
                }
              }
            }
            l?.rive ? d(l.rive) : o.setLoadHandler(e, d);
          },
          f = (e, t) => null;
      },
      2866: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          clearPlugin: function () {
            return f;
          },
          createPluginInstance: function () {
            return s;
          },
          getPluginConfig: function () {
            return r;
          },
          getPluginDestination: function () {
            return u;
          },
          getPluginDuration: function () {
            return o;
          },
          getPluginOrigin: function () {
            return c;
          },
          renderPlugin: function () {
            return d;
          },
        });
        let n = (e) => document.querySelector(`[data-w-id="${e}"]`),
          i = () => window.Webflow.require("spline"),
          a = (e, t) => e.filter((e) => !t.includes(e)),
          r = (e, t) => e.value[t],
          o = () => null,
          l = Object.freeze({
            positionX: 0,
            positionY: 0,
            positionZ: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          }),
          c = (e, t) => {
            let n = Object.keys(t.config.value);
            if (e) {
              let t = a(n, Object.keys(e));
              return t.length ? t.reduce((e, t) => ((e[t] = l[t]), e), e) : e;
            }
            return n.reduce((e, t) => ((e[t] = l[t]), e), {});
          },
          u = (e) => e.value,
          s = (e, t) => {
            let i = t?.config?.target?.pluginElement;
            return i ? n(i) : null;
          },
          d = (e, t, n) => {
            let a = i();
            if (!a) return;
            let r = a.getInstance(e),
              o = n.config.target.objectId,
              l = (e) => {
                if (!e)
                  throw Error("Invalid spline app passed to renderSpline");
                let n = o && e.findObjectById(o);
                if (!n) return;
                let { PLUGIN_SPLINE: i } = t;
                null != i.positionX && (n.position.x = i.positionX),
                  null != i.positionY && (n.position.y = i.positionY),
                  null != i.positionZ && (n.position.z = i.positionZ),
                  null != i.rotationX && (n.rotation.x = i.rotationX),
                  null != i.rotationY && (n.rotation.y = i.rotationY),
                  null != i.rotationZ && (n.rotation.z = i.rotationZ),
                  null != i.scaleX && (n.scale.x = i.scaleX),
                  null != i.scaleY && (n.scale.y = i.scaleY),
                  null != i.scaleZ && (n.scale.z = i.scaleZ);
              };
            r ? l(r.spline) : a.setLoadHandler(e, l);
          },
          f = () => null;
      },
      1407: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          clearPlugin: function () {
            return d;
          },
          createPluginInstance: function () {
            return c;
          },
          getPluginConfig: function () {
            return a;
          },
          getPluginDestination: function () {
            return l;
          },
          getPluginDuration: function () {
            return r;
          },
          getPluginOrigin: function () {
            return o;
          },
          renderPlugin: function () {
            return s;
          },
        });
        let i = n(380),
          a = (e, t) => e.value[t],
          r = () => null,
          o = (e, t) => {
            if (e) return e;
            let n = t.config.value,
              a = t.config.target.objectId,
              r = getComputedStyle(document.documentElement).getPropertyValue(
                a
              );
            return null != n.size
              ? { size: parseInt(r, 10) }
              : "%" === n.unit || "-" === n.unit
              ? { size: parseFloat(r) }
              : null != n.red && null != n.green && null != n.blue
              ? (0, i.normalizeColor)(r)
              : void 0;
          },
          l = (e) => e.value,
          c = () => null,
          u = {
            color: {
              match: ({ red: e, green: t, blue: n, alpha: i }) =>
                [e, t, n, i].every((e) => null != e),
              getValue: ({ red: e, green: t, blue: n, alpha: i }) =>
                `rgba(${e}, ${t}, ${n}, ${i})`,
            },
            size: {
              match: ({ size: e }) => null != e,
              getValue: ({ size: e }, t) => {
                if ("-" === t) return e;
                return `${e}${t}`;
              },
            },
          },
          s = (e, t, n) => {
            let {
                target: { objectId: i },
                value: { unit: a },
              } = n.config,
              r = t.PLUGIN_VARIABLE,
              o = Object.values(u).find((e) => e.match(r, a));
            o &&
              document.documentElement.style.setProperty(i, o.getValue(r, a));
          },
          d = (e, t) => {
            let n = t.config.target.objectId;
            document.documentElement.style.removeProperty(n);
          };
      },
      3690: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "pluginMethodMap", {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let i = n(7087),
          a = u(n(7377)),
          r = u(n(2866)),
          o = u(n(2570)),
          l = u(n(1407));
        function c(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (c = function (e) {
            return e ? n : t;
          })(e);
        }
        function u(e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = c(t);
          if (n && n.has(e)) return n.get(e);
          var i = { __proto__: null },
            a = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var r in e)
            if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
              var o = a ? Object.getOwnPropertyDescriptor(e, r) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(i, r, o)
                : (i[r] = e[r]);
            }
          return (i.default = e), n && n.set(e, i), i;
        }
        let s = new Map([
          [i.ActionTypeConsts.PLUGIN_LOTTIE, { ...a }],
          [i.ActionTypeConsts.PLUGIN_SPLINE, { ...r }],
          [i.ActionTypeConsts.PLUGIN_RIVE, { ...o }],
          [i.ActionTypeConsts.PLUGIN_VARIABLE, { ...l }],
        ]);
      },
      8023: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          IX2_ACTION_LIST_PLAYBACK_CHANGED: function () {
            return y;
          },
          IX2_ANIMATION_FRAME_CHANGED: function () {
            return f;
          },
          IX2_CLEAR_REQUESTED: function () {
            return u;
          },
          IX2_ELEMENT_STATE_CHANGED: function () {
            return T;
          },
          IX2_EVENT_LISTENER_ADDED: function () {
            return s;
          },
          IX2_EVENT_STATE_CHANGED: function () {
            return d;
          },
          IX2_INSTANCE_ADDED: function () {
            return E;
          },
          IX2_INSTANCE_REMOVED: function () {
            return g;
          },
          IX2_INSTANCE_STARTED: function () {
            return I;
          },
          IX2_MEDIA_QUERIES_DEFINED: function () {
            return _;
          },
          IX2_PARAMETER_CHANGED: function () {
            return p;
          },
          IX2_PLAYBACK_REQUESTED: function () {
            return l;
          },
          IX2_PREVIEW_REQUESTED: function () {
            return o;
          },
          IX2_RAW_DATA_IMPORTED: function () {
            return n;
          },
          IX2_SESSION_INITIALIZED: function () {
            return i;
          },
          IX2_SESSION_STARTED: function () {
            return a;
          },
          IX2_SESSION_STOPPED: function () {
            return r;
          },
          IX2_STOP_REQUESTED: function () {
            return c;
          },
          IX2_TEST_FRAME_RENDERED: function () {
            return O;
          },
          IX2_VIEWPORT_WIDTH_CHANGED: function () {
            return m;
          },
        });
        let n = "IX2_RAW_DATA_IMPORTED",
          i = "IX2_SESSION_INITIALIZED",
          a = "IX2_SESSION_STARTED",
          r = "IX2_SESSION_STOPPED",
          o = "IX2_PREVIEW_REQUESTED",
          l = "IX2_PLAYBACK_REQUESTED",
          c = "IX2_STOP_REQUESTED",
          u = "IX2_CLEAR_REQUESTED",
          s = "IX2_EVENT_LISTENER_ADDED",
          d = "IX2_EVENT_STATE_CHANGED",
          f = "IX2_ANIMATION_FRAME_CHANGED",
          p = "IX2_PARAMETER_CHANGED",
          E = "IX2_INSTANCE_ADDED",
          I = "IX2_INSTANCE_STARTED",
          g = "IX2_INSTANCE_REMOVED",
          T = "IX2_ELEMENT_STATE_CHANGED",
          y = "IX2_ACTION_LIST_PLAYBACK_CHANGED",
          m = "IX2_VIEWPORT_WIDTH_CHANGED",
          _ = "IX2_MEDIA_QUERIES_DEFINED",
          O = "IX2_TEST_FRAME_RENDERED";
      },
      2686: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          ABSTRACT_NODE: function () {
            return ee;
          },
          AUTO: function () {
            return X;
          },
          BACKGROUND: function () {
            return G;
          },
          BACKGROUND_COLOR: function () {
            return D;
          },
          BAR_DELIMITER: function () {
            return Q;
          },
          BORDER_COLOR: function () {
            return V;
          },
          BOUNDARY_SELECTOR: function () {
            return o;
          },
          CHILDREN: function () {
            return Y;
          },
          COLON_DELIMITER: function () {
            return W;
          },
          COLOR: function () {
            return U;
          },
          COMMA_DELIMITER: function () {
            return j;
          },
          CONFIG_UNIT: function () {
            return E;
          },
          CONFIG_VALUE: function () {
            return s;
          },
          CONFIG_X_UNIT: function () {
            return d;
          },
          CONFIG_X_VALUE: function () {
            return l;
          },
          CONFIG_Y_UNIT: function () {
            return f;
          },
          CONFIG_Y_VALUE: function () {
            return c;
          },
          CONFIG_Z_UNIT: function () {
            return p;
          },
          CONFIG_Z_VALUE: function () {
            return u;
          },
          DISPLAY: function () {
            return k;
          },
          FILTER: function () {
            return F;
          },
          FLEX: function () {
            return x;
          },
          FONT_VARIATION_SETTINGS: function () {
            return P;
          },
          HEIGHT: function () {
            return w;
          },
          HTML_ELEMENT: function () {
            return Z;
          },
          IMMEDIATE_CHILDREN: function () {
            return H;
          },
          IX2_ID_DELIMITER: function () {
            return n;
          },
          OPACITY: function () {
            return v;
          },
          PARENT: function () {
            return K;
          },
          PLAIN_OBJECT: function () {
            return J;
          },
          PRESERVE_3D: function () {
            return q;
          },
          RENDER_GENERAL: function () {
            return en;
          },
          RENDER_PLUGIN: function () {
            return ea;
          },
          RENDER_STYLE: function () {
            return ei;
          },
          RENDER_TRANSFORM: function () {
            return et;
          },
          ROTATE_X: function () {
            return L;
          },
          ROTATE_Y: function () {
            return S;
          },
          ROTATE_Z: function () {
            return R;
          },
          SCALE_3D: function () {
            return h;
          },
          SCALE_X: function () {
            return _;
          },
          SCALE_Y: function () {
            return O;
          },
          SCALE_Z: function () {
            return b;
          },
          SIBLINGS: function () {
            return z;
          },
          SKEW: function () {
            return N;
          },
          SKEW_X: function () {
            return A;
          },
          SKEW_Y: function () {
            return C;
          },
          TRANSFORM: function () {
            return I;
          },
          TRANSLATE_3D: function () {
            return m;
          },
          TRANSLATE_X: function () {
            return g;
          },
          TRANSLATE_Y: function () {
            return T;
          },
          TRANSLATE_Z: function () {
            return y;
          },
          WF_PAGE: function () {
            return i;
          },
          WIDTH: function () {
            return M;
          },
          WILL_CHANGE: function () {
            return B;
          },
          W_MOD_IX: function () {
            return r;
          },
          W_MOD_JS: function () {
            return a;
          },
        });
        let n = "|",
          i = "data-wf-page",
          a = "w-mod-js",
          r = "w-mod-ix",
          o = ".w-dyn-item",
          l = "xValue",
          c = "yValue",
          u = "zValue",
          s = "value",
          d = "xUnit",
          f = "yUnit",
          p = "zUnit",
          E = "unit",
          I = "transform",
          g = "translateX",
          T = "translateY",
          y = "translateZ",
          m = "translate3d",
          _ = "scaleX",
          O = "scaleY",
          b = "scaleZ",
          h = "scale3d",
          L = "rotateX",
          S = "rotateY",
          R = "rotateZ",
          N = "skew",
          A = "skewX",
          C = "skewY",
          v = "opacity",
          F = "filter",
          P = "font-variation-settings",
          M = "width",
          w = "height",
          D = "backgroundColor",
          G = "background",
          V = "borderColor",
          U = "color",
          k = "display",
          x = "flex",
          B = "willChange",
          X = "AUTO",
          j = ",",
          W = ":",
          Q = "|",
          Y = "CHILDREN",
          H = "IMMEDIATE_CHILDREN",
          z = "SIBLINGS",
          K = "PARENT",
          q = "preserve-3d",
          Z = "HTML_ELEMENT",
          J = "PLAIN_OBJECT",
          ee = "ABSTRACT_NODE",
          et = "RENDER_TRANSFORM",
          en = "RENDER_GENERAL",
          ei = "RENDER_STYLE",
          ea = "RENDER_PLUGIN";
      },
      262: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          ActionAppliesTo: function () {
            return i;
          },
          ActionTypeConsts: function () {
            return n;
          },
        });
        let n = {
            TRANSFORM_MOVE: "TRANSFORM_MOVE",
            TRANSFORM_SCALE: "TRANSFORM_SCALE",
            TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
            TRANSFORM_SKEW: "TRANSFORM_SKEW",
            STYLE_OPACITY: "STYLE_OPACITY",
            STYLE_SIZE: "STYLE_SIZE",
            STYLE_FILTER: "STYLE_FILTER",
            STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
            STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
            STYLE_BORDER: "STYLE_BORDER",
            STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
            OBJECT_VALUE: "OBJECT_VALUE",
            PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
            PLUGIN_SPLINE: "PLUGIN_SPLINE",
            PLUGIN_RIVE: "PLUGIN_RIVE",
            PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
            GENERAL_DISPLAY: "GENERAL_DISPLAY",
            GENERAL_START_ACTION: "GENERAL_START_ACTION",
            GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
            GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
            GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
            GENERAL_LOOP: "GENERAL_LOOP",
            STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
          },
          i = {
            ELEMENT: "ELEMENT",
            ELEMENT_CLASS: "ELEMENT_CLASS",
            TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
          };
      },
      7087: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          ActionTypeConsts: function () {
            return a.ActionTypeConsts;
          },
          IX2EngineActionTypes: function () {
            return r;
          },
          IX2EngineConstants: function () {
            return o;
          },
          QuickEffectIds: function () {
            return i.QuickEffectIds;
          },
        });
        let i = l(n(1833), t),
          a = l(n(262), t);
        l(n(8704), t), l(n(3213), t);
        let r = u(n(8023)),
          o = u(n(2686));
        function l(e, t) {
          return (
            Object.keys(e).forEach(function (n) {
              "default" !== n &&
                !Object.prototype.hasOwnProperty.call(t, n) &&
                Object.defineProperty(t, n, {
                  enumerable: !0,
                  get: function () {
                    return e[n];
                  },
                });
            }),
            e
          );
        }
        function c(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (c = function (e) {
            return e ? n : t;
          })(e);
        }
        function u(e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = c(t);
          if (n && n.has(e)) return n.get(e);
          var i = { __proto__: null },
            a = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var r in e)
            if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
              var o = a ? Object.getOwnPropertyDescriptor(e, r) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(i, r, o)
                : (i[r] = e[r]);
            }
          return (i.default = e), n && n.set(e, i), i;
        }
      },
      3213: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "ReducedMotionTypes", {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let {
            TRANSFORM_MOVE: i,
            TRANSFORM_SCALE: a,
            TRANSFORM_ROTATE: r,
            TRANSFORM_SKEW: o,
            STYLE_SIZE: l,
            STYLE_FILTER: c,
            STYLE_FONT_VARIATION: u,
          } = n(262).ActionTypeConsts,
          s = { [i]: !0, [a]: !0, [r]: !0, [o]: !0, [l]: !0, [c]: !0, [u]: !0 };
      },
      1833: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          EventAppliesTo: function () {
            return i;
          },
          EventBasedOn: function () {
            return a;
          },
          EventContinuousMouseAxes: function () {
            return r;
          },
          EventLimitAffectedElements: function () {
            return o;
          },
          EventTypeConsts: function () {
            return n;
          },
          QuickEffectDirectionConsts: function () {
            return c;
          },
          QuickEffectIds: function () {
            return l;
          },
        });
        let n = {
            NAVBAR_OPEN: "NAVBAR_OPEN",
            NAVBAR_CLOSE: "NAVBAR_CLOSE",
            TAB_ACTIVE: "TAB_ACTIVE",
            TAB_INACTIVE: "TAB_INACTIVE",
            SLIDER_ACTIVE: "SLIDER_ACTIVE",
            SLIDER_INACTIVE: "SLIDER_INACTIVE",
            DROPDOWN_OPEN: "DROPDOWN_OPEN",
            DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
            MOUSE_CLICK: "MOUSE_CLICK",
            MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
            MOUSE_DOWN: "MOUSE_DOWN",
            MOUSE_UP: "MOUSE_UP",
            MOUSE_OVER: "MOUSE_OVER",
            MOUSE_OUT: "MOUSE_OUT",
            MOUSE_MOVE: "MOUSE_MOVE",
            MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
            SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
            SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
            SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
            ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
            ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
            PAGE_START: "PAGE_START",
            PAGE_FINISH: "PAGE_FINISH",
            PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
            PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
            PAGE_SCROLL: "PAGE_SCROLL",
          },
          i = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" },
          a = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" },
          r = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" },
          o = {
            CHILDREN: "CHILDREN",
            SIBLINGS: "SIBLINGS",
            IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
          },
          l = {
            FADE_EFFECT: "FADE_EFFECT",
            SLIDE_EFFECT: "SLIDE_EFFECT",
            GROW_EFFECT: "GROW_EFFECT",
            SHRINK_EFFECT: "SHRINK_EFFECT",
            SPIN_EFFECT: "SPIN_EFFECT",
            FLY_EFFECT: "FLY_EFFECT",
            POP_EFFECT: "POP_EFFECT",
            FLIP_EFFECT: "FLIP_EFFECT",
            JIGGLE_EFFECT: "JIGGLE_EFFECT",
            PULSE_EFFECT: "PULSE_EFFECT",
            DROP_EFFECT: "DROP_EFFECT",
            BLINK_EFFECT: "BLINK_EFFECT",
            BOUNCE_EFFECT: "BOUNCE_EFFECT",
            FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
            FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
            RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
            JELLO_EFFECT: "JELLO_EFFECT",
            GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
            SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
            PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
          },
          c = {
            LEFT: "LEFT",
            RIGHT: "RIGHT",
            BOTTOM: "BOTTOM",
            TOP: "TOP",
            BOTTOM_LEFT: "BOTTOM_LEFT",
            BOTTOM_RIGHT: "BOTTOM_RIGHT",
            TOP_RIGHT: "TOP_RIGHT",
            TOP_LEFT: "TOP_LEFT",
            CLOCKWISE: "CLOCKWISE",
            COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
          };
      },
      8704: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "InteractionTypeConsts", {
            enumerable: !0,
            get: function () {
              return n;
            },
          });
        let n = {
          MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
          MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
          MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
          SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
          SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
          MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
            "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
          PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
          PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
          PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
          NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
          DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
          ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
          TAB_INTERACTION: "TAB_INTERACTION",
          SLIDER_INTERACTION: "SLIDER_INTERACTION",
        };
      },
      380: function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "normalizeColor", {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
        let n = {
          aliceblue: "#F0F8FF",
          antiquewhite: "#FAEBD7",
          aqua: "#00FFFF",
          aquamarine: "#7FFFD4",
          azure: "#F0FFFF",
          beige: "#F5F5DC",
          bisque: "#FFE4C4",
          black: "#000000",
          blanchedalmond: "#FFEBCD",
          blue: "#0000FF",
          blueviolet: "#8A2BE2",
          brown: "#A52A2A",
          burlywood: "#DEB887",
          cadetblue: "#5F9EA0",
          chartreuse: "#7FFF00",
          chocolate: "#D2691E",
          coral: "#FF7F50",
          cornflowerblue: "#6495ED",
          cornsilk: "#FFF8DC",
          crimson: "#DC143C",
          cyan: "#00FFFF",
          darkblue: "#00008B",
          darkcyan: "#008B8B",
          darkgoldenrod: "#B8860B",
          darkgray: "#A9A9A9",
          darkgreen: "#006400",
          darkgrey: "#A9A9A9",
          darkkhaki: "#BDB76B",
          darkmagenta: "#8B008B",
          darkolivegreen: "#556B2F",
          darkorange: "#FF8C00",
          darkorchid: "#9932CC",
          darkred: "#8B0000",
          darksalmon: "#E9967A",
          darkseagreen: "#8FBC8F",
          darkslateblue: "#483D8B",
          darkslategray: "#2F4F4F",
          darkslategrey: "#2F4F4F",
          darkturquoise: "#00CED1",
          darkviolet: "#9400D3",
          deeppink: "#FF1493",
          deepskyblue: "#00BFFF",
          dimgray: "#696969",
          dimgrey: "#696969",
          dodgerblue: "#1E90FF",
          firebrick: "#B22222",
          floralwhite: "#FFFAF0",
          forestgreen: "#228B22",
          fuchsia: "#FF00FF",
          gainsboro: "#DCDCDC",
          ghostwhite: "#F8F8FF",
          gold: "#FFD700",
          goldenrod: "#DAA520",
          gray: "#808080",
          green: "#008000",
          greenyellow: "#ADFF2F",
          grey: "#808080",
          honeydew: "#F0FFF0",
          hotpink: "#FF69B4",
          indianred: "#CD5C5C",
          indigo: "#4B0082",
          ivory: "#FFFFF0",
          khaki: "#F0E68C",
          lavender: "#E6E6FA",
          lavenderblush: "#FFF0F5",
          lawngreen: "#7CFC00",
          lemonchiffon: "#FFFACD",
          lightblue: "#ADD8E6",
          lightcoral: "#F08080",
          lightcyan: "#E0FFFF",
          lightgoldenrodyellow: "#FAFAD2",
          lightgray: "#D3D3D3",
          lightgreen: "#90EE90",
          lightgrey: "#D3D3D3",
          lightpink: "#FFB6C1",
          lightsalmon: "#FFA07A",
          lightseagreen: "#20B2AA",
          lightskyblue: "#87CEFA",
          lightslategray: "#778899",
          lightslategrey: "#778899",
          lightsteelblue: "#B0C4DE",
          lightyellow: "#FFFFE0",
          lime: "#00FF00",
          limegreen: "#32CD32",
          linen: "#FAF0E6",
          magenta: "#FF00FF",
          maroon: "#800000",
          mediumaquamarine: "#66CDAA",
          mediumblue: "#0000CD",
          mediumorchid: "#BA55D3",
          mediumpurple: "#9370DB",
          mediumseagreen: "#3CB371",
          mediumslateblue: "#7B68EE",
          mediumspringgreen: "#00FA9A",
          mediumturquoise: "#48D1CC",
          mediumvioletred: "#C71585",
          midnightblue: "#191970",
          mintcream: "#F5FFFA",
          mistyrose: "#FFE4E1",
          moccasin: "#FFE4B5",
          navajowhite: "#FFDEAD",
          navy: "#000080",
          oldlace: "#FDF5E6",
          olive: "#808000",
          olivedrab: "#6B8E23",
          orange: "#FFA500",
          orangered: "#FF4500",
          orchid: "#DA70D6",
          palegoldenrod: "#EEE8AA",
          palegreen: "#98FB98",
          paleturquoise: "#AFEEEE",
          palevioletred: "#DB7093",
          papayawhip: "#FFEFD5",
          peachpuff: "#FFDAB9",
          peru: "#CD853F",
          pink: "#FFC0CB",
          plum: "#DDA0DD",
          powderblue: "#B0E0E6",
          purple: "#800080",
          rebeccapurple: "#663399",
          red: "#FF0000",
          rosybrown: "#BC8F8F",
          royalblue: "#4169E1",
          saddlebrown: "#8B4513",
          salmon: "#FA8072",
          sandybrown: "#F4A460",
          seagreen: "#2E8B57",
          seashell: "#FFF5EE",
          sienna: "#A0522D",
          silver: "#C0C0C0",
          skyblue: "#87CEEB",
          slateblue: "#6A5ACD",
          slategray: "#708090",
          slategrey: "#708090",
          snow: "#FFFAFA",
          springgreen: "#00FF7F",
          steelblue: "#4682B4",
          tan: "#D2B48C",
          teal: "#008080",
          thistle: "#D8BFD8",
          tomato: "#FF6347",
          turquoise: "#40E0D0",
          violet: "#EE82EE",
          wheat: "#F5DEB3",
          white: "#FFFFFF",
          whitesmoke: "#F5F5F5",
          yellow: "#FFFF00",
          yellowgreen: "#9ACD32",
        };
        function i(e) {
          let t, i, a;
          let r = 1,
            o = e.replace(/\s/g, "").toLowerCase(),
            l = ("string" == typeof n[o] ? n[o].toLowerCase() : null) || o;
          if (l.startsWith("#")) {
            let e = l.substring(1);
            3 === e.length || 4 === e.length
              ? ((t = parseInt(e[0] + e[0], 16)),
                (i = parseInt(e[1] + e[1], 16)),
                (a = parseInt(e[2] + e[2], 16)),
                4 === e.length && (r = parseInt(e[3] + e[3], 16) / 255))
              : (6 === e.length || 8 === e.length) &&
                ((t = parseInt(e.substring(0, 2), 16)),
                (i = parseInt(e.substring(2, 4), 16)),
                (a = parseInt(e.substring(4, 6), 16)),
                8 === e.length && (r = parseInt(e.substring(6, 8), 16) / 255));
          } else if (l.startsWith("rgba")) {
            let e = l.match(/rgba\(([^)]+)\)/)[1].split(",");
            (t = parseInt(e[0], 10)),
              (i = parseInt(e[1], 10)),
              (a = parseInt(e[2], 10)),
              (r = parseFloat(e[3]));
          } else if (l.startsWith("rgb")) {
            let e = l.match(/rgb\(([^)]+)\)/)[1].split(",");
            (t = parseInt(e[0], 10)),
              (i = parseInt(e[1], 10)),
              (a = parseInt(e[2], 10));
          } else if (l.startsWith("hsla")) {
            let e, n, o;
            let c = l.match(/hsla\(([^)]+)\)/)[1].split(","),
              u = parseFloat(c[0]),
              s = parseFloat(c[1].replace("%", "")) / 100,
              d = parseFloat(c[2].replace("%", "")) / 100;
            r = parseFloat(c[3]);
            let f = (1 - Math.abs(2 * d - 1)) * s,
              p = f * (1 - Math.abs(((u / 60) % 2) - 1)),
              E = d - f / 2;
            u >= 0 && u < 60
              ? ((e = f), (n = p), (o = 0))
              : u >= 60 && u < 120
              ? ((e = p), (n = f), (o = 0))
              : u >= 120 && u < 180
              ? ((e = 0), (n = f), (o = p))
              : u >= 180 && u < 240
              ? ((e = 0), (n = p), (o = f))
              : u >= 240 && u < 300
              ? ((e = p), (n = 0), (o = f))
              : ((e = f), (n = 0), (o = p)),
              (t = Math.round((e + E) * 255)),
              (i = Math.round((n + E) * 255)),
              (a = Math.round((o + E) * 255));
          } else if (l.startsWith("hsl")) {
            let e, n, r;
            let o = l.match(/hsl\(([^)]+)\)/)[1].split(","),
              c = parseFloat(o[0]),
              u = parseFloat(o[1].replace("%", "")) / 100,
              s = parseFloat(o[2].replace("%", "")) / 100,
              d = (1 - Math.abs(2 * s - 1)) * u,
              f = d * (1 - Math.abs(((c / 60) % 2) - 1)),
              p = s - d / 2;
            c >= 0 && c < 60
              ? ((e = d), (n = f), (r = 0))
              : c >= 60 && c < 120
              ? ((e = f), (n = d), (r = 0))
              : c >= 120 && c < 180
              ? ((e = 0), (n = d), (r = f))
              : c >= 180 && c < 240
              ? ((e = 0), (n = f), (r = d))
              : c >= 240 && c < 300
              ? ((e = f), (n = 0), (r = d))
              : ((e = d), (n = 0), (r = f)),
              (t = Math.round((e + p) * 255)),
              (i = Math.round((n + p) * 255)),
              (a = Math.round((r + p) * 255));
          }
          if (Number.isNaN(t) || Number.isNaN(i) || Number.isNaN(a))
            throw Error(
              `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
            );
          return { red: t, green: i, blue: a, alpha: r };
        }
      },
      9468: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          IX2BrowserSupport: function () {
            return i;
          },
          IX2EasingUtils: function () {
            return r;
          },
          IX2Easings: function () {
            return a;
          },
          IX2ElementsReducer: function () {
            return o;
          },
          IX2VanillaPlugins: function () {
            return l;
          },
          IX2VanillaUtils: function () {
            return c;
          },
        });
        let i = s(n(2662)),
          a = s(n(8686)),
          r = s(n(3767)),
          o = s(n(5861)),
          l = s(n(1799)),
          c = s(n(4124));
        function u(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (u = function (e) {
            return e ? n : t;
          })(e);
        }
        function s(e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = u(t);
          if (n && n.has(e)) return n.get(e);
          var i = { __proto__: null },
            a = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var r in e)
            if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
              var o = a ? Object.getOwnPropertyDescriptor(e, r) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(i, r, o)
                : (i[r] = e[r]);
            }
          return (i.default = e), n && n.set(e, i), i;
        }
      },
      2662: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          ELEMENT_MATCHES: function () {
            return o;
          },
          FLEX_PREFIXED: function () {
            return l;
          },
          IS_BROWSER_ENV: function () {
            return a;
          },
          TRANSFORM_PREFIXED: function () {
            return c;
          },
          TRANSFORM_STYLE_PREFIXED: function () {
            return s;
          },
          withBrowser: function () {
            return r;
          },
        });
        let i = (function (e) {
            return e && e.__esModule ? e : { default: e };
          })(n(9777)),
          a = "undefined" != typeof window,
          r = (e, t) => (a ? e() : t),
          o = r(() =>
            (0, i.default)(
              [
                "matches",
                "matchesSelector",
                "mozMatchesSelector",
                "msMatchesSelector",
                "oMatchesSelector",
                "webkitMatchesSelector",
              ],
              (e) => e in Element.prototype
            )
          ),
          l = r(() => {
            let e = document.createElement("i"),
              t = [
                "flex",
                "-webkit-flex",
                "-ms-flexbox",
                "-moz-box",
                "-webkit-box",
              ];
            try {
              let { length: n } = t;
              for (let i = 0; i < n; i++) {
                let n = t[i];
                if (((e.style.display = n), e.style.display === n)) return n;
              }
              return "";
            } catch (e) {
              return "";
            }
          }, "flex"),
          c = r(() => {
            let e = document.createElement("i");
            if (null == e.style.transform) {
              let t = ["Webkit", "Moz", "ms"],
                { length: n } = t;
              for (let i = 0; i < n; i++) {
                let n = t[i] + "Transform";
                if (void 0 !== e.style[n]) return n;
              }
            }
            return "transform";
          }, "transform"),
          u = c.split("transform")[0],
          s = u ? u + "TransformStyle" : "transformStyle";
      },
      3767: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          applyEasing: function () {
            return c;
          },
          createBezierEasing: function () {
            return l;
          },
          optimizeFloat: function () {
            return o;
          },
        });
        let i = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = r(t);
            if (n && n.has(e)) return n.get(e);
            var i = { __proto__: null },
              a = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (
                "default" !== o &&
                Object.prototype.hasOwnProperty.call(e, o)
              ) {
                var l = a ? Object.getOwnPropertyDescriptor(e, o) : null;
                l && (l.get || l.set)
                  ? Object.defineProperty(i, o, l)
                  : (i[o] = e[o]);
              }
            return (i.default = e), n && n.set(e, i), i;
          })(n(8686)),
          a = (function (e) {
            return e && e.__esModule ? e : { default: e };
          })(n(1361));
        function r(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (r = function (e) {
            return e ? n : t;
          })(e);
        }
        function o(e, t = 5, n = 10) {
          let i = Math.pow(n, t),
            a = Number(Math.round(e * i) / i);
          return Math.abs(a) > 1e-4 ? a : 0;
        }
        function l(e) {
          return (0, a.default)(...e);
        }
        function c(e, t, n) {
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : n
            ? o(t > 0 ? n(t) : t)
            : o(t > 0 && e && i[e] ? i[e](t) : t);
        }
      },
      8686: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          bounce: function () {
            return k;
          },
          bouncePast: function () {
            return x;
          },
          ease: function () {
            return a;
          },
          easeIn: function () {
            return r;
          },
          easeInOut: function () {
            return l;
          },
          easeOut: function () {
            return o;
          },
          inBack: function () {
            return v;
          },
          inCirc: function () {
            return R;
          },
          inCubic: function () {
            return d;
          },
          inElastic: function () {
            return M;
          },
          inExpo: function () {
            return h;
          },
          inOutBack: function () {
            return P;
          },
          inOutCirc: function () {
            return A;
          },
          inOutCubic: function () {
            return p;
          },
          inOutElastic: function () {
            return D;
          },
          inOutExpo: function () {
            return S;
          },
          inOutQuad: function () {
            return s;
          },
          inOutQuart: function () {
            return g;
          },
          inOutQuint: function () {
            return m;
          },
          inOutSine: function () {
            return b;
          },
          inQuad: function () {
            return c;
          },
          inQuart: function () {
            return E;
          },
          inQuint: function () {
            return T;
          },
          inSine: function () {
            return _;
          },
          outBack: function () {
            return F;
          },
          outBounce: function () {
            return C;
          },
          outCirc: function () {
            return N;
          },
          outCubic: function () {
            return f;
          },
          outElastic: function () {
            return w;
          },
          outExpo: function () {
            return L;
          },
          outQuad: function () {
            return u;
          },
          outQuart: function () {
            return I;
          },
          outQuint: function () {
            return y;
          },
          outSine: function () {
            return O;
          },
          swingFrom: function () {
            return V;
          },
          swingFromTo: function () {
            return G;
          },
          swingTo: function () {
            return U;
          },
        });
        let i = (function (e) {
            return e && e.__esModule ? e : { default: e };
          })(n(1361)),
          a = (0, i.default)(0.25, 0.1, 0.25, 1),
          r = (0, i.default)(0.42, 0, 1, 1),
          o = (0, i.default)(0, 0, 0.58, 1),
          l = (0, i.default)(0.42, 0, 0.58, 1);
        function c(e) {
          return Math.pow(e, 2);
        }
        function u(e) {
          return -(Math.pow(e - 1, 2) - 1);
        }
        function s(e) {
          return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 2)
            : -0.5 * ((e -= 2) * e - 2);
        }
        function d(e) {
          return Math.pow(e, 3);
        }
        function f(e) {
          return Math.pow(e - 1, 3) + 1;
        }
        function p(e) {
          return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 3)
            : 0.5 * (Math.pow(e - 2, 3) + 2);
        }
        function E(e) {
          return Math.pow(e, 4);
        }
        function I(e) {
          return -(Math.pow(e - 1, 4) - 1);
        }
        function g(e) {
          return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 4)
            : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
        }
        function T(e) {
          return Math.pow(e, 5);
        }
        function y(e) {
          return Math.pow(e - 1, 5) + 1;
        }
        function m(e) {
          return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 5)
            : 0.5 * (Math.pow(e - 2, 5) + 2);
        }
        function _(e) {
          return -Math.cos((Math.PI / 2) * e) + 1;
        }
        function O(e) {
          return Math.sin((Math.PI / 2) * e);
        }
        function b(e) {
          return -0.5 * (Math.cos(Math.PI * e) - 1);
        }
        function h(e) {
          return 0 === e ? 0 : Math.pow(2, 10 * (e - 1));
        }
        function L(e) {
          return 1 === e ? 1 : -Math.pow(2, -10 * e) + 1;
        }
        function S(e) {
          return 0 === e
            ? 0
            : 1 === e
            ? 1
            : (e /= 0.5) < 1
            ? 0.5 * Math.pow(2, 10 * (e - 1))
            : 0.5 * (-Math.pow(2, -10 * --e) + 2);
        }
        function R(e) {
          return -(Math.sqrt(1 - e * e) - 1);
        }
        function N(e) {
          return Math.sqrt(1 - Math.pow(e - 1, 2));
        }
        function A(e) {
          return (e /= 0.5) < 1
            ? -0.5 * (Math.sqrt(1 - e * e) - 1)
            : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
        }
        function C(e) {
          if (e < 1 / 2.75) return 7.5625 * e * e;
          if (e < 2 / 2.75) return 7.5625 * (e -= 1.5 / 2.75) * e + 0.75;
          if (e < 2.5 / 2.75) return 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375;
          else return 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
        }
        function v(e) {
          return e * e * (2.70158 * e - 1.70158);
        }
        function F(e) {
          return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
        }
        function P(e) {
          let t = 1.70158;
          return (e /= 0.5) < 1
            ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
            : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
        }
        function M(e) {
          let t = 1.70158,
            n = 0,
            i = 1;
          return 0 === e
            ? 0
            : 1 === e
            ? 1
            : (!n && (n = 0.3),
              i < 1
                ? ((i = 1), (t = n / 4))
                : (t = (n / (2 * Math.PI)) * Math.asin(1 / i)),
              -(
                i *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin((2 * Math.PI * (e - t)) / n)
              ));
        }
        function w(e) {
          let t = 1.70158,
            n = 0,
            i = 1;
          return 0 === e
            ? 0
            : 1 === e
            ? 1
            : (!n && (n = 0.3),
              i < 1
                ? ((i = 1), (t = n / 4))
                : (t = (n / (2 * Math.PI)) * Math.asin(1 / i)),
              i * Math.pow(2, -10 * e) * Math.sin((2 * Math.PI * (e - t)) / n) +
                1);
        }
        function D(e) {
          let t = 1.70158,
            n = 0,
            i = 1;
          return 0 === e
            ? 0
            : 2 == (e /= 0.5)
            ? 1
            : (!n && (n = 0.3 * 1.5),
              i < 1
                ? ((i = 1), (t = n / 4))
                : (t = (n / (2 * Math.PI)) * Math.asin(1 / i)),
              e < 1)
            ? -0.5 *
              (i *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin((2 * Math.PI * (e - t)) / n))
            : i *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin((2 * Math.PI * (e - t)) / n) *
                0.5 +
              1;
        }
        function G(e) {
          let t = 1.70158;
          return (e /= 0.5) < 1
            ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
            : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
        }
        function V(e) {
          return e * e * (2.70158 * e - 1.70158);
        }
        function U(e) {
          return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
        }
        function k(e) {
          if (e < 1 / 2.75) return 7.5625 * e * e;
          if (e < 2 / 2.75) return 7.5625 * (e -= 1.5 / 2.75) * e + 0.75;
          if (e < 2.5 / 2.75) return 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375;
          else return 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
        }
        function x(e) {
          if (e < 1 / 2.75) return 7.5625 * e * e;
          if (e < 2 / 2.75) return 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75);
          if (e < 2.5 / 2.75)
            return 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375);
          else return 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
        }
      },
      1799: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          clearPlugin: function () {
            return p;
          },
          createPluginInstance: function () {
            return d;
          },
          getPluginConfig: function () {
            return l;
          },
          getPluginDestination: function () {
            return s;
          },
          getPluginDuration: function () {
            return u;
          },
          getPluginOrigin: function () {
            return c;
          },
          isPluginType: function () {
            return r;
          },
          renderPlugin: function () {
            return f;
          },
        });
        let i = n(2662),
          a = n(3690);
        function r(e) {
          return a.pluginMethodMap.has(e);
        }
        let o = (e) => (t) => {
            if (!i.IS_BROWSER_ENV) return () => null;
            let n = a.pluginMethodMap.get(t);
            if (!n) throw Error(`IX2 no plugin configured for: ${t}`);
            let r = n[e];
            if (!r) throw Error(`IX2 invalid plugin method: ${e}`);
            return r;
          },
          l = o("getPluginConfig"),
          c = o("getPluginOrigin"),
          u = o("getPluginDuration"),
          s = o("getPluginDestination"),
          d = o("createPluginInstance"),
          f = o("renderPlugin"),
          p = o("clearPlugin");
      },
      4124: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          cleanupHTMLElement: function () {
            return eW;
          },
          clearAllStyles: function () {
            return eB;
          },
          clearObjectCache: function () {
            return es;
          },
          getActionListProgress: function () {
            return e$;
          },
          getAffectedElements: function () {
            return em;
          },
          getComputedStyle: function () {
            return e_;
          },
          getDestinationValues: function () {
            return eA;
          },
          getElementId: function () {
            return eE;
          },
          getInstanceId: function () {
            return ef;
          },
          getInstanceOrigin: function () {
            return eL;
          },
          getItemConfigByKey: function () {
            return eN;
          },
          getMaxDurationItemIndex: function () {
            return eH;
          },
          getNamespacedParameterId: function () {
            return eq;
          },
          getRenderType: function () {
            return eC;
          },
          getStyleProp: function () {
            return ev;
          },
          mediaQueriesEqual: function () {
            return eJ;
          },
          observeStore: function () {
            return eT;
          },
          reduceListToGroup: function () {
            return ez;
          },
          reifyState: function () {
            return eI;
          },
          renderHTMLElement: function () {
            return eF;
          },
          shallowEqual: function () {
            return c.default;
          },
          shouldAllowMediaQuery: function () {
            return eZ;
          },
          shouldNamespaceEventParameter: function () {
            return eK;
          },
          stringifyTarget: function () {
            return e0;
          },
        });
        let i = p(n(4075)),
          a = p(n(1455)),
          r = p(n(5720)),
          o = n(1185),
          l = n(7087),
          c = p(n(7164)),
          u = n(3767),
          s = n(380),
          d = n(1799),
          f = n(2662);
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let {
            BACKGROUND: E,
            TRANSFORM: I,
            TRANSLATE_3D: g,
            SCALE_3D: T,
            ROTATE_X: y,
            ROTATE_Y: m,
            ROTATE_Z: _,
            SKEW: O,
            PRESERVE_3D: b,
            FLEX: h,
            OPACITY: L,
            FILTER: S,
            FONT_VARIATION_SETTINGS: R,
            WIDTH: N,
            HEIGHT: A,
            BACKGROUND_COLOR: C,
            BORDER_COLOR: v,
            COLOR: F,
            CHILDREN: P,
            IMMEDIATE_CHILDREN: M,
            SIBLINGS: w,
            PARENT: D,
            DISPLAY: G,
            WILL_CHANGE: V,
            AUTO: U,
            COMMA_DELIMITER: k,
            COLON_DELIMITER: x,
            BAR_DELIMITER: B,
            RENDER_TRANSFORM: X,
            RENDER_GENERAL: j,
            RENDER_STYLE: W,
            RENDER_PLUGIN: Q,
          } = l.IX2EngineConstants,
          {
            TRANSFORM_MOVE: Y,
            TRANSFORM_SCALE: H,
            TRANSFORM_ROTATE: z,
            TRANSFORM_SKEW: K,
            STYLE_OPACITY: q,
            STYLE_FILTER: Z,
            STYLE_FONT_VARIATION: J,
            STYLE_SIZE: ee,
            STYLE_BACKGROUND_COLOR: et,
            STYLE_BORDER: en,
            STYLE_TEXT_COLOR: ei,
            GENERAL_DISPLAY: ea,
            OBJECT_VALUE: er,
          } = l.ActionTypeConsts,
          eo = (e) => e.trim(),
          el = Object.freeze({ [et]: C, [en]: v, [ei]: F }),
          ec = Object.freeze({
            [f.TRANSFORM_PREFIXED]: I,
            [C]: E,
            [L]: L,
            [S]: S,
            [N]: N,
            [A]: A,
            [R]: R,
          }),
          eu = new Map();
        function es() {
          eu.clear();
        }
        let ed = 1;
        function ef() {
          return "i" + ed++;
        }
        let ep = 1;
        function eE(e, t) {
          for (let n in e) {
            let i = e[n];
            if (i && i.ref === t) return i.id;
          }
          return "e" + ep++;
        }
        function eI({ events: e, actionLists: t, site: n } = {}) {
          let i = (0, a.default)(
              e,
              (e, t) => {
                let { eventTypeId: n } = t;
                return !e[n] && (e[n] = {}), (e[n][t.id] = t), e;
              },
              {}
            ),
            r = n && n.mediaQueries,
            o = [];
          return (
            r
              ? (o = r.map((e) => e.key))
              : ((r = []),
                console.warn("IX2 missing mediaQueries in site data")),
            {
              ixData: {
                events: e,
                actionLists: t,
                eventTypeMap: i,
                mediaQueries: r,
                mediaQueryKeys: o,
              },
            }
          );
        }
        let eg = (e, t) => e === t;
        function eT({ store: e, select: t, onChange: n, comparator: i = eg }) {
          let { getState: a, subscribe: r } = e,
            o = r(function () {
              let r = t(a());
              if (null == r) {
                o();
                return;
              }
              !i(r, l) && n((l = r), e);
            }),
            l = t(a());
          return o;
        }
        function ey(e) {
          let t = typeof e;
          if ("string" === t) return { id: e };
          if (null != e && "object" === t) {
            let {
              id: t,
              objectId: n,
              selector: i,
              selectorGuids: a,
              appliesTo: r,
              useEventTarget: o,
            } = e;
            return {
              id: t,
              objectId: n,
              selector: i,
              selectorGuids: a,
              appliesTo: r,
              useEventTarget: o,
            };
          }
          return {};
        }
        function em({
          config: e,
          event: t,
          eventTarget: n,
          elementRoot: i,
          elementApi: a,
        }) {
          let r, o, c;
          if (!a) throw Error("IX2 missing elementApi");
          let { targets: u } = e;
          if (Array.isArray(u) && u.length > 0)
            return u.reduce(
              (e, r) =>
                e.concat(
                  em({
                    config: { target: r },
                    event: t,
                    eventTarget: n,
                    elementRoot: i,
                    elementApi: a,
                  })
                ),
              []
            );
          let {
              getValidDocument: s,
              getQuerySelector: d,
              queryDocument: p,
              getChildElements: E,
              getSiblingElements: I,
              matchSelector: g,
              elementContains: T,
              isSiblingNode: y,
            } = a,
            { target: m } = e;
          if (!m) return [];
          let {
            id: _,
            objectId: O,
            selector: b,
            selectorGuids: h,
            appliesTo: L,
            useEventTarget: S,
          } = ey(m);
          if (O) return [eu.has(O) ? eu.get(O) : eu.set(O, {}).get(O)];
          if (L === l.EventAppliesTo.PAGE) {
            let e = s(_);
            return e ? [e] : [];
          }
          let R = (t?.action?.config?.affectedElements ?? {})[_ || b] || {},
            N = !!(R.id || R.selector),
            A = t && d(ey(t.target));
          if (
            (N
              ? ((r = R.limitAffectedElements), (o = A), (c = d(R)))
              : (o = c = d({ id: _, selector: b, selectorGuids: h })),
            t && S)
          ) {
            let e = n && (c || !0 === S) ? [n] : p(A);
            if (c) {
              if (S === D) return p(c).filter((t) => e.some((e) => T(t, e)));
              if (S === P) return p(c).filter((t) => e.some((e) => T(e, t)));
              if (S === w) return p(c).filter((t) => e.some((e) => y(e, t)));
            }
            return e;
          }
          if (null == o || null == c) return [];
          if (f.IS_BROWSER_ENV && i) return p(c).filter((e) => i.contains(e));
          if (r === P) return p(o, c);
          if (r === M) return E(p(o)).filter(g(c));
          if (r === w) return I(p(o)).filter(g(c));
          else return p(c);
        }
        function e_({ element: e, actionItem: t }) {
          if (!f.IS_BROWSER_ENV) return {};
          let { actionTypeId: n } = t;
          switch (n) {
            case ee:
            case et:
            case en:
            case ei:
            case ea:
              return window.getComputedStyle(e);
            default:
              return {};
          }
        }
        let eO = /px/,
          eb = (e, t) =>
            t.reduce(
              (e, t) => (null == e[t.type] && (e[t.type] = eM[t.type]), e),
              e || {}
            ),
          eh = (e, t) =>
            t.reduce(
              (e, t) => (
                null == e[t.type] &&
                  (e[t.type] = ew[t.type] || t.defaultValue || 0),
                e
              ),
              e || {}
            );
        function eL(e, t = {}, n = {}, a, r) {
          let { getStyle: o } = r,
            { actionTypeId: l } = a;
          if ((0, d.isPluginType)(l)) return (0, d.getPluginOrigin)(l)(t[l], a);
          switch (a.actionTypeId) {
            case Y:
            case H:
            case z:
            case K:
              return t[a.actionTypeId] || eP[a.actionTypeId];
            case Z:
              return eb(t[a.actionTypeId], a.config.filters);
            case J:
              return eh(t[a.actionTypeId], a.config.fontVariations);
            case q:
              return { value: (0, i.default)(parseFloat(o(e, L)), 1) };
            case ee: {
              let t, r;
              let l = o(e, N),
                c = o(e, A);
              return (
                (t =
                  a.config.widthUnit === U
                    ? eO.test(l)
                      ? parseFloat(l)
                      : parseFloat(n.width)
                    : (0, i.default)(parseFloat(l), parseFloat(n.width))),
                {
                  widthValue: t,
                  heightValue: (r =
                    a.config.heightUnit === U
                      ? eO.test(c)
                        ? parseFloat(c)
                        : parseFloat(n.height)
                      : (0, i.default)(parseFloat(c), parseFloat(n.height))),
                }
              );
            }
            case et:
            case en:
            case ei:
              return (function ({
                element: e,
                actionTypeId: t,
                computedStyle: n,
                getStyle: a,
              }) {
                let r = el[t],
                  o = a(e, r),
                  l = (function (e, t) {
                    let n = e.exec(t);
                    return n ? n[1] : "";
                  })(eU, eV.test(o) ? o : n[r]).split(k);
                return {
                  rValue: (0, i.default)(parseInt(l[0], 10), 255),
                  gValue: (0, i.default)(parseInt(l[1], 10), 255),
                  bValue: (0, i.default)(parseInt(l[2], 10), 255),
                  aValue: (0, i.default)(parseFloat(l[3]), 1),
                };
              })({
                element: e,
                actionTypeId: a.actionTypeId,
                computedStyle: n,
                getStyle: o,
              });
            case ea:
              return { value: (0, i.default)(o(e, G), n.display) };
            case er:
              return t[a.actionTypeId] || { value: 0 };
            default:
              return;
          }
        }
        let eS = (e, t) => (t && (e[t.type] = t.value || 0), e),
          eR = (e, t) => (t && (e[t.type] = t.value || 0), e),
          eN = (e, t, n) => {
            if ((0, d.isPluginType)(e)) return (0, d.getPluginConfig)(e)(n, t);
            switch (e) {
              case Z: {
                let e = (0, r.default)(n.filters, ({ type: e }) => e === t);
                return e ? e.value : 0;
              }
              case J: {
                let e = (0, r.default)(
                  n.fontVariations,
                  ({ type: e }) => e === t
                );
                return e ? e.value : 0;
              }
              default:
                return n[t];
            }
          };
        function eA({ element: e, actionItem: t, elementApi: n }) {
          if ((0, d.isPluginType)(t.actionTypeId))
            return (0, d.getPluginDestination)(t.actionTypeId)(t.config);
          switch (t.actionTypeId) {
            case Y:
            case H:
            case z:
            case K: {
              let { xValue: e, yValue: n, zValue: i } = t.config;
              return { xValue: e, yValue: n, zValue: i };
            }
            case ee: {
              let { getStyle: i, setStyle: a, getProperty: r } = n,
                { widthUnit: o, heightUnit: l } = t.config,
                { widthValue: c, heightValue: u } = t.config;
              if (!f.IS_BROWSER_ENV) return { widthValue: c, heightValue: u };
              if (o === U) {
                let t = i(e, N);
                a(e, N, ""), (c = r(e, "offsetWidth")), a(e, N, t);
              }
              if (l === U) {
                let t = i(e, A);
                a(e, A, ""), (u = r(e, "offsetHeight")), a(e, A, t);
              }
              return { widthValue: c, heightValue: u };
            }
            case et:
            case en:
            case ei: {
              let {
                rValue: i,
                gValue: a,
                bValue: r,
                aValue: o,
                globalSwatchId: l,
              } = t.config;
              if (l && l.startsWith("--")) {
                let { getStyle: t } = n,
                  i = t(e, l),
                  a = (0, s.normalizeColor)(i);
                return {
                  rValue: a.red,
                  gValue: a.green,
                  bValue: a.blue,
                  aValue: a.alpha,
                };
              }
              return { rValue: i, gValue: a, bValue: r, aValue: o };
            }
            case Z:
              return t.config.filters.reduce(eS, {});
            case J:
              return t.config.fontVariations.reduce(eR, {});
            default: {
              let { value: e } = t.config;
              return { value: e };
            }
          }
        }
        function eC(e) {
          return /^TRANSFORM_/.test(e)
            ? X
            : /^STYLE_/.test(e)
            ? W
            : /^GENERAL_/.test(e)
            ? j
            : /^PLUGIN_/.test(e)
            ? Q
            : void 0;
        }
        function ev(e, t) {
          return e === W ? t.replace("STYLE_", "").toLowerCase() : null;
        }
        function eF(e, t, n, i, r, o, l, c, u) {
          switch (c) {
            case X:
              return (function (e, t, n, i, a) {
                let r = eG
                    .map((e) => {
                      let n = eP[e],
                        {
                          xValue: i = n.xValue,
                          yValue: a = n.yValue,
                          zValue: r = n.zValue,
                          xUnit: o = "",
                          yUnit: l = "",
                          zUnit: c = "",
                        } = t[e] || {};
                      switch (e) {
                        case Y:
                          return `${g}(${i}${o}, ${a}${l}, ${r}${c})`;
                        case H:
                          return `${T}(${i}${o}, ${a}${l}, ${r}${c})`;
                        case z:
                          return `${y}(${i}${o}) ${m}(${a}${l}) ${_}(${r}${c})`;
                        case K:
                          return `${O}(${i}${o}, ${a}${l})`;
                        default:
                          return "";
                      }
                    })
                    .join(" "),
                  { setStyle: o } = a;
                ek(e, f.TRANSFORM_PREFIXED, a),
                  o(e, f.TRANSFORM_PREFIXED, r),
                  (function (
                    { actionTypeId: e },
                    { xValue: t, yValue: n, zValue: i }
                  ) {
                    return (
                      (e === Y && void 0 !== i) ||
                      (e === H && void 0 !== i) ||
                      (e === z && (void 0 !== t || void 0 !== n))
                    );
                  })(i, n) && o(e, f.TRANSFORM_STYLE_PREFIXED, b);
              })(e, t, n, r, l);
            case W:
              return (function (e, t, n, i, r, o) {
                let { setStyle: l } = o;
                switch (i.actionTypeId) {
                  case ee: {
                    let { widthUnit: t = "", heightUnit: a = "" } = i.config,
                      { widthValue: r, heightValue: c } = n;
                    void 0 !== r &&
                      (t === U && (t = "px"), ek(e, N, o), l(e, N, r + t)),
                      void 0 !== c &&
                        (a === U && (a = "px"), ek(e, A, o), l(e, A, c + a));
                    break;
                  }
                  case Z:
                    !(function (e, t, n, i) {
                      let r = (0, a.default)(
                          t,
                          (e, t, i) => `${e} ${i}(${t}${eD(i, n)})`,
                          ""
                        ),
                        { setStyle: o } = i;
                      ek(e, S, i), o(e, S, r);
                    })(e, n, i.config, o);
                    break;
                  case J:
                    !(function (e, t, n, i) {
                      let r = (0, a.default)(
                          t,
                          (e, t, n) => (e.push(`"${n}" ${t}`), e),
                          []
                        ).join(", "),
                        { setStyle: o } = i;
                      ek(e, R, i), o(e, R, r);
                    })(e, n, i.config, o);
                    break;
                  case et:
                  case en:
                  case ei: {
                    let t = el[i.actionTypeId],
                      a = Math.round(n.rValue),
                      r = Math.round(n.gValue),
                      c = Math.round(n.bValue),
                      u = n.aValue;
                    ek(e, t, o),
                      l(
                        e,
                        t,
                        u >= 1
                          ? `rgb(${a},${r},${c})`
                          : `rgba(${a},${r},${c},${u})`
                      );
                    break;
                  }
                  default: {
                    let { unit: t = "" } = i.config;
                    ek(e, r, o), l(e, r, n.value + t);
                  }
                }
              })(e, t, n, r, o, l);
            case j:
              return (function (e, t, n) {
                let { setStyle: i } = n;
                if (t.actionTypeId === ea) {
                  let { value: n } = t.config;
                  i(e, G, n === h && f.IS_BROWSER_ENV ? f.FLEX_PREFIXED : n);
                  return;
                }
              })(e, r, l);
            case Q: {
              let { actionTypeId: e } = r;
              if ((0, d.isPluginType)(e))
                return (0, d.renderPlugin)(e)(u, t, r);
            }
          }
        }
        let eP = {
            [Y]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
            [H]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
            [z]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
            [K]: Object.freeze({ xValue: 0, yValue: 0 }),
          },
          eM = Object.freeze({
            blur: 0,
            "hue-rotate": 0,
            invert: 0,
            grayscale: 0,
            saturate: 100,
            sepia: 0,
            contrast: 100,
            brightness: 100,
          }),
          ew = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
          eD = (e, t) => {
            let n = (0, r.default)(t.filters, ({ type: t }) => t === e);
            if (n && n.unit) return n.unit;
            switch (e) {
              case "blur":
                return "px";
              case "hue-rotate":
                return "deg";
              default:
                return "%";
            }
          },
          eG = Object.keys(eP),
          eV = /^rgb/,
          eU = RegExp("rgba?\\(([^)]+)\\)");
        function ek(e, t, n) {
          if (!f.IS_BROWSER_ENV) return;
          let i = ec[t];
          if (!i) return;
          let { getStyle: a, setStyle: r } = n,
            o = a(e, V);
          if (!o) {
            r(e, V, i);
            return;
          }
          let l = o.split(k).map(eo);
          -1 === l.indexOf(i) && r(e, V, l.concat(i).join(k));
        }
        function ex(e, t, n) {
          if (!f.IS_BROWSER_ENV) return;
          let i = ec[t];
          if (!i) return;
          let { getStyle: a, setStyle: r } = n,
            o = a(e, V);
          if (!!o && -1 !== o.indexOf(i))
            r(
              e,
              V,
              o
                .split(k)
                .map(eo)
                .filter((e) => e !== i)
                .join(k)
            );
        }
        function eB({ store: e, elementApi: t }) {
          let { ixData: n } = e.getState(),
            { events: i = {}, actionLists: a = {} } = n;
          Object.keys(i).forEach((e) => {
            let n = i[e],
              { config: r } = n.action,
              { actionListId: o } = r,
              l = a[o];
            l && eX({ actionList: l, event: n, elementApi: t });
          }),
            Object.keys(a).forEach((e) => {
              eX({ actionList: a[e], elementApi: t });
            });
        }
        function eX({ actionList: e = {}, event: t, elementApi: n }) {
          let { actionItemGroups: i, continuousParameterGroups: a } = e;
          i &&
            i.forEach((e) => {
              ej({ actionGroup: e, event: t, elementApi: n });
            }),
            a &&
              a.forEach((e) => {
                let { continuousActionGroups: i } = e;
                i.forEach((e) => {
                  ej({ actionGroup: e, event: t, elementApi: n });
                });
              });
        }
        function ej({ actionGroup: e, event: t, elementApi: n }) {
          let { actionItems: i } = e;
          i.forEach((e) => {
            let i;
            let { actionTypeId: a, config: r } = e;
            (i = (0, d.isPluginType)(a)
              ? (t) => (0, d.clearPlugin)(a)(t, e)
              : eQ({ effect: eY, actionTypeId: a, elementApi: n })),
              em({ config: r, event: t, elementApi: n }).forEach(i);
          });
        }
        function eW(e, t, n) {
          let { setStyle: i, getStyle: a } = n,
            { actionTypeId: r } = t;
          if (r === ee) {
            let { config: n } = t;
            n.widthUnit === U && i(e, N, ""), n.heightUnit === U && i(e, A, "");
          }
          a(e, V) && eQ({ effect: ex, actionTypeId: r, elementApi: n })(e);
        }
        let eQ =
          ({ effect: e, actionTypeId: t, elementApi: n }) =>
          (i) => {
            switch (t) {
              case Y:
              case H:
              case z:
              case K:
                e(i, f.TRANSFORM_PREFIXED, n);
                break;
              case Z:
                e(i, S, n);
                break;
              case J:
                e(i, R, n);
                break;
              case q:
                e(i, L, n);
                break;
              case ee:
                e(i, N, n), e(i, A, n);
                break;
              case et:
              case en:
              case ei:
                e(i, el[t], n);
                break;
              case ea:
                e(i, G, n);
            }
          };
        function eY(e, t, n) {
          let { setStyle: i } = n;
          ex(e, t, n),
            i(e, t, ""),
            t === f.TRANSFORM_PREFIXED && i(e, f.TRANSFORM_STYLE_PREFIXED, "");
        }
        function eH(e) {
          let t = 0,
            n = 0;
          return (
            e.forEach((e, i) => {
              let { config: a } = e,
                r = a.delay + a.duration;
              r >= t && ((t = r), (n = i));
            }),
            n
          );
        }
        function e$(e, t) {
          let { actionItemGroups: n, useFirstGroupAsInitialState: i } = e,
            { actionItem: a, verboseTimeElapsed: r = 0 } = t,
            o = 0,
            l = 0;
          return (
            n.forEach((e, t) => {
              if (i && 0 === t) return;
              let { actionItems: n } = e,
                c = n[eH(n)],
                { config: u, actionTypeId: s } = c;
              a.id === c.id && (l = o + r);
              let d = eC(s) === j ? 0 : u.duration;
              o += u.delay + d;
            }),
            o > 0 ? (0, u.optimizeFloat)(l / o) : 0
          );
        }
        function ez({ actionList: e, actionItemId: t, rawData: n }) {
          let { actionItemGroups: i, continuousParameterGroups: a } = e,
            r = [],
            l = (e) => (
              r.push((0, o.mergeIn)(e, ["config"], { delay: 0, duration: 0 })),
              e.id === t
            );
          return (
            i && i.some(({ actionItems: e }) => e.some(l)),
            a &&
              a.some((e) => {
                let { continuousActionGroups: t } = e;
                return t.some(({ actionItems: e }) => e.some(l));
              }),
            (0, o.setIn)(n, ["actionLists"], {
              [e.id]: { id: e.id, actionItemGroups: [{ actionItems: r }] },
            })
          );
        }
        function eK(e, { basedOn: t }) {
          return (
            (e === l.EventTypeConsts.SCROLLING_IN_VIEW &&
              (t === l.EventBasedOn.ELEMENT || null == t)) ||
            (e === l.EventTypeConsts.MOUSE_MOVE && t === l.EventBasedOn.ELEMENT)
          );
        }
        function eq(e, t) {
          return e + x + t;
        }
        function eZ(e, t) {
          return null == t || -1 !== e.indexOf(t);
        }
        function eJ(e, t) {
          return (0, c.default)(e && e.sort(), t && t.sort());
        }
        function e0(e) {
          if ("string" == typeof e) return e;
          if (e.pluginElement && e.objectId)
            return e.pluginElement + B + e.objectId;
          if (e.objectId) return e.objectId;
          let { id: t = "", selector: n = "", useEventTarget: i = "" } = e;
          return t + B + n + B + i;
        }
      },
      7164: function (e, t) {
        "use strict";
        function n(e, t) {
          return e === t
            ? 0 !== e || 0 !== t || 1 / e == 1 / t
            : e != e && t != t;
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "default", {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
        let i = function (e, t) {
          if (n(e, t)) return !0;
          if (
            "object" != typeof e ||
            null === e ||
            "object" != typeof t ||
            null === t
          )
            return !1;
          let i = Object.keys(e),
            a = Object.keys(t);
          if (i.length !== a.length) return !1;
          for (let a = 0; a < i.length; a++)
            if (!Object.hasOwn(t, i[a]) || !n(e[i[a]], t[i[a]])) return !1;
          return !0;
        };
      },
      5861: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        !(function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, {
          createElementState: function () {
            return O;
          },
          ixElements: function () {
            return _;
          },
          mergeActionState: function () {
            return b;
          },
        });
        let i = n(1185),
          a = n(7087),
          {
            HTML_ELEMENT: r,
            PLAIN_OBJECT: o,
            ABSTRACT_NODE: l,
            CONFIG_X_VALUE: c,
            CONFIG_Y_VALUE: u,
            CONFIG_Z_VALUE: s,
            CONFIG_VALUE: d,
            CONFIG_X_UNIT: f,
            CONFIG_Y_UNIT: p,
            CONFIG_Z_UNIT: E,
            CONFIG_UNIT: I,
          } = a.IX2EngineConstants,
          {
            IX2_SESSION_STOPPED: g,
            IX2_INSTANCE_ADDED: T,
            IX2_ELEMENT_STATE_CHANGED: y,
          } = a.IX2EngineActionTypes,
          m = {},
          _ = (e = m, t = {}) => {
            switch (t.type) {
              case g:
                return m;
              case T: {
                let {
                    elementId: n,
                    element: a,
                    origin: r,
                    actionItem: o,
                    refType: l,
                  } = t.payload,
                  { actionTypeId: c } = o,
                  u = e;
                return (
                  (0, i.getIn)(u, [n, a]) !== a && (u = O(u, a, l, n, o)),
                  b(u, n, c, r, o)
                );
              }
              case y: {
                let {
                  elementId: n,
                  actionTypeId: i,
                  current: a,
                  actionItem: r,
                } = t.payload;
                return b(e, n, i, a, r);
              }
              default:
                return e;
            }
          };
        function O(e, t, n, a, r) {
          let l =
            n === o ? (0, i.getIn)(r, ["config", "target", "objectId"]) : null;
          return (0, i.mergeIn)(e, [a], {
            id: a,
            ref: t,
            refId: l,
            refType: n,
          });
        }
        function b(e, t, n, a, r) {
          let o = (function (e) {
            let { config: t } = e;
            return h.reduce((e, n) => {
              let i = n[0],
                a = n[1],
                r = t[i],
                o = t[a];
              return null != r && null != o && (e[a] = o), e;
            }, {});
          })(r);
          return (0, i.mergeIn)(e, [t, "refState", n], a, o);
        }
        let h = [
          [c, f],
          [u, p],
          [s, E],
          [d, I],
        ];
      },
      2874: function (e, t, n) {
        n(9461),
          n(7624),
          n(286),
          n(8334),
          n(2338),
          n(3695),
          n(322),
          n(1655),
          n(941),
          n(5134),
          n(9904),
          n(1724),
          n(2444),
          n(2274);
      },
      2274: function () {
        Webflow.require("ix2").init({
          events: {
            e: {
              id: "e",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-2" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                selector: ".asset_img",
                originalId:
                  "675be52a2c2e94036a804fe7|a3c38e5e-7d95-88bc-6554-bb6f1369cb1e",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".asset_img",
                  originalId:
                    "675be52a2c2e94036a804fe7|a3c38e5e-7d95-88bc-6554-bb6f1369cb1e",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 300,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c1385a4f,
            },
            "e-3": {
              id: "e-3",
              name: "",
              animationType: "custom",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  actionListId: "a",
                  affectedElements: {},
                  playInReverse: !1,
                  autoStopEventId: "e-4",
                },
              },
              mediaQueries: ["main", "medium"],
              target: {
                selector: ".box",
                originalId:
                  "675be52a2c2e94036a804fe7|663a0ad5-ef27-996a-fe49-c30c6a12a30a",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".box",
                  originalId:
                    "675be52a2c2e94036a804fe7|663a0ad5-ef27-996a-fe49-c30c6a12a30a",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 30,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c16535f7,
            },
            "e-5": {
              id: "e-5",
              name: "",
              animationType: "custom",
              eventTypeId: "SCROLLING_IN_VIEW",
              action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                  actionListId: "a-2",
                  affectedElements: {},
                  duration: 0,
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                selector: ".about_grid",
                originalId:
                  "675be52a2c2e94036a804fe7|87d7e1b1-26bf-bd96-5cb1-fc3b8247ead2",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".about_grid",
                  originalId:
                    "675be52a2c2e94036a804fe7|87d7e1b1-26bf-bd96-5cb1-fc3b8247ead2",
                  appliesTo: "CLASS",
                },
              ],
              config: [
                {
                  continuousParameterGroupId: "a-2-p",
                  smoothing: 92,
                  startsEntering: !0,
                  addStartOffset: !1,
                  addOffsetValue: 50,
                  startsExiting: !1,
                  addEndOffset: !1,
                  endOffsetValue: 50,
                },
              ],
              createdOn: 0x193c1688862,
            },
            "e-6": {
              id: "e-6",
              name: "",
              animationType: "custom",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  actionListId: "a-3",
                  affectedElements: {},
                  playInReverse: !1,
                  autoStopEventId: "e-7",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                selector: ".about_info",
                originalId:
                  "675be52a2c2e94036a804fe7|fd5f33ce-12f1-faff-8f1c-b8fdc0d498e0",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".about_info",
                  originalId:
                    "675be52a2c2e94036a804fe7|fd5f33ce-12f1-faff-8f1c-b8fdc0d498e0",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 40,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c16d14d1,
            },
            "e-7": {
              id: "e-7",
              name: "",
              animationType: "custom",
              eventTypeId: "SCROLL_OUT_OF_VIEW",
              action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  actionListId: "a-4",
                  affectedElements: {},
                  playInReverse: !1,
                  autoStopEventId: "e-6",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                selector: ".about_info",
                originalId:
                  "675be52a2c2e94036a804fe7|fd5f33ce-12f1-faff-8f1c-b8fdc0d498e0",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".about_info",
                  originalId:
                    "675be52a2c2e94036a804fe7|fd5f33ce-12f1-faff-8f1c-b8fdc0d498e0",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 30,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c16d14d1,
            },
            "e-8": {
              id: "e-8",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "PLUGIN_LOTTIE_EFFECT",
                instant: !1,
                config: {
                  actionListId: "pluginLottie",
                  autoStopEventId: "e-9",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|10ae44e8-f39b-5361-1fc7-4bc7324acee2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|10ae44e8-f39b-5361-1fc7-4bc7324acee2",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 50,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c35e712a,
            },
            "e-10": {
              id: "e-10",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "PLUGIN_LOTTIE_EFFECT",
                instant: !1,
                config: {
                  actionListId: "pluginLottie",
                  autoStopEventId: "e-11",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|ff538bc0-1fd1-7957-b2d5-27cc1c581a50",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|ff538bc0-1fd1-7957-b2d5-27cc1c581a50",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 50,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c36086b3,
            },
            "e-12": {
              id: "e-12",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-13" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|9694e291-2691-a26d-bcc1-eb9af17cb12d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|9694e291-2691-a26d-bcc1-eb9af17cb12d",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c52b60f7,
            },
            "e-14": {
              id: "e-14",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "PLUGIN_LOTTIE_EFFECT",
                instant: !1,
                config: {
                  actionListId: "pluginLottie",
                  autoStopEventId: "e-15",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|066d776f-0f5f-f9e9-da98-bfb137345bd2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|066d776f-0f5f-f9e9-da98-bfb137345bd2",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 50,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c5c23ad1,
            },
            "e-16": {
              id: "e-16",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "PLUGIN_LOTTIE_EFFECT",
                instant: !1,
                config: {
                  actionListId: "pluginLottie",
                  autoStopEventId: "e-17",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|1c0d9496-90a7-5e2b-e626-92fa215c9f75",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|1c0d9496-90a7-5e2b-e626-92fa215c9f75",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 50,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c5c24437,
            },
            "e-18": {
              id: "e-18",
              name: "",
              animationType: "custom",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  actionListId: "a-5",
                  affectedElements: {},
                  playInReverse: !1,
                  autoStopEventId: "e-19",
                },
              },
              mediaQueries: ["main", "medium"],
              target: {
                selector: ".buy_info",
                originalId:
                  "675be52a2c2e94036a804fe7|a2843e17-e11b-300c-9e73-997017fbe6d1",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".buy_info",
                  originalId:
                    "675be52a2c2e94036a804fe7|a2843e17-e11b-300c-9e73-997017fbe6d1",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 20,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c62be15c,
            },
            "e-20": {
              id: "e-20",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "FADE_EFFECT",
                instant: !1,
                config: { actionListId: "fadeIn", autoStopEventId: "e-21" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|08f43a1b-3629-862d-410f-c2257b267ef9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|08f43a1b-3629-862d-410f-c2257b267ef9",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 300,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c62e0a27,
            },
            "e-22": {
              id: "e-22",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-23" },
              },
              mediaQueries: ["main", "medium"],
              target: {
                selector: ".buy_dex",
                originalId:
                  "675be52a2c2e94036a804fe7|80af8fb7-fcc6-a310-5069-dc6556c590dc",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".buy_dex",
                  originalId:
                    "675be52a2c2e94036a804fe7|80af8fb7-fcc6-a310-5069-dc6556c590dc",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 300,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c62ec6a9,
            },
            "e-24": {
              id: "e-24",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-25" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                selector: ".comics_img",
                originalId:
                  "675be52a2c2e94036a804fe7|8dd730f7-9d9a-792e-36ff-9c8002c430fa",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".comics_img",
                  originalId:
                    "675be52a2c2e94036a804fe7|8dd730f7-9d9a-792e-36ff-9c8002c430fa",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c62f08a1,
            },
            "e-26": {
              id: "e-26",
              name: "",
              animationType: "custom",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  actionListId: "a-6",
                  affectedElements: {},
                  playInReverse: !1,
                  autoStopEventId: "e-27",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                selector: ".comics_item",
                originalId:
                  "675be52a2c2e94036a804fe7|faa83658-8780-3e42-f6fb-5534504f5579",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".comics_item",
                  originalId:
                    "675be52a2c2e94036a804fe7|faa83658-8780-3e42-f6fb-5534504f5579",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 20,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c62f4700,
            },
            "e-28": {
              id: "e-28",
              name: "",
              animationType: "custom",
              eventTypeId: "MOUSE_CLICK",
              action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  actionListId: "a-7",
                  affectedElements: {},
                  playInReverse: !1,
                  autoStopEventId: "e-29",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                selector: ".copy-button",
                originalId:
                  "675be52a2c2e94036a804fe7|37de1c98-fe6e-36f6-8907-b89a190dba4b",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".copy-button",
                  originalId:
                    "675be52a2c2e94036a804fe7|37de1c98-fe6e-36f6-8907-b89a190dba4b",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c6323e51,
            },
            "e-30": {
              id: "e-30",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-31" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|3796f3a5-b83e-7890-ffd2-233b84cce366",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|3796f3a5-b83e-7890-ffd2-233b84cce366",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c638f335,
            },
            "e-32": {
              id: "e-32",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "PLUGIN_LOTTIE_EFFECT",
                instant: !1,
                config: {
                  actionListId: "pluginLottie",
                  autoStopEventId: "e-33",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|8cca5340-facd-4757-fb41-70aa917ff67b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|8cca5340-facd-4757-fb41-70aa917ff67b",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 50,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c6396616,
            },
            "e-34": {
              id: "e-34",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "PLUGIN_LOTTIE_EFFECT",
                instant: !1,
                config: {
                  actionListId: "pluginLottie",
                  autoStopEventId: "e-35",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|6c6b0096-2ece-4814-2bf0-cd2f7a9297d3",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|6c6b0096-2ece-4814-2bf0-cd2f7a9297d3",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 50,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x193c63a686e,
            },
            "e-36": {
              id: "e-36",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: !1,
                config: {
                  actionListId: "slideInRight",
                  autoStopEventId: "e-37",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|48cf59d1-fda7-7a1e-d3ef-74409f35857e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|48cf59d1-fda7-7a1e-d3ef-74409f35857e",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "RIGHT",
                effectIn: !0,
              },
              createdOn: 0x193c6457f22,
            },
            "e-38": {
              id: "e-38",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: !1,
                config: {
                  actionListId: "slideInLeft",
                  autoStopEventId: "e-39",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|2467415e-0957-7335-b3fe-580c03b31858",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|2467415e-0957-7335-b3fe-580c03b31858",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "LEFT",
                effectIn: !0,
              },
              createdOn: 0x193c645c296,
            },
            "e-44": {
              id: "e-44",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-45" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|f63cbc6a-01b0-c56e-95d4-065080c06ed5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|f63cbc6a-01b0-c56e-95d4-065080c06ed5",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c647d069,
            },
            "e-46": {
              id: "e-46",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: !1,
                config: { actionListId: "slideInTop", autoStopEventId: "e-47" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|d437321a-a446-73fa-aee2-9fe1f5c81c76",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|d437321a-a446-73fa-aee2-9fe1f5c81c76",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 300,
                direction: "TOP",
                effectIn: !0,
              },
              createdOn: 0x193c64840fe,
            },
            "e-48": {
              id: "e-48",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-49" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|17300df2-a279-5a2d-0e72-ee8b75f43b2a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|17300df2-a279-5a2d-0e72-ee8b75f43b2a",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c64934b6,
            },
            "e-50": {
              id: "e-50",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-51" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|772e3177-4dc0-0ee3-6d15-1af72168e77d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|772e3177-4dc0-0ee3-6d15-1af72168e77d",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c6495f19,
            },
            "e-52": {
              id: "e-52",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-53" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|76f93d98-76a8-2a8a-3db8-83a0b949b210",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|76f93d98-76a8-2a8a-3db8-83a0b949b210",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c6498167,
            },
            "e-54": {
              id: "e-54",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-55" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|9d26be07-39cc-f98e-dfa7-d4fb9cba7f4a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|9d26be07-39cc-f98e-dfa7-d4fb9cba7f4a",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c679ae9c,
            },
            "e-56": {
              id: "e-56",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-57" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|ba347127-74e0-7ac4-cef8-e1aeefc6d610",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|ba347127-74e0-7ac4-cef8-e1aeefc6d610",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c67a6363,
            },
            "e-58": {
              id: "e-58",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-59" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|ba347127-74e0-7ac4-cef8-e1aeefc6d611",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|ba347127-74e0-7ac4-cef8-e1aeefc6d611",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c67a6363,
            },
            "e-60": {
              id: "e-60",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-61" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|4a2952f5-edff-c1e0-14ef-1c7c3d072734",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|4a2952f5-edff-c1e0-14ef-1c7c3d072734",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c67a6889,
            },
            "e-62": {
              id: "e-62",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-63" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|4a2952f5-edff-c1e0-14ef-1c7c3d072735",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|4a2952f5-edff-c1e0-14ef-1c7c3d072735",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193c67a6889,
            },
            "e-64": {
              id: "e-64",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "FADE_EFFECT",
                instant: !1,
                config: { actionListId: "fadeIn", autoStopEventId: "e-65" },
              },
              mediaQueries: ["small", "tiny"],
              target: {
                selector: ".buy_dex",
                originalId:
                  "675be52a2c2e94036a804fe7|80af8fb7-fcc6-a310-5069-dc6556c590dc",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".buy_dex",
                  originalId:
                    "675be52a2c2e94036a804fe7|80af8fb7-fcc6-a310-5069-dc6556c590dc",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193ca2a24cb,
            },
            "e-66": {
              id: "e-66",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-67" },
              },
              mediaQueries: ["small", "tiny"],
              target: {
                selector: ".buy_title_wrap",
                originalId:
                  "675be52a2c2e94036a804fe7|b62b2453-c4dc-16b0-30db-64d6f9d752db",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".buy_title_wrap",
                  originalId:
                    "675be52a2c2e94036a804fe7|b62b2453-c4dc-16b0-30db-64d6f9d752db",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193ca2a4b2f,
            },
            "e-68": {
              id: "e-68",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "SHRINK_EFFECT",
                instant: !1,
                config: { actionListId: "shrinkIn", autoStopEventId: "e-69" },
              },
              mediaQueries: ["small", "tiny"],
              target: {
                selector: ".buy_p",
                originalId:
                  "675be52a2c2e94036a804fe7|8d8fc37c-db67-86be-69b6-5d4f2a1d772f",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".buy_p",
                  originalId:
                    "675be52a2c2e94036a804fe7|8d8fc37c-db67-86be-69b6-5d4f2a1d772f",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193ca2a98eb,
            },
            "e-70": {
              id: "e-70",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-71" },
              },
              mediaQueries: ["small", "tiny"],
              target: {
                selector: ".box",
                originalId:
                  "675be52a2c2e94036a804fe7|663a0ad5-ef27-996a-fe49-c30c6a12a30a",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".box",
                  originalId:
                    "675be52a2c2e94036a804fe7|663a0ad5-ef27-996a-fe49-c30c6a12a30a",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x193cb79bd27,
            },
            "e-74": {
              id: "e-74",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-75" },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|26a17f03-bab3-d882-3f8a-f0283b516987",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|26a17f03-bab3-d882-3f8a-f0283b516987",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x1947514600a,
            },
            "e-76": {
              id: "e-76",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-77" },
              },
              mediaQueries: ["main", "medium"],
              target: {
                id: "675be52a2c2e94036a804fe7|2ce78710-f2be-3757-b01d-e016686bec88",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|2ce78710-f2be-3757-b01d-e016686bec88",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x194b35acce2,
            },
            "e-78": {
              id: "e-78",
              name: "",
              animationType: "custom",
              eventTypeId: "MOUSE_CLICK",
              action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  actionListId: "a-8",
                  affectedElements: {},
                  playInReverse: !1,
                  autoStopEventId: "e-79",
                },
              },
              mediaQueries: ["small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|93f1a70a-cca9-9b38-710a-c0a39b817315",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|93f1a70a-cca9-9b38-710a-c0a39b817315",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x194b7825670,
            },
            "e-80": {
              id: "e-80",
              name: "",
              animationType: "preset",
              eventTypeId: "MOUSE_CLICK",
              action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  actionListId: "a-8",
                  affectedElements: {},
                  playInReverse: !1,
                  autoStopEventId: "e-81",
                },
              },
              mediaQueries: ["small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|4c615ab0-7f35-316b-8f6d-ee670c783ca0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|4c615ab0-7f35-316b-8f6d-ee670c783ca0",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x194b785e862,
            },
            "e-82": {
              id: "e-82",
              name: "",
              animationType: "custom",
              eventTypeId: "MOUSE_CLICK",
              action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  actionListId: "a-9",
                  affectedElements: {},
                  playInReverse: !1,
                  autoStopEventId: "e-83",
                },
              },
              mediaQueries: ["main", "medium", "small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|4c615ab0-7f35-316b-8f6d-ee670c783ca0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|4c615ab0-7f35-316b-8f6d-ee670c783ca0",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
              },
              createdOn: 0x194b786b387,
            },
            "e-84": {
              id: "e-84",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-85" },
              },
              mediaQueries: ["main", "medium"],
              target: {
                selector: ".partners_row",
                originalId:
                  "675be52a2c2e94036a804fe7|ab5206f7-8f20-4c20-0ace-d3bc44af4bf4",
                appliesTo: "CLASS",
              },
              targets: [
                {
                  selector: ".partners_row",
                  originalId:
                    "675be52a2c2e94036a804fe7|ab5206f7-8f20-4c20-0ace-d3bc44af4bf4",
                  appliesTo: "CLASS",
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x194b788e4b5,
            },
            "e-86": {
              id: "e-86",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-87" },
              },
              mediaQueries: ["small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|3fe39840-1845-d8e9-6831-46ec17d77c40",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|3fe39840-1845-d8e9-6831-46ec17d77c40",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x194b78cda7d,
            },
            "e-88": {
              id: "e-88",
              name: "",
              animationType: "preset",
              eventTypeId: "SCROLL_INTO_VIEW",
              action: {
                id: "",
                actionTypeId: "GROW_EFFECT",
                instant: !1,
                config: { actionListId: "growIn", autoStopEventId: "e-89" },
              },
              mediaQueries: ["small", "tiny"],
              target: {
                id: "675be52a2c2e94036a804fe7|2ce78710-f2be-3757-b01d-e016686bec88",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
              targets: [
                {
                  id: "675be52a2c2e94036a804fe7|2ce78710-f2be-3757-b01d-e016686bec88",
                  appliesTo: "ELEMENT",
                  styleBlockIds: [],
                },
              ],
              config: {
                loop: !1,
                playInReverse: !1,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 300,
                direction: null,
                effectIn: !0,
              },
              createdOn: 0x194b78d1980,
            },
          },
          actionLists: {
            a: {
              id: "a",
              title: "About-h3 [Scroll IN]",
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      id: "a-n",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".about_info_top",
                          selectorGuids: [
                            "57bf3ac3-ec44-fd07-ef81-ad2615453c4b",
                          ],
                        },
                        yValue: 105,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-n-5",
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "SIBLINGS",
                          selector: ".about_p",
                          selectorGuids: [
                            "77106108-bb0a-7df2-32cf-4e7b715a1ddb",
                          ],
                        },
                        value: 0,
                        unit: "",
                      },
                    },
                    {
                      id: "a-n-3",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "SIBLINGS",
                          selector: ".about_p",
                          selectorGuids: [
                            "77106108-bb0a-7df2-32cf-4e7b715a1ddb",
                          ],
                        },
                        yValue: 20,
                        xUnit: "PX",
                        yUnit: "px",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      id: "a-n-2",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 800,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".about_info_top",
                          selectorGuids: [
                            "57bf3ac3-ec44-fd07-ef81-ad2615453c4b",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-n-4",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 100,
                        easing: "outQuint",
                        duration: 800,
                        target: {
                          useEventTarget: "SIBLINGS",
                          selector: ".about_p",
                          selectorGuids: [
                            "77106108-bb0a-7df2-32cf-4e7b715a1ddb",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "px",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-n-6",
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 100,
                        easing: "ease",
                        duration: 300,
                        target: {
                          useEventTarget: "SIBLINGS",
                          selector: ".about_p",
                          selectorGuids: [
                            "77106108-bb0a-7df2-32cf-4e7b715a1ddb",
                          ],
                        },
                        value: 1,
                        unit: "",
                      },
                    },
                  ],
                },
              ],
              useFirstGroupAsInitialState: !0,
              createdOn: 0x193c16549e4,
            },
            "a-2": {
              id: "a-2",
              title: "Timeline",
              continuousParameterGroups: [
                {
                  id: "a-2-p",
                  type: "SCROLL_PROGRESS",
                  parameterLabel: "Scroll",
                  continuousActionGroups: [
                    {
                      keyframe: 20,
                      actionItems: [
                        {
                          id: "a-2-n",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                            delay: 0,
                            easing: "",
                            duration: 500,
                            target: {
                              useEventTarget: "CHILDREN",
                              selector: ".timeline_scroll",
                              selectorGuids: [
                                "3af330ab-359f-e660-eecb-9746a3635c86",
                              ],
                            },
                            heightValue: 20,
                            widthUnit: "PX",
                            heightUnit: "%",
                            locked: !1,
                          },
                        },
                      ],
                    },
                    {
                      keyframe: 77,
                      actionItems: [
                        {
                          id: "a-2-n-2",
                          actionTypeId: "STYLE_SIZE",
                          config: {
                            delay: 0,
                            easing: "",
                            duration: 500,
                            target: {
                              useEventTarget: "CHILDREN",
                              selector: ".timeline_scroll",
                              selectorGuids: [
                                "3af330ab-359f-e660-eecb-9746a3635c86",
                              ],
                            },
                            heightValue: 98,
                            widthUnit: "PX",
                            heightUnit: "%",
                            locked: !1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
              createdOn: 0x193c168a036,
            },
            "a-3": {
              id: "a-3",
              title: "About Info [Scroll IN]",
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      id: "a-3-n",
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".about_info",
                          selectorGuids: [
                            "b898ff78-f43b-047d-c37c-b8259ff6faf4",
                          ],
                        },
                        value: 0.3,
                        unit: "",
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      id: "a-3-n-2",
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "ease",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".about_info",
                          selectorGuids: [
                            "b898ff78-f43b-047d-c37c-b8259ff6faf4",
                          ],
                        },
                        value: 1,
                        unit: "",
                      },
                    },
                  ],
                },
              ],
              useFirstGroupAsInitialState: !0,
              createdOn: 0x193c16d274d,
            },
            "a-4": {
              id: "a-4",
              title: "About Info [Scroll OUT]",
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      id: "a-4-n-2",
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "ease",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".about_info",
                          selectorGuids: [
                            "b898ff78-f43b-047d-c37c-b8259ff6faf4",
                          ],
                        },
                        value: 0.3,
                        unit: "",
                      },
                    },
                  ],
                },
              ],
              useFirstGroupAsInitialState: !1,
              createdOn: 0x193c16d274d,
            },
            "a-5": {
              id: "a-5",
              title: "Buy Info [Scroll IN]",
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      id: "a-5-n",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".buy_title_step",
                          selectorGuids: [
                            "09c87513-7719-3da4-025b-984b30250b48",
                          ],
                        },
                        yValue: 105,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-5-n-2",
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".buy_p",
                          selectorGuids: [
                            "1f2cbcdd-2657-4499-2487-1d141800c47a",
                          ],
                        },
                        value: 0,
                        unit: "",
                      },
                    },
                    {
                      id: "a-5-n-3",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".buy_p",
                          selectorGuids: [
                            "1f2cbcdd-2657-4499-2487-1d141800c47a",
                          ],
                        },
                        yValue: 20,
                        xUnit: "PX",
                        yUnit: "px",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-5-n-7",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".buy_title_h3",
                          selectorGuids: [
                            "aa3e4375-87b7-e324-c31e-2c1db661c4e4",
                          ],
                        },
                        yValue: 105,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      id: "a-5-n-4",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 800,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".buy_title_step",
                          selectorGuids: [
                            "09c87513-7719-3da4-025b-984b30250b48",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-5-n-8",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 100,
                        easing: "outQuart",
                        duration: 800,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".buy_title_h3",
                          selectorGuids: [
                            "aa3e4375-87b7-e324-c31e-2c1db661c4e4",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-5-n-5",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 200,
                        easing: "outQuint",
                        duration: 800,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".buy_p",
                          selectorGuids: [
                            "1f2cbcdd-2657-4499-2487-1d141800c47a",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "px",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-5-n-6",
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 200,
                        easing: "ease",
                        duration: 300,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".buy_p",
                          selectorGuids: [
                            "1f2cbcdd-2657-4499-2487-1d141800c47a",
                          ],
                        },
                        value: 1,
                        unit: "",
                      },
                    },
                  ],
                },
              ],
              useFirstGroupAsInitialState: !0,
              createdOn: 0x193c16549e4,
            },
            "a-6": {
              id: "a-6",
              title: "Comics [Scroll IN]",
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      id: "a-6-n",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".comics_h3",
                          selectorGuids: [
                            "b95b55eb-4dd4-0271-0124-dfaaddb19da8",
                          ],
                        },
                        yValue: 105,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-6-n-4",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".comics_billion",
                          selectorGuids: [
                            "7ff11e49-bd7c-13a7-0bb7-5a6a5f30624d",
                          ],
                        },
                        yValue: 105,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      id: "a-6-n-5",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 800,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".comics_h3",
                          selectorGuids: [
                            "b95b55eb-4dd4-0271-0124-dfaaddb19da8",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-6-n-6",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 100,
                        easing: "outQuart",
                        duration: 800,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".comics_billion",
                          selectorGuids: [
                            "7ff11e49-bd7c-13a7-0bb7-5a6a5f30624d",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
              ],
              useFirstGroupAsInitialState: !0,
              createdOn: 0x193c16549e4,
            },
            "a-7": {
              id: "a-7",
              title: "Button Copy [Click]",
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      id: "a-7-n",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".hero_button_copy",
                          selectorGuids: [
                            "7501eaf8-0db2-da64-8faf-eb522192dab3",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-7-n-2",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".svg_check",
                          selectorGuids: [
                            "26a76d39-dc78-89b8-5ceb-77e44b42cc74",
                          ],
                        },
                        yValue: 105,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      id: "a-7-n-3",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".hero_button_copy",
                          selectorGuids: [
                            "7501eaf8-0db2-da64-8faf-eb522192dab3",
                          ],
                        },
                        yValue: -105,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-7-n-4",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 500,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".svg_check",
                          selectorGuids: [
                            "26a76d39-dc78-89b8-5ceb-77e44b42cc74",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      id: "a-7-n-6",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 400,
                        easing: "inQuart",
                        duration: 300,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".svg_check",
                          selectorGuids: [
                            "26a76d39-dc78-89b8-5ceb-77e44b42cc74",
                          ],
                        },
                        yValue: 105,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                    {
                      id: "a-7-n-5",
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 400,
                        easing: "inQuart",
                        duration: 300,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".hero_button_copy",
                          selectorGuids: [
                            "7501eaf8-0db2-da64-8faf-eb522192dab3",
                          ],
                        },
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "%",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
              ],
              useFirstGroupAsInitialState: !0,
              createdOn: 0x193c6324e12,
            },
            "a-8": {
              id: "a-8",
              title: "Partners [Mobile]",
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      id: "a-8-n",
                      actionTypeId: "GENERAL_DISPLAY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 0,
                        target: {
                          useEventTarget: "CHILDREN",
                          selector: ".partners_row.is-middle.is-2",
                          selectorGuids: [
                            "4ba59d10-14ad-9106-79a8-14eb06a606d7",
                            "20ab3274-5057-d292-8b3d-45b425fe038b",
                            "914698ec-920c-8992-ab56-b9822b803c65",
                          ],
                        },
                        value: "flex",
                      },
                    },
                    {
                      id: "a-8-n-5",
                      actionTypeId: "GENERAL_DISPLAY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 0,
                        target: {
                          useEventTarget: "SIBLINGS",
                          id: "675be52a2c2e94036a804fe7|4c615ab0-7f35-316b-8f6d-ee670c783ca0",
                        },
                        value: "flex",
                      },
                    },
                    {
                      id: "a-8-n-4",
                      actionTypeId: "GENERAL_DISPLAY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 0,
                        target: {
                          id: "675be52a2c2e94036a804fe7|93f1a70a-cca9-9b38-710a-c0a39b817315",
                        },
                        value: "none",
                      },
                    },
                    {
                      id: "a-8-n-3",
                      actionTypeId: "GENERAL_DISPLAY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 0,
                        target: {
                          useEventTarget: "SIBLINGS",
                          selector: ".partners_row.is-2",
                          selectorGuids: [
                            "4ba59d10-14ad-9106-79a8-14eb06a606d7",
                            "f89a3de3-d665-649c-28d2-a532d579165e",
                          ],
                        },
                        value: "flex",
                      },
                    },
                  ],
                },
              ],
              useFirstGroupAsInitialState: !1,
              createdOn: 0x194b78276ec,
            },
            "a-9": {
              id: "a-9",
              title: "Partners 2 [Click]",
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      id: "a-9-n-2",
                      actionTypeId: "GENERAL_DISPLAY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 0,
                        target: {
                          useEventTarget: "SIBLINGS",
                          selector: ".partners_row.is-middle.is-3",
                          selectorGuids: [
                            "4ba59d10-14ad-9106-79a8-14eb06a606d7",
                            "20ab3274-5057-d292-8b3d-45b425fe038b",
                            "0c28d89f-b2d5-1771-efab-c7b854134734",
                          ],
                        },
                        value: "flex",
                      },
                    },
                    {
                      id: "a-9-n-4",
                      actionTypeId: "GENERAL_DISPLAY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 0,
                        target: {
                          id: "675be52a2c2e94036a804fe7|4c615ab0-7f35-316b-8f6d-ee670c783ca0",
                        },
                        value: "none",
                      },
                    },
                    {
                      id: "a-9-n-3",
                      actionTypeId: "GENERAL_DISPLAY",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 0,
                        target: {
                          useEventTarget: "SIBLINGS",
                          selector: ".partners_row.is-3",
                          selectorGuids: [
                            "4ba59d10-14ad-9106-79a8-14eb06a606d7",
                            "cc3ae357-2856-cc06-2d30-fc001cab8418",
                          ],
                        },
                        value: "flex",
                      },
                    },
                  ],
                },
              ],
              useFirstGroupAsInitialState: !1,
              createdOn: 0x194b786c425,
            },
            shrinkIn: {
              id: "shrinkIn",
              useFirstGroupAsInitialState: !0,
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 0,
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "TRANSFORM_SCALE",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: 1.25,
                        yValue: 1.25,
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "TRANSFORM_SCALE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: 1,
                        yValue: 1,
                      },
                    },
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 1,
                      },
                    },
                  ],
                },
              ],
            },
            pluginLottie: {
              id: "pluginLottie",
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      actionTypeId: "PLUGIN_LOTTIE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 0,
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "PLUGIN_LOTTIE",
                      config: {
                        delay: 0,
                        easing: "",
                        duration: "auto",
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 100,
                      },
                    },
                  ],
                },
              ],
            },
            fadeIn: {
              id: "fadeIn",
              useFirstGroupAsInitialState: !0,
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 0,
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 1,
                      },
                    },
                  ],
                },
              ],
            },
            growIn: {
              id: "growIn",
              useFirstGroupAsInitialState: !0,
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 0,
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "TRANSFORM_SCALE",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: 0.7500000000000001,
                        yValue: 0.7500000000000001,
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "TRANSFORM_SCALE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: 1,
                        yValue: 1,
                      },
                    },
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 1,
                      },
                    },
                  ],
                },
              ],
            },
            slideInRight: {
              id: "slideInRight",
              useFirstGroupAsInitialState: !0,
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 0,
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: 100,
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "PX",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 1,
                      },
                    },
                    {
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: 0,
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "PX",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
              ],
            },
            slideInLeft: {
              id: "slideInLeft",
              useFirstGroupAsInitialState: !0,
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 0,
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: -100,
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "PX",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 1,
                      },
                    },
                    {
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: 0,
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "PX",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
              ],
            },
            slideInTop: {
              id: "slideInTop",
              useFirstGroupAsInitialState: !0,
              actionItemGroups: [
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 0,
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        duration: 0,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: 0,
                        yValue: -100,
                        xUnit: "PX",
                        yUnit: "PX",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
                {
                  actionItems: [
                    {
                      actionTypeId: "STYLE_OPACITY",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        value: 1,
                      },
                    },
                    {
                      actionTypeId: "TRANSFORM_MOVE",
                      config: {
                        delay: 0,
                        easing: "outQuart",
                        duration: 1e3,
                        target: {
                          id: "N/A",
                          appliesTo: "TRIGGER_ELEMENT",
                          useEventTarget: !0,
                        },
                        xValue: 0,
                        yValue: 0,
                        xUnit: "PX",
                        yUnit: "PX",
                        zUnit: "PX",
                      },
                    },
                  ],
                },
              ],
            },
          },
          site: {
            mediaQueries: [
              { key: "main", min: 992, max: 1e4 },
              { key: "medium", min: 768, max: 991 },
              { key: "small", min: 480, max: 767 },
              { key: "tiny", min: 0, max: 479 },
            ],
          },
        });
      },
    },
    t = {};
  function n(i) {
    var a = t[i];
    if (void 0 !== a) return a.exports;
    var r = (t[i] = { id: i, loaded: !1, exports: {} });
    return e[i].call(r.exports, r, r.exports, n), (r.loaded = !0), r.exports;
  }
  (n.m = e),
    (n.d = function (e, t) {
      for (var i in t)
        n.o(t, i) &&
          !n.o(e, i) &&
          Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
    }),
    (n.hmd = function (e) {
      return (
        !(e = Object.create(e)).children && (e.children = []),
        Object.defineProperty(e, "exports", {
          enumerable: !0,
          set: function () {
            throw Error(
              "ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " +
                e.id
            );
          },
        }),
        e
      );
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.nmd = function (e) {
      return (e.paths = []), !e.children && (e.children = []), e;
    }),
    (() => {
      var e = [];
      n.O = function (t, i, a, r) {
        if (i) {
          r = r || 0;
          for (var o = e.length; o > 0 && e[o - 1][2] > r; o--) e[o] = e[o - 1];
          e[o] = [i, a, r];
          return;
        }
        for (var l = 1 / 0, o = 0; o < e.length; o++) {
          for (
            var i = e[o][0], a = e[o][1], r = e[o][2], c = !0, u = 0;
            u < i.length;
            u++
          )
            (!1 & r || l >= r) &&
            Object.keys(n.O).every(function (e) {
              return n.O[e](i[u]);
            })
              ? i.splice(u--, 1)
              : ((c = !1), r < l && (l = r));
          if (c) {
            e.splice(o--, 1);
            var s = a();
            void 0 !== s && (t = s);
          }
        }
        return t;
      };
    })(),
    (n.rv = function () {
      return "1.1.8";
    }),
    (() => {
      var e = { 851: 0 };
      n.O.j = function (t) {
        return 0 === e[t];
      };
      var t = function (t, i) {
          var a = i[0],
            r = i[1],
            o = i[2],
            l,
            c,
            u = 0;
          if (
            a.some(function (t) {
              return 0 !== e[t];
            })
          ) {
            for (l in r) n.o(r, l) && (n.m[l] = r[l]);
            if (o) var s = o(n);
          }
          for (t && t(i); u < a.length; u++)
            (c = a[u]), n.o(e, c) && e[c] && e[c][0](), (e[c] = 0);
          return n.O(s);
        },
        i = (self.webpackChunk = self.webpackChunk || []);
      i.forEach(t.bind(null, 0)), (i.push = t.bind(null, i.push.bind(i)));
    })(),
    (n.ruid = "bundler=rspack@1.1.8");
  var i = n.O(void 0, ["910", "802"], function () {
    return n("2874");
  });
  i = n.O(i);
})();
