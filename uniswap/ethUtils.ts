import {MaxUint256} from '@ethersproject/constants';
import {Contract} from '@ethersproject/contracts';
import {web3Provider} from './web3';
import {erc20ABI} from './index'

/**
 * @desc remove hex prefix
 * @param  {String} hex
 * @return {String}
 */
const removeHexPrefix = (hex) => replace(toLower(hex), '0x', '');

/**
 * @desc pad string to specific width and padding
 * @param  {String} n
 * @param  {Number} width
 * @param  {String} z
 * @return {String}
 */
const padLeft = (n, width, z) => {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const estimateApproveWithExchange = async (spender, exchange) => {
  try {
    const gasLimit = await exchange.estimateGas.approve(spender, MaxUint256);
    return gasLimit ? gasLimit.toString() : ethUnits.basic_approval;
  } catch (error) {
    return ethUnits.basic_approval;
  }
};

const estimateApprove = (tokenAddress, spender) => {
  const exchange = new Contract(tokenAddress, erc20ABI, web3Provider);
  return estimateApproveWithExchange(spender, exchange);
};

const approve = async (
  tokenAddress,
  spender,
  gasLimit,
  gasPrice,
  wallet = null,
) => {
  const exchange = new Contract(tokenAddress, erc20ABI, wallet);
  const approval = await exchange.approve(spender, MaxUint256, {
    gasLimit: gasLimit || undefined,
    gasPrice: gasPrice || undefined,
  });
  return {
    approval,
    creationTimestamp: Date.now(),
  };
};

const getRawAllowance = async (owner, token, spender) => {
  const {address: tokenAddress} = token;
  const tokenContract = new Contract(tokenAddress, erc20ABI, web3Provider);
  const allowance = await tokenContract.allowance(owner, spender);
  return allowance.toString();
};

export default {
  padLeft,
  removeHexPrefix,
  estimateApprove,
  approve,
  getRawAllowance,
};
