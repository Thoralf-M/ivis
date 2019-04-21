$(document).ready(function() {
    function incomingTip(tx) {
        let isTip = true;
        if (graph.getNode(tx.hash)) {
            for (link of graph.getNode(tx.hash).links) {
                if (link.fromId === tx.hash) {
                    isTip = false;
                    break
                }
            }
        }
        settings.SPAWN_NODE_NEAR_FINAL_POSITION && graph.beginUpdate();
        const node = graph.addNode(tx.hash, tx);
        node.tip = isTip,
        node.number = node.number || ++totalCount;
        graph.getNode(tx.transaction_branch), graph.getNode(tx.transaction_trunk);
        graph.addLink(tx.transaction_branch, tx.hash), graph.addLink(tx.transaction_trunk, tx.hash);
        const branchNode = graph.getNode(tx.transaction_branch);
        branchNode.tip = false,
        branchNode.number = branchNode.number || ++totalCount;
        const trunkNode = graph.getNode(tx.transaction_trunk);
        trunkNode.tip = false,
        trunkNode.number = trunkNode.number || ++totalCount,
        settings.SPAWN_NODE_NEAR_FINAL_POSITION && graph.endUpdate();
        for (link of node.links) {
            setColor.colorLink(link);
        }
        graphNodes.update(node),
        graphNodes.update(branchNode),
        graphNodes.update(trunkNode),
        Graph.addNode(tx.hash)
    }
    function incomingMilestone(milestoneHash) {
        if (ui = graphics.getNodeUI(milestoneHash), ui) {
            addTx(graph.getNode(milestoneHash), tx => { incomingConfd(tx.id) }, false);
            const node = graph.getNode(milestoneHash);
            node && (node.milestone = true, console.log("ms found", ui), graphNodes.update(node))
        }
    }
    function incomingConfd(confirmedHash) {
        const node = graph.getNode(confirmedHash);
        node && (node.confirmed = true, graphNodes.update(node))
    }
    function addTx(node, t, o, n=false, nodeArray=[]) {
        const list = [node];
        for (; 0 !== list.length; ) {
            const tx = list.pop();
            if (nodeArray.push(tx), t(tx))
                return true;
            const txLinks = tx.links;
            for (var i = 0; i < txLinks.length; i++) {
                var a = txLinks[i];
                n && n(a),
                !o && a.toId === tx.id && nodeArray.indexOf(graph.getNode(a.fromId)) < 0 ? list.push(graph.getNode(a.fromId)) : o && a.fromId === tx.id && nodeArray.indexOf(graph.getNode(a.toId)) < 0 && list.push(graph.getNode(a.toId))
            }
        }
    }
    function d(node, t, o, n) {
        !function(e, t, o=false, n=[]) {
            let d = 0;
            for (n.push(e); n.length > d; ) {
                const e = n[d++];
                if (t(e))
                    return true;
                for (var i of e.links)
                    o && o(i),
                    n.indexOf(graph.getNode(i.fromId)) < 0 && n.push(graph.getNode(i.fromId)),
                    n.indexOf(graph.getNode(i.toId)) < 0 && n.push(graph.getNode(i.toId))
            }
        }(node, t, o, n)
    }
    function getValue(e) {
        for (var t = 0; t < U.length; t++)
            if (Math.abs(e) >= U[t].divider)
                return (e / U[t].divider).toFixed(2) + U[t].suffix;
        return e.toFixed(2)
    }
    function zoom(e, t, o) {
        (o = o || 0) > 30 || Math.abs(e - t) < .01 || (e < t ? zoom(e, t = renderer.zoomOut(), ++o) : e > t && zoom(e, t = renderer.zoomIn(), ++o))
    }
    function setHashInput(transaction) {
        $("#hash-input").val(transaction);
        const txId = transaction;
        if (graph.getNode(txId)) {
            var nodePos = layout.getNodePosition(txId);
            renderer.moveTo(nodePos.x, nodePos.y),
            renderNode.selectNode(graph.getNode(txId)),
            $("#hash-info").text("")
        } else
            $("#hash-info").text("hash not found (yet)")
    }
    function setBorder(tx, color) {
        const node = graphics.getNodeUI(tx.id);
        node.border_color = color,
        node.size = 1.4 * nodeSize
    }
    function setTagValue(tag) {
        $("#tag-input").val(tag),
        matchesTag && (graphNodes.remove(matchesTag), matchesTag = false);
        const t = tag;
        if (0 != t.length) {
            var exp = new RegExp(t,"i");
            matchesTag = graphNodes.add(node => { node.data && node.data.tag.match(exp) && setBorder(node, matchColor) })
        }
    }    
    function setAddressValue(address) {
      $("#address-input").val(address),
      matchesAddress && (graphNodes.remove(matchesTag), matchesTag = false);
      const t = address;
      if (0 != t.length) {
          var exp = new RegExp(t,"i");
          matchesAddress = graphNodes.add(node => { node.data && node.data.address.match(exp) && setBorder(node, matchColor) })
      }
  } 
    const confByColor = 4055312383
      , confingColor = 187476459
      , milestoneColor = 16261217
      , tipColor = 2089150
      , nodeSize = 30
      , p = 30
      , O = .03
      , oldNodeLimit = 4000
      , E = 1214463
      , matchColor = 14306089;
    let settings = {
        REMOVE_FLOATING_NODES: true,
        COLOR_BY_DEPTH: false,
        SIZE_BY_VALUE: false,
        SIZE_BY_WEIGHT: false,
        REMOVE_OLD_NODES: false,
        PIN_OLD_NODES: true,
        LIGHT_LINKS: false,
        LINK_COLOR: 572662527,
        NODE_COLOR: 255,
        NODE_BG_COLOR: 16777215,
        SPAWN_NODE_NEAR_FINAL_POSITION: false,
        COLOR_BY_NUMBER: true
    };
    var graph = Viva.Graph.graph();
    var graphics = Viva.Graph.View.webglGraphics()
      , layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength: 10,
        springCoeff: 1e-4,
        gravity: -4,
        dragCoeff: .02,
        timeStep: 22
    })
      , renderer = Viva.Graph.View.renderer(graph, {
        container: document.getElementById("graph"),
        graphics: graphics,
        layout: layout
    })
      , circleShader = buildCircleNodeShader();
    graphics.setNodeProgram(circleShader),
    graphics.node(function(e) {
        return new WebglCircle(10,0,0,0)
    }),
    renderer.run();
    const loader = function() {
        const wrapElem = $(".loader-wrapper"), progElem = $(".loader-wrapper .progress");
        return {
            start: function() {
                wrapElem.show()
            },
            stop: function() {
                wrapElem.hide(),
                progElem.text("")
            },
            progress: function(o, n=0, d=1) {
                if (o >= d)
                    return wrapElem.hide(),
                    void progElem.text("");
                wrapElem.show(),
                progElem.text(`${(o / (d - n) * 100).toFixed(1)}%`)
            }
        }
    }();
    loader.start();
    var Graph = function() {
        function isDeleteIndex(node) {
            return deleteQueue.indexOf(node) >= 0
        }
        function addNode(node) {
            deleteQueue.indexOf(node) < 0 && deleteQueue.push(node),
            1 == deleteQueue.length && updateQueue()
        }
        function updateQueue() {
            deleteQueue.length > 0 && (console.log("delete queue len", deleteQueue.length),
            setTimeout(()=>{
                do {
                    const nextQueueNode = deleteQueue.shift(), selectedNode = renderNode.getSelectedNode();
                    if (!nextQueueNode || selectedNode && nextQueueNode == selectedNode.id)
                        console.log("not deleted");
                    else {
                        r[nextQueueNode] && delete r[nextQueueNode];
                        for (var e of graph.getNode(nextQueueNode).links)
                            r[e.toId == nextQueueNode ? e.fromId : e.toId] = Date.now();
                        graph.removeNode(nextQueueNode),
                        removedNodeCount++
                    }
                } while (deleteQueue.length > 200);updateQueue()
            }
            , queueInterval))
        }
        function n() {
            for (nodeId in r) {
                let e = 0
                  , t = nodeId;
                console.log("iter"),
                d(graph.getNode(nodeId), o=>{
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
          , deleteQueue = [];
        const queueInterval = 50;
        let removedNodeCount = 0;
        var l = 0;
        return {
            addNode: function(node) {
                if (settings.REMOVE_FLOATING_NODES)
                    for (let e of graph.getNode(node).links)
                        void 0 !== r[e.toId] && delete r[node.id];
                r[node] = Date.now(),
                graph.getNodesCount() - 100 > oldNodeLimit && (settings.REMOVE_OLD_NODES && function() {
                    const nodeCount = graph.getNodesCount() - deleteQueue.length - oldNodeLimit
                      , o = totalCount - nodeCount;
                    let n = nodeCount;
                    graph.forEachNode(e=>{
                        if (e.number <= o && (addNode(e.id),
                        console.log("removed node", e.id),
                        --n <= 1))
                            return true
                    }
                    )
                }(),
                settings.PIN_OLD_NODES && function() {
                    const e = removedNodeCount / totalCount
                      , t = (totalCount - l) * (1 - e);
                    if (t > oldNodeLimit + 150) {
                        const o = t - oldNodeLimit
                          , n = (l + o) * (1 + e);
                        let d = o;
                        graph.forEachNode(e=>{
                            if (e.number <= n && (layout.pinNode(e, true),
                            e.number > l && (console.log("pinned node", e.id),
                            --d <= 1)))
                                return console.log("breaking -----------"),
                                true
                        }
                        ),
                        l += o
                    }
                }());
                const nodeLinks = graph.getNode(node).links;
                (isDeleteIndex(nodeLinks[0].toId) || isDeleteIndex(nodeLinks[1].toId)) && d(graph.getNode(node), e=>{
                    deleteQueue.indexOf(e.id) >= 0 && deleteQueue.splice(deleteQueue.indexOf(e.id), 1)
                }
                )
            },
            removeSmallGraphs: function() {
                const nodesCount = graph.getNodesCount();
                console.log(Object.keys(r).length),
                Object.keys(r).length * O > 2 && n();
                for (nodeId in r) {
                    if (Date.now() - r[nodeId] <= 1e3 * p)
                        continue;
                    let o = 0
                      , n = nodeId
                      , mesh = [];
                    if (Date.now(),
                    d(graph.getNode(nodeId), t=>(void 0 !== r[t.id] && (o < r[t.id] && (n = t.id,
                    o = r[t.id]),
                    delete r[t.id]),
                    mesh.push(t),
                    mesh.length >= O * nodesCount)),
                    r[n] = o,
                    mesh.length < O * nodesCount && Date.now() - o > 1e3 * p) {
                        console.log("mesh of size: " + mesh.length + " is smaller than " + 100 * O + "% of the total node count: " + O * nodesCount);
                        for (node of mesh)
                            addNode(node.id)
                    }
                }
                console.log(Object.keys(r).length)
            },
            getNodePerGraph: i,
            iterateAllNodes: function(e=false, t=false) {
                if (t && !e)
                    graph.forEachLink(t);
                else if (e && !t)
                    graph.forEachNode(e);
                else if (e && t) {
                    const o = i();
                    for (nodeId in o)
                        d(graph.getNode(nodeId), e, t)
                }
            },
            isDeleteQueueEmpty: function() {
                return 0 == deleteQueue.length
            },
            unpinOldNodes: function() {
                l = 0,
                graph.forEachNode(e=>{
                    layout.pinNode(e, false)
                }
                )
            }
        }
    }();
    const graphNodes = function() {
        function updateList(node) {
            if (node)
                for (var nodeAdd of list)
                    nodeAdd(node);
            else
                upd && (upd = false,
                Graph.iterateAllNodes(node=>{
                    for (var nodeRemove of list)
                        nodeRemove(node)
                }
                ))
        }
        var list = [];
        let upd = false;
        return {
            add: function(node) {
                return upd = true,
                list.push(node),
                updateList(),
                node
            },
            remove: function(node) {
                upd = true,
                list.splice(list.indexOf(node), 1),
                updateList()
            },
            update: updateList,
            clearCache: function() {
                upd = true,
                updateList()
            }
        }
    }()
      , setColor = function() {
        return {
            colorNode: function(tx) {
                const nodeUI = graphics.getNodeUI(tx.id);
                nodeUI.border_color = settings.NODE_COLOR >>> 8,
                tx.tip ? (nodeUI.color = tipColor,
                nodeUI.border_size = .6) : tx.milestone ? (nodeUI.border_size = .6,
                nodeUI.color = milestoneColor) : tx.confirmed ? (nodeUI.border_size = 1,
                nodeUI.color = settings.NODE_BG_COLOR) : (nodeUI.border_size = .8,
                nodeUI.color = settings.NODE_BG_COLOR)
            },
            colorLink: function(tx) {
                graphics.getLinkUI(tx.id).color = settings.LINK_COLOR
            }
        }
    }();
    graphNodes.add(setColor.colorNode),
    graphNodes.add(node => { graphics.getNodeUI(node.id).size = nodeSize });
    let totalCount = 0;
    const search = function() {
        var searchParams = new URLSearchParams(window.location.search);
        return {
            get: function(t) {
                searchParams.get(t)
            },
            getAll: function(t) {
                searchParams.getAll(t)
            },
            set: function(t, o) {
                searchParams.set(t, o)
            },
            has: function(t) {
                searchParams.has(t)
            }
        }
    }();
    for (let setting in settings)
        search.has(setting) && (settings[setting] = "true" === search.get(setting));
    var websocket = io.connect("/", { transports: ["websocket"] });
    websocket.on("tx", msg=>{ incomingTip(msg) }),
    websocket.on("sn", msg=>{ incomingConfd(msg.hash) }),
    websocket.on("ms", msg=>{ incomingMilestone(msg) }),
    websocket.on("inittx", msg => {
        let cnt = 0;
        for (node of msg) {
            loader.progress(++cnt, 0, msg.length), incomingTip(node);    
        }
        !function() {
            loader.stop();
            var searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has("hash") ? setHashInput(searchParams.get("hash")) : searchParams.has("tag") && setTagValue(searchParams.get("tag")), searchParams.has("address") && setAddressValue(searchParams.get("address")),
            searchParams.has("tool")) {
                var script = document.createElement("script");
                script.src = searchParams.get("tool") + ".js",
                document.head.appendChild(script)
            }
            searchParams.has("clean") && $("div").not("#graph").hide()
        }()
    }),
    websocket.on("initsn", msg => {
        for (tx of msg) {
            incomingConfd(tx.hash)
        }            
    }),
    websocket.on("initms", msg => {
        for (tx of msg) {
            incomingMilestone(tx)
        }
    });
    var events = Viva.Graph.webglInputEvents(graphics, graph);
    const renderNode = function() {
        function check(tx) {
            var nodeUI = graphics.getNodeUI(tx.id);
            if (nodeUI) {
                nodeUI.size = 1.6 * nodeSize,
                layout.pinNode(tx, true);
                var nodesBack = [], nodesFwd = [];
                return updateBatch(tx, confingColor, confingColor, true, nodesBack),
                updateBatch(tx, confByColor, confByColor, false, nodesFwd),
                function(tx) {
                    return children = false,
                    graph.forEachLinkedNode(tx.id, (e,t) => (children = true, true), true),
                    children
                }(tx) || (graphics.getNodeUI(tx.id).border_color = confingColor >>> 8),
                {
                    seenNodesBackwards: nodesBack,
                    seenNodesForward: nodesFwd
                }
            }
        }
        function updateColor(tx) {
            var nodeUI = graphics.getNodeUI(tx.id);
            nodeUI && (nodeUI.border_color = settings.NODE_COLOR >>> 8,
            graphNodes.update(tx),
            layout.pinNode(tx, false),
            addTx(tx, e=>graphNodes.update(e), true, e=>setColor.colorLink(e)),
            addTx(tx, e=>graphNodes.update(e), false, e=>setColor.colorLink(e)))
        }
        function updateBatch(node, t, n, d=false, nodeArray=[]) {
            var nodeId = node.id
              , nodeLinks = node.links;
            if (nodeArray.indexOf(nodeId) >= 0)
                return;
            nodeArray.push(nodeId);
            var nodeUI = graphics.getNodeUI(node.id);
            nodeUI.border_color = t >>> 8;
            const bundle = ((graph.getNode(nodeArray[0]) || {}).data || {}).bundle_hash;
            bundle && bundle === ((node || {}).data || {}).bundle_hash && (nodeUI.border_color = E);
            for (var l = 0; l < nodeLinks.length; l++) {
                var link = nodeLinks[l];
                if (d && link.toId === nodeId) {
                    updateBatch(graph.getNode(link.fromId), t, n, d, nodeArray);
                    graphics.getLinkUI(link.id).color = n
                } else if (!d && link.fromId === nodeId) {
                    updateBatch(graph.getNode(link.toId), t, n, d, nodeArray);
                    graphics.getLinkUI(link.id).color = n
                }
            }
        }
        function updateElems() {
            if (activeNode)
                var t = check(activeNode);
            if (activeNode) {
                if (void 0 !== activeNode.data) {
                    const node = renderNode.getActiveNode();
                    txInfoElem.html("value: " + getValue(+node.data.value) + "i<br>tx tag: " + node.data.tag + "<br>tx hash: " + node.data.hash + "<br>bundle hash (" + node.data.current_index + "|" + node.data.last_index + "): " + node.data.bundle_hash + "<br>address "+node.data.address)
                }
                confingElem.text(t.seenNodesForward.length - 1),
                confByElem.text(t.seenNodesBackwards.length - 1)
            } else
                txInfoElem.html(""),
                confingElem.text(""),
                confByElem.text("")
        }
        let currNode = null, selectedNode = null, activeNode = null;
                const txInfoElem = $("#tx-info")
          , confByElem = $("#confirmed-by-count")
          , confingElem = $("#confirming-count");
        return {
            selectNode: function(e) {
                selectedNode && updateColor(selectedNode),
                currNode && updateColor(currNode),
                e ? (selectedNode = e, activeNode = e) : (selectedNode = null, activeNode = currNode),
                updateElems()
            },
            hoverNode: function(e) {
                selectedNode && updateColor(selectedNode),
                currNode && updateColor(currNode),
                e ? (currNode = e,
                activeNode = e) : (currNode = null,
                activeNode = selectedNode),
                updateElems()
            },
            updateActiveNodeSelection: updateElems,
            getActiveNode: function() {
                return activeNode
            },
            getSelectedNode: function() {
                return selectedNode
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
    events.mouseEnter(function(e) {
        document.body.style.cursor = "pointer",
        renderNode.hoverNode(e),
        P = e
    }).mouseLeave(function(e) {
        document.body.style.cursor = "default",
        renderNode.hoverNode(),
        P = null
    });
    let M = false;
    $("canvas").mousedown(function() {
        M = false
    }).mousemove(function() {
        M = true
    }).mouseup(function() {
        var e = M;
        M = false,
        console.log(e),
        e || renderNode.selectNode(P)
    }),
    setInterval(()=>{
        renderNode.updateActiveNodeSelection(),
        graphNodes.update()
    }
    , 3e3);
    const nodeCntElem = $("#node-counter"), confdRatioElem = $("#confirmed-ratio"), tipsRatioElem = $("#tips-ratio"), tpsElem = $("#tps");
    let confirmedCount = 1, tipCount = 0, intervalCount = 0;
    
    websocket.on("initms", ()=>{
        Graph.iterateAllNodes(tx=>{
            tx.confirmed && confirmedCount++,
            tx.tip && tipCount++
        }
        )
    }
    ),
    websocket.on("tx", ()=>{
        intervalCount++,
        tipCount += tipCount / graph.getNodesCount() - .01
    }
    ),
    websocket.on("ms", ()=>{
        confirmedCount = 0,
        tipCount = 0,
        Graph.iterateAllNodes(tx=>{
            tx.confirmed && confirmedCount++,
            tx.tip && tipCount++
        }
        )
    }
    ),
    setInterval(()=>{
        nodeCntElem.text("transactions: " + graph.getNodesCount()),
        confdRatioElem.text("confirmed ratio: " + (confirmedCount / graph.getNodesCount() * 100).toFixed(2) + "%"),
        tipsRatioElem.text("tips ratio: " + (tipCount / graph.getNodesCount() * 100).toFixed(2) + "%")
    }
    , 500);
    const W = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    setInterval(()=>{
        W.push(intervalCount / 2e3 * 1e3),
        W.shift();
        const e = W.reduce((e,t)=>e + t, 0) / W.length;
        tpsElem.text("(30s avg) tps: " + e.toFixed(2)),
        intervalCount = 0
    }
    , 2e3),
    setInterval(()=>{
        settings.REMOVE_FLOATING_NODES && Graph.removeSmallGraphs()
    }
    , 1e3 * p),
    $("body").keypress(function(e) {
        e.which;
        if (event.ctrlKey && "f" === event.key) {
            e.preventDefault();
            var t = layout.getGraphRect();
            console.log(t);
            var o = Math.min(t.x2 - t.x1, t.y2 - t.y1)
              , n = Math.min(document.body.clientWidth, document.body.clientHeight) / o;
            return console.log(n),
            renderer.moveTo(0, 0),
            zoom(n, renderer.zoomOut()),
            false
        }
    }),
    zoom(.1, 1),
    window.select = function(e) {
        node = graph.getNode(e),
        selectNodeAndChildren(node),
        selectedNode = node
    }
    ,
    $("#hash-input").keypress(function(e) {
        if (13 == e.which || "Enter" === event.key)
            return e.preventDefault(),
            setHashInput($("#hash-input").val().trim()),
            false
    });
    let matchesTag = false;
    $("#tag-input").keypress(function(e) {
        if (13 == e.which || "Enter" === event.key)
            return e.preventDefault(),
            setTagValue($("#tag-input").val().trim()),
            false
    });
    let matchesAddress = false;
    $("#address-input").keypress(function(e) {
        if (13 == e.which || "Enter" === event.key)
            return e.preventDefault(),
            setAddressValue($("#address-input").val().trim()),
            false
    });
    let matchesBundle = false;
    $("#bundle-hash-input").keypress(function(e) {
        if (13 == e.which || "Enter" === event.key) {
            e.preventDefault(),
            matchesBundle && (graphNodes.remove(matchesBundle),
            matchesBundle = false);
            const t = $("#bundle-hash-input").val().trim();
            if (0 == t.length)
                return;
            return matchesBundle = graphNodes.add(e=>{
                e.data && e.data.bundle_hash === t && setBorder(e, 1214463)
            }
            ),
            false
        }
    });
    let q = false;
    $("#SIZE_BY_DEPTH").change(function() {
        if ($("#SIZE_BY_VALUE").prop("checked", false),
        $("#SIZE_BY_WEIGHT").prop("checked", false),
        settings.COLOR_BY_DEPTH = !!this.checked,
        q && (graphNodes.remove(q),
        q = false),
        settings.COLOR_BY_DEPTH) {
            let t = {};
            function e(e) {
                let o = 0;
                addTx(e, ()=>{
                    o++
                }
                , true),
                t[e.id] = o
            }
            Graph.iterateAllNodes(t=>{
                e(t)
            }
            ),
            q = graphNodes.add(o=>{
                t.hasOwnProperty(o.id) || e(o);
                graphics.getNodeUI(o.id).size = 10 + t[o.id] / graph.getNodesCount() * 80
            }
            )
        }
    }),
    $("#SIZE_BY_WEIGHT").change(function() {
        if ($("#SIZE_BY_VALUE").prop("checked", false),
        $("#SIZE_BY_DEPTH").prop("checked", false),
        settings.COLOR_BY_WEIGHT = !!this.checked,
        q && (graphNodes.remove(q),
        q = false),
        settings.COLOR_BY_WEIGHT) {
            let t = {};
            function e(e) {
                let o = 0;
                addTx(e, ()=>{
                    o++
                }
                , false),
                t[e.id] = o
            }
            Graph.iterateAllNodes(t=>{
                e(t)
            }
            ),
            q = graphNodes.add(o=>{
                t.hasOwnProperty(o.id) || e(o);
                graphics.getNodeUI(o.id).size = 10 + t[o.id] / graph.getNodesCount() * 80
            }
            )
        }
    }),
    $("#SIZE_BY_VALUE").change(function(e) {
        if ($("#SIZE_BY_DEPTH").prop("checked", false),
        $("#SIZE_BY_WEIGHT").prop("checked", false),
        settings.SIZE_BY_VALUE = !!this.checked,
        q && (graphNodes.remove(q),
        q = false),
        settings.SIZE_BY_VALUE) {
            let e = 0;
            Graph.iterateAllNodes(node=>{
                node.data && node.data.value && +node.data.value > e && (e = +node.data.value)
            }
            ),
            console.log("maxval", e),
            q = graphNodes.add(t=>{
                t.data && t.data.value && t.data.value > e && graphNodes.clearCache();
                graphics.getNodeUI(t.id).size = t.data && t.data.value ? 1 + Math.sqrt(1 + Math.abs(+t.data.value) / e * 80 * 80) : 1
            }
            )
        }
    });
    let J = false;
    $("#COLOR_BY_NUMBER").change(function(e) {
        settings.COLOR_BY_NUMBER = !!this.checked,
        J && (graphNodes.remove(J),
        J = false),
        settings.COLOR_BY_NUMBER && (J = graphNodes.add(e=>{
            graphics.getNodeUI(e.id).border_color = function(e, t, o) {
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
        settings.REMOVE_FLOATING_NODES = !!this.checked
    }),
    $("#PIN_OLD_NODES").change(function() {
        settings.PIN_OLD_NODES = !!this.checked,
        settings.PIN_OLD_NODES || Graph.unpinOldNodes()
    }),
    $("#REMOVE_OLD_NODES").change(function() {
        settings.REMOVE_OLD_NODES = !!this.checked
    }),
    $("#SPAWN_NODE_NEAR_FINAL_POSITION").change(function() {
        settings.SPAWN_NODE_NEAR_FINAL_POSITION = !!this.checked
    }),
    $("#LIGHT_LINKS").change(function() {
        settings.LIGHT_LINKS = !!this.checked,
        settings.LINK_COLOR = settings.LIGHT_LINKS ? 2863311615 : settings.DARK_MODE ? 4008636159 : 572662527,
        Graph.iterateAllNodes(false, e=>setColor.colorLink(e))
    }),
    $("#DARK_MODE").change(function() {
        settings.DARK_MODE = !!this.checked,
        settings.LINK_COLOR = settings.DARK_MODE ? 4008636159 : 572662527,
        settings.NODE_COLOR = settings.DARK_MODE ? 4008636159 : 255,
        settings.NODE_BG_COLOR = settings.DARK_MODE ? 3355443 : 16777215,
        Graph.iterateAllNodes(false, e=>setColor.colorLink(e)),
        graphNodes.clearCache(),
        $("body").toggleClass("dark-mode")
    }),
    websocket.on("config", e=>{
        $("#network").text(e.networkName)
    }
    );
    window.exp = {
        Graphs: Graph,
        layout: layout,
        graphics: graphics
    }
});
