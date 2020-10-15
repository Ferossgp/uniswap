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
exports.createUnlockAndSwapRap = exports.estimateUnlockAndSwap = exports.executeRap = exports.RapActionTypes = exports.createNewRap = exports.createNewAction = void 0;
var lodash_1 = require("lodash");
var constants_1 = require("@ethersproject/constants");
var handlers_1 = require("./handlers");
var contracts_1 = require("@ethersproject/contracts");
var utilities_1 = require("./utilities");
var index_1 = require("./index");
var unlock_1 = require("./unlock");
var web3_1 = require("./web3");
var unlock_2 = require("./unlock");
var swap_1 = require("./swap");
var estimateApproveWithExchange = function (spender, exchange) { return __awaiter(void 0, void 0, void 0, function () {
    var gasLimit, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exchange.estimateGas.approve(spender, constants_1.MaxUint256)];
            case 1:
                gasLimit = _a.sent();
                return [2 /*return*/, gasLimit ? gasLimit.toString() : index_1.ethUnits.basic_approval];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, index_1.ethUnits.basic_approval];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createNewAction = function (type, parameters) {
    var newAction = {
        parameters: parameters,
        transaction: { confirmed: null, hash: null },
        type: type
    };
    return newAction;
};
exports.createNewRap = function (actions, callback) {
    if (callback === void 0) { callback = NOOP; }
    var now = Date.now();
    var currentRap = {
        actions: actions,
        callback: callback,
        completedAt: null,
        id: "rap_" + now,
        startedAt: now
    };
    return currentRap;
};
var estimateApprove = function (tokenAddress, spender) {
    var exchange = new contracts_1.Contract(tokenAddress, index_1.erc20ABI, web3_1.web3Provider);
    return estimateApproveWithExchange(spender, exchange);
};
var defaultPreviousAction = {
    transaction: {
        confirmed: true
    }
};
var NOOP = function () { return undefined; };
exports.RapActionTypes = {
    swap: 'swap',
    unlock: 'unlock'
};
var findActionByType = function (type) {
    switch (type) {
        case exports.RapActionTypes.unlock:
            return unlock_2["default"];
        case exports.RapActionTypes.swap:
            return swap_1["default"];
        default:
            return NOOP;
    }
};
exports.executeRap = function (wallet, updateRap, rap) { return __awaiter(void 0, void 0, void 0, function () {
    var actions, index, previousAction, previousActionWasSuccess, action, parameters, type, actionPromise, output, nextAction, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                actions = rap.actions;
                index = 0;
                _a.label = 1;
            case 1:
                if (!(index < actions.length)) return [3 /*break*/, 6];
                previousAction = index ? actions[index - 1] : defaultPreviousAction;
                previousActionWasSuccess = lodash_1.get(previousAction, 'transaction.confirmed', false);
                if (!previousActionWasSuccess)
                    return [3 /*break*/, 6];
                action = actions[index];
                parameters = action.parameters, type = action.type;
                actionPromise = findActionByType(type);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, actionPromise(wallet, rap, index, parameters, updateRap)];
            case 3:
                output = _a.sent();
                nextAction = index < actions.length - 1 ? actions[index + 1] : null;
                console.log("execute", type);
                if (nextAction) {
                    nextAction.parameters.override = output;
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("execute error", error_2);
                return [3 /*break*/, 6];
            case 5:
                index++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.estimateUnlockAndSwap = function (_a) {
    var inputAmount = _a.inputAmount, inputCurrency = _a.inputCurrency, outputAmount = _a.outputAmount, outputCurrency = _a.outputCurrency, tradeDetails = _a.tradeDetails, settings = _a.settings;
    return __awaiter(void 0, void 0, void 0, function () {
        var isValid, accountAddress, chainId, gasLimits, swapAssetNeedsUnlocking, unlockGasLimit, swapGasLimit;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!inputAmount)
                        inputAmount = 1;
                    if (!outputAmount)
                        outputAmount = 1;
                    isValid = true;
                    if (!isValid)
                        return [2 /*return*/, index_1.ethUnits.basic_swap];
                    accountAddress = settings.accountAddress, chainId = settings.chainId;
                    gasLimits = [];
                    return [4 /*yield*/, unlock_1.assetNeedsUnlocking(accountAddress, inputAmount, inputCurrency, index_1.UNISWAP_V2_ROUTER_ADDRESS)];
                case 1:
                    swapAssetNeedsUnlocking = _b.sent();
                    if (!swapAssetNeedsUnlocking) return [3 /*break*/, 3];
                    return [4 /*yield*/, estimateApprove(inputCurrency.address, index_1.UNISWAP_V2_ROUTER_ADDRESS)];
                case 2:
                    unlockGasLimit = _b.sent();
                    gasLimits = lodash_1.concat(gasLimits, unlockGasLimit);
                    _b.label = 3;
                case 3: return [4 /*yield*/, handlers_1.estimateSwapGasLimit({
                        accountAddress: accountAddress,
                        chainId: chainId,
                        tradeDetails: tradeDetails
                    })];
                case 4:
                    swapGasLimit = (_b.sent()).gasLimit;
                    gasLimits = lodash_1.concat(gasLimits, swapGasLimit);
                    return [2 /*return*/, lodash_1.reduce(gasLimits, function (acc, limit) { return utilities_1.add(acc, limit); }, '0')];
            }
        });
    });
};
exports.createUnlockAndSwapRap = function (_a) {
    var callback = _a.callback, inputAmount = _a.inputAmount, inputCurrency = _a.inputCurrency, outputCurrency = _a.outputCurrency, selectedGasPrice = _a.selectedGasPrice, tradeDetails = _a.tradeDetails, wallet = _a.wallet, setRap = _a.setRap;
    return __awaiter(void 0, void 0, void 0, function () {
        var accountAddress, actions, swapAssetNeedsUnlocking, unlock_3, swap, newRap;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    accountAddress = wallet.accountAddress;
                    actions = [];
                    return [4 /*yield*/, unlock_1.assetNeedsUnlocking(accountAddress, inputAmount, inputCurrency, index_1.UNISWAP_V2_ROUTER_ADDRESS)];
                case 1:
                    swapAssetNeedsUnlocking = _b.sent();
                    if (swapAssetNeedsUnlocking) {
                        unlock_3 = exports.createNewAction(exports.RapActionTypes.unlock, {
                            accountAddress: accountAddress,
                            amount: inputAmount,
                            assetToUnlock: inputCurrency,
                            contractAddress: index_1.UNISWAP_V2_ROUTER_ADDRESS
                        });
                        actions = lodash_1.concat(actions, unlock_3);
                    }
                    swap = exports.createNewAction(exports.RapActionTypes.swap, {
                        accountAddress: accountAddress,
                        inputAmount: inputAmount,
                        inputCurrency: inputCurrency,
                        outputCurrency: outputCurrency,
                        selectedGasPrice: selectedGasPrice,
                        tradeDetails: tradeDetails
                    });
                    actions = lodash_1.concat(actions, swap);
                    newRap = exports.createNewRap(actions, callback);
                    setRap(newRap);
                    return [2 /*return*/, newRap];
            }
        });
    });
};
