<?php
/**
* Plugin Name: SM WP Admin Notice Plugin 
* Plugin URI: 
* Description: This is the very first plugin I ever created.
* Version: 1.0
* Author: Raihan Islam
* Author URI: http://raihan.com/
**/



function admin_notice_set(){
    global $pagenow;
    if(in_array($pagenow,['index.php','themes.php'])){
    ?>

    <div id="sm-notice" class="notice notice-warning is-dismissible">
        <h1>Heding</h1>
        <p>Hello New Notice <?php echo $pagenow ?></p>
        <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com">
    </div>

    <?php
    }
}
add_action('admin_notices','admin_notice_set');

function notice_assets($sc){

    wp_enqueue_script('admin-notice',plugin_dir_url(__FILE__)."/js/script.js");
    
}
add_action('admin_enqueue_scripts','notice_assets');