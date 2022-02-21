jQuery(document).ready(function(){

    jQuery('.wp_load-more').on("click",function(){
        //alert("click")
        var wp_page_posts = Number(jQuery('#wp_page_posts').val());
        var wp_post_show = Number(jQuery('#wp_post_show').val());
        var allcount = Number(jQuery('#wp_all').val());
        var wp_post_show1 = Number (wp_post_show + wp_page_posts);
        var cat_id = jQuery('#wp_cat_id').val();
        var post_type = jQuery('#wp_posType').val();
		if(wp_post_show1 > allcount){
			var limit_to = Number(allcount - wp_post_show);
		}else{
			limit_to = wp_page_posts;
		}
		var Load_More_Btn_Txt = loadMoreJS.load_more_btn_Txt;		
        var Hide_Btn_Txt = loadMoreJS.hide_btn_Txt;
        var Load_Less_Btn = loadMoreJS.load_less_btn;

        if(limit_to >0){

            var baseurl = loadMoreJS.admin_url; 
            jQuery.ajax({
                url: baseurl + "admin-ajax.php",
                type: 'POST',
                dataType: "html",
                data: {
    					action: "get_new_data_items",from_limit:wp_post_show,limit_to:limit_to,cat_id:cat_id,post_type:post_type
    				},
                beforeSend:function(){
                    jQuery(".wp_load-more").text("Loading...");
					jQuery('.wp_load-more').css("background","green");
                },
                success: function(response){

                    // Setting little delay while displaying new content
                    setTimeout(function() {
                        // appending posts after last post with class="post"
                        jQuery(".wp_post_items:last").after(response).show().fadeIn("slow");
						var wp_post_show1 = Number(wp_post_show + limit_to);
						jQuery("#wp_post_show").val(wp_post_show1);
                       // var rowno = wp_post_show + wp_page_posts;

                        // checking row value is greater than allcount or not
                        if(wp_post_show1 == allcount){

                            // Change the text and background
                            jQuery('.wp_load-more').text(Hide_Btn_Txt);
                            jQuery('.wp_load-more').css("background","#000");
							if(Load_Less_Btn ==1){jQuery('.wp_btn_more').css("display","none");}else{jQuery('.wp_btn_more').css("display","block");}
                        }else{
                            jQuery(".wp_load-more").text(Load_More_Btn_Txt);
							jQuery('.wp_load-more').css("background","#CC1919");
                        }
                    }, 2000);

				return false;
                }
            });
        }else {
            jQuery('.wp_load-more').text("Loading...");
			jQuery('.wp_load-more').css("background","green");
            // Setting little delay while removing contents
            setTimeout(function() {
				wp_page_posts1 = Number(wp_page_posts + 1);
                // When row is greater than allcount then remove all class='post' element after 3 element
                jQuery('.wp_post_items:nth-child(' + wp_page_posts1 + ')').nextAll('.wp_post_items').remove().fadeIn("slow");

                // Reset the value of row
                jQuery("#wp_post_show").val(wp_page_posts);

                // Change the text and background
                jQuery('.wp_load-more').text(Load_More_Btn_Txt);
                jQuery('.wp_load-more').css("background","#CC1919");

            }, 2000);

		return false;
        }
    });
});