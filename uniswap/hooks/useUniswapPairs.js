"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var sdk_1 = require("@uniswap/sdk");
var react_1 = require("react");
var useUniswapCalls_1 = require("./useUniswapCalls");
function useUniswapPairs(inputCurrency, outputCurrency, provider, chainId) {
    var _a = react_1.useState([]), allPairs = _a[0], setAllPairs = _a[1];
    var allPairCombinations = useUniswapCalls_1["default"](inputCurrency, outputCurrency, chainId).allPairCombinations;
    react_1.useEffect(function () {
        for (var i = 0; i < allPairCombinations.length; i++) {
            var a = allPairCombinations[i][0];
            var b = allPairCombinations[i][1];
            sdk_1.Fetcher.fetchPairData(a, b)
                .then(function (p) {
                setAllPairs(__spreadArrays(allPairs, [p]));
            })["catch"](function (e) { return console.error('Fetch pairs', e); });
        }
    }, [inputCurrency]);
    return {
        allPairs: allPairs
    };
}
exports["default"] = useUniswapPairs;
