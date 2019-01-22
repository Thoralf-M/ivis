$(document).ready(function() {
    function e(e) {
        let t = !0;
        if (L.getNode(e.hash))
            for (link of L.getNode(e.hash).links)
                if (link.fromId === e.hash) {
                    t = !1;
                    break
                }
        m.SPAWN_NODE_NEAR_FINAL_POSITION && L.beginUpdate();
        const o = L.addNode(e.hash, e);
        o.tip = t,
        o.number = o.number || ++C;
        L.getNode(e.transaction_branch),
        L.getNode(e.transaction_trunk);
        L.addLink(e.transaction_branch, e.hash),
        L.addLink(e.transaction_trunk, e.hash);
        const n = L.getNode(e.transaction_branch);
        n.tip = !1,
        n.number = n.number || ++C;
        const d = L.getNode(e.transaction_trunk);
        d.tip = !1,
        d.number = d.number || ++C,
        m.SPAWN_NODE_NEAR_FINAL_POSITION && L.endUpdate();
        for (link of o.links)
            R.colorLink(link);
        w.update(o),
        w.update(n),
        w.update(d),
        A.addNode(e.hash)
    }
    function t(e) {
        if (ui = k.getNodeUI(e),
        ui) {
            n(L.getNode(e), e=>{
                o(e.id)
            }
            , !1);
            const t = L.getNode(e);
            t && (t.milestone = !0,
            console.log("ms found", ui),
            w.update(t))
        }
    }
    function o(e) {
        const t = L.getNode(e);
        t && (t.confirmed = !0,
        w.update(t))
    }
    function n(e, t, o, n=!1, d=[]) {
        const i = [e];
        for (; 0 !== i.length; ) {
            const e = i.pop();
            if (d.push(e),
            t(e))
                return !0;
            const s = e.links;
            for (var r = 0; r < s.length; r++) {
                var a = s[r];
                n && n(a),
                !o && a.toId === e.id && d.indexOf(L.getNode(a.fromId)) < 0 ? i.push(L.getNode(a.fromId)) : o && a.fromId === e.id && d.indexOf(L.getNode(a.toId)) < 0 && i.push(L.getNode(a.toId))
            }
        }
    }
    function d(e, t, o, n) {
        !function(e, t, o=!1, n=[]) {
            let d = 0;
            for (n.push(e); n.length > d; ) {
                const e = n[d++];
                if (t(e))
                    return !0;
                for (var i of e.links)
                    o && o(i),
                    n.indexOf(L.getNode(i.fromId)) < 0 && n.push(L.getNode(i.fromId)),
                    n.indexOf(L.getNode(i.toId)) < 0 && n.push(L.getNode(i.toId))
            }
        }(e, t, o, n)
    }
    function i(e) {
        for (var t = 0; t < U.length; t++)
            if (Math.abs(e) >= U[t].divider)
                return (e / U[t].divider).toFixed(2) + U[t].suffix;
        return e.toFixed(2)
    }
    function r(e, t, o) {
        (o = o || 0) > 30 || Math.abs(e - t) < .01 || (e < t ? r(e, t = b.zoomOut(), ++o) : e > t && r(e, t = b.zoomIn(), ++o))
    }
    function a(e) {
        $("#hash-input").val(e);
        const t = e;
        if (L.getNode(t)) {
            var o = D.getNodePosition(t);
            b.moveTo(o.x, o.y),
            T.selectNode(L.getNode(t)),
            $("#hash-info").text("")
        } else
            $("#hash-info").text("hash not found (yet)")
    }
    function s(e, t) {
        const o = k.getNodeUI(e.id);
        o.border_color = t,
        o.size = 1.4 * _
    }
    function c(e) {
        $("#tag-input").val(e),
        j && (w.remove(j),
        j = !1);
        const t = e;
        if (0 != t.length) {
            var o = new RegExp(t,"i");
            j = w.add(e=>{
                e.data && e.data.tag.match(o) && s(e, I)
            }
            )
        }
    }
    function l(e) {
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(e)
    }
    function u(e, t, o) {
        for (var n = e.length, d = t.length, i = 0, r = o.length, a = [], s = 0, c = o.length - 1; c >= 0; c--)
            a[s++] = e.indexOf(o.charAt(c));
        for (var l of a)
            if (l >= n || l < 0)
                return "Error: Not a valid number for this input base";
        var u = Number.parseInt(r * (Math.log(n) / Math.log(d)) + 1)
          , f = []
          , h = [];
        for (c = 0; c <= u; c++)
            h[c] = 0,
            f[c] = 0;
        for (f[0] = 1,
        c = 0; c < r; c++) {
            for (i = 0; i < u; i++) {
                h[i] += f[i] * a[c];
                var g = h[i]
                  , N = 0
                  , _ = i;
                do {
                    N = g / d | 0,
                    h[_] = g - N * d,
                    h[++_] += N,
                    g = h[_]
                } while (g >= d)
            }
            for (i = 0; i < u; i++)
                f[i] = f[i] * n;
            for (i = 0; i < u; i++) {
                g = f[i],
                N = 0,
                _ = i;
                do {
                    N = g / d | 0,
                    f[_] = g - N * d,
                    f[++_] += N,
                    g = f[_]
                } while (g >= d)
            }
        }
        console.log(h);
        var p = ""
          , O = !1;
        for (c = u; c >= 0; c--)
            0 !== h[c] && (O = !0),
            O && (p += t.charAt(h[c]));
        return p
    }
    const f = 4055312383
      , h = 3795711231
      , g = 15023471
      , N = 2089150
      , _ = 30
      , p = 30
      , O = .03
      , v = 4e3
      , E = 1214463
      , I = 14306089;
    let m = {
        REMOVE_FLOATING_NODES: !0,
        COLOR_BY_DEPTH: !1,
        SIZE_BY_VALUE: !1,
        SIZE_BY_WEIGHT: !1,
        REMOVE_OLD_NODES: !1,
        PIN_OLD_NODES: !0,
        LIGHT_LINKS: !1,
        LINK_COLOR: 572662527,
        NODE_COLOR: 255,
        NODE_BG_COLOR: 16777215,
        SPAWN_NODE_NEAR_FINAL_POSITION: !1,
        COLOR_BY_NUMBER: !0
    };
    var L = Viva.Graph.graph();
    var k = Viva.Graph.View.webglGraphics()
      , D = Viva.Graph.Layout.forceDirected(L, {
        springLength: 10,
        springCoeff: 1e-4,
        gravity: -4,
        dragCoeff: .02,
        timeStep: 22
    })
      , b = Viva.Graph.View.renderer(L, {
        container: document.getElementById("graph"),
        graphics: k,
        layout: D
    })
      , x = buildCircleNodeShader();
    k.setNodeProgram(x),
    k.node(function(e) {
        return new WebglCircle(10,0,0,0)
    }),
    b.run();
    const S = function() {
        const e = $(".loader-wrapper")
          , t = $(".loader-wrapper .progress");
        return {
            start: function() {
                e.show()
            },
            stop: function() {
                e.hide(),
                t.text("")
            },
            progress: function(o, n=0, d=1) {
                if (o >= d)
                    return e.hide(),
                    void t.text("");
                e.show(),
                t.text(`${(o / (d - n) * 100).toFixed(1)}%`)
            }
        }
    }();
    S.start();
    var A = function() {
        function e(e) {
            return a.indexOf(e) >= 0
        }
        function t(e) {
            a.indexOf(e) < 0 && a.push(e),
            1 == a.length && o()
        }
        function o() {
            a.length > 0 && (console.log("delete queue len", a.length),
            setTimeout(()=>{
                do {
                    const t = a.shift()
                      , o = T.getSelectedNode();
                    if (!t || o && t == o.id)
                        console.log("not deleted");
                    else {
                        r[t] && delete r[t];
                        for (var e of L.getNode(t).links)
                            r[e.toId == t ? e.fromId : e.toId] = Date.now();
                        L.removeNode(t),
                        c++
                    }
                } while (a.length > 200);o()
            }
            , s))
        }
        function n() {
            for (nodeId in r) {
                let e = 0
                  , t = nodeId;
                console.log("iter"),
                d(L.getNode(nodeId), o=>{
                    void 0 !== r[o.id] && (e < r[o.id] && (t = o.id,
                    e = r[o.id]),
                    delete r[o.id])
                }
                ),
                r[t] = e
            }
        }
        function i() {
            return n(),
            r
        }
        let r = {}
          , a = [];
        const s = 50;
        let c = 0;
        var l = 0;
        return {
            addNode: function(o) {
                if (m.REMOVE_FLOATING_NODES)
                    for (let e of L.getNode(o).links)
                        void 0 !== r[e.toId] && delete r[node.id];
                r[o] = Date.now(),
                L.getNodesCount() - 100 > v && (m.REMOVE_OLD_NODES && function() {
                    const e = L.getNodesCount() - a.length - v
                      , o = C - e;
                    let n = e;
                    L.forEachNode(e=>{
                        if (e.number <= o && (t(e.id),
                        console.log("removed node", e.id),
                        --n <= 1))
                            return !0
                    }
                    )
                }(),
                m.PIN_OLD_NODES && function() {
                    const e = c / C
                      , t = (C - l) * (1 - e);
                    if (t > v + 150) {
                        const o = t - v
                          , n = (l + o) * (1 + e);
                        let d = o;
                        L.forEachNode(e=>{
                            if (e.number <= n && (D.pinNode(e, !0),
                            e.number > l && (console.log("pinned node", e.id),
                            --d <= 1)))
                                return console.log("breaking -----------"),
                                !0
                        }
                        ),
                        l += o
                    }
                }());
                const n = L.getNode(o).links;
                (e(n[0].toId) || e(n[1].toId)) && d(L.getNode(o), e=>{
                    a.indexOf(e.id) >= 0 && a.splice(a.indexOf(e.id), 1)
                }
                )
            },
            removeSmallGraphs: function() {
                const e = L.getNodesCount();
                console.log(Object.keys(r).length),
                Object.keys(r).length * O > 2 && n();
                for (nodeId in r) {
                    if (Date.now() - r[nodeId] <= 1e3 * p)
                        continue;
                    let o = 0
                      , n = nodeId
                      , i = [];
                    if (Date.now(),
                    d(L.getNode(nodeId), t=>(void 0 !== r[t.id] && (o < r[t.id] && (n = t.id,
                    o = r[t.id]),
                    delete r[t.id]),
                    i.push(t),
                    i.length >= O * e)),
                    r[n] = o,
                    i.length < O * e && Date.now() - o > 1e3 * p) {
                        console.log("mesh of size: " + i.length + " is smaller than " + 100 * O + "% of the total node count: " + O * e);
                        for (node of i)
                            t(node.id)
                    }
                }
                console.log(Object.keys(r).length)
            },
            getNodePerGraph: i,
            iterateAllNodes: function(e=!1, t=!1) {
                if (t && !e)
                    L.forEachLink(t);
                else if (e && !t)
                    L.forEachNode(e);
                else if (e && t) {
                    const o = i();
                    for (nodeId in o)
                        d(L.getNode(nodeId), e, t)
                }
            },
            isDeleteQueueEmpty: function() {
                return 0 == a.length
            },
            unpinOldNodes: function() {
                l = 0,
                L.forEachNode(e=>{
                    D.pinNode(e, !1)
                }
                )
            }
        }
    }();
    const w = function() {
        function e(e) {
            if (e)
                for (var n of t)
                    n(e);
            else
                o && (o = !1,
                A.iterateAllNodes(e=>{
                    for (var o of t)
                        o(e)
                }
                ))
        }
        var t = [];
        let o = !1;
        return {
            add: function(n) {
                return o = !0,
                t.push(n),
                e(),
                n
            },
            remove: function(n) {
                o = !0,
                t.splice(t.indexOf(n), 1),
                e()
            },
            update: e,
            clearCache: function() {
                o = !0,
                e()
            }
        }
    }()
      , R = function() {
        return {
            colorNode: function(e) {
                const t = k.getNodeUI(e.id);
                t.border_color = m.NODE_COLOR >>> 8,
                e.tip ? (t.color = N,
                t.border_size = .6) : e.milestone ? (t.border_size = .6,
                t.color = g) : e.confirmed ? (t.border_size = 1,
                t.color = m.NODE_BG_COLOR) : (t.border_size = .8,
                t.color = m.NODE_BG_COLOR)
            },
            colorLink: function(e) {
                k.getLinkUI(e.id).color = m.LINK_COLOR
            }
        }
    }();
    w.add(R.colorNode),
    w.add(e=>{
        k.getNodeUI(e.id).size = _
    }
    );
    let C = 0;
    const y = function() {
        var e = new URLSearchParams(window.location.search);
        return {
            get: function(t) {
                e.get(t)
            },
            getAll: function(t) {
                e.getAll(t)
            },
            set: function(t, o) {
                e.set(t, o)
            },
            has: function(t) {
                e.has(t)
            }
        }
    }();
    for (let e in m)
        y.has(e) && (m[e] = "true" === y.get(e));
    var B = io.connect("/", {
        transports: ["websocket"]
    });
    B.on("tx", t=>{
        e(t)
    }
    ),
    B.on("sn", e=>{
        o(e.hash)
    }
    ),
    B.on("ms", e=>{
        t(e)
    }
    ),
    B.on("inittx", t=>{
        let o = 0;
        for (node of t)
            S.progress(++o, 0, t.length),
            e(node);
        !function() {
            S.stop();
            var e = new URLSearchParams(window.location.search);
            if (e.has("hash") ? a(e.get("hash")) : e.has("tag") && c(e.get("tag")),
            e.has("tool")) {
                var t = document.createElement("script");
                t.src = e.get("tool") + ".js",
                document.head.appendChild(t)
            }
            e.has("clean") && $("div").not("#graph").hide()
        }()
    }
    ),
    B.on("initsn", e=>{
        for (node of e)
            o(node.hash)
    }
    ),
    B.on("initms", e=>{
        for (ms of e)
            t(ms)
    }
    );
    var G = Viva.Graph.webglInputEvents(k, L);
    const T = function() {
        function e(e) {
            var t = k.getNodeUI(e.id);
            if (t) {
                t.size = 1.6 * _,
                D.pinNode(e, !0);
                var n = []
                  , d = [];
                return o(e, h, h, !0, n),
                o(e, f, f, !1, d),
                function(e) {
                    return children = !1,
                    L.forEachLinkedNode(e.id, (e,t)=>(children = !0,
                    !0), !0),
                    children
                }(e) || (k.getNodeUI(e.id).border_color = h >>> 8),
                {
                    seenNodesBackwards: n,
                    seenNodesForward: d
                }
            }
        }
        function t(e) {
            var t = k.getNodeUI(e.id);
            t && (t.border_color = m.NODE_COLOR >>> 8,
            w.update(e),
            D.pinNode(e, !1),
            n(e, e=>w.update(e), !0, e=>R.colorLink(e)),
            n(e, e=>w.update(e), !1, e=>R.colorLink(e)))
        }
        function o(e, t, n, d=!1, i=[]) {
            var r = e.id
              , a = e.links;
            if (i.indexOf(r) >= 0)
                return;
            i.push(r);
            var s = k.getNodeUI(e.id);
            s.border_color = t >>> 8;
            const c = ((L.getNode(i[0]) || {}).data || {}).bundle_hash;
            c && c === ((e || {}).data || {}).bundle_hash && (s.border_color = E);
            for (var l = 0; l < a.length; l++) {
                var u = a[l];
                if (d && u.toId === r) {
                    o(L.getNode(u.fromId), t, n, d, i);
                    k.getLinkUI(u.id).color = n
                } else if (!d && u.fromId === r) {
                    o(L.getNode(u.toId), t, n, d, i);
                    k.getLinkUI(u.id).color = n
                }
            }
        }
        function d() {
            if (s)
                var t = e(s);
            if (s) {
                if (void 0 !== s.data) {
                    const e = T.getActiveNode();
                    c.html("value: " + i(+e.data.value) + "i<br>tx tag: " + e.data.tag + "<br>tx hash: " + e.data.hash + "<br>bundle hash (" + e.data.current_index + "|" + e.data.last_index + "): " + e.data.bundle_hash + "<br>")
                }
                u.text(t.seenNodesForward.length - 1),
                l.text(t.seenNodesBackwards.length - 1)
            } else
                c.html(""),
                u.text(""),
                l.text("")
        }
        let r = null
          , a = null
          , s = null;
        const c = $("#tx-info")
          , l = $("#confirmed-by-count")
          , u = $("#confirming-count");
        return {
            selectNode: function(e) {
                a && t(a),
                r && t(r),
                e ? (a = e,
                s = e) : (a = null,
                s = r),
                d()
            },
            hoverNode: function(e) {
                a && t(a),
                r && t(r),
                e ? (r = e,
                s = e) : (r = null,
                s = a),
                d()
            },
            updateActiveNodeSelection: d,
            getActiveNode: function() {
                return s
            },
            getSelectedNode: function() {
                return a
            }
        }
    }();
    var U = [{
        divider: 1e18,
        suffix: "P"
    }, {
        divider: 1e15,
        suffix: "E"
    }, {
        divider: 1e12,
        suffix: "T"
    }, {
        divider: 1e9,
        suffix: "G"
    }, {
        divider: 1e6,
        suffix: "M"
    }, {
        divider: 1e3,
        suffix: "k"
    }];
    let P = null;
    G.mouseEnter(function(e) {
        document.body.style.cursor = "pointer",
        T.hoverNode(e),
        P = e
    }).mouseLeave(function(e) {
        document.body.style.cursor = "default",
        T.hoverNode(),
        P = null
    });
    let M = !1;
    $("canvas").mousedown(function() {
        M = !1
    }).mousemove(function() {
        M = !0
    }).mouseup(function() {
        var e = M;
        M = !1,
        console.log(e),
        e || T.selectNode(P)
    }),
    setInterval(()=>{
        T.updateActiveNodeSelection(),
        w.update()
    }
    , 3e3);
    const V = $("#node-counter")
      , Y = $("#confirmed-ratio")
      , F = $("#tips-ratio")
      , H = $("#tps");
    let K = 1
      , Z = 0
      , z = 0;
    B.on("initms", ()=>{
        A.iterateAllNodes(e=>{
            e.confirmed && K++,
            e.tip && Z++
        }
        )
    }
    ),
    B.on("tx", ()=>{
        z++,
        Z += Z / L.getNodesCount() - .01
    }
    ),
    B.on("ms", ()=>{
        K = 0,
        Z = 0,
        A.iterateAllNodes(e=>{
            e.confirmed && K++,
            e.tip && Z++
        }
        )
    }
    ),
    setInterval(()=>{
        V.text("transactions: " + L.getNodesCount()),
        Y.text("confirmed ratio: " + (K / L.getNodesCount() * 100).toFixed(2) + "%"),
        F.text("tips ratio: " + (Z / L.getNodesCount() * 100).toFixed(2) + "%")
    }
    , 500);
    const W = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    setInterval(()=>{
        W.push(z / 2e3 * 1e3),
        W.shift();
        const e = W.reduce((e,t)=>e + t, 0) / W.length;
        H.text("(30s avg) tps: " + e.toFixed(2)),
        z = 0
    }
    , 2e3),
    setInterval(()=>{
        m.REMOVE_FLOATING_NODES && A.removeSmallGraphs()
    }
    , 1e3 * p),
    $("body").keypress(function(e) {
        e.which;
        if (event.ctrlKey && "f" === event.key) {
            e.preventDefault();
            var t = D.getGraphRect();
            console.log(t);
            var o = Math.min(t.x2 - t.x1, t.y2 - t.y1)
              , n = Math.min(document.body.clientWidth, document.body.clientHeight) / o;
            return console.log(n),
            b.moveTo(0, 0),
            r(n, b.zoomOut()),
            !1
        }
    }),
    r(.1, 1),
    window.select = function(e) {
        node = L.getNode(e),
        selectNodeAndChildren(node),
        selectedNode = node
    }
    ,
    $("#hash-input").keypress(function(e) {
        if (13 == e.which || "Enter" === event.key)
            return e.preventDefault(),
            a($("#hash-input").val().trim()),
            !1
    });
    let j = !1;
    $("#tag-input").keypress(function(e) {
        if (13 == e.which || "Enter" === event.key)
            return e.preventDefault(),
            c($("#tag-input").val().trim()),
            !1
    });
    let Q = !1;
    $("#bundle-hash-input").keypress(function(e) {
        if (13 == e.which || "Enter" === event.key) {
            e.preventDefault(),
            Q && (w.remove(Q),
            Q = !1);
            const t = $("#bundle-hash-input").val().trim();
            if (0 == t.length)
                return;
            return Q = w.add(e=>{
                e.data && e.data.bundle_hash === t && s(e, 1214463)
            }
            ),
            !1
        }
    });
    let q = !1;
    $("#SIZE_BY_DEPTH").change(function() {
        if ($("#SIZE_BY_VALUE").prop("checked", !1),
        $("#SIZE_BY_WEIGHT").prop("checked", !1),
        m.COLOR_BY_DEPTH = !!this.checked,
        q && (w.remove(q),
        q = !1),
        m.COLOR_BY_DEPTH) {
            let t = {};
            function e(e) {
                let o = 0;
                n(e, ()=>{
                    o++
                }
                , !0),
                t[e.id] = o
            }
            A.iterateAllNodes(t=>{
                e(t)
            }
            ),
            q = w.add(o=>{
                t.hasOwnProperty(o.id) || e(o);
                k.getNodeUI(o.id).size = 10 + t[o.id] / L.getNodesCount() * 80
            }
            )
        }
    }),
    $("#SIZE_BY_WEIGHT").change(function() {
        if ($("#SIZE_BY_VALUE").prop("checked", !1),
        $("#SIZE_BY_DEPTH").prop("checked", !1),
        m.COLOR_BY_WEIGHT = !!this.checked,
        q && (w.remove(q),
        q = !1),
        m.COLOR_BY_WEIGHT) {
            let t = {};
            function e(e) {
                let o = 0;
                n(e, ()=>{
                    o++
                }
                , !1),
                t[e.id] = o
            }
            A.iterateAllNodes(t=>{
                e(t)
            }
            ),
            q = w.add(o=>{
                t.hasOwnProperty(o.id) || e(o);
                k.getNodeUI(o.id).size = 10 + t[o.id] / L.getNodesCount() * 80
            }
            )
        }
    }),
    $("#SIZE_BY_VALUE").change(function(e) {
        if ($("#SIZE_BY_DEPTH").prop("checked", !1),
        $("#SIZE_BY_WEIGHT").prop("checked", !1),
        m.SIZE_BY_VALUE = !!this.checked,
        q && (w.remove(q),
        q = !1),
        m.SIZE_BY_VALUE) {
            let e = 0;
            A.iterateAllNodes(t=>{
                t.data && t.data.value && +t.data.value > e && (e = +t.data.value)
            }
            ),
            console.log("maxval", e),
            q = w.add(t=>{
                t.data && t.data.value && t.data.value > e && w.clearCache();
                k.getNodeUI(t.id).size = t.data && t.data.value ? 1 + Math.sqrt(1 + Math.abs(+t.data.value) / e * 80 * 80) : 1
            }
            )
        }
    });
    let J = !1;
    $("#COLOR_BY_NUMBER").change(function(e) {
        m.COLOR_BY_NUMBER = !!this.checked,
        J && (w.remove(J),
        J = !1),
        m.COLOR_BY_NUMBER && (J = w.add(e=>{
            k.getNodeUI(e.id).border_color = function(e, t, o) {
                e /= 360,
                o /= 100;
                let n, d, i;
                if (0 == (t /= 100))
                    n = d = i = o;
                else {
                    const r = (e,t,o)=>(o < 0 && (o += 1),
                    o > 1 && (o -= 1),
                    o < 1 / 6 ? e + 6 * (t - e) * o : o < .5 ? t : o < 2 / 3 ? e + (t - e) * (2 / 3 - o) * 6 : e)
                      , a = o < .5 ? o * (1 + t) : o + t - o * t
                      , s = 2 * o - a;
                    n = r(s, a, e + 1 / 3),
                    d = r(s, a, e),
                    i = r(s, a, e - 1 / 3)
                }
                return n = ~~(255 * n),
                d = ~~(255 * d),
                (i = ~~(255 * i)) | d << 8 | n << 16
            }(e.number % 3600 / 10, 80, 50)
        }
        ))
    }),
    $("#REMOVE_FLOATING_NODES").change(function() {
        m.REMOVE_FLOATING_NODES = !!this.checked
    }),
    $("#PIN_OLD_NODES").change(function() {
        m.PIN_OLD_NODES = !!this.checked,
        m.PIN_OLD_NODES || A.unpinOldNodes()
    }),
    $("#REMOVE_OLD_NODES").change(function() {
        m.REMOVE_OLD_NODES = !!this.checked
    }),
    $("#SPAWN_NODE_NEAR_FINAL_POSITION").change(function() {
        m.SPAWN_NODE_NEAR_FINAL_POSITION = !!this.checked
    }),
    $("#LIGHT_LINKS").change(function() {
        m.LIGHT_LINKS = !!this.checked,
        m.LINK_COLOR = m.LIGHT_LINKS ? 2863311615 : m.DARK_MODE ? 4008636159 : 572662527,
        A.iterateAllNodes(!1, e=>R.colorLink(e))
    }),
    $("#DARK_MODE").change(function() {
        m.DARK_MODE = !!this.checked,
        m.LINK_COLOR = m.DARK_MODE ? 4008636159 : 572662527,
        m.NODE_COLOR = m.DARK_MODE ? 4008636159 : 255,
        m.NODE_BG_COLOR = m.DARK_MODE ? 3355443 : 16777215,
        A.iterateAllNodes(!1, e=>R.colorLink(e)),
        w.clearCache(),
        $("body").toggleClass("dark-mode")
    }),
    B.on("donation", e=>{
        console.log(e),
        $("#donation-amount").text((e / 1e6).toFixed(3))
    }
    ),
    B.on("donations", e=>{
        console.log(e),
        $(".donations").empty();
        for (var t of e) {
            var o = u(X, ee, t.tag.replace(new RegExp("9","g"), "")).toLowerCase();
            $(".donations").append("<div class='donation'><span>" + i(+t.value) + "i</span>" + (l(o) ? "<a href='" + o + "' target='_blank'>" + o + "</a>" : o) + "</div>")
        }
    }
    ),
    B.on("config", e=>{
        $("#network").text(e.networkName)
    }
    ),
    $("#donation-message").keyup(function(e) {
        var t = u(ee, X, $("#donation-message").val().toUpperCase())
          , o = u(X, ee, t).toLowerCase();
        $("#donation-message-preview").html(" preview: " + (l(o) ? "<a href='" + o + "' target='_blank'>" + o + "</a>" : o)),
        $("#donation-message-tag").text(t.length > 27 ? "message too long or unknown char (A-Z, a-z 0-9, [:.-/])" : t)
    }),
    $(".donation-container button").click(()=>{
        $(".donation-hidden").show()
    }
    ),
    B.on("donation-address", e=>{
        console.log("address", e),
        $(".donation-address").text(e)
    }
    );
    var X = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      , ee = " HTPS:/WABCDEFGIJKLMNOQRUVXYZ-.9876543210)";
    window.exp = {
        Graphs: A,
        layout: D,
        graphics: k
    }
});
