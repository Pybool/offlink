import Web3 from 'web3';
import connectors from './web3connector.js'
export async function callContractMethod(methodName, args) {
  return new Promise((resolve, reject) => {
    connectors.contract.methods[methodName](...args).call((error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
}