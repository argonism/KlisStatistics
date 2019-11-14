

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




function main() {
    
    // 成績分布の表の生成と描画
    var distr = new Distribution('2018', 'GE80301', pie_size);
    random_distr = distr.subjects[Math.floor(Math.random() * distr.subjects.length)];
    distr.Reload(distr.ShapeHash2Array(random_distr));

    var evalu = new Evaluation('2018', 'GE80301', graph_size);
    random_evalu = evalu.subjects[Math.floor(Math.random() * evalu.subjects.length)];
    evalu.Reload(evalu.ShapeHash2Array(random_evalu), evalu.ave);

    // 入力補完の候補の挿入
    const subject_titles = {}
    distr.subjects.map( subject => {
        subject_titles[subject['科目番号']] = subject['科目名称']
    })
    SetAutoComplete(subject_titles);
    SearchAndSuggest(subject_titles);
    InitSuggest([distr, evalu]);

    $('#search_title').val(random_distr['科目名称']);
}

main()