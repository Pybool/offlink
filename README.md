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

Follow the steps below to use the solution as a seller

1: Login with your credentials

2: Connect your preferred wallet and fund your wallet with CUSD

3: From the menu click offramp option

4: Enter the amount you intend to offramp

5: Select the currency in which you wish to offramp

6: Click the offramp button

Follow the steps below to use the solution as a buyer

1: Login with your credentials

2: Connect your preferred wallet and fund your wallet with CUSD

3: On the dashboard, click Accept button

4: Transfer payment in fiat currency to the seller and await confirmation by seller

### Developers

1: Clone the repository:

```bash
git clone https://github.com/Pybool/offlink.git
```
### Frontend

Navigate to frontend root folder and install dependencies

```bash
cd frontend && yarn
```
Start development server

```bash
yarn dev
```


### Backend
Navigate to backend root folder
```bash
cd Backend
```
Install dependencies
```bash
npm install
```
Fill In environment variables
```
PORT= 
REDIS_HOST = 
MONGODB_URI=
MONGODB_PASSWORD = 
DB_NAME=
ISSUER=
EMAIL_HOST = 
EMAIL_PORT = 
EMAIL_HOST_USER = 
EMAIL_HOST_PASSWORD = 
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False

POOL_CHANNEL = 
BACKEND_BASE_URL=
FRONTEND_BASE_URL=
PASSWORD_RESET_URL =
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

SIGNER_PRIVATE_KEY = 
SIGNER_ADDRESS = 
CELO_CHAINID = 44787
SMART_CONTRACT_ADDRESS = 
WSS_PROVIDER = wss://alfajores-forno.celo-testnet.org/ws
HTTP_PROVIDER = https://alfajores-forno.celo-testnet.org
```
Start development server

```bash
npm run start
```
## Presentation and Live Demo

[Live APP DEMO](https://youtu.be/8py4uZeXU_M)

[Live Presentation](https://youtu.be/ML4JVYPEDNM)

[Presentation Slide on Canva](https://github.com/Pybool/offlink/tree/master/frontend/public/Slides/Offlinkslide.pptx)


## Challenges and Lessons During the Hackathon
During the hackathon, we faced some challenges, which we successfully tackled and learned from. Our first issue faced was with maintaining connection for more than 20 minutes to the Alphajores Testnet Websocket RPC for listening to events on the blockchain. We solved this issue by implementing a retry reconnection mechanism and polling of the blockchain manually.

Another issue faced was was with react wagmi/core was another problem we faced due to broken dependency, after much research it was resolved by installing @wagmi/core@1.4.6, viem@1.19.1, wagmi@1.4.6" packages

## Team Members
1: Muhdsodiq Bolarinwa
2: Henry Daniel
3: Emmanuel Eko

