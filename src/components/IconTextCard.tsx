import { DynamicIcon } from "@/components/DynamicIcon";
import { cn } from "@/lib/utils";

export function IconTextCard({
  icon,
  title,
  description,
  step,
  className,
}: {
  icon: string;
  title: string;
  description: string;
  step?: number;
  className?: string;
}) {
  return (
    <div className={cn("card relative", className)}>
      {step !== undefined && (
        <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-ink-800 text-xs font-bold text-cream">
          {step}
        </span>
      )}
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700">
        <DynamicIcon name={icon} className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-semibold text-ink-800">{title}</h3>
      <p className="mt-1.5 text-sm text-ink-500">{description}</p>
    </div>
  );
}
