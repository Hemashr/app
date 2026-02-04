import React, { useMemo, useState } from "react";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";

import SectionCard from "./SectionCard";
import ProjectDrawer from "./ProjectDrawer";

import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { toast } from "../../hooks/use-toast";

function SkillGroup({ label, items }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/40 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{items.length}</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((s) => (
          <Badge key={s} variant="secondary">
            {s}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function formatMonth(value) {
  if (!value || value === "Present") return "Present";
  const [y, m] = value.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

export default function OverviewTab({
  profile,
  achievements,
  skills,
  projects,
  experience,
  education,
  certifications,
  testimonials,
  savedMessagesCount,
  onAddProject,
  onAddTestimonial,
  onOpenBlog,
  onOpenContact,
  onSubmitContact,
  scrollTo,
}) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? null,
    [projects, selectedProjectId],
  );

  const [contact, setContact] = useState({ name: "", email: "", message: "" });

  const submitContact = (e) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) {
      toast({ title: "Missing info", description: "Please fill all fields." });
      return;
    }

    onSubmitContact({
      name: contact.name.trim(),
      email: contact.email.trim(),
      message: contact.message.trim(),
    });
    setContact({ name: "", email: "", message: "" });
  };

  return (
    <div className="space-y-10">
      <SectionCard
        id="about"
        eyebrow="About"
        title="A bit about me"
        description="Quick introduction and what I like working on."
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.5fr] gap-6">
          <div>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              {profile.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {achievements.map((a) => (
                <Badge key={a.id} variant="outline" className="rounded-full">
                  <Quote className="mr-2 h-3.5 w-3.5" />
                  {a.title}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/40 p-4">
            <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              Focus
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Clean APIs, maintainable code</li>
              <li>• Real-world CI/CD and deployments</li>
              <li>• Responsive, user-friendly UI</li>
              <li>• Debugging & production support</li>
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        id="skills"
        eyebrow="Skills"
        title="Tools I use"
        description="Grouped by what I typically use in projects."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkillGroup label="Backend" items={skills.backend} />
          <SkillGroup label="Frontend" items={skills.frontend} />
          <SkillGroup label="Database" items={skills.database} />
          <SkillGroup label="Testing" items={skills.testing} />
          <SkillGroup label="DevOps & Tools" items={skills.devops} />
          <SkillGroup label="Ways of working" items={skills.waysOfWorking} />
        </div>
      </SectionCard>

      <SectionCard
        id="projects"
        eyebrow="Projects"
        title="Selected work"
        description="These are placeholder projects right now — replace them with your real ones later."
        action={
          <Button variant="outline" className="rounded-full" onClick={onAddProject}>
            Add project
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <button
              key={p.id}
              className="text-left rounded-2xl border border-border/70 bg-background/40 p-5 hover:bg-background/60 transition-colors"
              onClick={() => setSelectedProjectId(p.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold">{p.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {p.tagline}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              {p.tech?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.slice(0, 5).map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                  {p.tech.length > 5 ? (
                    <Badge variant="outline">+{p.tech.length - 5}</Badge>
                  ) : null}
                </div>
              ) : (
                <div className="mt-4 text-xs text-muted-foreground">
                  Tip: later you can add tech + links in backend mode.
                </div>
              )}
            </button>
          ))}
        </div>

        <ProjectDrawer
          open={!!selectedProjectId}
          onOpenChange={(v) => !v && setSelectedProjectId(null)}
          project={selectedProject}
        />
      </SectionCard>

      <SectionCard
        id="experience"
        eyebrow="Experience"
        title="Where I’ve worked"
        description="Roles and key outcomes."
      >
        <div className="space-y-4">
          {experience.map((e) => (
            <div
              key={e.id}
              className="rounded-2xl border border-border/70 bg-background/40 p-5"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div className="text-base font-semibold">{e.title}</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {e.company} • {e.location}
                  </div>
                </div>
                <Badge variant="outline" className="rounded-full w-fit">
                  {formatMonth(e.start)} – {formatMonth(e.end)}
                </Badge>
              </div>
              <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground space-y-2">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard
          id="education"
          eyebrow="Education"
          title="Education"
          description="Academic background."
        >
          <div className="space-y-4">
            {education.map((ed) => (
              <div
                key={ed.id}
                className="rounded-xl border border-border/70 bg-background/40 p-4"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <div className="font-medium">{ed.degree}</div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {ed.institution}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{ed.dates}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          id="certificates"
          eyebrow="Certificates"
          title="Certifications"
          description="Proof points & continuous learning."
        >
          <div className="space-y-3">
            {certifications.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-background/40 p-4"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.issuer}</div>
                  </div>
                </div>
                <Badge variant="secondary">Certificate</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        id="testimonials"
        eyebrow="Testimonials"
        title="What people say"
        description="Add real testimonials anytime (stored locally for now)."
        action={
          <Button className="rounded-full" onClick={onAddTestimonial}>
            Add testimonial
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-border/70 bg-background/40 p-5"
            >
              <Quote className="h-4 w-4 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                “{t.quote}”
              </p>
              <div className="mt-4 text-sm font-medium">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        id="blog"
        eyebrow="Blog"
        title="Notes & write-ups"
        description="A lightweight blog that works offline using your browser storage."
        action={
          <Button className="rounded-full" onClick={onOpenBlog}>
            Open blog
          </Button>
        }
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            Write posts, tag them, and keep them ready for interview prep.
          </div>
          <Button variant="outline" className="rounded-full" onClick={() => scrollTo("contact")}> 
            Jump to contact
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </SectionCard>

      <SectionCard
        id="contact"
        eyebrow="Contact"
        title="Let’s talk"
        description="Send a message (saved locally for now). In the backend step, we can email you or store messages in MongoDB."
      >
        <form onSubmit={submitContact} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => scrollTo("about")}>
                Back to top
              </Button>
              <Button type="submit" className="rounded-full">
                Send
              </Button>
            </div>
          </div>

          <Separator className="md:col-span-2" />
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={onOpenContact}>
              Open Contact tab
            </Button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
