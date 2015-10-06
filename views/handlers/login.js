'use strict';

module.exports = function ( request, reply ) {

	if ( request.state.github ) {
		return reply.redirect( '/home' );
	}

	return reply.view( 'login', null, { 'layout' : 'login' } );

};
