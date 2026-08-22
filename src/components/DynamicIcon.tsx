import {
  CalendarClock,
  BookOpenCheck,
  Compass,
  UserCheck,
  AlertCircle,
  Brain,
  Map,
  PhoneCall,
  ClipboardList,
  Route,
  Handshake,
  Sparkles,
  ShieldCheck,
  MessageCircleHeart,
  Layers,
  Users,
  type LucideProps,
} from "lucide-react";

// Only the icons actually referenced by seeded content need to be registered
// here — lucide-react ships hundreds of icons and importing the whole library
// by string lookup would blow up the bundle.
const icons = {
  CalendarClock,
  BookOpenCheck,
  Compass,
  UserCheck,
  AlertCircle,
  Brain,
  Map,
  PhoneCall,
  ClipboardList,
  Route,
  Handshake,
  Sparkles,
  ShieldCheck,
  MessageCircleHeart,
  Layers,
  Users,
} as const;

export type IconName = keyof typeof icons;

export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as IconName] ?? Compass;
  return <Icon {...props} />;
}
