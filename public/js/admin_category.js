$(document).ready(function(){

viewCategory();  
addCategory();  
editCategory();
deleteCategory();

/* calling addCategoryValidation function */
addCategoryValidation();
/* calling editCategoryValidation function */
editCategoryValidation();

addInputField();  
editInputField();
   

}); // document ready function end

/* function modal viewCategory */
function viewCategory(){
    $("a.view").on("click", function(e){
        var categoryId = $(this).data("catid");
        var modal = $("#viewCategory");
        
        $.ajax({
            type: "POST",
            url: "/a/category",
            data: { catId: categoryId},
            dataType: "json",
            success: function(data){
              var html = `<h5>Category:</h5><ul><li>${titleCase(data.category)}</li></ul>`;
              html += `<h5>Subcategory:</h5><ol>`;
              data.subcategory.forEach((element) =>{
              html += `<li>${titleCase(element)}</li>`;
              });
              html += `</ol>`;
              modal.find("#myForm").html("");
              modal.find("#myForm").append(html);
              modal.modal('show');
            }
        });
    });
};

/* function modal addCategory */
function addCategory(){
  $("a.addCat").on("click", function(e){
    var modal = $("#addCategory");
    modal.modal('show'); 

  });
};

/* function modal editCategory */
function editCategory(){
    $("a.edit").on("click", function(e){
        var categoryId = $(this).data("catid");
        var modal = $("#editCategory");
        
        $.ajax({
            type: "POST",
            url: "/a/category",
            data: { catId: categoryId},
            dataType: "json",
            success: function(data){
              let html01 = `<input type="hidden" name="catId" value="${ categoryId }">
              <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Category:</span>
              </div>
              <input type="text" readonly class="form-control" id="ecategory" name="ecategory" value="${ data.category }">
              </div>`;
        
              let counter = 0, html02 = "";
              data.subcategory.forEach((element) =>{
                if(counter == 0){
                    html02 +=  `<div class="input-group mt-2 mb-1">
                    <input type="text" class="form-control esubcat" name="esubcat" placeholder="Subcategory" value="${element}" autocomplete="off">
                    </div>`;
                }else if( counter == 1){
                    html02 += `<div class="input-group my-1">
                    <input type="text" class="form-control esubcat" name="esubcat" placeholder="Subcategory" value="${element}" autocomplete="off">
                    </div>`;
                }else{
                    html02 += `<div class="input-group my-1">
                    <input type="text" class="form-control esubcat" name="esubcat" placeholder="Subcategory" value="${element}" autocomplete="off">
                    <div class="input-group-append">
                    <button class="btn btn-secondary removeclass" type="button">x</button>
                    </div>
                    </div>`;
                }
                counter++;
              });
              modal.find("#editInputCat").html("");
              modal.find("#editInputCat").append(html01);
              modal.find("#editInputsWrapper").html("");
              modal.find("#editInputsWrapper").append(html02);
              modal.modal('show');
            }
        });

    });
};

/* function modal deleteCategory */
function deleteCategory(){
    $("a.delete").on("click", function(e){
        var categoryId = $(this).data("catid");
        var modal = $("#deleteCategory");
        modal.find("#deleteForm").html("");
        modal.find("#deleteForm").append(`<input type="hidden" name="catId" value="${categoryId}">`);

        modal.modal('show');
   
    
      });
};

