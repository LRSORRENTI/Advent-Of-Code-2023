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
var fs_1 = require("fs");
var z3_solver_1 = require("z3-solver");
function partOne(lines, MINXY, MAXXY) {
    var pos = [];
    var vel = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var parts = line.split(" @ ");
        pos.push(parts[0].split(", ").map(Number));
        vel.push(parts[1].split(", ").map(Number));
    }
    var total = 0;
    for (var j = 0; j < pos.length; j++) {
        var p1 = pos[j];
        var v1 = vel[j];
        for (var i = 0; i < j; i++) {
            var p0 = pos[i];
            var v0 = vel[i];
            if (v0[1] * v1[0] !== v0[0] * v1[1]) {
                var x = ((p1[1] - p0[1]) + p0[0] * (v0[1] / v0[0]) - p1[0] * (v1[1] / v1[0])) / ((v0[1] / v0[0]) - (v1[1] / v1[0]));
                var t0 = (x - p0[0]) / v0[0];
                if (t0 >= 0) {
                    var t1 = (x - p1[0]) / v1[0];
                    if (t1 >= 0) {
                        var y = p0[1] + t0 * v0[1];
                        var coll = [x, y];
                        if (coll[0] >= MINXY && coll[0] <= MAXXY && coll[1] >= MINXY && coll[1] <= MAXXY) {
                            total++;
                        }
                    }
                }
            }
        }
    }
    console.log('  ', total);
}
function partTwo(lines) {
    return __awaiter(this, void 0, void 0, function () {
        var pos, vel, _i, lines_2, line, _a, p, v, Context, _b, Solver, Int, x, y, z, vx, vy, vz, solver, i, _c, x_i, y_i, z_i, _d, vx_i, vy_i, vz_i, t_i;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    pos = [];
                    vel = [];
                    for (_i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
                        line = lines_2[_i];
                        line = line.trim();
                        _a = line.split(" @ "), p = _a[0], v = _a[1];
                        pos.push(p.split(", ").map(Number));
                        vel.push(v.split(", ").map(Number));
                    }
                    return [4 /*yield*/, (0, z3_solver_1.init)()];
                case 1:
                    Context = (_e.sent()).Context;
                    _b = new Context('main'), Solver = _b.Solver, Int = _b.Int;
                    x = Int["const"]('x');
                    y = Int["const"]('y');
                    z = Int["const"]('z');
                    vx = Int["const"]('vx');
                    vy = Int["const"]('vy');
                    vz = Int["const"]('vz');
                    solver = new Solver();
                    for (i = 0; i < pos.length; i++) {
                        _c = pos[i], x_i = _c[0], y_i = _c[1], z_i = _c[2];
                        _d = vel[i], vx_i = _d[0], vy_i = _d[1], vz_i = _d[2];
                        t_i = Int["const"]("t_".concat(i));
                        solver.add(t_i.mul(vx_i).add(x_i).sub(x).sub(t_i.mul(vx)).eq(0));
                        solver.add(t_i.mul(vy_i).add(y_i).sub(y).sub(t_i.mul(vy)).eq(0));
                        solver.add(t_i.mul(vz_i).add(z_i).sub(z).sub(t_i.mul(vz)).eq(0));
                        if (i > 3)
                            break;
                    }
                    return [4 /*yield*/, solver.check()];
                case 2:
                    _e.sent();
                    console.log('  ', Number(solver.model().eval(x.add(y).add(z)).value()));
                    return [2 /*return*/];
            }
        });
    });
}
// const sample = fs.readFileSync('sample.txt', 'utf8').split('\n');
var input = fs_1["default"].readFileSync('input.txt', 'utf8').split('\n');
// console.log('Sample: ');
// partOne(sample, 7, 27);
console.log('Input: ');
partOne(input, 200000000000000, 400000000000000);
partTwo(input)["catch"](console.error);
