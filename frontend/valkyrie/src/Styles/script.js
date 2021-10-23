$(document).ready(function() {
    // inspired by http://jsfiddle.net/arunpjohny/564Lxosz/1/
    $('.table-bordered').each(function (i) {
       var id = $(this).attr('id');
       //alert(id);
       $(this).find("th").each(function(i) {
          $('#'+id + ' td:nth-child(' + (i + 1) + ')').prepend('<span class="table-bordered-thead">'+             $(this).text() + ':</span> ');
          $('.table-bordered-thead').hide();
          
       });
       
 
       
    });
 
    
    
    
    
 $( '.table-bordered' ).each(function() {
   var thCount = $(this).find("th").length; 
    var rowGrow = 100 / thCount + '%';
    //console.log(rowGrow);
    $(this).find("th, td").css('flex-basis', rowGrow);   
 });
    
    
    
    
 function flexTable(){
    if ($(window).width() < 768) {
       
    $(".table-bordered").each(function (i) {
       $(this).find(".table-bordered-thead").show();
       $(this).find('thead').hide();
    });
       
     
    // window is less than 768px   
    } else {
       
       
    $(".table-bordered").each(function (i) {
       $(this).find(".table-bordered-thead").hide();
       $(this).find('thead').show();
    });
       
       
 
    }
 // flextable   
 }      
  
 flexTable();
    
 window.onresize = function(event) {
     flexTable();
 };
    
    
    
    
 
   
 // document ready  
 });