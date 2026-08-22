import { siteConfig } from "@/lib/site-config";

// Inline Cal.com embed for the free 10-minute intro call.
// TODO: once the real Cal.com event is created, this iframe just works —
// no code change needed beyond updating `calBookingUrl` in site-config.ts.
// (For the richer @calcom/embed-react widget with theming, swap this iframe
// for their <Cal /> component once the package is added.)
export function BookingEmbed() {
  return (
    <div className="card overflow-hidden p-0">
      <iframe
        src={`${siteConfig.calBookingUrl}?embed=true`}
        title="Book your free 10-minute session"
        className="h-[700px] w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
