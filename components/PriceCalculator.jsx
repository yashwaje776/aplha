// components/PriceCalculator.jsx
"use client";
import { useMemo, useState } from "react";

function formatINR(n) {
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

export default function PriceCalculator() {
  const [invites, setInvites] = useState(50);
  const [duration, setDuration] = useState(6);

  const PRICE_PER_INVITE = 120;
  const PRICE_PER_MONTH = 1500;

  const total = useMemo(() => invites * PRICE_PER_INVITE + duration * PRICE_PER_MONTH, [invites, duration]);
  const perMonth = Math.round(total / (duration || 1));

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Price Calculator</h3>

      <div className="mb-6">
        <label className="block text-sm mb-2">Number of Invites</label>
        <input type="range" min="0" max="1000" value={invites} onChange={(e)=>setInvites(Number(e.target.value))} className="w-full"/>
        <div className="flex justify-between mt-2 text-sm text-gray-500"><span>0</span><span>{invites} invites</span><span>1000</span></div>
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-2">Duration (months)</label>
        <input type="range" min="1" max="36" value={duration} onChange={(e)=>setDuration(Number(e.target.value))} className="w-full"/>
        <div className="flex justify-between mt-2 text-sm text-gray-500"><span>1</span><span>{duration} months</span><span>36</span></div>
      </div>

      <div className="py-4 px-4 rounded-lg border border-gray-100 bg-gray-50 text-center">
        <div className="text-3xl font-extrabold text-green-600">{formatINR(total)}</div>
        <div className="text-sm text-gray-500 mt-1">Total Price</div>
        <div className="text-sm mt-2 text-gray-700">~ {formatINR(perMonth)} per month</div>
      </div>
    </div>
  );
}
