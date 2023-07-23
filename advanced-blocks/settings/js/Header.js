import BlocksLogo from './logo-advanced-blocks';
import Switcher from './Switcher';

const Header = () => (
	<header className="advanced-blocks__header">
		<div className="advanced-blocks-logo">
			<BlocksLogo />
			<code>v{ _stagBlocks.version }</code>
		</div>
		<Switcher />
	</header>
);

export default Header;
