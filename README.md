# ucoz-uapi
Module for use with uCoz uAPI for Node.js.

1. Go to [uCoz uAPI](http://api.ucoz.net/ru/)
2. Get the following keys: Consumer key, Consumer secret, OAuth token, OAuth token secret.
3. Make sure the checkbox "Enable uAPI module" in the module settings (in the Control Panel of the site).
3. Use:
```javascript
var UAPI = require('ucoz-uapi');
var uAPI = new UAPI({
    consumerKey       : 'dfg98dfg8df8g9d98gd98g8dfg',
    consumerSecret    : '.dA7xzR7fDlOrltTc7tZHVI95oMsEa',
    oauthToken        : 'BRKkNkf3ZbijzdRC6F9bPhCeYVW7FTtqNRbwsDbq',
    oauthTokenSecret  : 'qSSUWTG7FbryN3ZXpSf0fbZeEVdDkLXYrX2jGrsl',
    url               : 'yousiteurl'
});

uAPI.blog().get(
    function(err, data) {
        console.log(err, data);
    }
);

uAPI.blog().post(
    {
        title       : 'Какой-то заголовок',
        description : 'Какое-то описание',
        message     : 'Какое-то сообщение'
    },
    function(err, data) {
        console.log(err, data);
    }
);

uAPI.blog().put(
    {
        id          : '83',
        title       : 'Какой-то заголовок2',
        description : 'Какое-то описание2',
        message     : 'Какое-то сообщение2'
    },
    function(err, data) {
        console.log(err, data);
    }
);

uAPI.blog().delete(
    {
        id: '83'
    },
    function(err, data) {
        console.log(err, data);
    }
);
```

The module uses the [realization](http://phpjs.org/) of certain functions php:
* urlencode
* base64_encode
* mt_rand
* http_build_query
