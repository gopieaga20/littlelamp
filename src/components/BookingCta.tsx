import Link from "next/link";
import { cn } from "@/lib/utils";

// Persistent conversion CTA used on every page (nav, hero, pricing rows, footer).
// Always routes to /book, which hosts the actual Cal.com embed + pre-booking form.
export function BookingCta({
  className,
  size = "md",
  children = "Book Free Session",
}: {
  className?: string;
  size?: "sm" | "md";
  children?: React.ReactNode;
}) {
  return (
    <Link
      href="/book"
      className={cn(
        "btn-primary",
        size === "sm" && "px-4 py-2 text-sm",
        className
      )}
    >
      {children}
    </Link>
  );
}
