import React from "react";
import { ShieldCheck, Lock, DollarSign } from "lucide-react";

const PricingCard = ({ title, price, features, popular }) => (
  <div className={`p-8 rounded-xl bg-gray-900 border ${popular ? "border-red-500" : "border-gray-700"}`}>
    {popular && (
      <div className="text-red-500 font-bold uppercase text-xs mb-2">Most Popular</div>
    )}

    <DollarSign className={`w-10 h-10 mb-3 ${popular ? "text-red-500" : "text-green-400"}`} />

    <h3 className="text-3xl font-bold text-white">{title}</h3>
    <p className="text-6xl font-bold text-white mt-4">${price}<span className="text-xl text-gray-500">/mo</span></p>

    <ul className="mt-6 space-y-3 text-left">
      {features.map((f, index) => (
        <li key={index} className="flex items-center text-gray-300">
          {f.included ? <ShieldCheck className="text-green-500 mr-2" /> : <Lock className="text-gray-600 mr-2" />}
          {f.name}
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => (
  <div className="bg-gray-800 min-h-screen py-20 px-6 text-white">
    <h1 className="text-5xl text-center font-bold text-red-400 mb-16">Pricing Plans</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      <PricingCard
        title="Starter"
        price="9"
        features={[
          { name: "1 Device", included: true },
          { name: "7 Day Logs", included: true },
          { name: "AI Detection", included: false },
        ]}
      />

      <PricingCard
        title="Pro"
        price="19"
        popular={true}
        features={[
          { name: "5 Devices", included: true },
          { name: "30 Day Logs", included: true },
          { name: "AI Analytics", included: true },
        ]}
      />

      <PricingCard
        title="Ultimate"
        price="49"
        features={[
          { name: "Unlimited Devices", included: true },
          { name: "1 Year Logs", included: true },
          { name: "24/7 Support", included: true },
        ]}
      />
    </div>
  </div>
);

export default Pricing;
