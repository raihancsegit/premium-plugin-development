const { __ } = wp.i18n;

const ErrorCard = () => (
	<div className="error-card">
		<i className="fas fa-exclamation-triangle"></i>
		<div>
			<p>{ __( 'No blocks found. Please edit a post/page with Gutenberg to initialize settings.' ) }</p>
			<details>
				<summary>{ __( 'More info' ) }</summary>
				<p>{ __( 'To initiate settings here it is essential to create or edit a post with Gutenberg first. This additional step is required the list of blocks is dynamically generated through post edit screen currently.' ) }</p>
				<p>{ __( 'In future, there might be a way to access the blocks list directly, where this step would not be necessary.' ) }</p>
			</details>
		</div>
	</div>
);

export default ErrorCard;
