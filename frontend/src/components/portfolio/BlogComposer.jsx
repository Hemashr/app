import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const schema = z.object({
  title: z.string().min(3, "Title is too short"),
  tags: z.string().optional(),
  excerpt: z.string().min(10, "Add a short excerpt (10+ chars)"),
  content: z.string().min(20, "Write at least 20 characters"),
});

export default function BlogComposer({
  defaultValues,
  onCancel,
  onSave,
  isSaving,
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {
      title: "",
      tags: "",
      excerpt: "",
      content: "",
    },
  });

  const submit = (values) => {
    const tags = (values.tags ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: values.title.trim(),
      tags,
      excerpt: values.excerpt.trim(),
      content: values.content.trim(),
    });
  };

  return (
    <div className="rounded-xl border border-border/70 p-4 md:p-5 bg-card/40">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="dotnet, api, devops" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder="One-liner summary for the list view"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    rows={8}
                    placeholder="Write your post content..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save post"}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Posts are stored in your browser (localStorage) for now — no backend
            yet.
          </div>
        </form>
      </Form>
    </div>
  );
}
