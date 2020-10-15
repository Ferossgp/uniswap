declare const unlock: (wallet: any, currentRap: any, index: any, parameters: any, updateRap: any) => Promise<any>;
export declare const assetNeedsUnlocking: (accountAddress: any, amount: any, assetToUnlock: any, contractAddress: any) => Promise<boolean>;
export default unlock;
