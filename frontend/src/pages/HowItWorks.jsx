import React from "react";
import { Monitor, BellRing, ShieldCheck } from "lucide-react";

const Step = ({ Icon, title, text }) => (
  <div className="text-center p-6 bg-gray-900 border border-gray-700 rounded-xl">
    <Icon className="w-12 h-12 text-green-400 mx-auto mb-4" />
    <h3 className="text-2xl text-white font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{text}</p>
  </div>
);

const HowItWorks = () => (
  <div className="py-20 px-6 bg-gray-800 min-h-screen text-white">
    <h1 className="text-5xl font-bold text-center text-green-400">How SnapSecure Works</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-16">
      <Step Icon={Monitor} title="1. Install Camera" text="Mount the camera and connect it to your network." />
      <Step Icon={BellRing} title="2. Detect Motion" text="AI continuously monitors for unusual activity." />
      <Step Icon={ShieldCheck} title="3. Instant Alerts" text="You receive real-time photo alerts on your phone." />
    </div>
  </div>
);

export default HowItWorks;
