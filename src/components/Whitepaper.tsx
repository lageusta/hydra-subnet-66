"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WhitepaperProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Whitepaper({ isOpen, onClose }: WhitepaperProps) {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  if (!isOpen) return null;

  const sections = [
    { id: "introduction", title: "Introduction", icon: "📋" },
    { id: "components", title: "Key Components", icon: "🔧" },
    { id: "architecture", title: "System Architecture", icon: "🏗️" },
    { id: "routing", title: "Liquidity Routing", icon: "🔀" },
    { id: "roadmap", title: "Roadmap", icon: "🗺️" },
    { id: "conclusion", title: "Conclusion", icon: "🎯" },
  ];

  const components = [
    {
      name: "SN66 Token",
      role: "Governance asset. When staked it counts as α‑Stake, granting voting power over liquidity‑range selection.",
      icon: "🪙",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "α‑Stake Holders",
      role: "Any wallet that locks SN66. Weight is proportional to the amount locked. Holders vote each epoch on which Uniswap v3 Bittensor pools should receive mining incentives.",
      icon: "🗳️",
      color: "from-cyan-500 to-sky-500"
    },
    {
      name: "Liquidity Miners",
      role: "On‑chain agents that provide capital to the voted Uniswap v3 pools. They earn epoch‑based rewards from the subnet.",
      icon: "⛏️",
      color: "from-sky-500 to-blue-500"
    },
    {
      name: "Validators",
      role: "Off‑chain actors that: (1) fetch α‑Stake votes from the public Hydra web UI, (2) stake per holder on‑chain, and (3) read on‑chain liquidity supplied by each miner.",
      icon: "✅",
      color: "from-emerald-500 to-cyan-500"
    },
    {
      name: "Bounty Burners",
      role: "Miners (or other parties) who burn SN α to post a temporary bounty on a specific liquidity pool, thereby boosting its effective stake weight for a limited number of epochs.",
      icon: "🔥",
      color: "from-orange-500 to-red-500"
    }
  ];

  const roadmapItems = [
    {
      version: "v0.1",
      date: "July 2025",
      title: "Mainnet Launch",
      features: [
        "Off‑chain web voting by α‑Stake holders",
        "Validators mirror votes on‑chain & fetch liquidity",
        "Epochic reward engine"
      ],
      status: "completed"
    },
    {
      version: "v0.2",
      date: "Q4 2025",
      title: "Web UI Expansion",
      features: [
        "Rich analytics dashboard for vote & liquidity transparency"
      ],
      status: "inProgress"
    },
    {
      version: "v0.3",
      date: "Q2 2026",
      title: "On‑chain Governance",
      features: [
        "Migrate α‑Stake voting from web UI to fully on‑chain smart contracts",
        "Validators become light verifiers of on‑chain data only"
      ],
      status: "upcoming"
    },
    {
      version: "v0.4",
      date: "Q3 2026",
      title: "Miner Bounty System",
      features: [
        "Introduce burn‑based bounty mechanism (SN α → pool premium)",
        "Burned SN α temporarily augments stake‑consensus weight for selected pools",
        "UI & validator support for bounty tracking and decay timers"
      ],
      status: "upcoming"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-950 via-black to-gray-950 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-black/90 border-b border-gray-800 px-8 py-4 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-2xl">📄</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Hydra Subnet Whitepaper
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Version 0.1</Badge>
                <span className="text-gray-500 text-sm">July 10, 2025</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-80 bg-gray-900/50 border-r border-gray-800 p-6 overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-6">Table of Contents</h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white border-l-4 border-blue-500"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-12 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction Section */}
            {activeSection === "introduction" && (
              <div className="animate-fadeIn">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                  <span>📋</span> Introduction
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-800/50 p-8 mb-8">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Hydra is a Bittensor subnet that channels decentralized liquidity to where it is most productive.
                      By staking <span className="text-blue-400 font-semibold">SN66</span>, token‑holders collectively decide which Uniswap v3 liquidity pools
                      ("alpha pools") the subnet should support in the Bittensor ecosystem.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg mt-4">
                      Miners—who physically supply the capital to those pools—earn proportional rewards every epoch according to:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-black/30 rounded-lg p-4 border border-blue-700/30">
                        <div className="text-blue-400 font-semibold mb-2">📊 Liquidity Amount</div>
                        <p className="text-gray-400 text-sm">How much liquidity they provide to the pools</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-cyan-700/30">
                        <div className="text-cyan-400 font-semibold mb-2">🎯 Range Selection</div>
                        <p className="text-gray-400 text-sm">Whether the ranges they supply were selected by α‑Stake voting</p>
                      </div>
                    </div>
                  </Card>
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20">
                    <p className="text-blue-300 font-medium">
                      The result is a self‑organizing system that continually redirects incentives toward the pools most valued by the community.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Key Components Section */}
            {activeSection === "components" && (
              <div className="animate-fadeIn">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                  <span>🔧</span> Key Components
                </h2>
                <div className="grid gap-6">
                  {components.map((component, index) => (
                    <Card
                      key={index}
                      className="bg-gray-900/50 border-gray-800 p-6 hover:border-gray-700 transition-all duration-300 hover:scale-[1.01] group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${component.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <span className="text-2xl">{component.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{component.name}</h3>
                          <p className="text-gray-400 leading-relaxed">{component.role}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* System Architecture Section */}
            {activeSection === "architecture" && (
              <div className="animate-fadeIn">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                  <span>🏗️</span> System Architecture
                </h2>
                <div className="space-y-8">
                  {/* Process Flow */}
                  <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
                    <h3 className="text-2xl font-bold text-white mb-6">Process Flow</h3>
                    <div className="space-y-6">
                      {[
                        {
                          step: "1",
                          title: "Deposit",
                          description: "Liquidity providers lock assets into Bittensor‑hosted Uniswap v3 pools that have been activated by α‑Stake voting.",
                          color: "from-blue-500 to-cyan-500"
                        },
                        {
                          step: "2",
                          title: "Voting by α‑Stake (v0 implementation)",
                          description: "Token‑holders cast their votes through the Hydra web interface. Validators download the vote file, verify signatures, and publish an immutable hash on‑chain.",
                          color: "from-cyan-500 to-sky-500"
                        },
                        {
                          step: "3",
                          title: "Reward Distribution",
                          description: "At epoch close, the subnet tallies liquidity and distributes newly‑minted SN66 pro rata to miners.",
                          color: "from-sky-500 to-blue-500"
                        },
                        {
                          step: "4",
                          title: "Bounty Application (future)",
                          description: "Any address may burn SN α to place a bounty on a given pool, temporarily augmenting its stake weight.",
                          color: "from-emerald-500 to-cyan-500"
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex gap-6 group">
                          <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                            <p className="text-gray-400 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transparency Note */}
                  <Card className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border-emerald-800/50 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Full Transparency</h4>
                    </div>
                    <p className="text-gray-300">
                      Because both the vote file and the validator transactions are public, any third party can reproduce the tally and verify that staking was faithful.
                    </p>
                  </Card>
                </div>
              </div>
            )}

            {/* Liquidity Routing Section */}
            {activeSection === "routing" && (
              <div className="animate-fadeIn">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                  <span>🔀</span> Liquidity Routing & Bandwidth Rights
                </h2>
                <div className="space-y-8">
                  <Card className="bg-gray-900/50 border-gray-800 p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">α‑Stake Determination</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      Validators read on‑chain native Bittensor wallets to determine which addresses have SN66 locked and in what amounts.
                      No action is required from miners in this step.
                    </p>
                    <div className="bg-black/30 rounded-lg p-6 border border-blue-700/30">
                      <h4 className="text-lg font-semibold text-blue-400 mb-4">Epochic Rebalancing Process</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <span className="text-blue-400 font-bold text-sm">1</span>
                          </div>
                          <p className="text-gray-300">The subnet finalizes the set of alpha pools chosen by α‑Stake voting (plus any bounty‑boosted pools)</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                            <span className="text-cyan-400 font-bold text-sm">2</span>
                          </div>
                          <p className="text-gray-300">For each active pool, it measures how much liquidity every miner provided during the epoch (on‑chain query)</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-sky-500/20 rounded-full flex items-center justify-center">
                            <span className="text-sky-400 font-bold text-sm">3</span>
                          </div>
                          <p className="text-gray-300">Newly‑minted SN66 for that pool is distributed to those miners</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/50 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Open Audit Trail</h4>
                    </div>
                    <p className="text-gray-300">
                      All oracle inputs (vote files, liquidity snapshots, bounty burns) and all resulting transactions are publicly accessible,
                      ensuring an open audit trail.
                    </p>
                  </Card>
                </div>
              </div>
            )}

            {/* Roadmap Section */}
            {activeSection === "roadmap" && (
              <div className="animate-fadeIn">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                  <span>🗺️</span> Roadmap
                </h2>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-emerald-500"></div>

                  <div className="space-y-8">
                    {roadmapItems.map((item, index) => (
                      <div key={index} className="relative flex gap-8">
                        {/* Timeline Dot */}
                        <div className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                          item.status === 'completed' ? 'bg-emerald-500 border-emerald-900' :
                          item.status === 'inProgress' ? 'bg-blue-500 border-blue-900 animate-pulse' :
                          'bg-gray-600 border-gray-800'
                        }`}></div>

                        {/* Content */}
                        <div className="ml-16 flex-1">
                          <Card className={`p-6 ${
                            item.status === 'completed' ? 'bg-emerald-900/20 border-emerald-800/50' :
                            item.status === 'inProgress' ? 'bg-blue-900/20 border-blue-800/50' :
                            'bg-gray-900/50 border-gray-800'
                          } hover:scale-[1.01] transition-transform`}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <Badge className={`${
                                  item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' :
                                  item.status === 'inProgress' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' :
                                  'bg-gray-700/50 text-gray-400 border-gray-600'
                                }`}>
                                  {item.version}
                                </Badge>
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                              </div>
                              <span className="text-gray-400">{item.date}</span>
                            </div>
                            <ul className="space-y-2">
                              {item.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-cyan-400 mt-1">•</span>
                                  <span className="text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </Card>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Future Vision */}
                  <Card className="mt-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800/50 p-6">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span>🚀</span> Toward Full Decentralization
                    </h4>
                    <p className="text-gray-300">
                      Moving voting logic on‑chain eliminates the need for validators to fetch and mirror off‑chain votes,
                      reducing trust assumptions and completing the governance loop entirely within the blockchain.
                    </p>
                  </Card>
                </div>
              </div>
            )}

            {/* Conclusion Section */}
            {activeSection === "conclusion" && (
              <div className="animate-fadeIn">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                  <span>🎯</span> Conclusion
                </h2>
                <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-800/50 p-8">
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    The Hydra subnet aligns token‑holder preferences with miner incentives to bootstrap deep, targeted liquidity
                    on Bittensor‑managed Uniswap v3 pools. In <span className="text-blue-400 font-semibold">v0</span>, voting occurs through the public Hydra web interface
                    while validators act as impartial bridges to the blockchain.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    As outlined in the roadmap, voting will transition fully on‑chain and, with the forthcoming bounty system,
                    allow miners to directly signal high‑priority pools by burning SN α—delivering a trust‑minimized,
                    wholly decentralized liquidity routing system.
                  </p>

                  <div className="mt-8 p-6 bg-black/30 rounded-lg border border-blue-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Key Innovation</h4>
                    </div>
                    <p className="text-blue-300">
                      Hydra creates a self‑organizing system that continually redirects incentives toward the pools most valued by the community,
                      ensuring efficient capital allocation in the Bittensor ecosystem.
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
