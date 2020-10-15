/**
 * @desc subtracts two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export declare const subtract: (numberOne: any, numberTwo: any) => any;
/**
 * @desc convert amount to raw amount
 * @param  {String}   value
 * @param  {Number}   decimals
 * @return {String}
 */
export declare const convertAmountToRawAmount: (value: any, decimals: any) => any;
export declare const isZero: (value: any) => any;
/**
 * @desc to fixed decimals
 * @param  {Number}  value
 * @return {String}
 */
export declare const toFixedDecimals: (value: any, decimals: any) => any;
/**
 * @desc convert from number to string
 * @param  {Number}  value
 * @return {String}
 */
export declare const convertNumberToString: (value: any) => any;
/**
 * @desc compares if numberOne is greater than numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {Boolean}
 */
export declare const greaterThan: (numberOne: any, numberTwo: any) => any;
/**
 * @desc compares if numberOne is greater than or equal to numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {Boolean}
 */
export declare const greaterThanOrEqualTo: (numberOne: any, numberTwo: any) => any;
/**
 * @desc compares if numberOne is equal to numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export declare const isEqual: (numberOne: any, numberTwo: any) => any;
/**
 * @desc format fixed number of decimals
 * @param  {String}   value
 * @param  {Number}   decimals
 * @return {String}
 */
export declare const formatFixedDecimals: (value: any, decimals: any) => any;
/**
 * @desc modulos of two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export declare const mod: (numberOne: any, numberTwo: any) => any;
/**
 * @desc calculate the fee for a given amount, percent fee, and fixed fee
 * @param  {Number}   amount (base amount to calculate fee off of)
 * @param  {Number}   percent fee (4% would just be 4)
 * @param  {Number}   fixed fee (flat rate to add)
 * @return {String}   fixed format to 2 decimals with ROUND_HALF_UP
 */
export declare const feeCalculation: (amount: any, percentFee: any, fixedFee: any) => any;
/**
 * @desc real floor divides two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export declare const floorDivide: (numberOne: any, numberTwo: any) => any;
/**
 * @desc count value's number of decimals places
 * @param  {String}   value
 * @return {String}
 */
export declare const countDecimalPlaces: (value: any) => any;
/**
 * @desc update the amount to display precision
 * equivalent to ~0.01 of the native price
 * or use most significant decimal
 * if the updated precision amounts to zero
 * @param  {String}   amount
 * @param  {String}   nativePrice
 * @param  {Boolean}  use rounding up mode
 * @return {String}   updated amount
 */
export declare const updatePrecisionToDisplay: (amount: any, nativePrice: any, roundUp?: boolean) => any;
/**
 * @desc format inputOne value to signficant decimals given inputTwo
 * @param  {String}   inputOne
 * @param  {String}   inputTwo
 * @return {String}
 */
export declare const formatInputDecimals: (inputOne: any, inputTwo: any) => any;
/**
 * @desc convert hex to number string
 * @param  {String} hex
 * @return {String}
 */
export declare const convertHexToString: (hex: any) => any;
/**
 * @desc convert number to string to hex
 * @param  {String} string
 * @return {String}
 */
export declare const convertStringToHex: (string: any) => any;
/**
 * @desc adds two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export declare const add: (numberOne: any, numberTwo: any) => any;
/**
 * @desc multiplies two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export declare const multiply: (numberOne: any, numberTwo: any) => any;
/**
 * @desc divides two numbers
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export declare const divide: (numberOne: any, numberTwo: any) => any;
/**
 * @desc convert to asset amount units from native price value units
 * @param  {String}   value
 * @param  {Object}   asset
 * @param  {Number}   priceUnit
 * @return {String}
 */
export declare const convertAmountFromNativeValue: (value: any, priceUnit: any, decimals?: number) => any;
/**
 * @desc convert from string to number
 * @param  {String}  value
 * @return {Number}
 */
export declare const convertStringToNumber: (value: any) => any;
/**
 * @desc compares if numberOne is smaller than numberTwo
 * @param  {Number}   numberOne
 * @param  {Number}   numberTwo
 * @return {String}
 */
export declare const lessThan: (numberOne: any, numberTwo: any) => any;
/**
 * @desc handle signficant decimals
 * @param  {String|Number}   value
 * @param  {Number}   decimals
 * @param  {Number}   buffer
 * @return {String}
 */
export declare const handleSignificantDecimals: (value: any, decimals: any, buffer: any) => any;
/**
 * @desc convert from asset BigNumber amount to native price BigNumber amount
 * @param  {BigNumber}   value
 * @param  {Object}   asset
 * @param  {Object}   nativePrices
 * @return {BigNumber}
 */
export declare const convertAmountToNativeAmount: (amount: any, priceUnit: any) => any;
/**
 * @desc convert from amount to display formatted string
 * @param  {BigNumber}  value
 * @param  {String}     nativeCurrency
 * @return {String}
 */
export declare const convertAmountAndPriceToNativeDisplay: (amount: any, priceUnit: any, nativeCurrency: any, buffer: any) => {
    amount: any;
    display: any;
};
/**
 * @desc convert from raw amount to display formatted string
 * @param  {BigNumber}  value
 * @param  {String}     nativeCurrency
 * @return {String}
 */
export declare const convertRawAmountToNativeDisplay: (rawAmount: any, assetDecimals: any, priceUnit: any, nativeCurrency: any, buffer: any) => {
    amount: any;
    display: any;
};
/**
 * @desc convert from raw amount to balance object
 * @param  {BigNumber}  value
 * @param  {Object}     asset
 * @param  {Number}     buffer
 * @return {Object}
 */
export declare const convertRawAmountToBalance: (value: any, asset: any, buffer: any) => {
    amount: any;
    display: string;
};
/**
 * @desc convert from amount value to display formatted string
 * @param  {BigNumber}  value
 * @param  {Object}     asset
 * @param  {Number}     buffer
 * @return {String}
 */
export declare const convertAmountToBalanceDisplay: (value: any, asset: any, buffer: any) => string;
/**
 * @desc convert from amount to display formatted string
 * @param  {BigNumber}  value
 * @param  {Number}     buffer
 * @return {String}
 */
export declare const convertAmountToPercentageDisplay: (value: any, decimals: number | undefined, buffer: any) => string;
/**
 * @desc convert from bips amount to percentage format
 * @param  {BigNumber}  value in bips
 * @param  {Number}     decimals
 * @return {String}
 */
export declare const convertBipsToPercentage: (value: any, decimals?: number) => any;
/**
 * @desc convert from raw amount to decimal format
 * @param  {String|Number}  value
 * @param  {Number}     decimals
 * @return {String}
 */
export declare const convertRawAmountToDecimalFormat: (value: any, decimals?: number) => any;
export declare const fromWei: (number: any) => any;
/**
 * @desc Promise that will resolve after the ms interval
 * @param  {Number}  ms
 * @return {Promise}
 */
export declare const delay: (ms: any) => Promise<unknown>;
