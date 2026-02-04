import React, { useEffect, useMemo, useState } from "react";
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

import { Toaster } from "../components/ui/toaster";
import { toast } from "../hooks/use-toast";

import HeaderBar from "../components/portfolio/HeaderBar";
import HeroBlock from "../components/portfolio/HeroBlock";
import OverviewTab from "../components/portfolio/OverviewTab";
import BlogTab from "../components/portfolio/BlogTab";
import ContactTab from "../components/portfolio/ContactTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const PROJECTS_KEY = "portfolio_mock_projects_v1";

function loadProjects() {
  const raw = localStorage.getItem(PROJECTS_KEY);
  if (!raw) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(starterProjects));
    return starterProjects;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return starterProjects;
  }
}

export default function PortfolioPage() {
  // Default to dark mode (modern developer portfolio feel)
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const [activeTab, setActiveTab] = useState("overview");

  // MOCK state stored in localStorage
  const [state, setState] = useState(() => getInitialState());
  const [projects, setProjects] = useState(() => loadProjects());

  useEffect(() => {
    persistState(state);
  }, [state]);

  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  const nav = useMemo(
    () => [
      { key: "about", label: "About" },
      { key: "skills", label: "Skills" },
      { key: "projects", label: "Projects" },
      { key: "experience", label: "Experience" },
      { key: "education", label: "Education" },
      { key: "certificates", label: "Certificates" },
      { key: "testimonials", label: "Testimonials" },
      { key: "blog", label: "Blog" },
      { key: "contact", label: "Contact" },
    ],
    [],
  );

  const scrollTo = (key) => {
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitContact = (payload) => {
    setState((s) => ({
      ...s,
      contactMessages: [
        {
          id: createId("msg"),
          createdAt: new Date().toISOString(),
          ...payload,
        },
        ...s.contactMessages,
      ],
    }));
    toast({
      title: "Message saved",
      description: "Saved locally for now. In the backend step, this can email you.",
    });
  };

  const addTestimonial = ({ name, role, quote }) => {
    setState((s) => ({
      ...s,
      testimonials: [
        {
          id: createId("t"),
          name: name.trim(),
          role: role.trim(),
          quote: quote.trim(),
        },
        ...s.testimonials,
      ],
    }));
    toast({ title: "Saved", description: "Testimonial added (local only)." });
  };

  const upsertPost = ({ postId, payload }) => {
    if (postId) {
      setState((s) => ({
        ...s,
        blogPosts: s.blogPosts.map((p) =>
          p.id === postId ? { ...p, ...payload } : p,
        ),
      }));
      toast({ title: "Updated", description: "Blog post updated (local only)." });
      return;
    }

    const post = {
      id: createId("post"),
      date: new Date().toISOString().slice(0, 10),
      ...payload,
    };
    setState((s) => ({ ...s, blogPosts: [post, ...s.blogPosts] }));
    toast({ title: "Saved", description: "New blog post created (local only)." });
  };

  const deletePost = (postId) => {
    setState((s) => ({
      ...s,
      blogPosts: s.blogPosts.filter((p) => p.id !== postId),
    }));
    toast({ title: "Deleted", description: "Blog post deleted." });
  };

  const addProject = ({ name, tagline, description }) => {
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
  };

  const accent =
    "bg-[radial-gradient(circle_at_30%_10%,rgba(217,251,6,0.14),transparent_55%),radial-gradient(circle_at_70%_0%,rgba(248,212,122,0.10),transparent_45%)]";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />

      <HeaderBar
        profile={baseProfile}
        nav={nav}
        onNav={(k) => {
          setActiveTab("overview");
          scrollTo(k);
        }}
      />

      <div className={"border-b border-border/70 " + accent}>
        <HeroBlock
          profile={baseProfile}
          certificationsCount={certifications.length}
          onPrimary={() => {
            setActiveTab("overview");
            scrollTo("projects");
          }}
          onSecondary={() => {
            setActiveTab("contact");
          }}
        />
      </div>

      <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start flex-wrap bg-card/40 border border-border/60">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <OverviewTab
              profile={baseProfile}
              achievements={achievements}
              skills={skills}
              projects={projects}
              experience={experience}
              education={education}
              certifications={certifications}
              testimonials={state.testimonials}
              savedMessagesCount={state.contactMessages.length}
              onAddProject={() => {
                const name = prompt("Project name");
                if (!name) return;
                const tagline = prompt("Short tagline");
                const description = prompt("Description");
                addProject({ name, tagline, description });
              }}
              onAddTestimonial={() => {
                const name = prompt("Name (e.g., Manager / Client)");
                if (!name) return;
                const role = prompt("Role / Company");
                if (!role) return;
                const quote = prompt("Short testimonial quote");
                if (!quote) return;
                addTestimonial({ name, role, quote });
              }}
              onOpenBlog={() => setActiveTab("blog")}
              onOpenContact={() => setActiveTab("contact")}
              onSubmitContact={submitContact}
              scrollTo={scrollTo}
            />
          </TabsContent>

          <TabsContent value="blog" className="mt-8">
            <BlogTab
              posts={state.blogPosts}
              onUpsert={upsertPost}
              onDelete={deletePost}
            />
          </TabsContent>

          <TabsContent value="contact" className="mt-8">
            <ContactTab
              profile={baseProfile}
              savedMessagesCount={state.contactMessages.length}
              onSubmit={submitContact}
            />
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
            <div className="text-xs text-muted-foreground">
              Data editing is MOCKED (localStorage). Next step can add FastAPI + MongoDB.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
