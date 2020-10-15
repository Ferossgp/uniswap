"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var App_1 = require("./App");
var web3_1 = require("./uniswap/web3");
var providers_1 = require("@ethersproject/providers");
var statusAPI;
function Init(api) {
    statusAPI = api;
    statusAPI.ethereum.request({ method: "eth_requestAccounts" }).then(function (res) {
        setAccount(res[0]);
    });
    web3_1.setWeb3Provider(providers_1.Web3Provider(statusAPI.ethereum));
}
function WidgetView(props) {
    return (<react_native_1.View style={{
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
        <react_native_1.View style={{ flexDirection: "row", padding: 8, justifyContent: "space-between" }}>
          <react_native_1.View>
            <react_native_1.Text>Swap on Uniswap! Get 100 SNT for 0.006 ETH now.</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
}
function ExtensionView(props) {
    return (<App_1.default />);
}
exports["default"] = [{
        type: "WALLET_MAIN_SCREEN_WINDOW",
        widget: WidgetView,
        view: ExtensionView,
        init: Init
    }];
