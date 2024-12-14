var _global = (function () {
// some use content security policy to disable eval
    try {
    return Function('return this')() || (42, eval)('this')
    } catch (e) {
    // every global should have circular reference
    // used for checking if someone writes var window = {}; var self = {}
    return typeof window === 'object' && window.window === window ? window
    : typeof self === 'object' && self.self === self ? self
    : typeof global === 'object' && global.global === global ? global : this
    }
})()

function bom (blob, opts) {
    if (typeof opts === 'undefined') opts = { autoBom: false }
    else if (typeof opts !== 'object') {
    console.warn('Depricated: Expected third argument to be a object')
    opts = { autoBom: !opts }
    }

    // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
    }
    return blob
}

function download (url, name, opts) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.onload = function () {
    saveAs(xhr.response, name, opts)
    }
    xhr.onerror = function () {
    console.error('could not download file')
    }
    xhr.send()
}

function corsEnabled (url) {
    var xhr = new XMLHttpRequest()
    // use sync to avoid popup blocker
    xhr.open('HEAD', url, false)
    xhr.send()
    return xhr.status >= 200 && xhr.status <= 299
}

// `a.click()` don't work for all browsers (#465)
function click(node) {
    try {
    node.dispatchEvent(new MouseEvent('click'))
    } catch (e) {
    var evt = document.createEvent('MouseEvents')
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                            20, false, false, false, false, 0, null)
    node.dispatchEvent(evt)
    }
}

var saveAs = _global.saveAs ||
// probably in some web worker
(typeof window !== 'object' || window !== _global)
    ? function saveAs () { /* noop */ }

// Use download attribute first if possible (#193 Lumia mobile)
: 'download' in HTMLAnchorElement.prototype
? function saveAs (blob, name, opts) {
    var URL = _global.URL || _global.webkitURL
    var a = document.createElement('a')
    name = name || blob.name || 'download'

    a.download = name
    a.rel = 'noopener' // tabnabbing

    // TODO: detect chrome extensions & packaged apps
    // a.target = '_blank'

    if (typeof blob === 'string') {
    // Support regular links
    a.href = blob
    if (a.origin !== location.origin) {
        corsEnabled(a.href)
        ? download(blob, name, opts)
        : click(a, a.target = '_blank')
    } else {
        click(a)
    }
    } else {
    // Support blobs
    a.href = URL.createObjectURL(blob)
    setTimeout(function () { URL.revokeObjectURL(a.href) }, 4E4) // 40s
    setTimeout(function () { click(a) }, 0)
    }
}

// Use msSaveOrOpenBlob as a second approch
: 'msSaveOrOpenBlob' in navigator
? function saveAs (blob, name, opts) {
    name = name || blob.name || 'download'

    if (typeof blob === 'string') {
    if (corsEnabled(blob)) {
        download(blob, name, opts)
    } else {
        var a = document.createElement('a')
        a.href = blob
        a.target = '_blank'
        setTimeout(function () { clikc(a) })
    }
    } else {
    navigator.msSaveOrOpenBlob(bom(blob, opts), name)
    }
}

// Fallback to using FileReader and a popup
: function saveAs (blob, name, opts, popup) {
    // Open a popup immediately do go around popup blocker
    // Mostly only avalible on user interaction and the fileReader is async so...
    popup = popup || open('', '_blank')
    if (popup) {
    popup.document.title =
    popup.document.body.innerText = 'downloading...'
    }

    if (typeof blob === 'string') return download(blob, name, opts)

    var force = blob.type === 'application/octet-stream'
    var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari
    var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent)

    if ((isChromeIOS || (force && isSafari)) && typeof FileReader === 'object') {
    // Safari doesn't allow downloading of blob urls
    var reader = new FileReader()
    reader.onloadend = function () {
        var url = reader.result
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;')
        if (popup) popup.location.href = url
        else location = url
        popup = null // reverse-tabnabbing #460
    }
    reader.readAsDataURL(blob)
    } else {
    var URL = _global.URL || _global.webkitURL
    var url = URL.createObjectURL(blob)
    if (popup) popup.location = url
    else location.href = url
    popup = null // reverse-tabnabbing #460
    setTimeout(function () { URL.revokeObjectURL(url) }, 4E4) // 40s
    }
}

// module.exports = _global.saveAs = saveAs.saveAs = saveAs

//changed by XuJian
if (typeof define === 'function' && define.amd){
    define('laya.core', ['require', "exports"], function(require, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        for (var i in Laya) {
                    var o = Laya[i];
            o && o.__isclass && (exports[i] = o);
        }
    });
}


