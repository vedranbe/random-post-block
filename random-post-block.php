<?php

/**
 * Plugin Name: Random Post
 * Description: Gutenberg block for displaying a random post.
 * Version: 0.1.0
 * Author: Vedran Bejatovic
 * Author URI: https://www.linkedin.com/in/vedranbe/
 * Text Domain: andiro
 */

namespace andiroDevRandom;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function random_post_block_init() {
	register_block_type(__DIR__ . '/build');
}
add_action('init', __NAMESPACE__ . '\random_post_block_init');

/**
 * Function to add a custom block category.
 *
 * @param array $categories The array of categories.
 * @param mixed $post The post data.
 * @return array The updated array of categories.
 */
function add_custom_block_category($categories, $post)
{
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'andiro',
				'title' => 'Andiro'
			),
		)
	);
}

add_filter('block_categories_all', __NAMESPACE__ . '\add_custom_block_category', 10, 2);
