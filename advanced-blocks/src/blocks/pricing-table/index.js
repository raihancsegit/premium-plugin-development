import classnames from 'classnames';
import Controls from './controls';
import Edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

const {
	RichText,
} = wp.editor;

registerBlockType( 'advanced-blocks/pricing-table', {
	title: __( 'Pricing Table' ),
	category: 'advanced-blocks',
	description: __( 'Add a pricing table block to showcase different plans and offers.' ),
	icon,
	keywords: [
		__( 'pricing table' ),
		__( 'comparison' ),
	],
	customCategory: 'advanced-blocks',
	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {
		columns: {
			type: 'number',
			default: 2,
		},
		featured_text: {
			type: 'string',
			default: 'Recommended',
		},
		accent: {
			type: 'string',
			default: '#23282d',
		},
		featuredAccent: {
			type: 'string',
			default: '#333333',
		},
		textColor: {
			type: 'string',
			default: '#23282d',
		},
		backgroundColor: {
			type: 'string',
		},
		tables: {
			type: 'array',
			default: [],
		},
		fullWidthButtons: {
			type: 'boolean',
			default: false,
		},
		boxShadow: {
			type: 'boolean',
			default: true,
		},
	},

	edit( props ) {
		return (
			<Fragment>
				<Controls { ...props } />

				<Edit { ...props } />
			</Fragment>
		);
	},

	save( props ) {
		const { attributes } = props;
		const className = 'wp-block-advanced-pricing-table';
		const hasFeatured = attributes.tables.some( ( table ) => table.featured );

		return (
			<div className={ classnames( className, `columns-${ attributes.columns }`, {
				'has-shadow': attributes.boxShadow,
				'has-featured': hasFeatured,
				'has-full-width-button': attributes.fullWidthButtons,
			} ) }>
				{
					( attributes.tables.length ) ? ( attributes.tables.map( ( table, i ) => (
						<div
							key={ i }
							className={ classnames( `${ className }__table`, {
								'is-featured': table.featured,
							} ) }
							style={ {
								backgroundColor: attributes.backgroundColor,
								color: attributes.textColor,
							} }
						>
							{ ( attributes.featured_text ) && ( table.featured ) &&
								<span className={ `${ className }__featured_text` }>{ attributes.featured_text }</span>
							}
							<div className={ `${ className }__header` }>
								<RichText.Content
									tagName="h3"
									className={ `${ className }__title` }
									value={ table.title }
									style={ {
										color: ! table.featured ? attributes.accent : attributes.featuredAccent,
									} }
								/>
							</div>

							<div className={ `${ className }__price` }>
								<RichText.Content
									tagName="div"
									className={ `${ className }__price__amount` }
									value={ table.price }
									style={ {
										color: ! table.featured ? attributes.accent : attributes.featuredAccent,
									} }
								/>
								<RichText.Content tagName="div" className={ `${ className }__price__term` } value={ table.price_term } />
							</div>

							<RichText.Content tagName="ul" className={ `${ className }__features` } value={ table.features } />

							<div className={ `${ className }__footer` }>
								<div className="wp-block-button is-style-squared">
									<RichText.Content
										tagName="a"
										className="wp-block-button__link"
										href={ table.buttonURL }
										title={ table.buttonText }
										value={ table.buttonText }
										style={ {
											backgroundColor: ! table.featured ? attributes.accent : attributes.featuredAccent,
										} }
									/>
								</div>
							</div>
						</div>
					) ) ) : null
				}
			</div>
		);
	},
} );
