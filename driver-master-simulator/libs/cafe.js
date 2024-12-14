var cafe;
!function(t) {
    t.logType = 1,
    t.isZip = !1;
    var n = 0;
    t.getid = function(t) {
        return t._cid ? t._cid : (t._cid = n,
        n++,
        t._cid)
    }
}(cafe || (cafe = {})),
function(t) {
    !function(n) {
        var e = function() {
            function io() {}
            return io.initTable = function(t, n, e) {
                for (var o = t[0], a = 1; a < t.length; a++) {
                    for (var i = t[a], r = {}, c = 0; c < o.length; c++)
                        r[o[c]] = i[c];
                    n.push(r),
                    e[i[0]] = r
                }
            }
            ,
            io.readFile = function(n) {
                return t.com.too.create(function(t, e) {
                    Laya.loader.load(n, Laya.Handler.create(self, function(n) {
                        t(n)
                    }))
                })
            }
            ,
            io.readJson = function(t) {
                return n.too.create(function(n, e) {
                    Laya.loader.load(t, Laya.Handler.create(self, function(t) {
                        var e = JSON.parse(t);
                        n(e)
                    }))
                })
            }
            ,
            io.resHash = {},
            io.resJsonHash = {},
            io
        }();
        n.io = e
    }(t.com || (t.com = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        var n = function() {
            function too(t) {
                this.curIdx = -1,
                this._callbacks = [],
                this._succbacks = [],
                this.idx = 0,
                this.total = 0,
                this._callbacks[this.total] = t || function(t, n) {
                    t()
                }
                ,
                this._succbacks[this.total] = null
            }
            return too.create = function(t) {
                return new too(t)
            }
            ,
            too.prototype.add = function(t) {
                return this.total++,
                this._callbacks[this.total] = t,
                this
            }
            ,
            too.prototype.then = function(t) {
                return this._succbacks[this.total] = t,
                this
            }
            ,
            too.prototype.error = function(t) {
                return this._failback = t,
                this
            }
            ,
            too.prototype.start = function() {
                return this.next(),
                this
            }
            ,
            too.prototype.next = function() {
                var t = this;
                if (t.curIdx != t.idx)
                    try {
                        if (t.curIdx = t.idx,
                        t.idx > t.total)
                            return;
                        (0,
                        t._callbacks[t.idx])(function(n) {
                            t._succbacks[t.idx] && t._succbacks[t.idx](n),
                            t.idx++,
                            t.idx <= t.total && t.next()
                        }, function(n) {
                            t._failback && t._failback(n)
                        })
                    } catch (n) {
                        serror("第" + t.idx + "步出错" + n.stack),
                        t._failback && t._failback("第" + t.idx + "步出错")
                    }
            }
            ,
            too
        }();
        t.too = n
    }(t.com || (t.com = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(n) {
        n.initCafeGlobal = function(n) {
            t.game_id = n.game_id,
            t.game_tag = n.game_tag,
            n.isZip && (t.isZip = n.isZip),
            n.logType && (t.logType = n.logType),
            n.table_path && (t.table_path = n.table_path),
            n.config_path && (t.config_path = n.config_path)
        }
        ,
        n.enter = function() {
            return new t.com.too(function(e, o) {
                t.isZip ? t.com.io.readFile("config.zip").then(function(t) {
                    n.zip = new JSZip(t),
                    e()
                }).start() : e()
            }
            )
        }
    }(t.app || (t.app = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        var n = function() {
            function BaseCmd(t) {
                void 0 === t && (t = 0),
                this.desc = "",
                this.id = t
            }
            return BaseCmd.prototype.toEncodeScocketByteArray = function() {
                return null
            }
            ,
            BaseCmd.prototype.createBodySegment = function() {
                return null
            }
            ,
            BaseCmd.prototype.createBody = function() {}
            ,
            BaseCmd.prototype.writeUTF = function(t, n) {}
            ,
            BaseCmd.prototype.write64Int = function(t, n) {}
            ,
            BaseCmd.prototype.read64Int = function(t) {
                return null
            }
            ,
            BaseCmd
        }();
        t.BaseCmd = n
    }(t.cmd || (t.cmd = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(n) {
        var e = function() {
            function BaseConfig(t) {
                this.exist = !1,
                this.name = t
            }
            return BaseConfig.prototype.exp = function(n, e) {
                switch (e) {
                case 0:
                    this.path = t.config_path + n,
                    this.ext = ".json",
                    this.dejson(),
                    this.exist = !0
                }
            }
            ,
            BaseConfig.prototype.dejson = function() {
                if (t.isZip) {
                    var n = t.app.zip.file(this.path + this.ext).asText();
                    this._table = window.JSON.parse(n)
                } else
                    this._table = Laya.loader.getRes(this.path + this.ext)
            }
            ,
            BaseConfig.prototype.table = function() {
                return this._table
            }
            ,
            BaseConfig
        }();
        n.BaseConfig = e
    }(t.config || (t.config = {}))
}(cafe || (cafe = {})),
function(t) {
    var n, e;
    n = t.data || (t.data = {}),
    e = function() {
        function BaseData(t) {
            this.isInitComplete = !0,
            this.name = t
        }
        return BaseData.prototype.readData = function() {}
        ,
        BaseData.prototype.register = function() {}
        ,
        BaseData.prototype.dispose = function() {}
        ,
        BaseData.prototype.invalidate = function(n, e) {
            void 0 === n && (n = "all"),
            void 0 === e && (e = null);
            t.event.dispatch(this.name + "_" + n, {
                type: n,
                value: e,
                data: this
            }),
            "all" != n && t.event.dispatch(this.name + "_all", {
                type: n,
                value: e,
                data: this
            })
        }
        ,
        BaseData.prototype.saveData = function() {}
        ,
        BaseData.ALL = "all",
        BaseData
    }(),
    n.BaseData = e
}(cafe || (cafe = {})),
function(t) {
    var n, e;
    n = t.msg || (t.msg = {}),
    e = function() {
        function BaseMsg() {}
        return BaseMsg.prototype.getErrorCode = function() {
            return this.error
        }
        ,
        BaseMsg.prototype.getError = function() {
            return ""
        }
        ,
        BaseMsg.prototype.read = function(t) {
            var n;
            try {
                n = !0;
                var e = JSON.parse(t);
                if (0 != e.error)
                    this.error = e.error,
                    n = !1;
                else
                    for (var o = this.getObject(), a = 0; a < o.length; a++)
                        this[o[a]] = e.data[o[a]]
            } catch (t) {
                n = !1
            }
            return n
        }
        ,
        BaseMsg.prototype.wirte = function() {
            try {
                for (var t = {}, n = this.getObject(), e = !1, o = 0; o < n.length; o++)
                    (this[n[o]] || 0 == this[n[o]]) && (t[n[o]] = this[n[o]],
                    e = !0);
                if (!e)
                    return !1;
                this.toMsg = t,
                this.toMsgString = JSON.stringify(t)
            } catch (t) {
                return !1
            }
            return !0
        }
        ,
        BaseMsg.prototype.toData = function(t) {
            try {
                for (var n = this.getObject(), e = !1, o = 0; o < n.length; o++)
                    (this[n[o]] || 0 == this[n[o]]) && (t[n[o]] = this[n[o]],
                    e = !0);
                if (!e)
                    return !1
            } catch (t) {
                return !1
            }
            return !0
        }
        ,
        BaseMsg.prototype.getObject = function() {
            return null
        }
        ,
        BaseMsg
    }(),
    n.BaseMsg = e
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        var n = function() {
            function BaseProxy(t) {
                this.name = t
            }
            return BaseProxy.prototype.register = function() {}
            ,
            BaseProxy.prototype.dispose = function() {}
            ,
            BaseProxy
        }();
        t.BaseProxy = n
    }(t.proxy || (t.proxy = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        var n = function() {
            function BaseSQL(t) {
                this.isLocalData = !1;
                this.invalidates = [],
                this.handlers = [],
                this._sql = {},
                this.sqlname = t,
                this.initSQL()
            }
            return BaseSQL.prototype.initSQL = function() {
                for (var t = this.changeType(), n = 0; n < t.length; n++) {
                    var e = t[n];
                    this._sql[e] = this.read(n)
                }
            }
            ,
            BaseSQL.prototype.connect = function(t) {
                t ? (this.handlers[this.handlers.length] = t,
                this.connectRef(t)) : serror("连接失败，没有传回调")
            }
            ,
            BaseSQL.prototype.connectRef = function(t) {}
            ,
            BaseSQL.prototype.invalidate = function(t, n) {
                void 0 === n && (n = 0);
                -1 == this.invalidates.indexOf(n) && (this.invalidates[this.invalidates.length] = n);
                for (var e = 0; e < this.handlers.length; e++) {
                    this.handlers[e].runWith(t)
                }
            }
            ,
            BaseSQL.prototype.save = function(t) {
                void 0 === t && (t = 0);
                var n = this.changeType()[t];
                localSaveJson(this.sqlname + "_" + n, this._sql[n]),
                this.invalidates = []
            }
            ,
            BaseSQL.prototype.changeType = function() {
                return ["all"]
            }
            ,
            BaseSQL.prototype.read = function(t) {
                void 0 === t && (t = 0);
                var n = this.changeType()[t];
                return localReadJson(this.sqlname + "_" + n)
            }
            ,
            BaseSQL
        }();
        t.BaseSQL = n
    }(t.sql || (t.sql = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(n) {
        var e = function() {
            function BaseTable(t) {
                this.exist = !1,
                this.name = t
            }
            return BaseTable.prototype.exp = function(n, e) {
                switch (e) {
                case 0:
                    this.path = t.table_path + n,
                    this.ext = ".json",
                    this.dejson(),
                    this.exist = !0
                }
            }
            ,
            BaseTable.prototype.dejson = function() {
                if (t.isZip) {
                    var n = t.app.zip.file(this.path + this.ext).asText();
                    this._tb = window.JSON.parse(n)
                } else
                    this._tb = Laya.loader.getRes(this.path + this.ext)
            }
            ,
            BaseTable.prototype.tb = function() {
                return this._tb
            }
            ,
            BaseTable
        }();
        n.BaseTable = e
    }(t.table || (t.table = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        var n = function() {
            return function(t) {
                this.NAME = "",
                this.NAME = t
            }
        }();
        t.BaseTemp = n
    }(t.temp || (t.temp = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        t.init = function(t) {
            window.systems = t
        }
        ,
        t.reg = function(t) {
            window.systems || (window.systems = {}),
            null == window.systems[t.name] && (window.systems[t.name] = t.table())
        }
    }(t.config || (t.config = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(n) {
        var e = {};
        function get(t) {
            return e[t]
        }
        n.reg = function(t) {
            return null == e[t.name] && (e[t.name] = t),
            t
        }
        ,
        n.del = function(t) {
            return null != e[t] && delete e[t],
            null
        }
        ,
        n.get = get,
        n.has = function(t) {
            return null != e[t]
        }
        ,
        n.on = function(n, e, o, a, i) {
            void 0 === a && (a = "all"),
            void 0 === i && (i = !0),
            t.event.on(n + "_" + a, e, o);
            var r = get(n);
            i && call([o, e], r)
        }
        ,
        n.off = function(n, e, o, a) {
            void 0 === a && (a = "all"),
            t.event.off(n + "_" + a, e, o)
        }
    }(t.data || (t.data = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(n) {
        var e = {};
        n.on = function(n, o, a, i, r) {
            void 0 === i && (i = 3),
            void 0 === r && (r = !0),
            e[n] || (e[n] = []);
            var c = t.getid(a)
              , s = e[n].filter(function(t) {
                return t.gid == c
            })[0];
            s || (s = {
                handler: [a, o],
                gid: c,
                priority: i,
                isActive: r
            },
            e[n].push(s)),
            e[n].sort(function(t, n) {
                return t.priority - n.priority
            })
        }
        ,
        n.setActiveState = function(n, o, a, i) {
            var r = t.getid(a);
            if (e[n]) {
                var c = e[n].filter(function(t) {
                    return t.gid == r
                })[0];
                c && (c.isActive = i)
            }
        }
        ,
        n.off = function(n, o, a) {
            var i = t.getid(a);
            if (e[n])
                for (var r = e[n].filter(function(t) {
                    return t.gid == i
                }), c = 0; c < r.length; c++) {
                    var s = r[c];
                    if (s) {
                        var u = e[n].indexOf(s);
                        -1 != u && e[n].splice(u, 1)
                    }
                }
        }
        ,
        n.dispatch = function(t, n) {
            var o = e[t];
            if (o)
                for (var a = 0; a < o.length; a++) {
                    var i = o[a];
                    i.isActive && call(i.handler, n)
                }
        }
    }(t.event || (t.event = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        var n;
        t.install = function() {
            n = {}
        }
        ,
        t.reg = function(t, e, o) {
            n[t] = {
                target: e,
                valuename: o
            }
        }
        ,
        t.get = function(t) {
            var e = n[t];
            return e.target ? e.target[e.valuename] : null
        }
        ,
        t.set = function(t, e) {
            var o = n[t];
            o.target && (o.target[o.valuename] = e)
        }
    }(t.global || (t.global = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(n) {
        var e = {}
          , o = {}
          , a = {}
          , i = [];
        function mountCapture(t, n) {
            var o = e[t];
            for (var a in o)
                if (!call(o[a], n))
                    return !1;
            return !0
        }
        function mountEvtLength(t) {
            var n = 0;
            for (var e in o[t])
                n++;
            return n
        }
        n.mountOn = function(n, o, a) {
            e[n] || (e[n] = {});
            var i = t.getid(a);
            e[n][i] || (e[n][i] = [a, o])
        }
        ,
        n.reg = function(t, n) {
            a[t] = n
        }
        ,
        n.mountOff = function(n, o, a) {
            var i = t.getid(a);
            e[n] && e[n][i] && delete e[n][i]
        }
        ,
        n.mountCapture = mountCapture,
        n.on = function(n, e, a) {
            o[n] || (o[n] = {});
            var i = t.getid(a);
            o[n][i] || (o[n][i] = [a, e])
        }
        ,
        n.off = function(n, e, a) {
            var i = t.getid(a);
            o[n] && o[n][i] && delete o[n][i]
        }
        ,
        n.mountEvtLength = mountEvtLength,
        n.dispatch = function(t, n) {
            e[t],
            mountEvtLength(t) > 0 && i.push({
                type: t,
                priority: a[t],
                time: (new Date).valueOf(),
                data: n
            }),
            i.sort(function(t, n) {
                return t.priority < n.priority ? -1 : t.priority > n.priority ? 1 : t.time < n.time ? -1 : t.time > n.time ? 1 : 0
            })
        }
        ,
        n.execute = function() {
            if (!(i.length <= 0)) {
                var t = i[0];
                if (mountCapture(t.type, t.data)) {
                    i.shift();
                    var n = o[t.type];
                    for (var e in n)
                        call(n[e], t.data)
                }
            }
        }
    }(t.mount || (t.mount = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        var n, e = {};
        function domsg(t, n) {
            if (null == e[t])
                return trace("ID为" + t + "的消息找不到对应的类处理"),
                !1;
            var o = null
              , a = e[t].mType;
            return null != a && (o = new a),
            !(null != o && !o.read(n)) && (null == o ? e[t].func[1].apply(e[t].func[0]) : call(e[t].func, o),
            !0)
        }
        t.initSocket = function(t) {
            n = t
        }
        ,
        t.reg = function(t, o, a, i) {
            if (void 0 === i && (i = null),
            null != e[t])
                return !1;
            var r = {};
            return r.func = [o, a],
            r.mType = i,
            e[t] = r,
            n.on(t, function(n) {
                serror("收到协议：", t),
                domsg(t, n)
            }),
            !0
        }
        ,
        t.del = function(t) {
            e[t] = null
        }
        ,
        t.domsg = domsg
    }(t.msg || (t.msg = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        var n = {};
        t.addAll = function() {
            for (var t in n)
                n[t].register()
        }
        ,
        t.removeAll = function() {
            for (var t in n)
                n[t].dispose()
        }
        ,
        t.reg = function(t) {
            null == n[t.name] && (n[t.name] = t)
        }
        ,
        t.get = function(t) {
            return n[t]
        }
        ,
        t.has = function(t) {
            return null != n[t]
        }
        ,
        t.del = function(t) {
            null != n[t.name] && delete n[t.name]
        }
    }(t.proxy || (t.proxy = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        var n;
        function checkSQLChange() {
            for (var t in n) {
                for (var e = n[t], o = e.invalidates.length, a = 0; a < o; a++) {
                    e.invalidates[a];
                    e.save()
                }
                e.invalidates = []
            }
        }
        t.init = function() {
            n = {},
            Laya.stage.timerLoop(5e3, null, checkSQLChange)
        }
        ,
        t.reg = function(t) {
            return n[t.sqlname] = t,
            t
        }
        ,
        t.checkSQLChange = checkSQLChange
    }(t.sql || (t.sql = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(t) {
        t.init = function(t) {
            window.tbs = t
        }
        ,
        t.reg = function(t) {
            window.tbs || (window.tbs = {}),
            null == window.tbs[t.name] && (window.tbs[t.name] = t)
        }
    }(t.table || (t.table = {}))
}(cafe || (cafe = {})),
function(t) {
    !function(n) {
        var e, o;
        n.install = function() {
            o = {},
            e = {}
        }
        ,
        n.reg = function(t) {
            e[t.NAME] = t
        }
        ,
        n.setTxtValue = function(t, n) {
            var o = t.split("_");
            e[o[0]][o[1]] = String(n)
        }
        ,
        n.addTxtValue = function(t, n) {
            var o = t.split("_")
              , a = Number(e[o[0]][o[1]]);
            a += Number(n),
            e[o[0]][o[1]] = a.toString()
        }
        ,
        n.binTxt = function(n, a) {
            var i = t.getid(a);
            o[n] || (o[n] = {}),
            o[n][i] = a;
            var r = n.split("_");
            "temp" == r[0] && (a.text = function(t) {
                var n = t.split("_");
                return e[n[0]][n[1]]
            }(r[1] + "_" + r[2]))
        }
        ,
        n.unbinTxt = function(n, e) {
            var a = t.getid(e);
            o[n] || (o[n] = {}),
            delete o[n][a]
        }
        ,
        n.dispatchTxt = function(t, n) {
            if (o[t])
                for (var e in o[t]) {
                    var a = o[t][e];
                    "number" == typeof n || (a.text = n)
                }
        }
    }(t.temp || (t.temp = {}))
}(cafe || (cafe = {})),
window.getPosToAngle = function(t, n, e) {
    void 0 === e && (e = !1);
    var o = n.x - t.x
      , a = n.y - t.y
      , i = window.Math.atan2(a, o);
    return e && (i = Math.round(180 * i / Math.PI) + 90),
    i
}
,
window.getDistance = function(t, n) {
    var e = t.x
      , o = t.y
      , a = n.x
      , i = n.y
      , r = window.Math.abs(e - a)
      , c = window.Math.abs(o - i);
    return window.Math.sqrt(r * r + c * c)
}
,
window.getAngleToAngleE = function(t) {
    return t * Math.PI / 180
}
,
window.getAngleEToAngle = function(t) {
    return (t - 90) * Math.PI / 180
}
,
window.getPosToAngleAndDistance = function(t, n, e) {
    void 0 === e && (e = 0);
    var o = t.x
      , a = t.y
      , i = n.x
      , r = n.y
      , c = window.Math.abs(o - i)
      , s = window.Math.abs(a - r)
      , u = window.Math.sqrt(c * c + s * s)
      , f = window.Math.atan2(n.y - t.y, n.x - t.x);
    return {
        d: u,
        a: f += getAngleToAngleE(e)
    }
}
,
window.getDistanceAngleEToPos = function(t, n, e) {
    var o = {}
      , a = (e - 90) * Math.PI / 180;
    return o.x = t.x + n * window.Math.cos(a),
    o.y = t.y + n * window.Math.sin(a),
    o
}
,
window.getDistanceAngleToPos = function(t, n, e) {
    var o = {};
    return o.x = t.x + n * window.Math.cos(e),
    o.y = t.y + n * window.Math.sin(e),
    o
}
,
window.getATBNextDistance = function(t, n, e, o) {
    void 0 === o && (o = !1);
    var a = {}
      , i = window.Math.abs(t.x - n.x)
      , r = window.Math.abs(t.y - n.y)
      , c = window.Math.sqrt(i * i + r * r);
    if (!o && c <= e)
        return n;
    i = n.x - t.x,
    r = n.y - t.y;
    var s = window.Math.atan2(r, i);
    return a.x = t.x + e * window.Math.cos(s),
    a.y = t.y + e * window.Math.sin(s),
    a
}
,
window.getFishData = function(t, n, e) {
    var o = {}
      , a = n.x - t.x
      , i = n.y - t.y
      , r = window.Math.atan2(i, a);
    o.x = t.x + e * window.Math.cos(r),
    o.y = t.y + e * window.Math.sin(r);
    var c = t.x
      , s = t.y
      , u = n.x
      , f = n.y;
    a = window.Math.abs(c - u),
    i = window.Math.abs(s - f);
    var l = window.Math.sqrt(a * a + i * i);
    return {
        angle: Math.round(180 * r / Math.PI),
        toDistance: l,
        pos: o
    }
}
,
window.abs = function(t) {
    for (var n = t, e = 0, o = 0, a = !1; null != n; )
        a ? (e += n.y - n.pivotY,
        o += n.x - n.pivotX) : (e += n.y,
        o += n.x),
        a = !0;
    return {
        x: o,
        y: e
    }
}
,
window.AREA = function(t, n, e, o) {
    var a = Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y));
    if (a >= n + o)
        return 0;
    if (n > o) {
        var i = n;
        n = o,
        o = i
    }
    if (o - n >= a)
        return Math.PI * n * n;
    var r = Math.acos((n * n + a * a - o * o) / (2 * n * a));
    return r * n * n + Math.acos((o * o + a * a - n * n) / (2 * o * a)) * o * o - n * a * Math.sin(r)
}
,
window.DistanceBetweenTwoPoints = function(t, n, e, o) {
    return Math.sqrt((e - t) * (e - t) + (o - n) * (o - n))
}
,
window.DistanceFromPointToLine = function(t, n, e, o, a, i) {
    var r = i - o
      , c = e - a
      , s = a * o - e * i;
    return Math.abs(r * t + c * n + s) / Math.sqrt(r * r + c * c)
}
,
window.IsCircleIntersectRectangle = function(t, n, e, o, a, i, r, c, s) {
    var u = DistanceBetweenTwoPoints(o, a, c, s)
      , f = DistanceBetweenTwoPoints(o, a, i, r)
      , l = DistanceFromPointToLine(t, n, o, a, i, r)
      , d = DistanceFromPointToLine(t, n, o, a, c, s);
    return !(l > u + e) && (!(d > f + e) && (l <= u || (d <= f || (l - u) * (l - u) + (d - f) * (d - f) <= e * e)))
}
,
window.isHeroCircleInRect = function(t, n, e, o, a) {
    var i = n.x
      , r = n.y - o
      , c = n.x
      , s = r - o
      , u = n.x + e
      , f = r
      , l = getDistance(n, {
        x: i,
        y: r
    })
      , d = getPosToAngle(n, {
        x: i,
        y: r
    })
      , h = getDistance(n, {
        x: c,
        y: s
    })
      , g = getPosToAngle(n, {
        x: c,
        y: s
    })
      , p = getDistance(n, {
        x: u,
        y: f
    })
      , w = getPosToAngle(n, {
        x: u,
        y: f
    })
      , y = getDistanceAngleToPos(n, l, d + a)
      , v = getDistanceAngleToPos(n, h, g + a)
      , m = getDistanceAngleToPos(n, p, w + a);
    return IsCircleIntersectRectangle(t.x, t.y, .01, y.x, y.y, v.x, v.y, m.x, m.y)
}
,
window.absHitRect = function(t, n) {
    var e = t.hitArea;
    e instanceof Array || (e = [e]);
    for (var o = [], a = 0; a < e.length; a++) {
        var i = e[a]
          , r = new Laya.Point(i.x,i.y)
          , c = new Laya.Point(i.width,i.y)
          , s = new Laya.Point(i.x,i.height)
          , u = new Laya.Point(i.width,i.height);
        o[o.length] = n.globalToLocal(t.localToGlobal(r)),
        o[o.length] = n.globalToLocal(t.localToGlobal(c)),
        o[o.length] = n.globalToLocal(t.localToGlobal(s)),
        o[o.length] = n.globalToLocal(t.localToGlobal(u))
    }
    var f = n.hitArea;
    f instanceof Array || (f = [f]);
    for (a = 0; a < f.length; a++) {
        var l = f[a];
        if (!(l.width <= 0 || l.height <= 0))
            for (var d = 0; d < o.length; d++) {
                var h = o[d];
                if (h.x >= l.x && h.x < l.right && h.y >= l.y && h.y < l.bottom)
                    return !0
            }
    }
    return !1
}
,
window.trace = function(t) {
    cafe.trace(t)
}
,
window.slog = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
        t[n] = arguments[n];
    1 == cafe.logType && window.console.log(window.JSON.stringify(t))
}
,
window.clog = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
        t[n] = arguments[n];
    1 == cafe.logType && window.console.log(t)
}
,
window.serror = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
        t[n] = arguments[n];
    0 != cafe.logType && (1 == cafe.logType ? window.console.log(t) : 2 == cafe.logType && window.console.log(t))
}
,
window.syslog = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
        t[n] = arguments[n];
    0 != cafe.logType && (1 == cafe.logType ? window.console.warn(window.JSON.stringify(t)) : 2 == cafe.logType && window.console.warn(t))
}
,
window.call = function(t, n) {
    if (!t)
        return null;
    if (null != n && (t = t.slice(0)).push(n),
    isFunction(t[0]))
        return t[0].apply(null, t.slice(1));
    if (isClass(t[0]))
        return new t[0](t[1],t[2],t[3],t[4],t[5]);
    if (isString(t[1]))
        t[0][t[1]] = t[2];
    else if (isFunction(t[1]))
        return t[1].apply(t[0], t.slice(2))
}
,
window.dejson = function(t) {
    try {
        return window.JSON.parse(t)
    } catch (t) {
        return null
    }
}
,
window.enjson = function(t) {
    try {
        return window.JSON.stringify(t)
    } catch (t) {}
    return null
}
,
window.int = function(t) {
    if (!t)
        return 0;
    var n = 1 * t;
    return window.isNaN(n) ? 0 : n >= 0 ? Math.floor(n) : Math.ceil(n)
}
,
window.isString = function(t) {
    return "string" == typeof t
}
,
window.isNumber = function(t) {
    return 1 == t || 0 == t || "number" == typeof t
}
,
window.isArray = function(t) {
    return t instanceof Array
}
,
window.isFunction = function(t) {
    return "function" == typeof t && !t.__className
}
,
window.isClass = function(t) {
    return !("function" != typeof t || !t.__className || !t.prototype)
}
,
window.localRead = function(t) {
    return Laya.LocalStorage.getItem(cafe.game_id + "_" + cafe.game_tag + "_" + t)
}
,
window.localSave = function(t, n) {
    Laya.LocalStorage.setItem(cafe.game_id + "_" + cafe.game_tag + "_" + t, n)
}
,
window.localReadJson = function(t) {
    return Laya.LocalStorage.getJSON(cafe.game_id + "_" + cafe.game_tag + "_" + t)
}
,
window.localSaveJson = function(t, n) {
    Laya.LocalStorage.setJSON(cafe.game_id + "_" + cafe.game_tag + "_" + t, n)
}
,
window.httpGetText = function(t, n, e, o) {
    var a = new laya.net.HttpRequest;
    a.once(Laya.Event.COMPLETE, a, function(t) {
        n && n(t)
    }),
    a.once(Laya.Event.ERROR, a, function(t) {
        e && e(t)
    }),
    o && a.on(Laya.Event.PROGRESS, a, o),
    a.send(t, null, "get", "text", ["Content-type", "application/x-www-form-urlencoded"])
}
,
window.httpGetJson = function(t, n, e, o) {
    var a = new laya.net.HttpRequest;
    a.once(Laya.Event.COMPLETE, a, function(t) {
        n && n(t)
    }),
    a.once(Laya.Event.ERROR, a, function(t) {
        e && e(t)
    }),
    o && a.on(Laya.Event.PROGRESS, a, o),
    a.send(t, null, "get", "json", ["Content-type", "application/json"])
}
,
window.httpPostText = function(t, n, e, o, a) {
    var i = new laya.net.HttpRequest;
    i.once(Laya.Event.COMPLETE, i, function(t) {
        e && e(t)
    }),
    i.once(Laya.Event.ERROR, i, function(t) {
        o && o(t)
    }),
    a && i.on(Laya.Event.PROGRESS, i, a),
    i.send(t, n, "post", "text", ["Content-type", "application/x-www-form-urlencoded"])
}
,
window.httpPostJson = function(t, n, e, o, a) {
    var i = new laya.net.HttpRequest;
    i.once(Laya.Event.COMPLETE, i, function(t) {
        e && e(t)
    }),
    i.once(Laya.Event.ERROR, i, function(t) {
        o && o(t)
    }),
    a && i.on(Laya.Event.PROGRESS, i, a),
    i.send(t, n, "post", "json", ["Content-type", "application/json"])
}
,
window.handlercreate = function(t, n, e, o) {
    return Laya.Handler._pool.length ? Laya.Handler._pool.shift().setTo(t, n, e, o) : new Laya.Handler(t,n,e,o)
}
,
window.cafe = cafe;
