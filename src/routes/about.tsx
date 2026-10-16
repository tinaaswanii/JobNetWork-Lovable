import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About JobNetWork" },
      {
        name: "description",
        content:
          "JobNetWork helps job seekers discover jobs, internships and career resources, and track every application in one private dashboard.",
      },
      { property: "og:title", content: "About JobNetWork" },
      {
        property: "og:description",
        content: "JobNetWork helps job seekers discover jobs, internships and career resources.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

const points = [
  {
    title: "Discover jobs and internships",
    text: "Search listings and filter by role, job type, work mode and experience level, from first internships to senior roles.",
  },
  {
    title: "Career resources",
    text: "Interview preparation material and guides to help you get ready for the roles you want.",
  },
  {
    title: "Track every application",
    text: "Save a listing to your private tracker and follow it through each stage, from saved to offer, with interviews and reminders.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">JobNetWork Tracker</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/jobs">Browse jobs</Link>
            </Button>
            <Button asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">About JobNetWork</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          JobNetWork helps job seekers discover jobs, internships and career resources, for
          students, freshers and experienced professionals alike.
        </p>

        <section className="mt-12 grid gap-6 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="rounded-xl border bg-card p-6">
              <h2 className="font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/jobs">Browse jobs</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
