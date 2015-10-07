'use strict';

var _       = require( 'lodash' );
var Promise = require( 'bluebird' );
var config  = require( '../../config' );

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

	var promises = {};
	_( config.repos ).forEach( function ( repo ) {
		promises[ repo ] = getIssues( repo );
	} ).value();

	Promise.props( promises )
	.then( function ( resultRepos ) {

		var repos = [];

		_( config.repos ).forEach( function ( repo ) {
			repos.push( {
				'name' : repo,
				'pulls' : resultRepos[ repo ]
			} );
		} ).value();

		var data = {
			'repos' : repos
		};

		reply.view( 'home', data, { 'layout' : 'home' } );

	} );


};
