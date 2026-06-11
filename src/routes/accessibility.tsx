import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: "Accessibility Statement" }] }),
  component: () => (
    <article className="max-w-3xl mx-auto px-6 py-20 prose">
      <h1 className="text-4xl font-semibold">Accessibility</h1>
      <p className="mt-6">
        We aim to meet WCAG 2.1 AA: 18px+ body text, 4.5:1 contrast, keyboard navigation,
        descriptive alt text, labeled forms, and visible focus states. If you encounter a barrier,
        please contact us and we will address it promptly.
      </p>
    </article>
  ),
});
