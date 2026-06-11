import { createFileRoute } from "@tanstack/react-router";
import { HeirloomLayout } from "@/components/heirloom/Layout";

export const Route = createFileRoute("/heirloom")({
  component: HeirloomLayout,
});
