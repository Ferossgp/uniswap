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
var lodash_1 = require("lodash");
var react_1 = require("react");
var handlers_1 = require("../handlers");
var index_1 = require("../index");
function useUniswapCalls(inputCurrency, outputCurrency, chainId) {
    var inputToken = react_1.useMemo(function () { return handlers_1.getTokenForCurrency(inputCurrency, chainId); }, [chainId, inputCurrency]);
    var outputToken = react_1.useMemo(function () { return handlers_1.getTokenForCurrency(outputCurrency, chainId); }, [chainId, outputCurrency]);
    var bases = react_1.useMemo(function () {
        var _a;
        var basebase = (_a = index_1.UNISWAP_V2_BASES[chainId]) !== null && _a !== void 0 ? _a : [];
        return basebase;
    }, [chainId]);
    var allPairCombinations = react_1.useMemo(function () {
        if (!inputToken || !outputToken)
            return [];
        var combos = __spreadArrays([
            // the direct pair
            [inputToken, outputToken]
        ], bases.map(function (base) { return [
            inputToken,
            base,
        ]; }), bases.map(function (base) { return [
            outputToken,
            base,
        ]; }), lodash_1.flatMap(bases, function (base) {
            return bases.map(function (otherBase) { return [base, otherBase]; });
        }));
        var validCombos = lodash_1.filter(combos, function (_a) {
            var inputToken = _a[0], outputToken = _a[1];
            return inputToken && outputToken && !inputToken.equals(outputToken);
        });
        var uniqCombos = lodash_1.uniqBy(validCombos, function (_a) {
            var inputToken = _a[0], outputToken = _a[1];
            return lodash_1.toLower(sdk_1.Pair.getAddress(inputToken, outputToken));
        });
        return uniqCombos;
    }, [bases, inputToken, outputToken]);
    var pairAddresses = react_1.useMemo(function () {
        return lodash_1.map(allPairCombinations, function (_a) {
            var inputToken = _a[0], outputToken = _a[1];
            return lodash_1.toLower(sdk_1.Pair.getAddress(inputToken, outputToken));
        });
    }, [allPairCombinations]);
    var calls = react_1.useMemo(function () {
        var theCalls = index_1.PAIR_GET_RESERVES_CALL_DATA
            ? lodash_1.map(pairAddresses, function (address) { return ({
                address: address,
                callData: index_1.PAIR_GET_RESERVES_CALL_DATA
            }); })
            : [];
        return theCalls;
    }, [pairAddresses]);
    return {
        allPairCombinations: allPairCombinations,
        calls: calls
    };
}
exports["default"] = useUniswapCalls;
