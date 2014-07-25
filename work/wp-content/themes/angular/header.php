<?php $style = avia_get_option('boxed','stretched'); ?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> class="<?php echo avia_get_browser('class', true); echo " html_$style";?> ">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<?php 
	global $avia_config;

	/*
	 * outputs a rel=follow or nofollow tag to circumvent google duplicate content for archives
	 * located in framework/php/function-set-avia-frontend.php
	 */
	 if (function_exists('avia_set_follow')) { echo avia_set_follow(); }
	 
	 
	 /*
	 * outputs a favicon if defined
	 */
	 if (function_exists('avia_favicon'))    { echo avia_favicon(avia_get_option('favicon')); }
	 
?>


<!-- page title, displayed in your browser bar -->
<title><?php bloginfo('name'); ?> | <?php is_home() ? bloginfo('description') : wp_title(''); ?></title>


<!-- add feeds, pingback and stuff-->
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="alternate" type="application/rss+xml" title="<?php echo get_bloginfo('name'); ?> RSS2 Feed" href="<?php avia_option('feedburner',get_bloginfo('rss2_url')); ?>" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />


<!-- add css stylesheets -->	
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/css/grid.css" type="text/css" media="screen"/>
<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/css/base.css" type="text/css" media="screen"/>
<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/css/layout.css?v=1" type="text/css" media="screen"/>
<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/css/slideshow.css?v=1" type="text/css" media="screen"/>
<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/css/shortcodes.css" type="text/css" media="screen"/>



<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/js/prettyPhoto/css/prettyPhoto.css" type="text/css" media="screen"/>
<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/js/mediaelement/mediaelementplayer.css" type="text/css" media="screen"/>


<!-- mobile setting -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<?php

	/* add javascript */
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'avia-default' );
	wp_enqueue_script( 'avia-prettyPhoto' );
	wp_enqueue_script( 'avia-html5-video' );
	wp_enqueue_script( 'aviapoly-slider' );


	/* We add some JavaScript to pages with the comment form
	 * to support sites with threaded comments (when in use).
	 */
	if ( is_singular() && get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
	
?>

<!-- plugin and theme output with wp_head() -->
<?php 

	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	 
	wp_head();
?>


<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/css/custom.css" type="text/css" media="screen"/>

</head>



<?php 
/*
 * prepare big slideshow if available
 * If we are displaying a dynamic template the slideshow might already be set
 * therefore we dont need to call it here
 */

if(!avia_special_dynamic_template())
{
	avia_template_set_page_layout();
	if(isset($post))
	{
		$slider = new avia_slideshow(avia_get_the_ID());
		$avia_config['slide_output'] =  $slider->display_big();
	}
}


?>


<body id="top" <?php body_class($style); ?>>

	<div id='wrap_all'>	
				  
			<!-- ####### HEAD CONTAINER ####### -->
			
				<?php 
						$social = 1;
						echo "<div class='color_strip primary-background'></div>";
						echo "<div id='social_container' class='container_wrap'><div class='container'>";
						echo  '<div class="social_container extralight-border">';
							echo '<ul class="social_bookmarks">';
							do_action('avia_add_social_icon','header');
							if($dribbble = avia_get_option('dribbble')) { $social ++; echo "<li class='dribbble'><a href='http://dribbble.com/".$dribbble."'>".__('Follow us on dribbble', 'avia_framework')."</a></li>"; }
							if($twitter  = avia_get_option('twitter'))  { $social ++; echo "<li class='twitter'><a href='http://twitter.com/".$twitter."'>".__('Follow us on Twitter', 'avia_framework')."</a></li>"; }
							if($facebook = avia_get_option('facebook')) { $social ++; echo "<li class='facebook'><a href='".$facebook."'>".__('Join our Facebook Group', 'avia_framework')."</a></li>";	}
							if($gplus    = avia_get_option('gplus'))    { $social ++; echo "<li class='gplus'><a href='".$gplus."'>".__('Join me on Google Plus', 'avia_framework')."</a></li>"; }
							if($linkedin   = avia_get_option('linkedin'))    { $social ++; echo "<li class='linkedin'><a href='".$linkedin."'>".__('Add me on Linkedin', 'avia_framework')."</a></li>"; }
							
							/*
							//contact icon
							$contact_page_id = avia_get_option('email_page');
			                if (function_exists('icl_object_id')) $contact_page_id = icl_object_id($contact_page_id, 'page', true);  //wpml prepared
							if($contact_page_id) { $social ++; echo "<li class='mail'><a href='".get_permalink($contact_page_id)."'>".__('Send us Mail', 'avia_framework')."</a></li>"; }
							*/
							
							echo '	<li class="rss"><a href="'.avia_get_option('feedburner',get_bloginfo('rss2_url')).'">RSS</a></li>';
							echo '</ul>';
							
							avia_banner($social);   // avia_banner functions located in functions.php - creates the notification at the top of the site as well as the shopping cart 
							
						echo "</div>";
					echo "</div></div>";
				?>
						
				<div class='container_wrap' id='header'>
						
						<div class='container'>
						
						<?php

						/*
						*	display the theme logo by checking if the default css defined logo was overwritten in the backend.
						*   the function is located at framework/php/function-set-avia-frontend-functions.php in case you need to edit the output
						*/
						echo avia_logo(AVIA_BASE_URL.'images/layout/logo.png');
						
						/*
						*	display the main navigation menu
						*   check if a description for submenu items was added and change the menu class accordingly
						*   modify the output in your wordpress admin backend at appearance->menus
						*/
						echo "<div class='main_menu' data-selectname='".__('Select a page','avia_framework')."'>";
						$args = array('theme_location'=>'avia', 'fallback_cb' => 'avia_fallback_menu', 'max_columns'=>4);
						wp_nav_menu($args); 
						echo "</div>";
						
						?>
						
						<span class="primary-background seperator-addon seperator-bottom"></span>
						</div><!-- end container-->
				
				</div><!-- end container_wrap-->
			
			<!-- ####### END HEAD CONTAINER ####### -->
			
			<?php 
			//display slideshow big if one is available	
			if(!empty($avia_config['slide_output'])) echo "<div class='container_wrap' id='slideshow_big'><div class='container'>".$avia_config['slide_output']."</div></div>";	
			?>

			