import Web3 from 'web3';
import { createRequire } from "module";          
const require = createRequire(import.meta.url); 
const jsonData = require("../offlink.json"); 
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const abi = jsonData.abi 
const PROVIDER_URL = process.env.WSS_PROVIDER;
let connectors = {}

const setupProviderAndSubscriptions = () => {
    let provider = new Web3.providers.WebsocketProvider(PROVIDER_URL)
    let web3 = new Web3(provider);
    let contractAddress = jsonData.address || process.env.SMART_CONTRACT_ADDRESS
    console.log("Contract address ", contractAddress)
    let contract = new web3.eth.Contract(abi, contractAddress);
    connectors = {web3: web3, contract: contract, provider: provider, watchedAddresses: contractAddress}
    let setupNewProvider = false
    let sequentialRetryCount = 0

    const setupNewProviderAndSubs = async () => {
        // To prevent us from retrying too aggressively, wait a little if we try setting up multiple times in a row
        const sleepTimeMs = 10 || sequentialRetryCount * 1000
        console.log('sleeping', sleepTimeMs)
        await sleep(sleepTimeMs)
        sequentialRetryCount++
        // To avoid a situation where multiple error events are triggered
        if (!setupNewProvider) {
            setupNewProvider = true
            setupProviderAndSubscriptions()
        }
    }

    provider.on('error', async (error) => {
        console.log('WebsocketProvider encountered an error', error)
        await setupNewProviderAndSubs()
    })
    
    provider.on('end', async () => {
        console.log('WebsocketProvider has ended, will restart')
        await setupNewProviderAndSubs()
    })

}

setupProviderAndSubscriptions()
    function sleep(ms, onSleep) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
            if (onSleep) {
                onSleep()
            }
        })
    }

export default connectors

