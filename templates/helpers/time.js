'use strict';

var moment = require( 'moment' );

module.exports = function ( time ) {
	return moment( time ).fromNow();
};
