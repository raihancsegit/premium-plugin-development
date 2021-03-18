<?php 
/* 
Plugin Name:New Plugin
description: New Plugin Description
Version:1.0
Author: Smart Coder
Author URI:http://smartcoderbd.com
Text Domain:new-plugin
Domain Path:/language
*/


add_action('plugins_loaded',function(){
 load_plugin_textdomain('new-plugin',false,dirname(__FILE__)."/language");
});


function new_fetures($content){
   
    $strip = strip_tags($content);
    $wordc = str_word_count($strip);
    
    $read_min = floor($wordc / 200);
    $read_se = floor($wordc % 200 / (200 / 60));

    $tags = apply_filters('new_plugin_tags','h3');
    $label = apply_filters('new_plugin_label','Reading Time');

    $post_type = get_post_type(get_the_ID());

    $post_type_filter = apply_filters('post_type_change',array());
    if(!in_array($post_type,$post_type_filter)){
        return $content;
    }
    $content .= sprintf('<%s>%s: min: %s Second:%s </%s>',$tags,$label,$read_min,$read_se,$tags);
   
    return $content;
}
add_filter('the_content','new_fetures');

?>