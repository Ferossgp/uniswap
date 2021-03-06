import { get } from 'lodash';
import { useCallback, useState } from 'react';
import { convertAmountFromNativeValue, convertAmountToNativeAmount, convertStringToNumber, isZero, updatePrecisionToDisplay, } from '../utilities';
export default function useSwapInputs({ defaultInputAsset, inputCurrency, isDeposit, isWithdrawal, maxInputBalance, nativeFieldRef, supplyBalanceUnderlying, type, }) {
    const [isMax, setIsMax] = useState(false);
    const [inputAmount, setInputAmount] = useState(null);
    const [inputAmountDisplay, setInputAmountDisplay] = useState(null);
    const [inputAsExactAmount, setInputAsExactAmount] = useState(true);
    const [isSufficientBalance, setIsSufficientBalance] = useState(true);
    const [nativeAmount, setNativeAmount] = useState(null);
    const [outputAmount, setOutputAmount] = useState(null);
    const [outputAmountDisplay, setOutputAmountDisplay] = useState(null);
    const updateInputAmount = useCallback((newInputAmount, newAmountDisplay, newInputAsExactAmount = true, newIsMax = false) => {
        setInputAmount(convertStringToNumber(newInputAmount));
        setInputAsExactAmount(newInputAsExactAmount);
        setInputAmountDisplay(newAmountDisplay || newInputAmount);
        setIsMax(!!newInputAmount && newIsMax);
        if ((nativeFieldRef &&
            nativeFieldRef.current &&
            !nativeFieldRef.current.isFocused()) ||
            newIsMax) {
            let newNativeAmount = null;
            const isInputZero = isZero(newInputAmount);
            if (newInputAmount && !isInputZero) {
                const newNativePrice = get(inputCurrency, 'native.price.amount', null);
                newNativeAmount = convertAmountToNativeAmount(newInputAmount, newNativePrice);
            }
            setNativeAmount(newNativeAmount);
            if (inputCurrency) {
                const newIsSufficientBalance = !newInputAmount;
                setIsSufficientBalance(newIsSufficientBalance);
            }
        }
    }, [
        defaultInputAsset,
        inputCurrency,
        isDeposit,
        isWithdrawal,
        maxInputBalance,
        supplyBalanceUnderlying,
        type,
    ]);
    const updateNativeAmount = useCallback(nativeAmount => {
        if (!inputCurrency)
            return;
        let inputAmount = null;
        let inputAmountDisplay = null;
        const isNativeZero = isZero(nativeAmount);
        setNativeAmount(nativeAmount);
        setIsMax(false);
        if (nativeAmount && !isNativeZero) {
            const nativePrice = get(inputCurrency, 'native.price.amount', null);
            inputAmount = convertAmountFromNativeValue(nativeAmount, nativePrice, inputCurrency.decimals);
            inputAmountDisplay = updatePrecisionToDisplay(inputAmount, nativePrice, true);
        }
        setInputAmount(inputAmount);
        setInputAmountDisplay(inputAmountDisplay);
        setInputAsExactAmount(true);
    }, [inputCurrency]);
    const updateOutputAmount = useCallback((newOutputAmount, newAmountDisplay, newInputAsExactAmount = false) => {
        setInputAsExactAmount(newInputAsExactAmount);
        setOutputAmount(convertStringToNumber(newOutputAmount));
        setOutputAmountDisplay(newAmountDisplay || newOutputAmount);
    }, [defaultInputAsset, isDeposit, isWithdrawal, type]);
    return {
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
    };
}
