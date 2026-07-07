import {
  BadgeIndianRupee,
  Clock3,
  ChefHat,
  Grid3x3,
  LayoutGrid,
  PanelTop,
  Sparkles,
  Users,
} from "lucide-react";

const iconMap = {
  cupboard: LayoutGrid,
  kitchen: ChefHat,
  window: PanelTop,
  net: Grid3x3,
  custom: Sparkles,
  clock: Clock3,
  users: Users,
  sparkles: Sparkles,
  badge: BadgeIndianRupee,
};

export default function ServiceIcon({ name, className = "h-6 w-6" }) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
