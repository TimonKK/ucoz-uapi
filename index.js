var _ = require('lodash');
var querystring = require('querystring');
var crypto = require('crypto');
var curl = require('curlrequest');
var request = require('request');

function urlencode(str) {
	//       discuss at: http://phpjs.org/functions/urlencode/
	//      original by: Philip Peterson
	//      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//      improved by: Brett Zamir (http://brett-zamir.me)
	//      improved by: Lars Fischer
	//         input by: AJ
	//         input by: travc
	//         input by: Brett Zamir (http://brett-zamir.me)
	//         input by: Ratheous
	//      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//      bugfixed by: Joris
	// reimplemented by: Brett Zamir (http://brett-zamir.me)
	// reimplemented by: Brett Zamir (http://brett-zamir.me)
	//             note: This reflects PHP 5.3/6.0+ behavior
	//             note: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
	//             note: pages served as UTF-8
	//        example 1: urlencode('Kevin van Zonneveld!');
	//        returns 1: 'Kevin+van+Zonneveld%21'
	//        example 2: urlencode('http://kevin.vanzonneveld.net/');
	//        returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
	//        example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
	//        returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
	
	str = (str + '')
		.toString();
	
	// Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
	// PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
	return encodeURIComponent(str)
		.replace(/!/g, '%21')
		.replace(/'/g, '%27')
		.replace(/\(/g, '%28')
		.
		replace(/\)/g, '%29')
		.replace(/\*/g, '%2A')
		.replace(/%20/g, '+');
}


function base64_encode(data) {
	//  discuss at: http://phpjs.org/functions/base64_encode/
	// original by: Tyler Akins (http://rumkin.com)
	// improved by: Bayron Guevara
	// improved by: Thunder.m
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Rafał Kukawski (http://kukawski.pl)
	// bugfixed by: Pellentesque Malesuada
	//   example 1: base64_encode('Kevin van Zonneveld');
	//   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	//   example 2: base64_encode('a');
	//   returns 2: 'YQ=='
	
	var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		ac = 0,
		enc = '',
		tmp_arr = [];
	
	if (!data) {
		return data;
	}
	
	do { // pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);
		
		bits = o1 << 16 | o2 << 8 | o3;
		
		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;
		
		// use hexets to index into b64, and append result to encoded string
		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);
	
	enc = tmp_arr.join('');
	
	var r = data.length % 3;
	
	return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

function mt_rand(min, max) {
	//  discuss at: http://phpjs.org/functions/mt_rand/
	// original by: Onno Marsman
	// improved by: Brett Zamir (http://brett-zamir.me)
	//    input by: Kongo
	//   example 1: mt_rand(1, 1);
	//   returns 1: 1
	
	var argc = arguments.length;
	if (argc === 0) {
		min = 0;
		max = 2147483647;
	} else if (argc === 1) {
		throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
	} else {
		min = parseInt(min, 10);
		max = parseInt(max, 10);
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function time() {
	return Math.floor(new Date().getTime() / 1000);
}

var moduleNameMap = {
};

function UCozUAPI(params) {
	var me = this;
	
	if ( ! params) {
		return new Error('first param is empty')
	}
	
	if ( ! params.consumer_key      ) throw new Error('"consumer_key" is not defined');
	if ( ! params.consumer_secret   ) throw new Error('"consumer_secret" is not defined');
	if ( ! params.oauth_token       ) throw new Error('"oauth_token" is not defined');
	if ( ! params.oauth_token_secret) throw new Error('"oauth_token_secret" is not defined');
	if ( ! params.url               ) throw new Error('"url" is not defined');
	
	if ( ! params.module) {
		params.module = '';
	}
	
	params.url = params.url.replace('http:\/\/', '');
	params.url = params.url.replace(/\/$/, '');
	
	//setup для работы с uApi
	var oauth_nonce = U.lib.md5(new Date().getTime() + '' + mt_rand()); //не изменять
	var timestamp =  time();//не изменять
	var sig_method = 'HMAC-SHA1'; //не изменять
	var oauth_version = '1.0'; //не изменять
	var consumer_key = params.consumer_key;
	var consumer_secret = params.consumer_secret;
	var oauth_token = params.oauth_token;
	var oauth_token_secret = params.oauth_token_secret;
	var main_url = params.url; //нужно указать с http:// и с uapi. Например: http://yourwebsite.ucoz.ru/uapi
	
	var parametrs = _.extend(
		{
			'oauth_consumer_key'     : consumer_key, //обязательный параметр
			'oauth_nonce'            : oauth_nonce, //обязательный параметр
			'oauth_signature_method' : sig_method, //обязательный параметр
			'oauth_timestamp'        : '' + timestamp, //обязательный параметр
			'oauth_token'            : oauth_token, //обязательный параметр
			'oauth_version'          : oauth_version, //обязательный параметр
		}
	);
	
	
	
	me.exec = function(moduleName, method, addParams, cb) {
		try {
			if ( ! moduleName) {
				throw new Error('exec: moduleName not defined');
				return ;
			}
			if ( ! method    ) {
				throw new Error('exec: method not defined');
				return ;
			}
			if ( ! cb        ) {
				throw new Error('exec: cb not defined');
				return ;
			}
			
			if (addParams) {
				Object.keys(addParams).forEach(function(key) {
					parametrs[key] = addParams[key];
				});
			}
			
			parametrs = Object.keys(parametrs)
				.sort(function(a, b) {
					return a.localeCompare(b);
				})
				.reduce(function(obj, key) {
					obj[key] = parametrs[key];
					return obj;
				}, {});
			
			if (moduleNameMap[moduleName]) {
				moduleName = moduleNameMap[moduleName];
			}
			
			//начинается формирование подписи для правильного запроса
			var request_url = 'http://' + params.url + '/uapi' + moduleName.trim().toLowerCase();
			method = method.toUpperCase();
			var parametrs2 = parametrs;
			
			parametrs = Object.keys(parametrs).reduce(function (obj, key) {
				
				// Это не я придумал, если не убирать эти символы, сигнатура не сходится
				obj[key] = parametrs[key].replace('@', '').replace('!', '');
				
				return obj;
			}, {});
			
			
			var basestring = querystring.stringify(parametrs).replace('+', '%20');
			
			basestring = method + '&' + urlencode(request_url) + '&' + urlencode(basestring);
			
			var hash_key = consumer_secret + '&' + oauth_token_secret;
			
			var oauth_signature = urlencode(
				base64_encode(
					U.lib.getSha1(
						basestring,
						hash_key
					)
				).trim()
			);
			
			var parametrs_forurl = querystring.stringify(parametrs);
			var url = request_url + '?oauth_signature=' + oauth_signature;
			var url_for = request_url + '?' + parametrs_forurl + '&oauth_signature=' + oauth_signature;
			
		} catch(e) {
			console.log('e', e);
		}
		
		
		if (method == 'GET') {
			var options = {
				url     : url_for,
				include : true
			};
			curl.request(options, function (err, parts) {
				if (err) return cb(err);
				
				var json = null;
				
				parts = parts.split('\r\n');
				var data = parts.pop()
					, head = parts.pop();
				
				try {
					json = JSON.parse(data);
				} catch (e) {
					return cb(e);
				}
				
				cb(null, json)
			});
		} else if (method == 'POST') {
			request.post(url_for, {form: parametrs2}, function(err, result, body) {
				if (err) return cb(err);
				
				var json = null;
				try {
					json = JSON.parse(body);
				} catch(e) {
					return cb(e);
				}
				
				if (json.error) {
					return cb(json.error);
				}
				
				cb(null, json)
			});
		} else {
			return cb(new Error('method "' + method + '" not implemented'));
		}
		
		
		return me;
	}
	
	//формирование setup закончено
	return me;
}

module.exports = UCozUAPI;
