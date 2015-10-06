'use strict';

module.exports = function ( request, reply ) {

	var requestData = {
		'method' : 'GET',
		'path' : [ '/repos',
							'School-Improvement-Network',
							request.params.repo,
							'issues',
							request.params.issue,
							'comments' ].join( '/' )
	};

	request.server.methods.github.request( request, requestData, function ( error, response, body ) {

		if ( error ) {
			return reply( error ).code( 400 );
		}
		return reply( body );

	} );

};
