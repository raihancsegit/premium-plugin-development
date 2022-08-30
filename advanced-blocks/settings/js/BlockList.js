import BlocksContext from './BlocksContext';
import RenderBlockSettings from './BlockSettings';
import ErrorCard from './ErrorCard';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { ToggleControl } = wp.components;

const BlockList = () => {
	return (
		<div className="advanced-blocks__list">
			<BlocksContext.Consumer>
				{ context => (
					context.state.isLoading ? (
						<div className="spinner is-active" />
					) : (
						<Fragment>
							{ context.state.blocks.length ? context.filteredBlocks.map( ( block ) => (
								<div
									key={ block.name }
									className="advanced-blocks__block"
								>
									<p>{ block.title }</p>
									<p className="advanced-blocks__block__description">{ typeof( block.description ) === 'string' && block.description }</p>

									<ToggleControl
										label={ __( 'Toggle block' ) }
										checked={ ( block.name in context.state.activeBlocks ) ? context.state.activeBlocks[ block.name ] : true }
										onChange={ ( status ) => {
											context.toggleBlock( block.name, status );
										} }
									/>

									{ block.hasSettings && (
										<RenderBlockSettings
											initialOpen={ ( block.name in context.state.activeBlocks ) ? context.state.activeBlocks[ block.name ] : true }
											{ ...block }
										/>
									) }
								</div>
							) ) : (
								<ErrorCard />
							) }
						</Fragment>
					)
				) }
			</BlocksContext.Consumer>
		</div>
	);
};

export default BlockList;
