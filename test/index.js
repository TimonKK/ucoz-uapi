var Uapi = require('../');
var upai = new Uapi({
    'consumerKey'       : 'dfg98dfg8df8g9d98gd98g8dfg',
    'consumerSecret'    : '.dA7xzR7fDlOrltTc7tZHVI95oMsEa',
    'oauthToken'        : 'BRKkNkf3ZbijzdRC6F9bPhCeYVW7FTtqNRbwsDbq',
    'oauthTokenSecret'  : 'qSSUWTG7FbryN3ZXpSf0fbZeEVdDkLXYrX2jGrsl',
    'url'               : 'test-ucoz.ucoz.net'
});

upai.filesDirectory().get(
    function(err, data) {
        console.log('new get', err, data);
    }
)
