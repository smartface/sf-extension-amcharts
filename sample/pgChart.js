const extend = require("js-base/core/extend");
const Page = require('sf-core/ui/page');
const WebView = require('sf-core/ui/webview');
const FlexLayout = require('sf-core/ui/flexlayout');
const AMCharts = require("sf-extension-amcharts");
const Color = require('sf-core/ui/color');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const Application = require("sf-core/application");

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
                    webView: wvChart
                });
                amCharts.ready().then(() => {
                    amCharts.loadScritsByName("serial").then((status) => {
                        amCharts.evaluateJS(chartScript, function() {
                            wvChart.visible = true;
                            aiWait.visible = false;
                        });
                    }).catch(e => {
                        Application.onUnhandledError && Application.onUnhandledError(e);
                    });

                });
            }
        });

        page.children = page.children || {};


        const flChart = page.children.flChart = new FlexLayout({
            width: NaN,
            height: NaN,
            positionType: FlexLayout.PositionType.RELATIVE,
            visible: true,
            backgroundColor: Color.WHITE,
            flexGrow: 1,
            alignItems: FlexLayout.AlignItems.CENTER,
            justifyContent: FlexLayout.JustifyContent.CENTER
        });
        page.layout.addChild(flChart);
        flChart.children = flChart.children || {};

        const wvChart = flChart.children.wvChart = new WebView({
            left: 10,
            top: 10,
            right: 10,
            bottom: 10,
            positionType: FlexLayout.PositionType.ABSOLUTE,
            visible: false
        });
        flChart.addChild(wvChart);

        const aiWait = flChart.children.aiWait = new ActivityIndicator({
            positionType: FlexLayout.PositionType.RELATIVE,
            visible: true,
            backgroundColor: Color.TRANSPARENT,
            width: 42,
            height: 42,
            color: Color.BLUE
        });
        flChart.addChild(aiWait);

        page.orientation = Page.Orientation.AUTO;
    }
);


const chartScript = `
AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "categoryField": "category",
    "startDuration": 1,
    "categoryAxis": {
        "gridPosition": "start"
    },
    "trendLines": [],
    "graphs": [{
            "balloonText": "[[title]] of [[category]]:[[value]]",
            "bullet": "round",
            "id": "AmGraph-1",
            "title": "graph 1",
            "valueField": "column-1"
        },
        {
            "balloonText": "[[title]] of [[category]]:[[value]]",
            "bullet": "square",
            "id": "AmGraph-2",
            "title": "graph 2",
            "valueField": "column-2"
        }
    ],
    "guides": [],
    "valueAxes": [{
        "id": "ValueAxis-1",
        "title": "Axis title"
    }],
    "allLabels": [],
    "balloon": {},
    "legend": {
        "enabled": true,
        "useGraphSettings": true
    },
    "titles": [{
        "id": "Title-1",
        "size": 15,
        "text": "Chart Title"
    }],
    "dataProvider": [{
            "category": "category 1",
            "column-1": 8,
            "column-2": 5
        },
        {
            "category": "category 2",
            "column-1": 6,
            "column-2": 7
        },
        {
            "category": "category 3",
            "column-1": 2,
            "column-2": 3
        },
        {
            "category": "category 4",
            "column-1": 1,
            "column-2": 3
        },
        {
            "category": "category 5",
            "column-1": 2,
            "column-2": 1
        },
        {
            "category": "category 6",
            "column-1": 3,
            "column-2": 2
        },
        {
            "category": "category 7",
            "column-1": 6,
            "column-2": 8
        }
    ]
});`;


module.exports = exports = pgChart;
