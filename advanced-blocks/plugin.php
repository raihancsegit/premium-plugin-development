<?php
/**
 * Plugin Name: Advanced Blocks
 * Plugin URI:https://wordpress.org/plugins/advanced-blocks
 * Description: Gutenberg Block Plugin.
 * Author: Advanced Blocks
 * Author URI: https://advanced-blocks.com/
 * Version: 1.0.0
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: advanced-blocks
 * Domain Path: /languages
 * Requires at least: 5.0
 * Requires PHP: 5.6
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
advanced_compatibility_check();

/**
 * Run compatibility check on StagBlocks during activation.
 *
 * @return void
 */
function advanced_compatibility_check() {
	include_once ABSPATH . 'wp-admin/includes/plugin.php';

	if ( ! function_exists( 'register_block_type' ) ) {
		deactivate_plugins( plugin_basename( __FILE__ ) );
		add_action( 'admin_notices', 'advanced_activation_notice' );
		return;
	}
}

add_action( 'init', 'advanced_compatibility_check' );

/**
 * Display a error notice if Gutenberg is not active.
 *
 * @return void
 */
function advanced_activation_notice() {
	echo '<div class="error"><p>';
	echo esc_html__( 'advanced Blocks requires WordPress 5.0+ or Gutenberg plugin to be installed and activated.', 'advanced' );
	echo '</p></div>';
}

register_activation_hook( __FILE__, 'advanced_compatibility_check' );

/**
 * Get plugin version info.
 *
 * @return String Returns current plugin version.
 */
function advanced_plugin_version() {
	$plugin_data = get_plugin_data( __FILE__ );

	return $plugin_data['Version'];
}

/**
 * Add a check for our plugin before redirecting
 */
function advanced_activation() {
	add_option( 'advanced_do_activation_redirect', true );
}
register_activation_hook( __FILE__, 'advanced_activation' );

/**
 * Redirect to the Atomic Blocks Getting Started page on single plugin activation
 */
function advanced_redirect() {
	$blocks_list = get_option( 'advanced-blocks-list' );

	if ( get_option( 'advanced_do_activation_redirect', false ) ) {
		delete_option( 'advanced_do_activation_redirect' );
		if ( ! isset( $_GET['activate-multi'] ) ) {
			if ( $blocks_list ) {
				wp_safe_redirect( 'options-general.php?page=advanced-blocks' );
			} else {
				wp_safe_redirect( 'admin.php?page=advanced-blocks-welcome' );
			}
			exit;
		}
	}
}
add_action( 'admin_init', 'advanced_redirect' );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
//require_once plugin_dir_path( __FILE__ ) . '/settings/class-advanced-blocks-api.php';
//require_once plugin_dir_path( __FILE__ ) . '/settings/class-advanced-blocks-settings.php';
//require_once plugin_dir_path( __FILE__ ) . '/languages/js-strings.php';
