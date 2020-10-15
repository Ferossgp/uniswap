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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var _a, _b;
exports.__esModule = true;
exports.UNISWAP_V2_ROUTER_ADDRESS = exports.UNISWAP_V2_ROUTER_ABI = exports.UNISWAP_V2_BASES = exports.UNISWAP_V1_EXCHANGE_ABI = exports.UNISWAP_TOKEN_LIST = exports.UNISWAP_TESTNET_TOKEN_LIST = exports.PAIR_INTERFACE = exports.PAIR_GET_RESERVES_FRAGMENT = exports.PAIR_GET_RESERVES_CALL_DATA = exports.MULTICALL_NETWORKS = exports.MULTICALL_ABI = exports.CURATED_UNISWAP_TOKENS = exports.tokenOverrides = exports.TRANSFER_EVENT_TOPIC_LENGTH = exports.TRANSFER_EVENT_KECCAK = exports.USDC_ADDRESS = exports.DAI_ADDRESS = exports.SAI_ADDRESS = exports.CDAI_CONTRACT = exports.erc20ABI = exports.ethUnits = void 0;
var abi_1 = require("@ethersproject/abi");
var sdk_1 = require("@uniswap/sdk");
var IUniswapV2Pair_json_1 = require("@uniswap/v2-core/build/IUniswapV2Pair.json");
var lodash_1 = require("lodash");
var uniswap_multicall_abi_json_1 = require("./uniswap-multicall-abi.json");
exports.MULTICALL_ABI = uniswap_multicall_abi_json_1["default"];
var uniswap_pairs_testnet_json_1 = require("./uniswap-pairs-testnet.json");
exports.UNISWAP_TESTNET_TOKEN_LIST = uniswap_pairs_testnet_json_1["default"];
var uniswap_token_list_json_1 = require("./uniswap-token-list.json");
exports.UNISWAP_TOKEN_LIST = uniswap_token_list_json_1["default"];
var uniswap_v2_router_json_1 = require("./uniswap-v2-router.json");
exports.UNISWAP_V2_ROUTER_ABI = uniswap_v2_router_json_1.abi;
var v1_exchange_abi_1 = require("./v1-exchange-abi");
exports.UNISWAP_V1_EXCHANGE_ABI = v1_exchange_abi_1["default"];
var token_overrides_json_1 = require("./token-overrides.json");
var ethereum_units_json_1 = require("./ethereum-units.json");
__createBinding(exports, ethereum_units_json_1, "default", "ethUnits");
var erc20_abi_json_1 = require("./erc20-abi.json");
__createBinding(exports, erc20_abi_json_1, "default", "erc20ABI");
exports.CDAI_CONTRACT = '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643';
exports.SAI_ADDRESS = '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359';
exports.DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
exports.USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
exports.TRANSFER_EVENT_KECCAK = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
exports.TRANSFER_EVENT_TOPIC_LENGTH = 3;
exports.tokenOverrides = lodash_1.mapKeys(token_overrides_json_1["default"], function (_, address) {
    return lodash_1.toLower(address);
});
var CURATED_UNISWAP_TOKEN_LIST = lodash_1.map(uniswap_token_list_json_1["default"]['tokens'], function (token) {
    var address = lodash_1.toLower(token.address);
    return __assign(__assign(__assign({}, token), exports.tokenOverrides[address]), { address: address });
});
var CURATED_UNISWAP_TOKENS = lodash_1.keyBy(CURATED_UNISWAP_TOKEN_LIST, 'address');
exports.CURATED_UNISWAP_TOKENS = CURATED_UNISWAP_TOKENS;
var UNISWAP_V2_ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
exports.UNISWAP_V2_ROUTER_ADDRESS = UNISWAP_V2_ROUTER_ADDRESS;
var UNISWAP_V2_BASES = (_a = {},
    _a[sdk_1.ChainId.MAINNET] = [
        sdk_1.WETH[sdk_1.ChainId.MAINNET],
        new sdk_1.Token(sdk_1.ChainId.MAINNET, exports.DAI_ADDRESS, 18, 'DAI', 'Dai Stablecoin'),
        new sdk_1.Token(sdk_1.ChainId.MAINNET, exports.USDC_ADDRESS, 6, 'USDC', 'USD//C'),
    ],
    _a[sdk_1.ChainId.ROPSTEN] = [sdk_1.WETH[sdk_1.ChainId.ROPSTEN]],
    _a[sdk_1.ChainId.RINKEBY] = [sdk_1.WETH[sdk_1.ChainId.RINKEBY]],
    _a[sdk_1.ChainId.GÖRLI] = [sdk_1.WETH[sdk_1.ChainId.GÖRLI]],
    _a[sdk_1.ChainId.KOVAN] = [sdk_1.WETH[sdk_1.ChainId.KOVAN]],
    _a);
exports.UNISWAP_V2_BASES = UNISWAP_V2_BASES;
var PAIR_INTERFACE = new abi_1.Interface(IUniswapV2Pair_json_1.abi);
exports.PAIR_INTERFACE = PAIR_INTERFACE;
var PAIR_GET_RESERVES_FRAGMENT = PAIR_INTERFACE.getFunction('getReserves');
exports.PAIR_GET_RESERVES_FRAGMENT = PAIR_GET_RESERVES_FRAGMENT;
var PAIR_GET_RESERVES_CALL_DATA = PAIR_GET_RESERVES_FRAGMENT
    ? PAIR_INTERFACE.encodeFunctionData(PAIR_GET_RESERVES_FRAGMENT)
    : undefined;
exports.PAIR_GET_RESERVES_CALL_DATA = PAIR_GET_RESERVES_CALL_DATA;
var MULTICALL_NETWORKS = (_b = {},
    _b[sdk_1.ChainId.MAINNET] = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
    _b[sdk_1.ChainId.ROPSTEN] = '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
    _b[sdk_1.ChainId.KOVAN] = '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
    _b[sdk_1.ChainId.RINKEBY] = '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
    _b[sdk_1.ChainId.GÖRLI] = '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
    _b);
exports.MULTICALL_NETWORKS = MULTICALL_NETWORKS;
