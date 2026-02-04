import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

export default function ProjectDrawer({ open, onOpenChange, project }) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-background">
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader className="px-6">
            <DrawerTitle className="text-xl md:text-2xl">
              {project?.name ?? "Project"}
            </DrawerTitle>
            {project?.tagline ? (
              <p className="text-sm text-muted-foreground mt-2">
                {project.tagline}
              </p>
            ) : null}
          </DrawerHeader>

          <div className="px-6 pb-6">
            {project?.description ? (
              <p className="text-sm md:text-base leading-relaxed">
                {project.description}
              </p>
            ) : null}

            {project?.tech?.length ? (
              <div className="mt-5">
                <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Tech
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            {project?.impact?.length ? (
              <div className="mt-5">
                <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Impact
                </div>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  {project.impact.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project?.links?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.links.map((l) => (
                  <Button
                    key={l.url}
                    variant="outline"
                    className="rounded-full"
                    asChild
                  >
                    <a href={l.url} target="_blank" rel="noreferrer">
                      {l.label}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            ) : null}

            <div className="mt-6 text-xs text-muted-foreground">
              Note: This portfolio is currently using MOCK project data (editable in
              the UI / local storage).
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
