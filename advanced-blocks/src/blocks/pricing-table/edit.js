import classnames from 'classnames';

const { __ } = wp.i18n;

const {
	Fragment,
	Component,
} = wp.element;

const {
	IconButton,
	Dashicon,
	withFocusOutside,
} = wp.components;

const {
	RichText,
	URLInput,
} = wp.editor;

const EnhancedComponent = withFocusOutside(
	class Edit extends Component {
		constructor() {
			super( ...arguments );

			this.state = {
				focusedIndex: null,
				selectedTable: null,
			};
		}

		handleFocusOutside() {
			this.setState( { focusedIndex: false } );
		}

		stopKeyPropagation = ( event ) => event.stopPropagation();

		render() {
			const { attributes, setAttributes, className, isSelected } = this.props;

			const hasFeatured = attributes.tables.some( ( table ) => table.featured );

			return (
				<Fragment>
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
										'is-selected': ( isSelected && this.state.selectedTable === i ),
										'is-featured': table.featured,
									} ) }
									onClick={ () => this.setState( { selectedTable: i } ) }
									tabIndex="-1"
									role="textbox"
									onKeyDown={ () => false }
									style={ {
										backgroundColor: attributes.backgroundColor,
										color: attributes.textColor,
									} }
								>
									{ ( attributes.featured_text ) && ( table.featured ) &&
										<span className={ `${ className }__featured_text` }>{ attributes.featured_text }</span>
									}
									{ ( isSelected && this.state.selectedTable === i ) &&
										<div className="block-library-gallery-item__inline-menu">
											<IconButton
												icon="no-alt"
												onClick={ () => {
													const tables = [ ...attributes.tables ];

													setAttributes( { tables: tables.filter( ( el, index ) => ! ( index === i ) ) } );
												} }
												className="blocks-gallery-item__remove"
												label={ __( 'Remove Table' ) }
											/>

											<IconButton
												label={ __( 'Mark as featured' ) }
												className="blocks-gallery-item__remove item-left"
												onClick={ () => {
													const tables = [ ...attributes.tables ];

													// Cache orginal featured state.
													const originalState = tables[ i ].featured;

													tables.map( ( t ) => t.featured = false );

													// Restore orginal state if already defined, else true.
													tables[ i ].featured = ( originalState ? ! originalState : true );

													setAttributes( { tables } );
												} }
												icon={ table.featured ? <i className="fas fa-bookmark" /> : <i className="far fa-bookmark" /> }
											/>
										</div>
									}

									<div className={ `${ className }__header` }>
										<RichText
											tagName="h3"
											placeholder={ __( 'Title...' ) }
											className={ `${ className }__title` }
											value={ table.title }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].title = value;
												setAttributes( { tables } );
											} }
											style={ {
												color: ! table.featured ? attributes.accent : attributes.featuredAccent,
											} }
										/>

									</div>

									<div className={ `${ className }__price` }>
										<RichText
											tagName="div"
											placeholder="$10"
											className={ `${ className }__price__amount` }
											value={ table.price }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price = value;
												setAttributes( { tables } );
											} }
											inlineToolbar
											keepPlaceholderOnFocus
											style={ {
												color: ! table.featured ? attributes.accent : attributes.featuredAccent,
											} }
										/>
										<RichText
											tagName="div"
											placeholder="per month"
											className={ `${ className }__price__term` }
											value={ table.price_term }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price_term = value;
												setAttributes( { tables } );
											} }
											keepPlaceholderOnFocus
											inlineToolbar
										/>
									</div>

									<RichText
										className={ `${ className }__features` }
										tagName="ul"
										multiline="li"
										placeholder={ __( 'Enter plan features...' ) }
										value={ table.features }
										onChange={ ( value ) => {
											const tables = [ ...attributes.tables ];
											tables[ i ].features = value;
											setAttributes( { tables } );
										} }
										inlineToolbar
									/>

									<div className={ `${ className }__footer` }>
										<span
											role="button"
											onClick={ () => this.setState( { focusedIndex: i } ) }
											onKeyPress={ this.stopKeyPropagation }
											tabIndex={ i }
											className="wp-block-button is-style-squared"
										>
											<RichText
												tagName="span"
												placeholder={ __( 'Add text…' ) }
												value={ table.buttonText }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].buttonText = value;
													setAttributes( { tables } );
												} }
												formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
												className={ classnames( 'wp-block-button__link' ) }
												keepPlaceholderOnFocus
												style={ {
													backgroundColor: ! table.featured ? attributes.accent : attributes.featuredAccent,
												} }
												inlineToolbar
											/>
										</span>

										{ ( this.state.focusedIndex === i ) && (
											<form
												className="block-library-button__inline-link"
												onSubmit={ ( event ) => event.preventDefault() }>
												<Dashicon icon="admin-links" />
												<URLInput
													value={ table.buttonURL }
													onChange={ ( value ) => {
														const tables = [ ...attributes.tables ];
														tables[ i ].buttonURL = value;
														setAttributes( { tables } );
													} }
												/>
												<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
											</form>
										) }
									</div>
								</div>
							) ) ) : null
						}
					</div>

					{ isSelected &&
						<div className="blocks-gallery-item">
							<IconButton
								icon="insert"
								isDefault
								isLarge
								className="block-library-gallery-add-item-button"
								onClick={ () => {
									const tables = [ ...attributes.tables ];

									tables.push( {
										title: '',
										description: '',
										price: '',
										price_term: '',
										features: [],
										buttonText: 'Purchase',
									} );

									setAttributes( { tables } );
								} }
							>
								{ __( 'Add new table' ) }
							</IconButton>
						</div>
					}
				</Fragment>
			);
		}
	}
);

export default EnhancedComponent;
