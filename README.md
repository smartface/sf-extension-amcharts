# AMCharts from Smartface
[![Twitter: @Smartface_io](https://img.shields.io/badge/contact-@Smartface_io-blue.svg?style=flat)](https://twitter.com/smartface_io)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/smartface/sf-extension-amcharts/master/LICENSE.txt)

Lorem ipsum

## Installation
Utility extension can be installed via npm easily from our public npm repository. The installation is pretty easy via Smartface Cloud IDE.
Run the following code in terminal
```shell
(cd ~/workspace/scripts && npm i -S sf-extension-amcharts)
```
## How to use
Please review the [sampe page](sample/pgChart.js).

1. require AMCharts
```javascript
const AMCharts = require("sf-extension-amcharts");
```
2. Create your AMCharts instance
```javascript
var amCharts = new AMCharts({
     webView: wvChart //optional. If not provided use the the one amCharts.webView
});
```
Ready is a Promise. It is a good practice to run other codes when the promise is resolved.

3. When the chart web page is ready, install other AMCharts libraries.
```javascript
amCharts.loadScritsByName("serial");
//OR load multiple files
amCharts.loadScritsByName("serial", "funnel");
```
This loadScritsByName function loads files within assets/amcharts/amcharts folder.
Those libraries are the libraries that AMCharts provides as is.
loadScritsByName function returns a Promise. When it is done, the libraries are loaded.

4. It is a good practice to run the Chart code with data after the libraries are loaded
```javascript
amCharts.evaluateJS(chartScript);
```
In the example above `chartScript` is a string that contains the JavaScript code to render the Chart and its data.
In the webPage there is a div element with id `chartdiv`. Use this div element to render your chart.


### Quick Run
After installation please add the following code to the app.js by commenting out the other run codes.
```javascript
Router.add("pgChart", "sf-extension-amcharts/sample/pgChart");
Router.go("pgChart");
```

### Coding Advice
Running & rendering of the chart can take time. You can show an activity indicator while
the chart is being rendered. After your last `evaluateJS` callback you can change the
visibities of the ActivityIndicator and the WebView.

## Need Help?

Please [submit an issue](https://github.com/smartface/sf-extension-amcharts/issues) on GitHub and provide information about your problem.

## Support & Documentation & Useful Links
- [Guides](https://developer.smartface.io/)
- [API Docs](http://ref.smartface.io/)
- [Smartface Cloud Dashboard](https://cloud.smartface.io)

## Code of Conduct
We are committed to making participation in this project a harassment-free experience for everyone, regardless of the level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.
Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](./LICENSE.txt) file. Within the scope of this license, all modifications to the source code, regardless of the fact that it is used commercially or not, shall be committed as a contribution back to this repository.
