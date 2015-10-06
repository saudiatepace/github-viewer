'use strict';

module.exports = [

	{
		'method'  : 'GET',
		'path'    : '/',
		'handler' : require( './handlers/login' ),
	},

	{
		'method'  : 'GET',
		'path'    : '/home',
		'config' : {
			'state' : {
				'parse' : true, // parse and store in request.state
				'failAction': 'error'
			},
			'handler' : require( './handlers/home' )
		}
	},

	{
		'method'  : 'GET',
		'path'    : '/public/{param*}',
		'handler' : {
			'directory' : {
				'path'    : 'public',
				'listing' : true
			}
		}
	}

];
