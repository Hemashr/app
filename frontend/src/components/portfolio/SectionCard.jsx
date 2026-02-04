import React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/card";

export default function SectionCard({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className,
}) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-[240px]">
            {eyebrow ? (
              <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold leading-tight text-foreground">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-3xl">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="pt-1">{action}</div> : null}
        </div>

        <Card className="bg-card/60 border-border/60 shadow-sm">
          <div className="p-5 md:p-7">{children}</div>
        </Card>
      </div>
    </section>
  );
}
