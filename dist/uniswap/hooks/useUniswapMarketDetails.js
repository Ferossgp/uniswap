import { get, isEmpty } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { calculateTradeDetails } from '../handlers';
import { convertAmountFromNativeValue, greaterThanOrEqualTo, isZero, updatePrecisionToDisplay, } from '../utilities';
import useUniswapPairs from './useUniswapPairs';
const DEFAULT_NATIVE_INPUT_AMOUNT = 50;
export default function useUniswapMarketDetails({ defaultInputAddress, extraTradeDetails, inputAmount, inputAsExactAmount, inputCurrency, inputFieldRef, isDeposit, isWithdrawal, maxInputBalance, nativeCurrency, outputAmount, outputCurrency, outputFieldRef, setIsSufficientBalance, setSlippage, updateExtraTradeDetails, updateInputAmount, updateOutputAmount, chainId, }) {
    const [isSufficientLiquidity, setIsSufficientLiquidity] = useState(true);
    const [tradeDetails, setTradeDetails] = useState(null);
    const { allPairs, doneLoadingResults } = useUniswapPairs(inputCurrency, outputCurrency, chainId);
    const swapNotNeeded = useMemo(() => {
        return ((isDeposit || isWithdrawal) &&
            get(inputCurrency, 'address') === defaultInputAddress);
    }, [defaultInputAddress, inputCurrency, isDeposit, isWithdrawal]);
    const isMissingCurrency = !inputCurrency || !outputCurrency;
    const isMissingAmounts = (isEmpty(inputAmount) || isZero(inputAmount)) &&
        (isEmpty(outputAmount) || isZero(outputAmount));
    const updateTradeDetails = useCallback(() => {
        let updatedInputAmount = inputAmount;
        let updatedInputAsExactAmount = inputAsExactAmount;
        if (isMissingAmounts) {
            const inputNativePrice = get(inputCurrency, 'native.price.amount', 10);
            updatedInputAmount = convertAmountFromNativeValue(DEFAULT_NATIVE_INPUT_AMOUNT, inputNativePrice, inputCurrency.decimals);
            updatedInputAsExactAmount = true;
        }
        const newTradeDetails = calculateTradeDetails(chainId, updatedInputAmount, outputAmount, inputCurrency, outputCurrency, allPairs, updatedInputAsExactAmount);
        console.log("calculateTradeDetails", chainId, updatedInputAmount, outputAmount, inputCurrency, outputCurrency, allPairs, updatedInputAsExactAmount);
        const hasInsufficientLiquidity = doneLoadingResults && (isEmpty(allPairs) || !newTradeDetails);
        setIsSufficientLiquidity(!hasInsufficientLiquidity);
        setTradeDetails(newTradeDetails);
    }, [
        doneLoadingResults,
        allPairs,
        chainId,
        inputAmount,
        inputAsExactAmount,
        inputCurrency,
        isMissingAmounts,
        outputAmount,
        outputCurrency,
    ]);
    const calculateInputGivenOutputChange = useCallback(({ isOutputEmpty, isOutputZero }) => {
        var _a;
        if (isOutputEmpty || isOutputZero) {
            updateInputAmount(undefined, undefined, false);
            setIsSufficientBalance(true);
        }
        else {
            const rawUpdatedInputAmount = (_a = tradeDetails === null || tradeDetails === void 0 ? void 0 : tradeDetails.inputAmount) === null || _a === void 0 ? void 0 : _a.toExact();
            const updatedInputAmountDisplay = updatePrecisionToDisplay(rawUpdatedInputAmount, get(inputCurrency, 'price.value'), true);
            updateInputAmount(rawUpdatedInputAmount, updatedInputAmountDisplay, inputAsExactAmount);
            const isSufficientAmountToTrade = greaterThanOrEqualTo(maxInputBalance, rawUpdatedInputAmount);
            setIsSufficientBalance(isSufficientAmountToTrade);
        }
    }, [
        inputAsExactAmount,
        inputCurrency,
        maxInputBalance,
        setIsSufficientBalance,
        tradeDetails,
        updateInputAmount,
    ]);
    const calculateOutputGivenInputChange = useCallback(({ isInputEmpty, isInputZero }) => {
        var _a;
        if ((isInputEmpty || isInputZero) &&
            outputFieldRef &&
            outputFieldRef.current &&
            !outputFieldRef.current.isFocused()) {
            updateOutputAmount(null, null, true);
        }
        else {
            const rawUpdatedOutputAmount = (_a = tradeDetails === null || tradeDetails === void 0 ? void 0 : tradeDetails.outputAmount) === null || _a === void 0 ? void 0 : _a.toExact();
            if (!isZero(rawUpdatedOutputAmount)) {
                const { outputPriceValue } = extraTradeDetails;
                const updatedOutputAmountDisplay = updatePrecisionToDisplay(rawUpdatedOutputAmount, outputPriceValue);
                updateOutputAmount(rawUpdatedOutputAmount, updatedOutputAmountDisplay, inputAsExactAmount);
            }
        }
    }, [
        extraTradeDetails,
        inputAsExactAmount,
        outputFieldRef,
        tradeDetails,
        updateOutputAmount,
    ]);
    const updateInputOutputAmounts = useCallback(() => {
        try {
            const isMissingAmounts = !inputAmount && !outputAmount;
            if (isMissingAmounts)
                return;
            const newIsSufficientBalance = !inputAmount || greaterThanOrEqualTo(maxInputBalance, inputAmount);
            setIsSufficientBalance(newIsSufficientBalance);
            const isInputEmpty = !inputAmount;
            const isOutputEmpty = !outputAmount;
            const isInputZero = Number(inputAmount) === 0;
            const isOutputZero = Number(outputAmount) === 0;
            // update output amount given input amount changes
            if (inputAsExactAmount) {
                calculateOutputGivenInputChange({
                    isInputEmpty,
                    isInputZero,
                });
            }
            // update input amount given output amount changes
            if (!inputAsExactAmount &&
                inputFieldRef &&
                inputFieldRef.current &&
                !inputFieldRef.current.isFocused()) {
                calculateInputGivenOutputChange({
                    isOutputEmpty,
                    isOutputZero,
                });
            }
        }
        catch (error) {
            console.log('error getting market details', error);
        }
    }, [
        inputAmount,
        inputAsExactAmount,
        inputFieldRef,
        maxInputBalance,
        outputAmount,
        setIsSufficientBalance,
        calculateInputGivenOutputChange,
        calculateOutputGivenInputChange,
    ]);
    useEffect(() => {
        console.log("sMissingCurrency, swapNotNeeded, updateTradeDetails", isMissingCurrency, swapNotNeeded, updateTradeDetails);
        if (swapNotNeeded || isMissingCurrency)
            return;
        updateTradeDetails();
    }, [isMissingCurrency, swapNotNeeded, updateTradeDetails]);
    useEffect(() => {
        console.log("sMissingCurrency, swapNotNeeded, updateInputOutputAmounts");
        if (swapNotNeeded || isMissingCurrency)
            return;
        updateInputOutputAmounts();
    }, [isMissingCurrency, swapNotNeeded, updateInputOutputAmounts]);
    useEffect(() => {
        console.log("needed");
        if (swapNotNeeded || isMissingCurrency)
            return;
        updateExtraTradeDetails({
            inputCurrency,
            nativeCurrency,
            outputCurrency,
            tradeDetails,
        });
    }, [
        inputCurrency,
        isMissingCurrency,
        nativeCurrency,
        outputCurrency,
        swapNotNeeded,
        tradeDetails,
        updateExtraTradeDetails,
    ]);
    useEffect(() => {
        var _a;
        console.log("update slippage");
        // update slippage
        if (swapNotNeeded || isMissingCurrency)
            return;
        if (isMissingAmounts) {
            setSlippage(0);
            return;
        }
        const priceImpact = (tradeDetails === null || tradeDetails === void 0 ? void 0 : tradeDetails.priceImpact) ? (_a = tradeDetails === null || tradeDetails === void 0 ? void 0 : tradeDetails.priceImpact) === null || _a === void 0 ? void 0 : _a.toFixed(2).toString() : 0;
        const slippage = priceImpact * 100;
        setSlippage(slippage);
    }, [
        isMissingAmounts,
        isMissingCurrency,
        setSlippage,
        swapNotNeeded,
        tradeDetails,
    ]);
    return {
        isSufficientLiquidity,
        tradeDetails,
    };
}
