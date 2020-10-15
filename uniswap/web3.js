"use strict";
exports.__esModule = true;
exports.setAccount = exports.setWeb3Provider = exports.wallet = exports.account = exports.web3Provider = void 0;
var providers_1 = require("@ethersproject/providers");
var sdk_1 = require("@uniswap/sdk");
exports.web3Provider = new providers_1.JsonRpcProvider("https://rinkeby.infura.io/v3/");
exports.account = {};
exports.wallet = { provider: exports.web3Provider, account: exports.account, chainId: sdk_1.ChainId.RINKEBY, address: null, accountAddress: null };
function setWeb3Provider(p) {
    exports.web3Provider = p;
}
exports.setWeb3Provider = setWeb3Provider;
function setAccount(a) {
    exports.account = a;
    exports.wallet.address = a.address;
    exports.wallet.accountAddress = a.address;
}
exports.setAccount = setAccount;
