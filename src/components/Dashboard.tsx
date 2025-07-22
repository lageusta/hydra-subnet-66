"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import VoteModal from "./VoteModal";
import SubnetDetails from "./SubnetDetails";

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample data for subnet weights (summing to 1)
const subnetWeights = [
  { id: 1, name: "Subnet 1 - Text Generation", value: 0.25, color: "#3B82F6" },
  { id: 8, name: "Subnet 8 - Time Series", value: 0.15, color: "#06B6D4" },
  { id: 13, name: "Subnet 13 - Dataverse", value: 0.20, color: "#0EA5E9" },
  { id: 18, name: "Subnet 18 - Cortex", value: 0.12, color: "#14B8A6" },
  { id: 21, name: "Subnet 21 - FileTAO", value: 0.08, color: "#10B981" },
  { id: 23, name: "Subnet 23 - NicheImage", value: 0.10, color: "#22D3EE" },
  { id: 31, name: "Subnet 31 - Healthcare", value: 0.10, color: "#0891B2" },
];

// Sample data for liquidity distribution
const liquidityData = [
  { id: 1, name: "Subnet 1 - Text Generation", value: 10.5, color: "#3B82F6" },
  { id: 8, name: "Subnet 8 - Time Series", value: 6.3, color: "#06B6D4" },
  { id: 13, name: "Subnet 13 - Dataverse", value: 8.4, color: "#0EA5E9" },
  { id: 18, name: "Subnet 18 - Cortex", value: 5.04, color: "#14B8A6" },
  { id: 21, name: "Subnet 21 - FileTAO", value: 3.36, color: "#10B981" },
  { id: 23, name: "Subnet 23 - NicheImage", value: 4.2, color: "#22D3EE" },
  { id: 31, name: "Subnet 31 - Healthcare", value: 4.2, color: "#0891B2" },
];

const totalLiquidity = liquidityData.reduce((sum, item) => sum + item.value, 0);

const CustomTooltip = ({ active, payload, label, isWeight }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
  label?: string;
  isWeight?: boolean;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-5 shadow-2xl shadow-blue-500/20">
        <p className="text-white font-bold mb-3 text-lg">{payload[0].name}</p>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#3B82F6' }}></div>
          <p className="text-blue-300 font-semibold">
            {isWeight
              ? `Weight: ${(payload[0].value * 100).toFixed(1)}%`
              : `Liquidity: ${payload[0].value.toFixed(2)}M TAO`
            }
          </p>
        </div>
        {!isWeight && (
          <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
            <span className="text-emerald-400">≈</span>
            ${(payload[0].value * 350).toFixed(1)}M USD
            <span className="text-gray-500">({((payload[0].value / totalLiquidity) * 100).toFixed(1)}%)</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

// Create a custom label component that accepts hover state
const createCustomLabel = (hoveredIndex: number | null, isWeight: boolean) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/display-name
  return (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, payload, index } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for small slices

    // Get the subnet ID from the data
    const subnetId = payload?.id || '';
    const isHovered = hoveredIndex === index;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-bold text-sm drop-shadow-lg transition-all duration-200"
        style={{
          fontSize: isHovered ? '16px' : '14px',
          opacity: isHovered ? 1 : 0.9
        }}
      >
        {isHovered ? `${(percent * 100).toFixed(1)}%` : subnetId}
      </text>
    );
  };
};

