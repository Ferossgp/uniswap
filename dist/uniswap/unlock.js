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
import { get, toLower } from 'lodash';
import TransactionStatusTypes from './transactionStatusTypes';
import TransactionTypes from './transactionTypes';
import { convertAmountToRawAmount, greaterThan, isZero, } from './utilities';
import ethereumUtils from './ethUtils';
const NOOP = () => undefined;
class AllowancesCache {
}
AllowancesCache.cache = {};
const unlock = (wallet, currentRap, index, parameters, updateRap) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, assetToUnlock, contractAddress, override } = parameters;
    const _amount = override || amount;
    const gasPrice = wallet.provider.getGasPrice();
    const { address: assetAddress } = assetToUnlock;
    // unlocks should always use fast gas
    let gasLimit;
    try {
        gasLimit = yield ethereumUtils.estimateApprove(assetAddress, contractAddress);
    }
    catch (e) {
        throw e;
    }
    let approval;
    try {
        const result = yield ethereumUtils.approve(assetAddress, contractAddress, gasLimit, gasPrice, wallet);
        approval = result === null || result === void 0 ? void 0 : result.approval;
    }
    catch (e) {
        throw e;
    }
    const cacheKey = toLower(`${wallet.address}|${assetAddress}|${contractAddress}`);
    // Cache the approved value
    AllowancesCache.cache[cacheKey] = MaxUint256;
    // update rap for hash
    currentRap.actions[index].transaction.hash = approval.hash;
    updateRap(currentRap.id, currentRap);
    wallet.provider.sendTransaction({
        amount: 0,
        asset: assetToUnlock,
        from: wallet.address,
        hash: approval.hash,
        nonce: get(approval, 'nonce'),
        status: TransactionStatusTypes.approving,
        to: get(approval, 'to'),
        type: TransactionTypes.authorize,
    }, wallet.address);
    currentRap.callback();
    currentRap.callback = NOOP;
    try {
        const receipt = yield wallet.provider.waitForTransaction(approval.hash);
        if (!isZero(receipt.status)) {
            // update rap for confirmed status
            currentRap.actions[index].transaction.confirmed = true;
            updateRap(currentRap.id, currentRap);
        }
        else {
            currentRap.actions[index].transaction.confirmed = false;
            updateRap(currentRap.id, currentRap);
        }
    }
    catch (error) {
        currentRap.actions[index].transaction.confirmed = false;
        updateRap(currentRap.id, currentRap);
    }
    return _amount;
});
export const assetNeedsUnlocking = (accountAddress, amount, assetToUnlock, contractAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = assetToUnlock;
    const isInputEth = address === 'eth';
    if (isInputEth) {
        return false;
    }
    const cacheKey = toLower(`${accountAddress}|${address}|${contractAddress}`);
    let allowance;
    // Check on cache first
    if (AllowancesCache.cache[cacheKey]) {
        allowance = AllowancesCache.cache[cacheKey];
    }
    else {
        allowance = yield ethereumUtils.getRawAllowance(accountAddress, assetToUnlock, contractAddress);
        // Cache that value
        AllowancesCache.cache[cacheKey] = allowance;
    }
    const rawAmount = convertAmountToRawAmount(amount, assetToUnlock.decimals);
    const assetNeedsUnlocking = !greaterThan(allowance, rawAmount);
    return assetNeedsUnlocking;
});
export default unlock;
