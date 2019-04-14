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

/* ajax call */
getDistrict();
getCategory();

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


});  // document ready function end


/* DOM manipulating function */
function category(){
 $("#category").on("change", function(){
    $("#subcategory").val("");
    let selectedVal = $(this).find("option:selected").val();

    if(selectedVal != ""){
        $("#subcategory").removeAttr('disabled');
        $(`#subcategory > optgroup[label="${selectedVal}"]`)
        .show()
        .siblings("optgroup")
        .css("display", "none");
    }else{
     $("#subcategory").attr('disabled', 'disabled');
    }
    
 });
};

function district(){
    $("#district").on("change", function(){
       $("#city").val("");
       let selectedVal = $(this).find("option:selected").val();

       if(selectedVal != ""){
        $("#city").removeAttr('disabled');
        $(`#city > optgroup[label="${selectedVal}"]`)
        .show()
        .siblings("optgroup")
        .css("display", "none");
       }else{
        $("#city").attr('disabled', 'disabled');
       }
       
    });
   };


/* get district by get ajax request and create DOM */ 
function getDistrict(){
   $.get("/api/district", function(data){
      createDistrictHtml(data);
   });
};

function createDistrictHtml(data){
    let html1 = "";
    let html2 = "";
    let districtHtml = $("select#district");
    let cityHtml = $("select#city");
    districtHtml.html("");
    cityHtml.html("");

    if(data){
        html1 += `<option value="">Select district</option>`;
        html2 += `<option value="">Select city</option>`;
        data.forEach(function(district){
          html1 += `<option value="${district.name}">${titleCase(district.name)}</option>`;
          html2 += `<optgroup label="${district.name}">`;
                district.city.forEach(function(city){
                  html2 += `<option value="${city}">${titleCase(city)}</option>`;
                });
          html2 += `</optgroup>`;
        });
    }else{
        html1 += `<option value="">No district</option>`;
        html2 += `<option value="">No city</option>`;
    }
    districtHtml.append(html1);
    cityHtml.append(html2);
};

/* get category by get ajax request and create DOM */ 
function getCategory(){
    $.get("/api/category", function(data){
       createCategoryHtml(data);
    });
 };

function createCategoryHtml(data){
    let html1 = "";
    let html2 = "";
    let categoryHtml = $("select#category");
    let subcategoryHtml = $("select#subcategory");
    categoryHtml.html("");
    subcategoryHtml.html("");

    if(data){
        html1 += `<option value="">Select category</option>`;
        html2 += `<option value="">Select subcategory</option>`;
        data.forEach(function(category){
          html1 += `<option value="${category.category}">${titleCase(category.category)}</option>`;
          html2 += `<optgroup label="${category.category}">`;
              category.subcategory.forEach(function(subcategory){
                  html2 += `<option value="${subcategory}">${titleCase(subcategory)}</option>`;
                });
          html2 += `</optgroup>`;
        });
    }else{
        html1 += `<option value="">No category</option>`;
        html2 += `<option value="">No subcategory</option>`;
    }
    categoryHtml.append(html1);
    subcategoryHtml.append(html2);
};


/* title case function */
function titleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};
