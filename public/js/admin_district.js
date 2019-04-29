$(document).ready(function(){

    viewDistrict();  
    addDistrict();  
    editDistrict();
    deleteDistrict();
    
    /* calling addDistrictValidation function */
    addDistrictValidation()
    /* calling editCategoryValidation function */
    //editCategoryValidation()

    /* call input field add function */
    editInputField();
    addInputField(); 
}); // document ready function end

/* function modal viewDistrict */
function viewDistrict(){
    $("a.view").on("click", function(e){
        var districtId = $(this).data("distid");
        var modal = $("#viewDistrict");
        
        $.ajax({
            type: "POST",
            url: "/a/district",
            data: { distId: districtId},
            dataType: "json",
            success: function(data){
              var html = `<h5>District:</h5><ul><li>${titleCase(data.name)}</li></ul>`;
              html += `<h5>City:</h5><ol>`;
              data.city.forEach((element) =>{
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

/* function modal addDistrict */
function addDistrict(){
    $("a.addDist").on("click", function(e){
      var modal = $("#addDistrict");
      modal.modal('show');
    
  
    });
};


/* function modal editDistrict */
function editDistrict(){
    $("a.edit").on("click", function(e){
        var distId = $(this).data("distid");
        var modal = $("#editDistrict");
        
        $.ajax({
            type: "POST",
            url: "/a/district",
            data: { distId: distId},
            dataType: "json",
            success: function(data){
              let html01 = `<input type="hidden" name="distId" value="${ distId }">
              <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">District:</span>
              </div>
              <input type="text" readonly class="form-control" id="e-district" name="e-district" value="${ data.name }">
              </div>`;
        
              let counter = 0, html02 = "";
              data.city.forEach((element) =>{
                if(counter == 0){
                    html02 +=  `<div class="input-group mt-2 mb-1">
                    <input type="text" class="form-control e-city" name="e-city" placeholder="City" value="${element}" autocomplete="off">
                    </div>`;
                }else if( counter == 1){
                    html02 += `<div class="input-group my-1">
                    <input type="text" class="form-control e-city" name="e-city" placeholder="City" value="${element}" autocomplete="off">
                    </div>`;
                }else{
                    html02 += `<div class="input-group my-1">
                    <input type="text" class="form-control e-city" name="e-city" placeholder="City" value="${element}" autocomplete="off">
                    <div class="input-group-append">
                    <button class="btn btn-secondary removeclass" type="button">x</button>
                    </div>
                    </div>`;
                }
                counter++;
              });
              modal.find("#e-inputDist").html("");
              modal.find("#e-inputDist").append(html01);
              modal.find("#e-inputcity").html("");
              modal.find("#e-inputcity").append(html02);
              modal.modal('show');
            }
        });
    });
};

/* function modal deleteDistrict */
function deleteDistrict(){
    $("a.delete").on("click", function(e){
        var distId = $(this).data("distid");
        var modal = $("#deleteDistrict");
        modal.find("#deleteForm").html("");
        modal.find("#deleteForm").append(`<input type="hidden" name="distId" value="${distId}">`);

        modal.modal('show');
   
    
      });
};

/* function add city input field */
function addInputField(){
    let MaxInputs = 40; // maximum input boxes allowed
    let InputsWrapper = $("#a-cityWrapper"); // Input boxes wrapperId
    let AddMoreFileId = $("a-addMoreField"); 
    let AddButton = $("#a-addBox"); // Add button Id
    let x = InputsWrapper.children().length; // initial text box count
    let FieldCount = 1; // to keep track of text box added

    $(AddButton).on("click", function(){
        x = InputsWrapper.children().length;
     // max input box allowed
     if(x <= MaxInputs){
         FieldCount++; // text box added increment

         // add input box
         $(InputsWrapper).append(`<div class="input-group my-1">
         <input type="text" class="form-control a-city" name="a-city" placeholder="City" autocomplete="off">
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

/* function add city input field in edit district form */
function editInputField(){
    let MaxInputs = 40; // maximum input boxes allowed
    let InputsWrapper = $("#e-inputcity"); // Input boxes wrapperId
    let AddMoreFileId = $("#e-addMoreField"); 
    let AddButton = $("#e-addBox"); // Add button Id
    let x = InputsWrapper.children().length; // initial text box count
    let FieldCount = 1; // to keep track of text box added

    $(AddButton).on("click", function(){
      x = InputsWrapper.children().length;
      //alert(x)
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
        //alert(x)
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

/* function add district form validation */
function addDistrictValidation(){
    $("#distcheck").hide();
    $("#citycheck").hide();

    let district_err = true;
    let city_err = true;

    $("#a-district").on("keyup", function(){
           district_check();
    });

    function district_check(){
     var district_val = $("#a-district").val();

     // check district is empty
     if(district_val == ""){
       $("#distcheck").show(); 
       $("#distcheck").html("** Please fill the district.");
       $("#distcheck").css("color", "red");
       district_err = false;
       return false;
     }else{
       $("#distcheck").hide();
     }

     // check district length
     if(district_val.length <= 2 || district_val.length >= 25){
       $("#distcheck").show(); 
       $("#distcheck").html("** District length must be greater than 2 char and less than 25 char.");
       $("#distcheck").css("color", "red");
       district_err = false;
       return false;
     }else{
       $("#distcheck").hide();
     }
     
     // check district exist or not in database using AJAX
     $.ajax({
       type: "POST",
       url: "/a/district/one",
       data: { query: { name: district_val.toLowerCase() }},
       dataType: "json",
       success: function(data){
           if(data.isExist){
               $("#distcheck").show(); 
               $("#distcheck").html("** District already exist in database.");
               $("#distcheck").css("color", "red");
               district_err = false;
               return false;
             }else{
               $("#distcheck").hide();
             }
       }
   });
   };

    $("#a-cityWrapper").on("keyup", ".a-city", function(){
         city_check($(this));
    });

    function city_check(element){
       let cityArr = $(".a-city");
       let city_val = [];
       for(let i = 0; i < cityArr.length; i++){
            city_val.push(cityArr[i].value.toLowerCase());
           // check every city field is empty
           if(cityArr[i].value == ""){
               $("#citycheck").show();
               $("#citycheck").html("** Please fill the every city field.");
               $("#citycheck").css("color", "red");
               city_err = false;
               return false;
           }else{
               $("#citycheck").hide();
           }

           // check every city greater than and less than particular length
           if(cityArr[i].value.length <= 2 || cityArr[i].value.length >= 25 ){
               $("#citycheck").show();
               $("#citycheck").html("** Every city must be greater than 2 char and less than 25 char.");
               $("#citycheck").css("color", "red");
               city_err = false;
               return false;
           }else{
               $("#citycheck").hide();
           } 
       }
       console.log(city_val);
       // check every city is unique
       if(!checkIfArrayIsUnique(city_val) ){
           $("#citycheck").show();
           $("#citycheck").html("** Every city must be unique.");
           $("#citycheck").css("color", "red");
           city_err = false;
           return false;
       }else{
           $("#citycheck").hide();
       }
       
        
    };

    $("#a-addDistrict").on("click", function(){
            district_err = true;
            city_err = true;

            // call function
            district_check();
            city_check($(this));

            if(district_err && city_err){
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