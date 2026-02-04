import React from "react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import {
  ArrowRight,
  Briefcase,
  ExternalLink,
  FileText,
  Github,
  Laptop,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { toast } from "../../hooks/use-toast";

function PillLink({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-sm text-foreground hover:bg-card/70 transition-colors"
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span>{children}</span>
      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
    </a>
  );
}

export default function HeroBlock({
  profile,
  certificationsCount,
  onPrimary,
  onSecondary,
}) {
  const stats = [
    { Icon: Briefcase, label: "Experience", value: "2+ years" },
    { Icon: Laptop, label: "Primary stack", value: ".NET + Angular" },
    {
      Icon: ShieldCheck,
      label: "Certs",
      value: String(certificationsCount),
    },
  ];

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(profile.phone);
      toast({ title: "Copied", description: "Phone number copied." });
    } catch {
      toast({ title: "Copy failed", description: "Please copy manually." });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            {profile.title}
            <span className="text-muted-foreground">
              {" "}
              — building reliable web apps.
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {profile.summary}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button className="rounded-full" onClick={onPrimary}>
              View projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-full" onClick={onSecondary}>
              Contact
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <PillLink href={profile.linkedin} icon={Linkedin}>
              LinkedIn
            </PillLink>
            <PillLink href={profile.github} icon={Github}>
              GitHub
            </PillLink>
            <PillLink href={profile.resumeUrl} icon={FileText}>
              Resume (PDF)
            </PillLink>
          </div>

          <div className="mt-7 text-xs text-muted-foreground">
            This MVP is frontend-only: projects/blog/testimonials/contact are stored in your browser.
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-background/40 p-5">
          <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Quick facts
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card/40 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50">
                    <s.Icon className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <div className="text-sm">
                    <div className="font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-5" />

          <div className="grid grid-cols-1 gap-3 text-sm">
            <a
              className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3 hover:bg-card/70 transition-colors"
              href={`mailto:${profile.email}`}
            >
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profile.email}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </a>

            <button
              type="button"
              onClick={copyPhone}
              className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3 hover:bg-card/70 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profile.phone}</span>
              </div>
              <span className="text-xs text-muted-foreground">Copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