/* function add subcategory input field */
function addInputField(){
    let MaxInputs = 20; // maximum input boxes allowed
    let InputsWrapper = $("#InputsWrapper"); // Input boxes wrapperId
    let AddMoreFileId = $("#addMoreFileId"); 
    let AddButton = $("#AddMoreFileBox"); // Add button Id
    let x = InputsWrapper.children().length; // initial text box count
    let FieldCount = 1; // to keep track of text box added

    $(AddButton).on("click", function(){
        x = InputsWrapper.children().length;
     // max input box allowed
     if(x <= MaxInputs){
         FieldCount++; // text box added increment

         // add input box
         $(InputsWrapper).append(`<div class="input-group my-1">
         <input type="text" class="form-control isubcat" name="isubcat" placeholder="Subcategory" autocomplete="off">
         <div class="input-group-append">
         <button class="btn btn-secondary removeclass" type="button">x</button>
         </div>
         </div>`);

         x++; // text box increment
         $(AddMoreFileId).show();

         // Delete the "add" link if there is 3 fields.
         if(x == MaxInputs){
           $(AddMoreFileId).hide();
         }
     }
     return false;
    });

    $(InputsWrapper).on("click", ".removeclass", function(e){
        x = InputsWrapper.children().length;
       // user click on x icon 
       if(x > 0){
           $(this).parent().parent('div').remove(); // remove text box
           x--; // decrement text box

           $(AddMoreFileId).show();

           // Add the "add" link again when a field is removed
       }
       return false;
    });

};

/* function add subcategory input field in edit cateogry form */
function editInputField(){
    let MaxInputs = 20; // maximum input boxes allowed
    let InputsWrapper = $("#editInputsWrapper"); // Input boxes wrapperId
    let AddMoreFileId = $("#e-addMoreField"); 
    let AddButton = $("#e-addMoreBox"); // Add button Id
    let x = InputsWrapper.children().length; // initial text box count
    let FieldCount = 1; // to keep track of text box added

    $(AddButton).on("click", function(){
        x = InputsWrapper.children().length;
     // max input box allowed
     if(x <= MaxInputs){
         FieldCount++; // text box added increment

         // add input box
         $(InputsWrapper).append(`<div class="input-group my-1">
         <input type="text" class="form-control isubcat" name="esubcat" placeholder="Subcategory" autocomplete="off">
         <div class="input-group-append">
         <button class="btn btn-secondary removeclass" type="button">x</button>
         </div>
         </div>`);

         x++; // text box increment
         $(AddMoreFileId).show();

         // Delete the "add" link if there is 3 fields.
         if(x == MaxInputs){
           $(AddMoreFileId).hide();
         }
     }
     return false;
    });

    $(InputsWrapper).on("click", ".removeclass", function(e){
        x = InputsWrapper.children().length;
       // user click on x icon 
       if(x > 0){
           $(this).parent().parent('div').remove(); // remove text box
           x--; // decrement text box

           $(AddMoreFileId).show();

           // Add the "add" link again when a field is removed
       }
       return false;
    });

};

