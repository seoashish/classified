$(document).ready(function() {
  
 // call dataTable
 dataTable();
 viewClassified();
 editClassified();
 deleteClassified();

});  // end document ready function
 
// DataTable function
function dataTable(){
    const table =  $('#myTable').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
           "url": "/a/classified",
           "type": "POST"
       },
       "order": [[ 1, "asc" ]],
       "columns":[
           { "data": "image", 
             "orderable": false,  
             "searchable": false,
             "render": function ( data, type, row, meta ) {
               return `<img src="/img/${data}" width="50" height="40"></img>`;
             } },
           { "data": "title"},
           { "data": "category"},
           { "data": "city"},
           { "data": "status", 
             "searchable": false,
             "render": function ( data, type, row, meta ) {
                 if(data == "active"){
                     return `<span class="badge badge-pill badge-success">Active</span>`;
                 }else if( data == "pending"){
                     return `<span class="badge badge-pill badge-warning">Pending</span>`;
                 }else if( data == "banned"){
                     return `<span class="badge badge-pill badge-danger">Banned</span>`;
                 }
             } },
           { "data": "_id", 
             "orderable": false,  
             "searchable": false,
             "render": function ( data, type, row, meta ) {
               return `<a class="text-secondary pr-3 view" href="javascript:void(0)" data-toggle="modal" data-adsid="${data}"><i class="fas fa-eye"></i></a>
                       <a class="text-secondary pr-3 edit" href="javascript:void(0)" data-toggle="modal" data-adsid="${data}"><i class="fas fa-edit"></i></a>
                       <a class="text-secondary pr-3 delete" href="javascript:void(0)" data-toggle="modal" data-adsid="${data}"><i class="fas fa-trash-alt"></i></a>`;
             } },
       ]
   });
};


/* function modal editClassified */
function viewClassified(){
    $("#myTable").on("click", "a.view", function(e){
        var adsId = $(this).data("adsid");
        var modal = $("#viewClassified");

        $.ajax({
            type: "POST",
            url: "/a/classified/one",
            data: { adsId: adsId},
            dataType: "json",
            success: function(data){
              let html01 =  `<h5>Title:</h5>
                             <p>${titleCase(data.title)}</p>
                             <h5>Description:</h5>
                             <p>${data.description}</p>
                             <h5>Website:</h5>
                             <p>${data.website}</p>
                             <h5>Subcategory:</h5>
                             <p>${titleCase(data.subcategory)}</p>
                             <h5>District:</h5>
                             <p>${titleCase(data.district)}</p>`;
              modal.find("#myFom").html("");
              modal.find("#myForm").append(html01);               
              modal.modal('show');
            }
        });
    });
};


/* function modal editClassified */
function editClassified(){
    $("#myTable").on("click", "a.edit", function(e){
        var adsId = $(this).data("adsid");
        var modal = $("#editClassified");
        
        let html01 = `<input type="hidden" name="adsId" value="${adsId}">
        <div class="form-group">
        <label for="status">Status:</label>
        <select class="form-control" id="status" name="status">
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="banned">Banned</option>
        </select>
        </div> `;
        modal.find("#e-inputAds").html("");
        modal.find("#e-inputAds").append(html01);
        modal.modal('show');
        
    });
};

/* function modal deleteClassified */
function deleteClassified(){
    $("#myTable").on("click", "a.delete", function(e){
        let adsId = $(this).data("adsid");
        let modal = $("#deleteClassified");
        modal.find("#deleteForm").html("");
        modal.find("#deleteForm").append(`<input type="hidden" name="adsId" value="${adsId}">`);

        modal.modal('show');
   
    
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