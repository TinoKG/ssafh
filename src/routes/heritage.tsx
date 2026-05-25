import { createFileRoute } from "@tanstack/react-router";
import { HeritageLayout } from "@/components/heritage/Layout";

export const Route = createFileRoute("/heritage")({
  component: HeritageLayout,
});