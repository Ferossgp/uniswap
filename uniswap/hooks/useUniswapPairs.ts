import { Provider } from '@ethersproject/providers';
import { Pair, TokenAmount, Fetcher } from '@uniswap/sdk';
import { compact } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import {
  PAIR_GET_RESERVES_FRAGMENT,
  PAIR_INTERFACE,
} from '../index';
import useMulticall from './useMulticall';
import useUniswapCalls from './useUniswapCalls';

export default function useUniswapPairs(inputCurrency, outputCurrency, provider, chainId) {
  const { allPairCombinations, calls } = useUniswapCalls(
    inputCurrency,
    outputCurrency,
    chainId
  );
  
  const [allPairs, setAllPairs] = useState([])

  useEffect(() => {
    for (let i=0;i<allPairCombinations.length;i++){
    const tokenA = allPairCombinations[i][0];
    const tokenB = allPairCombinations[i][1];
    Fetcher.fetchPairData(tokenA, tokenB, provider).then(p => {
      console.log(p)
      setAllPairs([...allPairs, p])
    }).catch(e => console.error(e))
  }
  }, [allPairCombinations, setAllPairs])

  return {
    allPairs,
  };
}
