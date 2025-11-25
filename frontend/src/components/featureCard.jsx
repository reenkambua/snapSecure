import React from 'react';

const FeatureCard = ({ Icon, title, description, color }) => {
  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8 flex flex-col items-start shadow-lg hover:shadow-2xl hover:shadow-green-500/30 transition duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
      {/* Icon with gradient circle */}
      <div className={`w-14 h-14 flex items-center justify-center mb-4 rounded-full bg-gradient-to-r from-green-500 to-green-300 text-white ${color}`}>
        <Icon className="w-7 h-7" />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-left text-sm md:text-base">{description}</p>
    </div>
  );
};

export default FeatureCard;
