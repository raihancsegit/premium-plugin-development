/**
 * FontAwesome Inspector control.
 */
import PropTypes from 'prop-types';
import './editor.scss';
import IconSelector from './icon-selector';

const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components.
const { InspectorControls } = wp.editor;

const {
	RangeControl,
	TextControl,
	PanelBody,
} = wp.components;

// Create an Inspector Controls wrapper Component.
export default class FontAwesome extends Component {
	state = {
		currentIcon: '',
	}

	fontAwesomeIcons() {
		const FA = GT_Icons.fontawesome;

		return FA.filter( ( icon ) => {
			const name = icon.i;

			return name.includes( this.state.currentIcon );
		} );
	}

	render() {
		const { iconSize } = this.props.attributes;

		return (
			[
				(
					<i key="icon" className={ this.props.icon } style={ { fontSize: this.props.iconSize } }></i>
				),
				<InspectorControls key="font-awesome">
					<PanelBody title={ this.props.title } initialOpen={ false }>
						<RangeControl
							className="font-awesome__custom-size-slider"
							label={ __( 'Icon Size' ) }
							value={ iconSize }
							onChange={ ( value ) => this.props.setAttributes( { iconSize: value } ) }
							min={ 10 }
							max={ 200 }
							beforeIcon="editor-textcolor"
							afterIcon="editor-textcolor"
						/>

						<TextControl
							label={ __( 'Select Icon' ) }
							type="search"
							className="font-awesome-search"
							placeholder={ __( 'Type icon name...' ) }
							onChange={ ( value ) => this.setState( { currentIcon: value } ) }
						/>

						<IconSelector { ...this.props } icons={ this.fontAwesomeIcons() } />
					</PanelBody>
				</InspectorControls>,
			]
		);
	}
}

FontAwesome.propTypes = {
	icon: PropTypes.string.isRequired,
	iconSize: PropTypes.number.isRequired,
	onSelect: PropTypes.func.isRequired,
};
