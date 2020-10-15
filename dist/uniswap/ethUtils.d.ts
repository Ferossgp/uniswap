declare const _default: {
    padLeft: (n: any, width: any, z: any) => any;
    removeHexPrefix: (hex: any) => any;
    estimateApprove: (tokenAddress: any, spender: any) => Promise<any>;
    approve: (tokenAddress: any, spender: any, gasLimit: any, gasPrice: any, wallet?: null) => Promise<{
        approval: any;
        creationTimestamp: number;
    }>;
    getRawAllowance: (owner: any, token: any, spender: any) => Promise<any>;
};
export default _default;
