<?php
/**
 * Server-side rendering of the `advanced/posts-grid` block.
 *
 * @package advanced
 */

if ( ! function_exists( 'register_block_type' ) ) return;

/**
 * Registers the `advanced/posts-grid` block on server.
 */
function register_block_advanced_posts_grid() {
	register_block_type( 'advanced-blocks/posts-grid', array(
		'attributes' => array(
			'categories'      => array(
				'type' => 'string',
			),
			'className'       => array(
				'type' => 'string',
			),
			'postsToShow'     => array(
				'type'    => 'number',
				'default' => 5,
			),
			'displayPostDate' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostExcerpt' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayReadMore' => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'displayFeaturedImage' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostAuthor' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'readMoreText' => array(
				'type'    => 'string',
				'default' => false,
			),
			'postLayout'      => array(
				'type'    => 'string',
				'default' => 'list',
			),
			'columns'         => array(
				'type'    => 'number',
				'default' => 2,
			),
			'align'           => array(
				'type'    => 'string',
				'default' => 'center',
			),
			'order'           => array(
				'type'    => 'string',
				'default' => 'desc',
			),
			'orderBy'         => array(
				'type'    => 'string',
				'default' => 'date',
			),
		),
		'render_callback' => 'render_block_advanced_posts_grid',
	) );
}

add_action( 'init', 'register_block_advanced_posts_grid' );

/**
 * Renders the `advanced/posts-grid` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_advanced_posts_grid( $attributes ) {
	$recent_posts = wp_get_recent_posts( array(
		'numberposts' => $attributes['postsToShow'],
		'post_status' => 'publish',
		'order'       => $attributes['order'],
		'orderby'     => $attributes['orderBy'],
		'category'    => isset( $attributes['categories'] ) ? $attributes['categories'] : false,
	), 'OBJECT' );



	$list_items_markup = '';

	foreach ( $recent_posts as $post ) {
		$post_id   = $post->ID;
		$title     = get_the_title( $post_id );
		$author_id = $post->post_author;

		$list_items_markup .= '<li>';

		// Get the post thumbnail .
		$post_thumb_id = get_post_thumbnail_id( $post_id );
		$show_featured = $attributes['displayFeaturedImage'];

		if ( ! $title ) {
			$title = __( '(Untitled)', 'advanced' );
		}

		// Display the post thumbnail.
		if ( $post_thumb_id && $show_featured ) {
			$list_items_markup .= sprintf(
				'<figure class="wp-block-advanced-posts-grid__thumbnail"><a href="%1$s" rel="bookmark">%2$s</a></figure>',
				esc_url( get_permalink( $post_id ) ),
				wp_get_attachment_image( $post_thumb_id, 'large' )
			);
		}

		$list_items_markup .= '<div class="wp-block-advanced-posts-grid__content">';

		// Display post title.
		$list_items_markup .= sprintf(
			'<h3 class="wp-block-advanced-posts-grid__title"><a href="%1$s">%2$s</a></h3>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( $title )
		);

		$date_markup = '';

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$date_markup = sprintf(
				'<time datetime="%1$s">%2$s</time>',
				esc_attr( get_the_date( 'c', $post_id ) ),
				esc_html( get_the_date( '', $post_id ) )
			);
		}

		$list_items_markup .= sprintf(
			'<div class="wp-block-advanced-posts-grid__meta">
			' . $date_markup . '
			<a href="%1$s" class="wp-block-advanced-posts-grid__author">
			%2$s
			<span>%3$s</span>
			</a>
			</div>',
			get_author_posts_url( $author_id ),
			get_avatar( $author_id, '96' ),
			get_the_author_meta( 'display_name', $author_id )
		);

		if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {
			$excerpt = get_post_field( 'post_excerpt', $post_id );

			if ( empty( $excerpt ) ) {
				$excerpt = wp_trim_words( $post->post_content, 55 );
			}

			if ( ! $excerpt ) {
				$excerpt = null;
			}

			if ( ! empty( $excerpt ) ) {
				$list_items_markup .= sprintf(
					'<div class="wp-block-advanced-posts-grid__excerpt">%1$s</div>',
					$excerpt
				);
			}
		}

		if ( isset( $attributes['displayReadMore'] ) && $attributes['displayReadMore'] ) {
			$list_items_markup .= sprintf(
				'<p class="wp-block-advanced-posts-grid__read-more"><a href="%1$s" rel="bookmark">%2$s</a></p>',
				get_permalink( $post_id ),
				$attributes['readMoreText']
			);
		}

		// Close .wp-block-advanced-posts-grid__content container.
		$list_items_markup .= '</div>';
	}

	$class = "wp-block-advanced-posts-grid align{$attributes['align']} is-{$attributes['postLayout']} columns-{$attributes['columns']}";

	if ( ! $attributes['displayPostAuthor'] ) {
		$class .= ' hide-author';
	}

	$block_content = sprintf(
		'<ul class="%1$s">%2$s</ul>',
		esc_attr( $class ),
		$list_items_markup
	);

	return $block_content;
}

/**
 * Register REST fields related to 'advanced/posts-grid' block.
 *
 * @return void
 */
function block_advanced_posts_grid_rest_fields() {
	register_rest_field(
		'post',
		'advanced/featured_image_src',
		array(
			'get_callback' => function( $object ) {
				$image_array = wp_get_attachment_image_src(
					$object['featured_media'],
					'large',
					false
				);
				return $image_array[0];
			},
		)
	);

	register_rest_field(
		'post',
		'advanced/author_data',
		array(
			'get_callback' => function( $object ) {
				$author_data['display_name'] = get_the_author_meta( 'display_name', $object['author'] );
				$author_data['avatar']       = get_avatar_url( $object['author'] );
				$author_data['author_link']  = get_author_posts_url( $object['author'] );

				return $author_data;
			},
		)
	);
}

add_action( 'rest_api_init', 'block_advanced_posts_grid_rest_fields' );
