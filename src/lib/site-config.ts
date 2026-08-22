// Central place for business info + third-party embed placeholders.
// Swap the TODO values for the real accounts before launch — nothing else in
// the codebase needs to change.

export const siteConfig = {
  name: "LittleLamp",
  tagline: "Guiding Every Child to Their Best Future",
  description:
    "Personalized study-habit coaching, board-exam prep, and career counseling for Class 2–12 students in India.",
  url: "https://littlelamp.example.com", // TODO: set production domain
  phone: "+91 90000 00000", // TODO: real business number
  whatsappNumber: "919000000000", // TODO: E.164 without '+' for wa.me links
  email: "hello@littlelamp.example.com", // TODO: real inbox
  calBookingUrl: "https://cal.com/littlelamp/intro-call", // TODO: real Cal.com event link
  social: {
    instagram: "https://instagram.com/littlelamp", // TODO
    facebook: "https://facebook.com/littlelamp", // TODO
  },
  address: "Bengaluru, Karnataka, India", // TODO: real service area / address
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
];

export function whatsappLink(prefilledText = "Hi LittleLamp! I'd like to know more about your programs.") {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(prefilledText)}`;
}
