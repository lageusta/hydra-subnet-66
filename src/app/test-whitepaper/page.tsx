"use client";

import { useState } from "react";
import Whitepaper from "@/components/Whitepaper";
import { Button } from "@/components/ui/button";

export default function TestWhitepaper() {
  const [showWhitepaper, setShowWhitepaper] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Whitepaper Test Page</h1>
      <Button
        onClick={() => setShowWhitepaper(true)}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Open Whitepaper
      </Button>

      <Whitepaper isOpen={showWhitepaper} onClose={() => setShowWhitepaper(false)} />
    </div>
  );
}
