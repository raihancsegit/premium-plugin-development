<?php
/**
* Plugin Name: Editor Quick Tag Plugin
* Plugin URI: 
* Description: This is the very first plugin I ever created.
* Version: 1.0
* Author: Raihan Islam
* Author URI: http://raihan.com/
**/

function eqt_assets($sc){
    if('post.php' == $sc){
        wp_enqueue_script('eqt-assets',plugin_dir_url(__FILE__)."/assets/qt.js",array('quicktags'));
    }
}
add_action('admin_enqueue_scripts','eqt_assets');

function mce_external_plugins_func($plugins){
    $plugins['external-plugins'] = plugin_dir_url(__FILE__)."/assets/qt.js";
    return $plugins;
}
function mc_buttons_func($buttons){
    $buttons[] = 'buttons-one';
    $buttons[] = 'buttons-two';
    return $buttons;

}
function admin_init_func(){
    add_filter('mce_external_plugins','mce_external_plugins_func');
    add_filter('mce_buttons','mc_buttons_func');
}
add_action( 'admin_init','admin_init_func');
