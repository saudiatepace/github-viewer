'use strict';

var Request = require( 'request' );

module.exports = function ( request, requestData, next ) {

	var payload = request.payload;

	var user        = ( payload && payload.username ) || request.state.github.username;
	var accessToken = ( payload && payload[ 'access-token' ] ) || request.state.github.accessToken;

	// Transfer to config
	var githubURI = 'https://' + user + ':' + accessToken + '@api.github.com';

	var options = {
		'method' : requestData.method,
		'url' : requestData.absUrl || [ githubURI, requestData.path ].join( '' ),
		'headers' : {
			'User-Agent' : user
		}
	};

	return Request( options, function ( error, response, body ) {
		return next( error, response, JSON.parse( body ) );
	} );

};
