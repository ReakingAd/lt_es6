!function(e, t) {
    function i(e) {
        return function(t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        }
    }
    function a() {
        return k++
    }
    function n(e) {
        return e.match(M)[0]
    }
    function o(e) {
        for (e = e.replace(L, "/"); e.match(N); )
            e = e.replace(N, "/");
        return e
    }
    function r(e) {
        var t = e.length - 1;
        return "#" === e.charAt(t) ? e.substring(0, t) : ".js" === e.substring(t - 2) || e.indexOf("?") > 0 || ".css" === e.substring(t - 3) ? e : e + ".js"
    }
    function s(e) {
        var t = x.alias;
        return t && A(t[e]) ? t[e] : e
    }
    function l(e) {
        var t, i = x.paths;
        return i && (t = e.match(R)) && A(i[t[1]]) && (e = i[t[1]] + t[2]),
        e
    }
    function c(e) {
        var t = x.vars;
        return t && e.indexOf("{") > -1 && (e = e.replace(W, function(e, i) {
            return A(t[i]) ? t[i] : e
        })),
        e
    }
    function d(e) {
        var t = x.map
          , i = e;
        if (t)
            for (var a = 0, n = t.length; n > a; a++) {
                var o = t[a];
                if (i = C(o) ? o(e) || e : e.replace(o[0], o[1]),
                i !== e)
                    break
            }
        return i
    }
    function u(e, t) {
        var i, a = e.charAt(0);
        if (j.test(e))
            i = e;
        else if ("." === a)
            i = o((t ? n(t) : x.cwd) + e);
        else if ("/" === a) {
            var r = x.cwd.match(P);
            i = r ? r[0] + e.substring(1) : e
        } else
            i = x.base + e;
        return i
    }
    function p(e, t) {
        if (!e)
            return "";
        e = s(e),
        e = l(e),
        e = c(e),
        e = r(e);
        var i = u(e, t);
        return i = d(i)
    }
    function h(e) {
        return e.hasAttribute ? e.src : e.getAttribute("src", 4)
    }
    function f(e, t, i) {
        var a = V.test(e)
          , n = H.createElement(a ? "link" : "script");
        if (i) {
            var o = C(i) ? i(e) : i;
            o && (n.charset = o)
        }
        m(n, t, a),
        a ? (n.rel = "stylesheet",
        n.href = e) : (n.async = !0,
        n.src = e),
        D = n,
        G ? z.insertBefore(n, G) : z.appendChild(n),
        D = null
    }
    function m(e, t, i) {
        var a = i && (Q || !("onload"in e));
        return a ? (setTimeout(function() {
            g(e, t)
        }, 1),
        void 0) : (e.onload = e.onerror = e.onreadystatechange = function() {
            X.test(e.readyState) && (e.onload = e.onerror = e.onreadystatechange = null ,
            i || x.debug || z.removeChild(e),
            e = null ,
            t())
        }
        ,
        void 0)
    }
    function g(e, t) {
        var i, a = e.sheet;
        if (Q)
            a && (i = !0);
        else if (a)
            try {
                a.cssRules && (i = !0)
            } catch (n) {
                "NS_ERROR_DOM_SECURITY_ERR" === n.name && (i = !0)
            }
        setTimeout(function() {
            i ? t() : g(e, t)
        }, 20)
    }
    function v() {
        if (D)
            return D;
        if (I && "interactive" === I.readyState)
            return I;
        for (var e = z.getElementsByTagName("script"), t = e.length - 1; t >= 0; t--) {
            var i = e[t];
            if ("interactive" === i.readyState)
                return I = i
        }
    }
    function b(e) {
        var t = [];
        return e.replace(K, "").replace(Y, function(e, i, a) {
            a && t.push(a)
        }),
        t
    }
    function y(e, t) {
        this.uri = e,
        this.dependencies = t || [],
        this.exports = null ,
        this.status = 0,
        this._waitings = {},
        this._remain = 0
    }
    if (!e.seajs) {
        var w = e.seajs = {
            version: "2.1.1"
        }
          , x = w.data = {}
          , T = i("Object")
          , A = i("String")
          , S = Array.isArray || i("Array")
          , C = i("Function")
          , k = 0
          , _ = x.events = {};
        w.on = function(e, t) {
            var i = _[e] || (_[e] = []);
            return i.push(t),
            w
        }
        ,
        w.off = function(e, t) {
            if (!e && !t)
                return _ = x.events = {},
                w;
            var i = _[e];
            if (i)
                if (t)
                    for (var a = i.length - 1; a >= 0; a--)
                        i[a] === t && i.splice(a, 1);
                else
                    delete _[e];
            return w
        }
        ;
        var D, I, $, E = w.emit = function(e, t) {
            var i, a = _[e];
            if (a)
                for (a = a.slice(); i = a.shift(); )
                    i(t);
            return w
        }
        , M = /[^?#]*\//, L = /\/\.\//g, N = /\/[^/]+\/\.\.\//, R = /^([^/:]+)(\/.+)$/, W = /{([^{]+)}/g, j = /^\/\/.|:\//, P = /^.*?\/\/.*?\//, H = document, U = location, B = n(U.href), O = H.getElementsByTagName("script"), F = H.getElementById("seajsnode") || O[O.length - 1], q = n(h(F) || B), z = H.getElementsByTagName("head")[0] || H.documentElement, G = z.getElementsByTagName("base")[0], V = /\.css(?:\?|$)/i, X = /^(?:loaded|complete|undefined)$/, Q = 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536, Y = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, K = /\\\\/g, J = w.cache = {}, Z = {}, et = {}, tt = {}, it = y.STATUS = {
            FETCHING: 1,
            SAVED: 2,
            LOADING: 3,
            LOADED: 4,
            EXECUTING: 5,
            EXECUTED: 6
        };
        y.prototype.resolve = function() {
            for (var e = this, t = e.dependencies, i = [], a = 0, n = t.length; n > a; a++)
                i[a] = y.resolve(t[a], e.uri);
            return i
        }
        ,
        y.prototype.load = function() {
            var e = this;
            if (!(e.status >= it.LOADING)) {
                e.status = it.LOADING;
                var t = e.resolve();
                E("load", t);
                for (var i, a = e._remain = t.length, n = 0; a > n; n++)
                    i = y.get(t[n]),
                    i.status < it.LOADED ? i._waitings[e.uri] = (i._waitings[e.uri] || 0) + 1 : e._remain--;
                if (0 === e._remain)
                    return e.onload(),
                    void 0;
                var o = {};
                for (n = 0; a > n; n++)
                    i = J[t[n]],
                    i.status < it.FETCHING ? i.fetch(o) : i.status === it.SAVED && i.load();
                for (var r in o)
                    o.hasOwnProperty(r) && o[r]()
            }
        }
        ,
        y.prototype.onload = function() {
            var e = this;
            e.status = it.LOADED,
            e.callback && e.callback();
            var t, i, a = e._waitings;
            for (t in a)
                a.hasOwnProperty(t) && (i = J[t],
                i._remain -= a[t],
                0 === i._remain && i.onload());
            delete e._waitings,
            delete e._remain
        }
        ,
        y.prototype.fetch = function(e) {
            function t() {
                f(o.requestUri, o.onRequest, o.charset)
            }
            function i() {
                delete Z[r],
                et[r] = !0,
                $ && (y.save(n, $),
                $ = null );
                var e, t = tt[r];
                for (delete tt[r]; e = t.shift(); )
                    e.load()
            }
            var a = this
              , n = a.uri;
            a.status = it.FETCHING;
            var o = {
                uri: n
            };
            E("fetch", o);
            var r = o.requestUri || n;
            return !r || et[r] ? (a.load(),
            void 0) : Z[r] ? (tt[r].push(a),
            void 0) : (Z[r] = !0,
            tt[r] = [a],
            E("request", o = {
                uri: n,
                requestUri: r,
                onRequest: i,
                charset: x.charset
            }),
            o.requested || (e ? e[o.requestUri] = t : t()),
            void 0)
        }
        ,
        y.prototype.exec = function() {
            function require(e) {
                return y.get(require.resolve(e)).exec()
            }
            var e = this;
            if (e.status >= it.EXECUTING)
                return e.exports;
            e.status = it.EXECUTING;
            var i = e.uri;
            require.resolve = function(e) {
                return y.resolve(e, i)
            }
            ,
            require.async = function(e, t) {
                return y.use(e, t, i + "_async_" + a()),
                require
            }
            ;
            var n = e.factory
              , o = C(n) ? n(require, e.exports = {}, e) : n;
            return o === t && (o = e.exports),
            null !== o || V.test(i) || E("error", e),
            delete e.factory,
            e.exports = o,
            e.status = it.EXECUTED,
            E("exec", e),
            o
        }
        ,
        y.resolve = function(e, t) {
            var i = {
                id: e,
                refUri: t
            };
            return E("resolve", i),
            i.uri || p(i.id, t)
        }
        ,
        y.define = function(e, i, a) {
            var n = arguments.length;
            1 === n ? (a = e,
            e = t) : 2 === n && (a = i,
            S(e) ? (i = e,
            e = t) : i = t),
            !S(i) && C(a) && (i = b(a.toString()));
            var o = {
                id: e,
                uri: y.resolve(e),
                deps: i,
                factory: a
            };
            if (!o.uri && H.attachEvent) {
                var r = v();
                r && (o.uri = r.src)
            }
            E("define", o),
            o.uri ? y.save(o.uri, o) : $ = o
        }
        ,
        y.save = function(e, t) {
            var i = y.get(e);
            i.status < it.SAVED && (i.id = t.id || e,
            i.dependencies = t.deps || [],
            i.factory = t.factory,
            i.status = it.SAVED)
        }
        ,
        y.get = function(e, t) {
            return J[e] || (J[e] = new y(e,t))
        }
        ,
        y.use = function(t, i, a) {
            var n = y.get(a, S(t) ? t : [t]);
            n.callback = function() {
                var t = []
                  , a = n.resolve();
                try {
                    for (var o = 0, r = a.length; r > o; o++)
                        t[o] = J[a[o]].exec()
                } catch (s) {}
                i && i.apply(e, t),
                delete n.callback
            }
            ,
            n.load()
        }
        ,
        y.preload = function(e) {
            var t = x.preload
              , i = t.length;
            i ? y.use(t, function() {
                t.splice(0, i),
                y.preload(e)
            }, x.cwd + "_preload_" + a()) : e()
        }
        ,
        w.use = function(e, t) {
            return y.preload(function() {
                y.use(e, t, x.cwd + "_use_" + a())
            }),
            w
        }
        ,
        y.define.cmd = {},
        e.define = y.define,
        w.Module = y,
        x.fetchedList = et,
        x.cid = a,
        w.resolve = p,
        w.require = function(e) {
            return (J[y.resolve(e)] || {}).exports
        }
        ;
        var at = /^(.+?\/)(\?\?)?(seajs\/)+/;
        x.base = (q.match(at) || ["", q])[1],
        x.dir = q,
        x.cwd = B,
        x.charset = "utf-8",
        x.preload = function() {
            var e = []
              , t = U.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
            return t += " " + H.cookie,
            t.replace(/(seajs-\w+)=1/g, function(t, i) {
                e.push(i)
            }),
            e
        }(),
        w.config = function(e) {
            for (var t in e) {
                var i = e[t]
                  , a = x[t];
                if (a && T(a))
                    for (var n in i)
                        a[n] = i[n];
                else
                    S(a) ? i = a.concat(i) : "base" === t && ("/" === i.slice(-1) || (i += "/"),
                    i = u(i)),
                    x[t] = i
            }
            return E("config", e),
            w
        }
    }
}(this),
function(e) {
    var t = seajs;
    seajs = null ;
    var i = []
      , a = !1
      , n = function(t) {
        i.push(t),
        a || (a = !0,
        n.use("jquery", function() {
            var t = function(e) {
                $(e)
            };
            for (var a in n)
                t[a] = n[a];
            for (var o; o = i.shift(); )
                $(o);
            delete i,
            delete n,
            e.W = t
        }))
    };
    n.getSeajs = function() {
        return t
    }
    ;
    var o = [];
    n.use = function() {
        o.push(arguments)
    }
    ;
    var r = document;
    n.css = function() {
        var e = {
            media: "all"
        }
          , i = {};
        return function() {
            var a, o = [].slice.call(arguments);
            if ("object" == typeof (a = o.pop()))
                for (var r in e)
                    a[r] = a[r] || e[r];
            else
                o.push(a),
                a = e;
            for (var r = 0, s = o.length; s > r; r++) {
                var l = t.resolve(o[r]);
                i[l] || (i[l] = !0,
                n.use(l))
            }
        }
    }(),
    n.js = function(e, t) {
        r.writeln('<script src="' + e + (t ? "" : "?" + u.v) + '"></script>')
    }
    ,
    n.config = t.config;
    var s = t.resolve
      , l = r.getElementsByTagName("script")
      , c = s(l[l.length - 1].src, location.href)
      , d = s("../", c).replace("/.js", "/")
      , u = n.data = {
        base: d,
        v: Math.random()
    }
      , p = /debug/.test(location.href);
    p || n.js(s("./version.js", c)),
    e.__coreCallback = function(i) {
        t.config({
            base: d,
            map: [[/\.(js|css)$/, "$&?" + i]],
            alias: {
                jquery: s("./jquery-1.8.2.js", c)
            },
            charset: "utf-8"
        }),
        n.use = t.use;
        for (var a; a = o.shift(); )
            n.use.apply(null , a);
        delete o,
        e.__coreCallback = null ,
        u.v = i
    }
    ,
    p && e.__coreCallback(u.v),
    e.W = n
}(this);
