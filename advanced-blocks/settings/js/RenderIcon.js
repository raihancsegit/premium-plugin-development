import _ from 'lodash';

const { Fragment } = wp.element;
const { Dashicon } = wp.components;

const RenderIcon = ( props ) => (
	<Fragment>
		{ ( 'string' === typeof props.icon ) ? (
			<Dashicon className="advanced-blocks__block__icon" icon={ props.icon } />
		) : (
			<div className="advanced-blocks__block__icon">
				{ ( 'svg' === props.icon.type || 'i' === props.icon.type ) && (
					<Fragment>
						{ React.createElement(
							props.icon.type,
							_.omit( props.icon.props, 'children' ),
							props.icon.props.children && props.icon.props.children.map( ( element, index ) => (
								<Fragment key={ index }>
									{ React.createElement( element.type, element.props ) }
								</Fragment>
							) )
						) }
					</Fragment>
				) }
			</div>
		) }
	</Fragment>
);

export default RenderIcon;
