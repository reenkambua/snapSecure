import React from "react";
import { ShieldCheck, Lock, DollarSign } from "lucide-react";

const PricingCard = ({ title, price, features, popular, color }) => (
  <div className={`
    p-8 rounded-xl border 
    ${popular ? "border-red-500 shadow-lg scale-105" : "border-gray-700"} 
    transform transition duration-300 hover:scale-105
    ${color} 
    flex flex-col justify-between
  `}>
    {popular && (
      <div className="text-red-500 font-bold uppercase text-xs mb-2 text-center">Most Popular</div>
    )}

    <DollarSign className={`w-10 h-10 mb-3 ${popular ? "text-red-500" : "text-green-400"} mx-auto`} />

    <h3 className="text-3xl font-bold text-white text-center">{title}</h3>
    <p className="text-5xl font-bold text-white mt-4 text-center">{price}<span className="text-xl text-gray-300">/mo</span></p>

    <ul className="mt-6 space-y-3 text-left">
      {features.map((f, index) => (
        <li key={index} className="flex items-center text-gray-300">
          {f.included ? <ShieldCheck className="text-green-500 mr-2" /> : <Lock className="text-gray-600 mr-2" />}
          {f.name}
        </li>
      ))}
    </ul>

    <button
      className={`mt-8 w-full py-3 rounded-xl font-bold transition duration-300 
        ${popular ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}`}
    >
      Choose Plan
    </button>
  </div>
);

const Pricing = () => (
  <div className="bg-gray-900 min-h-screen py-20 px-6 text-white">
    <h1 className="text-5xl text-center font-bold text-green-400 mb-16">Pricing Plans</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    
      <PricingCard
        title="Free"
        price="0"
        color="bg-gray-800"
        features={[
          { name: "1 Laptop", included: true },
          { name: "7 Day Logs", included: true },
          { name: "Basic Detection", included: true },
          { name: "AI Detection", included: false },
        ]}
      />

      <PricingCard
        title="Pro"
        price="199 KES"
        popular={true}
        color="bg-gray-800"
        features={[
          { name: "1 Laptop", included: true },
          { name: "30 Day Logs", included: true },
          { name: "Advanced AI Detection", included: true },
          { name: "Email Alerts", included: true },
        ]}
      />

      <PricingCard
        title="Business"
        price="499 KES"
        color="bg-gray-800"
        features={[
          { name: "1 Laptop per subscription", included: true },
          { name: "90 Day Logs", included: true },
          { name: "Team Access", included: true },
          { name: "Priority Support", included: true },
        ]}
      />
    </div>
  </div>
);

export default Pricing;
