
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 text-white">
  <div className="flex-1 flex flex-col justify-center items-center px-4 py-16">
        <h1 className="text-5xl font-bold mb-4 text-center">Welcome to SnapSecure</h1>
        <p className="text-lg mb-8 max-w-2xl text-center">
          Your smart intruder detection system. Protect your devices, monitor your space, and stay informed in real-time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition duration-300 text-center">
            Get Started
          </Link>
          <Link to="/login" className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition duration-300 text-center">
            Login
          </Link>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold mb-2">Real-time Alerts</h2>
            <p className="text-center">Receive instant notifications when an intruder is detected.</p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold mb-2">Secure Device Monitoring</h2>
            <p className="text-center">Keep track of all your registered devices in one place.</p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold mb-2">Intruder Logs</h2>
            <p className="text-center">View captured intruder photos with timestamps anytime.</p>
          </div>
        </div>
      </div>

   
      <footer className="bg-blue-800 text-white py-4 text-center mt-auto">
        © 2025 SnapSecure. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
