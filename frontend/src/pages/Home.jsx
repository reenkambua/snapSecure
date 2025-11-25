// 
import { ShieldCheck, BellRing, Monitor, GalleryThumbnails, Lock } from 'lucide-react';
import '../index.css';

const App = () => {
 

  const navItemClass = "text-gray-300 hover:text-green-400 transition duration-300 cursor-pointer p-2 rounded-md";

  const HomePage = () => (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans antialiased">
   
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm shadow-xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Lock className="text-green-400 w-6 h-6 mr-2" />
            <span className="text-2xl font-extrabold text-green-400">SnapSecure</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <span className={navItemClass}>Features</span>
            <span className={navItemClass}>How It Works</span>
            <span className={navItemClass}>Pricing</span>
            
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => console.log('Login clicked')}
              className="px-4 py-1.5 text-sm font-semibold rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 transition duration-300 shadow-lg"
            >
              Login
            </button>
            <button
              onClick={() => console.log('Sign Up clicked')}
              className="px-4 py-1.5 text-sm font-bold rounded-full bg-green-500 text-gray-900 hover:bg-green-400 transition duration-300 shadow-xl"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

  
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-24 md:py-32">
        <div className="max-w-4xl text-center">
          <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-6 drop-shadow-2xl" />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-green-300">
            Intelligent Protection. Instant Awareness.
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            SnapSecure monitors your perimeter 24/7, using smart detection to capture intruders and alert you in real-time. Security simplified.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => console.log('Get Started clicked')}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 px-8 py-3 rounded-xl text-xl font-bold uppercase tracking-wider shadow-2xl shadow-red-500/50 transition duration-300 transform hover:scale-105 ring ring-offset-2 ring-red-500 ring-offset-gray-900"
            >
              Start Monitoring
            </button>
            <button
              onClick={() => console.log('Watch Demo clicked')}
              className="bg-gray-700 text-gray-200 hover:bg-gray-600 active:bg-gray-700 px-8 py-3 rounded-xl text-xl font-semibold shadow-lg transition duration-300 transform hover:translate-y-[-2px] border border-gray-600"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </main>

      
      <section className="py-20 bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              Icon={BellRing}
              title="Instant Real-Time Alerts"
              description="Receive push notifications the moment an unauthorized entry is detected, no matter where you are."
              color="text-black-600"
            />
            <FeatureCard
              Icon={Monitor}
              title="Secure Device Monitoring"
              description="Manage and check the status of all your connected sensors and cameras through a single dashboard."
              color="text-black-600"
            />
            <FeatureCard
              Icon={GalleryThumbnails}
              title="Historical Intruder Logs"
              description="Access a secure archive of captured images and video snippets with precise timestamps for evidence."
              color="text-black-600"
            />
          </div>
        </div>
      </section>

  
      <footer className="bg-gray-900 border-t border-gray-800 py-6 text-center mt-auto">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SnapSecure. All rights reserved. | <span className="text-green-500">Intelligent Security Solutions</span>
        </p>
      </footer>
    </div>
  );

  function FeatureCard({ Icon, title, description, color }) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8 flex flex-col items-start shadow-lg hover:shadow-2xl hover:shadow-green-500/40 transform hover:-translate-y-2 hover:scale-105 transition duration-500 cursor-pointer">
        <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-gradient-to-br from-green-500 via-green-400 to-green-300 text-white shadow-lg">
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold mb-3 text-white">{title}</h3>
        <p className="text-gray-300 text-left text-sm md:text-base">{description}</p>
      </div>
    );
  }

  return <HomePage />;
};

export default App;
