<?php
/**
* Plugin Name: SM Loadmore Post
* Plugin URI: 
* Description: This is the very first plugin I ever created.
* Version: 1.0
* Author: Raihan Islam
* Author URI: http://raihan.com/
**/

if ( ! class_exists( 'SM_LOADMORE' ) ) :
class SM_LOADMORE {
    public function __construct()
    {
        add_action('plugins_loaded', array(&$this, 'loadmorepost_localization_init_textdomain'));
        add_action('wp_enqueue_scripts',array(&$this, 'wp_add_css_and_scripts'));
        add_shortcode('wp_load_more_option',array(&$this, 'wp_load_more_option'));
		add_action( 'wp_ajax_get_new_data_items', array(&$this, 'get_new_data_items' ));
	    add_action( 'wp_ajax_nopriv_get_new_data_items', array(&$this, 'get_new_data_items' ));
        include_once('inc/admin.php');
    }

	function get_new_data_items(){
		$from_limit = sanitize_text_field($_POST['from_limit']);
		$limit_to = sanitize_text_field($_POST['limit_to']);
		$cat_id = sanitize_text_field($_POST['cat_id']);
		$post_type = sanitize_text_field($_POST['post_type']);
		$args = array(
				'numberposts'      => $limit_to,
				'offset'           => $from_limit,
				'category'         => $cat_id,
				'orderby'          => 'date',
				'order'            => 'DESC',
				'post_type'        => $post_type,
				'post_status'      => 'publish'
			);
		$results = get_posts($args);
		$html = '';
			foreach($results as $result){
		    $post_id = $result->ID;
            $permalink = get_the_permalink($post_id);
			$excerpt_content = get_option('wp_post_excerpt_content','120');
            $content = substr($result->post_content, 0, $excerpt_content)."...";
            $title = $result->post_title;
            $comment_count = $result->comment_count;
            $img_url = get_the_post_thumbnail_url($post_id);
			if(empty($img_url)){
			$fullcontent = $result->post_content;
			$regex = '/src="([^"]*)"/';
			preg_match_all( $regex, $fullcontent, $matches );
			$matches = array_reverse($matches);
			$img_url = $matches[0][0];
			}
            $post_date = $result->post_date;
            $date1=date_create($post_date);
            $date = date_format($date1,"F d, Y");
			$categoies=get_the_category($post_id);
			
			$cat_html='';
			foreach($categoies as $category){
			$term_id = $category->term_id;
			$cat_name = $category->name;
			$category_link = get_category_link($term_id);
			$cat_html .='<a href="'.$category_link.'">'.$cat_name.'</a>';
			    }
		
        $html .= '<div id="wp_id_'.$post_id.'" class="wp_post_items">
			<div class="news-block-wrapper">
			<div class="news-block-thumb">
			<a href="'.$permalink.'">
				<img width="400" height="267" src="'.$img_url.'" class="aligncenter wp-post-image" alt="'.$title.'" loading="lazy" sizes="(max-width: 400px) 100vw, 400px"></a>';
				if(get_option('wp_load_post_category')==0):;
				$html .= '<span class="news-categories">'.$cat_html.'</span>';
				endif;
				$html .= '</div>
			<div class="news-block-text-wrap">
			<div class="news-block-meta entry-meta">';
		if(get_option('wp_load_posts_date')==0):;
			$html .= '<img class="wp_icons" src='.plugins_url("imgs/calendar.svg",__FILE__ ).' alt="Calendar">';
			$html .= '<span class="posted-on">'.$date.'</span>';
		endif;
		if(get_option('wp_load_posts_comment')==0):;
			$html .= '<img class="wp_icons" src='.plugins_url("imgs/comment.svg",__FILE__ ).' alt="Comment">';
			$html .= '<span class="comments-link"><a href="'.$permalink.'#respond">'. $comment_count.'</a></span>';
		endif;
			$html .= '</div><h3 class="news-block-title">
			<a href="'.$permalink.'">'.$title.'</a>
			</h3>
			<div class="news-block-summary">
				<p>'.strip_tags($content).'</p>
			</div>	
		</div>
	</div>
</div>';
		}
	echo $html;		
	wp_die();
	}

