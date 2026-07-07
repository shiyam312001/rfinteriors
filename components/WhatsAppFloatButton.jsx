"use client";

import { MessageCircle } from "lucide-react";
import { siteInfo } from "@/lib/content";

export default function WhatsAppFloatButton() {
  return (
    <div className="group fixed bottom-6 right-6 z-50">
      <span
        className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-charcoal opacity-0 shadow-soft-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        role="tooltip"
      >
        Chat with us
      </span>
      <a
        href={siteInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="animate-whatsapp-float inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
