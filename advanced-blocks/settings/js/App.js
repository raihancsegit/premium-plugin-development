/* global fetch */

import BlocksContext from './BlocksContext';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

class App extends React.Component {
	state = {
		category: 'advanced-blocks',
		isLoading: true,
		blocks: [],
		stagBlocks: [],
		activeBlocks: {},
		searchList: {},
		view: 'dashboard',
	}

	syncSettings() {
		// Sync user settings.
		fetch( `${ _stagBlocks.root }advanced_blocks/v1/settings`, {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': _stagBlocks.nonce,
			},
			body: JSON.stringify( this.state.activeBlocks ),
		} );
	}

	componentDidMount() {
		// Set active tab based on URL hash
		// e.g.: /options-general.php?page=advanced-blocks#settings
		const currentURL = new URL( window.location.href );
		const hash = currentURL.hash.slice( 1 );

		if ( hash ) {
			this.setState( {
				view: hash,
			} );
		}

		fetch( `${ _stagBlocks.root }advanced_blocks/v1/blocks` )
			.then( ( response ) => response.json() )
			.then( ( responseJSON ) => {
				// Fetch list of StagBlocks.
				const stagBlocks = responseJSON.blocks.filter( ( block ) => block.name.startsWith( 'advanced/' ) );

				this.setState( {
					blocks: responseJSON.blocks,
					isLoading: false,
					stagBlocks,
				} );
			} )
			.catch( () => {
				this.setState( {
					isLoading: false,
				} );
			} );

		// Fetch user settings.
		fetch( `${ _stagBlocks.root }advanced_blocks/v1/settings`, {
			credentials: 'same-origin',
			headers: {
				'X-WP-Nonce': _stagBlocks.nonce,
			},
		} )
			.then( ( response ) => response.json() )
			.then( ( json ) => {
				this.setState( {
					activeBlocks: json,
				} );
			} );
	}

	getFilteredBlocks() {
		if ( this.state.searchList && this.state.searchList.length ) {
			return this.state.searchList;
		}
		return this.state.blocks.filter( block => {
			return ( block.customCategory ? block.customCategory === this.state.category : block.category === this.state.category );
		} );
	}

	render() {
		return (
			<div className="advanced-blocks">
				<BlocksContext.Provider
					value={ {
						state: this.state,
						setCategory: ( category ) => {
							this.setState( {
								category,
							} );
						},
						setView: ( view ) => {
							this.setState( {
								view,
							} );
						},
						filteredBlocks: this.getFilteredBlocks(),
						toggleBlock: ( block, status ) => {
							const newBlocks = this.state.activeBlocks;
							newBlocks[ block ] = status;

							this.setState( {
								activeBlocks: newBlocks,
							} );

							this.syncSettings();
						},
						handleSearch: ( value ) => {
							const blocks = this.state.blocks;
							const filtered = blocks.filter( ( block ) => {
								if ( block.keywords && block.keywords.length ) {
									const keywordMatch = ( keyword ) => ( keyword === value );
									return block.name.includes( value ) || block.keywords.some( keywordMatch );
								}

								return block.name.includes( value );
							} );

							this.setState( {
								searchList: filtered,
							} );
						},
						resetSearch: () => {
							this.setState( {
								searchList: [],
							} );
						},
					} }
				>
					<Header />
					<Content />
					<Footer />
				</BlocksContext.Provider>
			</div>
		);
	}
}

export default App;
