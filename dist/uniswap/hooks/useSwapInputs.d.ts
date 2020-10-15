/// <reference types="react" />
export default function useSwapInputs({ defaultInputAsset, inputCurrency, isDeposit, isWithdrawal, maxInputBalance, nativeFieldRef, supplyBalanceUnderlying, type, }: {
    defaultInputAsset: any;
    inputCurrency: any;
    isDeposit: any;
    isWithdrawal: any;
    maxInputBalance: any;
    nativeFieldRef: any;
    supplyBalanceUnderlying: any;
    type: any;
}): {
    inputAmount: null;
    inputAmountDisplay: null;
    inputAsExactAmount: boolean;
    isMax: boolean;
    isSufficientBalance: boolean;
    nativeAmount: null;
    outputAmount: null;
    outputAmountDisplay: null;
    setIsSufficientBalance: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    updateInputAmount: (newInputAmount: any, newAmountDisplay: any, newInputAsExactAmount?: any, newIsMax?: any) => void;
    updateNativeAmount: (nativeAmount: any) => void;
    updateOutputAmount: (newOutputAmount: any, newAmountDisplay: any, newInputAsExactAmount?: any) => void;
};
