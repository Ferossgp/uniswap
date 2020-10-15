export default function useUniswapCalls(inputCurrency: any, outputCurrency: any, chainId: any): {
    allPairCombinations: any[][];
    calls: {
        address: string;
        callData: string | undefined;
    }[];
};
