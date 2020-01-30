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

// 1: distri, 2: evalu
function SetDenominator(graphs, subj_id) {
  distri_denominator = graphs[0].GetSubjectFromID(subj_id)["履修者数"];
  evalu_denominator = graphs[1].GetSubjectFromID(subj_id)["回答者数"]
  if (!evalu_denominator) {
    evalu_denominator = graphs[1].GetSubjectFromID(subj_id)["回答者"]
  }

  $(".pie_wrapper .denominator").text("履修者数: " + String(distri_denominator))
  $(".graph_wrapper .denominator").text("回答者数: " + String(evalu_denominator))
}

function InitYearSelect() {
  let years = ['2018', '2017', '2016', '2015', '2014'];

  years.forEach(year => {
    let list_child = $('<option></option>').html(year)
    $('#year select').append(list_child)
  })
}

$('#year_txt').on('click',function(){ 
  $('#year ul').toggleClass('display_block');
});

// フォームクリック時に背景をぼかして空にする。
$('#search_title').on('click',function(){
  if (!$(".main").hasClass('blur')) {
    $(".main").toggleClass('blur');
  }
  $(this).val('')
});

// フォームクリック以外をクリック背景を戻して空にする。
$('.main').on('click', function() {
  $("#search_result").css('display', "");
  if ($(".main").hasClass('blur')) {
    $(".main").toggleClass('blur')
  }
});

// [distri, evalu]
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

    SetDenominator(graphs, subj_num);

    // 背景のぼかしを消す
    $("#search_result").css('display', "");
    if ($(".main").hasClass('blur')) {
      $(".main").toggleClass('blur')
    }
  });
}


