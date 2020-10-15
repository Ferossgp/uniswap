import { Trade } from '@uniswap/sdk';
export declare const getTestnetUniswapPairs: (network: any) => {
    [x: string]: any;
};
export declare const estimateSwapGasLimit: ({ accountAddress, chainId, tradeDetails, }: {
    accountAddress: any;
    chainId: any;
    tradeDetails: any;
}) => Promise<{
    gasLimit: any;
    methodName: any;
} | {
    gasLimit: any;
    methodName?: undefined;
}>;
export declare const executeSwap: ({ accountAddress, chainId, gasLimit, gasPrice, methodName, tradeDetails, wallet, }: {
    accountAddress: any;
    chainId: any;
    gasLimit: any;
    gasPrice: any;
    methodName: any;
    tradeDetails: any;
    wallet?: null | undefined;
}) => Promise<any>;
export declare const calculateTradeDetails: (chainId: any, inputAmount: number, outputAmount: number, inputCurrency: any, outputCurrency: any, pairs: any, exactInput: boolean) => Trade | null;
export declare const getTokenForCurrency: (currency: any, chainId: any) => any;
declare const _default: {
    authorize: string;
    borrow: string;
    cancel: string;
    deployment: string;
    deposit: string;
    execution: string;
    purchase: string;
    receive: string;
    repay: string;
    send: string;
    trade: string;
    withdraw: string;
};
export default _default;
