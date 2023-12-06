var fs = require('fs');
// Function to parse the data from the file
var parseData = function (filePath) {
    var data = fs.readFileSync(filePath, 'utf-8').split('\r\n');
    var time = +data[0].split(":")[1].trim().replace(/\s\s+/g, '');
    var distance = +data[1].split(":")[1].trim().replace(/\s\s+/g, '');
    return { timeDistance: { time: time, distance: distance } };
};
// Read and parse the data
var timeDistance = parseData('./data.txt').timeDistance;
var time = timeDistance.time, distance = timeDistance.distance;
var result = 0;
for (var ms = 0; ms < time; ms++) {
    var dist = (time - ms) * ms;
    if (dist > distance) {
        result++;
    }
}
console.log(result);
