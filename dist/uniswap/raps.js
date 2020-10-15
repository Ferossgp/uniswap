var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { concat, reduce, get } from 'lodash';
import { MaxUint256 } from '@ethersproject/constants';
import { estimateSwapGasLimit } from './handlers';
import { Contract } from '@ethersproject/contracts';
import { add } from './utilities';
import { ethUnits, erc20ABI, UNISWAP_V2_ROUTER_ADDRESS } from './index';
import { assetNeedsUnlocking } from './unlock';
import { web3Provider } from './web3';
import unlock from './unlock';
import swap from './swap';
const estimateApproveWithExchange = (spender, exchange) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gasLimit = yield exchange.estimateGas.approve(spender, MaxUint256);
        return gasLimit ? gasLimit.toString() : ethUnits.basic_approval;
    }
    catch (error) {
        return ethUnits.basic_approval;
    }
});
export const createNewAction = (type, parameters) => {
    const newAction = {
        parameters,
        transaction: { confirmed: null, hash: null },
        type,
    };
    return newAction;
};
export const createNewRap = (actions, callback = NOOP) => {
    const now = Date.now();
    const currentRap = {
        actions,
        callback,
        completedAt: null,
        id: `rap_${now}`,
        startedAt: now,
    };
    return currentRap;
};
const estimateApprove = (tokenAddress, spender) => {
    const exchange = new Contract(tokenAddress, erc20ABI, web3Provider);
    return estimateApproveWithExchange(spender, exchange);
};
const defaultPreviousAction = {
    transaction: {
        confirmed: true,
    },
};
const NOOP = () => undefined;
export const RapActionTypes = {
    swap: 'swap',
    unlock: 'unlock',
};
const findActionByType = type => {
    switch (type) {
        case RapActionTypes.unlock:
            return unlock;
        case RapActionTypes.swap:
            return swap;
        default:
            return NOOP;
    }
};
export const executeRap = (wallet, updateRap, rap) => __awaiter(void 0, void 0, void 0, function* () {
    const { actions } = rap;
    for (let index = 0; index < actions.length; index++) {
        const previousAction = index ? actions[index - 1] : defaultPreviousAction;
        const previousActionWasSuccess = get(previousAction, 'transaction.confirmed', false);
        if (!previousActionWasSuccess)
            break;
        const action = actions[index];
        const { parameters, type } = action;
        const actionPromise = findActionByType(type);
        try {
            const output = yield actionPromise(wallet, rap, index, parameters, updateRap);
            const nextAction = index < actions.length - 1 ? actions[index + 1] : null;
            console.log("execute", type);
            if (nextAction) {
                nextAction.parameters.override = output;
            }
        }
        catch (error) {
            console.error("execute error", error);
            break;
        }
    }
});
export const estimateUnlockAndSwap = ({ inputAmount, inputCurrency, outputAmount, outputCurrency, tradeDetails, wallet, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!inputAmount)
        inputAmount = 1;
    if (!outputAmount)
        outputAmount = 1;
    const isValid = true;
    if (!isValid)
        return ethUnits.basic_swap;
    const { accountAddress, chainId } = wallet;
    let gasLimits = [];
    const swapAssetNeedsUnlocking = yield assetNeedsUnlocking(accountAddress, inputAmount, inputCurrency, UNISWAP_V2_ROUTER_ADDRESS);
    if (swapAssetNeedsUnlocking) {
        const unlockGasLimit = yield estimateApprove(inputCurrency.address, UNISWAP_V2_ROUTER_ADDRESS);
        gasLimits = concat(gasLimits, unlockGasLimit);
    }
    const { gasLimit: swapGasLimit } = yield estimateSwapGasLimit({
        accountAddress,
        chainId,
        tradeDetails,
    });
    gasLimits = concat(gasLimits, swapGasLimit);
    return reduce(gasLimits, (acc, limit) => add(acc, limit), '0');
});
export const createUnlockAndSwapRap = ({ callback, inputAmount, inputCurrency, outputCurrency, selectedGasPrice, tradeDetails, wallet, setRap, }) => __awaiter(void 0, void 0, void 0, function* () {
    // create unlock rap
    const { accountAddress } = wallet;
    let actions = [];
    const swapAssetNeedsUnlocking = yield assetNeedsUnlocking(accountAddress, inputAmount, inputCurrency, UNISWAP_V2_ROUTER_ADDRESS);
    if (swapAssetNeedsUnlocking) {
        const unlock = createNewAction(RapActionTypes.unlock, {
            accountAddress,
            amount: inputAmount,
            assetToUnlock: inputCurrency,
            contractAddress: UNISWAP_V2_ROUTER_ADDRESS,
        });
        actions = concat(actions, unlock);
    }
    // create a swap rap
    const swap = createNewAction(RapActionTypes.swap, {
        accountAddress,
        inputAmount,
        inputCurrency,
        outputCurrency,
        selectedGasPrice,
        tradeDetails,
    });
    actions = concat(actions, swap);
    // create the overall rap
    const newRap = createNewRap(actions, callback);
    setRap(newRap);
    return newRap;
});
