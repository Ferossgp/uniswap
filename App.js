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
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
require("@ethersproject/shims");
var sdk_1 = require("@uniswap/sdk");
var react_1 = require("react");
var react_native_1 = require("react-native");
var useUniswapPairs_1 = require("./uniswap/hooks/useUniswapPairs");
var useSwapInputs_1 = require("./uniswap/hooks/useSwapInputs");
var useSwapInputRefs_1 = require("./uniswap/hooks/useSwapInputRefs");
var raps_1 = require("./uniswap/raps");
var web3_1 = require("./uniswap/web3");
var handlers_1 = require("./uniswap/handlers");
var utilities_1 = require("./uniswap/utilities");
var Input = react_1["default"].forwardRef(function (props, ref) {
    return (<react_native_1.View style={{ borderWidth: 1, borderColor: 'rgb(247, 248, 250)', borderRadius: 20, backgroundColor: 'white', marginVertical: 8 }}>
      <react_native_1.View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <react_native_1.Text>{props.label}</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8 }}>
        <react_native_1.TextInput placeholder="0.0" ref={ref} style={{ paddingHorizontal: 8, paddingVertical: 8, fontSize: 21, flex: 1 }} keyboardType="numeric" value={props.value} onChangeText={props.onChange}/>
        <react_native_1.View style={{ flexDirection: "row", alignItems: "center" }}>
          <react_native_1.Image source={{ uri: props.token["logoURI"] }} style={{ height: 24, width: 24 }}/>
          <react_native_1.Text style={{ marginHorizontal: 8 }}>{props.token["symbol"]}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
});
function Button(props) {
    return (<react_native_1.View style={{ borderWidth: 1, borderColor: 'rgb(247, 248, 250)', borderRadius: 16, backgroundColor: 'rgb(230, 0, 110)', marginVertical: 8 }}>
      <react_native_1.TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' }} onPress={props.onPress}>
        {(props.isLoading) &&
        (<react_native_1.ActivityIndicator />)}
        {(!props.isLoading) &&
        (<react_native_1.Text style={{ fontSize: 21, color: "white" }}>{props.label}</react_native_1.Text>)}
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
}
function App(props) {
    var _this = this;
    var inputCurrency = {
        "name": "Wrapped Ether",
        "address": "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        "symbol": "WETH",
        "decimals": 18,
        "chainId": 4,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc778417E063141139Fce010982780140Aa0cD5Ab/logo.png"
    };
    var outputCurrency = {
        "name": "Dai Stablecoin",
        "address": "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
        "symbol": "DAI",
        "decimals": 18,
        "chainId": 4,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735/logo.png"
    };
    var _a = useSwapInputRefs_1["default"]({ inputCurrency: inputCurrency, outputCurrency: outputCurrency }), inputFieldRef = _a.inputFieldRef, outputFieldRef = _a.outputFieldRef, nativeFieldRef = _a.nativeFieldRef;
    var _b = react_1.useState(false), isAuthorizing = _b[0], setIsAuthorizing = _b[1];
    var _c = react_1.useState(null), slippage = _c[0], setSlippage = _c[1];
    var _d = useSwapInputs_1["default"]({
        defaultInputAsset: inputCurrency,
        inputCurrency: inputCurrency,
        isDeposit: true,
        isWithdrawal: false,
        maxInputBalance: 100,
        nativeFieldRef: nativeFieldRef,
        supplyBalanceUnderlying: 100,
        type: ''
    }), inputAmount = _d.inputAmount, inputAmountDisplay = _d.inputAmountDisplay, inputAsExactAmount = _d.inputAsExactAmount, isMax = _d.isMax, isSufficientBalance = _d.isSufficientBalance, nativeAmount = _d.nativeAmount, outputAmount = _d.outputAmount, outputAmountDisplay = _d.outputAmountDisplay, setIsSufficientBalance = _d.setIsSufficientBalance, updateInputAmount = _d.updateInputAmount, updateNativeAmount = _d.updateNativeAmount, updateOutputAmount = _d.updateOutputAmount;
    var _e = react_1.useState(null), extraTradeDetails = _e[0], updateExtraTradeDetails = _e[1];
    var _f = react_1.useState({}), raps = _f[0], setRapRaw = _f[1];
    var setRap = function (id, value) {
        var _a;
        return setRapRaw(Object.assign(raps, (_a = {}, _a[id] = value, _a)));
    };
    var settings = { accountSettings: "", accountAddress: "0xD63a6298503b4F0575E969331ACA857212AB4b46", chainId: sdk_1.ChainId.RINKEBY };
    var wallet = { provider: web3_1.web3Provider, chainId: sdk_1.ChainId.RINKEBY };
    var isDeposit = false;
    var isWithdrawal = false;
    var nativeCurrency = inputCurrency;
    var maxInputBalance = 100;
    var defaultInputAddress = inputCurrency.address;
    /*
    const { isSufficientLiquidity, tradeDetails } = useUniswapMarketDetails({
      defaultInputAddress,
      extraTradeDetails,
      inputAmount,
      inputAsExactAmount,
      inputCurrency,
      inputFieldRef,
      isDeposit,
      isWithdrawal,
      maxInputBalance,
      nativeCurrency,
      outputAmount,
      outputCurrency,
      outputFieldRef,
      setIsSufficientBalance,
      setSlippage,
      updateExtraTradeDetails,
      updateInputAmount,
      updateOutputAmount,
      chainId: wallet.chainId,
    });
    */
    var isSufficientLiquidity = true;
    var allPairs = useUniswapPairs_1["default"](inputCurrency, outputCurrency, wallet.provider, wallet.chainId).allPairs;
    var tradeDetails = handlers_1.calculateTradeDetails(wallet.chainId, inputAmount, outputAmount, inputCurrency, outputCurrency, allPairs, true);
    var calculateOutputGivenInputChange = react_1.useCallback(function (_a) {
        var _b;
        var isInputEmpty = _a.isInputEmpty, isInputZero = _a.isInputZero;
        if ((isInputEmpty || isInputZero) &&
            outputFieldRef &&
            outputFieldRef.current &&
            !outputFieldRef.current.isFocused()) {
            updateOutputAmount(null, null, true);
        }
        else {
            var rawUpdatedOutputAmount = (_b = tradeDetails === null || tradeDetails === void 0 ? void 0 : tradeDetails.outputAmount) === null || _b === void 0 ? void 0 : _b.toExact();
            if (!utilities_1.isZero(rawUpdatedOutputAmount)) {
                var outputPriceValue = tradeDetails === null || tradeDetails === void 0 ? void 0 : tradeDetails.outputPriceValue;
                var updatedOutputAmountDisplay = utilities_1.updatePrecisionToDisplay(rawUpdatedOutputAmount, outputPriceValue);
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
    react_1.useEffect(function () {
        calculateOutputGivenInputChange({ isInputEmpty: inputAmount == null, isInputZero: utilities_1.isZero(inputAmount) });
    }, [inputAmount]);
    var handleSubmit = react_1.useCallback(function () {
        var fn = function () { return __awaiter(_this, void 0, void 0, function () {
            var rap, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsAuthorizing(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!wallet) {
                            setIsAuthorizing(false);
                            return [2 /*return*/];
                        }
                        console.log("trade", tradeDetails);
                        return [4 /*yield*/, raps_1.createUnlockAndSwapRap({
                                callback: console.log,
                                inputAmount: inputAmount,
                                inputCurrency: inputCurrency,
                                outputAmount: outputAmount,
                                outputCurrency: outputCurrency,
                                selectedGasPrice: null,
                                tradeDetails: tradeDetails,
                                settings: settings,
                                setRap: setRap
                            })];
                    case 2:
                        rap = _a.sent();
                        console.log(rap);
                        return [4 /*yield*/, raps_1.executeRap(wallet, setRap, rap)];
                    case 3:
                        _a.sent();
                        setIsAuthorizing(false);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        setIsAuthorizing(false);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fn();
    }, [
        inputAmount,
        inputCurrency,
        isMax,
        outputAmount,
        outputCurrency,
        slippage,
        tradeDetails,
    ]);
    return (<react_native_1.View style={{ flex: 1, paddingVertical: 40 }}>
      
      <react_native_1.View style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row'
    }}>
        <react_native_1.View style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(255, 0, 122, 0.1)',
        borderRadius: 24
    }}>
          <react_native_1.View style={{ padding: 8 }}>
            <react_native_1.Text style={{ fontSize: 18 }}>🦄 Uniswap</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View>
            <Input label="From" ref={inputFieldRef} token={inputCurrency} value={inputAmountDisplay} onChange={updateInputAmount}/>
            <Input label="To" ref={outputFieldRef} token={outputCurrency} value={outputAmountDisplay} onChange={updateOutputAmount}/>
            <Button label="Swap" onPress={handleSubmit} isDisabled={!isSufficientLiquidity} isLoading={isAuthorizing}/>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
}
exports["default"] = App;
