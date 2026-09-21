# Virtual Infrastructure Dashboard

## Goal
Build a responsive, dark monitoring dashboard for the simulated Virtual Computing Infrastructure module. It will visualize infrastructure state and execution results only, with no orchestration or placement logic.

## Dashboard
- Add the project title, simulation subtitle, live timestamp, and clear simulation-only indicator.
- Add five summary cards for IoT devices, edge nodes, cloud nodes, active workloads, and system health.
- Build an IoT → Edge → Cloud topology with all requested nodes, directional links, and online/busy/offline states.
- Add Edge-01, Edge-02, and Edge-03 monitoring cards with CPU, memory, network, workload count, and status.
- Add interactive resource charts for CPU, memory, network bandwidth, and energy consumption using simulated time-series data.
- Add responsive active-workload and execution-history tables with the requested fields.
- Add a scrolling live event feed with realistic simulated infrastructure events.

## Visual Direction
- Use a restrained dark control-room aesthetic with crisp grid lines, compact typography, cyan/green operational signals, amber warnings, and red failures.
- Keep information dense and scannable without generic admin navigation or decorative effects.
- Add subtle live indicators and topology flow animation while respecting reduced-motion settings.

## Technical Details
- Implement the experience at `/` using React and Tailwind CSS.
- Define all colors, typography, shadows, and animation values as semantic tokens in the global design system.
- Use lightweight SVG charts with selectable time windows and hover details; no backend or external infrastructure connection.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify desktop and mobile layouts in the running preview, including charts, tables, topology, and overflow behavior.
