// components/CarOverview.jsx
"use client";

export default function CarOverview({ car = {} }) {
  const { model = "Unknown", year = 0, mileage = "N/A", price = 0 } = car;
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-xl mx-auto">
      <h3 className="text-xl font-semibold mb-2">{model} <span className="text-sm text-gray-500">({year})</span></h3>
      <div className="flex gap-6">
        <div>
          <div className="text-sm text-gray-500">Mileage</div>
          <div className="font-medium">{mileage}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Price</div>
          <div className="font-medium">₹{price.toLocaleString("en-IN")}</div>
        </div>
      </div>
    </div>
  );
}
