var fs = require('fs');
// Function to parse the data from the file
var parseData = function (filePath) {
    var data = fs.readFileSync(filePath, 'utf-8').split('\r\n');
    var times = data[0].split(":")[1].trim().replace(/\s\s+/g, ' ').split(" ").map(function (e) { return +e; });
    var distances = data[1].split(":")[1].trim().replace(/\s\s+/g, ' ').split(" ").map(function (e) { return +e; });
    return { times: times, distances: distances };
};
// Read and parse the data
var _a = parseData('./data.txt'), times = _a.times, distances = _a.distances;
var result = 1;
for (var i = 0; i < times.length; i++) {
    var count = 0;
    for (var ms = 1; ms < times[i]; ms++) {
        var dist = (times[i] - ms) * ms;
        if (dist > distances[i]) {
            count++;
        }
    }
    result *= count;
}
console.log(result);
