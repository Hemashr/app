import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  achievements,
  baseProfile,
  certifications,
  education,
  experience,
  getInitialState,
  persistState,
  skills,
  starterProjects,
  createId,
} from "../mock";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { toast } from "../hooks/use-toast";
import { Toaster } from "../components/ui/toaster";

import SectionCard from "../components/portfolio/SectionCard";
import ProjectDrawer from "../components/portfolio/ProjectDrawer";
import BlogComposer from "../components/portfolio/BlogComposer";

import {
  ArrowRight,
  Briefcase,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Laptop,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
  // value: YYYY-MM
  const [y, m] = value.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

export default function Portfolio() {
  const [state, setState] = useState(() => getInitialState());
  const [activeTab, setActiveTab] = useState("overview");

  // Default to dark mode (works nicely for a modern developer portfolio).
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const [projects, setProjects] = useState(() => {
    const raw = localStorage.getItem("portfolio_mock_projects_v1");
    if (!raw) {
      localStorage.setItem("portfolio_mock_projects_v1", JSON.stringify(starterProjects));
      return starterProjects;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return starterProjects;
    }
  });

  useEffect(() => {
    persistState(state);
  }, [state]);

  useEffect(() => {
    localStorage.setItem("portfolio_mock_projects_v1", JSON.stringify(projects));
  }, [projects]);

  const sectionRefs = {
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    certificates: useRef(null),
    testimonials: useRef(null),
    blog: useRef(null),
    contact: useRef(null),
  };

  const nav = [
    { key: "about", label: "About" },
    { key: "skills", label: "Skills" },
    { key: "projects", label: "Projects" },
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "certificates", label: "Certificates" },
    { key: "testimonials", label: "Testimonials" },
    { key: "blog", label: "Blog" },
    { key: "contact", label: "Contact" },
  ];

  const scrollTo = (key) => {
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? null,
    [projects, selectedProjectId],
  );

  const [blogQuery, setBlogQuery] = useState("");
  const [blogTag, setBlogTag] = useState("all");
  const [isComposing, setIsComposing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  const allTags = useMemo(() => {
    const set = new Set();
    state.blogPosts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return ["all", ...Array.from(set).sort()];
  }, [state.blogPosts]);

  const filteredPosts = useMemo(() => {
    const q = blogQuery.trim().toLowerCase();
    return [...state.blogPosts]
      .filter((p) => {
        if (blogTag !== "all" && !(p.tags || []).includes(blogTag)) return false;
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          (p.excerpt || "").toLowerCase().includes(q) ||
          (p.content || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [state.blogPosts, blogQuery, blogTag]);

  const editingPost = useMemo(
    () => state.blogPosts.find((p) => p.id === editingPostId) ?? null,
    [state.blogPosts, editingPostId],
  );

  const heroStats = [
    { icon: Briefcase, label: "Experience", value: "2+ years" },
    { icon: Laptop, label: "Primary stack", value: ".NET + Angular" },
    { icon: ShieldCheck, label: "Certs", value: `${certifications.length}` },
  ];

  const handleAddTestimonial = () => {
    const name = prompt("Name (e.g., Manager / Client)");
    if (!name) return;
    const role = prompt("Role / Company");
    if (!role) return;
    const quote = prompt("Short testimonial quote");
    if (!quote) return;

    setState((s) => ({
      ...s,
      testimonials: [
        { id: createId("t"), name: name.trim(), role: role.trim(), quote: quote.trim() },
        ...s.testimonials,
      ],
    }));
    toast({ title: "Saved", description: "Testimonial added (local only)." });
  };

  const handleSavePost = (payload) => {
    const now = new Date();
    if (editingPostId) {
      setState((s) => ({
        ...s,
        blogPosts: s.blogPosts.map((p) =>
          p.id === editingPostId
            ? { ...p, ...payload, date: p.date }
            : p,
        ),
      }));
      toast({ title: "Updated", description: "Blog post updated (local only)." });
    } else {
      const post = {
        id: createId("post"),
        date: now.toISOString().slice(0, 10),
        ...payload,
      };
      setState((s) => ({ ...s, blogPosts: [post, ...s.blogPosts] }));
      toast({ title: "Saved", description: "New blog post created (local only)." });
    }

    setIsComposing(false);
    setEditingPostId(null);
  };

  const handleDeletePost = (postId) => {
    const ok = window.confirm("Delete this post? (local only)");
    if (!ok) return;
    setState((s) => ({ ...s, blogPosts: s.blogPosts.filter((p) => p.id !== postId) }));
    toast({ title: "Deleted", description: "Blog post deleted." });
  };

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submitContact = (e) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) {
      toast({ title: "Missing info", description: "Please fill all fields." });
      return;
    }

    setState((s) => ({
      ...s,
      contactMessages: [
        {
          id: createId("msg"),
          createdAt: new Date().toISOString(),
          ...contact,
        },
        ...s.contactMessages,
      ],
    }));
    setContact({ name: "", email: "", message: "" });
    toast({
      title: "Message saved",
      description: "Stored locally for now. When we add backend, this will email you.",
    });
  };

  const accent =
    "bg-[radial-gradient(circle_at_30%_10%,rgba(217,251,6,0.14),transparent_55%),radial-gradient(circle_at_70%_0%,rgba(248,212,122,0.10),transparent_45%)]";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />

      {/* Header */}
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
              <div className="text-sm font-semibold">{baseProfile.name}</div>
              <div className="text-xs text-muted-foreground">{baseProfile.title}</div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {nav.slice(0, 6).map((item) => (
              <Button
                key={item.key}
                variant="ghost"
                className="rounded-full text-muted-foreground hover:text-foreground"
                onClick={() => scrollTo(item.key)}
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
                  <DropdownMenuItem
                    key={item.key}
                    onClick={() => scrollTo(item.key)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild className="rounded-full">
              <a href={`mailto:${baseProfile.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </a>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <a href={baseProfile.resumeUrl} target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className={"border-b border-border/70 " + accent}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {baseProfile.location}
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
                {baseProfile.title}
                <span className="text-muted-foreground"> — building reliable web apps.</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {baseProfile.summary}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button className="rounded-full" onClick={() => scrollTo("projects")}>
                  View projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => scrollTo("contact")}>
                  Contact
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <PillLink href={baseProfile.linkedin} icon={Linkedin}>
                  LinkedIn
                </PillLink>
                <PillLink href={baseProfile.github} icon={Github}>
                  GitHub
                </PillLink>
                <PillLink href={baseProfile.resumeUrl} icon={FileText}>
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
                {heroStats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card/40 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <div className="text-sm">
                          <div className="font-medium">{s.label}</div>
                          <div className="text-xs text-muted-foreground">{s.value}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-5" />

              <div className="grid grid-cols-1 gap-3 text-sm">
                <a
                  className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3 hover:bg-card/70 transition-colors"
                  href={`mailto:${baseProfile.email}`}
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{baseProfile.email}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </a>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{baseProfile.phone}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">(copy)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start flex-wrap bg-card/40 border border-border/60">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8 space-y-10">
            <SectionCard
              id="about"
              eyebrow="About"
              title="A bit about me"
              description="Quick introduction and what I like working on."
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_0.5fr] gap-6">
                <div>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {baseProfile.summary}
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
              description="These are placeholder projects right now — you can replace them with your real ones later."
              action={
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    const name = prompt("Project name");
                    if (!name) return;
                    const tagline = prompt("Short tagline");
                    const description = prompt("Description");
                    setProjects((prev) => [
                      {
                        id: createId("proj"),
                        name: name.trim(),
                        tagline: (tagline || "").trim(),
                        description: (description || "").trim(),
                        tech: [],
                        impact: [],
                        links: [],
                      },
                      ...prev,
                    ]);
                    toast({ title: "Added", description: "Project added (local only)." });
                  }}
                >
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
                        Tip: edit this project later with tech + links.
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
                        {formatMonth(e.start)} – {e.end === "Present" ? "Present" : formatMonth(e.end)}
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
                          <div className="text-xs text-muted-foreground">
                            {c.issuer}
                          </div>
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
                <Button className="rounded-full" onClick={handleAddTestimonial}>
                  Add testimonial
                </Button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.testimonials.map((t) => (
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
                <Button
                  className="rounded-full"
                  onClick={() => {
                    setIsComposing(true);
                    setEditingPostId(null);
                    setActiveTab("blog");
                  }}
                >
                  Write a post
                </Button>
              }
            >
              <div className="text-sm text-muted-foreground">
                Use the “Blog” tab above to search, edit and publish posts.
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
                    onChange={(e) =>
                      setContact((c) => ({ ...c, message: e.target.value }))
                    }
                    placeholder="Tell me about the role, team, and what you’re building..."
                  />
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
                  <div className="text-xs text-muted-foreground">
                    Saved messages: {state.contactMessages.length}
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
              </form>
            </SectionCard>
          </TabsContent>

          <TabsContent value="blog" className="mt-8 space-y-6">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div>
                <div className="text-2xl font-semibold">Blog</div>
                <div className="text-sm text-muted-foreground">
                  Search, edit, and add posts. Stored in localStorage.
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={blogQuery}
                    onChange={(e) => setBlogQuery(e.target.value)}
                    placeholder="Search posts..."
                    className="pl-9 w-full sm:w-[320px]"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full">
                      Tag: {blogTag}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {allTags.map((t) => (
                      <DropdownMenuItem key={t} onClick={() => setBlogTag(t)}>
                        {t}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  className="rounded-full"
                  onClick={() => {
                    setIsComposing(true);
                    setEditingPostId(null);
                  }}
                >
                  Write
                </Button>
              </div>
            </div>

            {isComposing ? (
              <BlogComposer
                defaultValues={
                  editingPost
                    ? {
                        title: editingPost.title,
                        tags: (editingPost.tags || []).join(", "),
                        excerpt: editingPost.excerpt,
                        content: editingPost.content,
                      }
                    : undefined
                }
                onCancel={() => {
                  setIsComposing(false);
                  setEditingPostId(null);
                }}
                isSaving={false}
                onSave={handleSavePost}
              />
            ) : null}

            <div className="grid grid-cols-1 gap-4">
              {filteredPosts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-border/70 bg-background/40 p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{p.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {p.date} • {(p.tags || []).join(", ") || "no tags"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsComposing(true);
                          setEditingPostId(p.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(p.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  <Separator className="my-4" />
                  <pre className="text-sm whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed">
                    {p.content}
                  </pre>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(p.tags || []).map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}

              {!filteredPosts.length ? (
                <div className="rounded-2xl border border-dashed border-border/70 p-10 text-center text-sm text-muted-foreground">
                  No posts match your search.
                </div>
              ) : null}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border/70 bg-background/40 p-6">
              <div className="text-2xl font-semibold">Contact</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Quick links + a message form.
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <PillLink href={baseProfile.linkedin} icon={Linkedin}>
                  LinkedIn
                </PillLink>
                <PillLink href={baseProfile.github} icon={Github}>
                  GitHub
                </PillLink>
                <PillLink href={baseProfile.resumeUrl} icon={FileText}>
                  Resume
                </PillLink>
              </div>

              <Separator className="my-6" />

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
                    onChange={(e) =>
                      setContact((c) => ({ ...c, message: e.target.value }))
                    }
                    placeholder="Tell me about the role, team, and what you’re building..."
                  />
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 sm:justify-end">
                  <Button type="submit" className="rounded-full">
                    Send
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-xs text-muted-foreground">
                Contact messages currently saved locally: {state.contactMessages.length}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">{baseProfile.name}</div>
              <div className="text-xs text-muted-foreground">
                Full Stack .NET Developer • {baseProfile.location}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" className="rounded-full" asChild>
                <a href={baseProfile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="ghost" className="rounded-full" asChild>
                <a href={baseProfile.github} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="ghost" className="rounded-full" asChild>
                <a href={`mailto:${baseProfile.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-6 text-xs text-muted-foreground">
            Built as a portfolio MVP. Data editing uses MOCK storage (localStorage) — next step can add FastAPI + MongoDB.
          </div>
        </div>
      </footer>
    </div>
  );
}
