const WebView = require("sf-core/ui/webview");
const File = require('sf-core/io/file');
var EventEmitter = require('wolfy87-eventemitter');


function AMCharts(params) {
    var ee = new EventEmitter();
    Object.assign(this, ee);
    const me = this;
    params = params || {};
    var webView = params.webView || new WebView();
    var amChartsPath = "assets://amcharts/index.html";
    var chartData;
    var amChartScriptNames = [];
    Object.defineProperties(this, {
        /**
         * The directory that contains jet files. By default it is "assets://jet/index.html".
         * 
         * @property {String} [ jetPath = "assets://jet/index.html" ]
         * @android
         * @ios
         * @since 1.0.0
         */
        "amChartsPath": {
            get: function() {
                return amChartsPath;
            },
            set: function(value) {
                amChartsPath = value.slice(-1) === '/' ? value + "index.html" : value + "/index.html";
            },
            enumerable: true
        },
        /**
         * The WebView for load and show Oracle Jet Charts inside of it. It should be provided via constructor. 
         * If not given in constructor, webview will generated automatically.
         * 
         * @property {UI.WebView} webView
         * @android
         * @ios
         * @since 1.0.0
         */
        "webView": {
            get: function() {
                return webView;
            },
            set: function(value) {
                webView = value;
            },
            enumerable: true
        },
        /**
         * Refresh WebView and reload JET charts.
         * 
         * @method refresh
         * @android
         * @ios
         * @since 1.0.0
         */
        "refresh": {
            value: function() {
                webView.loadFile(new File({ path: amChartsPath }));
                webView.onShow = function(event) {
                    var myScript = "window.drawChart('" + JSON.stringify(chartData) + "');";
                    webView.evaluateJS(myScript, function() {});
                };
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
            value: loadScritsByName
        }
    });
    

    function loadScritsByName() {
        var scriptNames = [].concat(
            arguments.length === 1 ?
            arguments[0] :
            arguments
        );
        return new Promise((resolve, reject) => {
            if(scriptNames.length === 0) {
                reject();
                return;
            }
            var myScript = "window.addScript('" + JSON.stringify(scriptNames) + "');";
            webView.evaluateJS(myScript, function() {
                me.once("scriptLoaded", (data) => {
                    resolve(data);
                });
            });
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
                me.emit(eventObject.event, eventObject.data);
            }
            return false;
        }
        return true;
    };


    // after constructing
    this.refresh();
}


module.exports = AMCharts;
