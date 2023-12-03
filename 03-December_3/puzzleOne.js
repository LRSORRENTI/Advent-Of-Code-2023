"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Part2 = exports.Part1 = void 0;
var fs = require("fs");
var path = require("path");
var Part1 = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var grid, sum, y, currentNumber, checkNumber, nearSymbol, x, j, i;
    return __generator(this, function (_a) {
        grid = input.split(/\n/g).map(function (line) { return line.split(''); });
        sum = 0;
        for (y = 0; y < grid.length; y++) {
            currentNumber = '';
            checkNumber = false;
            nearSymbol = false;
            for (x = 0; x < grid[y].length; x++) {
                if (grid[y][x].match(/[0-9]/) && !checkNumber) {
                    checkNumber = true;
                    currentNumber = '';
                    nearSymbol = false;
                }
                if ((x == grid[y].length - 1 || !grid[y][x].match(/[0-9]/)) && checkNumber) {
                    if (nearSymbol)
                        sum += parseInt(currentNumber + (grid[y][x].match(/[0-9]/) ? grid[y][x] : ''));
                    checkNumber = false;
                }
                if (checkNumber) {
                    currentNumber += grid[y][x];
                    for (j = -1; j <= 1; j++) {
                        for (i = -1; i <= 1; i++) {
                            if (i == 0 && j == 0)
                                continue;
                            if (y + j < 0 || y + j >= grid.length || x + i < 0 || x + i >= grid[y].length)
                                continue;
                            if (!grid[y + j][x + i].match(/[0-9.]/))
                                nearSymbol = true;
                        }
                    }
                }
            }
        }
        return [2 /*return*/, sum];
    });
}); };
exports.Part1 = Part1;
var Part2 = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var grid, gearNumbers, y, currentNumber, checkNumber, gearLocation, x, j, i, char;
    return __generator(this, function (_a) {
        grid = input.split(/\n/g).map(function (line) { return line.split(''); });
        gearNumbers = {};
        for (y = 0; y < grid.length; y++) {
            currentNumber = '';
            checkNumber = false;
            gearLocation = null;
            for (x = 0; x < grid[y].length; x++) {
                if (grid[y][x].match(/[0-9]/) && !checkNumber) {
                    checkNumber = true;
                    currentNumber = '';
                    gearLocation = null;
                }
                if ((x == grid[y].length - 1 || !grid[y][x].match(/[0-9]/)) && checkNumber) {
                    if (gearLocation) {
                        if (!gearNumbers[gearLocation])
                            gearNumbers[gearLocation] = [];
                        gearNumbers[gearLocation].push(parseInt(currentNumber + (grid[y][x].match(/[0-9]/) ? grid[y][x] : '')));
                    }
                    checkNumber = false;
                }
                if (checkNumber) {
                    currentNumber += grid[y][x];
                    for (j = -1; j <= 1; j++) {
                        for (i = -1; i <= 1; i++) {
                            if (i == 0 && j == 0)
                                continue;
                            if (y + j < 0 || y + j >= grid.length || x + i < 0 || x + i >= grid[y].length)
                                continue;
                            char = grid[y + j][x + i];
                            if (char == '*') {
                                gearLocation = "".concat(x + i, ",").concat(y + j);
                                if (!gearNumbers[gearLocation])
                                    gearNumbers[gearLocation] = [];
                            }
                        }
                    }
                }
            }
        }
        return [2 /*return*/, Object.values(gearNumbers).reduce(function (sum, array) {
                if (array.length == 2)
                    sum += array[0] * array[1];
                return sum;
            }, 0)];
    });
}); };
exports.Part2 = Part2;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var dataFilePath, inputData, result, secondResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataFilePath = path.join(__dirname, 'data.txt');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fs.promises.readFile(dataFilePath, 'utf8')];
                case 2:
                    inputData = _a.sent();
                    return [4 /*yield*/, Part1(inputData)];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, Part2(inputData)];
                case 4:
                    secondResult = _a.sent();
                    console.log("Part One: ".concat(result, ", Part Two: ").concat(secondResult));
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error reading the file:', error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
main();
