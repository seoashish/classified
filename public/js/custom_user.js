/* Global variable */
var user_navheight;
var side_menu_bar;
var content_box;



$(document).ready(function(){

/* customize side-menu-bar height according navbar height */    
 user_navheight = $("#user-nav").outerHeight();
 side_menu_bar = $("div.side-menu-bar");
 content_box = $("div.content-box");
 side_menu_height = side_menu_bar.height();
 side_menu_bar.height(side_menu_height - user_navheight);
 content_box.height(side_menu_height - user_navheight);




alert("custom_user.js work ");

/* call DOM */
category();
district();

/* window resize event */
$(window).resize(function(){
/* customize side-menu-bar height according navbar height */ 
 user_navheight = $("#user-nav").outerHeight();   
 side_menu_bar.height($(window).height() - user_navheight);
 content_box.height($(window).height() - user_navheight);
});


});


/* DOM manipulating function */
function category(){
 $("#category").on("change", function(){
    let selectedVal = $(this).find("option:selected").val();
    $(`#subcategory > optgroup[label="${selectedVal}"]`)
    .show()
    .siblings("optgroup")
    .css("display", "none");
 });
};

function district(){
    $("#district").on("change", function(){
       let selectedVal = $(this).find("option:selected").val();
       $(`#city > optgroup[label="${selectedVal}"]`)
       .show()
       .siblings("optgroup")
       .css("display", "none");
    });
   };