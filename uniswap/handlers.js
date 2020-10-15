"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getTokenForCurrency = exports.calculateTradeDetails = exports.executeSwap = exports.estimateSwapGasLimit = exports.getTestnetUniswapPairs = void 0;
var contracts_1 = require("@ethersproject/contracts");
var sdk_1 = require("@uniswap/sdk");
var index_1 = require("./index");
var utilities_1 = require("./utilities");
var lodash_1 = require("lodash");
var web3_1 = require("./web3");
var Field;
(function (Field) {
    Field["INPUT"] = "INPUT";
    Field["OUTPUT"] = "OUTPUT";
})(Field || (Field = {}));
var SwapType;
(function (SwapType) {
    SwapType[SwapType["EXACT_TOKENS_FOR_TOKENS"] = 0] = "EXACT_TOKENS_FOR_TOKENS";
    SwapType[SwapType["EXACT_TOKENS_FOR_ETH"] = 1] = "EXACT_TOKENS_FOR_ETH";
    SwapType[SwapType["EXACT_ETH_FOR_TOKENS"] = 2] = "EXACT_ETH_FOR_TOKENS";
    SwapType[SwapType["TOKENS_FOR_EXACT_TOKENS"] = 3] = "TOKENS_FOR_EXACT_TOKENS";
    SwapType[SwapType["TOKENS_FOR_EXACT_ETH"] = 4] = "TOKENS_FOR_EXACT_ETH";
    SwapType[SwapType["ETH_FOR_EXACT_TOKENS"] = 5] = "ETH_FOR_EXACT_TOKENS";
})(SwapType || (SwapType = {}));
var DefaultMaxSlippageInBips = 200;
var SlippageBufferInBips = 100;
// default allowed slippage, in bips
var INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
var DEFAULT_DEADLINE_FROM_NOW = 60 * 20;
exports.getTestnetUniswapPairs = function (network) {
    var pairs = lodash_1.get(index_1.UNISWAP_TESTNET_TOKEN_LIST, network, {});
    var loweredPairs = lodash_1.mapKeys(pairs, function (_, key) { return lodash_1.toLower(key); });
    return lodash_1.mapValues(loweredPairs, function (value) { return (__assign({}, value)); });
};
exports.estimateSwapGasLimit = function (_a) {
    var accountAddress = _a.accountAddress, chainId = _a.chainId, tradeDetails = _a.tradeDetails;
    return __awaiter(void 0, void 0, void 0, function () {
        var methodName, _b, exchange_1, methodNames, updatedMethodArgs_1, value, params_1, gasEstimates, i, indexOfSuccessfulEstimation, gasEstimate, gasLimit, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    methodName = null;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _b = getContractExecutionDetails({
                        accountAddress: accountAddress,
                        chainId: chainId,
                        providerOrSigner: web3_1.web3Provider,
                        tradeDetails: tradeDetails
                    }), exchange_1 = _b.exchange, methodNames = _b.methodNames, updatedMethodArgs_1 = _b.updatedMethodArgs, value = _b.value;
                    params_1 = __assign({ from: accountAddress }, (value ? { value: value } : {}));
                    return [4 /*yield*/, Promise.all(methodNames.map(function (methodName) {
                            var _a;
                            return (_a = exchange_1.estimateGas)[methodName].apply(_a, __spreadArrays(updatedMethodArgs_1, [params_1])).then(function (value) { return value; })["catch"](function (_) {
                                return undefined;
                            });
                        }))];
                case 2:
                    gasEstimates = _c.sent();
                    // we expect failures from left to right, so throw if we see failures
                    // from right to left
                    for (i = 0; i < gasEstimates.length - 1; i++) {
                        // if the FoT method fails, but the regular method does not, we should not
                        // use the regular method. this probably means something is wrong with the fot token.
                        if (gasEstimates[i] && !gasEstimates[i + 1]) {
                            return [2 /*return*/, { gasLimit: index_1.ethUnits.basic_swap, methodName: null }];
                        }
                    }
                    indexOfSuccessfulEstimation = gasEstimates.findIndex(function (gasEstimate) { return !!gasEstimate; });
                    // all estimations failed...
                    if (indexOfSuccessfulEstimation === -1) {
                        return [2 /*return*/, { gasLimit: index_1.ethUnits.basic_swap, methodName: null }];
                    }
                    else {
                        methodName = methodNames[indexOfSuccessfulEstimation];
                        gasEstimate = gasEstimates[indexOfSuccessfulEstimation];
                        gasLimit = (gasEstimate === null || gasEstimate === void 0 ? void 0 : gasEstimate.toString()) || index_1.ethUnits.basic_swap;
                        return [2 /*return*/, { gasLimit: gasLimit, methodName: methodName }];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    console.log('estimateSwapGasLimit', error_1);
                    return [2 /*return*/, {
                            gasLimit: index_1.ethUnits.basic_swap
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var getSwapType = function (tokens, isExactIn, chainId) {
    var _a, _b, _c, _d;
    if (isExactIn) {
        if ((_a = tokens[Field.INPUT]) === null || _a === void 0 ? void 0 : _a.equals(sdk_1.WETH[chainId])) {
            return SwapType.EXACT_ETH_FOR_TOKENS;
        }
        else if ((_b = tokens[Field.OUTPUT]) === null || _b === void 0 ? void 0 : _b.equals(sdk_1.WETH[chainId])) {
            return SwapType.EXACT_TOKENS_FOR_ETH;
        }
        else {
            return SwapType.EXACT_TOKENS_FOR_TOKENS;
        }
    }
    else {
        if ((_c = tokens[Field.INPUT]) === null || _c === void 0 ? void 0 : _c.equals(sdk_1.WETH[chainId])) {
            return SwapType.ETH_FOR_EXACT_TOKENS;
        }
        else if ((_d = tokens[Field.OUTPUT]) === null || _d === void 0 ? void 0 : _d.equals(sdk_1.WETH[chainId])) {
            return SwapType.TOKENS_FOR_EXACT_ETH;
        }
        else {
            return SwapType.TOKENS_FOR_EXACT_TOKENS;
        }
    }
};
var computeSlippageAdjustedAmounts = function (trade, allowedSlippage) {
    var _a;
    var pct = new sdk_1.Percent(allowedSlippage, '10000');
    var results = (_a = {},
        _a[Field.INPUT] = trade === null || trade === void 0 ? void 0 : trade.maximumAmountIn(pct),
        _a[Field.OUTPUT] = trade === null || trade === void 0 ? void 0 : trade.minimumAmountOut(pct),
        _a);
    return results;
};
// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
var getExecutionDetails = function (_a) {
    var _b;
    var accountAddress = _a.accountAddress, _c = _a.allowedSlippage, allowedSlippage = _c === void 0 ? INITIAL_ALLOWED_SLIPPAGE : _c, // in bips, optional
    chainId = _a.chainId, _d = _a.deadline, deadline = _d === void 0 ? DEFAULT_DEADLINE_FROM_NOW : _d, // in seconds from now, optional
    trade = _a.trade, providerOrSigner = _a.providerOrSigner;
    var recipient = accountAddress;
    console.log('getExecutionDetails data', trade, recipient);
    if (!trade || !recipient)
        return null;
    // will always be defined
    var _e = computeSlippageAdjustedAmounts(trade, allowedSlippage), _f = Field.INPUT, slippageAdjustedInput = _e[_f], _g = Field.OUTPUT, slippageAdjustedOutput = _e[_g];
    console.log('slippageAdjustedInput', slippageAdjustedInput);
    if (!slippageAdjustedInput || !slippageAdjustedOutput)
        return null;
    if (!chainId || !providerOrSigner) {
        throw new Error('missing dependencies in onSwap callback');
    }
    var path = trade.route.path.map(function (t) { return t.address; });
    var deadlineFromNow = Math.ceil(Date.now() / 1000) + deadline;
    var swapType = getSwapType((_b = {},
        _b[Field.INPUT] = trade.inputAmount.token,
        _b[Field.OUTPUT] = trade.outputAmount.token,
        _b), trade.tradeType === sdk_1.TradeType.EXACT_INPUT, chainId);
    console.log('Swap type', swapType);
    // let estimate: Function, method: Function,
    var methodNames, args, value = null;
    switch (swapType) {
        case SwapType.EXACT_TOKENS_FOR_TOKENS:
            methodNames = [
                'swapExactTokensForTokens',
                'swapExactTokensForTokensSupportingFeeOnTransferTokens',
            ];
            args = [
                slippageAdjustedInput.raw.toString(),
                slippageAdjustedOutput.raw.toString(),
                path,
                recipient,
                deadlineFromNow,
            ];
            break;
        case SwapType.TOKENS_FOR_EXACT_TOKENS:
            methodNames = ['swapTokensForExactTokens'];
            args = [
                slippageAdjustedOutput.raw.toString(),
                slippageAdjustedInput.raw.toString(),
                path,
                recipient,
                deadlineFromNow,
            ];
            break;
        case SwapType.EXACT_ETH_FOR_TOKENS:
            methodNames = [
                'swapExactETHForTokens',
                'swapExactETHForTokensSupportingFeeOnTransferTokens',
            ];
            args = [
                slippageAdjustedOutput.raw.toString(),
                path,
                recipient,
                deadlineFromNow,
            ];
            value = slippageAdjustedInput.raw.toString();
            break;
        case SwapType.TOKENS_FOR_EXACT_ETH:
            methodNames = ['swapTokensForExactETH'];
            args = [
                slippageAdjustedOutput.raw.toString(),
                slippageAdjustedInput.raw.toString(),
                path,
                recipient,
                deadlineFromNow,
            ];
            break;
        case SwapType.EXACT_TOKENS_FOR_ETH:
            methodNames = [
                'swapExactTokensForETH',
                'swapExactTokensForETHSupportingFeeOnTransferTokens',
            ];
            args = [
                slippageAdjustedInput.raw.toString(),
                slippageAdjustedOutput.raw.toString(),
                path,
                recipient,
                deadlineFromNow,
            ];
            break;
        case SwapType.ETH_FOR_EXACT_TOKENS:
            methodNames = ['swapETHForExactTokens'];
            args = [
                slippageAdjustedOutput.raw.toString(),
                path,
                recipient,
                deadlineFromNow,
            ];
            value = slippageAdjustedInput.raw.toString();
            break;
    }
    return {
        methodArguments: args,
        methodNames: methodNames,
        value: value
    };
};
var getContractExecutionDetails = function (_a) {
    var _b;
    var accountAddress = _a.accountAddress, chainId = _a.chainId, providerOrSigner = _a.providerOrSigner, tradeDetails = _a.tradeDetails;
    var priceImpact = (_b = tradeDetails === null || tradeDetails === void 0 ? void 0 : tradeDetails.priceImpact) === null || _b === void 0 ? void 0 : _b.toFixed(2).toString();
    var slippage = priceImpact * 100;
    var maxSlippage = Math.max(slippage + SlippageBufferInBips, DefaultMaxSlippageInBips);
    var executionDetails = getExecutionDetails({
        accountAddress: accountAddress,
        allowedSlippage: maxSlippage,
        chainId: chainId,
        providerOrSigner: providerOrSigner,
        trade: tradeDetails
    });
    console.log('Execution details', executionDetails);
    var methodArguments = executionDetails.methodArguments, methodNames = executionDetails.methodNames, rawValue = executionDetails.value;
    var exchange = new contracts_1.Contract(index_1.UNISWAP_V2_ROUTER_ADDRESS, index_1.UNISWAP_V2_ROUTER_ABI, providerOrSigner);
    return {
        exchange: exchange,
        methodNames: methodNames,
        updatedMethodArgs: methodArguments,
        value: rawValue
    };
};
exports.executeSwap = function (_a) {
    var accountAddress = _a.accountAddress, chainId = _a.chainId, gasLimit = _a.gasLimit, gasPrice = _a.gasPrice, methodName = _a.methodName, tradeDetails = _a.tradeDetails, _b = _a.wallet, wallet = _b === void 0 ? null : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var walletToUse, _c, exchange, updatedMethodArgs, value, transactionParams;
        return __generator(this, function (_d) {
            walletToUse = wallet;
            if (!walletToUse)
                return [2 /*return*/, null];
            _c = getContractExecutionDetails({
                accountAddress: accountAddress,
                chainId: chainId,
                providerOrSigner: walletToUse,
                tradeDetails: tradeDetails
            }), exchange = _c.exchange, updatedMethodArgs = _c.updatedMethodArgs, value = _c.value;
            transactionParams = __assign({ gasLimit: gasLimit || undefined, gasPrice: gasPrice || undefined }, (value ? { value: value } : {}));
            return [2 /*return*/, exchange[methodName].apply(exchange, __spreadArrays(updatedMethodArgs, [transactionParams]))];
        });
    });
};
exports.calculateTradeDetails = function (chainId, inputAmount, outputAmount, inputCurrency, outputCurrency, pairs, exactInput) {
    if (!inputCurrency || !outputCurrency || lodash_1.isEmpty(pairs)) {
        return null;
    }
    var inputToken = exports.getTokenForCurrency(inputCurrency, chainId);
    var outputToken = exports.getTokenForCurrency(outputCurrency, chainId);
    if (exactInput) {
        var inputRawAmount = utilities_1.convertAmountToRawAmount(utilities_1.convertNumberToString(inputAmount || 0), inputToken.decimals);
        var amountIn = new sdk_1.TokenAmount(inputToken, inputRawAmount);
        return sdk_1.Trade.bestTradeExactIn(pairs, amountIn, outputToken, {
            maxNumResults: 3,
            maxHops: 3
        })[0];
    }
    else {
        var outputRawAmount = utilities_1.convertAmountToRawAmount(utilities_1.convertNumberToString(outputAmount || 0), outputToken.decimals);
        var amountOut = new sdk_1.TokenAmount(outputToken, outputRawAmount);
        return sdk_1.Trade.bestTradeExactOut(Object.values(pairs), inputToken, amountOut, {
            maxNumResults: 1
        })[0];
    }
};
exports.getTokenForCurrency = function (currency, chainId) {
    if (!currency)
        return null;
    if (currency.address === 'eth')
        return sdk_1.WETH[chainId];
    return new sdk_1.Token(chainId, currency.address, currency.decimals, currency.symbol, currency.name);
};
exports["default"] = {
    authorize: 'authorize',
    borrow: 'borrow',
    cancel: 'cancel',
    deployment: 'deployment',
    deposit: 'deposit',
    execution: 'execution',
    purchase: 'purchase',
    receive: 'receive',
    repay: 'repay',
    send: 'send',
    trade: 'trade',
    withdraw: 'withdraw'
};
