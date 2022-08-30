import Logo from './logo-codestag';
const { __ } = wp.i18n;

const Footer = () => {
	return (
		<footer className="advanced-blocks__footer">
			<div className="codestag-logo">
				<p>{ __( 'Made with ❤️ by' ) }</p>
				<a href="https://themeroots.com" title="Codestag">
					<Logo />
				</a>
			</div>
			<ul>
				<li><a href="https://advancedblocks.com/">Visit Codestag.com</a></li>
				<li><a href="https://advancedblocks.com/themes/">Themes</a></li>
				<li><a href="https://themeroots.com/">Documentation</a></li> { /* TODO: Update documentation link. */ }
			</ul>
			<ul>
				<li><a href="https://facebook.com/Codestag/">Facebook</a></li>
				<li><a href="https://twitter.com/Codestag/">Twitter</a></li>
				<li><a href="https://instagram.com/Codestag/">Instagram</a></li>
			</ul>
		</footer>
	);
};

export default Footer;
