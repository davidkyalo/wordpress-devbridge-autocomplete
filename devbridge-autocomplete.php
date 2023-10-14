<?php
/*
Plugin Name: Autocomplete block 
Plugin URI: https://github.com/davidkyalo/wordpress-devbridge-autocomplete
Description: An autocomplete block
Version: 0.0.1
Requires at least: 6.0
Requires PHP: 8.2
Author: David Kyalo
Author URI: https://github.com/davidkyalo/wordpress-devbridge-autocomplete
Text Domain: devbridge
*/



add_action('init',  function () {
    register_block_type(__DIR__  . "/dist");
});
