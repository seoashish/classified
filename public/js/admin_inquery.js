$(document).ready(function(){
  
    dataTable();
    deleteInquery();

}); // document ready function end

// dataTable function
function dataTable(){
    let inqueryTable = $("#myInquery").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
           "url": "/a/inquery",
           "type": "POST"
        },
        "columns": [ 
         { "data": "name",
           "render": function( data, type, row, meta){
               if( data == ""){
                   return "N/A";
               }else{
                   return data;
               }
         }},
         { "data": "email" },
         { "data": "message",
           "orderable": false,
           "searchable": false,
           "width": "50%",
           "render": function( data, type, row, meta ){
              return data;
         }},
         { "data": "mobile",
           "orderable": false,  
           "searchable": false,
           "render": function( data, type, row, meta){
            if( data == ""){
                return "N/A";
            }else{
                return data;
            }
         }},
         { "data": "_id", 
           "orderable": false,  
           "searchable": false,
           "render": function ( data, type, row, meta ) {
            return `<a class="text-secondary pr-2 reply" href="javascript:void(0)" data-toggle="modal" data-inqid="${data}"><i class="fas fa-reply"></i></a>
                    <a class="text-secondary pr-2 view" href="javascript:void(0)" data-toggle="modal" data-inqid="${data}"><i class="fas fa-eye"></i></a>
                    <a class="text-secondary pr-2 delete" href="javascript:void(0)" data-toggle="modal" data-inqid="${data}"><i class="fas fa-trash-alt"></i></a>`;
          }}
        ]
    });
};

/* function modal deleteInquery */
function deleteInquery(){
    $("#myInquery").on("click", "a.delete", function(e){
        let inqId = $(this).data("inqid");
        let modal = $("#deleteInquery");
        modal.find("#deleteForm").html("");
        modal.find("#deleteForm").append(`<input type="hidden" name="inqId" value="${inqId}">`);

        modal.modal('show');
   
    
      });
};