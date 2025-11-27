import React from "react";
import { ShieldCheck, BellRing, Monitor, GalleryThumbnails } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Card = ({ Icon, title, description }) => (
  <div className="p-6 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-700 transition">
    <Icon className="w-8 h-8 text-green-400 mb-3" />
    <h3 className="text-white text-xl font-bold">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Home = ({ setCurrentPage }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="py-24 px-6 pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Instant Smart Protection
          </h1>
          <p className="text-gray-300 mt-3 text-lg md:text-xl">
            SnapSecure guards your property 24/7 with intelligent intrusion detection.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-red-600 px-6 py-3 rounded-xl text-white font-bold hover:bg-red-700 transition w-full sm:w-auto"
              onClick={() => navigate("/login")}
            >
              Start Monitoring
            </button>

            <button
              className="border border-gray-600 px-6 py-3 rounded-xl text-gray-300 hover:bg-gray-700 transition w-full sm:w-auto"
              onClick={() => setCurrentPage("features")}
            >
              View Features
            </button>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid mt-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-2">
          <Card Icon={BellRing} title="Alerts" description="Instant notifications when motion is detected." />
          <Card Icon={Monitor} title="Remote Control" description="Manage your system from anywhere." />
          <Card Icon={GalleryThumbnails} title="Secure Logs" description="Encrypted storage for all events." />
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
