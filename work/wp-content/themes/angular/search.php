<?php 
global $avia_config;


	/*
	 * get_header is a basic wordpress function, used to retrieve the header.php file in your theme directory.
	 */	
	 get_header();
	?>
		
		<!-- ####### MAIN CONTAINER ####### -->
		<div class='container_wrap <?php echo $avia_config['layout']; ?>' id='main'>
		
			<div class='container'>
				
			<?php echo avia_title(avia_which_archive()); ?>
				
				<div class='content template-search <?php echo $avia_config['content_class']; ?> units'>
				<?php
				/* Run the loop to output the posts.
				* If you want to overload this in a child theme then include a file
				* called loop-search.php and that will be used instead.
				*/
				$more = 0;
				get_template_part( 'includes/loop', 'search' );
				?>
				
				
				<!--end content-->
				</div>
				
				<?php 

				//get the sidebar
				$avia_config['currently_viewing'] = 'page';
				
				get_sidebar();
				
				?>
				
			</div><!--end container-->

	</div>
	<!-- ####### END MAIN CONTAINER ####### -->


<?php get_footer(); ?>