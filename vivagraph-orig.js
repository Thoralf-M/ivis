!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var n;
        "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self),
        n.Viva = e()
    }
}(function() {
    return function e(n, t, r) {
        function o(a, u) {
            if (!t[a]) {
                if (!n[a]) {
                    var s = "function" == typeof require && require;
                    if (!u && s)
                        return s(a, !0);
                    if (i)
                        return i(a, !0);
                    var f = new Error("Cannot find module '" + a + "'");
                    throw f.code = "MODULE_NOT_FOUND",
                    f
                }
                var c = t[a] = {
                    exports: {}
                };
                n[a][0].call(c.exports, function(e) {
                    var t = n[a][1][e];
                    return o(t || e)
                }, c, c.exports, e, n, t, r)
            }
            return t[a].exports
        }
        for (var i = "function" == typeof require && require, a = 0; a < r.length; a++)
            o(r[a]);
        return o
    }({
        1: [function(e, n, t) {
            var r = e("ngraph.random")
              , o = {
                lazyExtend: function() {
                    return e("ngraph.merge").apply(this, arguments)
                },
                randomIterator: function() {
                    return r.randomIterator.apply(r, arguments)
                },
                random: function() {
                    return r.random.apply(r, arguments)
                },
                events: e("ngraph.events")
            };
            o.Graph = {
                version: e("./version.js"),
                graph: e("ngraph.graph"),
                serializer: function() {
                    return {
                        loadFromJSON: e("ngraph.fromjson"),
                        storeToJSON: e("ngraph.tojson")
                    }
                },
                centrality: e("./Algorithms/centrality.js"),
                operations: e("./Algorithms/operations.js"),
                geom: function() {
                    return {
                        intersect: e("gintersect"),
                        intersectRect: e("./Utils/intersectRect.js")
                    }
                },
                webgl: e("./WebGL/webgl.js"),
                webglInputEvents: e("./WebGL/webglInputEvents.js"),
                generator: function() {
                    return e("ngraph.generators")
                },
                Input: {
                    domInputManager: e("./Input/domInputManager.js"),
                    webglInputManager: e("./Input/webglInputManager.js")
                },
                Utils: {
                    dragndrop: e("./Input/dragndrop.js"),
                    findElementPosition: e("./Utils/findElementPosition.js"),
                    timer: e("./Utils/timer.js"),
                    getDimension: e("./Utils/getDimensions.js"),
                    events: e("./Utils/backwardCompatibleEvents.js")
                },
                Layout: {
                    forceDirected: e("ngraph.forcelayout"),
                    constant: e("./Layout/constant.js")
                },
                View: {
                    Texture: e("./WebGL/texture.js"),
                    webglAtlas: e("./WebGL/webglAtlas.js"),
                    webglImageNodeProgram: e("./WebGL/webglImageNodeProgram.js"),
                    webglLinkProgram: e("./WebGL/webglLinkProgram.js"),
                    webglNodeProgram: e("./WebGL/webglNodeProgram.js"),
                    webglLine: e("./WebGL/webglLine.js"),
                    webglSquare: e("./WebGL/webglSquare.js"),
                    webglImage: e("./WebGL/webglImage.js"),
                    webglGraphics: e("./View/webglGraphics.js"),
                    _webglUtil: {
                        parseColor: e("./WebGL/parseColor.js")
                    },
                    svgGraphics: e("./View/svgGraphics.js"),
                    renderer: e("./View/renderer.js"),
                    cssGraphics: function() {
                        throw new Error("cssGraphics is deprecated. Please use older version of vivagraph (< 0.7) if you need it")
                    },
                    svgNodeFactory: function() {
                        throw new Error("svgNodeFactory is deprecated. Please use older version of vivagraph (< 0.7) if you need it")
                    },
                    community: function() {
                        throw new Error("community is deprecated. Please use vivagraph < 0.7 if you need it, or `https://github.com/anvaka/ngraph.slpa` module")
                    }
                },
                Rect: e("./Utils/rect.js"),
                svg: e("simplesvg"),
                BrowserInfo: e("./Utils/browserInfo.js")
            },
            n.exports = o
        }
        , {
            "./Algorithms/centrality.js": 32,
            "./Algorithms/operations.js": 33,
            "./Input/domInputManager.js": 34,
            "./Input/dragndrop.js": 35,
            "./Input/webglInputManager.js": 36,
            "./Layout/constant.js": 37,
            "./Utils/backwardCompatibleEvents.js": 38,
            "./Utils/browserInfo.js": 39,
            "./Utils/findElementPosition.js": 41,
            "./Utils/getDimensions.js": 42,
            "./Utils/intersectRect.js": 43,
            "./Utils/rect.js": 45,
            "./Utils/timer.js": 46,
            "./View/renderer.js": 48,
            "./View/svgGraphics.js": 49,
            "./View/webglGraphics.js": 50,
            "./WebGL/parseColor.js": 51,
            "./WebGL/texture.js": 52,
            "./WebGL/webgl.js": 53,
            "./WebGL/webglAtlas.js": 54,
            "./WebGL/webglImage.js": 55,
            "./WebGL/webglImageNodeProgram.js": 56,
            "./WebGL/webglInputEvents.js": 57,
            "./WebGL/webglLine.js": 58,
            "./WebGL/webglLinkProgram.js": 59,
            "./WebGL/webglNodeProgram.js": 60,
            "./WebGL/webglSquare.js": 61,
            "./version.js": 62,
            gintersect: 3,
            "ngraph.events": 7,
            "ngraph.forcelayout": 9,
            "ngraph.fromjson": 10,
            "ngraph.generators": 11,
            "ngraph.graph": 12,
            "ngraph.merge": 13,
            "ngraph.random": 26,
            "ngraph.tojson": 27,
            simplesvg: 28
        }],
        2: [function(e, n, t) {
            function r(e, n, t, r) {
                return (s = s || (document.addEventListener ? {
                    add: o,
                    rm: i
                } : {
                    add: a,
                    rm: u
                })).add(e, n, t, r)
            }
            function o(e, n, t, r) {
                e.addEventListener(n, t, r)
            }
            function i(e, n, t, r) {
                e.removeEventListener(n, t, r)
            }
            function a(e, n, t, r) {
                if (r)
                    throw new Error("cannot useCapture in oldIE");
                e.attachEvent("on" + n, t)
            }
            function u(e, n, t, r) {
                e.detachEvent("on" + n, t)
            }
            r.removeEventListener = function(e, n, t, r) {
                return (s = s || (document.addEventListener ? {
                    add: o,
                    rm: i
                } : {
                    add: a,
                    rm: u
                })).rm(e, n, t, r)
            }
            ,
            r.addEventListener = r,
            n.exports = r;
            var s = null
        }
        , {}],
        3: [function(e, n, t) {
            n.exports = function(e, n, t, r, o, i, a, u) {
                var s, f, c, d, l, p, v, g, h, m, y, x, w, b = {
                    x: 0,
                    y: 0
                };
                return s = r - n,
                c = e - t,
                l = t * n - e * r,
                h = s * o + c * i + l,
                m = s * a + c * u + l,
                0 !== h && 0 !== m && h >= 0 == m >= 4 ? null : (f = u - i,
                d = o - a,
                p = a * i - o * u,
                v = f * e + d * n + p,
                g = f * t + d * r + p,
                0 !== v && 0 !== g && v >= 0 == g >= 0 ? null : 0 == (y = s * d - f * c) ? null : (x = y < 0 ? -y / 2 : y / 2,
                x = 0,
                w = c * p - d * l,
                b.x = (w < 0 ? w - x : w + x) / y,
                w = f * l - s * p,
                b.y = (w < 0 ? w - x : w + x) / y,
                b))
            }
        }
        , {}],
        4: [function(e, n, t) {
            n.exports.degree = e("./src/degree.js"),
            n.exports.betweenness = e("./src/betweenness.js")
        }
        , {
            "./src/betweenness.js": 5,
            "./src/degree.js": 6
        }],
        5: [function(e, n, t) {
            n.exports = function(e, n) {
                function t(e) {
                    d[e] /= 2
                }
                function r(e) {
                    c[e.id] = 0
                }
                var o, i = [], a = [], u = Object.create(null), s = Object.create(null), f = Object.create(null), c = Object.create(null), d = Object.create(null);
                return e.forEachNode(function(e) {
                    d[e.id] = 0
                }),
                e.forEachNode(function(t) {
                    (function(t) {
                        function r(e) {
                            !function(e) {
                                -1 === s[e] && (s[e] = s[o] + 1,
                                i.push(e)),
                                s[e] === s[o] + 1 && (f[e] += f[o],
                                u[e].push(o))
                            }(e.id)
                        }
                        for (e.forEachNode(function(e) {
                            var n = e.id;
                            u[n] = [],
                            s[n] = -1,
                            f[n] = 0
                        }),
                        s[t] = 0,
                        f[t] = 1,
                        i.push(t); i.length; ) {
                            var o = i.shift();
                            Object.create(null),
                            a.push(o),
                            e.forEachLinkedNode(o, r, n)
                        }
                    }
                    )(o = t.id),
                    function() {
                        for (e.forEachNode(r); a.length; ) {
                            for (var n = a.pop(), t = (1 + c[n]) / f[n], i = u[n], s = 0; s < i.length; ++s) {
                                var l = i[s];
                                c[l] += f[l] * t
                            }
                            n !== o && (d[n] += c[n])
                        }
                    }()
                }),
                n || Object.keys(d).forEach(t),
                d
            }
        }
        , {}],
        6: [function(e, n, t) {
            function r(e, n) {
                for (var t = 0, r = 0; r < e.length; r += 1)
                    t += e[r].toId === n ? 1 : 0;
                return t
            }
            function o(e, n) {
                for (var t = 0, r = 0; r < e.length; r += 1)
                    t += e[r].fromId === n ? 1 : 0;
                return t
            }
            function i(e) {
                return e.length
            }
            n.exports = function(e, n) {
                var t, a = Object.create(null);
                if ("both" === (n = (n || "both").toLowerCase()) || "inout" === n)
                    t = i;
                else if ("in" === n)
                    t = r;
                else {
                    if ("out" !== n)
                        throw new Error("Expected centrality degree kind is: in, out or both");
                    t = o
                }
                return e.forEachNode(function(n) {
                    var r = e.getLinks(n.id);
                    a[n.id] = t(r, n.id)
                }),
                a
            }
        }
        , {}],
        7: [function(e, n, t) {
            n.exports = function(e) {
                !function(e) {
                    if (!e)
                        throw new Error("Eventify cannot use falsy object as events subject");
                    for (var n = ["on", "fire", "off"], t = 0; t < n.length; ++t)
                        if (e.hasOwnProperty(n[t]))
                            throw new Error("Subject cannot be eventified, since it already has property '" + n[t] + "'")
                }(e);
                var n = function(e) {
                    var n = Object.create(null);
                    return {
                        on: function(t, r, o) {
                            if ("function" != typeof r)
                                throw new Error("callback is expected to be a function");
                            var i = n[t];
                            return i || (i = n[t] = []),
                            i.push({
                                callback: r,
                                ctx: o
                            }),
                            e
                        },
                        off: function(t, r) {
                            if (void 0 === t)
                                return n = Object.create(null),
                                e;
                            if (n[t])
                                if ("function" != typeof r)
                                    delete n[t];
                                else
                                    for (var o = n[t], i = 0; i < o.length; ++i)
                                        o[i].callback === r && o.splice(i, 1);
                            return e
                        },
                        fire: function(t) {
                            var r = n[t];
                            if (!r)
                                return e;
                            var o;
                            arguments.length > 1 && (o = Array.prototype.splice.call(arguments, 1));
                            for (var i = 0; i < r.length; ++i) {
                                var a = r[i];
                                a.callback.apply(a.ctx, o)
                            }
                            return e
                        }
                    }
                }(e);
                return e.on = n.on,
                e.off = n.off,
                e.fire = n.fire,
                e
            }
        }
        , {}],
        8: [function(e, n, t) {
            function r(e, n, t) {
                if (e.hasOwnProperty(t)) {
                    if ("function" == typeof n[t])
                        return;
                    n[t] = function(r) {
                        return void 0 !== r ? (e[t] = r,
                        n) : e[t]
                    }
                }
            }
            n.exports = function(e, n, t) {
                if ("[object Array]" === Object.prototype.toString.call(t))
                    for (var o = 0; o < t.length; ++o)
                        r(e, n, t[o]);
                else
                    for (var i in e)
                        r(e, n, i)
            }
        }
        , {}],
        9: [function(e, n, t) {
            n.exports = function(n, t) {
                function o(e) {
                    for (var t = 0; t < e.length; ++t) {
                        var r = e[t];
                        "add" === r.changeType ? (r.node && i(r.node.id),
                        r.link && a(r.link)) : "remove" === r.changeType && (r.node && function(e) {
                            var n = e.id
                              , t = c[n];
                            t && (c[n] = null,
                            delete c[n],
                            f.removeBody(t))
                        }(r.node),
                        r.link && function(e) {
                            var t = d[e.id];
                            if (t) {
                                var r = n.getNode(e.fromId)
                                  , o = n.getNode(e.toId);
                                r && u(r.id),
                                o && u(o.id),
                                delete d[e.id],
                                f.removeSpring(t)
                            }
                        }(r.link))
                    }
                    l = n.getNodesCount()
                }
                function i(e) {
                    var t = c[e];
                    if (!t) {
                        var r = n.getNode(e);
                        if (!r)
                            throw new Error("initBody() was called with unknown node id");
                        var o = r.position;
                        if (!o) {
                            var i = function(e) {
                                var n = [];
                                if (!e.links)
                                    return n;
                                for (var t = Math.min(e.links.length, 2), r = 0; r < t; ++r) {
                                    var o = e.links[r]
                                      , i = o.fromId !== e.id ? c[o.fromId] : c[o.toId];
                                    i && i.pos && n.push(i)
                                }
                                return n
                            }(r);
                            o = f.getBestNewBodyPosition(i)
                        }
                        (t = f.addBodyAt(o)).id = e,
                        c[e] = t,
                        u(e),
                        function(e) {
                            return e && (e.isPinned || e.data && e.data.isPinned)
                        }(r) && (t.isPinned = !0)
                    }
                }
                function a(e) {
                    u(e.fromId),
                    u(e.toId);
                    var n = c[e.fromId]
                      , t = c[e.toId]
                      , r = f.addSpring(n, t, e.length);
                    p(e, r),
                    d[e.id] = r
                }
                function u(e) {
                    c[e].mass = function(e) {
                        var t = n.getLinks(e);
                        return t ? 1 + t.length / 3 : 1
                    }(e)
                }
                function s(e) {
                    var n = c[e];
                    return n || (i(e),
                    n = c[e]),
                    n
                }
                if (!n)
                    throw new Error("Graph structure cannot be undefined");
                var f = e("ngraph.physics.simulator")(t)
                  , c = Object.create(null)
                  , d = {}
                  , l = 0
                  , p = f.settings.springTransform || function() {}
                ;
                l = 0,
                n.forEachNode(function(e) {
                    i(e.id),
                    l += 1
                }),
                n.forEachLink(a),
                n.on("changed", o);
                var v = !1
                  , g = {
                    step: function() {
                        if (0 === l)
                            return !0;
                        var e = f.step();
                        return g.lastMove = e,
                        g.fire("step"),
                        !1 !== v && (v = !1,
                        function(e) {
                            g.fire("stable", e)
                        }(!1)),
                        !1
                    },
                    getNodePosition: function(e) {
                        return s(e).pos
                    },
                    setNodePosition: function(e) {
                        var n = s(e);
                        n.setPosition.apply(n, Array.prototype.slice.call(arguments, 1))
                    },
                    getLinkPosition: function(e) {
                        var n = d[e];
                        if (n)
                            return {
                                from: n.from.pos,
                                to: n.to.pos
                            }
                    },
                    getGraphRect: function() {
                        return f.getBBox()
                    },
                    forEachBody: function(e) {
                        Object.keys(c).forEach(function(n) {
                            e(c[n], n)
                        })
                    },
                    pinNode: function(e, n) {
                        s(e.id).isPinned = !!n
                    },
                    isNodePinned: function(e) {
                        return s(e.id).isPinned
                    },
                    dispose: function() {
                        n.off("changed", o),
                        g.fire("disposed")
                    },
                    getBody: function(e) {
                        return c[e]
                    },
                    getSpring: function(e, t) {
                        var r;
                        if (void 0 === t)
                            r = "object" != typeof e ? e : e.id;
                        else {
                            var o = n.hasLink(e, t);
                            if (!o)
                                return;
                            r = o.id
                        }
                        return d[r]
                    },
                    simulator: f,
                    graph: n,
                    lastMove: 0
                };
                return r(g),
                g
            }
            ,
            n.exports.simulator = e("ngraph.physics.simulator");
            var r = e("ngraph.events")
        }
        , {
            "ngraph.events": 7,
            "ngraph.physics.simulator": 15
        }],
        10: [function(e, n, t) {
            function r(e) {
                return e
            }
            n.exports = function(e, n, t) {
                var i;
                n = n || r,
                t = t || r,
                i = "string" == typeof e ? JSON.parse(e) : e;
                var a, u = o();
                if (void 0 === i.links || void 0 === i.nodes)
                    throw new Error("Cannot load graph without links and nodes");
                for (a = 0; a < i.nodes.length; ++a) {
                    var s = n(i.nodes[a]);
                    if (!s.hasOwnProperty("id"))
                        throw new Error("Graph node format is invalid: Node id is missing");
                    u.addNode(s.id, s.data)
                }
                for (a = 0; a < i.links.length; ++a) {
                    var f = t(i.links[a]);
                    if (!f.hasOwnProperty("fromId") || !f.hasOwnProperty("toId"))
                        throw new Error("Graph link format is invalid. Both fromId and toId are required");
                    u.addLink(f.fromId, f.toId, f.data)
                }
                return u
            }
            ;
            var o = e("ngraph.graph")
        }
        , {
            "ngraph.graph": 12
        }],
        11: [function(e, n, t) {
            function r(e) {
                if (!e || e < 0)
                    throw new Error("Invalid number of nodes");
                var n, t = o();
                for (n = 0; n < e - 1; ++n)
                    t.addLink(n, n + 1),
                    t.addLink(e + n, e + n + 1),
                    t.addLink(n, e + n);
                return t.addLink(e - 1, 2 * e - 1),
                t
            }
            n.exports = {
                ladder: r,
                complete: function(e) {
                    if (!e || e < 1)
                        throw new Error("At least two nodes are expected for complete graph");
                    var n, t, r = o();
                    for (n = 0; n < e; ++n)
                        for (t = n + 1; t < e; ++t)
                            n !== t && r.addLink(n, t);
                    return r
                },
                completeBipartite: function(e, n) {
                    if (!e || !n || e < 0 || n < 0)
                        throw new Error("Graph dimensions are invalid. Number of nodes in each partition should be greater than 0");
                    var t, r, i = o();
                    for (t = 0; t < e; ++t)
                        for (r = e; r < e + n; ++r)
                            i.addLink(t, r);
                    return i
                },
                balancedBinTree: function(e) {
                    if (e < 0)
                        throw new Error("Invalid number of nodes in balanced tree");
                    var n, t = o(), r = Math.pow(2, e);
                    for (0 === e && t.addNode(1),
                    n = 1; n < r; ++n) {
                        var i = n
                          , a = 2 * i
                          , u = 2 * i + 1;
                        t.addLink(i, a),
                        t.addLink(i, u)
                    }
                    return t
                },
                path: function(e) {
                    if (!e || e < 0)
                        throw new Error("Invalid number of nodes");
                    var n, t = o();
                    for (t.addNode(0),
                    n = 1; n < e; ++n)
                        t.addLink(n - 1, n);
                    return t
                },
                circularLadder: function(e) {
                    if (!e || e < 0)
                        throw new Error("Invalid number of nodes");
                    var n = r(e);
                    return n.addLink(0, e - 1),
                    n.addLink(e, 2 * e - 1),
                    n
                },
                grid: function(e, n) {
                    if (e < 1 || n < 1)
                        throw new Error("Invalid number of nodes in grid graph");
                    var t, r, i = o();
                    if (1 === e && 1 === n)
                        return i.addNode(0),
                        i;
                    for (t = 0; t < e; ++t)
                        for (r = 0; r < n; ++r) {
                            var a = t + r * e;
                            t > 0 && i.addLink(a, t - 1 + r * e),
                            r > 0 && i.addLink(a, t + (r - 1) * e)
                        }
                    return i
                },
                grid3: function(e, n, t) {
                    if (e < 1 || n < 1 || t < 1)
                        throw new Error("Invalid number of nodes in grid3 graph");
                    var r, i, a, u = o();
                    if (1 === e && 1 === n && 1 === t)
                        return u.addNode(0),
                        u;
                    for (a = 0; a < t; ++a)
                        for (r = 0; r < e; ++r)
                            for (i = 0; i < n; ++i) {
                                var s = a * e * n
                                  , f = r + i * e + s;
                                r > 0 && u.addLink(f, r - 1 + i * e + s),
                                i > 0 && u.addLink(f, r + (i - 1) * e + s),
                                a > 0 && u.addLink(f, r + i * e + (a - 1) * e * n)
                            }
                    return u
                },
                noLinks: function(e) {
                    if (e < 0)
                        throw new Error("Number of nodes shoul be >= 0");
                    var n, t = o();
                    for (n = 0; n < e; ++n)
                        t.addNode(n);
                    return t
                },
                wattsStrogatz: function(n, t, r, i) {
                    if (t >= n)
                        throw new Error("Choose smaller `k`. It cannot be larger than number of nodes `n`");
                    var a, u, s = e("ngraph.random").random(i || 42), f = o();
                    for (a = 0; a < n; ++a)
                        f.addNode(a);
                    for (var c = Math.floor(t / 2 + 1), d = 1; d < c; ++d)
                        for (a = 0; a < n; ++a)
                            u = (d + a) % n,
                            f.addLink(a, u);
                    for (d = 1; d < c; ++d)
                        for (a = 0; a < n; ++a)
                            if (s.nextDouble() < r) {
                                var l = a;
                                u = (d + a) % n;
                                var p = s.next(n)
                                  , v = p === l || f.hasLink(l, p);
                                if (v && f.getLinks(l).length === n - 1)
                                    continue;
                                for (; v; )
                                    v = (p = s.next(n)) === l || f.hasLink(l, p);
                                var g = f.hasLink(l, u);
                                f.removeLink(g),
                                f.addLink(l, p)
                            }
                    return f
                }
            };
            var o = e("ngraph.graph")
        }
        , {
            "ngraph.graph": 12,
            "ngraph.random": 26
        }],
        12: [function(e, n, t) {
            function r(e, n) {
                if (n.indexOf)
                    return n.indexOf(e);
                var t, r = n.length;
                for (t = 0; t < r; t += 1)
                    if (n[t] === e)
                        return t;
                return -1
            }
            function o(e, n, t, r) {
                this.fromId = e,
                this.toId = n,
                this.data = t,
                this.id = r
            }
            n.exports = function(e) {
                function n(e, n) {
                    L.push({
                        link: e,
                        changeType: n
                    })
                }
                function t(e, n) {
                    L.push({
                        node: e,
                        changeType: n
                    })
                }
                function a(e, n) {
                    if (void 0 === e)
                        throw new Error("Invalid node identifier");
                    k();
                    var t = u(e);
                    return t ? P(t, "update") : (t = new function(e) {
                        this.id = e,
                        this.links = [],
                        this.data = null
                    }
                    (e),
                    x++,
                    P(t, "add")),
                    t.data = n,
                    h[e] = t,
                    j(),
                    t
                }
                function u(e) {
                    return h[e]
                }
                function s(e) {
                    var n = u(e);
                    if (!n)
                        return !1;
                    for (k(); n.links.length; )
                        f(n.links[0]);
                    return delete h[e],
                    x--,
                    P(n, "remove"),
                    j(),
                    !0
                }
                function f(e) {
                    if (!e)
                        return !1;
                    var n = r(e, m);
                    if (n < 0)
                        return !1;
                    k(),
                    m.splice(n, 1);
                    var t = u(e.fromId)
                      , o = u(e.toId);
                    return t && (n = r(e, t.links)) >= 0 && t.links.splice(n, 1),
                    o && (n = r(e, o.links)) >= 0 && o.links.splice(n, 1),
                    N(e, "remove"),
                    j(),
                    !0
                }
                function c(e, n) {
                    var t, r = u(e);
                    if (!r)
                        return null;
                    for (t = 0; t < r.links.length; ++t) {
                        var o = r.links[t];
                        if (o.fromId === e && o.toId === n)
                            return o
                    }
                    return null
                }
                function d() {}
                function l() {
                    w += 1
                }
                function p() {
                    0 == (w -= 1) && L.length > 0 && (A.fire("changed", L),
                    L.length = 0)
                }
                function v(e) {
                    if ("function" == typeof e)
                        for (var n = Object.keys(h), t = 0; t < n.length; ++t)
                            if (e(h[n[t]]))
                                return !0
                }
                function g(e) {
                    if ("function" == typeof e) {
                        var n;
                        for (n in h)
                            if (e(h[n]))
                                return !0
                    }
                }
                void 0 === (e = e || {}).uniqueLinkId && (e.uniqueLinkId = !0);
                var h = "function" == typeof Object.create ? Object.create(null) : {}
                  , m = []
                  , y = {}
                  , x = 0
                  , w = 0
                  , b = Object.keys ? v : g
                  , E = e.uniqueLinkId ? function(e, n, t) {
                    var r = e.toString() + "👉 " + n.toString()
                      , i = y.hasOwnProperty(r);
                    return (i || c(e, n)) && (i || (y[r] = 0),
                    r += "@" + ++y[r]),
                    new o(e,n,t,r)
                }
                : function(e, n, t) {
                    return new o(e,n,t,e.toString() + n.toString())
                }
                  , L = []
                  , N = d
                  , P = d
                  , k = d
                  , j = d
                  , A = {
                    addNode: a,
                    addLink: function(e, n, t) {
                        k();
                        var r = u(e) || a(e)
                          , o = u(n) || a(n)
                          , i = E(e, n, t);
                        return m.push(i),
                        r.links.push(i),
                        e !== n && o.links.push(i),
                        N(i, "add"),
                        j(),
                        i
                    },
                    removeLink: f,
                    removeNode: s,
                    getNode: u,
                    getNodesCount: function() {
                        return x
                    },
                    getLinksCount: function() {
                        return m.length
                    },
                    getLinks: function(e) {
                        var n = u(e);
                        return n ? n.links : null
                    },
                    forEachNode: b,
                    forEachLinkedNode: function(e, n, t) {
                        var r = u(e);
                        if (r && r.links && "function" == typeof n)
                            return t ? function(e, n, t) {
                                for (var r = 0; r < e.length; ++r) {
                                    var o = e[r];
                                    if (o.fromId === n && t(h[o.toId], o))
                                        return !0
                                }
                            }(r.links, e, n) : function(e, n, t) {
                                for (var r = 0; r < e.length; ++r) {
                                    var o = e[r]
                                      , i = o.fromId === n ? o.toId : o.fromId;
                                    if (t(h[i], o))
                                        return !0
                                }
                            }(r.links, e, n)
                    },
                    forEachLink: function(e) {
                        var n, t;
                        if ("function" == typeof e)
                            for (n = 0,
                            t = m.length; n < t; ++n)
                                e(m[n])
                    },
                    beginUpdate: k,
                    endUpdate: j,
                    clear: function() {
                        k(),
                        b(function(e) {
                            s(e.id)
                        }),
                        j()
                    },
                    hasLink: c,
                    getLink: c
                };
                return i(A),
                function() {
                    var e = A.on;
                    A.on = function() {
                        return A.beginUpdate = k = l,
                        A.endUpdate = j = p,
                        N = n,
                        P = t,
                        A.on = e,
                        e.apply(A, arguments)
                    }
                }(),
                A
            }
            ;
            var i = e("ngraph.events")
        }
        , {
            "ngraph.events": 7
        }],
        13: [function(e, n, t) {
            function r(e, n) {
                var t;
                if (e || (e = {}),
                n)
                    for (t in n)
                        if (n.hasOwnProperty(t)) {
                            var o = e.hasOwnProperty(t)
                              , i = typeof n[t];
                            !o || typeof e[t] !== i ? e[t] = n[t] : "object" === i && (e[t] = r(e[t], n[t]))
                        }
                return e
            }
            n.exports = r
        }
        , {}],
        14: [function(e, n, t) {
            function r(e, n) {
                this.pos = new o(e,n),
                this.prevPos = new o(e,n),
                this.force = new o,
                this.velocity = new o,
                this.mass = 1
            }
            function o(e, n) {
                e && "number" != typeof e ? (this.x = "number" == typeof e.x ? e.x : 0,
                this.y = "number" == typeof e.y ? e.y : 0) : (this.x = "number" == typeof e ? e : 0,
                this.y = "number" == typeof n ? n : 0)
            }
            function i(e, n, t) {
                this.pos = new a(e,n,t),
                this.prevPos = new a(e,n,t),
                this.force = new a,
                this.velocity = new a,
                this.mass = 1
            }
            function a(e, n, t) {
                e && "number" != typeof e ? (this.x = "number" == typeof e.x ? e.x : 0,
                this.y = "number" == typeof e.y ? e.y : 0,
                this.z = "number" == typeof e.z ? e.z : 0) : (this.x = "number" == typeof e ? e : 0,
                this.y = "number" == typeof n ? n : 0,
                this.z = "number" == typeof t ? t : 0)
            }
            n.exports = {
                Body: r,
                Vector2d: o,
                Body3d: i,
                Vector3d: a
            },
            r.prototype.setPosition = function(e, n) {
                this.prevPos.x = this.pos.x = e,
                this.prevPos.y = this.pos.y = n
            }
            ,
            o.prototype.reset = function() {
                this.x = this.y = 0
            }
            ,
            i.prototype.setPosition = function(e, n, t) {
                this.prevPos.x = this.pos.x = e,
                this.prevPos.y = this.pos.y = n,
                this.prevPos.z = this.pos.z = t
            }
            ,
            a.prototype.reset = function() {
                this.x = this.y = this.z = 0
            }
        }
        , {}],
        15: [function(e, n, t) {
            n.exports = function(n) {
                var t = e("./lib/spring")
                  , r = e("ngraph.expose")
                  , o = e("ngraph.merge")
                  , i = e("ngraph.events")
                  , a = (n = o(n, {
                    springLength: 30,
                    springCoeff: 8e-4,
                    gravity: -1.2,
                    theta: .8,
                    dragCoeff: .02,
                    timeStep: 20
                })).createQuadTree || e("ngraph.quadtreebh")
                  , u = n.createBounds || e("./lib/bounds")
                  , s = n.createDragForce || e("./lib/dragForce")
                  , f = n.createSpringForce || e("./lib/springForce")
                  , c = n.integrator || e("./lib/eulerIntegrator")
                  , d = n.createBody || e("./lib/createBody")
                  , l = []
                  , p = []
                  , v = a(n)
                  , g = u(l, n)
                  , h = f(n)
                  , m = s(n)
                  , y = {
                    bodies: l,
                    quadTree: v,
                    springs: p,
                    settings: n,
                    step: function() {
                        !function() {
                            var e, n = l.length;
                            if (n)
                                for (v.insertBodies(l); n--; )
                                    (e = l[n]).isPinned || (e.force.reset(),
                                    v.updateBodyForce(e),
                                    m.update(e));
                            for (n = p.length; n--; )
                                h.update(p[n])
                        }();
                        var e = c(l, n.timeStep);
                        return g.update(),
                        e
                    },
                    addBody: function(e) {
                        if (!e)
                            throw new Error("Body is required");
                        return l.push(e),
                        e
                    },
                    addBodyAt: function(e) {
                        if (!e)
                            throw new Error("Body position is required");
                        var n = d(e);
                        return l.push(n),
                        n
                    },
                    removeBody: function(e) {
                        if (e) {
                            var n = l.indexOf(e);
                            if (!(n < 0))
                                return l.splice(n, 1),
                                0 === l.length && g.reset(),
                                !0
                        }
                    },
                    addSpring: function(e, n, r, o, i) {
                        if (!e || !n)
                            throw new Error("Cannot add null spring to force simulator");
                        "number" != typeof r && (r = -1);
                        var a = new t(e,n,r,i >= 0 ? i : -1,o);
                        return p.push(a),
                        a
                    },
                    getTotalMovement: function() {
                        return 0
                    },
                    removeSpring: function(e) {
                        if (e) {
                            var n = p.indexOf(e);
                            return n > -1 ? (p.splice(n, 1),
                            !0) : void 0
                        }
                    },
                    getBestNewBodyPosition: function(e) {
                        return g.getBestNewPosition(e)
                    },
                    getBBox: function() {
                        return g.box
                    },
                    gravity: function(e) {
                        return void 0 !== e ? (n.gravity = e,
                        v.options({
                            gravity: e
                        }),
                        this) : n.gravity
                    },
                    theta: function(e) {
                        return void 0 !== e ? (n.theta = e,
                        v.options({
                            theta: e
                        }),
                        this) : n.theta
                    }
                };
                return r(n, y),
                i(y),
                y
            }
        }
        , {
            "./lib/bounds": 16,
            "./lib/createBody": 17,
            "./lib/dragForce": 18,
            "./lib/eulerIntegrator": 19,
            "./lib/spring": 20,
            "./lib/springForce": 21,
            "ngraph.events": 7,
            "ngraph.expose": 8,
            "ngraph.merge": 13,
            "ngraph.quadtreebh": 22
        }],
        16: [function(e, n, t) {
            n.exports = function(n, t) {
                var r = e("ngraph.random").random(42)
                  , o = {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                };
                return {
                    box: o,
                    update: function() {
                        var e = n.length;
                        if (0 !== e) {
                            for (var t = Number.MAX_VALUE, r = Number.MAX_VALUE, i = Number.MIN_VALUE, a = Number.MIN_VALUE; e--; ) {
                                var u = n[e];
                                u.isPinned ? (u.pos.x = u.prevPos.x,
                                u.pos.y = u.prevPos.y) : (u.prevPos.x = u.pos.x,
                                u.prevPos.y = u.pos.y),
                                u.pos.x < t && (t = u.pos.x),
                                u.pos.x > i && (i = u.pos.x),
                                u.pos.y < r && (r = u.pos.y),
                                u.pos.y > a && (a = u.pos.y)
                            }
                            o.x1 = t,
                            o.x2 = i,
                            o.y1 = r,
                            o.y2 = a
                        }
                    },
                    reset: function() {
                        o.x1 = o.y1 = 0,
                        o.x2 = o.y2 = 0
                    },
                    getBestNewPosition: function(e) {
                        var n = o
                          , i = 0
                          , a = 0;
                        if (e.length) {
                            for (var u = 0; u < e.length; ++u)
                                i += e[u].pos.x,
                                a += e[u].pos.y;
                            i /= e.length,
                            a /= e.length
                        } else
                            i = (n.x1 + n.x2) / 2,
                            a = (n.y1 + n.y2) / 2;
                        var s = t.springLength;
                        return {
                            x: i + r.next(s) - s / 2,
                            y: a + r.next(s) - s / 2
                        }
                    }
                }
            }
        }
        , {
            "ngraph.random": 26
        }],
        17: [function(e, n, t) {
            var r = e("ngraph.physics.primitives");
            n.exports = function(e) {
                return new r.Body(e)
            }
        }
        , {
            "ngraph.physics.primitives": 14
        }],
        18: [function(e, n, t) {
            n.exports = function(n) {
                var t = e("ngraph.merge")
                  , r = {
                    update: function(e) {
                        e.force.x -= n.dragCoeff * e.velocity.x,
                        e.force.y -= n.dragCoeff * e.velocity.y
                    }
                };
                return e("ngraph.expose")(n = t(n, {
                    dragCoeff: .02
                }), r, ["dragCoeff"]),
                r
            }
        }
        , {
            "ngraph.expose": 8,
            "ngraph.merge": 13
        }],
        19: [function(e, n, t) {
            n.exports = function(e, n) {
                var t, r = 0, o = 0, i = 0, a = 0, u = e.length;
                if (0 === u)
                    return 0;
                for (t = 0; t < u; ++t) {
                    var s = e[t]
                      , f = n / s.mass;
                    s.velocity.x += f * s.force.x,
                    s.velocity.y += f * s.force.y;
                    var c = s.velocity.x
                      , d = s.velocity.y
                      , l = Math.sqrt(c * c + d * d);
                    l > 1 && (s.velocity.x = c / l,
                    s.velocity.y = d / l),
                    r = n * s.velocity.x,
                    i = n * s.velocity.y,
                    s.pos.x += r,
                    s.pos.y += i,
                    o += Math.abs(r),
                    a += Math.abs(i)
                }
                return (o * o + a * a) / u
            }
        }
        , {}],
        20: [function(e, n, t) {
            n.exports = function(e, n, t, r, o) {
                this.from = e,
                this.to = n,
                this.length = t,
                this.coeff = r,
                this.weight = "number" == typeof o ? o : 1
            }
        }
        , {}],
        21: [function(e, n, t) {
            n.exports = function(n) {
                var t = e("ngraph.merge")
                  , r = e("ngraph.random").random(42)
                  , o = {
                    update: function(e) {
                        var t = e.from
                          , o = e.to
                          , i = e.length < 0 ? n.springLength : e.length
                          , a = o.pos.x - t.pos.x
                          , u = o.pos.y - t.pos.y
                          , s = Math.sqrt(a * a + u * u);
                        0 === s && (a = (r.nextDouble() - .5) / 50,
                        u = (r.nextDouble() - .5) / 50,
                        s = Math.sqrt(a * a + u * u));
                        var f = s - i
                          , c = (!e.coeff || e.coeff < 0 ? n.springCoeff : e.coeff) * f / s * e.weight;
                        t.force.x += c * a,
                        t.force.y += c * u,
                        o.force.x -= c * a,
                        o.force.y -= c * u
                    }
                };
                return e("ngraph.expose")(n = t(n, {
                    springCoeff: 2e-4,
                    springLength: 80
                }), o, ["springCoeff", "springLength"]),
                o
            }
        }
        , {
            "ngraph.expose": 8,
            "ngraph.merge": 13,
            "ngraph.random": 26
        }],
        22: [function(e, n, t) {
            n.exports = function(n) {
                function t() {
                    var e = d[l];
                    return e ? (e.quad0 = null,
                    e.quad1 = null,
                    e.quad2 = null,
                    e.quad3 = null,
                    e.body = null,
                    e.mass = e.massX = e.massY = 0,
                    e.left = e.right = e.top = e.bottom = 0) : (e = new o,
                    d[l] = e),
                    ++l,
                    e
                }
                (n = n || {}).gravity = "number" == typeof n.gravity ? n.gravity : -1,
                n.theta = "number" == typeof n.theta ? n.theta : .8;
                var r = e("ngraph.random").random(1984)
                  , o = e("./node")
                  , i = e("./insertStack")
                  , a = e("./isSamePosition")
                  , u = n.gravity
                  , s = []
                  , f = new i
                  , c = n.theta
                  , d = []
                  , l = 0
                  , p = t();
                return {
                    insertBodies: function(e) {
                        var n, o = Number.MAX_VALUE, i = Number.MAX_VALUE, u = Number.MIN_VALUE, s = Number.MIN_VALUE, c = e.length;
                        for (n = c; n--; ) {
                            var d = e[n].pos.x
                              , v = e[n].pos.y;
                            d < o && (o = d),
                            d > u && (u = d),
                            v < i && (i = v),
                            v > s && (s = v)
                        }
                        var g = u - o
                          , h = s - i;
                        for (g > h ? s = i + g : u = o + h,
                        l = 0,
                        (p = t()).left = o,
                        p.right = u,
                        p.top = i,
                        p.bottom = s,
                        (n = c - 1) >= 0 && (p.body = e[n]); n--; )
                            !function(e) {
                                for (f.reset(),
                                f.push(p, e); !f.isEmpty(); ) {
                                    var n = f.pop()
                                      , o = n.node
                                      , i = n.body;
                                    if (o.body) {
                                        var u = o.body;
                                        if (o.body = null,
                                        a(u.pos, i.pos)) {
                                            var s = 3;
                                            do {
                                                var c = r.nextDouble()
                                                  , d = (o.right - o.left) * c
                                                  , l = (o.bottom - o.top) * c;
                                                u.pos.x = o.left + d,
                                                u.pos.y = o.top + l,
                                                s -= 1
                                            } while (s > 0 && a(u.pos, i.pos));if (0 === s && a(u.pos, i.pos))
                                                return
                                        }
                                        f.push(o, u),
                                        f.push(o, i)
                                    } else {
                                        var v = i.pos.x
                                          , g = i.pos.y;
                                        o.mass = o.mass + i.mass,
                                        o.massX = o.massX + i.mass * v,
                                        o.massY = o.massY + i.mass * g;
                                        var h = 0
                                          , m = o.left
                                          , y = (o.right + m) / 2
                                          , x = o.top
                                          , w = (o.bottom + x) / 2;
                                        v > y && (h += 1,
                                        m = y,
                                        y = o.right),
                                        g > w && (h += 2,
                                        x = w,
                                        w = o.bottom);
                                        var b = function(e, n) {
                                            return 0 === n ? e.quad0 : 1 === n ? e.quad1 : 2 === n ? e.quad2 : 3 === n ? e.quad3 : null
                                        }(o, h);
                                        b ? f.push(b, i) : ((b = t()).left = m,
                                        b.top = x,
                                        b.right = y,
                                        b.bottom = w,
                                        b.body = i,
                                        function(e, n, t) {
                                            0 === n ? e.quad0 = t : 1 === n ? e.quad1 = t : 2 === n ? e.quad2 = t : 3 === n && (e.quad3 = t)
                                        }(o, h, b))
                                    }
                                }
                            }(e[n])
                    },
                    getRoot: function() {
                        return p
                    },
                    updateBodyForce: function(e) {
                        var n, t, o, i, a = s, f = 0, d = 0, l = 1, v = 0, g = 1;
                        for (a[0] = p; l; ) {
                            var h = a[v]
                              , m = h.body;
                            l -= 1,
                            v += 1;
                            var y = m !== e;
                            m && y ? (t = m.pos.x - e.pos.x,
                            o = m.pos.y - e.pos.y,
                            0 === (i = Math.sqrt(t * t + o * o)) && (t = (r.nextDouble() - .5) / 50,
                            o = (r.nextDouble() - .5) / 50,
                            i = Math.sqrt(t * t + o * o)),
                            f += (n = u * m.mass * e.mass / (i * i * i)) * t,
                            d += n * o) : y && (t = h.massX / h.mass - e.pos.x,
                            o = h.massY / h.mass - e.pos.y,
                            0 === (i = Math.sqrt(t * t + o * o)) && (t = (r.nextDouble() - .5) / 50,
                            o = (r.nextDouble() - .5) / 50,
                            i = Math.sqrt(t * t + o * o)),
                            (h.right - h.left) / i < c ? (f += (n = u * h.mass * e.mass / (i * i * i)) * t,
                            d += n * o) : (h.quad0 && (a[g] = h.quad0,
                            l += 1,
                            g += 1),
                            h.quad1 && (a[g] = h.quad1,
                            l += 1,
                            g += 1),
                            h.quad2 && (a[g] = h.quad2,
                            l += 1,
                            g += 1),
                            h.quad3 && (a[g] = h.quad3,
                            l += 1,
                            g += 1)))
                        }
                        e.force.x += f,
                        e.force.y += d
                    },
                    options: function(e) {
                        return e ? ("number" == typeof e.gravity && (u = e.gravity),
                        "number" == typeof e.theta && (c = e.theta),
                        this) : {
                            gravity: u,
                            theta: c
                        }
                    }
                }
            }
        }
        , {
            "./insertStack": 23,
            "./isSamePosition": 24,
            "./node": 25,
            "ngraph.random": 26
        }],
        23: [function(e, n, t) {
            function r() {
                this.stack = [],
                this.popIdx = 0
            }
            n.exports = r,
            r.prototype = {
                isEmpty: function() {
                    return 0 === this.popIdx
                },
                push: function(e, n) {
                    var t = this.stack[this.popIdx];
                    t ? (t.node = e,
                    t.body = n) : this.stack[this.popIdx] = new function(e, n) {
                        this.node = e,
                        this.body = n
                    }
                    (e,n),
                    ++this.popIdx
                },
                pop: function() {
                    if (this.popIdx > 0)
                        return this.stack[--this.popIdx]
                },
                reset: function() {
                    this.popIdx = 0
                }
            }
        }
        , {}],
        24: [function(e, n, t) {
            n.exports = function(e, n) {
                var t = Math.abs(e.x - n.x)
                  , r = Math.abs(e.y - n.y);
                return t < 1e-8 && r < 1e-8
            }
        }
        , {}],
        25: [function(e, n, t) {
            n.exports = function() {
                this.body = null,
                this.quad0 = null,
                this.quad1 = null,
                this.quad2 = null,
                this.quad3 = null,
                this.mass = 0,
                this.massX = 0,
                this.massY = 0,
                this.left = 0,
                this.top = 0,
                this.bottom = 0,
                this.right = 0
            }
        }
        , {}],
        26: [function(e, n, t) {
            function r(e) {
                var n = "number" == typeof e ? e : +new Date
                  , t = function() {
                    return n = n + 2127912214 + (n << 12) & 4294967295,
                    n = 4294967295 & (3345072700 ^ n ^ n >>> 19),
                    n = n + 374761393 + (n << 5) & 4294967295,
                    n = 4294967295 & (n + 3550635116 ^ n << 9),
                    n = n + 4251993797 + (n << 3) & 4294967295,
                    (268435455 & (n = 4294967295 & (3042594569 ^ n ^ n >>> 16))) / 268435456
                };
                return {
                    next: function(e) {
                        return Math.floor(t() * e)
                    },
                    nextDouble: function() {
                        return t()
                    }
                }
            }
            n.exports = {
                random: r,
                randomIterator: function(e, n) {
                    var t = n || r();
                    if ("function" != typeof t.next)
                        throw new Error("customRandom does not match expected API: next() function is missing");
                    return {
                        forEach: function(n) {
                            var r, o, i;
                            for (r = e.length - 1; r > 0; --r)
                                o = t.next(r + 1),
                                i = e[o],
                                e[o] = e[r],
                                e[r] = i,
                                n(i);
                            e.length && n(e[0])
                        },
                        shuffle: function() {
                            var n, r, o;
                            for (n = e.length - 1; n > 0; --n)
                                r = t.next(n + 1),
                                o = e[r],
                                e[r] = e[n],
                                e[n] = o;
                            return e
                        }
                    }
                }
            }
        }
        , {}],
        27: [function(e, n, t) {
            n.exports = function(e, n, t) {
                var r = {
                    nodes: [],
                    links: []
                }
                  , o = n || function(e) {
                    var n = {
                        id: e.id
                    };
                    return void 0 !== e.data && (n.data = e.data),
                    n
                }
                  , i = t || function(e) {
                    var n = {
                        fromId: e.fromId,
                        toId: e.toId
                    };
                    return void 0 !== e.data && (n.data = e.data),
                    n
                }
                ;
                return e.forEachNode(function(e) {
                    r.nodes.push(o(e))
                }),
                e.forEachLink(function(e) {
                    r.links.push(i(e))
                }),
                JSON.stringify(r)
            }
        }
        , {}],
        28: [function(e, n, t) {
            function r(e, n) {
                var t = function(e) {
                    var n = e;
                    if ("string" == typeof e)
                        n = window.document.createElementNS(a, e);
                    else if (e.simplesvg)
                        return e;
                    var t;
                    return n.simplesvg = !0,
                    n.attr = function(e, t) {
                        return 2 === arguments.length ? (null !== t ? n.setAttributeNS(null, e, t) : n.removeAttributeNS(null, e),
                        n) : n.getAttributeNS(null, e)
                    }
                    ,
                    n.append = function(e) {
                        var t = r(e);
                        return n.appendChild(t),
                        t
                    }
                    ,
                    n.link = function(e) {
                        return arguments.length ? (n.setAttributeNS(u, "xlink:href", e),
                        n) : n.getAttributeNS(u, "xlink:href")
                    }
                    ,
                    n.text = function(e) {
                        return void 0 !== e ? (n.textContent = e,
                        n) : n.textContent
                    }
                    ,
                    n.on = function(e, t, r) {
                        return i.addEventListener(n, e, t, r),
                        n
                    }
                    ,
                    n.off = function(e, t, r) {
                        return i.removeEventListener(n, e, t, r),
                        n
                    }
                    ,
                    n.dataSource = function(e) {
                        return t || (t = o(n)),
                        t.link(e),
                        n
                    }
                    ,
                    n
                }(e);
                if (void 0 === n)
                    return t;
                for (var s = Object.keys(n), f = 0; f < s.length; ++f) {
                    var c = s[f]
                      , d = n[c];
                    "link" === c ? t.link(d) : t.attr(c, d)
                }
                return t
            }
            n.exports = r,
            r.compile = e("./lib/compile");
            var o = r.compileTemplate = e("./lib/compile_template")
              , i = e("add-event-listener")
              , a = "http://www.w3.org/2000/svg"
              , u = "http://www.w3.org/1999/xlink"
        }
        , {
            "./lib/compile": 29,
            "./lib/compile_template": 30,
            "add-event-listener": 2
        }],
        29: [function(e, n, t) {
            var r = e("./domparser.js")
              , o = e("../");
            n.exports = function(e) {
                try {
                    return e = function(e) {
                        if (e) {
                            var n = e.match(/^<\w+/);
                            if (n) {
                                var t = n[0].length;
                                return e.substr(0, t) + ' xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" ' + e.substr(t)
                            }
                            throw new Error("Cannot parse input text: invalid xml?")
                        }
                    }(e),
                    o(r.parseFromString(e, "text/xml").documentElement)
                } catch (e) {
                    throw e
                }
            }
        }
        , {
            "../": 28,
            "./domparser.js": 31
        }],
        30: [function(e, n, t) {
            function r(e, n) {
                var t = e.nodeType;
                if (1 === t || 3 === t) {
                    var i;
                    if (e.hasChildNodes()) {
                        var a = e.childNodes;
                        for (i = 0; i < a.length; ++i)
                            r(a[i], n)
                    }
                    if (3 === t && function(e, n) {
                        function t(n) {
                            e.nodeValue = n[a]
                        }
                        var r = e.nodeValue;
                        if (!r)
                            return;
                        var i = r.match(o);
                        if (!i)
                            return;
                        var a = i[1]
                          , u = (a.indexOf("."),
                        n[a]);
                        u ? u.push(t) : u = n[a] = [t]
                    }(e, n),
                    e.attributes) {
                        var u = e.attributes;
                        for (i = 0; i < u.length; ++i)
                            !function(e, n, t) {
                                function r(e) {
                                    n.setAttributeNS(null, u, e[s])
                                }
                                var i = e.value;
                                if (!i)
                                    return;
                                var a = i.match(o);
                                if (!a)
                                    return;
                                var u = e.localName
                                  , s = a[1];
                                if (!(s.indexOf(".") < 0))
                                    throw new Error("simplesvg currently does not support nested bindings");
                                var f = t[s];
                                f ? f.push(r) : f = t[s] = [r]
                            }(u[i], e, n)
                    }
                }
            }
            n.exports = function(e) {
                var n = Object.create(null);
                return r(e, n),
                {
                    link: function(e) {
                        function t(n) {
                            n(e)
                        }
                        Object.keys(n).forEach(function(e) {
                            n[e].forEach(t)
                        })
                    }
                }
            }
            ;
            var o = /{{(.+?)}}/
        }
        , {}],
        31: [function(e, n, t) {
            function r() {
                throw new Error("DOMParser is not supported by this platform. Please open issue here https://github.com/anvaka/simplesvg")
            }
            n.exports = "undefined" == typeof DOMParser ? {
                parseFromString: r
            } : new DOMParser
        }
        , {}],
        32: [function(e, n, t) {
            function r(e) {
                return i(a.betweenness(e))
            }
            function o(e, n) {
                return i(a.degree(e, n))
            }
            function i(e) {
                return Object.keys(e).sort(function(n, t) {
                    return e[t] - e[n]
                }).map(function(n) {
                    return {
                        key: n,
                        value: e[n]
                    }
                })
            }
            var a = e("ngraph.centrality");
            n.exports = function() {
                return {
                    betweennessCentrality: r,
                    degreeCentrality: o
                }
            }
        }
        , {
            "ngraph.centrality": 4
        }],
        33: [function(e, n, t) {
            n.exports = function() {
                return {
                    density: function(e, n) {
                        var t = e.getNodesCount();
                        return 0 === t ? NaN : n ? e.getLinksCount() / (t * (t - 1)) : 2 * e.getLinksCount() / (t * (t - 1))
                    }
                }
            }
        }
        , {}],
        34: [function(e, n, t) {
            n.exports = function(e, n) {
                var t = {};
                return {
                    bindDragNDrop: function(e, o) {
                        var i;
                        if (o) {
                            var a = n.getNodeUI(e.id);
                            i = r(a),
                            "function" == typeof o.onStart && i.onStart(o.onStart),
                            "function" == typeof o.onDrag && i.onDrag(o.onDrag),
                            "function" == typeof o.onStop && i.onStop(o.onStop),
                            t[e.id] = i
                        } else
                            (i = t[e.id]) && (i.release(),
                            delete t[e.id])
                    }
                }
            }
            ;
            var r = e("./dragndrop.js")
        }
        , {
            "./dragndrop.js": 35
        }],
        35: [function(e, n, t) {
            n.exports = function(e) {
                var n, t, a, u, s, f, c, d = 0, l = 0, p = !1, v = 0, g = function(e, n, r) {
                    t && t(e, {
                        x: n - d,
                        y: r - l
                    }),
                    d = n,
                    l = r
                }, h = function(e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }, m = function(e) {
                    e.preventDefault && e.preventDefault()
                }, y = function(e) {
                    return h(e),
                    !1
                }, x = function(e) {
                    e = e || window.event,
                    g(e, e.clientX, e.clientY)
                }, w = function(e) {
                    return e = e || window.event,
                    p ? (h(e),
                    !1) : 1 === e.button && null !== window.event || 0 === e.button ? (d = e.clientX,
                    l = e.clientY,
                    c = e.target || e.srcElement,
                    n && n(e, {
                        x: d,
                        y: l
                    }),
                    r.on("mousemove", x),
                    r.on("mouseup", b),
                    h(e),
                    s = window.document.onselectstart,
                    f = window.document.ondragstart,
                    window.document.onselectstart = y,
                    c.ondragstart = y,
                    !1) : void 0
                }, b = function(e) {
                    e = e || window.event,
                    r.off("mousemove", x),
                    r.off("mouseup", b),
                    window.document.onselectstart = s,
                    c.ondragstart = f,
                    c = null,
                    a && a(e)
                }, E = function(n) {
                    if ("function" == typeof u) {
                        (n = n || window.event).preventDefault && n.preventDefault(),
                        n.returnValue = !1;
                        var t, r = function(e) {
                            var n = 0
                              , t = 0;
                            return (e = e || window.event).pageX || e.pageY ? (n = e.pageX,
                            t = e.pageY) : (e.clientX || e.clientY) && (n = e.clientX + window.document.body.scrollLeft + window.document.documentElement.scrollLeft,
                            t = e.clientY + window.document.body.scrollTop + window.document.documentElement.scrollTop),
                            [n, t]
                        }(n), o = i(e), a = {
                            x: r[0] - o[0],
                            y: r[1] - o[1]
                        };
                        t = n.wheelDelta ? n.wheelDelta / 360 : n.detail / -9,
                        u(n, t, a)
                    }
                }, L = function(n) {
                    !u && n ? "webkit" === o.browser ? e.addEventListener("mousewheel", E, !1) : e.addEventListener("DOMMouseScroll", E, !1) : u && !n && ("webkit" === o.browser ? e.removeEventListener("mousewheel", E, !1) : e.removeEventListener("DOMMouseScroll", E, !1)),
                    u = n
                }, N = function(e, n) {
                    return (e.clientX - n.clientX) * (e.clientX - n.clientX) + (e.clientY - n.clientY) * (e.clientY - n.clientY)
                }, P = function(e) {
                    if (1 === e.touches.length) {
                        h(e);
                        var n = e.touches[0];
                        g(e, n.clientX, n.clientY)
                    } else if (2 === e.touches.length) {
                        var t = N(e.touches[0], e.touches[1])
                          , r = 0;
                        t < v ? r = -1 : t > v && (r = 1),
                        u(e, r, {
                            x: e.touches[0].clientX,
                            y: e.touches[0].clientY
                        }),
                        v = t,
                        h(e),
                        m(e)
                    }
                }, k = function(e) {
                    p = !1,
                    r.off("touchmove", P),
                    r.off("touchend", k),
                    r.off("touchcancel", k),
                    c = null,
                    a && a(e)
                }, j = function(e) {
                    if (1 === e.touches.length)
                        return function(e, t) {
                            h(e),
                            m(e),
                            d = t.clientX,
                            l = t.clientY,
                            c = e.target || e.srcElement,
                            n && n(e, {
                                x: d,
                                y: l
                            }),
                            p || (p = !0,
                            r.on("touchmove", P),
                            r.on("touchend", k),
                            r.on("touchcancel", k))
                        }(e, e.touches[0]);
                    2 === e.touches.length && (h(e),
                    m(e),
                    v = N(e.touches[0], e.touches[1]))
                };
                return e.addEventListener("mousedown", w),
                e.addEventListener("touchstart", j),
                {
                    onStart: function(e) {
                        return n = e,
                        this
                    },
                    onDrag: function(e) {
                        return t = e,
                        this
                    },
                    onStop: function(e) {
                        return a = e,
                        this
                    },
                    onScroll: function(e) {
                        return L(e),
                        this
                    },
                    release: function() {
                        e.removeEventListener("mousedown", w),
                        e.removeEventListener("touchstart", j),
                        r.off("mousemove", x),
                        r.off("mouseup", b),
                        r.off("touchmove", P),
                        r.off("touchend", k),
                        r.off("touchcancel", k),
                        L(null)
                    }
                }
            }
            ;
            var r = e("../Utils/documentEvents.js")
              , o = e("../Utils/browserInfo.js")
              , i = e("../Utils/findElementPosition.js")
        }
        , {
            "../Utils/browserInfo.js": 39,
            "../Utils/documentEvents.js": 40,
            "../Utils/findElementPosition.js": 41
        }],
        36: [function(e, n, t) {
            n.exports = function(e, n) {
                var t = r(n)
                  , o = null
                  , i = {}
                  , a = {
                    x: 0,
                    y: 0
                };
                return t.mouseDown(function(e, n) {
                    o = e,
                    a.x = n.clientX,
                    a.y = n.clientY,
                    t.mouseCapture(o);
                    var r = i[e.id];
                    return r && r.onStart && r.onStart(n, a),
                    !0
                }).mouseUp(function(e) {
                    t.releaseMouseCapture(o),
                    o = null;
                    var n = i[e.id];
                    return n && n.onStop && n.onStop(),
                    !0
                }).mouseMove(function(e, n) {
                    if (o) {
                        var t = i[o.id];
                        return t && t.onDrag && t.onDrag(n, {
                            x: n.clientX - a.x,
                            y: n.clientY - a.y
                        }),
                        a.x = n.clientX,
                        a.y = n.clientY,
                        !0
                    }
                }),
                {
                    bindDragNDrop: function(e, n) {
                        i[e.id] = n,
                        n || delete i[e.id]
                    }
                }
            }
            ;
            var r = e("../WebGL/webglInputEvents.js")
        }
        , {
            "../WebGL/webglInputEvents.js": 57
        }],
        37: [function(e, n, t) {
            n.exports = function(e, n) {
                function t(e) {
                    return c[e]
                }
                n = r(n, {
                    maxX: 1024,
                    maxY: 1024,
                    seed: "Deterministic randomness made me do this"
                });
                var a = o(n.seed)
                  , u = new i(Number.MAX_VALUE,Number.MAX_VALUE,Number.MIN_VALUE,Number.MIN_VALUE)
                  , s = {}
                  , f = function(e) {
                    return {
                        x: a.next(n.maxX),
                        y: a.next(n.maxY)
                    }
                }
                  , c = "function" == typeof Object.create ? Object.create(null) : {}
                  , d = function(e) {
                    c[e.id] = f(e),
                    function(e, n) {
                        e.x < n.x1 && (n.x1 = e.x),
                        e.x > n.x2 && (n.x2 = e.x),
                        e.y < n.y1 && (n.y1 = e.y),
                        e.y > n.y2 && (n.y2 = e.y)
                    }(c[e.id], u)
                }
                  , l = function() {
                    0 !== e.getNodesCount() && (u.x1 = Number.MAX_VALUE,
                    u.y1 = Number.MAX_VALUE,
                    u.x2 = Number.MIN_VALUE,
                    u.y2 = Number.MIN_VALUE,
                    e.forEachNode(d))
                }
                  , p = function(e) {
                    s[e.id] = e
                }
                  , v = function(e) {
                    for (var n = 0; n < e.length; ++n) {
                        var t = e[n];
                        t.node && ("add" === t.changeType ? d(t.node) : delete c[t.node.id]),
                        t.link && ("add" === t.changeType ? p(t.link) : delete s[t.link.id])
                    }
                };
                return e.forEachNode(d),
                e.forEachLink(p),
                e.on("changed", v),
                {
                    run: function(e) {
                        this.step()
                    },
                    step: function() {
                        return l(),
                        !0
                    },
                    getGraphRect: function() {
                        return u
                    },
                    dispose: function() {
                        e.off("change", v)
                    },
                    isNodePinned: function(e) {
                        return !0
                    },
                    pinNode: function(e, n) {},
                    getNodePosition: t,
                    getLinkPosition: function(e) {
                        var n = s[e];
                        return {
                            from: t(n.fromId),
                            to: t(n.toId)
                        }
                    },
                    setNodePosition: function(e, n, t) {
                        var r = c[e];
                        r && (r.x = n,
                        r.y = t)
                    },
                    placeNode: function(e) {
                        return "function" == typeof e ? (f = e,
                        l(),
                        this) : f(e)
                    }
                }
            }
            ;
            var r = e("ngraph.merge")
              , o = e("ngraph.random").random
              , i = e("../Utils/rect.js")
        }
        , {
            "../Utils/rect.js": 45,
            "ngraph.merge": 13,
            "ngraph.random": 26
        }],
        38: [function(e, n, t) {
            var r = e("ngraph.events");
            n.exports = function(e) {
                return console.log("This method is deprecated. Please use Viva.events() instead"),
                e ? void 0 !== e.on || void 0 !== e.off || void 0 !== e.fire ? {
                    extend: function() {
                        return e
                    },
                    on: e.on,
                    stop: e.off
                } : {
                    extend: function() {
                        var n = r(e);
                        return n.addEventListener = n.on,
                        n
                    },
                    on: e.on,
                    stop: e.off
                } : e
            }
        }
        , {
            "ngraph.events": 7
        }],
        39: [function(e, n, t) {
            n.exports = function() {
                if ("undefined" == typeof window || !window.hasOwnProperty("navigator"))
                    return {
                        browser: "",
                        version: "0"
                    };
                var e = window.navigator.userAgent.toLowerCase()
                  , n = /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(e) || [];
                return {
                    browser: n[1] || "",
                    version: n[2] || "0"
                }
            }()
        }
        , {}],
        40: [function(e, n, t) {
            function r(e, n) {
                document.addEventListener(e, n)
            }
            function o(e, n) {
                document.removeEventListener(e, n)
            }
            var i = e("./nullEvents.js");
            n.exports = void 0 === typeof document ? i : {
                on: r,
                off: o
            }
        }
        , {
            "./nullEvents.js": 44
        }],
        41: [function(e, n, t) {
            n.exports = function(e) {
                var n = 0
                  , t = 0;
                if (e.offsetParent)
                    do {
                        n += e.offsetLeft,
                        t += e.offsetTop
                    } while (null !== (e = e.offsetParent));return [n, t]
            }
        }
        , {}],
        42: [function(e, n, t) {
            n.exports = function(e) {
                if (!e)
                    throw {
                        message: "Cannot get dimensions of undefined container"
                    };
                return {
                    left: 0,
                    top: 0,
                    width: e.clientWidth,
                    height: e.clientHeight
                }
            }
        }
        , {}],
        43: [function(e, n, t) {
            var r = e("gintersect");
            n.exports = function(e, n, t, o, i, a, u, s) {
                return r(e, n, e, o, i, a, u, s) || r(e, o, t, o, i, a, u, s) || r(t, o, t, n, i, a, u, s) || r(t, n, e, n, i, a, u, s)
            }
        }
        , {
            gintersect: 3
        }],
        44: [function(e, n, t) {
            function r() {}
            n.exports = {
                on: r,
                off: r,
                stop: r
            }
        }
        , {}],
        45: [function(e, n, t) {
            n.exports = function(e, n, t, r) {
                this.x1 = e || 0,
                this.y1 = n || 0,
                this.x2 = t || 0,
                this.y2 = r || 0
            }
        }
        , {}],
        46: [function(e, n, t) {
            (function(e) {
                function t() {}
                n.exports = function() {
                    function n(e) {
                        var n = (new Date).getTime()
                          , t = Math.max(0, 16 - (n - a))
                          , r = i.setTimeout(function() {
                            e(n + t)
                        }, t);
                        return a = n + t,
                        r
                    }
                    function r(e) {
                        i.clearTimeout(e)
                    }
                    var o, i, a = 0, u = ["ms", "moz", "webkit", "o"];
                    for (i = "undefined" != typeof window ? window : void 0 !== e ? e : {
                        setTimeout: t,
                        clearTimeout: t
                    },
                    o = 0; o < u.length && !i.requestAnimationFrame; ++o) {
                        var s = u[o];
                        i.requestAnimationFrame = i[s + "RequestAnimationFrame"],
                        i.cancelAnimationFrame = i[s + "CancelAnimationFrame"] || i[s + "CancelRequestAnimationFrame"]
                    }
                    return i.requestAnimationFrame || (i.requestAnimationFrame = n),
                    i.cancelAnimationFrame || (i.cancelAnimationFrame = r),
                    function(e) {
                        function n() {
                            r = i.requestAnimationFrame(n),
                            e() || t()
                        }
                        function t() {
                            i.cancelAnimationFrame(r),
                            r = 0
                        }
                        var r;
                        return n(),
                        {
                            stop: t,
                            restart: function() {
                                r || n()
                            }
                        }
                    }
                }()
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {}],
        47: [function(e, n, t) {
            function r(e, n) {
                window.addEventListener(e, n)
            }
            function o(e, n) {
                window.removeEventListener(e, n)
            }
            var i = e("./nullEvents.js");
            n.exports = "undefined" == typeof window ? i : {
                on: r,
                off: o
            }
        }
        , {
            "./nullEvents.js": 44
        }],
        48: [function(e, n, t) {
            n.exports = function(e, n) {
                function t(e) {
                    return "string" == typeof U ? U.indexOf(e) >= 0 : "boolean" != typeof U || U
                }
                function d() {
                    D.beginRender(),
                    n.renderLinks && D.renderLinks(),
                    D.renderNodes(),
                    D.endRender()
                }
                function l() {
                    return F = S.step() && !O,
                    d(),
                    !F
                }
                function p() {
                    G || (F = !1,
                    I.restart())
                }
                function v() {
                    var e = S.getGraphRect()
                      , n = f(M)
                      , t = (e.x2 + e.x1) / 2
                      , r = (e.y2 + e.y1) / 2;
                    z.offsetX = n.width / 2 - (t * z.scale - t),
                    z.offsetY = n.height / 2 - (r * z.scale - r),
                    D.graphCenterChanged(z.offsetX, z.offsetY),
                    B = !1
                }
                function g(e) {
                    var n = S.getNodePosition(e.id);
                    D.addNode(e, n)
                }
                function h(e) {
                    D.releaseNode(e)
                }
                function m(e) {
                    var n = S.getLinkPosition(e.id);
                    D.addLink(e, n)
                }
                function y(e) {
                    D.releaseLink(e)
                }
                function x(e) {
                    if (t("node")) {
                        var n = !1;
                        _.bindDragNDrop(e, {
                            onStart: function() {
                                n = S.isNodePinned(e),
                                S.pinNode(e, !0),
                                O = !0,
                                p()
                            },
                            onDrag: function(n, t) {
                                var r = S.getNodePosition(e.id);
                                S.setNodePosition(e.id, r.x + t.x / z.scale, r.y + t.y / z.scale),
                                O = !0,
                                d()
                            },
                            onStop: function() {
                                S.pinNode(e, n),
                                O = !1
                            }
                        })
                    }
                }
                function w(e) {
                    _.bindDragNDrop(e, null)
                }
                function b(n) {
                    var t = n.node;
                    "add" === n.changeType ? (g(t),
                    x(t),
                    B && v()) : "remove" === n.changeType ? (w(t),
                    h(t),
                    0 === e.getNodesCount() && (B = !0)) : "update" === n.changeType && (w(t),
                    h(t),
                    g(t),
                    x(t))
                }
                function E(e) {
                    var t = e.link;
                    if ("add" === e.changeType)
                        n.renderLinks && m(t);
                    else if ("remove" === e.changeType)
                        n.renderLinks && y(t);
                    else if ("update" === e.changeType)
                        throw "Update type is not implemented. TODO: Implement me!"
                }
                function L(e) {
                    var n, t;
                    for (n = 0; n < e.length; n += 1)
                        (t = e[n]).node ? b(t) : t.link && E(t);
                    p()
                }
                function N() {
                    v(),
                    l()
                }
                function P() {
                    T && (T.release(),
                    T = null)
                }
                function k() {
                    e.off("changed", L)
                }
                function j(e, n) {
                    if (!n) {
                        var t = f(M);
                        n = {
                            x: t.width / 2,
                            y: t.height / 2
                        }
                    }
                    var r = Math.pow(1.4, e ? -.2 : .2);
                    return z.scale = D.scale(r, n),
                    d(),
                    q.fire("scale", z.scale),
                    z.scale
                }
                function A() {
                    R = !1,
                    k(),
                    P(),
                    a.off("resize", N),
                    q.off(),
                    I.stop(),
                    e.forEachLink(function(e) {
                        n.renderLinks && y(e)
                    }),
                    e.forEachNode(function(e) {
                        w(e),
                        h(e)
                    }),
                    S.dispose(),
                    D.release(M)
                }
                var _, I, T, C = 30, S = (n = n || {}).layout, D = n.graphics, M = n.container, U = void 0 === n.interactive || n.interactive, R = !1, B = !0, F = !1, O = !1, G = !1, z = {
                    offsetX: 0,
                    offsetY: 0,
                    scale: 1
                }, q = r({});
                return {
                    run: function(r) {
                        return R || (M = M || window.document.body,
                        S = S || o(e, {
                            springLength: 80,
                            springCoeff: 2e-4
                        }),
                        D = D || i(e, {
                            container: M
                        }),
                        n.hasOwnProperty("renderLinks") || (n.renderLinks = !0),
                        n.prerender = n.prerender || 0,
                        _ = (D.inputManager || u)(e, D),
                        function() {
                            if ("number" == typeof n.prerender && n.prerender > 0)
                                for (var e = 0; e < n.prerender; e += 1)
                                    S.step()
                        }(),
                        D.init(M),
                        e.forEachNode(g),
                        n.renderLinks && e.forEachLink(m),
                        v(),
                        a.on("resize", N),
                        P(),
                        t("drag") && (T = c(M)).onDrag(function(e, n) {
                            D.translateRel(n.x, n.y),
                            d(),
                            q.fire("drag", n)
                        }),
                        t("scroll") && (T || (T = c(M)),
                        T.onScroll(function(e, n, t) {
                            j(n < 0, t)
                        })),
                        e.forEachNode(x),
                        k(),
                        e.on("changed", L),
                        R = !0),
                        function(e) {
                            I || (I = s(e ? function() {
                                return l()
                            }
                            : l, C))
                        }(r),
                        this
                    },
                    reset: function() {
                        D.resetScale(),
                        v(),
                        z.scale = 1
                    },
                    pause: function() {
                        G = !0,
                        I.stop()
                    },
                    resume: function() {
                        G = !1,
                        I.restart()
                    },
                    rerender: function() {
                        return d(),
                        this
                    },
                    zoomOut: function() {
                        return j(!0)
                    },
                    zoomIn: function() {
                        return j(!1)
                    },
                    moveTo: function(e, n) {
                        D.graphCenterChanged(z.offsetX - e * z.scale, z.offsetY - n * z.scale),
                        d()
                    },
                    getGraphics: function() {
                        return D
                    },
                    dispose: function() {
                        A()
                    },
                    on: function(e, n) {
                        return q.on(e, n),
                        this
                    },
                    off: function(e, n) {
                        return q.off(e, n),
                        this
                    }
                }
            }
            ;
            var r = e("ngraph.events")
              , o = e("ngraph.forcelayout")
              , i = e("./svgGraphics.js")
              , a = e("../Utils/windowEvents.js")
              , u = e("../Input/domInputManager.js")
              , s = e("../Utils/timer.js")
              , f = e("../Utils/getDimensions.js")
              , c = e("../Input/dragndrop.js")
        }
        , {
            "../Input/domInputManager.js": 34,
            "../Input/dragndrop.js": 35,
            "../Utils/getDimensions.js": 42,
            "../Utils/timer.js": 46,
            "../Utils/windowEvents.js": 47,
            "./svgGraphics.js": 49,
            "ngraph.events": 7,
            "ngraph.forcelayout": 9
        }],
        49: [function(e, n, t) {
            n.exports = function() {
                var e, n, t, a = 0, u = 0, s = 1, f = {}, c = {}, d = function(e) {
                    return r("rect").attr("width", 10).attr("height", 10).attr("fill", "#00a2e8")
                }, l = function(e, n) {
                    e.attr("x", n.x - 5).attr("y", n.y - 5)
                }, p = function(e) {
                    return r("line").attr("stroke", "#999")
                }, v = function(e, n, t) {
                    e.attr("x1", n.x).attr("y1", n.y).attr("x2", t.x).attr("y2", t.y)
                }, g = function(e) {
                    e.fire("rescaled")
                }, h = {
                    x: 0,
                    y: 0
                }, m = {
                    x: 0,
                    y: 0
                }, y = {
                    x: 0,
                    y: 0
                }, x = function() {
                    if (e) {
                        var n = "matrix(" + s + ", 0, 0," + s + "," + a + "," + u + ")";
                        e.attr("transform", n)
                    }
                };
                n = function() {
                    var n = r("svg");
                    return e = r("g").attr("buffered-rendering", "dynamic"),
                    n.appendChild(e),
                    n
                }();
                var w = {
                    getNodeUI: function(e) {
                        return f[e]
                    },
                    getLinkUI: function(e) {
                        return c[e]
                    },
                    node: function(e) {
                        if ("function" == typeof e)
                            return d = e,
                            this
                    },
                    link: function(e) {
                        if ("function" == typeof e)
                            return p = e,
                            this
                    },
                    placeNode: function(e) {
                        return l = e,
                        this
                    },
                    placeLink: function(e) {
                        return v = e,
                        this
                    },
                    beginRender: function() {},
                    endRender: function() {},
                    graphCenterChanged: function(e, n) {
                        a = e,
                        u = n,
                        x()
                    },
                    inputManager: i,
                    translateRel: function(t, r) {
                        var o = n.createSVGPoint()
                          , i = e.getCTM()
                          , a = n.createSVGPoint().matrixTransform(i.inverse());
                        o.x = t,
                        o.y = r,
                        (o = o.matrixTransform(i.inverse())).x = (o.x - a.x) * i.a,
                        o.y = (o.y - a.y) * i.d,
                        i.e += o.x,
                        i.f += o.y;
                        var u = "matrix(" + i.a + ", 0, 0," + i.d + "," + i.e + "," + i.f + ")";
                        e.attr("transform", u)
                    },
                    scale: function(t, r) {
                        var o = n.createSVGPoint();
                        o.x = r.x,
                        o.y = r.y,
                        o = o.matrixTransform(e.getCTM().inverse());
                        var i = n.createSVGMatrix().translate(o.x, o.y).scale(t).translate(-o.x, -o.y)
                          , f = e.getCTM().multiply(i);
                        s = f.a,
                        a = f.e,
                        u = f.f;
                        var c = "matrix(" + f.a + ", 0, 0," + f.d + "," + f.e + "," + f.f + ")";
                        return e.attr("transform", c),
                        g(this),
                        s
                    },
                    resetScale: function() {
                        return s = 1,
                        e.attr("transform", "matrix(1, 0, 0, 1, 0, 0)"),
                        g(this),
                        this
                    },
                    init: function(e) {
                        e.appendChild(n),
                        x(),
                        "function" == typeof t && t(n)
                    },
                    release: function(e) {
                        n && e && e.removeChild(n)
                    },
                    addLink: function(n, t) {
                        var r = p(n);
                        if (r)
                            return r.position = t,
                            r.link = n,
                            c[n.id] = r,
                            e.childElementCount > 0 ? e.insertBefore(r, e.firstChild) : e.appendChild(r),
                            r
                    },
                    releaseLink: function(n) {
                        var t = c[n.id];
                        t && (e.removeChild(t),
                        delete c[n.id])
                    },
                    addNode: function(n, t) {
                        var r = d(n);
                        if (r)
                            return r.position = t,
                            r.node = n,
                            f[n.id] = r,
                            e.appendChild(r),
                            r
                    },
                    releaseNode: function(n) {
                        var t = f[n.id];
                        t && (e.removeChild(t),
                        delete f[n.id])
                    },
                    renderNodes: function() {
                        for (var e in f)
                            if (f.hasOwnProperty(e)) {
                                var n = f[e];
                                h.x = n.position.x,
                                h.y = n.position.y,
                                l(n, h, n.node)
                            }
                    },
                    renderLinks: function() {
                        for (var e in c)
                            if (c.hasOwnProperty(e)) {
                                var n = c[e];
                                m.x = n.position.from.x,
                                m.y = n.position.from.y,
                                y.x = n.position.to.x,
                                y.y = n.position.to.y,
                                v(n, m, y, n.link)
                            }
                    },
                    getGraphicsRoot: function(e) {
                        return "function" == typeof e && (n ? e(n) : t = e),
                        n
                    },
                    getSvgRoot: function() {
                        return n
                    }
                };
                return o(w),
                w
            }
            ;
            var r = e("simplesvg")
              , o = e("ngraph.events")
              , i = e("../Input/domInputManager.js")
        }
        , {
            "../Input/domInputManager.js": 34,
            "ngraph.events": 7,
            simplesvg: 28
        }],
        50: [function(e, n, t) {
            n.exports = function(e) {
                e = f(e, {
                    enableBlending: !0,
                    preserveDrawingBuffer: !1,
                    clearColor: !1,
                    clearColorValue: {
                        r: 1,
                        g: 1,
                        b: 1,
                        a: 1
                    }
                });
                var n, t, c, d, l, p, v, g, h = 0, m = 0, y = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], x = [], w = [], b = {}, E = {}, L = o(), N = i(), P = function(e) {
                    return a()
                }, k = function(e) {
                    return u(3014898687)
                }, j = function() {
                    L.updateTransform(y),
                    N.updateTransform(y)
                }, A = function() {
                    y = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                }, _ = function() {
                    n && t && (d = t.width = Math.max(n.offsetWidth, 1),
                    l = t.height = Math.max(n.offsetHeight, 1),
                    c && c.viewport(0, 0, d, l),
                    L && L.updateSize(d / 2, l / 2),
                    N && N.updateSize(d / 2, l / 2))
                };
                t = window.document.createElement("canvas");
                var I = {
                    getLinkUI: function(e) {
                        return E[e]
                    },
                    getNodeUI: function(e) {
                        return b[e]
                    },
                    node: function(e) {
                        if ("function" == typeof e)
                            return P = e,
                            this
                    },
                    link: function(e) {
                        if ("function" == typeof e)
                            return k = e,
                            this
                    },
                    placeNode: function(e) {
                        return p = e,
                        this
                    },
                    placeLink: function(e) {
                        return v = e,
                        this
                    },
                    inputManager: r,
                    beginRender: function() {},
                    endRender: function() {
                        m > 0 && L.render(),
                        h > 0 && N.render()
                    },
                    bringLinkToFront: function(e) {
                        var n, t, r = L.getFrontLinkId();
                        L.bringToFront(e),
                        r > e.id && (n = e.id,
                        t = w[r],
                        w[r] = w[n],
                        w[r].id = r,
                        w[n] = t,
                        w[n].id = n)
                    },
                    graphCenterChanged: function(e, n) {
                        y[12] = 2 * e / d - 1,
                        y[13] = 1 - 2 * n / l,
                        j()
                    },
                    addLink: function(e, n) {
                        var t = m++
                          , r = k(e);
                        return r.id = t,
                        r.pos = n,
                        L.createLink(r),
                        w[t] = r,
                        E[e.id] = r,
                        r
                    },
                    addNode: function(e, n) {
                        var t = h++
                          , r = P(e);
                        return r.id = t,
                        r.position = n,
                        r.node = e,
                        N.createNode(r),
                        x[t] = r,
                        b[e.id] = r,
                        r
                    },
                    translateRel: function(e, n) {
                        y[12] += 2 * y[0] * e / d / y[0],
                        y[13] -= 2 * y[5] * n / l / y[5],
                        j()
                    },
                    scale: function(e, n) {
                        var t = 2 * n.x / d - 1
                          , r = 1 - 2 * n.y / l;
                        return t -= y[12],
                        r -= y[13],
                        y[12] += t * (1 - e),
                        y[13] += r * (1 - e),
                        y[0] *= e,
                        y[5] *= e,
                        j(),
                        function(e) {
                            e.fire("rescaled")
                        }(this),
                        y[0]
                    },
                    resetScale: function() {
                        return A(),
                        c && (_(),
                        j()),
                        this
                    },
                    updateSize: _,
                    init: function(r) {
                        var o = {};
                        if (e.preserveDrawingBuffer && (o.preserveDrawingBuffer = !0),
                        n = r,
                        _(),
                        A(),
                        n.appendChild(t),
                        !(c = t.getContext("experimental-webgl", o))) {
                            var i = "Could not initialize WebGL. Seems like the browser doesn't support it.";
                            throw window.alert(i),
                            i
                        }
                        if (e.enableBlending && (c.blendFunc(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA),
                        c.enable(c.BLEND)),
                        e.clearColor) {
                            var a = e.clearColorValue;
                            c.clearColor(a.r, a.g, a.b, a.a),
                            this.beginRender = function() {
                                c.clear(c.COLOR_BUFFER_BIT)
                            }
                        }
                        L.load(c),
                        L.updateSize(d / 2, l / 2),
                        N.load(c),
                        N.updateSize(d / 2, l / 2),
                        j(),
                        "function" == typeof g && g(t)
                    },
                    release: function(e) {
                        t && e && e.removeChild(t)
                    },
                    isSupported: function() {
                        var e = window.document.createElement("canvas");
                        return e && e.getContext && e.getContext("experimental-webgl")
                    },
                    releaseLink: function(e) {
                        m > 0 && (m -= 1);
                        var n = E[e.id];
                        delete E[e.id],
                        L.removeLink(n);
                        var t = n.id;
                        if (t < m) {
                            if (0 === m || m === t)
                                return;
                            var r = w[m];
                            w[t] = r,
                            r.id = t
                        }
                    },
                    releaseNode: function(e) {
                        h > 0 && (h -= 1);
                        var n = b[e.id];
                        delete b[e.id],
                        N.removeNode(n);
                        var t = n.id;
                        if (t < h) {
                            if (0 === h || h === t)
                                return;
                            var r = x[h];
                            x[t] = r,
                            r.id = t,
                            N.replaceProperties(n, r)
                        }
                    },
                    renderNodes: function() {
                        for (var e = {
                            x: 0,
                            y: 0
                        }, n = 0; n < h; ++n) {
                            var t = x[n];
                            e.x = t.position.x,
                            e.y = t.position.y,
                            p && p(t, e),
                            N.position(t, e)
                        }
                    },
                    renderLinks: function() {
                        if (!this.omitLinksRendering)
                            for (var e = {
                                x: 0,
                                y: 0
                            }, n = {
                                x: 0,
                                y: 0
                            }, t = 0; t < m; ++t) {
                                var r = w[t]
                                  , o = r.pos.from;
                                n.x = o.x,
                                n.y = -o.y,
                                o = r.pos.to,
                                e.x = o.x,
                                e.y = -o.y,
                                v && v(r, n, e),
                                L.position(r, n, e)
                            }
                    },
                    getGraphicsRoot: function(e) {
                        return "function" == typeof e && (t ? e(t) : g = e),
                        t
                    },
                    setNodeProgram: function(e) {
                        if (!c && e)
                            N = e;
                        else if (e)
                            throw "Not implemented. Cannot swap shader on the fly... Yet."
                    },
                    setLinkProgram: function(e) {
                        if (!c && e)
                            L = e;
                        else if (e)
                            throw "Not implemented. Cannot swap shader on the fly... Yet."
                    },
                    transformClientToGraphCoordinates: function(e) {
                        return e.x = 2 * e.x / d - 1,
                        e.y = 1 - 2 * e.y / l,
                        e.x = (e.x - y[12]) / y[0],
                        e.y = (e.y - y[13]) / y[5],
                        e.x = e.x * (d / 2),
                        e.y = e.y * (-l / 2),
                        e
                    },
                    transformGraphToClientCoordinates: function(e) {
                        return e.x = e.x / (d / 2),
                        e.y = e.y / (-l / 2),
                        e.x = e.x * y[0] + y[12],
                        e.y = e.y * y[5] + y[13],
                        e.x = (e.x + 1) * d / 2,
                        e.y = (1 - e.y) * l / 2,
                        e
                    },
                    getNodeAtClientPos: function(e, n) {
                        if ("function" != typeof n)
                            return null;
                        this.transformClientToGraphCoordinates(e);
                        for (var t = 0; t < h; ++t)
                            if (n(x[t], e.x, e.y))
                                return x[t].node;
                        return null
                    }
                };
                return s(I),
                I
            }
            ;
            var r = e("../Input/webglInputManager.js")
              , o = e("../WebGL/webglLinkProgram.js")
              , i = e("../WebGL/webglNodeProgram.js")
              , a = e("../WebGL/webglSquare.js")
              , u = e("../WebGL/webglLine.js")
              , s = e("ngraph.events")
              , f = e("ngraph.merge")
        }
        , {
            "../Input/webglInputManager.js": 36,
            "../WebGL/webglLine.js": 58,
            "../WebGL/webglLinkProgram.js": 59,
            "../WebGL/webglNodeProgram.js": 60,
            "../WebGL/webglSquare.js": 61,
            "ngraph.events": 7,
            "ngraph.merge": 13
        }],
        51: [function(e, n, t) {
            n.exports = function(e) {
                var n = 10414335;
                if ("string" == typeof e && e)
                    if (4 === e.length && (e = e.replace(/([^#])/g, "$1$1")),
                    9 === e.length)
                        n = parseInt(e.substr(1), 16);
                    else {
                        if (7 !== e.length)
                            throw 'Color expected in hex format with preceding "#". E.g. #00ff00. Got value: ' + e;
                        n = parseInt(e.substr(1), 16) << 8 | 255
                    }
                else
                    "number" == typeof e && (n = e);
                return n
            }
        }
        , {}],
        52: [function(e, n, t) {
            n.exports = function(e) {
                this.canvas = window.document.createElement("canvas"),
                this.ctx = this.canvas.getContext("2d"),
                this.isDirty = !1,
                this.canvas.width = this.canvas.height = e
            }
        }
        , {}],
        53: [function(e, n, t) {
            function r(e, n, t, r) {
                for (var o = 0; o < r; ++o)
                    e[n + o] = e[t + o]
            }
            function o(e, n, t, r) {
                for (var o = 0; o < r; ++o) {
                    var i = e[n + o];
                    e[n + o] = e[t + o],
                    e[t + o] = i
                }
            }
            n.exports = function(e) {
                function n(n, t) {
                    var r = e.createShader(t);
                    if (e.shaderSource(r, n),
                    e.compileShader(r),
                    !e.getShaderParameter(r, e.COMPILE_STATUS)) {
                        var o = e.getShaderInfoLog(r);
                        throw window.alert(o),
                        o
                    }
                    return r
                }
                return {
                    createProgram: function(t, r) {
                        var o = e.createProgram()
                          , i = n(t, e.VERTEX_SHADER)
                          , a = n(r, e.FRAGMENT_SHADER);
                        if (e.attachShader(o, i),
                        e.attachShader(o, a),
                        e.linkProgram(o),
                        !e.getProgramParameter(o, e.LINK_STATUS)) {
                            var u = e.getShaderInfoLog(o);
                            throw window.alert(u),
                            u
                        }
                        return o
                    },
                    extendArray: function(e, n, t) {
                        if ((n + 1) * t > e.length) {
                            var r = new Float32Array(e.length * t * 2);
                            return r.set(e),
                            r
                        }
                        return e
                    },
                    copyArrayPart: r,
                    swapArrayPart: o,
                    getLocations: function(n, t) {
                        for (var r = {}, o = 0; o < t.length; ++o) {
                            var i = t[o]
                              , a = -1;
                            if ("a" === i[0] && "_" === i[1]) {
                                if (-1 === (a = e.getAttribLocation(n, i)))
                                    throw new Error("Program doesn't have required attribute: " + i);
                                r[i.slice(2)] = a
                            } else {
                                if ("u" !== i[0] || "_" !== i[1])
                                    throw new Error("Couldn't figure out your intent. All uniforms should start with 'u_' prefix, and attributes with 'a_'");
                                if (null === (a = e.getUniformLocation(n, i)))
                                    throw new Error("Program doesn't have required uniform: " + i);
                                r[i.slice(2)] = a
                            }
                        }
                        return r
                    },
                    context: e
                }
            }
        }
        , {}],
        54: [function(e, n, t) {
            var r = e("./texture.js");
            n.exports = function(e) {
                function n(n) {
                    var t = n % e;
                    return {
                        textureNumber: n / e << 0,
                        row: t / a << 0,
                        col: t % a
                    }
                }
                function t() {
                    p.isDirty = !0,
                    c = 0,
                    i = null
                }
                function o() {
                    i && (window.clearTimeout(i),
                    c += 1,
                    i = null),
                    c > 10 ? t() : i = window.setTimeout(t, 400)
                }
                var i, a = Math.sqrt(e || 1024) << 0, u = a, s = 1, f = {}, c = 0, d = [], l = [];
                if (!function(e) {
                    return 0 == (e & e - 1)
                }(e))
                    throw "Tiles per texture should be power of two.";
                var p = {
                    isDirty: !1,
                    clearDirty: function() {
                        var e;
                        for (p.isDirty = !1,
                        e = 0; e < d.length; ++e)
                            d[e].isDirty = !1
                    },
                    remove: function(e) {
                        var t = f[e];
                        if (!t)
                            return !1;
                        if (delete f[e],
                        (s -= 1) === t.offset)
                            return !0;
                        var r = n(t.offset);
                        return function(e, n) {
                            var t = d[e.textureNumber].canvas
                              , r = d[n.textureNumber].ctx
                              , o = n.col * u
                              , i = n.row * u;
                            r.drawImage(t, e.col * u, e.row * u, u, u, o, i, u, u),
                            d[e.textureNumber].isDirty = !0,
                            d[n.textureNumber].isDirty = !0
                        }(n(s), r),
                        f[l[s]].offset = t.offset,
                        l[t.offset] = l[s],
                        o(),
                        !0
                    },
                    getTextures: function() {
                        return d
                    },
                    getCoordinates: function(e) {
                        return f[e]
                    },
                    load: function(e, t) {
                        if (f.hasOwnProperty(e))
                            t(f[e]);
                        else {
                            var i = new window.Image
                              , c = s;
                            s += 1,
                            i.crossOrigin = "anonymous",
                            i.onload = function() {
                                o(),
                                function(e, t, o) {
                                    var i = n(e)
                                      , s = {
                                        offset: e
                                    };
                                    i.textureNumber >= d.length && function() {
                                        var e = new r(a * u);
                                        d.push(e)
                                    }();
                                    var c = d[i.textureNumber];
                                    c.ctx.drawImage(t, i.col * u, i.row * u, u, u),
                                    l[e] = t.src,
                                    f[t.src] = s,
                                    c.isDirty = !0,
                                    o(s)
                                }(c, i, t)
                            }
                            ,
                            i.src = e
                        }
                    }
                };
                return p
            }
        }
        , {
            "./texture.js": 52
        }],
        55: [function(e, n, t) {
            n.exports = function(e, n) {
                return {
                    _texture: 0,
                    _offset: 0,
                    size: "number" == typeof e ? e : 32,
                    src: n
                }
            }
        }
        , {}],
        56: [function(e, n, t) {
            var r = e("./webglAtlas.js")
              , o = e("./webgl.js");
            n.exports = function() {
                function e(e, n) {
                    e.nativeObject && i.deleteTexture(e.nativeObject);
                    var t = i.createTexture();
                    i.activeTexture(i["TEXTURE" + n]),
                    i.bindTexture(i.TEXTURE_2D, t),
                    i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, e.canvas),
                    i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR),
                    i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR_MIPMAP_NEAREST),
                    i.generateMipmap(i.TEXTURE_2D),
                    i.uniform1i(s["sampler" + n], n),
                    e.nativeObject = t
                }
                var n, t, i, a, u, s, f, c, d, l, p = 18, v = ["precision mediump float;", "varying vec4 color;", "varying vec3 vTextureCoord;", "uniform sampler2D u_sampler0;", "uniform sampler2D u_sampler1;", "uniform sampler2D u_sampler2;", "uniform sampler2D u_sampler3;", "void main(void) {", "   if (vTextureCoord.z == 0.) {", "     gl_FragColor = texture2D(u_sampler0, vTextureCoord.xy);", "   } else if (vTextureCoord.z == 1.) {", "     gl_FragColor = texture2D(u_sampler1, vTextureCoord.xy);", "   } else if (vTextureCoord.z == 2.) {", "     gl_FragColor = texture2D(u_sampler2, vTextureCoord.xy);", "   } else if (vTextureCoord.z == 3.) {", "     gl_FragColor = texture2D(u_sampler3, vTextureCoord.xy);", "   } else { gl_FragColor = vec4(0, 1, 0, 1); }", "}"].join("\n"), g = ["attribute vec2 a_vertexPos;", "attribute float a_customAttributes;", "uniform vec2 u_screenSize;", "uniform mat4 u_transform;", "uniform float u_tilesPerTexture;", "varying vec3 vTextureCoord;", "void main(void) {", "   gl_Position = u_transform * vec4(a_vertexPos/u_screenSize, 0, 1);", "float corner = mod(a_customAttributes, 4.);", "float tileIndex = mod(floor(a_customAttributes / 4.), u_tilesPerTexture);", "float tilesPerRow = sqrt(u_tilesPerTexture);", "float tileSize = 1./tilesPerRow;", "float tileColumn = mod(tileIndex, tilesPerRow);", "float tileRow = floor(tileIndex/tilesPerRow);", "if(corner == 0.0) {", "  vTextureCoord.xy = vec2(0, 1);", "} else if(corner == 1.0) {", "  vTextureCoord.xy = vec2(1, 1);", "} else if(corner == 2.0) {", "  vTextureCoord.xy = vec2(0, 0);", "} else {", "  vTextureCoord.xy = vec2(1, 0);", "}", "vTextureCoord *= tileSize;", "vTextureCoord.x += tileColumn * tileSize;", "vTextureCoord.y += tileRow * tileSize;", "vTextureCoord.z = floor(floor(a_customAttributes / 4.)/u_tilesPerTexture);", "}"].join("\n"), h = 1024, m = 0, y = new Float32Array(64);
                return {
                    load: function(e) {
                        i = e,
                        u = o(e),
                        n = new r(h),
                        t = u.createProgram(g, v),
                        i.useProgram(t),
                        s = u.getLocations(t, ["a_vertexPos", "a_customAttributes", "u_screenSize", "u_transform", "u_sampler0", "u_sampler1", "u_sampler2", "u_sampler3", "u_tilesPerTexture"]),
                        i.uniform1f(s.tilesPerTexture, h),
                        i.enableVertexAttribArray(s.vertexPos),
                        i.enableVertexAttribArray(s.customAttributes),
                        a = i.createBuffer()
                    },
                    position: function(e, n) {
                        var t = e.id * p;
                        y[t] = n.x - e.size,
                        y[t + 1] = n.y - e.size,
                        y[t + 2] = 4 * e._offset,
                        y[t + 3] = n.x + e.size,
                        y[t + 4] = n.y - e.size,
                        y[t + 5] = 4 * e._offset + 1,
                        y[t + 6] = n.x - e.size,
                        y[t + 7] = n.y + e.size,
                        y[t + 8] = 4 * e._offset + 2,
                        y[t + 9] = n.x - e.size,
                        y[t + 10] = n.y + e.size,
                        y[t + 11] = 4 * e._offset + 2,
                        y[t + 12] = n.x + e.size,
                        y[t + 13] = n.y - e.size,
                        y[t + 14] = 4 * e._offset + 1,
                        y[t + 15] = n.x + e.size,
                        y[t + 16] = n.y + e.size,
                        y[t + 17] = 4 * e._offset + 3
                    },
                    createNode: function(e) {
                        y = u.extendArray(y, m, p),
                        m += 1;
                        var t = n.getCoordinates(e.src);
                        t ? e._offset = t.offset : (e._offset = 0,
                        n.load(e.src, function(n) {
                            e._offset = n.offset
                        }))
                    },
                    removeNode: function(e) {
                        m > 0 && (m -= 1),
                        e.id < m && m > 0 && (e.src && n.remove(e.src),
                        u.copyArrayPart(y, e.id * p, m * p, p))
                    },
                    replaceProperties: function(e, n) {
                        n._offset = e._offset
                    },
                    updateTransform: function(e) {
                        l = !0,
                        d = e
                    },
                    updateSize: function(e, n) {
                        f = e,
                        c = n,
                        l = !0
                    },
                    render: function() {
                        i.useProgram(t),
                        i.bindBuffer(i.ARRAY_BUFFER, a),
                        i.bufferData(i.ARRAY_BUFFER, y, i.DYNAMIC_DRAW),
                        l && (l = !1,
                        i.uniformMatrix4fv(s.transform, !1, d),
                        i.uniform2f(s.screenSize, f, c)),
                        i.vertexAttribPointer(s.vertexPos, 2, i.FLOAT, !1, 3 * Float32Array.BYTES_PER_ELEMENT, 0),
                        i.vertexAttribPointer(s.customAttributes, 1, i.FLOAT, !1, 3 * Float32Array.BYTES_PER_ELEMENT, 8),
                        function() {
                            if (n.isDirty) {
                                var t, r = n.getTextures();
                                for (t = 0; t < r.length; ++t)
                                    !r[t].isDirty && r[t].nativeObject || e(r[t], t);
                                n.clearDirty()
                            }
                        }(),
                        i.drawArrays(i.TRIANGLES, 0, 6 * m)
                    }
                }
            }
        }
        , {
            "./webgl.js": 53,
            "./webglAtlas.js": 54
        }],
        57: [function(e, n, t) {
            var r = e("../Utils/documentEvents.js");
            n.exports = function(e) {
                function n(e, n, t) {
                    if (e && e.size) {
                        var r = e.position
                          , o = e.size;
                        return r.x - o < n && n < r.x + o && r.y - o < t && t < r.y + o
                    }
                    return !0
                }
                function t(t) {
                    return e.getNodeAtClientPos(t, n)
                }
                function o(e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }
                function i(e) {
                    return o(e),
                    !1
                }
                function a(e, n) {
                    var t;
                    for (t = 0; t < e.length; t += 1)
                        if (e[t].apply(void 0, n))
                            return !0
                }
                if (e.webglInputEvents)
                    return e.webglInputEvents;
                var u, s, f = null, c = [], d = [], l = [], p = [], v = [], g = [], h = [];
                !function(e) {
                    var n = {
                        x: 0,
                        y: 0
                    }
                      , m = null
                      , y = 1
                      , x = +new Date
                      , w = function(e) {
                        a(v, [m, e]),
                        n.x = e.clientX,
                        n.y = e.clientY
                    }
                      , b = function() {
                        r.off("mousemove", w),
                        r.off("mouseup", b)
                    }
                      , E = function() {
                        s = e.getBoundingClientRect()
                    };
                    window.addEventListener("resize", E),
                    E(),
                    e.addEventListener("mousemove", function(e) {
                        if (!f) {
                            y++ % 7 == 0 && (E(),
                            y = 1);
                            var r, i = !1;
                            n.x = e.clientX - s.left,
                            n.y = e.clientY - s.top,
                            (r = t(n)) && m !== r ? (m = r,
                            i = i || a(c, [m])) : null === r && m !== r && (i = i || a(d, [m]),
                            m = null),
                            i && o(e)
                        }
                    }),
                    e.addEventListener("mousedown", function(e) {
                        var f, c = !1;
                        E(),
                        n.x = e.clientX - s.left,
                        n.y = e.clientY - s.top,
                        (f = [t(n), e])[0] ? (c = a(l, f),
                        r.on("mousemove", w),
                        r.on("mouseup", b),
                        u = window.document.onselectstart,
                        window.document.onselectstart = i,
                        m = f[0]) : m = null,
                        c && o(e)
                    }),
                    e.addEventListener("mouseup", function(e) {
                        var r, i = +new Date;
                        n.x = e.clientX - s.left,
                        n.y = e.clientY - s.top;
                        var f = t(n)
                          , c = f === m;
                        (r = [f || m, e])[0] && (window.document.onselectstart = u,
                        a(i - x < 400 && c ? h : g, r),
                        x = i,
                        a(p, r) && o(e))
                    })
                }(e.getGraphicsRoot());
                var m = {
                    mouseEnter: function(e) {
                        return "function" == typeof e && c.push(e),
                        m
                    },
                    mouseLeave: function(e) {
                        return "function" == typeof e && d.push(e),
                        m
                    },
                    mouseDown: function(e) {
                        return "function" == typeof e && l.push(e),
                        m
                    },
                    mouseUp: function(e) {
                        return "function" == typeof e && p.push(e),
                        m
                    },
                    mouseMove: function(e) {
                        return "function" == typeof e && v.push(e),
                        m
                    },
                    click: function(e) {
                        return "function" == typeof e && g.push(e),
                        m
                    },
                    dblClick: function(e) {
                        return "function" == typeof e && h.push(e),
                        m
                    },
                    mouseCapture: function(e) {
                        f = e
                    },
                    releaseMouseCapture: function() {
                        f = null
                    }
                };
                return e.webglInputEvents = m,
                m
            }
        }
        , {
            "../Utils/documentEvents.js": 40
        }],
        58: [function(e, n, t) {
            var r = e("./parseColor.js");
            n.exports = function(e) {
                return {
                    color: r(e)
                }
            }
        }
        , {
            "./parseColor.js": 51
        }],
        59: [function(e, n, t) {
            var r = e("./webgl.js");
            n.exports = function() {
                var e, n, t, o, i, a, u, s, f, c, d = 2 * (2 * Float32Array.BYTES_PER_ELEMENT + Uint32Array.BYTES_PER_ELEMENT), l = ["precision mediump float;", "varying vec4 color;", "void main(void) {", "   gl_FragColor = color;", "}"].join("\n"), p = ["attribute vec2 a_vertexPos;", "attribute vec4 a_color;", "uniform vec2 u_screenSize;", "uniform mat4 u_transform;", "varying vec4 color;", "void main(void) {", "   gl_Position = u_transform * vec4(a_vertexPos/u_screenSize, 0.0, 1.0);", "   color = a_color.abgr;", "}"].join("\n"), v = 0, g = new ArrayBuffer(16 * d), h = new Float32Array(g), m = new Uint32Array(g);
                return {
                    load: function(a) {
                        n = a,
                        o = r(a),
                        e = o.createProgram(p, l),
                        n.useProgram(e),
                        i = o.getLocations(e, ["a_vertexPos", "a_color", "u_screenSize", "u_transform"]),
                        n.enableVertexAttribArray(i.vertexPos),
                        n.enableVertexAttribArray(i.color),
                        t = n.createBuffer()
                    },
                    position: function(e, n, t) {
                        var r = 6 * e.id;
                        h[r] = n.x,
                        h[r + 1] = n.y,
                        m[r + 2] = e.color,
                        h[r + 3] = t.x,
                        h[r + 4] = t.y,
                        m[r + 5] = e.color
                    },
                    createLink: function(e) {
                        !function() {
                            if ((v + 1) * d > g.byteLength) {
                                var e = new ArrayBuffer(2 * g.byteLength)
                                  , n = new Float32Array(e)
                                  , t = new Uint32Array(e);
                                t.set(m),
                                h = n,
                                m = t,
                                g = e
                            }
                        }(),
                        v += 1,
                        a = e.id
                    },
                    removeLink: function(e) {
                        v > 0 && (v -= 1),
                        e.id < v && v > 0 && o.copyArrayPart(m, 6 * e.id, 6 * v, 6)
                    },
                    updateTransform: function(e) {
                        c = !0,
                        f = e
                    },
                    updateSize: function(e, n) {
                        u = e,
                        s = n,
                        c = !0
                    },
                    render: function() {
                        n.useProgram(e),
                        n.bindBuffer(n.ARRAY_BUFFER, t),
                        n.bufferData(n.ARRAY_BUFFER, g, n.DYNAMIC_DRAW),
                        c && (c = !1,
                        n.uniformMatrix4fv(i.transform, !1, f),
                        n.uniform2f(i.screenSize, u, s)),
                        n.vertexAttribPointer(i.vertexPos, 2, n.FLOAT, !1, 3 * Float32Array.BYTES_PER_ELEMENT, 0),
                        n.vertexAttribPointer(i.color, 4, n.UNSIGNED_BYTE, !0, 3 * Float32Array.BYTES_PER_ELEMENT, 8),
                        n.drawArrays(n.LINES, 0, 2 * v),
                        a = v - 1
                    },
                    bringToFront: function(e) {
                        a > e.id && o.swapArrayPart(h, 6 * e.id, 6 * a, 6),
                        a > 0 && (a -= 1)
                    },
                    getFrontLinkId: function() {
                        return a
                    }
                }
            }
        }
        , {
            "./webgl.js": 53
        }],
        60: [function(e, n, t) {
            var r = e("./webgl.js");
            n.exports = function() {
                var e, n, t, o, i, a, u, s, f, c = 4, d = 3 * Float32Array.BYTES_PER_ELEMENT + Uint32Array.BYTES_PER_ELEMENT, l = ["precision mediump float;", "varying vec4 color;", "void main(void) {", "   gl_FragColor = color;", "}"].join("\n"), p = ["attribute vec3 a_vertexPos;", "attribute vec4 a_color;", "uniform vec2 u_screenSize;", "uniform mat4 u_transform;", "varying vec4 color;", "void main(void) {", "   gl_Position = u_transform * vec4(a_vertexPos.xy/u_screenSize, 0, 1);", "   gl_PointSize = a_vertexPos.z * u_transform[0][0];", "   color = a_color.abgr;", "}"].join("\n"), v = new ArrayBuffer(16 * d), g = new Float32Array(v), h = new Uint32Array(v), m = 0;
                return {
                    load: function(a) {
                        n = a,
                        i = r(a),
                        e = i.createProgram(p, l),
                        n.useProgram(e),
                        o = i.getLocations(e, ["a_vertexPos", "a_color", "u_screenSize", "u_transform"]),
                        n.enableVertexAttribArray(o.vertexPos),
                        n.enableVertexAttribArray(o.color),
                        t = n.createBuffer()
                    },
                    position: function(e, n) {
                        var t = e.id;
                        g[t * c] = n.x,
                        g[t * c + 1] = -n.y,
                        g[t * c + 2] = e.size,
                        h[t * c + 3] = e.color
                    },
                    updateTransform: function(e) {
                        f = !0,
                        s = e
                    },
                    updateSize: function(e, n) {
                        a = e,
                        u = n,
                        f = !0
                    },
                    removeNode: function(e) {
                        m > 0 && (m -= 1),
                        e.id < m && m > 0 && i.copyArrayPart(h, e.id * c, m * c, c)
                    },
                    createNode: function() {
                        !function() {
                            if ((m + 1) * d >= v.byteLength) {
                                var e = new ArrayBuffer(2 * v.byteLength)
                                  , n = new Float32Array(e)
                                  , t = new Uint32Array(e);
                                t.set(h),
                                g = n,
                                h = t,
                                v = e
                            }
                        }(),
                        m += 1
                    },
                    replaceProperties: function() {},
                    render: function() {
                        n.useProgram(e),
                        n.bindBuffer(n.ARRAY_BUFFER, t),
                        n.bufferData(n.ARRAY_BUFFER, v, n.DYNAMIC_DRAW),
                        f && (f = !1,
                        n.uniformMatrix4fv(o.transform, !1, s),
                        n.uniform2f(o.screenSize, a, u)),
                        n.vertexAttribPointer(o.vertexPos, 3, n.FLOAT, !1, c * Float32Array.BYTES_PER_ELEMENT, 0),
                        n.vertexAttribPointer(o.color, 4, n.UNSIGNED_BYTE, !0, c * Float32Array.BYTES_PER_ELEMENT, 12),
                        n.drawArrays(n.POINTS, 0, m)
                    }
                }
            }
        }
        , {
            "./webgl.js": 53
        }],
        61: [function(e, n, t) {
            var r = e("./parseColor.js");
            n.exports = function(e, n) {
                return {
                    size: "number" == typeof e ? e : 10,
                    color: r(n)
                }
            }
        }
        , {
            "./parseColor.js": 51
        }],
        62: [function(e, n, t) {
            n.exports = "0.8.1"
        }
        , {}]
    }, {}, [1])(1)
});
