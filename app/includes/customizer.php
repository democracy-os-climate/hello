<?php
/**
 * hello Theme Customizer
 *
 * @package hello
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function hello_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	$wp_customize->add_setting( 'custom_footer_text', array(
	  'type' => 'theme_mod',
	  'default' => 'hello v0.1.0',
	  'transport' => 'postMessage' ,
	  'sanitize_callback' => 'sanitize_text_field',
	) );

	// Add a footer/copyright information section.
	$wp_customize->add_section( 'custom_footer' , array(
	  'title' => __( 'Footer', 'hello' ),
	  'priority' => 90, // Before Navigation.
	) );

	$wp_customize->add_control( 'custom_footer_text', array(
	  'label' => __( 'Footer text' ),
	  'type' => 'textarea',
	  'section' => 'custom_footer',
	) );

}
add_action( 'customize_register', 'hello_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function hello_customize_preview_js() {
	wp_enqueue_script( 'hello_customizer', get_template_directory_uri() . '/scripts/customizer.js', array( 'customize-preview' ), false, true );
}
add_action( 'customize_preview_init', 'hello_customize_preview_js' );
