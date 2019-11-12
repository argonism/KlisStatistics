
// number: title
function SetAutoComplete(subjects_tpl) {
  let result_area = $("#search_result")
  result_area.empty();

  for (let [key, value] of Object.entries(subjects_tpl)) {

    let line = $("<li></li>").addClass("candidate");
    line.text(value);
    line.attr('name', key);
    $("#search_result").append(line);
  };
}

$('#search_title').on('click',function(){
  if ($(".main").css('background-color') === 'rgba(0, 0, 0, 0)') {
    $(".main").toggleClass('blur');
  }
  $(this).val('')
});

$('#search_title').on('blur',function(){
  $(".main").toggleClass('blur')
});

$('.main').on('click', function() {
  $("#search_result").css('display', "");
  if ($(".main").css('background-color') !== 'rgba(0, 0, 0, 0)') {
    $(".main").toggleClass('blur')
  }
});

$(document).on('click', '.candidate', function() {
  let subj_num = $(this).attr("name");
  let subj_title = $(this).text()
  $('#search_title').val($(this).text());
  // $('.main > h2').text(subj_title)
  DrawPieChartFromNumber( subj_num )
  DrawAreaChartFromNumber(subj_num, 0);
  $("#search_result").css('display', "");
});


