'use strict';

var _       = require( 'lodash' );
var Promise = require( 'bluebird' );

module.exports = function ( request, reply ) {

	if ( !request.state.github ) {
		return reply.view( 'login', null, { 'layout' : 'login' } );
	}

	function getIssues( repo ) {

		return new Promise( function ( resolve, reject ) {

			var requestData = {
				'method' : 'GET',
				'path' : [ '/repos',
										'School-Improvement-Network',
										repo,
									 'issues' ].join( '/' )
			};

			return request.server.methods.github.request( request, requestData, function ( error, response, body ) {

				if ( error ) {
					return reject( error );
				}

				resolve( body );

			} );

		} );

	}

	Promise.props( {
		'observation-gateways' : getIssues( 'observation-gateways' ),
		'legacy-service'       : getIssues( 'legacy-service' ),
		'observation-service'  : getIssues( 'observation-service' ),
		'template-service'     : getIssues( 'template-service' ),
		'email-service'        : getIssues( 'email-service' ),
		'file-service'         : getIssues( 'file-service' ),
		'avenue'               : getIssues( 'avenue' ),
		'lapin'                : getIssues( 'lapin' ),
		'lapin-mock'           : getIssues( 'lapin-mock' ),
		'pathlint'             : getIssues( 'pathlint' )
	} )
	.then( function ( repos ) {
		var data = {
			'repos' : [
				{
					'name' : 'observation-gateways',
					'pulls' : repos[ 'observation-gateways' ]
				},
				{
					'name' : 'legacy-service',
					'pulls' : repos[ 'legacy-service' ]
				},
				{
					'name' : 'observation-service',
					'pulls' : repos[ 'observation-service' ]
				},
				{
					'name' : 'template-service',
					'pulls' : repos[ 'template-service' ]
				},
				{
					'name' : 'email-service',
					'pulls' : repos[ 'email-service' ]
				},
				{
					'name' : 'file-service',
					'pulls' : repos[ 'file-service' ]
				},
				{
					'name' : 'avenue',
					'pulls' : repos[ 'avenue' ]
				},
				{
					'name' : 'lapin',
					'pulls' : repos[ 'lapin' ]
				},
				{
					'name' : 'lapin-mock',
					'pulls' : repos[ 'lapin-mock' ]
				},
				{
					'name' : 'pathlint',
					'pulls' : repos[ 'pathlint' ]
				},
			]
		};

		reply.view( 'home', data, { 'layout' : 'home' } );

	} );


};
