# Hackathon Presentation Mode

## Goal
Add a one-click presentation mode that prioritizes the live system story for an audience while preserving the full monitoring dashboard.

## Changes
- Add a prominent presentation-mode toggle in the header, with a clear exit control and Escape-key support.
- In presentation mode, hide simulation controls, node-detail controls, secondary tables, resource selectors, and supporting footer content.
- Enlarge and reorganize the topology, headline metrics, active workload execution flow, and live event stream into a screen-friendly presentation layout.
- Keep simulated updates, node status, workload progress, and live events running so the demonstration remains dynamic.
- Preserve the existing full dashboard unchanged when presentation mode is off.

## Verification
- Check switching into and out of presentation mode on desktop and mobile.
- Confirm the priority panels remain readable, dynamic, and free of horizontal overflow or console errors.
