# Hydra Subnet Whitepaper

*Version:* 0.1
*Date:* July 10, 2025

---

## 1. Introduction

Hydra is a Bittensor subnet that channels decentralized liquidity to where it is most productive. By staking **SN66**, token‑holders collectively decide which Uniswap v3 liquidity pools ("alpha pools") the subnet should support in the Bittensor ecosystem.

Miners—who physically supply the capital to those pools—earn proportional rewards every epoch according to (a) how much liquidity they provide and (b) whether the ranges they supply were selected by **α‑Stake** voting. The result is a self‑organizing system that continually redirects incentives toward the pools most valued by the community.

---

## 2. Key Components

| Component | Role |
|-----------|------|
| **SN66 Token** | Governance asset. When staked it counts as **α‑Stake**, granting voting power over liquidity‑range selection. |
| **α‑Stake Holders** | Any wallet that locks SN66. Weight is proportional to the amount locked. Holders vote each epoch on which Uniswap v3 Bittensor pools should receive mining incentives. |
| **Liquidity Miners** | On‑chain agents that provide capital to the voted Uniswap v3 pools. They earn epoch‑based rewards from the subnet. |
| **Validators** | Off‑chain actors that: (1) fetch α‑Stake votes from the public Hydra web UI, (2) stake per holder on‑chain, and (3) read on‑chain liquidity supplied by each miner. All fetched inputs and resulting transactions are publicly auditable. |
| **Bounty Burners** | Miners (or other parties) who **burn SN α** to post a temporary *bounty* on a specific liquidity pool, thereby boosting its effective stake weight for a limited number of epochs. |

---

## 3. System Architecture (Text Overview)

1. **Deposit**
   Liquidity providers lock assets into *Bittensor‑hosted Uniswap v3 pools that have been activated* by α‑Stake voting.

2. **Voting by α‑Stake (v0 implementation)**
   - Token‑holders cast their votes through the **Hydra web interface**.
   - At each epoch boundary, validators download the vote file, verify signatures, and publish an immutable hash of that file on‑chain.
   - Validators then stake appropriate weights on‑chain for every holder and tick.
   - Because both the vote file and the validator transactions are public, any third party can reproduce the tally and verify that staking was faithful.

3. **Reward Distribution**
   At epoch close, the subnet tallies the total liquidity supplied to each active alpha pool—data fetched directly from the blockchain—and distributes newly‑minted SN66 *pro rata* to those miners. (Uniswap swap fees remain with the LP positions themselves.)

4. **Bounty Application (future release)**
   - Any address may burn SN α to place a bounty on a given pool.
   - For a preset bounty window (e.g., 10 epochs) the pool's stake weight is increased by a premium proportional to the amount burned—temporarily augmenting its chance of being selected by consensus.
   - After the window expires the premium decays to zero; the burn is permanent.

---

## 4. Liquidity Routing & Bandwidth Rights

- **α‑Stake Determination**
  Validators read on‑chain native Bittensor wallets to determine which addresses have SN66 locked and in what amounts. No action is required from miners in this step.

- **Epochic Rebalancing**
  Every epoch (e.g., hourly):
  1. The subnet finalizes the set of alpha pools chosen by α‑Stake voting (plus any bounty‑boosted pools).
  2. For each active pool, it measures how much liquidity every miner provided during the epoch (on‑chain query).
  3. Newly‑minted SN66 for that pool is distributed to those miners.

All oracle inputs (vote files, liquidity snapshots, bounty burns) and all resulting transactions are publicly accessible, ensuring an open audit trail.

---

## 5. Roadmap

| Milestone | Target Date | Scope |
|-----------|-------------|-------|
| **v0.1 – Mainnet Launch** | **July 2025** | ‑ Off‑chain web voting by α‑Stake holders<br>‑ Validators mirror votes on‑chain & fetch liquidity<br>‑ Epochic reward engine |
| **v0.2 – Web UI Expansion** | **Q4 2025** | ‑ Rich analytics dashboard for vote & liquidity transparency |
| **v0.3 – On‑chain Governance** | **Q2 2026** | ‑ Migrate α‑Stake voting from web UI to fully on‑chain smart contracts<br>‑ Validators become light verifiers of on‑chain data only |
| **v0.4 – Miner Bounty System** | **Q3 2026** | ‑ Introduce burn‑based bounty mechanism (**SN α → pool premium**)<br>‑ Burned SN α temporarily augments stake‑consensus weight for selected pools<br>‑ UI & validator support for bounty tracking and decay timers |

> **Toward full decentralization:** Moving voting logic on‑chain eliminates the need for validators to fetch and mirror off‑chain votes, reducing trust assumptions and completing the governance loop entirely within the blockchain.

---

## 6. Conclusion

The Hydra subnet aligns token‑holder preferences with miner incentives to bootstrap deep, targeted liquidity on Bittensor‑managed Uniswap v3 pools. In **v0**, voting occurs through the public Hydra web interface while validators act as impartial bridges to the blockchain. As outlined in the roadmap, voting will transition fully on‑chain and, with the forthcoming bounty system, allow miners to directly signal high‑priority pools by burning SN α—delivering a trust‑minimized, wholly decentralized liquidity routing system.
