import React, { ChangeEvent, useCallback, useEffect, useMemo, forwardRef, useRef, useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator
} from 'react-native';
import useUniswapPairs from './uniswap/hooks/useUniswapPairs';
import useSwapInputs from './uniswap/hooks/useSwapInputs'
import useSwapInputRefs from './uniswap/hooks/useSwapInputRefs'
import { createUnlockAndSwapRap, executeRap } from './uniswap/raps'
import { wallet } from './uniswap/web3'
import { calculateTradeDetails } from './uniswap/handlers'
import { updatePrecisionToDisplay, isZero } from './uniswap/utilities'

const Input = forwardRef((props, ref) => {
  return (
    <View style={{ borderWidth: 1, borderColor: 'rgb(247, 248, 250)', borderRadius: 20, backgroundColor: 'white', marginVertical: 8 }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Text>{props.label}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, }}>
        <TextInput placeholder="0.0" ref={ref} style={{ paddingHorizontal: 8, paddingVertical: 8, fontSize: 21, flex: 1 }} keyboardType="numeric" value={props.value} onChangeText={props.onChange} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: props.token["logoURI"] }} style={{ height: 24, width: 24 }} />
          <Text style={{ marginHorizontal: 8 }}>{props.token["symbol"]}</Text>
        </View>
      </View>
    </View>
  )
})

function Button(props) {
  return (
    <View style={{ borderWidth: 1, borderColor: 'rgb(247, 248, 250)', borderRadius: 16, backgroundColor: 'rgb(230, 0, 110)', marginVertical: 8 }}>
      <TouchableOpacity
        style={{ paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' }}
        onPress={props.onPress}>
        {(props.isLoading) &&
          (<ActivityIndicator />)}
        {(!props.isLoading) &&
          (<Text style={{ fontSize: 21, color: "white" }}>{props.label}</Text>)}
      </TouchableOpacity>
    </View>
  )
}

type Props = {};
export default function App(props) {

  const inputCurrency = {
    "name": "Wrapped Ether",
    "address": "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    "symbol": "WETH",
    "decimals": 18,
    "chainId": 4,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc778417E063141139Fce010982780140Aa0cD5Ab/logo.png"
  }
  const outputCurrency = {
    "name": "Dai Stablecoin",
    "address": "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": 4,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735/logo.png"
  }

  const {
    inputFieldRef,
    outputFieldRef,
    nativeFieldRef
  } = useSwapInputRefs({ inputCurrency, outputCurrency });
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [slippage, setSlippage] = useState(null);
  const {
    inputAmount,
    inputAmountDisplay,
    inputAsExactAmount,
    isMax,
    isSufficientBalance,
    nativeAmount,
    outputAmount,
    outputAmountDisplay,
    setIsSufficientBalance,
    updateInputAmount,
    updateNativeAmount,
    updateOutputAmount,
  } = useSwapInputs({
    defaultInputAsset: inputCurrency,
    inputCurrency,
    isDeposit: true,
    isWithdrawal: false,
    maxInputBalance: 100,
    nativeFieldRef,
    supplyBalanceUnderlying: 100,
    type: '',
  });
  const [extraTradeDetails, updateExtraTradeDetails] = useState(null)
  const [raps, setRapRaw] = useState({})
  const setRap = (id, value) => setRapRaw(Object.assign(raps, { [id]: value }))
  const isDeposit = false;
  const isWithdrawal = false;
  const nativeCurrency = inputCurrency;
  const maxInputBalance = 100;
  const defaultInputAddress = inputCurrency.address
  /*
  const { isSufficientLiquidity, tradeDetails } = useUniswapMarketDetails({
    defaultInputAddress,
    extraTradeDetails,
    inputAmount,
    inputAsExactAmount,
    inputCurrency,
    inputFieldRef,
    isDeposit,
    isWithdrawal,
    maxInputBalance,
    nativeCurrency,
    outputAmount,
    outputCurrency,
    outputFieldRef,
    setIsSufficientBalance,
    setSlippage,
    updateExtraTradeDetails,
    updateInputAmount,
    updateOutputAmount,
    chainId: wallet.chainId,
  });
  */
  const isSufficientLiquidity = true;
  
  const { allPairs } = useUniswapPairs(
    inputCurrency,
    outputCurrency,
    wallet.provider,
    wallet.chainId
  );

  const tradeDetails = calculateTradeDetails(wallet.chainId, inputAmount, outputAmount, inputCurrency, outputCurrency, allPairs, true)
  const calculateOutputGivenInputChange = useCallback(
    ({ isInputEmpty, isInputZero }) => {
      if (
        (isInputEmpty || isInputZero) &&
        outputFieldRef &&
        outputFieldRef.current &&
        !outputFieldRef.current.isFocused()
      ) {

        updateOutputAmount(null, null, true);
      } else {
        const rawUpdatedOutputAmount = tradeDetails?.outputAmount?.toExact();
        if (!isZero(rawUpdatedOutputAmount)) {
          const outputPriceValue = tradeDetails?.outputPriceValue;
          const updatedOutputAmountDisplay = updatePrecisionToDisplay(
            rawUpdatedOutputAmount,
            outputPriceValue
          );
          updateOutputAmount(
            rawUpdatedOutputAmount,
            updatedOutputAmountDisplay,
            inputAsExactAmount
          );
        }
      }
    },
    [
      extraTradeDetails,
      inputAsExactAmount,
      outputFieldRef,
      tradeDetails,
      updateOutputAmount,
    ]
  );
  useEffect(() => {
    calculateOutputGivenInputChange({isInputEmpty: inputAmount == null, isInputZero: isZero(inputAmount)})
  }, [inputAmount])
  const handleSubmit = useCallback(() => {
    const fn = async () => {
      setIsAuthorizing(true);
      try {
        if (!wallet) {
          setIsAuthorizing(false);
          return;
        }
        console.log("trade", tradeDetails)

        const rap = await createUnlockAndSwapRap({
          callback: console.log,
          inputAmount,
          inputCurrency,
          outputAmount,
          outputCurrency,
          selectedGasPrice: null,
          tradeDetails,
          wallet,
          setRap,
        });

        console.log(rap)

        await executeRap(wallet, setRap, rap);
        setIsAuthorizing(false);
      } catch (error) {
        console.log(error)
        setIsAuthorizing(false);
      }
    }
    fn()
  }, [
    inputAmount,
    inputCurrency,
    isMax,
    outputAmount,
    outputCurrency,
    slippage,
    tradeDetails,
  ]);
  return (
    <View style={{ flex: 1, paddingVertical: 40 }}>
      <View style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: 'rgba(255, 0, 122, 0.1)',
          borderRadius: 24,
        }}>
          <View style={{ padding: 8 }}>
            <Text style={{ fontSize: 18 }}>🦄 Uniswap</Text>
          </View>
          <View>
            {isSuccess &&  (<Text>Successfully swaped</Text> )}
            <Input label="From" ref={inputFieldRef} token={inputCurrency} value={inputAmountDisplay} onChange={updateInputAmount} />
            <Input label="To" ref={outputFieldRef} token={outputCurrency} value={outputAmountDisplay} onChange={updateOutputAmount} />
            <Button label="Swap" onPress={handleSubmit} isDisabled={!isSufficientLiquidity} isLoading={isAuthorizing} />
          </View>
        </View>
      </View>
    </View>
  );
}