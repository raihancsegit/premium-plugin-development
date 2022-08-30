<?php
/**
 * advanced Blocks API endpoints.
 *
 * @package advanced
 */

/**
 * advanced Blocks API class.
 */
class advanced_blocks_API {
	const OPTION         = 'advanced-blocks-list';
	const SETTINGS       = 'advanced-blocks-settings';
	const BLOCK_SETTINGS = 'advanced-block-settings';

	/**
	 * Plugin constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_endpoint' ) );
	}

	/**
	 * Register all plugin endpoints.
	 *
	 * @return void
	 */
	public function register_endpoint() {
		register_rest_route(
			'advanced_blocks/v1', '/blocks', array(
				array(
					'methods'  => WP_REST_SERVER::READABLE,
					'callback' => array( $this, 'get_blocks' ),
				),
				array(
					'methods'             => WP_REST_SERVER::CREATABLE,
					'permission_callback' => function() {
						return current_user_can( 'edit_posts' );
					},
					'callback'            => array( $this, 'set_blocks' ),
				),
			)
		);

		register_rest_route(
			'advanced_blocks/v1', '/settings', array(
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'permission_callback' => function() {
						return current_user_can( 'manage_options' );
					},
					'callback'            => array( $this, 'process_settings' ),
				),
				array(
					'methods'             => WP_REST_Server::READABLE,
					'permission_callback' => function() {
						return current_user_can( 'manage_options' );
					},
					'callback'            => array( $this, 'get_settings' ),
				),
			)
		);

		register_rest_route(
			'advanced_blocks/v1', '/block_settings', array(
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'permission_callback' => function() {
						return current_user_can( 'manage_options' );
					},
					'callback'            => array( $this, 'get_block_settings' ),
				),
			)
		);
	}

	/**
	 * Returns a list of all available blocks in JSON.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function get_blocks( WP_REST_Request $request ) {
		$options = get_option( self::OPTION );

		if ( empty( $options ) ) {
			wp_send_json_error();
		}

		$data = array(
			'blocks' => $options,
		);

		return new WP_REST_Response( $data, 200 );
	}

	/**
	 * Set the list of blocks when on post edit screen for later use.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return void|404
	 */
	public function set_blocks( WP_REST_Request $request ) {
		$content_type = $request->get_content_type();

		if ( 'application/json' !== $content_type['value'] ) {
			return new WP_Error( 'invalid_request', __( 'Incorrect content type. Provided data must have "application/json" type.', 'advanced' ), array( 'status' => 400 ) );
		}

		$blocks = $request->get_body();

		update_option( self::OPTION, json_decode( $blocks ) );

		wp_send_json_success();
	}

	/**
	 * Process plugin settings.
	 *
	 * @param object $request Request object.
	 * @return void|400
	 */
	public function process_settings( $request ) {
		$content_type = $request->get_content_type();

		if ( 'application/json' !== $content_type['value'] ) {
			return new WP_Error( 'invalid_request', __( 'Incorrect content type. Provided data must have "application/json" type.', 'advanced' ), array( 'status' => 400 ) );
		}

		update_option( self::SETTINGS, json_decode( $request->get_body() ) );
		$settings = get_option( self::SETTINGS );

		wp_send_json_success(array(
			'activeBlocks' => $settings,
		));
	}

	/**
	 * Callback for geting plugin settings.
	 *
	 * @param object $request Request object.
	 * @return WP_REST_Response
	 */
	public function get_settings( $request ) {
		$settings = get_option( self::SETTINGS );

		if ( empty( $settings ) ) {
			$settings = new stdClass();
		}

		return rest_ensure_response( $settings );
	}

	/**
	 * Callback for getting block settings.
	 *
	 * @param object $request Request object.
	 * @return void
	 */
	public function get_block_settings( $request ) {
		$settings = $request->get_body();

		update_option( self::BLOCK_SETTINGS, $settings );

		wp_send_json_success([
			'sample' => $settings,
		]);
	}
}

new advanced_blocks_API();
