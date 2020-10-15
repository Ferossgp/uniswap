import { JsonRpcProvider } from '@ethersproject/providers';

export let web3Provider =  new JsonRpcProvider("https://rinkeby.infura.io/v3/");

export function setWeb3Provider(p){
    web3Provider = p
}