'use strict';

require( './boot' )
	.then( function ( server ) {
		server.log( 'info', 'Server started: ' + server.info.uri );
	} );
