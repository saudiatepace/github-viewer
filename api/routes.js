'use strict';

module.exports = [

	{
		'method'  : 'GET',
		'path'    : '/repos/{repo}/{issue}/comments',
		'handler' : require( './handlers/comments-list' ),
	},
	{
		'method'  : 'GET',
		'path'    : '/repos/{repo}/pulls',
		'handler' : require( './handlers/pulls-list' ),
	},
	{
		'method'  : 'POST',
		'path'    : '/login',
		'config' : {
			'handler' : require( './handlers/login' ),
		}
	}

];
