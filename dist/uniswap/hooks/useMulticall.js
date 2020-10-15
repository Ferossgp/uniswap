import { map } from 'lodash';
import { useMemo } from 'react';
const INVALID_RESULT = {
    blockNumber: undefined,
    data: undefined,
    valid: false,
};
const INVALID_CALL_STATE = {
    error: false,
    loading: false,
    result: undefined,
    syncing: false,
    valid: false,
};
const LOADING_CALL_STATE = {
    error: false,
    loading: true,
    result: undefined,
    syncing: true,
    valid: true,
};
export function toCallKey(call) {
    return `${call.address}-${call.callData}`;
}
export default function useMulticall(calls, contractInterface, fragment, chainId, raps) {
    const results = {};
    console.log(raps);
    const callResults = useMemo(() => map(calls, call => {
        var _a;
        if (!call)
            return INVALID_RESULT;
        const result = (_a = results[chainId]) === null || _a === void 0 ? void 0 : _a[toCallKey(call)];
        let data;
        if ((result === null || result === void 0 ? void 0 : result.data) && (result === null || result === void 0 ? void 0 : result.data) !== '0x') {
            data = result.data;
        }
        return { blockNumber: result === null || result === void 0 ? void 0 : result.blockNumber, data, valid: true };
    }), [calls, chainId, results]);
    const multicallResults = useMemo(() => map(callResults, callResult => {
        if (!callResult)
            return INVALID_CALL_STATE;
        const { blockNumber, data, valid } = callResult;
        if (!valid)
            return INVALID_CALL_STATE;
        if (valid && !blockNumber)
            return LOADING_CALL_STATE;
        const success = data && data.length > 2;
        return {
            error: !success,
            loading: false,
            result: success && data
                ? contractInterface.decodeFunctionResult(fragment, data)
                : undefined,
            valid: true,
        };
    }), [callResults, contractInterface, fragment]);
    return { multicallResults };
}
