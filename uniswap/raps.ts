import {concat, reduce, omit, get, join, map} from 'lodash';
import { MaxUint256 } from '@ethersproject/constants';
import {estimateSwapGasLimit} from './handlers';
import { Contract } from '@ethersproject/contracts';
import {add} from './utilities';
import {ethUnits, UNISWAP_V2_ROUTER_ADDRESS} from './index';
import {assetNeedsUnlocking} from './unlock';
import { web3Provider } from './web3'
import erc20ABI from './erc20-abi.json'
import unlock from './unlock'
import swap from './swap'

const estimateApproveWithExchange = async (spender, exchange) => {
  try {
    const gasLimit = await exchange.estimateGas.approve(spender, MaxUint256);
    return gasLimit ? gasLimit.toString() : ethUnits.basic_approval;
  } catch (error) {
    return ethUnits.basic_approval;
  }
};
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

export const executeRap = async (wallet, updateRap, rap) => {
  const {actions} = rap;
  for (let index = 0; index < actions.length; index++) {
    const previousAction = index ? actions[index - 1] : defaultPreviousAction;
    const previousActionWasSuccess = get(
      previousAction,
      'transaction.confirmed',
      false,
    );
    if (!previousActionWasSuccess) break;

    const action = actions[index];
    const {parameters, type} = action;
    const actionPromise = findActionByType(type);

    try {
      const output = await actionPromise(wallet, rap, index, parameters, updateRap);
      const nextAction = index < actions.length - 1 ? actions[index + 1] : null;
      console.log("execute", type)

      if (nextAction) {
        nextAction.parameters.override = output;
      }
    } catch (error) {
      console.error("execute error", error)

      break;
    }
  }
};

export const estimateUnlockAndSwap = async ({
  inputAmount,
  inputCurrency,
  outputAmount,
  outputCurrency,
  tradeDetails,
  settings,
}) => {
  if (!inputAmount) inputAmount = 1;
  if (!outputAmount) outputAmount = 1;

  const isValid = true

  if (!isValid) return ethUnits.basic_swap;

  const {accountAddress, chainId} = settings;

  let gasLimits = [];
  const swapAssetNeedsUnlocking = await assetNeedsUnlocking(
    accountAddress,
    inputAmount,
    inputCurrency,
    UNISWAP_V2_ROUTER_ADDRESS,
  );
  if (swapAssetNeedsUnlocking) {
    const unlockGasLimit = await estimateApprove(
      inputCurrency.address,
      UNISWAP_V2_ROUTER_ADDRESS,
    );
    gasLimits = concat(gasLimits, unlockGasLimit);
  }

  const {gasLimit: swapGasLimit} = await estimateSwapGasLimit({
    accountAddress,
    chainId,
    tradeDetails,
  });
  gasLimits = concat(gasLimits, swapGasLimit);

  return reduce(gasLimits, (acc, limit) => add(acc, limit), '0');
};

export const createUnlockAndSwapRap = async ({
  callback,
  inputAmount,
  inputCurrency,
  outputCurrency,
  selectedGasPrice,
  tradeDetails,
  settings,
  setRap,
}) => {
  // create unlock rap
  const {accountAddress} = settings;
  let actions = [];

  const swapAssetNeedsUnlocking = await assetNeedsUnlocking(
    accountAddress,
    inputAmount,
    inputCurrency,
    UNISWAP_V2_ROUTER_ADDRESS,
  );

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
  setRap(newRap)
  return newRap;
};

