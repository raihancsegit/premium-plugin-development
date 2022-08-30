import classnames from 'classnames';
import BlocksContext from './BlocksContext';

const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	IconButton,
} = wp.components;

let categories = wp.blocks.getCategories();
categories = [
	{
		slug: 'advanced-blocks',
		title: __( 'advanced Blocks' ),
	},
	...categories,
];

export default class Categories extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			searchVisible: false,
		};

		this.focus = this.focus.bind( this );
	}

	focus() {
		this.textInput.focus();
	}

	render() {
		return (
			<BlocksContext.Consumer>
				{ context => (
					context.state.blocks && context.state.blocks.length ? (
						<ul className="block-categories">
							{
								!! ( categories ) && ( categories.map( ( category ) => (
									<li key={ category.slug }>
										<a
											href={ `#${ category.slug }` }
											onClick={ ( e ) => {
												e.preventDefault();
												let link = new URL( e.target.href );
												link = link.hash.slice( 1 );
												context.setCategory( link );
											} }
											className={ classnames( {
												'is-active': context.state.category === category.slug,
											} ) }
										>
											{ category.title }
										</a>
									</li>
								) ) )
							}
							<IconButton
								label={ __( 'Search' ) }
								onClick={ () => {
									this.setState( { searchVisible: ! this.state.searchVisible } );
									this.focus();
									if ( this.state.searchVisible ) {
										this.textInput.value = '';
										context.resetSearch();
									}
								} }
								icon={ this.state.searchVisible ? 'no' : <i className="fas fa-search" /> }
								className="block-search-button"
								style={ {
									marginLeft: 'auto',
								} }
							/>
							<input
								type="text"
								className={ classnames( 'components-text-control__input block-search', {
									'is-visible': !! this.state.searchVisible,
								} ) }
								onChange={ ( event ) => context.handleSearch( event.target.value ) }
								placeholder={ __( 'Search a block...' ) }
								ref={ ( ref ) => ( this.textInput = ref ) }
							/>
						</ul>
					) : null
				) }
			</BlocksContext.Consumer>
		);
	}
}
