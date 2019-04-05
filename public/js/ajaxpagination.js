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
  alert("ajax is call");
  getData();
  getPageNo(page_no);
  getCity();
  getCategory();
  getSort();
  getPageLimit(); 
  manipulateDOM();
});


/* All function defination below */
function getCity(){
    /* get city value when it's clicked */
    $("div.sub-city > li").on("click", function(){
        city = $(this).children("span").data("subcity");
        alert(city +" is clicked");
        /* ajax call below */
    });
};

function getCategory(){
    /* get category value when it's clicked */
    $("div.sub-category > li").on("click", function(){
        category = $(this).children("span").data("subcategory");
        alert(category +" is clicked!");
        /* ajax call below */
    });
};

function getSort(){
    /* get sort-by value when it's value is change */
    $("#sort-by").on("change", function(){
        sort_by = $(this).children("option:selected").val();
        alert("Sort By " + sort_by);
        /* ajax call below */
    });
};

function getPageLimit(){
    /* get page-limit value when it's value is change */
    $("#page-limit").on("change", function(){
        page_limit = $(this).children("option:selected").val();
        page_limit = parseInt(page_limit);
        alert("Page Limit is " + page_limit);
        /* ajax call below */
    });
};

function getPageNo(pageNo){
page_no = parseInt(pageNo);
/* ajax call below */
getData();

};


function manipulateDOM(){
    /* Category accordion */
    $("div.main-category").on("click", function(){
        $(this).find("li > i").toggleClass("fa-angle-right").toggleClass("fa-angle-down");
        $(this).next("div.sub-category").toggleClass("show");
    });



    /* City accordion */
    $("div.main-city").on("click", function(){
        $(this).find("li > i").toggleClass("fa-angle-right fa-angle-down");
        $(this).next().toggleClass("show");
    });
};

/* get data using ajax */
function getData(){
    $.ajax({
        type: 'POST',
        url: '/api',
        data:{
         limit: page_limit,
         page: page_no,
         category: category,
         city: city,
         sort: sort_by
        },
        dataType: 'json',
        success: function(jsonData, textStatus){
          console.log(jsonData);
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
    console.log(total_record+" "+last_page+" "+half);
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

/* Example purpose */
let paginationHTML = `<nav aria-label="">
<ul class="pagination">
  <li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="1">Previous</a></li>
  <li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="1">1</a></li>
  <li class="page-item active"><a class="page-link" href="javascript:void(0)" data-page="2">2</a></li>
  <li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="3">3</a></li>
  <li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="1">Next</a></li>
</ul>
</nav>`;