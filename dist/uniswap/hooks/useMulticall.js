"use strict";
exports.__esModule = true;
exports.toCallKey = void 0;
var lodash_1 = require("lodash");
var react_1 = require("react");
var INVALID_RESULT = {
    blockNumber: undefined,
    data: undefined,
    valid: false
};
var INVALID_CALL_STATE = {
    error: false,
    loading: false,
    result: undefined,
    syncing: false,
    valid: false
};
var LOADING_CALL_STATE = {
    error: false,
    loading: true,
    result: undefined,
    syncing: true,
    valid: true
};
function toCallKey(call) {
    return call.address + "-" + call.callData;
}
exports.toCallKey = toCallKey;
function useMulticall(calls, contractInterface, fragment, chainId, raps) {
    var results = {};
    console.log(raps);
    var callResults = react_1.useMemo(function () {
        return lodash_1.map(calls, function (call) {
            var _a;
            if (!call)
                return INVALID_RESULT;
            var result = (_a = results[chainId]) === null || _a === void 0 ? void 0 : _a[toCallKey(call)];
            var data;
            if ((result === null || result === void 0 ? void 0 : result.data) && (result === null || result === void 0 ? void 0 : result.data) !== '0x') {
                data = result.data;
            }
            return { blockNumber: result === null || result === void 0 ? void 0 : result.blockNumber, data: data, valid: true };
        });
    }, [calls, chainId, results]);
    var multicallResults = react_1.useMemo(function () {
        return lodash_1.map(callResults, function (callResult) {
            if (!callResult)
                return INVALID_CALL_STATE;
            var blockNumber = callResult.blockNumber, data = callResult.data, valid = callResult.valid;
            if (!valid)
                return INVALID_CALL_STATE;
            if (valid && !blockNumber)
                return LOADING_CALL_STATE;
            var success = data && data.length > 2;
            return {
                error: !success,
                loading: false,
                result: success && data
                    ? contractInterface.decodeFunctionResult(fragment, data)
                    : undefined,
                valid: true
            };
        });
    }, [callResults, contractInterface, fragment]);
    return { multicallResults: multicallResults };
}
exports["default"] = useMulticall;
