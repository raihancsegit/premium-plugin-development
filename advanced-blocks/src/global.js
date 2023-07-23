import md5 from 'md5'

const { __ } = wp.i18n;

export const bokez = {

    buttonSizes: [
		{ value: 'small', label: __( 'Small' ) },
		{ value: 'default', label: __( 'Default' ) },
		{ value: 'medium', label: __( 'Medium' ) },
        { value: 'large', label: __( 'Large' ) },
    ],
    
    buttonTypes: [
		{ value: 'flat', label: __( 'Flat' ) },
		{ value: 'rounded', label: __( 'Rounded' ) },
        { value: 'calltoaction', label: __( 'Call To Action' ) },
	],

    borderTypes: [
		{ value: 'solid', label: __( 'Solid' ) },
		{ value: 'dashed', label: __( 'Dashed' ) },
		{ value: 'dotted', label: __( 'Dotted' ) },
        { value: 'double', label: __( 'Double' ) },
		{ value: 'ridge', label: __( 'Ridge' ) },
	],

    borderPositions: [
        { value: 'left', label: __( 'Left' ) },
        { value: 'right', label: __( 'Right' ) },
        { value: 'top', label: __( 'Top' ) },
        { value: 'bottom', label: __( 'Bottom' ) },
    ],

    notificationTypes: [
		{ value: 'info', label: __( 'Info' ) },
		{ value: 'error', label: __( 'Error' ) },
		{ value: 'success', label: __( 'Success' ) },
		{ value: 'warning', label: __( 'Warning' ) },
		{ value: 'primary', label: __( 'Primary' ) },
		{ value: 'secondary', label: __( 'Secondary' ) },
		{ value: 'danger', label: __( 'Danger' ) },
		{ value: 'light', label: __( 'Light' ) },
		{ value: 'dark', label: __( 'Dark' ) },
	],

    /**
     * Default Colors
     */
    colors: [
        { color: '#F9583B', name: 'GPB Color' },
        { color: '#e84393', name : 'Prunus Avium' },
        { color: '#d63031', name : 'Chi-gong' },
        { color: '#fd79a8', name: 'Pico-8' },
        { color: '#00cec9', name : 'Robin\'s Egg Blue' },
        { color: '#e17055', name : 'Orange Ville' },
        { color: '#fdcb6e', name : 'Bright Yarrow' },
        { color: '#55efc4', name : 'Light Greenish Blue' },
        { color: '#00b894', name : 'Mint Leaf' },
        { color: '#6c5ce7', name : 'Exodus Fruit' },
        { color: '#ffeaa7', name : 'Sour Lemon' },
        { color: '#fab1a0', name : 'First Date' },
        { color: '#74b9ff', name : 'Green Darnet Tail' },
        { color: '#a29bfe', name : 'Sky Moment' },
        { color: '#2d3436', name : 'Dracula Orchid' },
        { color: '#dfe6e9', name : 'City Lights' },
        { color: '#636e72', name : 'American River' },	
    ],

    /**
     * Capitalize first character	
     * @param {string} string 
     * @return string
     */
    ucfirst: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    /**
     * Generate unique id
     * @return string
     */
    uniqueID: () => {
        const date = new Date().getTime();
        return 'bokez-' + md5( 'bokez' + date ).substr( 0, 12 );
    },

    /**
     * PHP parse_url Like
     * @return object
     */
    parse_url: ( url ) => {

        var parser = document.createElement('a');
        parser.href = url;

        return {
            protocol: parser.protocol.replace(':', ''),
            hostname: parser.hostname,
            port: parser.port,
            path: parser.pathname,
            query: parser.search,
            hash: parser.hash,
        }
    }
};
