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

const eval_questiontitles = ['問1', '問2', '問3', '問4', '問8', '問9', '問10', '問11', '問12', '問13', '問14', '問15', '問16', '問17']
const eval_questions = [
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

// 成績分布のクラス。グラフを一つ持つ。
class Distribution {
  constructor (year, size) {
    this.subjects = this.GetSubjectsFromYear(year);
    this.size = size;
    this.now_sbj;
    this.graph;
  }

  GetSubjectsFromYear(year) {
    let distr_txt = GetCSV(`Distribution${year}`);
    return CSVtoHash(distr_txt);
  }

  SetSubjectsFromYear(year) {
    this.subjects = this.GetSubjectsFromYear(year)
  }

  // 年度と科目名を指定。科目がなかったら
  ReloadWithYear(year, sbj) {
    this.subjects = this.GetSubjectsFromYear(year)
    let random_distr = this.subjects.filter(subject => {
        return subject['科目名称'] === sbj['科目名称']
      });

    this.Reload(this.ShapeHash2Array(sbj));
  }

  GetSubjectFromID(id) {
    return this.subjects.filter(subject => subject['科目番号'] === id)[0]
  }

  GetSubjectFromTitle(title) {
    return this.subjects.filter(subject => subject['科目名称'] === title)[0]
  }

  // 科目番号から成績リストを取得
  GetDegreeFromID(id) {
    return this.ShapeHash2Array(this.GetSubjectFromID(id))
  }

  // 科目番号からリロード
  ReloadFromNumber(id) {
    this.now_sbj = id;
    let target = this.GetSubjectFromID(id);
    if (target) {
      let grades = this.ShapeHash2Array(target);
      this.Reload(grades);
    } else {
      this.Reload();
    }
  }

  // データの再読み込み。再描画。
  // Reload columns
  Reload(data_list) {
    // if (!data_list) {
    //   // data_list = true
    //   data_list = ["aaa", 1, 2, 3]
    // }

    this.graph.unload({
      ids: ['A+', 'A', 'B', 'C', 'D']
    });
    
    setTimeout(()=>{
      this.graph.load({
        columns: data_list,
      });
    }, 250);
  }

  ShapeHash2Array(hash) {
    return [
      [ "A+", hash["A+dig"]],
      [ "A", hash["A_dig"]],
      [ "B", hash["B_dig"]],
      [ "C", hash["C_dig"]],
      [ "D", hash["D_dig"]],
    ]
  }

  // コンストラクタ でのみ呼ばれる。
  // data_list: int list ex. [(A+), (A), (B), (C), (D)]
  InitGraph(sbj) {
    let degree = this.ShapeHash2Array(sbj)
    let pie = c3.generate({
      bindto: '#pie',
      size: {
        height: this.size,
        width: this.size
      },
      data: {
        columns: degree,
        colors: {
          'A+': '#FCCA46',
          'A': '#FE7F2D',
          'B': '#A1C181',
          'C': '#619B8A',
          'D': '#233D4D',
        },
        empty: {
          label: {
            text: "No Data"
          }
        },
        color: function (color, d) {
          return d.id && d.id === 'data3' ? d3.rgb(color).darker(d.value / 150) : color;
        },
        type: 'pie',
        order: null,
      },
      pie: {
        label: {
          color: "#333",
        }
      }
    });
    this.now_sbj = sbj['科目番号'];
    this.graph = pie;
  }
}

class Evaluation {
  constructor(year, size) {
    this.subjects = this.GetSubjectsFromYear(year);
    this.now_sbj = new Array(2);
    this.ave = this.CalcAvelage(this.subjects);
    this.size = size;
    this.graph;
  }

  GetSubjectsFromYear(year) {
    let distr_txt = GetCSV(`Evaluation${year}`);
    return CSVtoHash(distr_txt);
  }

  GetSubjectFromID(id) {
    return this.subjects.filter(subject => subject['科目番号'] === id)[0]
  }

  // 科目番号から成績リストを取得
  GetDegreeFromID(id) {
    return this.ShapeHash2Array(this.GetSubjectFromID(id))
  }

  GetSubjectFromTitle(title) {
    return this.subjects.filter(subject => subject['科目名称'] === title)[0]
  }
  SetSubjectsFromYear(year) {
    this.subjects = this.GetSubjectsFromYear(year)
  }
  
  ReloadWithYear(year, sbj) {
    this.subjects = this.GetSubjectsFromYear(year)
    let random_evalu = this.subjects.filter(subject => {
      return subject['科目名称'] === sbj['科目名称']
    });
    
    this.Reload(this.ShapeHash2Array(random_evalu[0]), this.ave);
  }

  CalcAvelage(subjects) {
    var arrays = subjects.map( hash => {
      return [ hash['問1'],
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
    })
    var sum = Array(arrays[0].length).fill(0);;
    arrays.map( one => {
      if (typeof one[0] !== "undefined") {
        for (var i = 0; i < one.length; i++) {
          sum[i] += Number.parseFloat(one[i])
        }
      }
    })

    var average = sum.map(one => (Math.round(one / arrays.length * 100) / 100).toString());
    average.unshift("平均");
    return average
  }

  ShapeHash2Array(hash) {
    if (typeof hash === 'undefined') return []

    return  [
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
    ];
  }

  // 科目番号からリロード
  ReloadFromNumber(id1, id2) {
    let grades1 = this.ShapeHash2Array(this.GetSubjectFromID(id1));
    // id2が渡されなければ、平均を使う。
    let grades2 = (typeof id2 === 'undefined') ? this.ave : this.ShapeHash2Array(this.GetSubjectFromID(id2));
    this.Reload(grades1, grades2);
  }

  Reload(subject1, subject2) {
    this.graph.unload({
      ids: this.now_sbj[0],
    });
    this.graph.unload({
      ids: this.now_sbj[1],
    });
    if( subject1 && subject1.length >= 1) {
      setTimeout( () => {
        this.graph.load({
          columns: [subject1, subject2]
          });
      }, 400);
      this.now_sbj[0] = subject1[0];
      this.now_sbj[1] = subject2[0];
      $("#question_txt").text("");
    } else {
      $("#question_txt").text("No Data");
    }
  }

  InitGraph(sbj1, sbj2) {
    let evalu1 = this.ShapeHash2Array(sbj1);
    let evalu2 = sbj2 ? this.ShapeHash2Array(sbj2) : this.ave
    // 科目名を追加
    this.now_sbj[0] = evalu1[0];
    this.now_sbj[1] = evalu2[0];

    let graph = c3.generate({
      bindto: '#graph',
      size: {
        width: this.size[0],
        height: this.size[1],
      },
      data: {
        columns: [evalu1, evalu2],
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
    this.graph = graph;
  }
}
