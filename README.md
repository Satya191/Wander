# Wander App

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Welcome to the Wander App repository. 

A programmable payments POC that awards a dynamic NFT to a tourist visiting NYC and paying with crypto.

## Table of Contents

- [Project Overview](#project-overview)
- [Background](#background) 
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This repository is organized as a monorepo with two main packages:

- `hardhat`: Contains Ethereum smart contract development and testing using Hardhat.
- `nextjs`: Contains the Next.js web application.

## Background 

The ubiquitous adoption of cryptocurrency payments would be good for merchants, consumers, and communities. Traditional consumer payments market structure is uncompetitive, slow-moving, and uninnovative. Because card networks and big banks dominate, fees remain high and processes outdated. Payments on low-fee, fast-finality blockchains offer an alternative with numerous benefits.

However, few people today pay for products with cryptocurrency. One reason is that *for consumers*, card payments are actually pretty smooth. Card companies have abstracted complexity and cost away from consumers, and the high fees, slow settlement, and lopsided market structure are only visible to merchants. And when it comes time to pay, merchants will never force consumers to pay with cryptocurrency because their primary objective is finishing the sale. 

Therefore, what is needed is a reason for consumers to want to pay with cryptocurrency. So far, crypto companies have only focused on porting traditional payments experiences onto public blockchains, but the primary benefit of paying with crypto is not that you get to pay with crypto. Instead, the primary benefit is that anyone in the world can integrate crypto payments into *genuinely new programmable payment experiences* that are only possible on public blockchains. Because value transfer is a native function of Turing-complete public blockchains, the possibilities of integrating payments into new experiences that we can’t yet imagine are immense.

With Wander, we create a proof of concept for the programmability of payments. We consider a situation in which someone is traveling to New York City. As the tourist travels around the city to local restaurants, merchants, and tourist locations, they are offered the chance to curate an upgradeable NFT that visually changes as they make crypto payments are merchants around the city. Achieving additional levels of the upgradeable NFT result in better artwork, merchant rewards, and other digital and physical trinkets.

Because the tourists are paying with cryptocurrency, they can pay with their home currency and avoid expensive foreign transactions fees by taking advantage of on-chain stablecoins and foreign exchange. On the merchant side, merchants make an additional 3-5% by avoiding credit card fees. The savings on card fees can be rerouted to other beneficiaries: in our POC, part of every payment is automatically routed to a licensure payment for the local artist who made the dynamic NFTs. This proof-of-concept, which earns a foothold for crypto payments in a favorable environment, can be used to begin changing consumer behaviors and exploring new payment experiences.

Our smart contract is based off the ERC-721 standard. [HENRIK]

Our frontend demo is only available on a local Scaffold/hardhat testnet. Merchants can help consumers make their payments using the `sendEther` function of the smart contract. They can also create new promotions, which are created by passing five parameters: an array of IPFS hashes that link to the NFTs, an array of “scores” needed to obtain each NFT tier, a duration of the promotion in days, the blockchain address of the charity/artist that is receiving part of the merchant savings, and the percent of the payment to be routed to the charity/artist.

Consumer “scores” are a compound function of two variables: money spent and payments made. It is equal to log(x)+y where x is money spent and y is number of payments. We constructed the score this way because we want tourists to commit value to merchants and local organizations, but we didn’t want to base rewards purely on how much money someone has. The log function mutes the marginal effect of lots of spending on the consumer score.

We want to see the proliferation of consumer crypto payments, which so far have not seen significant adoption. As stated in the introduction, one of the reasons for this is that the benefit is mainly enjoyed by the merchant, not the consumer. Our proof of concept identifies one basic way in which developers can build experiences that make consumers want to pay with crypto. In this situation, a tourist collects digital trinkets that memorialize his time in NYC, and he engages in a gamified payments experience that provides a sense of accomplishment for making crypto payments. However, we want to emphasize that this is just the surface of what could be built around payments. Public blockchains enable developers to create genuinely new experiences, and we’re excited to see what else people come up with.

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

Before you begin, ensure you have the following software installed on your system:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)
### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Satya191/Wander.git

2. Install project dependencies using Yarn:

    ```bash
    yarn install
3. Run a local network in the first terminal:
    ```bash
    yarn chain
4. On a second terminal, deploy the test contract:
    ```bash
    yarn deploy
5. On a third terminal, start your NextJS app:
    ```bash
    yarn start
Visit your app on: http://localhost:3000. You can interact with your smart contracts 

### Scripts
This project includes several predefined scripts to streamline common tasks. You can run these scripts using Yarn. For example:

To start the development server for the Next.js application:

```bash
yarn start
``````
### Here is a list of available scripts:

- account, chain, fork, deploy, verify, compile, generate, hardhat:lint, hardhat:lint-staged,hardhat:test, hardhat:test,start, next:lint, next:format,next:check-types, postinstall: Install Husky hooks, precommit: Run lint-staged.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
