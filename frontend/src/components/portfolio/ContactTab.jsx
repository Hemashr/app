import React, { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";

import { ExternalLink, FileText, Github, Linkedin } from "lucide-react";

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

export default function ContactTab({ profile, savedMessagesCount, onSubmit }) {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) {
      return;
    }
    onSubmit({
      name: contact.name.trim(),
      email: contact.email.trim(),
      message: contact.message.trim(),
    });
    setContact({ name: "", email: "", message: "" });
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-background/40 p-6">
      <div className="text-2xl font-semibold">Contact</div>
      <div className="mt-1 text-sm text-muted-foreground">
        Quick links + a message form (messages are saved locally for now).
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <PillLink href={profile.linkedin} icon={Linkedin}>
          LinkedIn
        </PillLink>
        <PillLink href={profile.github} icon={Github}>
          GitHub
        </PillLink>
        <PillLink href={profile.resumeUrl} icon={FileText}>
          Resume
        </PillLink>
      </div>

      <Separator className="my-6" />

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm">Your name</label>
          <Input
            value={contact.name}
            onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Your email</label>
          <Input
            type="email"
            value={contact.email}
            onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm">Message</label>
          <Textarea
            rows={6}
            value={contact.message}
            onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
            placeholder="Tell me about the role, team, and what you’re building..."
          />
        </div>
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
          <div className="text-xs text-muted-foreground">
            Saved messages: {savedMessagesCount}
          </div>
          <Button type="submit" className="rounded-full">
            Send
          </Button>
        </div>
      </form>

      <div className="mt-6 text-xs text-muted-foreground">
        Next step: connect this to FastAPI + MongoDB so your messages are stored and/or emailed.
      </div>
    </div>
  );
}
