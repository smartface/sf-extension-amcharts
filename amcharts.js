const WebView = require("sf-core/ui/webview");
const File = require('sf-core/io/file');
var EventEmitter = require('wolfy87-eventemitter');
const extend = require("js-base/core/extend");

const AMCharts = new extend(EventEmitter)(function AMCharts(_super, params) {
    _super(this);
    const me = this;
    params = params || {};
    var webView = params.webView || new WebView();
    var amChartsPath = "assets://amcharts/index.html";
    var chartData;
    var amChartScriptNames = [];
    var ready = false;
    var readyWaiting = [];
    Object.defineProperties(this, {
        "amChartsPath": {
            get: function() {
                return amChartsPath;
            },
            set: function(value) {
                amChartsPath = value.slice(-1) === '/' ? value + "index.html" : value + "/index.html";
            },
            enumerable: true
        },
        "webView": {
            value: webView,
            writable: false,
            enumerable: true
        },
        "refresh": {
            value: function() {
                webView.loadFile(new File({ path: amChartsPath }));
            },
            enumerable: true
        },
        "data": {
            get: function() {
                return chartData;
            },
            set: function(value) {
                chartData = value;
            },
            enumerable: true
        },
        "loadScritsByName": {
            enumerable: true,
            writable: false,
            value: loadScritsByName
        },
        "ready": {
            enumerable: true,
            writable: false,
            value: readyFunction
        },
        "evaluateJS": {
            enumerable: true,
            writable: false,
            value: webView.evaluateJS.bind(webView)
        }
    });

    function loadScritsByName() {
        var scriptNames = [].concat(
            arguments.length === 1 ?
            arguments[0] :
            arguments
        );
        scriptNames = scriptNames.filter((item) => { return amChartScriptNames.indexOf(item) === -1; });
        return new Promise((resolve, reject) => {
            if (scriptNames.length === 0) {
                reject();
                return;
            }
            var myScript = "window.addScript('" + JSON.stringify(scriptNames) + "');";
            me.once("scriptLoaded", (scriptLoadStatus) => {
                for (let s in scriptLoadStatus) {
                    scriptLoadStatus[s] && amChartScriptNames.push(s);
                }
                resolve(scriptLoadStatus);
            });
            webView.evaluateJS(myScript);
        });

    }

    webView.onChangedURL = function(event) {
        if (event.url.indexOf('amcharts://') != -1) {
            var eventObject = { event: null };
            try {
                eventObject = JSON.parse(decodeURIComponent(event.url.replace('amcharts://', '')));
            }
            catch (ex) {}
            if (eventObject.event) {
                // console.log(`Event captured: ${eventObject.event} - ${JSON.stringify(eventObject.data)}`);
                me.emit(eventObject.event, eventObject.data);
            }
            return false;
        }
        return true;
    };

    webView.onLoad = function(event) {
        me.once("window.onload", () => {
            ready = true;
            readyWaiting.forEach(item => {
                item();
            });
            readyWaiting.length = 0;
        });
    };

    function readyFunction() {
        return new Promise((resolve, reject) => {
            if (ready)
                resolve();
            else
                readyWaiting.push(() => {
                    resolve();
                });
        });
    }
    
    webView.bounceEnabled = false;

    // after constructing
    this.refresh();
});


module.exports = AMCharts;
