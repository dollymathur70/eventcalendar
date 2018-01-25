function show() {

    $.get('/showevent',{},function (data) {
        $('#eventlist').html('<hr>');
        i=data.length;
        for(var i=0;i<data.length;i++) {

            number = data[i].serial;
            $('#eventlist').append("<li id='" + data[i].serial + "'><span class='col-md-2'>" +
                data[i].date  + "/" +
                data[i].month + "/" +
                data[i].year + "</span><span class='col-md-1'> : </span><span style='float: left' class='col-md-8'>" +
                data[i].event +
                "</span><span class='col-md-1'><button id='cross' class='btn btn-warning' onclick='delete_clicked(" + data[i].serial + ")'>Delete</button></span></li><hr>");
        }
    })
}

function delete_clicked(n) {
    $.post('/delete',{s : n},function (data) {
        show();
    })
}

$(function () {
    var serial=1;

  $('#add_event').click(function(){
      if($('#selectdate').val() && $('#selectmonth').val() && $('#selectyear').val() && $('#event').val()) {
          obj = {
              s: serial,
              d: $('#selectdate').val(),
              m: $('#selectmonth').val(),
              y: $('#selectyear').val(),
              e: $('#event').val()
          }

          serial++;

          $.post('/addevent', obj, function (data) {
              show();
          })
      }
      else {
          window.alert('Fill complete details');
      }
  });

   show();


});
