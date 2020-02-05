function GradeCSVtoHash(csv) {
    var csvData = [];
    var lines = csv.split("\n");
    var names = lines[0].split("\",");
    names = names.map(name => {
        return name.replace(/[\"\s]/g, "");
    })
    for (var i = 1; i < lines.length; ++i) {
      var line = lines[i].split("\",")
      var temp_hash = {};
      for (var j = 0; j < line.length; ++j) {
        temp_hash[names[j]] = line[j].replace(/\"|\s/g, "");
      }
      csvData.push(temp_hash);
    }
    return csvData;
  }

var subjects = GradeCSVtoHash(GetCSV('SIRS201811465'))

console.log(subjects)