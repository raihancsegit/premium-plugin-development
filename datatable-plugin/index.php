<?php
/**
* Plugin Name: Datatable Plugin
* Plugin URI: 
* Description: This is the very first plugin I ever created.
* Version: 1.0
* Author: Raihan Islam
* Author URI: http://raihan.com/
**/


function sm_menu_data(){
  add_menu_page(
    "SM List Table", 
    "SM List Table", 
    "manage_options", 
    "sm-list-table", 
    "wpl_sm_list_table_fn"
  );
}

function wpl_sm_list_table_fn(){
  ob_start();

    include_once plugin_dir_path(__FILE__) . 'views/sm-table-list.php';

    $template = ob_get_contents();
    
    ob_end_clean();
    
    echo $template;
}
add_action('admin_menu','sm_menu_data');


