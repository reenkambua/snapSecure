import React from "react";
import { Cpu, Zap, Settings, Cloud, ShieldCheck, GalleryThumbnails, Users, Lock } from "lucide-react";
import FeatureDetail from "../components/FeatureDetail";

const Features = ({ setCurrentPage }) => (
  <div className="py-20 px-6 bg-gray-800 min-h-screen text-white">
    <h1 className="text-5xl font-bold text-center text-green-400">Powerful Features</h1>

    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mt-14">

      <div className="space-y-6">
        <h2 className="text-3xl border-b border-gray-700 pb-2 flex items-center">
          <Cpu className="text-red-500 mr-3" /> Smart Detection
        </h2>
        <FeatureDetail Icon={Zap} title="AI Detection" description="Accurate intruder identification." />
        <FeatureDetail Icon={Settings} title="Zones" description="Set custom monitoring areas." />
        <FeatureDetail Icon={Cloud} title="Geo-fencing" description="Auto arm/disarm based on location." />
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl border-b border-gray-700 pb-2 flex items-center">
          <Lock className="text-green-500 mr-3" /> Data Security
        </h2>
        <FeatureDetail Icon={ShieldCheck} title="AES-256 Encryption" description="Secure your data fully." />
        <FeatureDetail Icon={GalleryThumbnails} title="HD Snapshots" description="Clear evidence capture." />
        <FeatureDetail Icon={Users} title="Multi-user Access" description="Share access securely." />
      </div>
    </div>

    <div className="text-center mt-20">
      <button
        className="bg-green-600 px-10 py-4 rounded-xl"
        onClick={() => setCurrentPage("pricing")}
      >
        See Pricing Plans
      </button>
    </div>
  </div>
);

export default Features;
