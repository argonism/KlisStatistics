

// 検索に表示する候補の初期化
function SearchAndSuggest(subject_titles) {
    $('#search_title').on('keyup click',function(){
        let query = $(this).val();
        matched = {}
        for (let [key, value] of Object.entries(subject_titles)) {
            if (typeof value !== 'undefined' &&  value.match(query)) {
                matched[key] = value
            }
        }
        if (Object.keys(matched).length >= 1)
            SetAutoComplete(matched);
        $("#search_result").css('display', 'block');
    });

}

// グラフの配列を受け取る。配列の順番は決まっていて、0番目に基準としたいグラフを持ってくる。
function GraphsReloadWithYear(year, graphs) {
    let now_sbj_id = graphs[0].now_sbj;
    let target_sbj = graphs[0].GetSubjectFromID(now_sbj_id);
    let title;
    if (target_sbj) {
        title = graphs[0].GetSubjectFromID(now_sbj_id)["科目名称"];
    }
    // 各グラフのデータに、今選択されている科目があるかどうか。
    let new_subjects = graphs.map(graph => {
        // グラフの保持する科目の更新
        
        graph.SetSubjectsFromYear(year);

        let subject = graph.GetSubjectFromID(now_sbj_id);
        if (subject) {
            return subject
        }
        else if (!subject && graph.GetSubjectFromTitle(title)) {
            console.log("in a else if")
            subject = graph.GetSubjectFromTitle(title);
            console.log(subject)
            return subject
        }
        else {
            return null
        }
        
    });
 
    graphs.forEach((graph, index) => {
        if (new_subjects[index]) {
            graph.ReloadWithYear(year, new_subjects[index]);
        } else {
            graph.Reload();
        }
    });

    const subject_titles = {}
    graphs[0].subjects.map( subject => {
        subject_titles[subject['科目番号']] = subject['科目名称']
    })
    SetAutoComplete(subject_titles);
    SearchAndSuggest(subject_titles);
    SetDenominator(graphs, now_sbj_id)
}


function main() {
    const NOT_IN_EVALUATION = {
        "2018": ["GA40303", "GE20301", "GE40603", "GE51018"],
        "2017": ["GE10732","GE40603","GE51018","GE72501",],
        "2016": ["GE40603","GE51018",],
        "2015": ["GE31023","GE32023","GE40603","GE51018","GE80601",],
        "2014": ["GE10732","GE20501","GE21601","GE40603","GE51018",]
    }

    var distr = new Distribution('2018', pie_size);
    var evalu = new Evaluation('2018', graph_size);
    random_distr = distr.subjects[Math.floor(Math.random() * distr.subjects.length)];
    while(NOT_IN_EVALUATION['2018'].includes(random_distr['科目番号'])){
        random_distr = distr.subjects[Math.floor(Math.random() * distr.subjects.length)];
    }
    distr.InitGraph(random_distr);
    evalu.InitGraph(evalu.GetSubjectFromID(random_distr['科目番号']));

    const subject_titles = {}
    distr.subjects.map( subject => {
        subject_titles[subject['科目番号']] = subject['科目名称']
    })
    SetAutoComplete(subject_titles);
    SearchAndSuggest(subject_titles);
    InitSuggest([distr, evalu]);
    SetDenominator([distr, evalu], random_distr["科目番号"]);
    InitYearSelect();

    $('#search_title').val(random_distr['科目名称']);

    $(document).on('change', '#year_select', function() {
        var year = $(this).val();
        GraphsReloadWithYear(year, [distr, evalu]);
    })
}


main()