(function () {
    'use strict';

    class EventHandler {
        constructor(caller, method, args, once) {
            this.once = false;
            this._id = 0;
            this.setTo(caller, method, args, once);
        }
        setTo(caller, method, args, once) {
            this._id = EventHandler._gid++;
            this.caller = caller;
            this.method = method;
            this.args = args;
            this.once = once;
            return this;
        }
        run() {
            if (this.method == null)
                return null;
            var id = this._id;
            var result = this.method.apply(this.caller, this.args);
            this._id === id && this.once && this.recover();
            return result;
        }
        runWith(data) {
            if (this.method == null)
                return null;
            var id = this._id;
            if (data == null)
                var result = this.method.apply(this.caller, this.args);
            else if (!this.args && !data.unshift)
                result = this.method.call(this.caller, data);
            else if (this.args)
                result = this.method.apply(this.caller, this.args.concat(data));
            else
                result = this.method.apply(this.caller, data);
            this._id === id && this.once && this.recover();
            return result;
        }
        clear() {
            this.caller = null;
            this.method = null;
            this.args = null;
            return this;
        }
        recover() {
            if (this._id > 0) {
                this._id = 0;
                EventHandler._pool.push(this.clear());
            }
        }
        static create(caller, method, args = null, once = true) {
            if (EventHandler._pool.length)
                return EventHandler._pool.pop().setTo(caller, method, args, once);
            return new EventHandler(caller, method, args, once);
        }
    }
    EventHandler._pool = [];
    EventHandler._gid = 1;

    class EventDispatcher {
        hasListener(type) {
            var listener = this._events && this._events[type];
            return !!listener;
        }
        event(type, data) {
            if (!this._events || !this._events[type])
                return false;
            var listeners = this._events[type];
            if (listeners.run) {
                if (listeners.once)
                    delete this._events[type];
                data != null ? listeners.runWith(data) : listeners.run();
            }
            else {
                for (var i = 0, n = listeners.length; i < n; i++) {
                    var listener = listeners[i];
                    if (listener) {
                        (data != null) ? listener.runWith(data) : listener.run();
                    }
                    if (!listener || listener.once) {
                        listeners.splice(i, 1);
                        i--;
                        n--;
                    }
                }
                if (listeners.length === 0 && this._events)
                    delete this._events[type];
            }
            return true;
        }
        on(type, caller, listener, args) {
            return this._createListener(type, caller, listener, args, false);
        }
        once(type, caller, listener, args) {
            return this._createListener(type, caller, listener, args, true);
        }
        off(type, caller, listener, onceOnly) {
            if (!this._events || !this._events[type])
                return this;
            var listeners = this._events[type];
            if (listeners != null) {
                if (listeners.run) {
                    if ((!caller || listeners.caller === caller) && (listener == null || listeners.method === listener) && (!onceOnly || listeners.once)) {
                        delete this._events[type];
                        listeners.recover();
                    }
                }
                else {
                    var count = 0;
                    for (var i = 0, n = listeners.length; i < n; i++) {
                        var item = listeners[i];
                        if (!item) {
                            count++;
                            continue;
                        }
                        if (item && (!caller || item.caller === caller) && (listener == null || item.method === listener) && (!onceOnly || item.once)) {
                            count++;
                            listeners[i] = null;
                            item.recover();
                        }
                    }
                    if (count === n)
                        delete this._events[type];
                }
            }
            return this;
        }
        offAll(type) {
            var events = this._events;
            if (!events)
                return this;
            if (type) {
                this._recoverHandlers(events[type]);
                delete events[type];
            }
            else {
                for (var name in events) {
                    this._recoverHandlers(events[name]);
                }
                this._events = null;
            }
            return this;
        }
        offAllCaller(caller) {
            if (caller && this._events) {
                for (var name in this._events) {
                    this.off(name, caller, null);
                }
            }
            return this;
        }
        _recoverHandlers(arr) {
            if (!arr)
                return;
            if (arr.run) {
                arr.recover();
            }
            else {
                for (var i = arr.length - 1; i > -1; i--) {
                    if (arr[i]) {
                        arr[i].recover();
                        arr[i] = null;
                    }
                }
            }
        }
        _createListener(type, caller, listener, args, once, offBefore) {
            offBefore && this.off(type, caller, listener, once);
            var handler = EventHandler.create(caller || this, listener, args, once);
            this._events || (this._events = {});
            var events = this._events;
            if (!events[type])
                events[type] = handler;
            else {
                if (!events[type].run)
                    events[type].push(handler);
                else
                    events[type] = [events[type], handler];
            }
            return this;
        }
    }

    class htmlfs extends EventDispatcher {
        readAsText(filepath, callback) {
            let filereader = new FileReader();
            filereader.onload = function () {
                if (FileReader.DONE == filereader.readyState) {
                    callback && callback(filereader.result);
                }
                else {
                    callback && callback(null);
                }
            };
            filereader.readAsText(filepath);
        }
        save(str, filename) {
            var blob = new Blob([str], { type: "" });
            saveAs(blob, filename + ".json");
        }
        createFileButton(top, left, callback) {
            let file = document.createElement("input");
            file.style = "width:150px;height:60px;";
            file.style.top = top + "px";
            file.style.left = left + "px";
            file.type = "file";
            file.style.position = "absolute";
            file.onchange = () => {
                callback && callback(file.files);
            };
            document.body.appendChild(file);
        }

        async saveui(){
            var _classMap =  Laya.ClassUtils._classMap;
            for (const key in _classMap) {
                const ui = _classMap[key];
                if(ui && ui.uiView){
                    let nams = key.split(".");
                    await new Promise(r=>{
                        setTimeout(r,0.1e3);
                    })
                   
                    this.save(JSON.stringify(ui.uiView),nams.pop());
                }
            }
        }

        async readui(){
            await new Promise(r=>{
                 Laya.loader.load([
                    "views/collectionViewUI.scene",
                    "views/loadingViewUI.scene",
                    "views/reliveDialogUI.scene",
                    "views/resultDialogUI.scene",
                    "views/rewardDialogUI.scene"
                ],Laya.Handler.create(this,r))
            });

            var _classMap =  Laya.ClassUtils._classMap;
            for (const key in _classMap) {
                const ui = _classMap[key];
                if(ui && ui.uiView){
                    let name = key.split(".").pop();
                    ui.uiView =  Laya.loader.getRes("views/"+name+".scene");
                }
            }
        }
    }
    window["htmlfs"] = new htmlfs();

}());
