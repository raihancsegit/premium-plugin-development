const IconSelector = ( props ) => {
	const polishIcons = () => {
		const html = [];
		const icons = props.icons;

		icons.map( ( icon, index ) => {
			const iconClass = `${ icon.s } fa-${ icon.i }`;
			const isActive = ( props.icon === iconClass ) ? 'is-active' : '';
			const itemKey = `${ icon.s }-${ index }`;
			html.push(
				<button key={ itemKey } onClick={ () => props.onSelect( iconClass ) } className={ isActive }>
					<i className={ iconClass }></i>
				</button>
			);
		} );

		return html;
	};

	return (
		<div className="gutentools-component-fontawesome--icons">{ polishIcons() }</div>
	);
};

export default IconSelector;
