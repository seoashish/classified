$(document).ready(function(){

    dataTable();
    editUser();
    deleteUser();

});  // document ready function end


// dataTable function
function dataTable(){
  let userTable =  $("#myUsers").DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": {
       "url": "/a/users",
       "type": "POST"
    },
    "columns": [ 
     { "data": "firstname",
       "render": function( data, type, row, meta){
           if( data == ""){
               return "N/A";
           }else{
               return data;
           }
     }},
     { "data": "username" },
     { "data": "isAdmin",
       "searchable": false,
       "render": function( data, type, row, meta ){
          if(data){
              return `<span class="badge badge-pill badge-success">Admin</span>`;
          }else{
              return `<span class="badge badge-pill badge-warning">User</span`;
          }
     }},
     { "data": "isActive",
       "searchable": false,
       "render": function( data, type, row, meta ){
          if(data){
              return `<span class="badge badge-pill badge-success">Acitve</span>`;
          }else{
              return `<span class="badge badge-pill badge-danger">Inactive</span>`;
          }
     }},
     { "data": "_id", 
       "orderable": false,  
       "searchable": false,
       "render": function ( data, type, row, meta ) {
        return `<a class="text-secondary pr-3 edit" href="javascript:void(0)" data-toggle="modal" data-userid="${data}"><i class="fas fa-edit"></i></a>
                <a class="text-secondary pr-3 delete" href="javascript:void(0)" data-toggle="modal" data-userid="${data}"><i class="fas fa-trash-alt"></i></a>`;
      }}
    ]
  });
};


/* function modal editUser */
function editUser(){
    $("#myUsers").on("click", "a.edit", function(e){
        var userId = $(this).data("userid");
        var modal = $("#editUser");
        
        let html01 = `<input type="hidden" name="userId" value="${userId}">
                        <div class="form-group">
                            <label for="role">Role:</label>
                            <select class="form-control" name="isAdmin">
                              <option value="false">User</option>
                              <option value="true">Admin</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="role">Status:</label>
                            <select class="form-control" name="isActive">
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </select>
                        </div> `;
        modal.find("#e-inputUser").html("");
        modal.find("#e-inputUser").append(html01);
        modal.modal('show');
        
    });
};

/* function modal deleteUser */
function deleteUser(){
    $("#myUsers").on("click", "a.delete", function(e){
        let userId = $(this).data("userid");
        let modal = $("#deleteUser");
        modal.find("#deleteForm").html("");
        modal.find("#deleteForm").append(`<input type="hidden" name="userId" value="${userId}">`);

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