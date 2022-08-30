const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	PanelBody,
	ToggleControl,
} = wp.components;

const {
	InspectorControls,
	PanelColorSettings,
} = wp.editor;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Settings' ) }>
					<ToggleControl
						label={ __( 'Show Expanded' ) }
						checked={ !! attributes.initialOpen }
						help={ ( checked ) => checked ? __( 'Showing accordion expanded by default.' ) : __( 'Show accordion collapsed by default.' ) }
						onChange={ () => setAttributes( { initialOpen: ! attributes.initialOpen } ) }
					/>
					<ToggleControl
						label={ __( 'Box Shadow' ) }
						checked={ !! attributes.boxShadow }
						help={ __( 'Applies a subtle box shadow effect.' ) }
						onChange={ () => setAttributes( { boxShadow: ! attributes.boxShadow } ) }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.titleColor,
							onChange: ( titleColor ) => ( setAttributes( { titleColor } ) ),
							label: __( 'Title Color' ),
						},
						{
							value: attributes.titleBackgroundColor,
							onChange: ( titleBackgroundColor ) => ( setAttributes( { titleBackgroundColor } ) ),
							label: __( 'Title Background Color' ),
						},
						{
							value: attributes.textColor,
							onChange: ( textColor ) => ( setAttributes( { textColor } ) ),
							label: __( 'Text Color' ),
						},
						{
							value: attributes.backgroundColor,
							onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
							label: __( 'Background Color' ),
						},
					] }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
