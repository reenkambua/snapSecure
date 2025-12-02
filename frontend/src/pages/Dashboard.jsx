import React, { useState} from 'react';
import {BellRing, Monitor, 
  Zap, Settings,  Home, Activity, Camera, Power
} from 'lucide-react';

const DashboardComponent = () => {
  const [isArmed, setIsArmed] = useState(true);
  const userName = "Alex Rodriguez";
  const statusColor = isArmed ? 'bg-green-600' : 'bg-red-600';
  const statusText = isArmed ? 'ARMED & ACTIVE' : 'DISARMED';
  const controlButtonClass = isArmed
    ? 'bg-red-600 hover:bg-red-700 active:bg-red-800'
    : 'bg-green-600 hover:bg-green-700 active:bg-green-800';

  const recentActivity = [
    { time: "2 min ago", icon: BellRing, text: "Intruder detected at Front Door sensor.", color: "text-red-500" },
    { time: "1 hour ago", icon: Home, text: "System armed by Geo-fence.", color: "text-green-500" },
    { time: "4 hours ago", icon: Settings, text: "Custom Zone 3 sensitivity updated.", color: "text-blue-400" },
    { time: "Yesterday", icon: Camera, text: "Motion detected at Garage Cam (False Alarm).", color: "text-yellow-500" },
  ];

  const devices = [
    { name: "Front Door Sensor", status: "Online", battery: "95%", icon: Home },
    { name: "Living Room Cam", status: "Online", battery: "88%", icon: Camera },
    { name: "Garage Motion", status: "Offline", battery: "20%", icon: Zap },
    { name: "Backyard Cam", status: "Online", battery: "55%", icon: Camera },
  ];

  return (
    <div className="py-10 bg-gray-900 text-white min-h-[90vh] px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 text-white">Welcome Back, {userName}</h1>
        <p className="text-gray-400 mb-8">Your security status overview.</p>

       
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className={`flex-1 p-6 rounded-xl shadow-2xl ${isArmed ? 'bg-gray-800 border-l-8 border-green-600' : 'bg-gray-800 border-l-8 border-red-600'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">System Status</h2>
              <span className={`px-4 py-1 text-sm font-bold rounded-full ${statusColor} text-white`}>
                {statusText}
              </span>
            </div>
            <p className="text-gray-300 mb-6">Last event: Intruder detected at Front Door (2 minutes ago).</p>
            
            <button
              onClick={() => setIsArmed(!isArmed)}
              className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg text-lg font-bold transition duration-300 transform hover:scale-[1.02] shadow-xl ${controlButtonClass} text-white`}
            >
              <Power className="w-6 h-6" />
              {isArmed ? 'DISARM SYSTEM' : 'ARM SYSTEM NOW'}
            </button>
          </div>

          <div className="w-full lg:w-1/3 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-red-500" /> Last Intruder Snapshot
            </h2>
            <div className="relative w-full h-40 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src="https://placehold.co/400x300/e00000/ffffff?text=INTRUDER%20DETECTED"
                alt="Last Intruder Detected"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 text-xs font-semibold bg-gray-900/70 backdrop-blur px-2 py-1 rounded">
                2025-11-28 09:46 AM
              </span>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold transition duration-300">
                View Full Log History
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-yellow-400" /> Recent Activity Feed
            </h2>
            <ul className="space-y-4">
              {recentActivity.map((activity, index) => (
                <li key={index} className="flex items-start border-b border-gray-700 pb-3 last:border-b-0">
                  <activity.icon className={`w-5 h-5 flex-shrink-0 mt-1 mr-4 ${activity.color}`} />
                  <div>
                    <p className="text-sm font-semibold text-white">{activity.text}</p>
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
                <li key={index} className="flex justify-between items-center text-sm p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <device.icon className={`w-5 h-5 mr-3 ${device.status === 'Online' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="font-medium text-white">{device.name}</span>
                  </div>
                  <div className="text-right">
                    <span className={`block font-semibold ${device.status === 'Online' ? 'text-green-400' : 'text-red-400'}`}>
                      {device.status}
                    </span>
                    <span className="text-xs text-gray-400">Bat: {device.battery}</span>
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
