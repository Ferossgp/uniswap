import {Provider} from '@ethersproject/providers';
import {Pair, TokenAmount, Token, Fetcher} from '@uniswap/sdk';
import {compact} from 'lodash';
import {useEffect, useMemo, useState} from 'react';
import {PAIR_GET_RESERVES_FRAGMENT, PAIR_INTERFACE} from '../index';
import useMulticall from './useMulticall';
import useUniswapCalls from './useUniswapCalls';

export default function useUniswapPairs(
  inputCurrency,
  outputCurrency,
  provider,
  chainId,
) {
  const [allPairs, setAllPairs] = useState([]);

  const {allPairCombinations} = useUniswapCalls(
    inputCurrency,
    outputCurrency,
    chainId,
  );

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
