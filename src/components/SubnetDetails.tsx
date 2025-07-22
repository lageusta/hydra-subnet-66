"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SubnetDetailsProps {
  subnetId: number;
  onBack: () => void;
  subnetData: { id: number; name: string; value: number; color: string };
  liquidityData: { id: number; name: string; value: number; color: string };
}

interface LiquidityPosition {
  coldkey: string;
  hotkey: string;
  uid: number;
  amount: number;
  timeOpened: string;
  apy: number;
}

// Sample liquidity positions data
const generatePositions = (subnetId: number): LiquidityPosition[] => {
  const positions: LiquidityPosition[] = [];
  const count = 15 + Math.floor(Math.random() * 10);

  for (let i = 0; i < count; i++) {
    positions.push({
      coldkey: `5${Math.random().toString(36).substr(2, 8).toUpperCase()}...${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      hotkey: `5${Math.random().toString(36).substr(2, 8).toUpperCase()}...${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      uid: 1000 + i + subnetId * 100,
      amount: Math.floor(Math.random() * 100000) / 100,
      timeOpened: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      apy: 15 + Math.random() * 10
    });
  }

  return positions.sort((a, b) => b.amount - a.amount);
};

export default function SubnetDetails({ subnetId, onBack, subnetData, liquidityData }: SubnetDetailsProps) {
  const [sortBy, setSortBy] = useState<'amount' | 'apy' | 'time'>('amount');
  const [positions] = useState(() => generatePositions(subnetId));
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const sortedPositions = [...positions].sort((a, b) => {
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'apy') return b.apy - a.apy;
    return new Date(b.timeOpened).getTime() - new Date(a.timeOpened).getTime();
  });

  const totalLiquidity = positions.reduce((sum, pos) => sum + pos.amount, 0);
  const avgAPY = positions.reduce((sum, pos) => sum + pos.apy, 0) / positions.length;

  return (
    <div className="animate-fadeIn">
      {/* Back button with enhanced design */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-8 text-gray-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-800/50 backdrop-blur-xl transition-all duration-300 group"
      >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Back to Overview</span>
      </Button>

      {/* Subnet Header with gradient background */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-gray-900/40 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
               style={{ background: `radial-gradient(circle, ${subnetData.color}, transparent)` }}></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {subnetData.name}
                </h2>
                <div className="flex items-center gap-4 text-gray-400">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 px-3 py-1">
                    Subnet ID: {subnetId}
                  </Badge>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: subnetData.color }}></div>
                    Weight: {(subnetData.value * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Total Liquidity</div>
                <div className="text-3xl font-black text-white">{liquidityData.value.toFixed(2)}M TAO</div>
                <div className="text-sm text-emerald-400 mt-1">≈ ${(liquidityData.value * 350).toFixed(1)}M USD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards with 3D effect */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          {
            title: "Total Positions",
            value: positions.length.toString(),
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
            color: "blue",
            gradient: "from-blue-600 to-indigo-600"
          },
          {
            title: "Total Liquidity",
            value: `${(totalLiquidity / 1000).toFixed(1)}K TAO`,
            icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            color: "emerald",
            gradient: "from-emerald-600 to-green-600"
          },
          {
            title: "Average APY",
            value: `${avgAPY.toFixed(1)}%`,
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            color: "purple",
            gradient: "from-purple-600 to-pink-600"
          },
          {
            title: "24h Volume",
            value: `${(totalLiquidity * 0.15).toFixed(0)} TAO`,
            icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
            color: "cyan",
            gradient: "from-cyan-600 to-sky-600"
          }
        ].map((metric, index) => (
          <div
            key={index}
            className="group relative"
            style={{
              transform: `perspective(1000px) rotateX(${hoveredRow === index ? -5 : 0}deg)`,
              transition: 'transform 0.3s ease'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <Card className="relative bg-gray-900/30 backdrop-blur-2xl border-gray-700/50 p-6 rounded-2xl hover:border-gray-600/50 transition-all duration-300 group-hover:translate-y-[-2px] overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-400 font-medium">{metric.title}</div>
                  <div className={`w-10 h-10 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={metric.icon} />
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{metric.value}</div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Liquidity Positions Table with enhanced design */}
      <Card className="bg-gray-900/40 backdrop-blur-2xl border-gray-700/50 rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <div className="w-3 h-10 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30"></div>
              Liquidity Positions
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <div className="flex gap-2">
                {(['amount', 'apy', 'time'] as const).map((sort) => (
                  <Button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    variant="ghost"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      sortBy === sort
                        ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white border border-blue-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {sort === 'amount' ? 'Amount' : sort === 'apy' ? 'APY' : 'Time'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Coldkey</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Hotkey</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">UID</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">APY</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Time Opened</th>
              </tr>
            </thead>
            <tbody>
              {sortedPositions.map((position, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700/30 hover:bg-gray-800/30 backdrop-blur-xl transition-all duration-200 cursor-pointer group"
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-400">C</span>
                      </div>
                      <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">{position.coldkey}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-sky-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-cyan-400">H</span>
                      </div>
                      <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">{position.hotkey}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-gray-700/50 text-gray-300 border-gray-600/50 font-mono">
                      {position.uid}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div>
                      <div className="text-sm font-bold text-white">{position.amount.toFixed(2)} TAO</div>
                      <div className="text-xs text-gray-400">${(position.amount * 350).toFixed(0)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-sm font-bold ${position.apy > 20 ? 'text-emerald-400' : 'text-blue-400'}`}>
                      {position.apy.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm text-gray-300">{position.timeOpened}</div>
                    <div className="text-xs text-gray-500">
                      {Math.floor((Date.now() - new Date(position.timeOpened).getTime()) / (1000 * 60 * 60 * 24))}d ago
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-700/50 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Showing {sortedPositions.length} positions
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Total: {(totalLiquidity / 1000).toFixed(1)}K TAO</span>
              <span className="text-sm text-emerald-400">≈ ${(totalLiquidity * 350 / 1000).toFixed(1)}K USD</span>
            </div>
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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