export default function Dashboard({ isOpen, onClose }: DashboardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeLiqIndex, setActiveLiqIndex] = useState<number | null>(null);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedSubnet, setSelectedSubnet] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredWeightIndex, setHoveredWeightIndex] = useState<number | null>(null);
  const [hoveredLiquidityIndex, setHoveredLiquidityIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
    setHoveredWeightIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setHoveredWeightIndex(null);
  };

  const onLiqPieEnter = (_: unknown, index: number) => {
    setActiveLiqIndex(index);
    setHoveredLiquidityIndex(index);
  };

  const onLiqPieLeave = () => {
    setActiveLiqIndex(null);
    setHoveredLiquidityIndex(null);
  };

  const handleSubnetClick = (subnetId: number) => {
    setSelectedSubnet(subnetId);
  };

  const handleBackToOverview = () => {
    setSelectedSubnet(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-cyan-950/20"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
          }}
        />
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header with glassmorphism */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-black/50 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
              <div className="group">
                <h1 className="text-2xl md:text-4xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient">
                    Hydra Dashboard
                  </span>
                </h1>
                <div className="h-0.5 md:h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-1 md:mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
              <div className="hidden sm:block h-8 md:h-12 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
              <Badge className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-400 border-emerald-500/50 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-semibold backdrop-blur-xl">
                <span className="relative flex h-2 md:h-2.5 w-2 md:w-2.5 mr-1.5 md:mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 md:h-2.5 w-2 md:w-2.5 bg-emerald-400"></span>
                </span>
                Live Data
              </Badge>
            </div>
            <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
              <Button
                onClick={() => setShowVoteModal(true)}
                className="relative group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-4 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden flex-1 sm:flex-initial"
              >
                <span className="relative z-10 flex items-center justify-center gap-1 md:gap-2">
                  <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vote Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <Button
                disabled
                className="bg-gray-800/50 backdrop-blur-xl text-gray-500 font-bold px-4 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-xl cursor-not-allowed opacity-50 border border-gray-700/50 flex-1 sm:flex-initial"
              >
                <svg className="w-4 md:w-5 h-4 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Boost
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 md:p-3 rounded-xl transition-all duration-300 backdrop-blur-xl"
              >
                <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
        {selectedSubnet === null ? (
          <>
            {/* Stats Overview with 3D effect */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
              {[
                {
                  title: "Total Liquidity",
                  value: `${totalLiquidity.toFixed(1)}M TAO`,
                  change: "+12.3%",
                  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  color: "emerald",
                  gradient: "from-emerald-600 to-green-600"
                },
                {
                  title: "Active Subnets",
                  value: "7",
                  subtitle: "Alpha selected",
                  icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
                  color: "blue",
                  gradient: "from-blue-600 to-indigo-600"
                },
                {
                  title: "Active Miners",
                  value: "256",
                  subtitle: "98% online",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                  color: "cyan",
                  gradient: "from-cyan-600 to-sky-600"
                },
                {
                  title: "Avg APY",
                  value: "18.5%",
                  change: "+2.1%",
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                  color: "purple",
                  gradient: "from-purple-600 to-pink-600"
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    transform: `perspective(1000px) rotateX(${activeIndex === index ? -5 : 0}deg) rotateY(${activeIndex === index ? 5 : 0}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl md:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <Card className="relative bg-gray-900/30 backdrop-blur-2xl border-gray-700/50 p-4 md:p-6 rounded-xl md:rounded-2xl hover:border-gray-600/50 transition-all duration-300 group-hover:translate-y-[-2px] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2 md:mb-4">
                        <div className="text-xs md:text-sm text-gray-400 font-medium">{stat.title}</div>
                        <div className={`w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br ${stat.gradient} rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xl md:text-3xl font-black text-white mb-0.5 md:mb-1">{stat.value}</div>
                      {stat.change && (
                        <div className="text-xs md:text-sm text-emerald-400 flex items-center gap-0.5 md:gap-1">
                          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          </svg>
                          <span className="hidden sm:inline">{stat.change} this week</span>
                          <span className="sm:hidden">{stat.change}</span>
                        </div>
                      )}
                      {stat.subtitle && (
                        <div className="text-xs md:text-sm text-gray-400">{stat.subtitle}</div>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* Pie Charts with enhanced design */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Subnet Weights Chart */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl md:rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                <Card className="relative bg-gray-900/40 backdrop-blur-2xl border-gray-700/50 p-6 md:p-8 rounded-2xl md:rounded-3xl hover:border-gray-600/50 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <h2 className="text-xl md:text-2xl font-black text-white mb-1 md:mb-2 flex items-center gap-2 md:gap-3">
                      <div className="w-2 md:w-3 h-8 md:h-10 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30"></div>
                      Subnet Weights Distribution
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8">Alpha bandwidth allocation across subnets</p>

                    <div className="h-[300px] md:h-[400px] relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 md:w-48 h-32 md:h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                      </div>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={subnetWeights}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={createCustomLabel(hoveredWeightIndex, true)}
                            outerRadius={window.innerWidth < 768 ? 100 : 140}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                            animationBegin={0}
                            animationDuration={1000}
                          >
                            {subnetWeights.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke={activeIndex === index ? "#fff" : "none"}
                                strokeWidth={activeIndex === index ? 3 : 0}
                                style={{
                                  filter: activeIndex === index ? 'brightness(1.3) drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' : 'brightness(1)',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                                onClick={() => handleSubnetClick(entry.id)}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip isWeight={true} />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-6 md:mt-8 space-y-1 md:space-y-2 max-h-[200px] md:max-h-none overflow-y-auto md:overflow-visible">
                      {subnetWeights.map((subnet, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-gray-800/50 backdrop-blur-xl transition-all duration-200 cursor-pointer group/item"
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseLeave={() => setActiveIndex(null)}
                          onClick={() => handleSubnetClick(subnet.id)}
                        >
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="relative">
                              <div className="w-3 md:w-4 h-3 md:h-4 rounded-full transition-all duration-300 group-hover/item:scale-150 group-hover/item:blur-sm" style={{ backgroundColor: subnet.color }}></div>
                              <div className="absolute inset-0 w-3 md:w-4 h-3 md:h-4 rounded-full transition-all duration-300 group-hover/item:scale-150" style={{ backgroundColor: subnet.color }}></div>
                            </div>
                            <span className="text-xs md:text-sm text-gray-300 group-hover/item:text-white transition-colors font-medium truncate max-w-[150px] md:max-w-none">{subnet.name}</span>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-xs md:text-sm font-bold text-white">{(subnet.value * 100).toFixed(1)}%</span>
                            <svg className="w-3 md:w-4 h-3 md:h-4 text-gray-600 group-hover/item:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base text-gray-400">Total Weight</span>
                        <span className="text-white font-black text-lg md:text-xl">1.00</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Liquidity Distribution Chart */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-sky-900/20 rounded-2xl md:rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                <Card className="relative bg-gray-900/40 backdrop-blur-2xl border-gray-700/50 p-6 md:p-8 rounded-2xl md:rounded-3xl hover:border-gray-600/50 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <h2 className="text-xl md:text-2xl font-black text-white mb-1 md:mb-2 flex items-center gap-2 md:gap-3">
                      <div className="w-2 md:w-3 h-8 md:h-10 bg-gradient-to-b from-cyan-500 to-sky-500 rounded-full shadow-lg shadow-cyan-500/30"></div>
                      Liquidity Distribution
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8">TAO liquidity provided across subnets</p>

                    <div className="h-[300px] md:h-[400px] relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 md:w-48 h-32 md:h-48 bg-gradient-to-br from-cyan-500/20 to-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
                      </div>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={liquidityData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={createCustomLabel(hoveredLiquidityIndex, false)}
                            outerRadius={window.innerWidth < 768 ? 100 : 140}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={onLiqPieEnter}
                            onMouseLeave={onLiqPieLeave}
                            animationBegin={0}
                            animationDuration={1000}
                          >
                            {liquidityData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke={activeLiqIndex === index ? "#fff" : "none"}
                                strokeWidth={activeLiqIndex === index ? 3 : 0}
                                style={{
                                  filter: activeLiqIndex === index ? 'brightness(1.3) drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))' : 'brightness(1)',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                                onClick={() => handleSubnetClick(entry.id)}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip isWeight={false} />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-6 md:mt-8 space-y-1 md:space-y-2 max-h-[200px] md:max-h-none overflow-y-auto md:overflow-visible">
                      {liquidityData.map((subnet, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-gray-800/50 backdrop-blur-xl transition-all duration-200 cursor-pointer group/item"
                          onMouseEnter={() => setActiveLiqIndex(index)}
                          onMouseLeave={() => setActiveLiqIndex(null)}
                          onClick={() => handleSubnetClick(subnet.id)}
                        >
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="relative">
                              <div className="w-3 md:w-4 h-3 md:h-4 rounded-full transition-all duration-300 group-hover/item:scale-150 group-hover/item:blur-sm" style={{ backgroundColor: subnet.color }}></div>
                              <div className="absolute inset-0 w-3 md:w-4 h-3 md:h-4 rounded-full transition-all duration-300 group-hover/item:scale-150" style={{ backgroundColor: subnet.color }}></div>
                            </div>
                            <span className="text-xs md:text-sm text-gray-300 group-hover/item:text-white transition-colors font-medium truncate max-w-[150px] md:max-w-none">{subnet.name}</span>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-xs md:text-sm font-bold text-white">{subnet.value.toFixed(1)}M TAO</span>
                            <svg className="w-3 md:w-4 h-3 md:h-4 text-gray-600 group-hover/item:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-700/50 space-y-2 md:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base text-gray-400">Total Liquidity</span>
                        <span className="text-white font-black text-lg md:text-2xl bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
                          {totalLiquidity.toFixed(1)}M TAO
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-gray-400">USD Value</span>
                        <span className="text-emerald-400 font-bold text-base md:text-lg">${(totalLiquidity * 350).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Interactive hint */}
            <div className="mt-8 md:mt-12 flex justify-center">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative inline-flex items-center gap-2 md:gap-3 text-gray-300 text-xs md:text-sm bg-gray-900/50 backdrop-blur-xl px-4 md:px-6 py-2 md:py-3 rounded-full border border-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300">
                  <div className="w-4 md:w-5 h-4 md:h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Click on any subnet to view detailed liquidity positions</span>
                  <svg className="w-3 md:w-4 h-3 md:h-4 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </>
        ) : (
          <SubnetDetails
            subnetId={selectedSubnet}
            onBack={handleBackToOverview}
            subnetData={subnetWeights.find(s => s.id === selectedSubnet) || subnetWeights[0]}
            liquidityData={liquidityData.find(s => s.id === selectedSubnet) || liquidityData[0]}
          />
        )}
      </div>

      {/* Vote Modal */}
      <VoteModal isOpen={showVoteModal} onClose={() => setShowVoteModal(false)} />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .bg-300\% {
          background-size: 300%;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
