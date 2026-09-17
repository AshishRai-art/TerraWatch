# TERRAWATCH — original prototype source

This is the original prototype code recovered from the existing `TERRAWATCH.AppImage` on this laptop. It is the version from before the live AI-provider and OpenStreetMap integrations.

It retains the original simulated dashboard, mine-layout visual, scenario demo, node analytics, APCI prototype, simulated assistant, reports, and remote-inspection screens.

## Run in VS Code

Open this folder in VS Code. Then open **Terminal → New Terminal** and run each command separately:

```bash
npm install
npm start
```

The only addition to the recovered source is the `start` command and Electron development dependency in `package.json`, so that it can be installed and run from VS Code. The prototype application code itself is the recovered original code.
