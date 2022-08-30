<?php
/**
 * advanced Blocks settings page.
 *
 * @since 1.0.0
 * @package advanced
 */

/**
 * advanced Blocks settings class.
 */
class advanced_blocks_Settings {
	/**
	 * Plugin contrusctor function.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Add advanced Blocks menu under Settings.
	 *
	 * @return void
	 */
	public function add_menu() {
		add_submenu_page( 'options-general.php', __( 'advanced Blocks', 'advanced' ), __( 'advanced Blocks', 'advanced' ), 'manage_options', 'advanced-blocks', array( $this, 'settings' ) );
		
		add_submenu_page( null, __( 'advanced Blocks', 'advanced' ), __( 'advanced Blocks', 'advanced' ), 'manage_options', 'advanced-blocks-welcome', array( $this, 'welcome_screen' ) );
		
		//add_menu_page('advanced Blocks','advanced Blocks','manage_options','advanced-blocks',array( $this, 'settings' ));
	}

	/**
	 * Add plugin admin scripts and styles.
	 *
	 * @param string $hook Current page ID.
	 * @return void
	 */
	public function enqueue_scripts( $hook ) {
		if ( 'settings_page_advanced-blocks' !== $hook ) {
			return;
		}

		wp_register_style(
			'font-awesome-5',
			plugins_url( 'src/assets/css/all.min.css', dirname( __FILE__ ) ),
			array(),
			'5.2.0'
		);

		// Styles.
		wp_enqueue_style(
			'advanced-blocks-settings',
			plugins_url( 'dist/settings/settings.style.css', dirname( __FILE__ ) ),
			array( 'wp-components', 'font-awesome-5' ),
			filemtime( plugin_dir_path( __DIR__ ) . 'dist/settings/settings.style.css' )
		);

		wp_enqueue_script(
			'advanced-blocks-settings',
			plugins_url( 'dist/settings/settings.build.js', dirname( __FILE__ ) ),
			array(
				'wp-blocks',
				'wp-components',
				'react',
				'react-dom',
				'lodash',
			),
			filemtime( plugin_dir_path( __DIR__ ) . 'dist/settings/settings.build.js' ),
			true
		);
		

		wp_localize_script(
			'advanced-blocks-settings', '_stagBlocks', array(
				'root'          => esc_url_raw( rest_url() ),
				'nonce'         => wp_create_nonce( 'wp_rest' ),
				'version'       => advanced_plugin_version(),
				'blockSettings' => get_option( 'advanced-block-settings' ),
			)
		);
	}

	/**
	 * Add settings screen.
	 *
	 * @return void
	 */
	public function settings() {
		echo '<div id="advanced-blocks-settings" class="advanced-blocks-settings"></div>';
	}

	/**
	 * Add Welcome screen.
	 *
	 * @return void
	 */
	public function welcome_screen() {
		wp_enqueue_style(
			'advanced-blocks-welcome',
			plugins_url( 'settings/css/settings.css', dirname( __FILE__ ) ),
			array(),
			filemtime( plugin_dir_path( __DIR__ ) . 'settings/css/settings.css' )
		);

		$gb = admin_url( 'post-new.php?gutenberg-demo&advanced_notice=true' );

		echo '<div id="advanced-blocks-welcome" class="advanced-blocks-welcome">
		<h2>Welcome to advanced Blocks</h2>
		<div class="container">
			<div class="content-wrapper">
				<div class="content">
					<p class="intro">Thank you for installing advanced Blocks. Now just one more important step to initialize advanced Blocks settings page.</p>
					<p>Don’t worry it’s really easy, you just need to visit Gutenberg post edit screen and we’ll do the rest, sounds easy right?</p>
				</div>

				<a href="' . esc_url( $gb ) . '" class="advanced-button">Let’s begin <span>&rarr;</span></a>
			</div>

		</div>
		</div>';
	}
}

new advanced_blocks_Settings();
