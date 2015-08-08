var Uapi = require('../');
var upai = new Uapi({
    //consumer_key       : 'dfg98dfg8df8g9d98gd98g8dfg',
    //consumer_secret    : '.dA7xzR7fDlOrltTc7tZHVI95oMsEa',
    //oauth_token        : 'BRKkNkf3ZbijzdRC6F9bPhCeYVW7FTtqNRbwsDbq',
    //oauth_token_secret : 'qSSUWTG7FbryN3ZXpSf0fbZeEVdDkLXYrX2jGrsl',
    'consumerKey'       : 'dfg98dfg8df8g9d98gd98g8dfg',
    'consumerSecret'    : '.dA7xzR7fDlOrltTc7tZHVI95oMsEa',
    'oauthToken'        : 'BRKkNkf3ZbijzdRC6F9bPhCeYVW7FTtqNRbwsDbq',
    'oauthTokenSecret'  : 'qSSUWTG7FbryN3ZXpSf0fbZeEVdDkLXYrX2jGrsl',
    url                 : 'test-ucoz.ucoz.net'
});
//
upai.exec(
    '/blog', 
    'get',
    null, 
    function(err, r) {
        console.log('done', err, r);
    }
);
//
//upai.exec(
//    '/blog', 
//    'post', 
//    {
//        title: 'Про коня. 1111',
//        description: 'd sefsdfef df s ds',
//        message: 'ебали коня мы три года</br> А на четвертом он и помер<br/> Печать'
//    }, 
//    function(err, r) {
//        console.log('done', err, r);
//    }
//);
