import React from 'react';

import "@ethersproject/shims"
``
import {
  Text,
  View
} from 'react-native';
import App from './App'
import {setWeb3Provider,setAccount} from './uniswap/web3'
import { Web3Provider } from '@ethersproject/providers';

type Props = {};

let statusAPI;

function Init(api) {
  statusAPI = api;
  statusAPI.ethereum.request({method: "eth_requestAccounts"}).then((res) => {
    setAccount(res[0])
  });
  setWeb3Provider(new Web3Provider(statusAPI.ethereum), api)
}

function WidgetView(props: Props){
  return (
    <View style={{
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      flexDirection: 'row'
    }}>
      <View style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(255, 0, 122, 0.1)',
        borderRadius: 24,
      }}>
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 18 }}>🦄 Uniswap</Text>
        </View>
        <View style={{ flexDirection: "row", padding: 8, justifyContent: "space-between" }}>
          <View>
            <Text>Swap on Uniswap! Get 100 SNT for 0.006 ETH now.</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

function ExtensionView(props: Props){
    return (
          <App />
    )
}

export default [{
  type: "WALLET_MAIN_SCREEN_WINDOW",
  widget: WidgetView,
  view: ExtensionView,
  init: Init,
}]