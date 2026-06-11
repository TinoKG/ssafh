import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy" },
      { name: "description", content: "How we handle your information." },
    ],
  }),
  component: () => (
    <article className="max-w-3xl mx-auto px-6 py-20 prose">
      <h1 className="text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <p className="mt-6">
        We collect only the information you submit through our inquiry forms (name, contact details,
        message) and use it solely to respond to your request. We do not sell or share your
        information. For California, Washington, and similar requests, contact us to access,
        correct, or delete your data.
      </p>
    </article>
  ),
});
