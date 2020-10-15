import { Fetcher } from '@uniswap/sdk';
import { useEffect, useState } from 'react';
import useUniswapCalls from './useUniswapCalls';
export default function useUniswapPairs(inputCurrency, outputCurrency, provider, chainId) {
    const [allPairs, setAllPairs] = useState([]);
    const { allPairCombinations } = useUniswapCalls(inputCurrency, outputCurrency, chainId);
    useEffect(() => {
        for (let i = 0; i < allPairCombinations.length; i++) {
            const a = allPairCombinations[i][0];
            const b = allPairCombinations[i][1];
            Fetcher.fetchPairData(a, b)
                .then((p) => {
                setAllPairs([...allPairs, p]);
            })
                .catch((e) => console.error('Fetch pairs', e));
        }
    }, [inputCurrency]);
    return {
        allPairs,
    };
}
