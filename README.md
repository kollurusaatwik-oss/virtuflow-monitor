# VirtuFlow Monitor

Create a professional web dashboard for a hackathon project called:

"Predictive IoT–Edge–Cloud Resource Orchestration"

I am responsible only for the Virtual Computing Infrastructure module.

IMPORTANT:

This is a simulation. There is NO real IoT hardware, Raspberry Pi, ESP32, AWS, Azure, or other physical infrastructure.

The dashboard must visualize a simulated computing infrastructure consisting of:

1. Virtual IoT devices

2. Virtual Edge nodes

3. Virtual Cloud infrastructure

4. Workloads currently being executed

5. Resource utilization

6. Execution metrics

7. Infrastructure events

Do NOT implement AI orchestration or workload placement decisions. The dashboard should only display infrastructure state and execution results.

Create a modern dark-themed dashboard.

Layout:

TOP:

- Project title: "Virtual IoT–Edge–Cloud Infrastructure"

- Subtitle: "Real-time Simulation & Resource Monitoring"

SUMMARY CARDS:

- IoT Devices

- Edge Nodes

- Cloud Nodes

- Active Workloads

- System Health

INFRASTRUCTURE TOPOLOGY:

Create a visual topology showing:

IoT Layer → Edge Layer → Cloud Layer

IoT devices:

IoT-01

IoT-02

IoT-03

IoT-04

IoT-05

Edge nodes:

Edge-01

Edge-02

Edge-03

Cloud:

Cloud-01

Show connections between the layers.

Each node should display an online/busy/offline status.

NODE MONITORING:

Create cards for each Edge node showing:

- CPU utilization

- Memory utilization

- Network utilization

- Active workloads

- Status

RESOURCE MONITORING:

Create interactive charts for:

- CPU utilization

- Memory utilization

- Network bandwidth

- Energy consumption

ACTIVE WORKLOADS:

Create a table with:

- Workload ID

- Source device

- Running node

- CPU requirement

- Memory requirement

- Status

- Execution time

EXECUTION HISTORY:

Show completed workloads with:

- Workload ID

- Node

- Execution time

- Latency

- Energy consumed

- Success/failure

LIVE EVENTS:

Create a scrolling activity log showing events such as:

"Workload W-101 started on Edge-02"

"Edge-02 CPU utilization increased to 82%"

"Workload W-101 completed"

"Edge-02 CPU utilization decreased to 48%"

Use realistic simulated data.

Make the dashboard responsive and visually polished.

Use cards, charts, tables, status indicators, and a clear infrastructure topology.

The dashboard should look like a professional monitoring/control center rather than a generic admin dashboard.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3b1e60b0-3de7-497d-bf1f-b3466c43cba2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
