$( document ).ready( function () {

	$( '.fetch-pr-status' ).click( function ( e ) {
		var repo = e.target.id.split( 'fetch-' )[ 1 ];

		$.ajax( {
			'url' : '/repos/' + repo + '/pulls',
		} )
		.done( function ( data ) {

			data.forEach( function ( pr ) {

				$.ajax( {
					'url' : '/repos/' + repo + '/' + pr.number + '/comments',
				} )
				.done( function ( comments ) {

					console.log( comments );
					//var html = '<table class="table table-striped">';
					//comments.forEach( function ( comment ) {
						//html += '<tr>' + '<td>' + comment.user.login + '</td></tr>';
						//html += '<tr>' + '<td>' + comment.body + '</td></tr>';
					//} );
					//html += '</table>';
					//$( '#' + repo + '-' + pr.number ).html( html );

					if ( comments.length > 0 ) {
						if( comments[ comments.length - 1 ].body === '[TL:Ready]' ){
							$( '#' + repo + '-' + pr.number + '-status' ).html( '<span class="label label-success">Ready</span> ' );
						} else if( comments[ comments.length - 1 ].body === '[D:Ready]' ){
							$( '#' + repo + '-' + pr.number + '-status' ).html( '<span class="label label-info">Updated</span> ' );
						} else {
							$( '#' + repo + '-' + pr.number + '-status' ).html( '<span class="label label-danger">Need to fix</span> ' );
						}
					} else {
							$( '#' + repo + '-' + pr.number + '-status' ).html( '<span class="label label-default">Need verification</span> ' );
					}
				} );

			} );

		} );

	} );
} );
