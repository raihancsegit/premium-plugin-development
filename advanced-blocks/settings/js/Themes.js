/* global fetch */
const { Component } = wp.element;
const { Spinner } = wp.components;

const { __ } = wp.i18n;

class Themes extends Component {
	state = {
		themes: [],
	}
	componentDidMount() {
		fetch( 'https://advancedblocks.com/wp-json/codestag/v1/themes' )
			.then( ( response ) => response.json() )
			.then( ( responseJSON ) => {
				this.setState( {
					themes: responseJSON,
				} );
			} );
	}

	render() {
		const themes = this.state.themes;
		return (
			( themes.length ) ? (
				<section className="codestag-themes">
					<header>
						<h2>{ __( 'Our beautifully fine-tuned themes at your service' ) }</h2>
						<p>{ __( 'Browse through the collections to see which one suits your idea the most, get started!' ) }</p>
					</header>
					{ themes.map( ( theme, index ) => (
						<div className="theme" key={ index }>
							<a className="theme__link" href={ theme.link } target="_blank" rel="noopener noreferrer">
								<span className="screen-reader-text">{ theme.title }</span>
							</a>
							{ theme.is_new &&
								<span className="theme__badge">{ __( 'New' ) }</span>
							}
							<figure>
								<img src={ theme.featured } alt={ theme.title } />
							</figure>
							<h4>{ theme.title }</h4>
							<p>{ theme.subtitle }</p>

							<a href={ theme.link } target="_blank" rel="noopener noreferrer">
								View { theme.title }
							</a>
						</div>
					) ) }
				</section>
			) : (
				<Spinner />
			)
		);
	}
}

export default Themes;
