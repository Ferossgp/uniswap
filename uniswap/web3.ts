import { JsonRpcProvider } from '@ethersproject/providers';

export let web3Provider =  new JsonRpcProvider("https://rinkeby.infura.io/v3/f315575765b14720b32382a61a89341a");

export function setWeb3Provider(p){
    web3Provider = p
}