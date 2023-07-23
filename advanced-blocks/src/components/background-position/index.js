import './editor.scss';

const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	BaseControl,
	IconButton,
	ButtonGroup,
} = wp.components;

const alignmentOptions = [
	{ label: __( 'Top Left' ), value: 'left top', icon: 'arrow-left-alt' },
	{ label: __( 'Top' ), value: 'center top', icon: 'arrow-up-alt' },
	{ label: __( 'Top Right' ), value: 'right top', icon: 'arrow-right-alt' },
	{ label: __( 'Left' ), value: 'left center', icon: 'arrow-left-alt' },
	{ label: __( 'Center' ), value: 'center center', icon: 'align-center' },
	{ label: __( 'Right' ), value: 'right center', icon: 'arrow-right-alt' },
	{ label: __( 'Bottom Left' ), value: 'left bottom', icon: 'arrow-left-alt' },
	{ label: __( 'Bottom' ), value: 'center bottom', icon: 'arrow-down-alt' },
	{ label: __( 'Bottom Right' ), value: 'right bottom', icon: 'arrow-right-alt' },
];

const BackgroundPositionControl = ( props ) => {
	const { label, value, onChange } = props;

	return (
		<BaseControl id="background-position" label={ label }>
			<ButtonGroup aria-label={ label } className="advanced-background-position-buttongroup">
				{ !! ( alignmentOptions ) && ( alignmentOptions.map( ( v, i ) => {
					const isCurrent = value === v.value;
					const isThird = ( i + 1 ) % 3 === 0;

					return (
						<Fragment key={ i }>
							<IconButton
								icon={ v.icon }
								label={ v.label }
								isLarge
								isPrimary={ isCurrent }
								aria-pressed={ isCurrent }
								onClick={ () => onChange( v.value ) }
							/>
							{ !! ( isThird ) && <br /> }
						</Fragment>
					);
				} ) ) }
			</ButtonGroup>
		</BaseControl>
	);
};

export default BackgroundPositionControl;
