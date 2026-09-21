import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/features/dashboard/dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Predictive IoT–Edge–Cloud Resource Orchestration" },
      { name: "description", content: "Virtual infrastructure monitoring dashboard for a simulated predictive IoT, edge, and cloud orchestration system." },
      { property: "og:title", content: "Predictive IoT–Edge–Cloud Resource Orchestration" },
      { property: "og:description", content: "A real-time visualization and monitoring dashboard for simulated IoT workloads, infrastructure, execution, and feedback metrics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});