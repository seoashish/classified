/* Global varialbe */
let page_limit = 10;
let page_no = 1;
let sort_by = "title";
let category = "";
let city = "";
let pagination_button = 5;
let total_record;
let last_page;
let half;
let html;

/* when DOM is ready below function is run */
$(document).ready(function(){
 // alert("dom is ready");

  /* ajax call */
  getData();
  getAllCategory();
  getAllDistrict();

//  getPageNo(page_no);
  getCity();
  getCategory();
  getSort();
  getPageLimit(); 
  manipulateDOM();
});


/* All function defination below */
function getCity(){
    /* get city value when it's clicked */
    $("ul#citylist").on("click", "div.sub-city > li", function(){
        city = $(this).children("span").data("subcity");
        //alert(city +" is clicked");
        /* ajax call below */
        getData();
    });
};

function getCategory(){
    /* get category value when it's clicked */
    $("ul#cat-list").on("click", "div.sub-category > li", function(){
        category = $(this).children("span").data("subcategory");
        //alert(category +" is clicked!");
        /* ajax call below */
        getData();
    });
};

function getSort(){
    /* get sort-by value when it's value is change */
    $("#sort-by").on("change", function(){
        sort_by = $(this).children("option:selected").val();
        //alert("Sort By " + sort_by);
        /* ajax call below */
        getData();
    });
};

function getPageLimit(){
    /* get page-limit value when it's value is change */
    $("#page-limit").on("change", function(){
        page_limit = $(this).children("option:selected").val();
        page_limit = parseInt(page_limit);
        //alert("Page Limit is " + page_limit);
        /* ajax call below */
        getData();
    });
};

function getPageNo(pageNo){
page_no = parseInt(pageNo);
/* ajax call below */
getData();

};


function manipulateDOM(){
    /* Category accordion */
    $("ul#cat-list").on("click", "div.main-category", function(){
        $(this).find("li > i").toggleClass("fa-angle-right").toggleClass("fa-angle-down");
        $(this).next("div.sub-category").toggleClass("show");
    });


    /* City accordion */
    $("ul#citylist").on("click", "div.main-city", function(){
        $(this).find("li > i").toggleClass("fa-angle-right fa-angle-down");
        $(this).next().toggleClass("show");
    });
};

/* get data using ajax */
function getAllCategory(){
    $.get( "/api/category", function( category ) {
        //console.log(category);
        categoryHtml(category);
      });
};

/* get data using ajax */
function getAllDistrict(){
    $.get( "/api/district", function( district ) {
        //console.log(category);
        districtHtml(district);
      });
};

/* get data using ajax */
function getData(){
//alert("ajax call");
let query ={};
if( category != "" && city != "" ){
    query.subcategory = category;
    query.city = city;
}
if( category == "" && city != "" ){
    query.city = city;
}
if( category != "" && city == "" ){
    query.subcategory = category;
}
console.log(`ajaxsend: ${JSON.stringify(query)} limit: ${page_limit} page: ${page_no} sort: ${sort_by}`);
    $.ajax({
        type: 'POST',
        url: '/api/classified',
        data: {
            limit: page_limit,
            page: page_no,
            query: query,
            sort: sort_by
        },
        dataType: "json",
        success: function(jsonData, textStatus){
          console.log(jsonData);
          classifiedHtml(jsonData.data);
          pagination(jsonData.totalRecord);
        },
        error: function(xhr, textStatus, errorThrown){
    
        }
      });  
};


function pagination(totalRecord){
    total_record = totalRecord;
    last_page = Math.ceil(total_record / page_limit);
    half = Math.floor(pagination_button / 2);
    //console.log(total_record+" "+last_page+" "+half);
   /* Remove all html */
   $("div#pagination_list").html("");
    html = `<nav aria-label=""><ul class="pagination">`;

    /*  condition:- page_no < 5 && (last_page == 5 || last_page > 5) */
    if(page_no  <= pagination_button && (last_page <= pagination_button || last_page > pagination_button)){
        if(last_page <= pagination_button){
            for(let i = 1; i <= last_page; i++){
                if(i == page_no){
                    html += `<li class="page-item active"><a class="page-link" href="javascript:getPageNo(${i});">${i}</a></li>`;
                }else{
                    html += `<li class="page-item"><a class="page-link" href="javascript:getPageNo(${i});">${i}</a></li>`;
                }
            }    
        }
        if(last_page > pagination_button){
            for(let i = 1; i <= pagination_button; i++){
                if(i == page_no){
                    html += `<li class="page-item active"><a class="page-link" href="javascript:getPageNo(${i});">${i}</a></li>`;
                }else{
                    html += `<li class="page-item"><a class="page-link" href="javascript:getPageNo(${i});">${i}</a></li>`;
                }
            }
            html += `<li class="page-item"><a class="page-link" href="javascript:getPageNo(${pagination_button + 1});">Next</a></li>`;
        }
         
    }
    /* condition:- page_no >= 5 && last_page > 5 */
    else if(page_no > pagination_button && last_page > pagination_button){
        if((page_no + half) >= last_page){
            html += `<li class="page-item"><a class="page-link" href="javascript:getPageNo(${last_page - pagination_button});">Prev</a></li>`;
            for(let i = (last_page - pagination_button) + 1; i <= last_page; i++){
                if(i == page_no){
                    html += `<li class="page-item active"><a class="page-link" href="javascript:getPageNo(${i});">${i}</a></li>`;
                }else{
                    html += `<li class="page-item"><a class="page-link" href="javascript:getPageNo(${i});">${i}</a></li>`;
                }   
            }
        }else if((page_no - half) < last_page){
            html += `<li class="page-item"><a class="page-link" href="javascript:getPageNo(${(page_no - half) - 1});">Prev</a></li>`;
            for(let i = (page_no - half); i <= (page_no + half); i++){
                if(i == page_no){
                    html += `<li class="page-item active"><a class="page-link" href="javascript:getPageNo(${i});">${i}</a></li>`;
                }else{
                    html += `<li class="page-item"><a class="page-link" href="javascript:getPageNo(${i});">${i}</a></li>`;
                }   
            }  
            html += `<li class="page-item"><a class="page-link" href="javascript:getPageNo(${(page_no + half) + 1});">Next</a></li>`;    
        }
    }
    html += `</ul></nav>`;




   /* Append html in Pagination div */
   $("div#pagination_list").append(html);

};

