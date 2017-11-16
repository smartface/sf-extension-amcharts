const extend = require("js-base/core/extend");
const Page = require('sf-core/ui/page');
const WebView = require('sf-core/ui/webview');
const FlexLayout = require('sf-core/ui/flexlayout');
const AMCharts = require("sf-extension-amcharts");
var pgChart = new extend(Page)(
    function(_super, params) {
        var page = this;
        _super(this, {
            onShow: function() {
                page.statusBar.visible = true;
                page.headerBar.visible = true;
                this.headerBar.title = "AMCharts";
            },
            onLoad: function() {
                var amCharts = new AMCharts({
                    webView: page.children.wvChart
                });
                amCharts.loadScritsByName("serial").then((status) => {
                    console.log(`load status: ${JSON.stringify(status)}`);
                }).catch(err => {
                    console.log(`error: ${JSON.stringify(err)}`);
                });
            }
        });

        page.children = page.children || {};

        const wvChart = page.children.wvChart = new WebView({
            left: 10,
            top: 10,
            right: 10,
            bottom: 10,
            positionType: FlexLayout.PositionType.ABSOLUTE
        });
        page.layout.addChild(wvChart);
    }
);

module.exports = exports = pgChart;
