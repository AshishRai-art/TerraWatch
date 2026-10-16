import { normalizeMonitoringNode } from "../models/monitoring-node.mjs";

function sensorArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") return payload.sensors || payload.nodes || payload.data || [];
  return [];
}

export async function fetchMonitoringNodes({ baseUrl, fallbackNodes, timeoutMs = 7000, fetchImpl = fetch }) {
  const controller = typeof AbortController === "undefined" ? null : new AbortController();
  const timeout = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const response = await fetchImpl(`${baseUrl.replace(/\/$/, "")}/sensors`, {
      headers: { Accept: "application/json" },
      signal: controller?.signal
    });
    if (!response.ok) throw new Error(`Sensor endpoint returned HTTP ${response.status}.`);

    const records = sensorArray(await response.json());
    if (!Array.isArray(records) || records.length === 0) throw new Error("Sensor endpoint returned no records.");

    return {
      ok: true,
      source: "backend",
      nodes: records.map((record, index) => {
        const fallback = fallbackNodes.find(node => node.id === (record?.id || record?.node_id)) || fallbackNodes[index % fallbackNodes.length];
        return normalizeMonitoringNode(record, fallback);
      })
    };
  } catch (error) {
    return {
      ok: false,
      source: "prototype",
      nodes: fallbackNodes.map(node => ({ ...node, pos: [...node.pos] })),
      error: error.name === "AbortError" ? "Sensor endpoint did not respond in time." : error.message
    };
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
