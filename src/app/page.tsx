"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Whitepaper from "@/components/Whitepaper";
import Dashboard from "@/components/Dashboard";
import { ArrowRight, FileText, Menu, X } from "lucide-react";

export default function Home() {
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-poppins">
      {/* Enhanced animated background with multiple layers - Blue theme */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-cyan-950/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-48 md:w-96 h-48 md:h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-48 md:w-96 h-48 md:h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-48 md:w-96 h-48 md:h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-0 right-20 w-48 md:w-96 h-48 md:h-96 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-6000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        </div>

        {/* Animated grid overlay - Blue theme */}
        <div
          className="absolute inset-0 opacity-10 md:opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'grid 20s linear infinite'
          }}
        />

        {/* Starfield effect with blue tint */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-200 rounded-full animate-pulse"
              style={{
                width: ((i % 3) + 1) + 'px',
                height: ((i % 3) + 1) + 'px',
                top: ((i * 17) % 100) + '%',
                left: ((i * 23) % 100) + '%',
                animationDelay: ((i % 5) * 1) + 's',
                animationDuration: ((i % 3) + 2) + 's'
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          {/* Enhanced Header */}
          <nav className="flex justify-between items-center mb-8 md:mb-12 animate-fade-in-down">
            <div className="flex items-center space-x-2 group">
              <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent bg-300% animate-gradient">
                Hydra
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Button
                variant="ghost"
                className="relative text-blue-300 hover:text-white px-6 py-3 text-lg font-medium transition-all duration-300 overflow-hidden group"
                onClick={() => setShowDashboard(true)}
              >
                <span className="relative z-10">Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
              <Button
                variant="ghost"
                className="relative text-blue-300 hover:text-white px-6 py-3 text-lg font-medium transition-all duration-300 overflow-hidden group"
                onClick={() => setShowWhitepaper(true)}
              >
                <span className="relative z-10">Whitepaper</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-sky-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-blue-500/20 p-4 animate-fade-in-down">
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  className="w-full text-blue-300 hover:text-white px-6 py-3 text-lg font-medium"
                  onClick={() => {
                    setShowDashboard(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-blue-300 hover:text-white px-6 py-3 text-lg font-medium"
                  onClick={() => {
                    setShowWhitepaper(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Whitepaper
                </Button>
              </div>
            </div>
          )}

          {/* Completely Redesigned Hero Content */}
          <div className="relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-20 md:-top-40 -left-20 md:-left-40 w-40 md:w-80 h-40 md:h-80 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-float" />
            <div className="absolute -bottom-20 md:-bottom-40 -right-20 md:-right-40 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl animate-float-slow" />

            <div className="text-center max-w-7xl mx-auto relative">
              {/* Animated tag line */}
              <div className="mb-6 md:mb-8 animate-fade-in-up opacity-0 animation-delay-200">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 md:px-6 py-2 md:py-3 hover:border-blue-500/40 transition-all duration-500">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
                  <span className="text-blue-300 text-xs md:text-sm font-medium">Subnet 66</span>
                </div>
              </div>

              {/* Main heading with animation */}
              <div className="mb-8 md:mb-12 animate-fade-in-up opacity-0 animation-delay-400">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black mb-4 md:mb-6 leading-none tracking-tight relative">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 blur-2xl md:blur-3xl opacity-40 animate-pulse"></span>
                    <span className="relative bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent bg-300% animate-gradient">
                      Hydra
                    </span>
                  </span>
                </h1>

                {/* Animated divider */}
                <div className="flex items-center justify-center mb-6 md:mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-20 md:w-40 animate-expand"></div>
                  <div className="mx-4 md:mx-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse-glow"></div>
                  </div>
                  <div className="h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent w-20 md:w-40 animate-expand"></div>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-gray-200 mb-4 md:mb-6 leading-relaxed px-4 md:px-0">
                  Incentivizing <span className="font-semibold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Liquidity Provision</span><br className="hidden md:block" />
                  <span className="md:hidden"> </span>in Bittensor Pools
                </h2>
              </div>

              {/* Enhanced description */}
              <div className="max-w-4xl mx-auto mb-8 md:mb-12 animate-fade-in-up opacity-0 animation-delay-600 px-4 md:px-0">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed">
                  Subnet 66 incentivizes miners to provide liquidity to targeted Bittensor subnets.
                  Miners compete for weights based on the liquidity they provide to alpha-selected targets.
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center mb-12 md:mb-16 animate-fade-in-up opacity-0 animation-delay-800 px-4 md:px-0">
                <Button
                  className="relative group bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 hover:from-blue-700 hover:via-cyan-700 hover:to-sky-700 text-white border-0 px-8 md:px-12 py-5 md:py-7 text-lg md:text-xl font-semibold overflow-hidden shadow-2xl shadow-blue-500/30 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 w-full sm:w-auto"
                  onClick={() => setShowDashboard(true)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></span>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Enter Hydra
                    <ArrowRight className="w-5 md:w-6 h-5 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="relative group border-2 border-blue-500/50 text-blue-300 hover:text-white hover:border-blue-400 px-8 md:px-12 py-5 md:py-7 text-lg md:text-xl backdrop-blur-sm transition-all duration-300 rounded-2xl overflow-hidden transform hover:scale-105 w-full sm:w-auto"
                  onClick={() => setShowWhitepaper(true)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-sky-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <FileText className="w-5 md:w-6 h-5 md:h-6" />
                    Whitepaper
                  </span>
                </Button>
              </div>

              {/* Completely redesigned metrics with hover effects */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto animate-fade-in-up opacity-0 animation-delay-1000 px-4 md:px-0">
                <div className="group cursor-pointer">
                  <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md border border-blue-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-blue-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 md:mb-3">
                        66
                      </div>
                      <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider font-semibold">Subnet ID</div>
                    </div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="relative bg-gradient-to-br from-cyan-500/10 to-sky-500/10 backdrop-blur-md border border-cyan-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-cyan-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-transparent rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent mb-2 md:mb-3">
                        $42M
                      </div>
                      <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider font-semibold">Total Liquidity</div>
                    </div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="relative bg-gradient-to-br from-sky-500/10 to-teal-500/10 backdrop-blur-md border border-sky-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-sky-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 to-transparent rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent mb-2 md:mb-3">
                        12
                      </div>
                      <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider font-semibold">Active Pools</div>
                    </div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="relative bg-gradient-to-br from-teal-500/10 to-blue-500/10 backdrop-blur-md border border-teal-500/20 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-teal-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-transparent rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent mb-2 md:mb-3">
                        256
                      </div>
                      <div className="text-gray-400 text-xs md:text-sm uppercase tracking-wider font-semibold">Miners</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section with better animations */}
      <div className="relative py-16 md:py-32 bg-gradient-to-b from-transparent via-blue-950/10 to-black mt-12 md:mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              How Subnet 66 Works
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
              Alpha bandwidth rights determine where liquidity flows across Bittensor subnets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">
            <Card className="group relative bg-black/40 border-blue-500/20 backdrop-blur-2xl p-8 md:p-10 hover:border-blue-400/60 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-3 overflow-hidden rounded-2xl md:rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-blue-500 via-cyan-600 to-sky-600 rounded-2xl md:rounded-3xl mb-6 md:mb-8 flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:shadow-blue-500/60 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-white rounded-xl" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white group-hover:text-blue-200 transition-colors duration-500">Incentivized Liquidity</h3>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg group-hover:text-gray-300 transition-colors duration-500">
                  Miners earn weights by providing liquidity to alpha-selected Bittensor subnets. Competition drives efficient capital allocation where it's needed most
                </p>
              </div>
            </Card>

            <Card className="group relative bg-black/40 border-cyan-500/20 backdrop-blur-2xl p-8 md:p-10 hover:border-cyan-400/60 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-3 overflow-hidden rounded-2xl md:rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-cyan-500 via-sky-600 to-teal-600 rounded-2xl md:rounded-3xl mb-6 md:mb-8 flex items-center justify-center shadow-2xl shadow-cyan-500/40 group-hover:shadow-cyan-500/60 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-white rounded-full" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white group-hover:text-cyan-200 transition-colors duration-500">Deep Liquidity</h3>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg group-hover:text-gray-300 transition-colors duration-500">
                  Concentrated liquidity provision across multiple Bittensor subnets ensures minimal slippage and maximum capital efficiency for TAO transactions
                </p>
              </div>
            </Card>

            <Card className="group relative bg-black/40 border-sky-500/20 backdrop-blur-2xl p-8 md:p-10 hover:border-sky-400/60 transition-all duration-700 hover:shadow-2xl hover:shadow-sky-500/30 hover:-translate-y-3 overflow-hidden rounded-2xl md:rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-teal-500 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-sky-500 via-teal-600 to-emerald-600 rounded-2xl md:rounded-3xl mb-6 md:mb-8 flex items-center justify-center shadow-2xl shadow-sky-500/40 group-hover:shadow-sky-500/60 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-white rounded-xl transform rotate-45" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white group-hover:text-sky-200 transition-colors duration-500">Efficient Ranges</h3>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg group-hover:text-gray-300 transition-colors duration-500">
                  Alpha bandwidth holders direct liquidity to optimal price ranges across subnets, maximizing returns and ensuring efficient market making
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Technical Specs Section */}
      <div className="relative py-16 md:py-32 bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-white via-cyan-100 to-sky-200 bg-clip-text text-transparent">
              Network Architecture
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto">
            <div className="space-y-8 md:space-y-10">
              <div className="flex items-start space-x-4 md:space-x-6 group transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-14 md:w-16 h-14 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                  <span className="text-white font-bold text-lg md:text-xl">66</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3 group-hover:text-blue-200 transition-colors">Alpha Bandwidth Rights</h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed group-hover:text-gray-300 transition-colors">Subnet 66 validators hold alpha bandwidth rights to determine which Bittensor subnets receive liquidity allocation from competing miners.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 md:space-x-6 group transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-14 md:w-16 h-14 md:h-16 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                  <span className="text-white font-bold text-base md:text-lg">AI</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3 group-hover:text-cyan-200 transition-colors">Miner Competition</h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed group-hover:text-gray-300 transition-colors">Miners compete to provide liquidity to alpha-selected subnets. Weights are distributed based on liquidity depth and efficiency achieved.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 md:space-x-6 group transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-14 md:w-16 h-14 md:h-16 bg-gradient-to-br from-sky-500 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-all duration-300">
                  <span className="text-white font-bold text-xl md:text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3 group-hover:text-sky-200 transition-colors">Weight Distribution</h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed group-hover:text-gray-300 transition-colors">Real-time weight updates reward miners proportionally to their liquidity provision performance on targeted subnets.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-2xl md:rounded-3xl blur-2xl" />
              <Card className="relative bg-black/60 border-blue-500/30 backdrop-blur-2xl p-8 md:p-10 shadow-2xl shadow-blue-500/20 rounded-2xl md:rounded-3xl hover:border-blue-500/50 transition-all duration-500">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Liquidity Statistics</h3>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-400 text-base md:text-lg">Active Subnet Pools</span>
                    <span className="text-blue-300 font-bold text-lg md:text-xl">12 Subnets</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-400 text-base md:text-lg">Total Liquidity Provided</span>
                    <span className="text-emerald-400 font-bold text-lg md:text-xl">$42M TAO</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-400 text-base md:text-lg">Active Miners</span>
                    <span className="text-cyan-400 font-bold text-lg md:text-xl">256</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 border-b border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <span className="text-gray-400 text-base md:text-lg">Average APY</span>
                    <span className="text-sky-400 font-bold text-lg md:text-xl">18.5%</span>
                  </div>
                  <div className="flex justify-between items-center py-3 md:py-4 hover:bg-blue-500/5 transition-colors rounded-lg p-2">
                    <span className="text-gray-400 text-base md:text-lg">Alpha Bandwidth Holders</span>
                    <span className="text-teal-400 font-bold text-lg md:text-xl">64</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative border-t border-blue-500/20 py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 space-y-6 md:space-y-0">
            <div className="flex items-center space-x-4 group">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">Hydra</span>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 md:py-2">
                Subnet 66
              </Badge>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <div className="font-semibold text-blue-300 mb-2 md:mb-3 text-lg md:text-xl">Incentivized Liquidity Provisioning</div>
              <div className="text-sm md:text-base">Intelligent liquidity routing • Dynamic miner incentives • Maximum TAO efficiency</div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm md:text-base">
            © 2025 Hydra. Intelligent liquidity infrastructure for Bittensor's decentralized AI economy.
          </div>
        </div>
      </footer>

      {/* Whitepaper Modal */}
      <Whitepaper isOpen={showWhitepaper} onClose={() => setShowWhitepaper(false)} />

      {/* Dashboard Modal */}
      <Dashboard isOpen={showDashboard} onClose={() => setShowDashboard(false)} />
    </div>
  );
}