    function wp_load_more_option($atts){
        $atts = shortcode_atts(
			array('cat_id' => false,'post_type' => false),
			$atts
		);		
		$post_type = $atts['post_type'];
		$cat_ID = $atts['cat_id'];		
		$rowperpage = get_option('wp_post_per_page');

        if($rowperpage<=0){$rowperpage=10;}
		if(post_type_exists( $post_type )){
			$post_type = $atts['post_type'];
			}else{$post_type ='';}
		if((!empty($post_type)) && (!empty($cat_ID))){
			$the_query = new WP_Query( 'cat='.$cat_ID && 'post_type='.$post_type );
			$allcount = $the_query->found_posts;
		}elseif(!empty($post_type)){
			$the_query = new WP_Query( 'post_type='.$post_type );
			$allcount = $the_query->found_posts;
		}elseif(!empty($cat_ID)){
			$the_query = new WP_Query( 'cat='.$cat_ID );
			$allcount = $the_query->found_posts;
		}else{
			$allcount = wp_count_posts('post')->publish;
		}
		if(empty($post_type)){$post_type = 'post';}

        $html ='';
        if($allcount>0):
            $args = array(
               'numberposts'      => $rowperpage,
               'offset'           => 0,
               'category'         => $cat_ID,
               'orderby'          => 'date',
               'order'            => 'DESC',
               'post_type'        => $post_type,
               'post_status'      => 'publish'
              );

    $results = get_posts($args);
	$background1 = !empty(get_option('wp_load_more_Bg_color')) ? get_option('wp_load_more_Bg_color'):'#CC1919';
	$background2 = !empty(get_option('wp_load_more_Tx_color')) ? get_option('wp_load_more_Tx_color'):'#fff';
	$background3 = !empty(get_option('wp_load_more_Hbg_color')) ? get_option('wp_load_more_Hbg_color') : "#9c0505";
	$background4 = !empty(get_option('wp_load_more_Htx_color')) ? get_option('wp_load_more_Htx_color'):"#fff";
    $html .= '<style>.wp_load-more {background:'.$background1.'!important;color:'.$background2.'!important}
	button.wp_load-more:hover {color:'.$background4.'!important;}
	.wp_load-more::after {background:'.$background3.' !important;}</style>';

    $html .='<div class="wp_all_posts_section">';
		if(get_option('wp_load_default_col')==2){
			$html .= '<style>.wp_all_posts_section {display: grid;grid-template-columns: auto auto;grid-gap: 16px;}.news-block-thumb img {height: 300px;object-fit: cover;} @media screen and (min-width : 100px) and (max-width : 667px){.wp_all_posts_section {grid-template-columns: auto;}}</style>';			
		}elseif(get_option('wp_load_default_col')==3){
			$html .= '<style>.wp_all_posts_section {display: grid;grid-template-columns: auto auto auto;grid-gap: 16px;} .news-block-thumb img {height: 225px;object-fit: cover;} @media screen and (min-width : 100px) and (max-width : 667px){.wp_all_posts_section {grid-template-columns: auto;}}</style>';			
		}elseif(get_option('wp_load_default_col')==4){
			$html .= '<style>.wp_all_posts_section {display: grid;grid-template-columns: auto auto auto auto;grid-gap: 16px;} .news-block-thumb img {height: 225px;object-fit: cover;} @media screen and (min-width : 100px) and (max-width : 667px){.wp_all_posts_section {grid-template-columns: auto;}}</style>';
		}else{	
			$html .= '<style>.wp_all_posts_section {display: grid;grid-template-columns:auto;grid-gap: 16px;}.news-block-thumb img {max-height: 500px;object-fit: cover;} @media screen and (min-width : 100px) and (max-width : 667px){.wp_all_posts_section {grid-template-columns: auto;}}</style>';		
		}

        foreach($results as $result){			
		    $post_id = $result->ID;
            $permalink = get_the_permalink($post_id);
            $excerpt_content = get_option('wp_post_excerpt_content','120');
            $content = substr($result->post_content, 0, $excerpt_content)."...";
            $title = $result->post_title;
            $comment_count = $result->comment_count;
            $img_url = get_the_post_thumbnail_url($post_id);			
			if(empty($img_url)){
			$fullcontent = $result->post_content;
			$regex = '/src="([^"]*)"/';
			preg_match_all( $regex, $fullcontent, $matches );
			$matches = array_reverse($matches);
			$img_url = $matches[0][0];
			}			
            $post_date = $result->post_date;
            $date1=date_create($post_date);
            $date = date_format($date1,"F d, Y");
			$categoies=get_the_category($post_id);	
			$cat_html='';
			foreach($categoies as $category){
			$term_id = $category->term_id;
			$cat_name = $category->name;
			$category_link = get_category_link($term_id);
			$cat_html .='<a href="'.$category_link.'">'.$cat_name.'</a>';
			    }
                $html .= '<div id="wp_id_'.$post_id.'" class="wp_post_items">
				<div class="news-block-wrapper">
				<div class="news-block-thumb">
				<a href="'.$permalink.'">
				<img width="400" height="267" src="'.$img_url.'" class="aligncenter wp-post-image" alt="'.$title.'" loading="lazy" sizes="(max-width: 400px) 100vw, 400px"></a>';
				if(get_option('wp_load_post_category')==0):;
				$html .= '<span class="news-categories">'.$cat_html.'</span>';
				endif;
				$html .= '</div>
				<div class="news-block-text-wrap">
				<div class="news-block-meta entry-meta">';
			if(get_option('wp_load_posts_date')==0):;
				$html .= '<img class="wp_icons" src='.plugins_url("imgs/calendar.svg",__FILE__ ).' alt="Calendar">';
				$html .= '<span class="posted-on">'.$date.'</span>';
			endif;
			if(get_option('wp_load_posts_comment')==0):;
				$html .= '<img class="wp_icons" src='.plugins_url("imgs/comment.svg",__FILE__ ).' alt="Comment">';
				$html .= '<span class="comments-link"><a href="'.$permalink.'#respond">'. $comment_count.'</a></span>';
			endif;
			$html .= '</div><h3 class="news-block-title">
				<a href="'.$permalink.'">'.$title.'</a>
				</h3>
				<div class="news-block-summary">
				<p>'.strip_tags($content).'</p>
				</div>		
				</div>
			</div>
		</div>';
	}
    $html .= '<div style="clear:both;"></div></div>';	
	if($allcount > $rowperpage):
	$loadMore = get_option("wp_load_more_btn_Txt","Load More");
	$html .= '<div class="wp_btn_more"><button class="wp_load-more">'.$loadMore.'</button>
		 <input type="hidden" id="wp_page_posts" value="'.$rowperpage.'">
		 <input type="hidden" id="wp_post_show" value="'.$rowperpage.'">
		 <input type="hidden" id="wp_all" value="'. $allcount .'">
		 <input type="hidden" id="wp_posType" value="'. $post_type .'">
		 <input type="hidden" id="wp_cat_id" value="'. $cat_ID .'"></div>';
		 endif;		
		else:
		$html .= '<div class="wp_no_posts">There is no post on the back-end. Please add the post first !!!</div>';
		endif;
		echo $html;
}

    function wp_add_css_and_scripts(){
        wp_register_style( 'wp_loadmore_css', plugins_url('css/custom.css',__FILE__ ),array(), "1.0.0");
		wp_enqueue_style( 'wp_loadmore_css' );
		wp_register_script( 'wp_loadmore_js', plugins_url('js/custom.js',__FILE__ ), array( 'jquery' ), "1.0.0");
		$translation_array = 
		array(
		'admin_url' => admin_url(),
		'load_more_btn_Txt' => get_option('wp_load_more_btn_Txt','Load More'),
		'hide_btn_Txt' => get_option('wp_hide_btn_Txt','Load Less'),		
		'load_less_btn' => get_option('wp_load_less_Btn','0'),		
			);
		wp_localize_script( 'wp_loadmore_js', 'loadMoreJS', $translation_array );
		wp_enqueue_script( 'wp_loadmore_js');
	}


    function loadmorepost_localization_init_textdomain(){
        $path = dirname(plugin_basename( __FILE__ )) . '/lang/';
	    $loaded = load_plugin_textdomain( 'smloadmorepost', false, $path);
    }

}

new SM_LOADMORE();

endif;