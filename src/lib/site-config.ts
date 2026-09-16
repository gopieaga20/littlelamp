// Central place for business info + third-party embed placeholders.
// Swap the TODO values for the real accounts before launch — nothing else in
// the codebase needs to change.

export const siteConfig = {
  name: "LittleLamp",
  tagline: "Empowering Every Child to Their Highest Potential & Achieve Greatness",
  description:
    "Personalized study-habit coaching, board-exam prep, and career counseling for Class 2–12 students in India.",
  url: "https://littlelamp.co.in",
  phone: "+91 94440 86921",
  whatsappNumber: "919444086921",
  email: "littlelamp1001@gmail.com",
  availableHours: "Mon–Fri, 7:30 PM – 9:00 PM",
  calBookingUrl: "https://cal.com/littlelamp/intro-call", // TODO: real Cal.com event link
  social: {
    instagram: "https://instagram.com/littlelamp", // TODO
    facebook: "https://facebook.com/littlelamp", // TODO
  },
  address: "Tamil Nadu, India", // TODO: real service area / address
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
];

export function whatsappLink(prefilledText = "Hi LittleLamp! I'd like to know more about your programs.") {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(prefilledText)}`;
}
