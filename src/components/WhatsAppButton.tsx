import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";

export function WhatsAppButton({ floating = false }: { floating?: boolean }) {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with LittleLamp on WhatsApp"
      className={
        floating
          ? "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition hover:scale-105"
          : "inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-card transition hover:bg-[#1ebe5b]"
      }
    >
      <MessageCircle className={floating ? "h-7 w-7" : "h-5 w-5"} aria-hidden="true" />
      {!floating && <span>Chat on WhatsApp</span>}
    </a>
  );
}
