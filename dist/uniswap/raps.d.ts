export declare const createNewAction: (type: any, parameters: any) => {
    parameters: any;
    transaction: {
        confirmed: null;
        hash: null;
    };
    type: any;
};
export declare const createNewRap: (actions: any, callback?: () => undefined) => {
    actions: any;
    callback: () => undefined;
    completedAt: null;
    id: string;
    startedAt: number;
};
export declare const RapActionTypes: {
    swap: string;
    unlock: string;
};
export declare const executeRap: (wallet: any, updateRap: any, rap: any) => Promise<void>;
export declare const estimateUnlockAndSwap: ({ inputAmount, inputCurrency, outputAmount, outputCurrency, tradeDetails, wallet, }: {
    inputAmount: any;
    inputCurrency: any;
    outputAmount: any;
    outputCurrency: any;
    tradeDetails: any;
    wallet: any;
}) => Promise<any>;
export declare const createUnlockAndSwapRap: ({ callback, inputAmount, inputCurrency, outputCurrency, selectedGasPrice, tradeDetails, wallet, setRap, }: {
    callback: any;
    inputAmount: any;
    inputCurrency: any;
    outputCurrency: any;
    selectedGasPrice: any;
    tradeDetails: any;
    wallet: any;
    setRap: any;
}) => Promise<{
    actions: any;
    callback: () => undefined;
    completedAt: null;
    id: string;
    startedAt: number;
}>;
