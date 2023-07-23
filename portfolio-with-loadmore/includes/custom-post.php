<?php
// Register Custom Post Type
function portfolio_custom_post() {

	$labels = array(
		'name'                  => _x( 'Portfolio', 'Post Type General Name', 'portfolio' ),
		'singular_name'         => _x( 'Portfolio', 'Post Type Singular Name', 'portfolio' ),
		'menu_name'             => __( 'Portfolio', 'portfolio' ),
		'name_admin_bar'        => __( 'Portfolio', 'portfolio' ),
		'archives'              => __( 'Item Archives', 'portfolio' ),
		'attributes'            => __( 'Item Attributes', 'portfolio' ),
		'parent_item_colon'     => __( 'Parent Item:', 'portfolio' ),
		'all_items'             => __( 'All Portfolio Items', 'portfolio' ),
		'add_new_item'          => __( 'Add New Portfolio', 'portfolio' ),
		'add_new'               => __( 'Add New Portfolio', 'portfolio' ),
		'new_item'              => __( 'New Item', 'portfolio' ),
		'edit_item'             => __( 'Edit Portfolio', 'portfolio' ),
		'update_item'           => __( 'Update Item', 'portfolio' ),
		'view_item'             => __( 'View Item', 'portfolio' ),
		'view_items'            => __( 'View Items', 'portfolio' ),
		'search_items'          => __( 'Search Item', 'portfolio' ),
		'not_found'             => __( 'Not found', 'portfolio' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'portfolio' ),
		'featured_image'        => __( 'Porfolio Image', 'portfolio' ),
		'set_featured_image'    => __( 'Set Porfolio image', 'portfolio' ),
		'remove_featured_image' => __( 'Remove featured image', 'portfolio' ),
		'use_featured_image'    => __( 'Use as featured image', 'portfolio' ),
		'insert_into_item'      => __( 'Insert into item', 'portfolio' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'portfolio' ),
		'items_list'            => __( 'Items list', 'portfolio' ),
		'items_list_navigation' => __( 'Items list navigation', 'portfolio' ),
		'filter_items_list'     => __( 'Filter items list', 'portfolio' ),
	);
	$args = array(
		'label'                 => __( 'Portfolio', 'portfolio' ),
		'description'           => __( 'portfolio description', 'portfolio' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor','thumbnail' ),
		'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'portfolio', $args );

}
add_action( 'init', 'portfolio_custom_post', 0 );