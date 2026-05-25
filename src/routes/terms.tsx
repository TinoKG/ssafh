import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Use" }] }),
  component: () => (
    <article className="max-w-3xl mx-auto px-6 py-20 prose">
      <h1 className="text-4xl font-semibold">Terms of Use</h1>
      <p className="mt-6">This website is informational and does not constitute medical advice. By using this site you agree not to misuse the inquiry forms or attempt to access non-public areas.</p>
    </article>
  ),
});