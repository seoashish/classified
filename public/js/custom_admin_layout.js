/* Global variable */
var user_navheight;
var side_menu_bar;
var content_box;



$(document).ready(function(){  // document ready function start

/* customize side-menu-bar height according navbar height */    
 user_navheight = $("#user-nav").outerHeight();
 side_menu_bar = $("div.side-menu-bar");
 content_box = $("div.content-box");
 side_menu_height = side_menu_bar.height();
 side_menu_bar.height(side_menu_height - user_navheight);
 content_box.height(side_menu_height - user_navheight);

/* window resize event */
$(window).resize(function(){
/* customize side-menu-bar height according navbar height */ 
 user_navheight = $("#user-nav").outerHeight();   
 side_menu_bar.height($(window).height() - user_navheight);
 content_box.height($(window).height() - user_navheight);
});


});