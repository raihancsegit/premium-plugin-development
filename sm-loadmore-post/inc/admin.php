<?php 
class Loadmore_Admin {

    public function __construct()
    {
        add_action('admin_menu',array(&$this, 'smloadmorepost_admin_menu'));
    }

    function smloadmorepost_admin_menu(){
        add_menu_page(
            'smloadmorepost',
              'Load More', 
              'administrator', 
              'smloadmorepost_admin_menue', 
              array(&$this,'smloadmorepost_admin_all'),
              ""
            );
    }
    function smloadmorepost_admin_all(){
        include_once('setting-form.php');
    }
}

new Loadmore_Admin();

?>