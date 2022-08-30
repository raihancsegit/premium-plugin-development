import { parse, stringify } from 'querystring';
import Settings from './settings';

const {
	createElement,
	Component,
} = wp.element;

const { __ } = wp.i18n;

const { Button } = wp.components;

export default class RenderBlockSettings extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			values: [],
			saving: false,
		};

		this.settings = Settings[ this.props.name ];

		this.defaults = parse( _stagBlocks.blockSettings );

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	componentDidMount() {
		this.setState( {
			values: this.defaults,
		} );
	}

	handleChange( event ) {
		const { id, value } = event.target;

		const newValue = this.state.values;
		newValue[ id ] = value;

		this.setState( { values: newValue } );
	}

	handleSubmit( event ) {
		event.preventDefault();

		this.setState( { saving: true } );

		const values = this.state.values;

		wp.apiFetch( {
			path: '/advanced_blocks/v1/block_settings',
			method: 'POST',
			body: stringify( values ),
		} ).then( () =>{
			this.setState( { saving: false } );
		} );
	}

	render() {
		return (
			<div
				className="block-settings"
				hidden={ ! this.props.initialOpen }
			>
				<h3>{ __( 'Settings' ) }</h3>
				<form
					onSubmit={ ( event ) => this.handleSubmit( event ) }
				>
					<table className="form-table">
						<tbody>
							{ Object.keys( this.settings ).map( ( section ) => {
								const setting = this.settings[ section ];
								return (
									<tr key={ section }>
										<th scope="row">
											{ createElement( 'label', {
												htmlFor: section,
											}, setting.label ) }
										</th>

										<td>
											{ createElement( 'input', {
												type: setting.type,
												className: 'regular-text',
												id: section,
												value: this.state.values[ section ] || this.defaults[ section ],
												onChange: this.handleChange,
											} ) }

											{ createElement( 'p', {
												className: 'description',
											}, setting.description ) }
										</td>
									</tr>
								);
							} ) }
						</tbody>
					</table>

					<Button
						type="submit"
						isPrimary
						isLarge
						isBusy={ this.state.saving }
						disabled={ this.state.saving }
						className="shared-block-edit-panel__button"
					>
						{ this.state.saving ? __( 'Saving...' ) : __( 'Save' ) }
					</Button>
				</form>
			</div>
		);
	}
}
