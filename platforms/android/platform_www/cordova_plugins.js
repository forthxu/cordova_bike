cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.qdc.plugins.baidu.location/www/baidu_location.js",
        "id": "com.qdc.plugins.baidu.location.baidu_location",
        "clobbers": [
            "baidu_location"
        ]
    },
    {
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "id": "cordova-plugin-geolocation.geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "id": "cordova-plugin-geolocation.PositionError",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-themeablebrowser/www/themeablebrowser.js",
        "id": "cordova-plugin-themeablebrowser.themeablebrowser",
        "clobbers": [
            "cordova.ThemeableBrowser"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.1",
    "com.qdc.plugins.baidu.location": "1.0.0",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-geolocation": "2.1.1-dev",
    "cordova-plugin-themeablebrowser": "0.2.15"
};
// BOTTOM OF METADATA
});