/* category html manipulate */
function categoryHtml(data){
    let html = "";
    $("ul#cat-list").html("");
    if(data.length > 0){
      data.forEach((category) =>{
        let cat = "";
        if(category.category.length > 17){
            cat += category.category.slice(0, 17);
            cat += "...";
        }else{
            cat += category.category;
        }
        html += `<div class="main-category">
        <li class="bg-whitesmoke d-flex align-items-center mb-1"><span class="pl-2">${titleCase(cat)}</span><i class="fas fa-angle-right fa-2x bg-lightgray px-2 ml-auto"></i></li>
        </div>`;
        html += `<div class="sub-category collapse">`;   
        category.subcategory.forEach((subcategory) =>{
           html += `<li class="bg-whitesmoke d-flex align-items-center mb-1"><i class="fas fa-dot-circle fa-xs ml-2"></i><span class="pl-1" data-subcategory="${subcategory}">${titleCase(subcategory)}</span></li>`;
        });
        html += `</div>`;
      });
    }else{
        html += `<div class="main-category">
        <li class="bg-whitesmoke d-flex align-items-center mb-1"><span class="pl-2">No Category</span><i class="fas fa-angle-right fa-2x bg-lightgray px-2 ml-auto"></i></li>
        </div>`;
    }

    $("ul#cat-list").append(html);
};

/* district html manipulate */
function districtHtml(data){
    let html = "";
    $("ul#citylist").html("");
    if(data.length > 0){
        data.forEach((district) =>{
            let dist = "";
            if(district.name.length > 18){
                dist += district.name.slice(0, 18);
                dist += "...";
            }else{
                dist += district.name;
            }
            html += `<div class="main-city">
            <li class="bg-whitesmoke d-flex align-items-center mb-1"><span class="pl-2">${titleCase(dist)}</span><i class="fas fa-angle-right fa-2x bg-lightgray px-2 ml-auto"></i></li>    
            </div>`;
            html += `<div class="sub-city collapse">`;
            district.city.forEach((city) =>{
              html += `<li class="bg-whitesmoke d-flex align-items-center mb-1"><i class="fas fa-dot-circle fa-xs ml-2"></i><span class="pl-1" data-subcity="${city}">${titleCase(city)}</span></li>`;
            });
            html += `</div>`;
        }); 
    }else{
        html += `<div class="main-city">
        <li class="bg-whitesmoke d-flex align-items-center mb-1"><span class="pl-2">No City</span><i class="fas fa-angle-right fa-2x bg-lightgray px-2 ml-auto"></i></li>    
        </div>`;
    }
    $("ul#citylist").append(html);
};

/* classified html manipulate */
function classifiedHtml(data){
    let html = "";
    $("div#classified-list").html("");
    if(data.length > 0){
        data.forEach((classified) =>{
          html += `<div class="d-flex flex-column border my-2">
          <div class="img_title d-flex p-1">
              <div class="image" style="width: 200px;">
                  <img src="/img/${classified.image}" class="img-fluid img-thumbnail" alt="image">
              </div>
              <div class="title p-2">
                  <p class="font-weight-bold text-limegreen mb-2">${classified.title}</p>
                  <p class="mb-0 mb-md-1"><i class="fas fa-envelope text-limegreen mr-2"></i>${classified.email}</p>
                  <p class="mb-0 mb-md-1"><i class="fas fa-globe text-limegreen mr-2"></i>${classified.website}</p>
                  <p class="mb-0"><i class="fas fa-phone text-limegreen mr-2"></i>${classified.mobile || "9876543210"}</p>
              </div>  
          </div>
          <div class="description px-2">
              <p class="mb-1">${classified.description}</p>
              <p class="mb-1"><i class="fas fa-map-marker-alt text-limegreen mr-2"></i>${titleCase(classified.city)} <i class="fas fa-th-large text-limegreen ml-5 mr-2"></i>${titleCase(classified.subcategory)}</p>
          </div>
      </div>`;
        });
    }else{
         html += `<div class="jumbotron mt-4">
         <h1 class="display-5">No Classified in this category or city.</h1>
       </div>`;
    }
    $("div#classified-list").append(html);
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