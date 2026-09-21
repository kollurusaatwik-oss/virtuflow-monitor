import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Box,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  Radio,
  Server,
  TriangleAlert,
  Wifi,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Virtual IoT–Edge–Cloud Infrastructure" },
      { name: "description", content: "Real-time simulation and resource monitoring for a virtual IoT, edge, and cloud computing infrastructure." },
      { property: "og:title", content: "Virtual IoT–Edge–Cloud Infrastructure" },
      { property: "og:description", content: "A professional simulation dashboard for virtual infrastructure state, workloads, and execution metrics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

type Status = "online" | "busy" | "offline";
type MetricKey = "cpu" | "memory" | "network" | "energy";

const nodes = {
  iot: [
    ["IoT-01", "online"], ["IoT-02", "online"], ["IoT-03", "busy"],
    ["IoT-04", "online"], ["IoT-05", "offline"],
  ] as [string, Status][],
  edge: [["Edge-01", "online"], ["Edge-02", "busy"], ["Edge-03", "online"]] as [string, Status][],
  cloud: [["Cloud-01", "online"]] as [string, Status][],
};

const edgeNodes = [
  { name: "Edge-01", status: "online" as Status, cpu: 41, memory: 58, network: 33, workloads: 2 },
  { name: "Edge-02", status: "busy" as Status, cpu: 82, memory: 74, network: 67, workloads: 3 },
  { name: "Edge-03", status: "online" as Status, cpu: 27, memory: 39, network: 24, workloads: 1 },
];

const baseData = Array.from({ length: 24 }, (_, index) => ({
  time: `${String(16 + Math.floor(index / 6)).padStart(2, "0")}:${String((index % 6) * 10).padStart(2, "0")}`,
  cpu: [38,42,40,46,51,49,55,61,57,68,72,65,78,82,74,67,63,69,58,54,60,56,52,50][index],
  memory: [45,46,47,49,50,50,52,54,55,57,60,62,64,67,70,68,65,63,61,60,59,57,56,55][index],
  network: [320,410,380,520,680,590,720,810,690,940,1120,880,1240,1380,1190,1040,920,1080,820,760,690,810,740,680][index],
  energy: [1.1,1.2,1.2,1.3,1.4,1.4,1.5,1.6,1.5,1.8,1.9,1.7,2.1,2.2,2.0,1.9,1.8,1.9,1.7,1.6,1.7,1.6,1.5,1.5][index],
}));

const metricConfig: Record<MetricKey, { label: string; value: string; unit: string; icon: typeof Cpu }> = {
  cpu: { label: "CPU Utilization", value: "50", unit: "%", icon: Cpu },
  memory: { label: "Memory Utilization", value: "55", unit: "%", icon: Database },
  network: { label: "Network Bandwidth", value: "680", unit: "Mbps", icon: Wifi },
  energy: { label: "Energy Consumption", value: "1.5", unit: "kW", icon: Zap },
};

const workloads = [
  ["W-104", "IoT-02", "Edge-02", "40%", "512 MB", "Running", "00:00:12"],
  ["W-105", "IoT-01", "Edge-03", "25%", "256 MB", "Running", "00:00:04"],
  ["W-106", "IoT-03", "Edge-01", "60%", "1 GB", "Queued", "—"],
  ["W-107", "IoT-05", "Cloud-01", "80%", "2 GB", "Running", "00:00:29"],
];

const history = [
  ["W-103", "Edge-02", "4.2 s", "18 ms", "0.31 Wh", "Success"],
  ["W-102", "Edge-01", "6.8 s", "41 ms", "0.44 Wh", "Success"],
  ["W-101", "Edge-03", "3.1 s", "12 ms", "0.22 Wh", "Success"],
  ["W-100", "Cloud-01", "11.4 s", "120 ms", "0.88 Wh", "Failed"],
  ["W-099", "Edge-02", "5.0 s", "22 ms", "0.36 Wh", "Success"],
];

const events: Array<[string, string, "info" | "warning" | "success" | "critical"]> = [
  ["16:18:42", "Workload W-104 started on Edge-02", "info"],
  ["16:18:37", "Edge-02 CPU utilization increased to 82%", "warning"],
  ["16:18:31", "Workload W-103 completed", "success"],
  ["16:18:26", "Edge-02 CPU utilization decreased to 48%", "success"],
  ["16:18:18", "IoT-05 heartbeat timeout detected", "critical"],
  ["16:18:10", "Workload W-105 started on Edge-03", "info"],
  ["16:18:02", "Cloud-01 telemetry batch synchronized", "success"],
  ["16:17:54", "Edge-01 memory utilization reached 58%", "info"],
];

function Dashboard() {
  const [clock, setClock] = useState("16:18:42");
  const [range, setRange] = useState<"30m" | "1h" | "6h">("1h");
  const [metric, setMetric] = useState<MetricKey>("cpu");
  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date().toLocaleTimeString("en-GB", { hour12: false })), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const chartData = useMemo(() => range === "30m" ? baseData.slice(-12) : range === "6h" ? baseData.map((row, i) => ({ ...row, time: `${i + 1}:00` })) : baseData, [range]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1680px] px-3 py-4 sm:px-5 lg:px-7">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center border border-primary/40 bg-primary/10 text-primary"><Activity size={20} /></div>
            <div><h1 className="text-base font-semibold sm:text-xl">Virtual IoT–Edge–Cloud Infrastructure</h1><p className="font-mono text-[11px] text-muted-foreground sm:text-xs">Real-time Simulation &amp; Resource Monitoring</p></div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs">
            <span className="border border-warning/35 bg-warning/10 px-2.5 py-1.5 text-warning">SIMULATION ONLY</span>
            <span className="flex items-center gap-2 border border-border bg-card px-2.5 py-1.5 text-muted-foreground"><span className="status-dot bg-success" /> LIVE · {clock}</span>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          <Summary icon={Radio} label="IoT Devices" value="5" note="4 online · 1 offline" tone="primary" />
          <Summary icon={Server} label="Edge Nodes" value="3" note="2 online · 1 busy" tone="warning" />
          <Summary icon={Cloud} label="Cloud Nodes" value="1" note="Online · 62% load" tone="success" />
          <Summary icon={Box} label="Active Workloads" value="4" note="3 running · 1 queued" tone="primary" />
          <Summary icon={CheckCircle2} label="System Health" value="94%" note="Operational" tone="success" />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
          <Panel title="Infrastructure Topology" aside={<Legend />}>
            <div className="grid items-stretch gap-3 md:grid-cols-[1fr_64px_1fr_64px_1fr]">
              <TopologyLayer icon={Radio} title="IoT Layer" subtitle="Virtual sensors" items={nodes.iot} />
              <FlowArrow label="MQTT" />
              <TopologyLayer icon={Server} title="Edge Layer" subtitle="Virtual compute" items={nodes.edge} />
              <FlowArrow label="HTTPS" />
              <TopologyLayer icon={Cloud} title="Cloud Layer" subtitle="Virtual cluster" items={nodes.cloud} />
            </div>
          </Panel>
          <Panel title="Live Infrastructure Events" aside={<span className="flex items-center gap-2 font-mono text-[10px] text-success"><span className="status-dot bg-success" />STREAMING</span>}>
            <div className="event-mask h-[310px] overflow-hidden">
              <div className="event-scroll space-y-1.5">
                {[...events, ...events].map((event, i) => <EventRow key={`${event[0]}-${i}`} time={event[0]} text={event[1]} type={event[2]} />)}
              </div>
            </div>
          </Panel>
        </section>

        <section className="mt-4">
          <SectionTitle title="Edge Node Monitoring" subtitle="Live virtual node telemetry" />
          <div className="grid gap-3 lg:grid-cols-3">{edgeNodes.map((node) => <EdgeCard key={node.name} {...node} />)}</div>
        </section>

        <section className="mt-4">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <SectionTitle title="Resource Monitoring" subtitle="Aggregated infrastructure metrics" />
            <div className="flex border border-border bg-card p-0.5">{(["30m", "1h", "6h"] as const).map((item) => <button key={item} onClick={() => setRange(item)} className={`px-3 py-1 font-mono text-[10px] transition-colors ${range === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{item}</button>)}</div>
          </div>
          <div className="grid gap-3 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">{(Object.keys(metricConfig) as MetricKey[]).map((key) => <MetricButton key={key} active={metric === key} metricKey={key} onClick={() => setMetric(key)} />)}</div>
            <Panel title={metricConfig[metric].label} aside={<span className="font-mono text-sm text-primary">{metricConfig[metric].value} <span className="text-[10px] text-muted-foreground">{metricConfig[metric].unit}</span></span>}>
              <div className="h-[270px] w-full">
                <ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="metricFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02}/></linearGradient></defs><CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false}/><XAxis dataKey="time" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} minTickGap={30}/><YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} width={35}/><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 2, fontFamily: "var(--font-mono)", fontSize: 11 }} /><Area type="monotone" dataKey={metric} stroke="var(--primary)" strokeWidth={2} fill="url(#metricFill)" activeDot={{ r: 4, fill: "var(--primary)", stroke: "var(--background)" }}/></AreaChart></ResponsiveContainer>
              </div>
            </Panel>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <DataTable title="Active Workloads" columns={["Workload ID","Source Device","Running Node","CPU Req.","Memory Req.","Status","Execution Time"]} rows={workloads} statusIndex={5} />
          <DataTable title="Execution History" columns={["Workload ID","Node","Execution Time","Latency","Energy","Result"]} rows={history} statusIndex={5} />
        </section>
        <footer className="mt-5 flex flex-wrap justify-between gap-2 border-t border-border py-4 font-mono text-[10px] text-muted-foreground"><span>Virtual Computing Infrastructure module</span><span>No physical hardware or cloud provider connectivity</span></footer>
      </div>
    </main>
  );
}

function Summary({ icon: Icon, label, value, note, tone }: { icon: typeof Radio; label: string; value: string; note: string; tone: string }) {
  const toneClass = tone === "warning" ? "text-warning" : tone === "success" ? "text-success" : "text-primary";
  return <article className="summary-card"><div className="flex items-center justify-between"><span className="label">{label}</span><Icon size={15} className={toneClass} /></div><div className="mt-3 font-mono text-2xl font-semibold">{value}</div><p className="mt-1 font-mono text-[10px] text-muted-foreground">{note}</p></article>;
}
function Panel({ title, aside, children }: { title: string; aside?: React.ReactNode; children: React.ReactNode }) { return <article className="panel"><div className="mb-4 flex items-center justify-between gap-3"><h2 className="section-heading">{title}</h2>{aside}</div>{children}</article>; }
function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) { return <div className="mb-3"><h2 className="section-heading">{title}</h2><p className="mt-1 font-mono text-[10px] text-muted-foreground">{subtitle}</p></div>; }
function Legend() { return <div className="hidden items-center gap-3 font-mono text-[9px] text-muted-foreground sm:flex"><span className="flex items-center gap-1"><i className="status-dot bg-success"/>Online</span><span className="flex items-center gap-1"><i className="status-dot bg-warning"/>Busy</span><span className="flex items-center gap-1"><i className="status-dot bg-destructive"/>Offline</span></div>; }
function TopologyLayer({ icon: Icon, title, subtitle, items }: { icon: typeof Radio; title: string; subtitle: string; items: [string, Status][] }) { return <div className="topology-layer"><div className="mb-3 flex items-center gap-2"><Icon size={15} className="text-primary"/><div><h3 className="font-mono text-[11px] font-semibold">{title}</h3><p className="font-mono text-[9px] text-muted-foreground">{subtitle}</p></div></div><div className="space-y-2">{items.map(([name,status]) => { const statusClass = status === "online" ? "bg-success" : status === "busy" ? "bg-warning" : "bg-destructive"; return <div className="node" key={name}><span className={`status-dot ${statusClass}`}/><span className="font-mono text-[11px]">{name}</span><span className="ml-auto font-mono text-[8px] uppercase text-muted-foreground">{status}</span></div>; })}</div></div>; }
function FlowArrow({ label }: { label: string }) { return <div className="hidden items-center justify-center md:flex"><div className="w-full"><div className="flow-line"/><p className="mt-2 text-center font-mono text-[8px] text-muted-foreground">{label}</p></div></div>; }
function EventRow({ time, text, type }: { time: string; text: string; type: string }) { return <div className="flex gap-2 border-l border-border py-2 pl-3 font-mono text-[10px]"><span className="shrink-0 text-muted-foreground">{time}</span><span className={type === "critical" ? "text-destructive" : type === "warning" ? "text-warning" : type === "success" ? "text-success" : "text-foreground"}>{text}</span></div>; }
function EdgeCard(node: typeof edgeNodes[number]) { const busy = node.status === "busy"; return <article className={`panel ${busy ? "border-warning/40" : ""}`}><div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><Server size={15} className="text-primary"/><h3 className="font-mono text-sm font-semibold">{node.name}</h3></div><span className={`status-badge ${busy ? "text-warning" : "text-success"}`}><i className={`status-dot ${busy ? "bg-warning" : "bg-success"}`}/>{node.status}</span></div><div className="space-y-3"><Meter label="CPU" value={node.cpu}/><Meter label="Memory" value={node.memory}/><Meter label="Network" value={node.network}/></div><div className="mt-4 flex justify-between border-t border-border pt-3 font-mono text-[10px] text-muted-foreground"><span>Active workloads</span><span className="text-foreground">{node.workloads}</span></div></article>; }
function Meter({ label, value }: { label: string; value: number }) { const widthClass = (["w-20","w-30","w-40","w-50","w-60","w-70","w-80","w-90"] as const)[Math.max(0, Math.min(7, Math.round(value / 10) - 2))]; return <div><div className="mb-1.5 flex justify-between font-mono text-[10px] text-muted-foreground"><span>{label}</span><span className={value > 75 ? "text-warning" : "text-foreground"}>{value}%</span></div><div className="h-1.5 overflow-hidden bg-muted"><div className={`h-full ${value > 75 ? "bg-warning" : "bg-primary"} ${widthClass}`}/></div></div>; }
function MetricButton({ active, metricKey, onClick }: { active: boolean; metricKey: MetricKey; onClick: () => void }) { const item = metricConfig[metricKey]; const Icon = item.icon; return <button onClick={onClick} className={`metric-button ${active ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"}`}><Icon size={15} className={active ? "text-primary" : "text-muted-foreground"}/><span><span className="block text-left text-[10px] text-muted-foreground">{item.label}</span><span className="font-mono text-sm">{item.value} <small className="text-[9px] text-muted-foreground">{item.unit}</small></span></span></button>; }
function DataTable({ title, columns, rows, statusIndex }: { title: string; columns: string[]; rows: string[][]; statusIndex: number }) { return <Panel title={title} aside={<span className="font-mono text-[9px] text-muted-foreground">{rows.length} RECORDS</span>}><div className="overflow-x-auto"><table className="w-full min-w-[640px] border-collapse text-left font-mono text-[10px]"><thead><tr className="border-b border-border text-muted-foreground">{columns.map((column) => <th key={column} className="pb-2 pr-4 font-medium uppercase">{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border/60 last:border-0">{row.map((cell, i) => <td key={`${row[0]}-${i}`} className={`py-2.5 pr-4 ${i === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{i === statusIndex ? <span className={`inline-flex items-center gap-1.5 ${cell === "Failed" ? "text-destructive" : cell === "Queued" ? "text-warning" : "text-success"}`}><i className="status-dot"/>{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div></Panel>; }