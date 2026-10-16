# TerraWatch

TerraWatch is an Electron desktop research prototype for mine-condition monitoring. It combines labelled simulated node data, a FastAPI-compatible sensor feed, maps, trend views, incident workflows, seismometer demonstration, reporting, and an optional Gemini-assisted explanation layer.

It is not a certified mine-safety system. All simulation alerts, incident states, AI observations, and remote-inspection views require human verification and site-specific engineering validation.

## Run locally

```bash
npm install
npm test
npm run check
npm start
```

The default screen is the light operations console. Use the appearance button in the header to switch to night mode. The two local demo accounts are deliberately visible for prototype evaluation only:

- `admin` / `admin123` — System Administrator
- `operator` / `operator123` — Safety Operator

This local sign-in view is not production authentication.

## Sensor data

On sign-in, TerraWatch requests `http://127.0.0.1:8000/sensors` by default. Set `window.TERRAWATCH_API_URL` before the renderer loads if your development endpoint differs. The service accepts either an array or an object containing `sensors`, `nodes`, or `data`.

Each sensor needs an `id` (or `node_id`), `latitude`/`lat`, `longitude`/`lng`/`lon`, and `status` (or `risk_level`). Fields such as `location`, `zone`, and `apci` are optional. Transport records are normalized before display. If the endpoint is unavailable, TerraWatch continues with clearly labelled local prototype data; it does not present that fallback as a successful live connection.

## Optional Gemini assistant

Copy `.env.example` to `.env` and set the key only in that local file:

```env
GEMINI_API_KEY=your_key_here
```

The key is loaded only by Electron's main process and exposed to the renderer through a narrow IPC call. The assistant enforces a short input limit and request timeout; if it is unavailable, the UI states that clearly and retains the local explanatory demo response.

`api/analyze.js` is retained as an optional serverless adapter for deployments that use one. The Electron app itself uses the IPC bridge, not a relative `/api/analyze` request.

## Architecture

The renderer stays framework-free, but source responsibilities are now separated. See [ARCHITECTURE.md](ARCHITECTURE.md) for dependency rules and the MVC-inspired layout.

## Verification

`npm test` covers core model normalization and risk thresholds. `npm run check` performs syntax checks for Electron entry points, renderer modules, services, models, and controller code. The project currently has no bundled production-packaging or lint configuration; Electron startup is the runtime smoke test.
