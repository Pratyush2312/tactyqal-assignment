import { cn } from "@/lib/cn";

export function ButtonLink({ href, variant = "solid", children }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-semibold transition-colors",
        variant === "solid" && "bg-navy text-chalk hover:bg-navy/85",
        variant === "outline" &&
          "border border-navy text-navy hover:bg-navy/10",
      )}>
      {children}
    </a>
  );
}
