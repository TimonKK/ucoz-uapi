# ucoz-uapi
Module for use with uCoz uAPI for Node.js.

How to use:
1.  Go to http://api.ucoz.net/ru/
2.  Get the following keys: Consumer key, Consumer secret, OAuth token, OAuth token secret
4. Make sure the checkbox "Enable uAPI module" in the module settings (in the Control Panel of the site).
3. Use:

```
var UAPI = require('ucoz-uapi');
var uAPI = new UAPI({
    consumerKey       : 'dfg98dfg8df8g9d98gd98g8dfg',
    consumerSecret    : '.dA7xzR7fDlOrltTc7tZHVI95oMsEa',
    oauthToken        : 'BRKkNkf3ZbijzdRC6F9bPhCeYVW7FTtqNRbwsDbq',
    oauthTokenSecret  : 'qSSUWTG7FbryN3ZXpSf0fbZeEVdDkLXYrX2jGrsl',
    url               : 'yousiteurl'
});

uAPI.filesDirectory().get(
    function(err, data) {
        console.log(err, data);
    }
)
```
