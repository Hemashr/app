import React, { useMemo, useState } from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import BlogComposer from "./BlogComposer";

import { ArrowRight, Search } from "lucide-react";

export default function BlogTab({ posts, onUpsert, onDelete }) {
  const [blogQuery, setBlogQuery] = useState("");
  const [blogTag, setBlogTag] = useState("all");
  const [isComposing, setIsComposing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return ["all", ...Array.from(set).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = blogQuery.trim().toLowerCase();
    return [...posts]
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
  }, [posts, blogQuery, blogTag]);

  const editingPost = useMemo(
    () => posts.find((p) => p.id === editingPostId) ?? null,
    [posts, editingPostId],
  );

  return (
    <div className="space-y-6">
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
          onSave={(payload) => {
            onUpsert({ postId: editingPostId, payload });
            setIsComposing(false);
            setEditingPostId(null);
          }}
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
                  onClick={() => {
                    const ok = window.confirm("Delete this post? (local only)");
                    if (ok) onDelete(p.id);
                  }}
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
    </div>
  );
}
