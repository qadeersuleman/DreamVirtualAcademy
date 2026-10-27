'use client';

import React from 'react';
import { WhatsAppSolidIcon } from './Icons';

export default function WhatsAppFloatingButton() {
  return (
    <aside aria-label="WhatsApp Support">
      <a
        href="https://wa.me/923018183624?text=Salam%20Sir%20Dilshad!%20I%20have%20an%20inquiry%20regarding%20Dreams%20Virtual%20Academy."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-modern"
        aria-label="Direct WhatsApp Contact"
      >
        <span className="whatsapp-pulse-ring" />
        <span className="whatsapp-pulse-ring-2" />
        <div className="whatsapp-icon-circle">
          <WhatsAppSolidIcon size={34} />
        </div>
        <span className="whatsapp-tooltip">
          Chat on WhatsApp • سنڌي ۾ رابطو ڪريو
        </span>
      </a>
    </aside>
  );
}
