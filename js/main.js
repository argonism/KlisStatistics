// 候補の表示
function DrawPieChartFromNumber(number) {
    DrawPieChart( DestrShapeHash2Array(number_subj[number]) );
}

function DrawAreaChartFromNumber(number1, number2) {
    if (number2 === 0) {
        // DrawAreaChart( EvaluShapeHash2Array(eval_num_subj[number1]), eval_ave)
        if (typeof eval_num_subj[number1] === 'undefined') {
            console.log("この講義の授業評価のデータはありません")

            DrawAreaChart();
        }　else {
            DrawAreaChart(EvaluShapeHash2Array(eval_num_subj[number1]), eval_ave);
        }
    } else {
        DrawAreaChart( EvaluShapeHash2Array(eval_num_subj[number1]), eval_num_subj[number2]);
    }

}


$('#search_title').keypress( function ( e ) {
    let query = $(this).val();
    console.log(query)

    matched = {}
    for (let [key, value] of Object.entries(title_number)) {
        if (key.match(query)) {
            matched[value] = key
        }
    }
    SetAutoComplete(matched);
    $("#search_result").css('display', 'block');
} );

$('#search_title').on('keyup click',function(){
    let query = $(this).val();
    matched = {}
    for (let [key, value] of Object.entries(title_number)) {
        if (key.match(query)) {
            matched[value] = key
        }
    }
    if (Object.keys(matched).length >= 1)
        SetAutoComplete(matched);
    $("#search_result").css('display', 'block');
    
});

function main() {
    const subject_titles = {}
    destr_subjects.map( subject => {
        subject_titles[subject['科目番号']] = subject['科目名称']
    })

    SetAutoComplete(subject_titles);
    random_destr = destr_subjects[Math.floor(Math.random() * destr_subjects.length)];
    random_evalu = evalu_subjects[Math.floor(Math.random() * evalu_subjects.length)];
    DrawPieChart(DestrShapeHash2Array(random_destr));
    DrawAreaChart(EvaluShapeHash2Array(random_evalu), eval_ave,);
    $('#search_title').val(random_evalu['科目名称']);
    // DrawPieChart(ShapeHash2Array(subjects[0]))
}



main()