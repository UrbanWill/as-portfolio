# Ape Swap Portfolio

A small portfolio page for users to display token balances from token lists. 
Upon logging in, users can access a concise portfolio page that showcases their token balances across multiple supported chains. This page allows users to easily display their token holdings from various token lists associated with their connected wallet.

Proposed work scope on [Notion](https://www.notion.so/Ape-Swap-Challange-Scope-7a62c8b680f34df9a81cda0ba0b61de0).

Deployed version: https://as-portfolio-zeta.vercel.app/

## Technical optimizations
- `@web3-react` to handle wallet connections and adding networks
- `ethereum-multicall` Reduces the amount of calls made to RPC providers.
- `react-query` Used to create custom fetch hooks, cache data on the client side and refech data when cache is stale
- `react-table` is being used in conjunction with `react-virtual` to crate reusable, agnostic and headless tables that perform well, reduce the amount of re-renders and can render thousands of rows smoothly.

## Lo-fi design:
![ApeSwap-lofi-1x](https://github.com/UrbanWill/as-portfolio/assets/47801291/04d9b26a-00d6-42fb-9d67-d496a88d8826)

## Getting Started

- Clone the repo
- Install the dependencies
- Add env variables

To do this, first open a terminal and run the following commands:

```bash
git clone git@github.com:UrbanWill/as-portfolio.git
cd as-portfolio
```

Add `NEXT_PUBLIC_INFURA_PROJECT_ID` envrioment variable to `.env.local` file

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3003](http://localhost:3003) with your browser to see the result.

## Storybook components

To view component stories, open a terminal and run the following commands:
```bash
cd as-portfolio
yarn storybook
```
Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.
