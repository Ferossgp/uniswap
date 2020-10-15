export declare const isValidSwapInput: ({ inputCurrency, outputCurrency }: {
    inputCurrency: any;
    outputCurrency: any;
}) => boolean;
export declare const findSwapOutputAmount: (receipt: any, accountAddress: any) => any;
declare const swap: (wallet: any, currentRap: any, index: any, parameters: any, updateRap: any) => Promise<any>;
export default swap;
