<?php

/**
 * Dynamic Block
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php
	// Get a random post
	$args = array(
		'orderby'        => 'rand',
		'posts_per_page' => 1,
		'post_type'      => 'post',
		'post_status'    => 'publish',
	);


	$random_post = new \WP_Query($args);
	// Check if there is at least one post
	if ($random_post->have_posts()) {
		$random_post->the_post();


		// Get post data
		$post_title = get_the_title();
		$post_link = get_permalink();
		$post_image = get_the_post_thumbnail_url(get_the_ID(), $attributes['mediaSize']);
		$post_excerpt = get_the_excerpt();
		$length = (int)$attributes['excerptLength'];

		$out_excerpt = strlen($post_excerpt) > $length ? substr($post_excerpt, 0, $length) . "..." : $post_excerpt;

		if ($attributes['aspectRatio']) {
			$aspectRatio = 'aspect-ratio: ' . $attributes['aspectRatio'] . '; ';
		} else {
			$aspectRatio = '';
		}
		if ($attributes['scale']) {
			$scale = 'object-fit: ' . $attributes['scale'] . '; ';
		} else {
			$scale = '';
		}

		if ($attributes['position']) {
			$position = 'object-position: ' . $attributes['position'] . ';';
		} else {
			$position = '';
		}

		$output = '<a href="' . esc_url($post_link) . '"></a>';
		if ($attributes['showImage'] !== false) {
			$output .= '<figure class="wp-block-image"><img src="' . esc_url($post_image) . '" style="' . $aspectRatio . $scale . $position . '" alt="' . esc_attr($post_title) . '"></figure>';
		}
		$output .= '<h3>' . esc_html($post_title) . '</h3>';
		if ($attributes['showExcerpt'] !== false) {
			$output .= '<p>' . esc_html($out_excerpt) . '</p>';
		}

		echo $output;
	}

	// Reset Post Data
	wp_reset_postdata();

	?>
</div>