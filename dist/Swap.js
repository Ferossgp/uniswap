import { ChainId, Token, WETH, Fetcher } from '@uniswap/sdk';
const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);
const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
const route = new Route([pair], WETH[DAI.chainId]);
