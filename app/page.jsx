"use client";

import Carousel from "../components/Carousel";
import PriceCalculator from "../components/PriceCalculator";
import CarOverview from "../components/CarOverview";
import View360Modal from "../components/View360Modal";

export default function Home() {
  const carouselImages = [
    "/360/img_0.jpg",
    "/360/img_15.jpg",
    "/360/img_30.jpg",
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Alpha — Car Showcase
          </h1>

          <div className="text-gray-600 text-sm mt-2 md:mt-0">
            Model: <strong>2018 Renault Kwid 1.0 RXT AMT Opt</strong>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow p-4">
          <Carousel images={carouselImages} />
        </div>

        <div className="flex items-center gap-4">
          <View360Modal />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <PriceCalculator />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <CarOverview
              car={{
                model: "2018 Renault Kwid 1.0 RXT AMT Opt",
                year: 2018,
                mileage: "35,000 km",
                price: 280000,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
