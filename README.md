# Offlink - A Decentralized P2P Off-Ramping Solution

**_Built with love with Celo Protocol_**

## Introduction

Offlink provides a decentralized peer-to-peer platform for crypto traders to exchange their stablecoins, especially cUSD, for fiat.

## Problems & Solutions

We understand that most off-ramping solutions for cUSD in Africa are centralized, making it harder for holders to convert their stablecoins with fair exchange rates. This had prompted us to build a solution that was completely decentralized with fair pricing and fast transaction completion time.



## Features

At the hackathon, we successfully implemented functionality for users within Nigeria, Ghana, Kenya to offramp on the platform:

A user can perform the following actions
1. Signup
2. Sign In
3. Initiate an offramp as a seller
4. Accept an offramp as a buyer
5. Update profile with bank details

## Future Plan

To stay relevant in the future, we understand that we must continue to implement new features, such as:

1. Expanding our market beyond african countries
2. Improve user experience.

## Demo Instructions

### Non-Developers

Demo Instructions

Visit the link below to create an account

[https://offlink-beta.vercel.app/register](https://offlink-beta.vercel.app/register)

Follow the steps below to use the solution

1: Login with your credentials

2: Connect your preferred wallet and fund your wallet with CUSD

3: From the menu click offramp option

4: Enter the amount you intend to offramp

### Developers

Clone the repository:

```bash
git clone https://github.com/iamoracle/Carbon0
```

Install Dependencies:

```bash
yarn install
```

Run app:

```bash
yarn dev
```

You might need to install XCode or Android Emulator on your device.

## Presentation and Live Demo

[Live DEMO](https://www.youtube.com/watch?v=DEwyT9X4YZ4)

[Live Presenation](https://www.youtube.com/watch?v=fA4k9BV4lFE)

[Presentation Slide on Canva](https://www.canva.com/design/DAFio39YiSE/a_COVrlxLRZYL_n24S2GQw/edit?utm_content=DAFio39YiSE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Challenges and Lessons During the Hackathon

During the hackathon, we faced several challenges, which we successfully tackled and learned from. Our first challenge was integrating the WalletConnect V2 SDK with our React Native App. We overcame this obstacle by researching and studying how to incorporate the wallet into our app. Our persistence paid off, as we could connect the SDK flawlessly with our app. This challenge provided us with an opportunity to enhance our problem-solving skills.

We faced a second challenge while connecting WalletConnect Web3 Modal with Celo Network. Unfortunately, we couldn't carry out transactions on the Celo Alfajores Testnet due to an issue with the EIP155 standard. However, we explored other options and discovered that the Celo Mainnet was compatible with EIP155. We successfully migrated and executed transactions without any problems. This experience highlighted the significance of testing and ensuring compatibility with our network.

We faced a compatibility issue with Metamask not supporting WalletConnect  V2. Our initial plan was to use Metamask to connect to our wallets, so we had to find a workaround. We researched several wallet connection strategies and discovered that Valora was compatible with Wallet Connect  V2. We made the switch to Valora to continue the developmental process. This challenge showed us the importance of having fallback strategies and reminded us that technology is always changing. We need to be ready to adjust to these changes.

Finally,  we are unable to share the expo demo URL due to Apple Policy restrictions. When the URL is accessed, it always returns error 403. To address this issue, we have provided a sample login credential for the project. You can be confident that this will not affect the project, and the issue will be resolved as soon as the hackathon is finished.

## Team

* [Oyeniyi Abiola Peace](https://twitter.com/_iamoracle)
* [Ayewa Precious Olamide](https://twitter.com/darleneprecy)

## Special Thanks

I want to give a special thanks to the BWC Team for their support and @HarpalJadeja for providing helpful suggestions on addressing these issues.