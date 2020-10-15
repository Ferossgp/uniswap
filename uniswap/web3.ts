import { JsonRpcProvider } from '@ethersproject/providers';
import { ChainId } from '@uniswap/sdk';

export let web3Provider =  new JsonRpcProvider("https://rinkeby.infura.io/v3/");
export let account = {};
export let wallet = {provider: web3Provider, account: account, chainId: ChainId.RINKEBY, address: null, accountAddress: null}

export function setWeb3Provider(p){
    web3Provider = p
}

export function setAccount(a){
    account = a;
    wallet.address = a.address;
    wallet.accountAddress = a.address;
}
