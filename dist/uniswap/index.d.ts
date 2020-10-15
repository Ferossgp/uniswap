/// <reference types="lodash" />
import { ChainId } from '@uniswap/sdk';
import MULTICALL_ABI from './uniswap-multicall-abi.json';
import { default as UNISWAP_TESTNET_TOKEN_LIST } from './uniswap-pairs-testnet.json';
import { abi as UNISWAP_V2_ROUTER_ABI } from './uniswap-v2-router.json';
import UNISWAP_V1_EXCHANGE_ABI from './v1-exchange-abi';
export { default as ethUnits } from './ethereum-units.json';
export { default as erc20ABI } from './erc20-abi.json';
export declare const CDAI_CONTRACT = "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643";
export declare const SAI_ADDRESS = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";
export declare const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
export declare const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
export declare const TRANSFER_EVENT_KECCAK = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
export declare const TRANSFER_EVENT_TOPIC_LENGTH = 3;
export declare const tokenOverrides: import("lodash").Dictionary<any>;
declare const UNISWAP_V2_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
declare const UNISWAP_V2_BASES: {
    [x: number]: any[];
};
declare const PAIR_INTERFACE: any;
declare const PAIR_GET_RESERVES_FRAGMENT: any;
declare const PAIR_GET_RESERVES_CALL_DATA: string | undefined;
declare const MULTICALL_NETWORKS: {
    [chainId in ChainId]: string;
};
export { MULTICALL_ABI, MULTICALL_NETWORKS, PAIR_GET_RESERVES_CALL_DATA, PAIR_GET_RESERVES_FRAGMENT, PAIR_INTERFACE, UNISWAP_TESTNET_TOKEN_LIST, UNISWAP_V1_EXCHANGE_ABI, UNISWAP_V2_BASES, UNISWAP_V2_ROUTER_ABI, UNISWAP_V2_ROUTER_ADDRESS, };
