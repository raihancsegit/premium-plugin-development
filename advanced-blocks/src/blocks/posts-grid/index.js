import edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'advanced-blocks/posts-grid', {
	title: __( 'Posts Grid' ),
	category: 'advanced-blocks',
	description: __( 'Display a grid or list of customizable posts.' ),
	icon,
	keywords: [
		__( 'post' ),
		__( 'grid' ),
	],
	attributes: {
		backgroundColor: {
			type: 'string',
			default: '#ffffff',
		},
		textColor: {
			type: 'string',
			default: '#000000',
		},
		titleColor: {
			type: 'string',
			default: '#000000',
		},
		titleBackgroundColor: {
			type: 'string',
			default: '#ffffff',
		},
	},
	customCategory: 'advanced-blocks',

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'left' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align };
		}
	},

	edit,

	save() {
		return null;
	},
} );
