import classnames from 'classnames';
import BlocksContext from './BlocksContext';

const { __ } = wp.i18n;

const VIEWS = [
	{ slug: 'dashboard', label: __( 'Dashboard' ) },
	{ slug: 'settings', label: __( 'Settings' ) },
	{ slug: 'themes', label: __( 'Our themes' ) },
];

const Switcher = () => {
	return (
		<ul>
			<BlocksContext.Consumer>
				{ context => (
					VIEWS.map( ( view, index ) => (
						<li key={ index }>
							<a
								href={ `#${ view.slug }` }
								className={ classnames( {
									'is-active': context.state.view === view.slug,
								} ) }
								onClick={ ( e ) => {
									e.preventDefault();
									let link = new URL( e.target.href );
									link = link.hash.slice( 1 );
									context.setView( link );
								} }
							>
								{ view.label }
							</a>
						</li>
					) )
				) }
			</BlocksContext.Consumer>
		</ul>
	);
};

export default Switcher;
