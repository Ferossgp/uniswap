import { Pair, TokenAmount } from '@uniswap/sdk';
import { compact } from 'lodash';
import { useMemo } from 'react';
import {
  PAIR_GET_RESERVES_FRAGMENT,
  PAIR_INTERFACE,
} from '../index';
import useMulticall from './useMulticall';
import useUniswapCalls from './useUniswapCalls';

export default function useUniswapPairs(inputCurrency, outputCurrency, chainId, raps) {
  const { allPairCombinations, calls } = useUniswapCalls(
    inputCurrency,
    outputCurrency,
    chainId
  );


  const { allPairs, doneLoadingResults } = useMemo(() => {
    let doneLoadingResults = true;
    const viablePairs = allPairCombinations.map((result, i) => {
      const tokenA = allPairCombinations[i][0];
      const tokenB = allPairCombinations[i][1];

      const [token0, token1] = tokenA.sortsBefore(tokenB)
        ? [tokenA, tokenB]
        : [tokenB, tokenA];
      return new Pair(
        new TokenAmount(token0, '0'),
        new TokenAmount(token1, '0')
      );
    });
    return {
      allPairs: compact(viablePairs),
      doneLoadingResults,
    };
  }, [allPairCombinations]);

  return {
    allPairs,
    doneLoadingResults,
  };
}
