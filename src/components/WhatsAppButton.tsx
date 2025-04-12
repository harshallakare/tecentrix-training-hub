
import React from "react";
import { useSettingsStore } from "@/store/settingsStore";

const WhatsAppButton = () => {
  const { settings } = useSettingsStore();
  
  // Safely access whatsAppConfig with fallbacks
  const whatsAppEnabled = settings?.whatsAppConfig?.enabled ?? false;
  const phoneNumber = settings?.whatsAppConfig?.phoneNumber || "";
  const defaultMessage = settings?.whatsAppConfig?.message || "Hello, I'm interested in your courses!";
  
  if (!whatsAppEnabled || !phoneNumber) {
    return null;
  }

  const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 1.76.46 3.513 1.343 5.056l-1.344 4.014c-.142.427.141.814.581.814.085 0 .171-.021.254-.064l4.124-1.374c1.498.796 3.172 1.222 4.873 1.222 5.522 0 9.999-4.477 9.999-9.999.001-5.523-4.477-10-9.999-10zm0 1.5c4.694 0 8.5 3.806 8.5 8.5 0 4.694-3.806 8.5-8.5 8.5-1.55 0-3.033-.419-4.333-1.207-.097-.059-.208-.09-.319-.09-.052 0-.105.008-.157.022l-2.905.969.977-2.923c.022-.065.035-.137.035-.211.001-.103-.026-.205-.083-.297-.769-1.294-1.176-2.778-1.176-4.329 0-4.694 3.806-8.5 8.5-8.5zm3.86 6.312l-1.786.535c-.232.064-.457-.148-.308-.368l.535-1.045c.072-.143.034-.32-.09-.416-.595-.451-1.428-.341-1.911.248-.358.423-.536.973-.536 1.522 0 .238.42.472.121.682.255.687.78 1.155 1.41 1.262.501.083 1.241-.119 1.781-.505l.627-.462c.223-.172.551.11.397.341l-.553.72c-.537.695-1.351 1.126-2.232 1.126-1.211 0-2.216-.886-2.279-2.047-.027-.492.078-.951.297-1.336.218-.383.531-.688.897-.894.368-.206.771-.32 1.186-.317.533.003 1.09.193 1.444.483.177.146.208.379.076.574l-1.126 1.731c-.238.365.215.754.536.469l2.01-1.785c.24-.213.285-.591.109-.866l-.365-.57c-.151-.236-.482-.275-.677-.094l-.543.442c-.527.429-1.308.36-1.733-.157-.396-.48-.309-1.199.195-1.563.376-.271.902-.235 1.229.09.119.118.307.111.411-.025l.535-.702c.138-.181.117-.443-.052-.595-.745-.669-1.7-.841-2.556-.536-.855.305-1.526.99-1.782 1.825-.256.835-.112 1.718.384 2.367.515.671 1.341 1.066 2.175 1.066 1.178 0 2.291-.695 2.792-1.767.229-.492.284-1.042.153-1.573-.074-.302-.468-.394-.629-.159z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