/* function add category form validation */
function addCategoryValidation(){
     $("#categorycheck").hide();
     $("#subcatcheck").hide();

     let category_err = true;
     let subcat_err = true;

     $("#icategory").on("keyup", function(){
            category_check();
     });

     function category_check(){
      var category_val = $("#icategory").val();

      // check category is empty
      if(category_val == ""){
        $("#categorycheck").show(); 
        $("#categorycheck").html("** Please fill the category.");
        $("#categorycheck").css("color", "red");
        category_err = false;
        return false;
      }else{
        $("#categorycheck").hide();
      }

      // check category length
      if(category_val.length <= 2 || category_val.length >= 25){
        $("#categorycheck").show(); 
        $("#categorycheck").html("** Category length must be greater than 2 char and less than 25 char.");
        $("#categorycheck").css("color", "red");
        category_err = false;
        return false;
      }else{
        $("#categorycheck").hide();
      }
      
      // check category exist or not in database using AJAX
      $.ajax({
        type: "POST",
        url: "/a/category/one",
        data: { query: { category: category_val.toLowerCase() }},
        dataType: "json",
        success: function(data){
            if(data.isExist){
                $("#categorycheck").show(); 
                $("#categorycheck").html("** Category already exist in database.");
                $("#categorycheck").css("color", "red");
                category_err = false;
                return false;
              }else{
                $("#categorycheck").hide();
              }
        }
    });
    };

     $("#InputsWrapper").on("keyup", ".isubcat", function(){
          subcat_check($(this));
     });

     function subcat_check(element){
        let subcatArr = $(".isubcat");
        let subcatval = [];
        for(let i = 0; i < subcatArr.length; i++){
             subcatval.push(subcatArr[i].value.toLowerCase());
            // check every subcategory field is empty
            if(subcatArr[i].value == ""){
                $("#subcatcheck").show();
                $("#subcatcheck").html("** Please fill the every subcategory field.");
                $("#subcatcheck").css("color", "red");
                subcat_err = false;
                return false;
            }else{
                $("#subcatcheck").hide();
            }

            // check every subcategory greater than and less than particular length
            if(subcatArr[i].value.length <= 2 || subcatArr[i].value.length >= 25 ){
                $("#subcatcheck").show();
                $("#subcatcheck").html("** Every subcategory must be greater than 2 char and less than 25 char.");
                $("#subcatcheck").css("color", "red");
                subcat_err = false;
                return false;
            }else{
                $("#subcatcheck").hide();
            } 
        }
        //console.log(subcatval);
        // check every subcategory is unique
        if(!checkIfArrayIsUnique(subcatval) ){
            $("#subcatcheck").show();
            $("#subcatcheck").html("** Every subcategory must be unique.");
            $("#subcatcheck").css("color", "red");
            subcat_err = false;
            return false;
        }else{
            $("#subcatcheck").hide();
        }
        
         
     };

     $("#iaddcategory").on("click", function(){
             category_err = true;
             subcat_err = true;

             // call function
             category_check();
             subcat_check($(this));

             if(category_err && subcat_err){
                 return true;
             }else{
                 return false;
             }
     });
};

/* function edit category form validation */
function editCategoryValidation(){
    $("#e-subcatcheck").hide();
    let subcat_err = true;

    $("#editInputsWrapper").on("keyup", ".esubcat", function(){
        edit_subcat_check($(this));
    });

    function edit_subcat_check(element){
        let subcatArr = $(".esubcat");
        let subcatval = [];
        for(let i = 0; i < subcatArr.length; i++){
             subcatval.push(subcatArr[i].value.toLowerCase());
            // check every subcategory field is empty
            if(subcatArr[i].value == ""){
                $("#e-subcatcheck").show();
                $("#e-subcatcheck").html("** Please fill the every subcategory field.");
                $("#e-subcatcheck").css("color", "red");
                subcat_err = false;
                return false;
            }else{
                $("#e-subcatcheck").hide();
            }

            // check every subcategory greater than and less than particular length
            if(subcatArr[i].value.length <= 2 || subcatArr[i].value.length >= 25 ){
                $("#e-subcatcheck").show();
                $("#e-subcatcheck").html("** Every subcategory must be greater than 2 char and less than 25 char.");
                $("#e-subcatcheck").css("color", "red");
                subcat_err = false;
                return false;
            }else{
                $("#e-subcatcheck").hide();
            } 
        }
        //console.log(subcatval);
        // check every subcategory is unique
        if(!checkIfArrayIsUnique(subcatval) ){
            $("#e-subcatcheck").show();
            $("#e-subcatcheck").html("** Every subcategory must be unique.");
            $("#e-subcatcheck").css("color", "red");
            subcat_err = false;
            return false;
        }else{
            $("#e-subcatcheck").hide();
        }
    };

    $("#ieditcategory").on("click", function(){
        subcat_err = true;

        // call function
        edit_subcat_check($(this));

        if(subcat_err){
            return true;
        }else{
            return false;
        }
});

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

/* check if an array contains duplicate values */
function checkIfArrayIsUnique(arr){
    arr.sort();
    for ( var i = 1; i < arr.length; i++ ){
        if(arr[i-1] == arr[i])
            return false;
    }
    return true;
}