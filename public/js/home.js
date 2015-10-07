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

					if ( comments.length > 0 ) {
						if( comments[ comments.length - 1 ].body.indexOf( '[TL:Ready]') > -1 ){
							$( '#' + repo + '-' + pr.number + '-status' ).html( '<span class="label label-success">Ready</span> ' );
						} else if( comments[ comments.length - 1 ].body.indexOf( '[D:Ready]') > -1){
							$( '#' + repo + '-' + pr.number + '-status' ).html( '<span class="label label-info">Updated</span> ' );
						} else {
							$( '#' + repo + '-' + pr.number + '-status' ).html( '<span class="label label-danger">Need to fix</span> ' );
						}
						$( '#' + repo + '-' + pr.number + '-time' ).html( moment( comments[ comments.length - 1 ].created_at ).fromNow() );
					} else {
							$( '#' + repo + '-' + pr.number + '-status' ).html( '<span class="label label-default">Need verification</span> ' );
					}
				} );

			} );

		} );

	} );
} );
