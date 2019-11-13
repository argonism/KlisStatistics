function CSVtoHash(csv) {
  var csvData = [];
  var lines = csv.split("\n");
  var names = lines[0].split(",");
  for (var i = 1; i < lines.length; ++i) {
    var line = lines[i].split(",")
    var temp_hash = {};
    for (var j = 0; j < line.length; ++j) {
      temp_hash[names[j]] = line[j]
    }
    csvData.push(temp_hash);
  }
  return csvData;
}

function GetCSV(file_name) {
  var txt = new XMLHttpRequest();
  txt.open('get', 'data/' + file_name + ".csv", false);
  txt.send();

  var csv_txt = txt.responseText;
  return csv_txt
}

var distr_pie;
// var distr_ids;
function DrawPieChart(subject) {
  if(typeof distr_pie === 'undefined') {
    distr_pie = c3.generate({
      bindto: '#pie',
      size: {
        height: pie_size,
        width: pie_size
      },
      data: {
          columns: subject,
          colors: {
            'A+': '#FCCA46',
            'A': '#FE7F2D',
            'B': '#A1C181',
            'C': '#619B8A',
            'D': '#233D4D',
          },
          color: function (color, d) {
            // d will be 'id' when called for legends
            return d.id && d.id === 'data3' ? d3.rgb(color).darker(d.value / 150) : color;
          },
          type : 'pie',
          order: null,
          // onclick: function (d, i) { console.log("onclick", d, i); },
          // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          // onmouseout: function (d, i) { console.log("onmouseout", d, i); },
      },
      pie: {
        label: {
          color: "#333",
        }
      },
      donut: {
        title: "成績分布"
      }
    });
  } else {
    distr_pie.unload({
      ids: ['A+', 'A', 'B', 'C', 'D']
    });
    setTimeout(function () {
      distr_pie.load({
        columns: subject,
      });
  }, 250);
  }
}

var eval_questiontitles = ['問1', '問2', '問3', '問4', '問8', '問9', '問10', '問11', '問12', '問13', '問14', '問15', '問16', '問17']
var eval_questions = [
  "授業の準備は十分にされていたと思いますか。",
  "教員の説明や授業の進め方は適切でしたか。",
  "授業を通じて、この科目に関連する分野への興味や関心が高まりましたか。",
  "総合的に判断して、この授業を受講してよかったと思いますか。",
  "私はこの科目にはもともと興味があった。",
  "私はこの授業の予習・復習・課題のために授業外で相当時間の学習を行った。",
  "この授業はシラバスに沿って計画的に行われていた。",
  "授業担当者の話し方は聞き取りやすかった。",
  "この授業で使われた教科書，配布資料は適切であった。",
  "この授業における黒板，ビデオ，パソコンなどの使い方は効果的であった。",
  "この授業では学期途中に学生の意見・要望が適切に収集された。",
  "この授業の内容はよく理解できた。",
  "この授業により，新しい知識や考え方が修得できた。",
  "この授業により，さらに深く勉強したくなった。"
]

var evalu_graph;
var evalu_ids = [];
function DrawAreaChart(subject1, subject2) {
  if(typeof evalu_graph === 'undefined') {
    evalu_graph = c3.generate({
        bindto: '#graph',
        size: {
          width: graph_size[0],
          height: graph_size[1],
        },
        data: {
          columns: [subject1, subject2],
          type: 'area-spline',
          onmouseover: function (d) {
            $("#question_txt").text(eval_questions[d.index]);
          },
          empty: {
            label: {
              // text: "No Data"
            }
          }
        },
        axis: {
          x: {
              type: 'category',
              categories: eval_questiontitles
          },
          y: {
              max: 4.0,
              min: 2.0,
          }
        }
    });
  } else {
    evalu_graph.unload({
      ids: evalu_ids[0],
    });
    evalu_graph.unload({
      ids: evalu_ids[1],
    });
    if(typeof subject1 !== 'undefined' && typeof subject2 !== 'undefined') {
      setTimeout(function () {
        evalu_graph.load({
          columns: [subject1, subject2]
          });
      }, 400);
      evalu_ids[0] = subject1[0];
      evalu_ids[1] = subject2[0];
      $("#question_txt").text("");
    } else {
      $("#question_txt").text("No Data");
    }
  }

}

function DistrShapeHash2Array(hash) {
  return [
    [ "A+", hash["A+dig"]],
    [ "A", hash["A_dig"]],
    [ "B", hash["B_dig"]],
    [ "C", hash["C_dig"]],
    [ "D", hash["D_dig"]],
  ]
}

function EvaluShapeHash2Array(hash) {
  return [
    hash['科目名称'],
    hash['問1'],
    hash['問2'],
    hash['問3'],
    hash['問4'],
    hash['問8'],
    hash['問9'],
    hash['問10'],
    hash['問11'],
    hash['問12'],
    hash['問13'],
    hash['問14'],
    hash['問15'],
    hash['問16'],
    hash['問17'],
  ]
}

function EvaluCalcAvelage(subject) {
  var arrays = []
  subject.map( hash => {
    var formatted = [ hash['問1'],
                      hash['問2'],
                      hash['問3'],
                      hash['問4'],
                      hash['問8'],
                      hash['問9'],
                      hash['問10'],
                      hash['問11'],
                      hash['問12'],
                      hash['問13'],
                      hash['問14'],
                      hash['問15'],
                      hash['問16'],
                      hash['問17'] ]

    arrays.push(formatted);
  })

  sum = Array(arrays[0].length);
  sum.fill(0);
  arrays.map( one => {
    if (typeof one[0] === "undefined") {
    } else {
      for (i = 0; i < one.length; i++) {
        // console.log(one)
        sum[i] += Number.parseFloat(one[i])
      }
    }
  })

  average = sum.map(one => (Math.round(one / arrays.length * 100) / 100).toString());
  return average
}

const distr_txt = GetCSV("2018_distribution");
const evalu_txt = GetCSV("2018_evaluation_formatted");
const distr_subjects = CSVtoHash(distr_txt);
const evalu_subjects = CSVtoHash(evalu_txt);
const eval_ave = EvaluCalcAvelage(evalu_subjects);
eval_ave.unshift("平均");

// 授業評価 -> 番号 : 科目
const eval_num_subj = {}
evalu_subjects.map( subject => {
  eval_num_subj[subject['科目番号']] = subject
})

// 成績分布 -> 番号: 科目
const number_subj = {}
distr_subjects.map( subject => {
  number_subj[subject['科目番号']] = subject
})

const title_number = {}
distr_subjects.map( subject => {
  title_number[subject['科目名称']] = subject['科目番号']
})


