// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6byha":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "73784c87cf8e39af";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"4acTH":[function(require,module,exports) {
var _roughNotation = require("rough-notation");
const e = document.querySelector(".main-span");
const annotation = (0, _roughNotation.annotate)(e, {
    type: "highlight",
    strokeWidth: 10,
    color: "#DADADA",
    animationDuration: 1500
});
annotation.show();
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

},{"rough-notation":"dpTFV"}],"dpTFV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "annotate", ()=>_);
parcelHelpers.export(exports, "annotationGroup", ()=>m);
const t = "http://www.w3.org/2000/svg";
class e {
    constructor(t1){
        this.seed = t1;
    }
    next() {
        return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
    }
}
function s(t2, e1, s1, i1, n1) {
    return {
        type: "path",
        ops: c(t2, e1, s1, i1, n1)
    };
}
function i(t3, e3, i2) {
    const n2 = (t3 || []).length;
    if (n2 > 2) {
        const s2 = [];
        for(let e2 = 0; e2 < n2 - 1; e2++)s2.push(...c(t3[e2][0], t3[e2][1], t3[e2 + 1][0], t3[e2 + 1][1], i2));
        return e3 && s2.push(...c(t3[n2 - 1][0], t3[n2 - 1][1], t3[0][0], t3[0][1], i2)), {
            type: "path",
            ops: s2
        };
    }
    return 2 === n2 ? s(t3[0][0], t3[0][1], t3[1][0], t3[1][1], i2) : {
        type: "path",
        ops: []
    };
}
function n(t4, e4, s3, n3, o1) {
    return function(t5, e5) {
        return i(t5, !0, e5);
    }([
        [
            t4,
            e4
        ],
        [
            t4 + s3,
            e4
        ],
        [
            t4 + s3,
            e4 + n3
        ],
        [
            t4,
            e4 + n3
        ]
    ], o1);
}
function o(t6, e6, s4, i3, n4) {
    return function(t7, e7, s5, i4) {
        const [n5, o3] = l(i4.increment, t7, e7, i4.rx, i4.ry, 1, i4.increment * h(.1, h(.4, 1, s5), s5), s5);
        let r1 = f(n5, null, s5);
        if (!s5.disableMultiStroke) {
            const [n6] = l(i4.increment, t7, e7, i4.rx, i4.ry, 1.5, 0, s5), o2 = f(n6, null, s5);
            r1 = r1.concat(o2);
        }
        return {
            estimatedPoints: o3,
            opset: {
                type: "path",
                ops: r1
            }
        };
    }(t6, e6, n4, function(t8, e8, s6) {
        const i5 = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t8 / 2, 2) + Math.pow(e8 / 2, 2)) / 2)), n7 = Math.max(s6.curveStepCount, s6.curveStepCount / Math.sqrt(200) * i5), o4 = 2 * Math.PI / n7;
        let r2 = Math.abs(t8 / 2), h1 = Math.abs(e8 / 2);
        const c1 = 1 - s6.curveFitting;
        return r2 += a(r2 * c1, s6), h1 += a(h1 * c1, s6), {
            increment: o4,
            rx: r2,
            ry: h1
        };
    }(s4, i3, n4)).opset;
}
function r(t9) {
    return t9.randomizer || (t9.randomizer = new e(t9.seed || 0)), t9.randomizer.next();
}
function h(t10, e9, s7, i6 = 1) {
    return s7.roughness * i6 * (r(s7) * (e9 - t10) + t10);
}
function a(t11, e10, s8 = 1) {
    return h(-t11, t11, e10, s8);
}
function c(t12, e11, s9, i7, n8, o5 = !1) {
    const r3 = o5 ? n8.disableMultiStrokeFill : n8.disableMultiStroke, h2 = u(t12, e11, s9, i7, n8, !0, !1);
    if (r3) return h2;
    const a1 = u(t12, e11, s9, i7, n8, !0, !0);
    return h2.concat(a1);
}
function u(t13, e12, s10, i8, n9, o6, h3) {
    const c2 = Math.pow(t13 - s10, 2) + Math.pow(e12 - i8, 2), u1 = Math.sqrt(c2);
    let f1 = 1;
    f1 = u1 < 200 ? 1 : u1 > 500 ? .4 : -0.0016668 * u1 + 1.233334;
    let l1 = n9.maxRandomnessOffset || 0;
    l1 * l1 * 100 > c2 && (l1 = u1 / 10);
    const g1 = l1 / 2, d1 = .2 + .2 * r(n9);
    let p1 = n9.bowing * n9.maxRandomnessOffset * (i8 - e12) / 200, _1 = n9.bowing * n9.maxRandomnessOffset * (t13 - s10) / 200;
    p1 = a(p1, n9, f1), _1 = a(_1, n9, f1);
    const m1 = [], w = ()=>a(g1, n9, f1), v = ()=>a(l1, n9, f1);
    return o6 && (h3 ? m1.push({
        op: "move",
        data: [
            t13 + w(),
            e12 + w()
        ]
    }) : m1.push({
        op: "move",
        data: [
            t13 + a(l1, n9, f1),
            e12 + a(l1, n9, f1)
        ]
    })), h3 ? m1.push({
        op: "bcurveTo",
        data: [
            p1 + t13 + (s10 - t13) * d1 + w(),
            _1 + e12 + (i8 - e12) * d1 + w(),
            p1 + t13 + 2 * (s10 - t13) * d1 + w(),
            _1 + e12 + 2 * (i8 - e12) * d1 + w(),
            s10 + w(),
            i8 + w()
        ]
    }) : m1.push({
        op: "bcurveTo",
        data: [
            p1 + t13 + (s10 - t13) * d1 + v(),
            _1 + e12 + (i8 - e12) * d1 + v(),
            p1 + t13 + 2 * (s10 - t13) * d1 + v(),
            _1 + e12 + 2 * (i8 - e12) * d1 + v(),
            s10 + v(),
            i8 + v()
        ]
    }), m1;
}
function f(t14, e14, s11) {
    const i9 = t14.length, n10 = [];
    if (i9 > 3) {
        const o7 = [], r4 = 1 - s11.curveTightness;
        n10.push({
            op: "move",
            data: [
                t14[1][0],
                t14[1][1]
            ]
        });
        for(let e13 = 1; e13 + 2 < i9; e13++){
            const s12 = t14[e13];
            o7[0] = [
                s12[0],
                s12[1]
            ], o7[1] = [
                s12[0] + (r4 * t14[e13 + 1][0] - r4 * t14[e13 - 1][0]) / 6,
                s12[1] + (r4 * t14[e13 + 1][1] - r4 * t14[e13 - 1][1]) / 6
            ], o7[2] = [
                t14[e13 + 1][0] + (r4 * t14[e13][0] - r4 * t14[e13 + 2][0]) / 6,
                t14[e13 + 1][1] + (r4 * t14[e13][1] - r4 * t14[e13 + 2][1]) / 6
            ], o7[3] = [
                t14[e13 + 1][0],
                t14[e13 + 1][1]
            ], n10.push({
                op: "bcurveTo",
                data: [
                    o7[1][0],
                    o7[1][1],
                    o7[2][0],
                    o7[2][1],
                    o7[3][0],
                    o7[3][1]
                ]
            });
        }
        if (e14 && 2 === e14.length) {
            const t15 = s11.maxRandomnessOffset;
            n10.push({
                op: "lineTo",
                data: [
                    e14[0] + a(t15, s11),
                    e14[1] + a(t15, s11)
                ]
            });
        }
    } else 3 === i9 ? (n10.push({
        op: "move",
        data: [
            t14[1][0],
            t14[1][1]
        ]
    }), n10.push({
        op: "bcurveTo",
        data: [
            t14[1][0],
            t14[1][1],
            t14[2][0],
            t14[2][1],
            t14[2][0],
            t14[2][1]
        ]
    })) : 2 === i9 && n10.push(...c(t14[0][0], t14[0][1], t14[1][0], t14[1][1], s11));
    return n10;
}
function l(t16, e15, s13, i10, n11, o8, r6, h4) {
    const c3 = [], u2 = [], f2 = a(.5, h4) - Math.PI / 2;
    u2.push([
        a(o8, h4) + e15 + .9 * i10 * Math.cos(f2 - t16),
        a(o8, h4) + s13 + .9 * n11 * Math.sin(f2 - t16)
    ]);
    for(let r5 = f2; r5 < 2 * Math.PI + f2 - .01; r5 += t16){
        const t17 = [
            a(o8, h4) + e15 + i10 * Math.cos(r5),
            a(o8, h4) + s13 + n11 * Math.sin(r5)
        ];
        c3.push(t17), u2.push(t17);
    }
    return u2.push([
        a(o8, h4) + e15 + i10 * Math.cos(f2 + 2 * Math.PI + .5 * r6),
        a(o8, h4) + s13 + n11 * Math.sin(f2 + 2 * Math.PI + .5 * r6)
    ]), u2.push([
        a(o8, h4) + e15 + .98 * i10 * Math.cos(f2 + r6),
        a(o8, h4) + s13 + .98 * n11 * Math.sin(f2 + r6)
    ]), u2.push([
        a(o8, h4) + e15 + .9 * i10 * Math.cos(f2 + .5 * r6),
        a(o8, h4) + s13 + .9 * n11 * Math.sin(f2 + .5 * r6)
    ]), [
        u2,
        c3
    ];
}
function g(t18, e16) {
    return {
        maxRandomnessOffset: 2,
        roughness: "highlight" === t18 ? 3 : 1.5,
        bowing: 1,
        stroke: "#000",
        strokeWidth: 1.5,
        curveTightness: 0,
        curveFitting: .95,
        curveStepCount: 9,
        fillStyle: "hachure",
        fillWeight: -1,
        hachureAngle: -41,
        hachureGap: -1,
        dashOffset: -1,
        dashGap: -1,
        zigzagOffset: -1,
        combineNestedSvgPaths: !1,
        disableMultiStroke: "double" !== t18,
        disableMultiStrokeFill: !1,
        seed: e16
    };
}
function d(e17, r7, h5, a4, c4, u3) {
    const f3 = [];
    let l2 = h5.strokeWidth || 2;
    const d2 = function(t19) {
        const e18 = t19.padding;
        if (e18 || 0 === e18) {
            if ("number" == typeof e18) return [
                e18,
                e18,
                e18,
                e18
            ];
            if (Array.isArray(e18)) {
                const t20 = e18;
                if (t20.length) switch(t20.length){
                    case 4:
                        return [
                            ...t20
                        ];
                    case 1:
                        return [
                            t20[0],
                            t20[0],
                            t20[0],
                            t20[0]
                        ];
                    case 2:
                        return [
                            ...t20,
                            ...t20
                        ];
                    case 3:
                        return [
                            ...t20,
                            t20[1]
                        ];
                    default:
                        return [
                            t20[0],
                            t20[1],
                            t20[2],
                            t20[3]
                        ];
                }
            }
        }
        return [
            5,
            5,
            5,
            5
        ];
    }(h5), p2 = void 0 === h5.animate || !!h5.animate, _2 = h5.iterations || 2, m2 = h5.rtl ? 1 : 0, w = g("single", u3);
    switch(h5.type){
        case "underline":
            {
                const t21 = r7.y + r7.h + d2[2];
                for(let e19 = m2; e19 < _2 + m2; e19++)e19 % 2 ? f3.push(s(r7.x + r7.w, t21, r7.x, t21, w)) : f3.push(s(r7.x, t21, r7.x + r7.w, t21, w));
                break;
            }
        case "strike-through":
            {
                const t22 = r7.y + r7.h / 2;
                for(let e20 = m2; e20 < _2 + m2; e20++)e20 % 2 ? f3.push(s(r7.x + r7.w, t22, r7.x, t22, w)) : f3.push(s(r7.x, t22, r7.x + r7.w, t22, w));
                break;
            }
        case "box":
            {
                const t23 = r7.x - d2[3], e21 = r7.y - d2[0], s14 = r7.w + (d2[1] + d2[3]), i11 = r7.h + (d2[0] + d2[2]);
                for(let o9 = 0; o9 < _2; o9++)f3.push(n(t23, e21, s14, i11, w));
                break;
            }
        case "bracket":
            {
                const t24 = Array.isArray(h5.brackets) ? h5.brackets : h5.brackets ? [
                    h5.brackets
                ] : [
                    "right"
                ], e22 = r7.x - 2 * d2[3], s15 = r7.x + r7.w + 2 * d2[1], n12 = r7.y - 2 * d2[0], o10 = r7.y + r7.h + 2 * d2[2];
                for (const h6 of t24){
                    let t25;
                    switch(h6){
                        case "bottom":
                            t25 = [
                                [
                                    e22,
                                    r7.y + r7.h
                                ],
                                [
                                    e22,
                                    o10
                                ],
                                [
                                    s15,
                                    o10
                                ],
                                [
                                    s15,
                                    r7.y + r7.h
                                ]
                            ];
                            break;
                        case "top":
                            t25 = [
                                [
                                    e22,
                                    r7.y
                                ],
                                [
                                    e22,
                                    n12
                                ],
                                [
                                    s15,
                                    n12
                                ],
                                [
                                    s15,
                                    r7.y
                                ]
                            ];
                            break;
                        case "left":
                            t25 = [
                                [
                                    r7.x,
                                    n12
                                ],
                                [
                                    e22,
                                    n12
                                ],
                                [
                                    e22,
                                    o10
                                ],
                                [
                                    r7.x,
                                    o10
                                ]
                            ];
                            break;
                        case "right":
                            t25 = [
                                [
                                    r7.x + r7.w,
                                    n12
                                ],
                                [
                                    s15,
                                    n12
                                ],
                                [
                                    s15,
                                    o10
                                ],
                                [
                                    r7.x + r7.w,
                                    o10
                                ]
                            ];
                    }
                    t25 && f3.push(i(t25, !1, w));
                }
                break;
            }
        case "crossed-off":
            {
                const t26 = r7.x, e23 = r7.y, i12 = t26 + r7.w, n13 = e23 + r7.h;
                for(let o12 = m2; o12 < _2 + m2; o12++)o12 % 2 ? f3.push(s(i12, n13, t26, e23, w)) : f3.push(s(t26, e23, i12, n13, w));
                for(let o11 = m2; o11 < _2 + m2; o11++)o11 % 2 ? f3.push(s(t26, n13, i12, e23, w)) : f3.push(s(i12, e23, t26, n13, w));
                break;
            }
        case "circle":
            {
                const t28 = g("double", u3), e24 = r7.w + (d2[1] + d2[3]), s16 = r7.h + (d2[0] + d2[2]), i13 = r7.x - d2[3] + e24 / 2, n14 = r7.y - d2[0] + s16 / 2, h7 = Math.floor(_2 / 2), a2 = _2 - 2 * h7;
                for(let r8 = 0; r8 < h7; r8++)f3.push(o(i13, n14, e24, s16, t28));
                for(let t27 = 0; t27 < a2; t27++)f3.push(o(i13, n14, e24, s16, w));
                break;
            }
        case "highlight":
            {
                const t29 = g("highlight", u3);
                l2 = .95 * r7.h;
                const e25 = r7.y + r7.h / 2;
                for(let i14 = m2; i14 < _2 + m2; i14++)i14 % 2 ? f3.push(s(r7.x + r7.w, e25, r7.x, e25, t29)) : f3.push(s(r7.x, e25, r7.x + r7.w, e25, t29));
                break;
            }
    }
    if (f3.length) {
        const s17 = function(t30) {
            const e26 = [];
            for (const s19 of t30){
                let t31 = "";
                for (const i17 of s19.ops){
                    const s20 = i17.data;
                    switch(i17.op){
                        case "move":
                            t31.trim() && e26.push(t31.trim()), t31 = `M${s20[0]} ${s20[1]} `;
                            break;
                        case "bcurveTo":
                            t31 += `C${s20[0]} ${s20[1]}, ${s20[2]} ${s20[3]}, ${s20[4]} ${s20[5]} `;
                            break;
                        case "lineTo":
                            t31 += `L${s20[0]} ${s20[1]} `;
                    }
                }
                t31.trim() && e26.push(t31.trim());
            }
            return e26;
        }(f3), i15 = [], n15 = [];
        let o13 = 0;
        const r9 = (t32, e27, s21)=>t32.setAttribute(e27, s21);
        for (const a3 of s17){
            const s22 = document.createElementNS(t, "path");
            if (r9(s22, "d", a3), r9(s22, "fill", "none"), r9(s22, "stroke", h5.color || "currentColor"), r9(s22, "stroke-width", "" + l2), p2) {
                const t33 = s22.getTotalLength();
                i15.push(t33), o13 += t33;
            }
            e17.appendChild(s22), n15.push(s22);
        }
        if (p2) {
            let t34 = 0;
            for(let e28 = 0; e28 < n15.length; e28++){
                const s23 = n15[e28], r10 = i15[e28], h8 = o13 ? c4 * (r10 / o13) : 0, u4 = a4 + t34, f4 = s23.style;
                f4.strokeDashoffset = "" + r10, f4.strokeDasharray = "" + r10, f4.animation = `rough-notation-dash ${h8}ms ease-out ${u4}ms forwards`, t34 += h8;
            }
        }
    }
}
class p {
    constructor(t35, e29){
        this._state = "unattached", this._resizing = !1, this._seed = Math.floor(Math.random() * 2 ** 31), this._lastSizes = [], this._animationDelay = 0, this._resizeListener = ()=>{
            this._resizing || (this._resizing = !0, setTimeout(()=>{
                this._resizing = !1, "showing" === this._state && this.haveRectsChanged() && this.show();
            }, 400));
        }, this._e = t35, this._config = JSON.parse(JSON.stringify(e29)), this.attach();
    }
    get animate() {
        return this._config.animate;
    }
    set animate(t36) {
        this._config.animate = t36;
    }
    get animationDuration() {
        return this._config.animationDuration;
    }
    set animationDuration(t37) {
        this._config.animationDuration = t37;
    }
    get iterations() {
        return this._config.iterations;
    }
    set iterations(t38) {
        this._config.iterations = t38;
    }
    get color() {
        return this._config.color;
    }
    set color(t39) {
        this._config.color !== t39 && (this._config.color = t39, this.refresh());
    }
    get strokeWidth() {
        return this._config.strokeWidth;
    }
    set strokeWidth(t40) {
        this._config.strokeWidth !== t40 && (this._config.strokeWidth = t40, this.refresh());
    }
    get padding() {
        return this._config.padding;
    }
    set padding(t41) {
        this._config.padding !== t41 && (this._config.padding = t41, this.refresh());
    }
    attach() {
        if ("unattached" === this._state && this._e.parentElement) {
            !function() {
                if (!window.__rno_kf_s) {
                    const t42 = window.__rno_kf_s = document.createElement("style");
                    t42.textContent = "@keyframes rough-notation-dash { to { stroke-dashoffset: 0; } }", document.head.appendChild(t42);
                }
            }();
            const e30 = this._svg = document.createElementNS(t, "svg");
            e30.setAttribute("class", "rough-annotation");
            const s24 = e30.style;
            s24.position = "absolute", s24.top = "0", s24.left = "0", s24.overflow = "visible", s24.pointerEvents = "none", s24.width = "100px", s24.height = "100px";
            const i18 = "highlight" === this._config.type;
            if (this._e.insertAdjacentElement(i18 ? "beforebegin" : "afterend", e30), this._state = "not-showing", i18) {
                const t43 = window.getComputedStyle(this._e).position;
                (!t43 || "static" === t43) && (this._e.style.position = "relative");
            }
            this.attachListeners();
        }
    }
    detachListeners() {
        window.removeEventListener("resize", this._resizeListener), this._ro && this._ro.unobserve(this._e);
    }
    attachListeners() {
        this.detachListeners(), window.addEventListener("resize", this._resizeListener, {
            passive: !0
        }), !this._ro && "ResizeObserver" in window && (this._ro = new window.ResizeObserver((t44)=>{
            for (const e31 of t44)e31.contentRect && this._resizeListener();
        })), this._ro && this._ro.observe(this._e);
    }
    haveRectsChanged() {
        if (this._lastSizes.length) {
            const t45 = this.rects();
            if (t45.length !== this._lastSizes.length) return !0;
            for(let e32 = 0; e32 < t45.length; e32++)if (!this.isSameRect(t45[e32], this._lastSizes[e32])) return !0;
        }
        return !1;
    }
    isSameRect(t46, e33) {
        const s25 = (t47, e34)=>Math.round(t47) === Math.round(e34);
        return s25(t46.x, e33.x) && s25(t46.y, e33.y) && s25(t46.w, e33.w) && s25(t46.h, e33.h);
    }
    isShowing() {
        return "not-showing" !== this._state;
    }
    refresh() {
        this.isShowing() && !this.pendingRefresh && (this.pendingRefresh = Promise.resolve().then(()=>{
            this.isShowing() && this.show(), delete this.pendingRefresh;
        }));
    }
    show() {
        switch(this._state){
            case "unattached":
                break;
            case "showing":
                this.hide(), this._svg && this.render(this._svg, !0);
                break;
            case "not-showing":
                this.attach(), this._svg && this.render(this._svg, !1);
        }
    }
    hide() {
        if (this._svg) for(; this._svg.lastChild;)this._svg.removeChild(this._svg.lastChild);
        this._state = "not-showing";
    }
    remove() {
        this._svg && this._svg.parentElement && this._svg.parentElement.removeChild(this._svg), this._svg = void 0, this._state = "unattached", this.detachListeners();
    }
    render(t48, e36) {
        let s26 = this._config;
        e36 && (s26 = JSON.parse(JSON.stringify(this._config)), s26.animate = !1);
        const i19 = this.rects();
        let n16 = 0;
        i19.forEach((t49)=>n16 += t49.w);
        const o14 = s26.animationDuration || 800;
        let r11 = 0;
        for(let e35 = 0; e35 < i19.length; e35++){
            const h9 = o14 * (i19[e35].w / n16);
            d(t48, i19[e35], s26, r11 + this._animationDelay, h9, this._seed), r11 += h9;
        }
        this._lastSizes = i19, this._state = "showing";
    }
    rects() {
        const t50 = [];
        if (this._svg) {
            if (this._config.multiline) {
                const e37 = this._e.getClientRects();
                for(let s27 = 0; s27 < e37.length; s27++)t50.push(this.svgRect(this._svg, e37[s27]));
            } else t50.push(this.svgRect(this._svg, this._e.getBoundingClientRect()));
        }
        return t50;
    }
    svgRect(t51, e38) {
        const s28 = t51.getBoundingClientRect(), i20 = e38;
        return {
            x: (i20.x || i20.left) - (s28.x || s28.left),
            y: (i20.y || i20.top) - (s28.y || s28.top),
            w: i20.width,
            h: i20.height
        };
    }
}
function _(t52, e39) {
    return new p(t52, e39);
}
function m(t53) {
    let e40 = 0;
    for (const s30 of t53){
        const t54 = s30;
        t54._animationDelay = e40;
        e40 += 0 === t54.animationDuration ? 0 : t54.animationDuration || 800;
    }
    const s29 = [
        ...t53
    ];
    return {
        show () {
            for (const t55 of s29)t55.show();
        },
        hide () {
            for (const t56 of s29)t56.hide();
        }
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["6byha","4acTH"], "4acTH", "parcelRequire94c2")

//# sourceMappingURL=index.cf8e39af.js.map
