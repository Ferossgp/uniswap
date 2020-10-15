export default function useUniswapMarketDetails({ defaultInputAddress, extraTradeDetails, inputAmount, inputAsExactAmount, inputCurrency, inputFieldRef, isDeposit, isWithdrawal, maxInputBalance, nativeCurrency, outputAmount, outputCurrency, outputFieldRef, setIsSufficientBalance, setSlippage, updateExtraTradeDetails, updateInputAmount, updateOutputAmount, chainId, }: {
    defaultInputAddress: any;
    extraTradeDetails: any;
    inputAmount: any;
    inputAsExactAmount: any;
    inputCurrency: any;
    inputFieldRef: any;
    isDeposit: any;
    isWithdrawal: any;
    maxInputBalance: any;
    nativeCurrency: any;
    outputAmount: any;
    outputCurrency: any;
    outputFieldRef: any;
    setIsSufficientBalance: any;
    setSlippage: any;
    updateExtraTradeDetails: any;
    updateInputAmount: any;
    updateOutputAmount: any;
    chainId: any;
}): {
    isSufficientLiquidity: boolean;
    tradeDetails: null;
};
