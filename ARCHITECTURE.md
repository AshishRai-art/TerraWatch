# TerraWatch architecture

TerraWatch remains an Electron desktop prototype. Its renderer is deliberately framework-free, but its responsibilities are now separated so the current UI can evolve without moving to a different stack.

| Directory | Responsibility | May depend on |
| --- | --- | --- |
| `src/models` | Stable monitoring-node shape, risk-band rules, labelled prototype seed data | Nothing outside the directory |
| `src/services` | Sensor transport and the preload-mediated AI request boundary | Models and configuration |
| `src/controllers` | Coordinates a user-initiated/initial refresh and publishes a structured result | Services |
| `app.js` | Renderer view: templates, event presentation, small UI state, accessibility affordances | Models, services, controllers |
| `main.js` | Electron lifecycle and privileged Gemini request handling | Environment configuration |
| `preload.js` | Minimal, context-isolated bridge only | Electron IPC |

Prototype readings are intentionally stored in the model layer and shown as simulated throughout the UI. A FastAPI `/sensors` response is normalized before it reaches any view. If it is unavailable, the UI keeps the explicitly labelled local prototype data and reports the backend as unavailable rather than fabricating a successful connection.

## Boundaries

- The renderer never receives `GEMINI_API_KEY`; the key is read only in `main.js`.
- Views must not fetch APIs directly or normalize transport payloads.
- Services return structured `ok`, `source`, `nodes`, and `error` results; controllers decide when to update the view state.
- Any server-side deployment of `api/analyze.js` remains an optional adapter. The Electron UI uses the IPC bridge so it does not issue a broken relative `/api/analyze` request.
