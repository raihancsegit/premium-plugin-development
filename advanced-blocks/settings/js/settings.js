const { __, sprintf } = wp.i18n;

const description = sprintf(
	/* translators: %s: Link to LinkPreview website. */
	'You need to provide an API key in order to use this block, to get one please register on %s and insert the API key here.',
	'<a href="https://www.linkpreview.net/" target="_blank" rel="noopener noreferrer">LinkPreview</a>'
);

const Settings = {
	// Important: Array key should match registered block's namespace.
	'advanced/website-card': {
		'api-key': {
			label: __( 'LinkPreview API key' ),
			type: 'text',
			description: <span dangerouslySetInnerHTML={ { __html: description } }></span>,
		},
	},
};

export default Settings;
