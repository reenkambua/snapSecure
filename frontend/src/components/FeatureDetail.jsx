import React from 'react';

const FeatureDetail = ({ Icon, title, description }) => (
  <div className="flex items-start bg-gray-900 p-5 rounded-lg border border-gray-700">
    <Icon className="w-6 h-6 mt-1 mr-4 text-green-400" />
    <div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

export default FeatureDetail;
