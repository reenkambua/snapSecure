import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {BellRing,Monitor,Home,Activity,Camera,Power,LogOut} from "lucide-react";

const DashboardComponent = () => {
  const [isArmed, setIsArmed] = useState(true);
  const [userName, setUserName] = useState("");
  const [devices, setDevices] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [lastSnapshot, setLastSnapshot] = useState(null);

  const token = localStorage.getItem("access");
  const api = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:8000/api/",
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [token]);

  const statusColor = isArmed ? "bg-green-600" : "bg-red-600";
  const statusText = isArmed ? "ARMED & ACTIVE" : "DISARMED";
  const controlButtonClass = isArmed
    ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
    : "bg-green-600 hover:bg-green-700 active:bg-green-800";

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  };

  const goHome = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    api.get("profile/").then((res) => setUserName(res.data.username));
  }, [api]);

  useEffect(() => {
    api.get("devices/").then((res) => setDevices(res.data));
  }, [api]);

  useEffect(() => {
    api.get("dashboard/logs/").then((res) => {
      const attempts = res.data.attempts || [];

      setRecentActivity(
        attempts.map((a) => ({
          time: new Date(a.timestamp).toLocaleString(),
          text: `Intruder detected on ${a.device}`,
          snapshot: a.snapshot,
          icon: BellRing,
        }))
      );

      if (attempts.length > 0 && attempts[0].snapshot) {
        setLastSnapshot({
          url: attempts[0].snapshot,
          timestamp: new Date(attempts[0].timestamp).toLocaleString(),
        });
      }
    });
  }, [api]);

  return (
    <div className="py-10 bg-gray-900 text-white min-h-[90vh] px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-white">
            Welcome Back, {userName}
          </h1>

          <div className="flex gap-4">
            <button
              onClick={goHome}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              <Home className="w-5 h-5" />
              Home
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        <p className="text-gray-400 mb-8">Your security status overview.</p>

        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div
            className={`flex-1 p-6 rounded-xl shadow-2xl ${
              isArmed
                ? "bg-gray-800 border-l-8 border-green-600"
                : "bg-gray-800 border-l-8 border-red-600"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">System Status</h2>
              <span
                className={`px-4 py-1 text-sm font-bold rounded-full ${statusColor} text-white`}
              >
                {statusText}
              </span>
            </div>

            <p className="text-gray-300 mb-6">
              Last event:{" "}
              {recentActivity.length > 0
                ? recentActivity[0].text
                : "No events yet"}
            </p>

            <button
              onClick={() => setIsArmed(!isArmed)}
              className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg text-lg font-bold transition duration-300 transform hover:scale-[1.02] shadow-xl ${controlButtonClass} text-white`}
            >
              <Power className="w-6 h-6" />
              {isArmed ? "DISARM SYSTEM" : "ARM SYSTEM NOW"}
            </button>
          </div>

          <div className="w-full lg:w-1/3 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-red-500" /> Last Intruder Snapshot
            </h2>

            <div className="relative w-full h-40 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={
                  lastSnapshot
                    ? lastSnapshot.url
                    : "https://placehold.co/400x300/e00000/ffffff?text=No+Snapshot"
                }
                alt="Last Intruder"
                className="w-full h-full object-cover"
              />

              {lastSnapshot && (
                <span className="absolute bottom-2 left-2 text-xs bg-gray-900/70 px-2 py-1 rounded">
                  {lastSnapshot.timestamp}
                </span>
              )}
            </div>

            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold transition">
              View Full Log History
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-yellow-400" /> Recent Activity
            </h2>

            <ul className="space-y-4">
              {recentActivity.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-start border-b border-gray-700 pb-3 last:border-b-0"
                >
                  <activity.icon className="w-5 h-5 mt-1 mr-4 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {activity.text}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Monitor className="w-6 h-6 mr-2 text-blue-400" /> Device Summary
            </h2>

            <ul className="space-y-4">
              {devices.map((device, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm p-3 bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center">
                    <device.icon
                      className={`w-5 h-5 mr-3 ${
                        device.status === "Online"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    />
                    <span className="font-medium text-white">{device.name}</span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`block font-semibold ${
                        device.status === "Online"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {device.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      Bat: {device.battery || "N/A"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardComponent;
