var UAPI = require('../');
var uAPI = new UAPI({
    consumerKey       : 'dfg98dfg8df8g9d98gd98g8dfg',
    consumerSecret    : '.dA7xzR7fDlOrltTc7tZHVI95oMsEa',
    oauthToken        : 'BRKkNkf3ZbijzdRC6F9bPhCeYVW7FTtqNRbwsDbq',
    oauthTokenSecret  : 'qSSUWTG7FbryN3ZXpSf0fbZeEVdDkLXYrX2jGrsl',
    url               : 'http://test-ucoz.ucoz.net/'
});



uAPI.blog().get(
    function(err, data) {
        console.log('new delete', err, data);
    }
);


uAPI.blog().delete(
    {
        'id': '37'
    },
    function(err, data) {
        console.log('new delete', err, data);
    }
);

