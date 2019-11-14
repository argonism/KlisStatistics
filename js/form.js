//subjects_tpl: {number: title}
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

// フォームクリック時に背景をぼかして空にする。
$('#search_title').on('click',function(){
  if (!$(".main").hasClass('blur')) {
    $(".main").toggleClass('blur');
  }
  $(this).val('')
});

// フォームクリック以外をクリック背景をぼかして空にする。
$('.main').on('click', function() {
  $("#search_result").css('display', "");
  if ($(".main").hasClass('blur')) {
    $(".main").toggleClass('blur')
  }
});

function InitSuggest(graphs) {

  // 検索候補クリック時にグラフを再描写するためのリスナー
  $(document).on('click', '.candidate', function() {
    let subj_num = $(this).attr("name");
    let subj_title = $(this).text()
    $('#search_title').val($(this).text());

    // 各グラフを再描写
    graphs.forEach(graph => {
      graph.ReloadFromNumber(subj_num);
    });

    // 背景のぼかしを消す
    $("#search_result").css('display', "");
    if ($(".main").hasClass('blur')) {
      $(".main").toggleClass('blur')
    }
  });
}


