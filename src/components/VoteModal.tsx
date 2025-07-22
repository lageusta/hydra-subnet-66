"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SubnetWeight {
  id: number;
  name: string;
  weight: number;
}

export default function VoteModal({ isOpen, onClose }: VoteModalProps) {
  const [coldkey, setColdkey] = useState("");
  const [signature, setSignature] = useState("");
  const [weights, setWeights] = useState<SubnetWeight[]>([
    { id: 1, name: "Subnet 1 - Text Generation", weight: 1.0 },
  ]);
  const [newSubnetId, setNewSubnetId] = useState("");
  const [newSubnetName, setNewSubnetName] = useState("");

  if (!isOpen) return null;

  const totalWeight = weights.reduce((sum, subnet) => sum + subnet.weight, 0);

  const handleWeightChange = (id: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setWeights(weights.map(w => w.id === id ? { ...w, weight: numValue } : w));
  };

  const handleAddSubnet = () => {
    if (newSubnetId && newSubnetName) {
      const id = parseInt(newSubnetId);
      if (!weights.find(w => w.id === id)) {
        setWeights([...weights, { id, name: newSubnetName, weight: 0 }]);
        setNewSubnetId("");
        setNewSubnetName("");
      }
    }
  };

  const handleRemoveSubnet = (id: number) => {
    setWeights(weights.filter(w => w.id !== id));
  };

  const handleSubmit = () => {
    // Here you would submit the vote
    console.log("Coldkey:", coldkey);
    console.log("Signature:", signature);
    console.log("Weights:", weights);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Submit Vote</h2>
              <p className="text-gray-400 mt-1">Set your weight allocation for subnet liquidity</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Coldkey Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Coldkey Address (SS58)
              </label>
              <input
                type="text"
                value={coldkey}
                onChange={(e) => setColdkey(e.target.value)}
                placeholder="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
              />
            </div>

            {/* Signature Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Signature
              </label>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Enter your signature"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Weight Vector Table */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Weight Vector</h3>
              <Badge className={`${totalWeight === 1 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                Total: {(totalWeight * 100).toFixed(1)}%
              </Badge>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Subnet ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Weight</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((subnet) => (
                    <tr key={subnet.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-white font-mono">{subnet.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{subnet.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={subnet.weight}
                            onChange={(e) => handleWeightChange(subnet.id, e.target.value)}
                            step="0.01"
                            min="0"
                            max="1"
                            className="w-24 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
                          />
                          <span className="text-gray-400 text-sm">({(subnet.weight * 100).toFixed(1)}%)</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {weights.length > 1 && (
                          <Button
                            onClick={() => handleRemoveSubnet(subnet.id)}
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-1"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Add new subnet row */}
                  <tr className="border-b border-gray-700/50">
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={newSubnetId}
                        onChange={(e) => setNewSubnetId(e.target.value)}
                        placeholder="ID"
                        className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={newSubnetName}
                        onChange={(e) => setNewSubnetName(e.target.value)}
                        placeholder="Enter subnet name"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        onClick={handleAddSubnet}
                        variant="ghost"
                        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20 p-1"
                        disabled={!newSubnetId || !newSubnetName}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {totalWeight !== 1 && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                <p className="text-red-400 text-sm">
                  <span className="font-semibold">Warning:</span> Total weight must equal 1.0 (100%). Current total: {(totalWeight * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Make sure your weights sum to 1.0 before submitting
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!coldkey || !signature || totalWeight !== 1}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Vote
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
