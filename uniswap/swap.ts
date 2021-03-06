import { find, get, toLower } from 'lodash';
import { estimateSwapGasLimit, executeSwap } from './handlers';
import ProtocolTypes from './protocolTypes';
import TransactionStatusTypes from './transactionStatusTypes';
import TransactionTypes from './transactionTypes';
import {
  convertHexToString,
  convertRawAmountToDecimalFormat,
  isZero,
} from './utilities';
import {
  TRANSFER_EVENT_KECCAK,
  TRANSFER_EVENT_TOPIC_LENGTH,
} from './index';
import ethereumUtils from './ethUtils'

const NOOP = () => undefined;

export const isValidSwapInput = ({ inputCurrency, outputCurrency }) =>
  !!inputCurrency && !!outputCurrency;

export const findSwapOutputAmount = (receipt, accountAddress) => {
  const { logs } = receipt;
  const transferLog = find(logs, log => {
    const { topics } = log;
    const isTransferEvent =
      topics.length === TRANSFER_EVENT_TOPIC_LENGTH &&
      toLower(topics[0]) === TRANSFER_EVENT_KECCAK;
    if (!isTransferEvent) return false;

    const transferDestination = topics[2];
    const cleanTransferDestination = toLower(
      ethereumUtils.removeHexPrefix(transferDestination)
    );
    const addressNoHex = toLower(ethereumUtils.removeHexPrefix(accountAddress));
    const cleanAccountAddress = ethereumUtils.padLeft(addressNoHex, 64);

    return cleanTransferDestination === cleanAccountAddress;
  });
  if (!transferLog) return null;
  const { data } = transferLog;
  return convertHexToString(data);
};

const swap = async (wallet, currentRap, index, parameters, updateRap) => {
  const {
    accountAddress,
    inputAmount,
    inputCurrency,
    outputCurrency,
    selectedGasPrice = null,
    tradeDetails,
  } = parameters;
  const { chainId } = wallet;
  const gasPrice = wallet.provider.getGasPrice();

  // Execute Swap

  // if swap is not the final action, use fast gas
  let gasLimit, methodName;
  try {
    const {
      gasLimit: newGasLimit,
      methodName: newMethodName,
    } = await estimateSwapGasLimit({
      accountAddress,
      chainId,
      tradeDetails,
    });
    gasLimit = newGasLimit;
    methodName = newMethodName;
  } catch (e) {

    console.log("estimateSwapGasLimit error", e)
    throw e;
  }

  let swap;
  try {
    swap = await executeSwap({
      accountAddress,
      chainId,
      gasLimit,
      gasPrice,
      methodName,
      tradeDetails,
      wallet,
    });
  } catch (e) {
    console.log("Execute error", e)
    throw e;
  }

  currentRap.actions[index].transaction.hash = swap.hash;
  updateRap(currentRap.id, currentRap);
  const newTransaction = {
    amount: inputAmount,
    asset: inputCurrency,
    from: accountAddress,
    hash: swap.hash,
    nonce: get(swap, 'nonce'),
    protocol: ProtocolTypes.uniswap.name,
    status: TransactionStatusTypes.swapping,
    to: get(swap, 'to'),
    type: TransactionTypes.trade,
  };
  wallet.provider.sendTransaction(newTransaction);
  currentRap.callback();
  currentRap.callback = NOOP;

  try {
    const receipt = await wallet.provider.waitForTransaction(swap.hash);
    if (!isZero(receipt.status)) {
      currentRap.actions[index].transaction.confirmed = true;
      updateRap(currentRap.id, currentRap);
      const rawReceivedAmount = findSwapOutputAmount(receipt, accountAddress);
      const convertedOutput = convertRawAmountToDecimalFormat(
        rawReceivedAmount,
        outputCurrency.decimals
      );
      return convertedOutput;
    } else {
      currentRap.actions[index].transaction.confirmed = false;
      updateRap(currentRap.id, currentRap);
      return null;
    }
  } catch (error) {
    currentRap.actions[index].transaction.confirmed = false;
    updateRap(currentRap.id, currentRap);
    return null;
  }
};

export default swap;