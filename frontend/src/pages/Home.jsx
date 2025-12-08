import React, { useState } from 'react';
import { ShieldAlert, Zap, Users, CheckCircle} from 'lucide-react';
import SnapSecureLogo from '../assets/logo snap.png';
import background from '../assets/bg.jpeg';


const HomePage = () => {

    const LICENSE_FEE = {
        daily: '0.39', 
        monthly: '9.27', 
        monthlyDiscount: 'Save 20%',
    };
    
    const [isMonthly, setIsMonthly] = useState(false);
    const displayPrice = isMonthly ? LICENSE_FEE.monthly : LICENSE_FEE.daily;
    const billingCycle = isMonthly ? '/mo' : '/day';

    const btnPrimary = "px-6 py-3 font-semibold rounded-lg transition duration-300 shadow-lg bg-green-600 hover:bg-green-700 text-white";
    const btnSecondary = "px-6 py-3 font-semibold rounded-lg transition duration-300 border border-[#334155] text-gray-200 hover:bg-[#1E293B]";

    const LicenseFeatures = [
        { name: 'Intruder Selfie Capture & Alert', included: true },
        { name: 'Facial Recognition Login (Seamless Access)', included: true },
        { name: 'User Access Role Management (RBAC)', included: true },
        { name: 'Unlimited Audit History & Log Retention', included: true },
        { name: 'Priority Email Support', included: true },
    ];

    return (
        <div className="min-h-screen bg-[#0F172A] text-white font-sans">
        
            <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-sm shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <img 
                            src={SnapSecureLogo} 
                            alt="SnapSecure Logo" 
                            className="h-10 w-auto mr-2" 
                        />
                        <div className="text-2xl font-bold text-green-400">SnapSecure</div>
                    </div>
                    <nav className="hidden md:flex space-x-8 text-gray-300">
                        <a href="#features" className="hover:text-green-300 transition">Features</a>
                        <a href="#howitworks" className="hover:text-green-300 transition">How It Works</a>
                        <a href="#licensing" className="hover:text-green-300 transition">Licensing</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <a href="/login" className="text-gray-300 hover:text-green-300 transition">Login</a>
                        <a href="/signup" className={`${btnPrimary} py-2 px-4 text-sm`}>Start Trial</a>
                    </div>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-4 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                        Stop Intruders. Start <span className="text-green-400">Seamless Access</span>.
                    </h1>
                    <p className="text-xl text-gray-300">
                        The only laptop security app that captures visual evidence and unlocks access using facial recognition.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                        <a href="/signup" className={`${btnPrimary} text-lg`}>
                            Start 7-Day Free Trial
                        </a>
                        <a href="#licensing" className={`${btnSecondary} text-lg`}>
                            View Licensing Fee
                        </a>
                    </div>
                </div>
                <div className="image">
                    <img 
                            src={background} 
                            alt="SnapSecure background" 
                            className="w-full h-auto rounded-xl shadow-2xl" 
                    />
                </div>
            </section>

            <section id="licensing" className="bg-[#0F172A] max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">SnapSecure Pro Licensing ✨</h2>
                <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">
                    Gain full peace of mind with the complete suite of security and access features. Our licensing fee covers unlimited use on a single device and gives you access to all Pro features immediately after your 7-day free trial.
                </p>
      
                <div className="flex justify-center items-center space-x-4 mb-8 text-gray-400">
                    <span className={!isMonthly ? 'text-white font-semibold' : ''}>Daily</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isMonthly} onChange={() => setIsMonthly(!isMonthly)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#1E293B] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                    <span className={isMonthly ? 'text-white font-semibold' : ''}>Monthly ({LICENSE_FEE.monthlyDiscount})</span>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="bg-[#1E293B] p-10 rounded-xl shadow-2xl flex flex-col border-4 border-green-500 relative">
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded-tr-xl rounded-bl-lg">Full Protection</div>
                        
                        <h3 className="text-3xl font-bold mb-4 text-white">Pro License</h3>
                        
                        <div className="text-6xl font-extrabold mb-8 text-white flex justify-center items-end">
                            <span className="text-3xl font-normal self-start mr-1 mt-2">$</span>
                            {displayPrice}
                            <span className="text-xl font-normal text-gray-400 ml-1">{billingCycle}</span>
                        </div>
                        
                        <ul className="text-left space-y-3 mb-10">
                            {LicenseFeatures.map((feature) => (
                                <li key={feature.name} className="flex items-start text-gray-300">
                                    <CheckCircle size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                                    <span>{feature.name}</span>
                                </li>
                            ))}
                        </ul>

                        <a 
                            href="/checkout-stripe" 
                            className={`${btnPrimary} w-full text-center text-lg mt-auto`}
                        >
                            Secure Your Device Now
                        </a>
                        
                        <p className="text-xs text-gray-500 mt-4">
                            Payment processing is handled securely by **Stripe**.
                        </p>
                    </div>
                </div>
            </section>

            <section id="features" className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">Security Built for the Modern Shared World</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-[#1E293B] p-8 rounded-xl shadow-lg border-t-4 border-green-500 space-y-4">
                        <ShieldAlert size={36} className="text-green-400 mx-auto" />
                        <h3 className="text-xl font-semibold text-white">Intruder Detection</h3>
                        <p className="text-gray-400">Automatically captures a photo of anyone attempting to access your device after a failed password attempt.</p>
                    </div>
                    <div className="bg-[#1E293B] p-8 rounded-xl shadow-lg border-t-4 border-green-500 space-y-4">
                        <Zap size={36} className="text-green-400 mx-auto" />
                        <h3 className="text-xl font-semibold text-white">Facial Recognition Login</h3>
                        <p className="text-gray-400">Unlock your laptop instantly and hands-free upon wake. Password-free access for the owner.</p>
                    </div>
                    <div className="bg-[#1E293B] p-8 rounded-xl shadow-lg border-t-4 border-amber-500 space-y-4">
                        <Users size={36} className="text-amber-400 mx-auto" />
                        <h3 className="text-xl font-semibold text-white">Access Roles (RBAC)</h3>
                        <p className="text-gray-400">Define roles (Admin, Guest, Child) to restrict access to sensitive applications and settings on shared devices.</p>
                    </div>
                </div>
            </section>

    
            <section id="howitworks" className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">The SnapSecure Flow: Immediate Evidence</h2>
                <div className="grid md:grid-cols-3 gap-12 relative">
                    <div className="space-y-4 text-center p-4 bg-[#1E293B] rounded-lg shadow-xl">
                        <span className="text-3xl font-extrabold text-green-400">1</span>
                        <h3 className="text-xl font-semibold text-white">Detect</h3>
                        <p className="text-gray-400">The system notices a failed password attempt or screen wake.</p>
                    </div>
                    <div className="space-y-4 text-center p-4 bg-[#1E293B] rounded-lg shadow-xl">
                        <span className="text-3xl font-extrabold text-green-400">2</span>
                        <h3 className="text-xl font-semibold text-white">Capture & Log</h3>
                        <p className="text-gray-400">The client silently takes a photo and uploads the evidence to your secure dashboard.</p>
                    </div>
                    <div className="space-y-4 text-center p-4 bg-[#1E293B] rounded-lg shadow-xl border-2 border-red-500">
                        <span className="text-3xl font-extrabold text-red-500">3</span>
                        <h3 className="text-xl font-semibold text-white">Alert & Check</h3>
                        <p className="text-gray-300">You receive an <strong className="text-red-400">instant email notification</strong>. You must <strong className="text-red-400">log into your secure dashboard</strong> to view the photo evidence and location details.</p>
                    </div>
                </div>
            </section>

            
            <footer className="bg-[#0F172A] border-t border-[#334155] py-6">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                    <p>&copy; 2025 SnapSecure. All rights reserved. | <a href="/privacy" className="hover:text-green-300">Privacy Policy</a></p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;