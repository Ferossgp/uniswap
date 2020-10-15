export interface Call {
    address: string;
    callData: string;
}
export declare function toCallKey(call: Call): string;
export default function useMulticall(calls: any, contractInterface: any, fragment: any, chainId: any, raps: any): {
    multicallResults: ({
        error: boolean;
        loading: boolean;
        result: undefined;
        syncing: boolean;
        valid: boolean;
    } | {
        error: boolean;
        loading: boolean;
        result: any;
        valid: boolean;
    })[];
};
