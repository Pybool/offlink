import connectors from './web3connector.js'
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY
const web3 = connectors.web3

const fns =  {
  signTransaction: async(transactionObject)=>{
      try {

        const privateKey = SIGNER_PRIVATE_KEY;
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        const messageHash = web3.utils.soliditySha3(
          { type: 'uint256', value: transactionObject.nonce },
          { type: 'uint256', value: transactionObject.amountInToken },
          { type: 'uint256', value: transactionObject.amountInCurrency },
          { type: 'bytes32', value: transactionObject.currency },
          { type: 'address', value: transactionObject.token },
          { type: 'address', value: transactionObject.contractAddress },
          { type: 'uint256', value: parseInt(transactionObject.chainId) },
        );

        const signedObject = await account.sign(messageHash)
        const signature = signedObject.signature;
        const signedTransactionObject = {
          ...transactionObject,
          signature,
        };
        return { signedTransactionObject, messageHash }

      } catch (error) {
        console.error('Error:', error);
        return null
      }
  },
}

export default fns