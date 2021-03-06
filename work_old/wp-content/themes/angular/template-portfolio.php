<?php 

/*
* This template controlls the portfolio overview pages: 4,3 2 and 1 Column Portfolios are generated by this file in conjunction with includes/loop-portfolio.php
*/


global $avia_config;


	//set a deafult query with all portfolio items in case the user just selected to display the page tempalte instead of setting up a portfolio properly
	if(!isset($avia_config['new_query']['tax_query'][0]['terms'][0]) || $avia_config['new_query']['tax_query'][0]['terms'][0] == "null") 
	{ 
		if(!isset($avia_config['portfolio_item_count'])) $avia_config['portfolio_item_count'] = '-1';
	
		$avia_config['new_query'] = array("paged" => get_query_var( 'paged' ),  "posts_per_page" => $avia_config['portfolio_item_count'],  "post_type"=>"portfolio"); 
	}


	/*
	 * get_header is a basic wordpress function, used to retrieve the header.php file in your theme directory.
	 */	
	 get_header();
 	 if(empty($avia_config['portfolio_columns'])) $avia_config['portfolio_columns'] = 4;
 	 
 	 
 	 //get the layout mode
 	 avia_template_set_page_layout(false, $avia_config['portfolio_layout']);
 	 
	?>
		
		<!-- ####### MAIN CONTAINER ####### -->
		<div class='container_wrap <?php echo $avia_config['layout']; ?>' id='main'>
			
			<div class='container container-portfolio-size-<?php echo $avia_config['portfolio_columns']; ?>'>
				
				<?php avia_title(); ?>
				<div class='content <?php echo $avia_config['content_class']; ?> units template-portfolio-overview content portfolio-size-<?php echo $avia_config['portfolio_columns']; ?>'>
				
				<?php
				//display the default content of the portfolio
				if(isset($post->ID))
				{
					the_post();
					if(get_the_content() != "")
					{
						echo "<div class='post-entry post-entry-portfolio-first not-sortable'>";
						the_content();
						echo "</div>";
					}
				}
				
				
				/* Run the loop to output the posts.
				* If you want to overload this in a child theme then include a file
				* called loop-portfolio.php and that will be used instead.
				*/
				
				get_template_part( 'includes/loop', 'portfolio' );
				
				?>
				
				
				<!--end content-->
				</div>
				
				<?php 
				
				wp_reset_query();
				if(strpos($avia_config['layout'], 'sidebar') !== false)
				{
					//get the sidebar
					$avia_config['currently_viewing'] = 'page';
					get_sidebar();
				}
				?>
				
				
				
				
			</div><!--end container-->

	</div>
	<!-- ####### END MAIN CONTAINER ####### -->


<?php get_footer(); ?>