"use strict";
exports.__esModule = true;
exports.setWeb3Provider = exports.web3Provider = void 0;
var providers_1 = require("@ethersproject/providers");
exports.web3Provider = new providers_1.JsonRpcProvider("https://rinkeby.infura.io/v3/");
function setWeb3Provider(p) {
    exports.web3Provider = p;
}
exports.setWeb3Provider = setWeb3Provider;
