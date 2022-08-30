import BlocksContext from '../BlocksContext';
import ErrorCard from '../ErrorCard';
import featured from './featured.png';
import stagblocks from './stagblocks.png';

const { Fragment } = wp.element;
const { __ } = wp.i18n;

const slugify = ( text ) => {
	return text.toString().toLowerCase()
		.replace( /\s+/g, '-' ) // Replace spaces with -
		.replace( /[^\w\-]+/g, '' ) // Remove all non-word chars
		.replace( /\-\-+/g, '-' ) // Replace multiple - with single -
		.replace( /^-+/, '' ) // Trim - from start of text
		.replace( /-+$/, '' ); // Trim - from end of text
};

const Dashboard = () => (
	<Fragment>
		<div className="blocks-list">
			<div className="header">
				<h3>{ __( 'A warm ' ) }</h3>
				<p>{ __( 'Start by' ) }</p>
			</div>

			<div className="feature-list">
				<div className="feature-list__feature">
					<figure>
						<img src={ featured } alt="Gutenberg" />
					</figure>
					<div className="feature-list__content">
						<h3>{ __( 'Getting started with Gutenberg' ) }</h3>
						<p>{ __( 'Watch this quick intro video tutorial on Gutenberg Editor to get started on building pages with blocks.' ) }</p>
						<p><a href="https://wordpress.org/gutenberg/" target="_blank" rel="noopener noreferrer">{ __( 'Read Tutorials & Documentation Pages' ) }</a></p>
					</div>
				</div>
				<div className="feature-list__feature">
					<figure>
						<img src={ stagblocks } alt="advanced Blocks" />
					</figure>
					<div className="feature-list__content">
						<h3>{ __( 'Making Gutenberg Block Editor a more premium experience with advanced Blocks' ) }</h3>
						<p>{ __( 'Watch this quick intro video tutorial to get started on building pages with blocks. ' ) }</p>
						<p><a href="https://stagblocks.com/" target="_blank" rel="noopener noreferrer">{ __( 'Read Documentation & Articles' ) }</a></p>
					</div>
				</div>
			</div>

			<div className="header">
				<h3>{ __( 'A Quick Intro to Blocks that come with advanced Blocks' ) }</h3>
				<p>{ __( 'Take a look at all of our blocks and see them in live action.' ) }</p>
			</div>

			<ul>
				<BlocksContext.Consumer>
					{ ( context ) => (
						( Array.isArray( context.state.stagBlocks ) && context.state.stagBlocks.length ) ? (
							context.state.stagBlocks.map( ( block, idx ) => (
								<li key={ idx }>
									<h3>{ block.title }</h3>
									<p>{ block.description }</p>
									<p>
										<a
											href={ `https://stagblocks.com/blocks/${ slugify( block.title ) }-block` }
											target="_blank"
											rel="noopener noreferrer"
										>
											{ __( 'View in Action' ) }
										</a>
									</p>
								</li>
							) )
						) : (
							<ErrorCard />
						)
					) }
				</BlocksContext.Consumer>
			</ul>
		</div>
	</Fragment>
);

export default Dashboard;

