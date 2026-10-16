import { fetchMonitoringNodes } from "../services/sensor-service.mjs";

/** Coordinates external telemetry with the renderer state; it does not render UI. */
export function createMonitoringController({ baseUrl, fallbackNodes, timeoutMs, onResult }) {
  return {
    async refresh() {
      const result = await fetchMonitoringNodes({ baseUrl, fallbackNodes, timeoutMs });
      onResult(result);
      return result;
    }
  };
}
