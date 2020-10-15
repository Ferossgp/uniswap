var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MaxUint256 } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { web3Provider } from './web3';
import { erc20ABI } from './index';
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
const estimateApproveWithExchange = (spender, exchange) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gasLimit = yield exchange.estimateGas.approve(spender, MaxUint256);
        return gasLimit ? gasLimit.toString() : ethUnits.basic_approval;
    }
    catch (error) {
        return ethUnits.basic_approval;
    }
});
const estimateApprove = (tokenAddress, spender) => {
    const exchange = new Contract(tokenAddress, erc20ABI, web3Provider);
    return estimateApproveWithExchange(spender, exchange);
};
const approve = (tokenAddress, spender, gasLimit, gasPrice, wallet = null) => __awaiter(void 0, void 0, void 0, function* () {
    const exchange = new Contract(tokenAddress, erc20ABI, wallet);
    const approval = yield exchange.approve(spender, MaxUint256, {
        gasLimit: gasLimit || undefined,
        gasPrice: gasPrice || undefined,
    });
    return {
        approval,
        creationTimestamp: Date.now(),
    };
});
const getRawAllowance = (owner, token, spender) => __awaiter(void 0, void 0, void 0, function* () {
    const { address: tokenAddress } = token;
    const tokenContract = new Contract(tokenAddress, erc20ABI, web3Provider);
    const allowance = yield tokenContract.allowance(owner, spender);
    return allowance.toString();
});
export default {
    padLeft,
    removeHexPrefix,
    estimateApprove,
    approve,
    getRawAllowance,
};
