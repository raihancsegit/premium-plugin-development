<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package progress
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function advanced_block_progress_block_assets() { // phpcs:ignore

	wp_enqueue_style(
		'advanced-block-progress-style-css-custom', // Handle.
		plugins_url( 'dist/assets/css/icofont.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);
	
	wp_enqueue_script(
        'tf-blocks-countdown-frontend',
        plugins_url("/src/blocks/countdown/frontend.js", dirname(__FILE__)),
        array(),
        true
    );
	
	
	// Styles.
	wp_enqueue_style(
		'advanced-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: filemtime — Gets file modification time.
	);

	wp_enqueue_style( 'font-awesome-5', plugin_dir_url( __FILE__ ) . 'assets/css/all.min.css', array(), '5.2.0' );
	
	
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'advanced_block_progress_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function advanced_block_progress_editor_assets() { // phpcs:ignore
	
	wp_enqueue_script(
		'advanced-block-fo-progress-block-js', // Handle.
		plugins_url( '/dist/frontend.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);
	
	
	
	
	// Scripts.
	wp_enqueue_script(
		'advanced-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	wp_localize_script(
		'advanced-js', '_stagBlocks', array(
			'root'          => esc_url_raw( rest_url() ),
			'nonce'         => wp_create_nonce( 'wp_rest' ),
			'blockSettings' => get_option( 'advanced-block-settings' ),
			'settingsURL'   => admin_url( 'options-general.php?page=advanced-blocks#settings' ),
			'countdownSrc'  => plugins_url( 'src/assets/js/jquery.countdown.min.js', dirname( __FILE__ ) ),
		)
	);

	// Styles.
	wp_enqueue_style(
		'advanced-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
	);

	wp_enqueue_script(
		'advanced-fontawesome-json',
		plugins_url( 'dist/fa-icons-raw.js', dirname( __FILE__ ) ),
		array(),
		'5.2.0',
		true
	);
	
	

}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'advanced_block_progress_editor_assets' );



if ( !function_exists( 'advanced_block_category' ) ) {
    /**
     * Add our custom block category for Stackable blocks.
     *
     * @since 0.6
     */
    function advanced_block_category( $categories, $post )
    {
        return array_merge( $categories, array( array(
            'slug'  => 'advanced-blocks',
            'title' => __( 'advanced Blocks - Gutenberg Blocks', 'advanced-blocks' ),
        ) ) );
    }
    
    add_filter(
        'block_categories',
        'advanced_block_category',
        10,
        2
    );
}

function advanced_frontend_assets() {
	wp_register_script(
		'jquery-countdown',
		plugins_url( 'src/assets/js/jquery.countdown.min.js', dirname( __FILE__ ) ),
		array( 'jquery' ),
		'2.2.0',
		true
	);

	if ( is_singular() ) {
		$post_id = get_the_ID();
		$content = get_post_field( 'post_content', $post_id, 'display' );

		preg_match( '~<code.*?lang=["\']+(.*?)["\']+~', $content, $match );

		if ( ! empty( $match ) ) {
			wp_enqueue_style( 'prism', plugin_dir_url( __FILE__ ) . 'assets/vendor/prismjs/prism-duotone-light.css', array(), '20180724' );

			wp_enqueue_script(
				'prism',
				plugin_dir_url( __FILE__ ) . 'assets/vendor/prismjs/prism.js',
				array(),
				'1.15.0',
				true
			);
		}
	}
}

add_action( 'wp_enqueue_scripts', 'advanced_frontend_assets' );

// Register server-side code for individual blocks.
foreach ( glob( dirname( dirname( __FILE__ ) ) . '/src/blocks/*/index.php' ) as $block_logic ) {
	require_once $block_logic;
}

function advanced_load_textdomain() {
	load_plugin_textdomain( 'advanced-block', false, plugin_dir_path( __DIR__ ) . '/languages' );
}
add_action( 'plugins_loaded', 'advanced_load_textdomain' );