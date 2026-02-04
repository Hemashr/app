import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";

export default function HeaderBar({ profile, nav, onNav }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-3 flex items-center justify-between gap-3">
        <button
          className="group inline-flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/40">
            <Sparkles className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </span>
          <div className="leading-tight text-left">
            <div className="text-sm font-semibold">{profile.name}</div>
            <div className="text-xs text-muted-foreground">{profile.title}</div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {nav.slice(0, 6).map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              className="rounded-full text-muted-foreground hover:text-foreground"
              onClick={() => onNav(item.key)}
            >
              {item.label}
            </Button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full">
                More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {nav.slice(6).map((item) => (
                <DropdownMenuItem key={item.key} onClick={() => onNav(item.key)}>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild className="rounded-full">
            <a href={`mailto:${profile.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
