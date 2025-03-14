
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { settings } = useSettingsStore();
  const { whatsAppConfig } = settings;
  
  // If WhatsApp integration is disabled, don't render the button
  if (!whatsAppConfig.enabled) return null;
  
  const formattedPhoneNumber = whatsAppConfig.phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(whatsAppConfig.message);
  const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${encodedMessage}`;
  
  // For debugging
  console.log('WhatsApp URL:', whatsappUrl);
  console.log('WhatsApp Config:', whatsAppConfig);
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isHovered && (
        <div className="mb-2 bg-white rounded-lg shadow-lg p-3 transform transition-transform duration-200 origin-bottom-right scale-in animate-fade-in">
          <p className="text-sm font-medium">Chat with us on WhatsApp</p>
          <p className="text-xs text-gray-500">We typically reply within minutes</p>
        </div>
      )}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
};

export default WhatsAppButton;
