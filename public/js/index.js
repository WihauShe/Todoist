$(function(){
  var $newItemButton=$('#newItemButton');
  var $newItemForm=$('#newItemForm');

  $newItemButton.show();
  $newItemForm.hide();
  $('#showForm').click(function(){
    $newItemButton.hide();
    $newItemForm.show();
  });
  $('#addList').click(function(){
    $newItemButton.show();
    $newItemForm.hide();
  });

  $(".a_list").bind("contextmenu",function(){
      return false;
  });

  $("#delList").bind("contextmenu",function () {
      return false;
  });

  $(".a_list").mousedown(function (e) {
      if (e.which===3)
      {
          var x = e.pageX;
          var y = e.pageY;
          $("#delList").css({ 'top': y + 'px', 'left': x + 'px', 'display': 'block', 'position': 'absolute' });
      }
  });
  $('#delList').click(function(){
    $('#delList').css({'display':'none'});
  });
  $('body').click(function(){
      $('#delList').css({'display':'none'});
  });
});
