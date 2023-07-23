import BlockList from './BlockList';
import BlocksContext from './BlocksContext';
import Categories from './Categories';
import Dashboard from './dashboard/dashboard';
import Themes from './Themes';

const { Fragment } = wp.element;

const renderView = ( view ) => {
	switch ( view ) {
		case 'themes': {
			return (
				<Fragment>
					<Themes />
				</Fragment>
			);
		}

		case 'settings': {
			return (
				<Fragment>
					<Categories />
					<BlockList />
				</Fragment>
			);
		}

		default: {
			return (
				<Fragment>
					<Dashboard />
				</Fragment>
			);
		}
	}
};

const Content = () => {
	return (
		<section className="advanced-blocks__content">
			<BlocksContext.Consumer>
				{ context => renderView( context.state.view ) }
			</BlocksContext.Consumer>
		</section>
	);
};

export default Content;
