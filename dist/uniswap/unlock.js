"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.assetNeedsUnlocking = void 0;
var constants_1 = require("@ethersproject/constants");
var lodash_1 = require("lodash");
var transactionStatusTypes_1 = require("./transactionStatusTypes");
var transactionTypes_1 = require("./transactionTypes");
var utilities_1 = require("./utilities");
var ethUtils_1 = require("./ethUtils");
var NOOP = function () { return undefined; };
var AllowancesCache = /** @class */ (function () {
    function AllowancesCache() {
    }
    AllowancesCache.cache = {};
    return AllowancesCache;
}());
var unlock = function (wallet, currentRap, index, parameters, updateRap) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, assetToUnlock, contractAddress, override, _amount, gasPrice, assetAddress, gasLimit, e_1, approval, result, e_2, cacheKey, receipt, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amount = parameters.amount, assetToUnlock = parameters.assetToUnlock, contractAddress = parameters.contractAddress, override = parameters.override;
                _amount = override || amount;
                gasPrice = wallet.provider.getGasPrice();
                assetAddress = assetToUnlock.address;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ethUtils_1["default"].estimateApprove(assetAddress, contractAddress)];
            case 2:
                gasLimit = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                throw e_1;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, ethUtils_1["default"].approve(assetAddress, contractAddress, gasLimit, gasPrice, wallet)];
            case 5:
                result = _a.sent();
                approval = result === null || result === void 0 ? void 0 : result.approval;
                return [3 /*break*/, 7];
            case 6:
                e_2 = _a.sent();
                throw e_2;
            case 7:
                cacheKey = lodash_1.toLower(wallet.address + "|" + assetAddress + "|" + contractAddress);
                // Cache the approved value
                AllowancesCache.cache[cacheKey] = constants_1.MaxUint256;
                // update rap for hash
                currentRap.actions[index].transaction.hash = approval.hash;
                updateRap(currentRap.id, currentRap);
                wallet.provider.sendTransaction({
                    amount: 0,
                    asset: assetToUnlock,
                    from: wallet.address,
                    hash: approval.hash,
                    nonce: lodash_1.get(approval, 'nonce'),
                    status: transactionStatusTypes_1["default"].approving,
                    to: lodash_1.get(approval, 'to'),
                    type: transactionTypes_1["default"].authorize
                }, wallet.address);
                currentRap.callback();
                currentRap.callback = NOOP;
                _a.label = 8;
            case 8:
                _a.trys.push([8, 10, , 11]);
                return [4 /*yield*/, wallet.provider.waitForTransaction(approval.hash)];
            case 9:
                receipt = _a.sent();
                if (!utilities_1.isZero(receipt.status)) {
                    // update rap for confirmed status
                    currentRap.actions[index].transaction.confirmed = true;
                    updateRap(currentRap.id, currentRap);
                }
                else {
                    currentRap.actions[index].transaction.confirmed = false;
                    updateRap(currentRap.id, currentRap);
                }
                return [3 /*break*/, 11];
            case 10:
                error_1 = _a.sent();
                currentRap.actions[index].transaction.confirmed = false;
                updateRap(currentRap.id, currentRap);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/, _amount];
        }
    });
}); };
exports.assetNeedsUnlocking = function (accountAddress, amount, assetToUnlock, contractAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var address, isInputEth, cacheKey, allowance, rawAmount, assetNeedsUnlocking;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = assetToUnlock.address;
                isInputEth = address === 'eth';
                if (isInputEth) {
                    return [2 /*return*/, false];
                }
                cacheKey = lodash_1.toLower(accountAddress + "|" + address + "|" + contractAddress);
                if (!AllowancesCache.cache[cacheKey]) return [3 /*break*/, 1];
                allowance = AllowancesCache.cache[cacheKey];
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, ethUtils_1["default"].getRawAllowance(accountAddress, assetToUnlock, contractAddress)];
            case 2:
                allowance = _a.sent();
                // Cache that value
                AllowancesCache.cache[cacheKey] = allowance;
                _a.label = 3;
            case 3:
                rawAmount = utilities_1.convertAmountToRawAmount(amount, assetToUnlock.decimals);
                assetNeedsUnlocking = !utilities_1.greaterThan(allowance, rawAmount);
                return [2 /*return*/, assetNeedsUnlocking];
        }
    });
}); };
exports["default"] = unlock;
