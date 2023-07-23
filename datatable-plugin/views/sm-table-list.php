<?php 
require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
class SMTableList extends WP_List_Table {

    

    public function prepare_items() {

        $orderby = isset($_GET['orderby']) ? trim($_GET['orderby']) : "";
        $order = isset($_GET['order']) ? trim($_GET['order']) : "";
        $search_term = isset($_POST['s']) ? trim($_POST['s']) : "";

        $this->items = $this->wp_list_table_data($orderby, $order, $search_term);

        $columns = $this->get_columns();
        $hidden = $this->get_hidden_columns();

        $sortable = $this->get_sortable_columns();
        $this->_column_headers = array($columns,$sortable);


    }

    public function wp_list_table_data($orderby = '', $order = '', $search_term = ''){
        global $wpdb;

        if (!empty($search_term)) {

            //wp_posts
            $all_posts = $wpdb->get_results(
                    "SELECT * from " . $wpdb->posts . " WHERE post_type = 'post' AND post_status = 'publish' AND (post_title LIKE '%$search_term%' OR post_content LIKE '%$search_term%')"
            );
        } else {

            if ($orderby == "title" && $order == "desc") {
                // wp_posts
                $all_posts = $wpdb->get_results(
                        "SELECT * from " . $wpdb->posts . " WHERE post_type = 'post' AND post_status = 'publish' ORDER BY post_title DESC"
                );
            } else {
                $all_posts = get_posts(array(
                    "post_type" => "post",
                    "post_status" => "publish"
                ));
            }
        }



        $posts_array = array();

        if (count($all_posts) > 0) {

            foreach ($all_posts as $index => $post) {
                $posts_array[] = array(
                    "id" => $post->ID,
                    "title" => $post->post_title,
                    "content" => $post->post_content,
                    "slug" => $post->post_name
                );
            }
        }

        return $posts_array;
    }

    public function get_columns() {

        $columns = array(
            "id" => "ID",
            "title" => "Title",
            "content" => "Content",
            "slug" => "Post Slug"
        );

        return $columns;
    }

    public function column_default($item, $column_name) {

        switch ($column_name) {

            case 'id':
            case 'title':
            case 'content':
            case 'slug':
                return $item[$column_name];
            default:
                return "no value";
        }
    }

    public function get_hidden_columns() {

        return array("id");
    }

    public function get_sortable_columns() {

        return array(
            "name" => array("name", true),
            "email" => array("email", false)
        );
    }
}

function sm_show_data_list_table() {
    $sm_table = new SMTableList();

    $sm_table->prepare_items();
    echo '<h3>This is List</h3>';
    echo "<form method='post' name='frm_search_post' action='" . $_SERVER['PHP_SELF'] . "?page=sm-list-table'>";
    $sm_table->search_box("Search Post(s)", "search_post_id");
    echo "</form>";
    $sm_table->display();
}

sm_show_data_list_table();

?>