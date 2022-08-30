/* global localStorage */

const { apiFetch } = wp;
const { dispatch } = wp.data;

const getCircularReplacer = () => {
	const seen = new WeakSet;
	return ( key, value ) => {
		if ( typeof value === 'object' && value !== null ) {
			if ( seen.has( value ) ) {
				return;
			}
			seen.add( value );
		}
		return value;
	};
};

window.onload = () => {
	const blocks = wp.blocks.getBlockTypes();
	const formattedBlocks = JSON.stringify( blocks, getCircularReplacer() );

	if ( ! blocks.length ) {
		console.warn( 'No blocks found, bailing' ); // eslint-disable-line
		return;
	}

	( async function syncBlocks() {
		console.group( 'advanced Blocks' ); // eslint-disable-line
		console.info( 'Syncing blocks data.' ); // eslint-disable-line

		apiFetch( {
			path: 'advanced_blocks/v1/blocks',
			method: 'POST',
			body: formattedBlocks,
			headers: {
				'Content-Type': 'application/json',
			},
		} ).then( () => {
			apiFetch( { path: 'advanced_blocks/v1/settings' } ).then( ( prevBlocks ) => {
				const inactiveBlocks = Object.keys( prevBlocks ).filter( ( block ) => {
					return ! prevBlocks[ block ];
				} );

				inactiveBlocks.map( ( block ) => {
					wp.blocks.unregisterBlockType( block );
				} );
			} );
		} );

		// Show notice if it exists.
		advancedNotice();

		console.info( 'Blocks data synced.' ); // eslint-disable-line
		console.groupEnd(); // eslint-disable-line
	}() );
};

const advancedNotice = () => {
	const params = window.location.search;
	const searchParams = new URLSearchParams( params );
	const hasNotice = searchParams.get( 'advanced_notice' );

	if ( hasNotice ) {
		const settingsURL = _stagBlocks.settingsURL.replace( '#settings', '' );

		const NoticeContent = (
			<p>advanced Blocks data synced. You may now visit and configure <a href={ settingsURL }>settings</a> page.</p>
		);

		dispatch( 'core/editor' ).createInfoNotice( NoticeContent, {
			spokenMessage: 'advanced Blocks data synced.',
		} );
	}
};
