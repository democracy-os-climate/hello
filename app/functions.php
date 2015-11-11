<?php
/**
 * hello functions and definitions
 *
 * @package wordpress
 * @subpackage hello
 */

if ( ! function_exists( 'hello_content_width' ) ) :
/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function hello_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'hello_content_width', 950 );
}
endif; // hello_content_width
add_action( 'after_setup_theme', 'hello_content_width', 0 );


if ( ! function_exists( 'hello_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function hello_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on hello, use a find and replace
	 * to change 'hello' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'hello', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'top-left' => esc_html__( 'Top Left Menu', 'hello' ),
		'top-right' => esc_html__( 'Top Right Menu', 'hello' ),
		'social' => esc_html__( 'Social Menu', 'hello' ),
		'breadcrumb' => esc_html__( 'Custom breadcrumb', 'hello' ),
		'footer' => esc_html__( 'Footer Menu', 'hello' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'image',
		'video',
		'audio',
		'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'hello_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // hello_setup
add_action( 'after_setup_theme', 'hello_setup' );

/**
 * Enqueue scripts and styles.
 */
function hello_scripts() {

  if( file_exists( get_template_directory() . '/styles/vendor.css') ) {
	   wp_enqueue_style( 'hello-vendor', get_template_directory_uri() . '/styles/vendor.css' );
  }
  wp_enqueue_style( 'hello-main', get_template_directory_uri() . '/styles/main.css' );

	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/scripts/modernizr.js', array() , false, false );

  if( file_exists( get_template_directory() . '/scripts/vendor.js') ) {
	   wp_enqueue_script( 'hello-vendor', get_template_directory_uri() . '/scripts/vendor.js', array('jquery'), false, true );
	}

  if( file_exists( get_template_directory() . '/scripts/plugins.js') ) {
	   wp_enqueue_script( 'hello-plugins', get_template_directory_uri() . '/scripts/plugins.js', array(), false, true );
	}

  wp_enqueue_script( 'hello-main', get_template_directory_uri() . '/scripts/main.js', array(), false, true );

	if( !is_admin() ) {

		wp_enqueue_script( 'hello-skip-link-focus-fix', get_template_directory_uri() . '/scripts/skip-link-focus-fix.js', array(), '20130115', true );

	}

}
add_action( 'wp_enqueue_scripts', 'hello_scripts' );

function hello_body_class($class = ''){
  $classes = array();
  // $classes[] = 'has-navbar-top' ;

  if ( is_admin_bar_showing() ) {
    $classes[] = 'has-admin-bar' ;
  }

  if ( ! empty( $class ) ) {
      if ( !is_array( $class ) )
          $class = preg_split( '#\s+#', $class );
      $classes = array_merge( $classes, $class );
  }

  return $classes ;
}
add_filter( 'body_class', 'hello_body_class' ) ;

function hello_nav_menu_args( $args = '' ) {
	$args['container'] = false;
	return $args;
}
// add_filter( 'wp_nav_menu_args', 'hello_nav_menu_args' );

function hello_footer_text() {
  echo esc_html(get_theme_mod('custom_footer_text','hello 0.1.0')) ;
}

/**
 * Custom Header
 */
require get_template_directory() . '/includes/custom-header.php';

/**
 * Customizer
 */
require get_template_directory() . '/includes/customizer.php';

/**
 * Plugins
 */
require_once get_template_directory() . '/includes/plugins.php';
