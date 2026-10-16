const supportedStatuses = new Set(["NORMAL", "WATCH", "WARNING", "HIGH", "OFFLINE"]);
const numericFields = ["apci", "tilt", "crack", "settlement", "moisture", "vibration", "battery", "rssi", "snr"];

function numberOrFallback(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function safeText(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]);
}

/**
 * Converts an untrusted backend sensor record into the renderer's stable
 * monitoring-node shape. Views can rely on this shape and never parse API
 * aliases directly.
 */
export function normalizeMonitoringNode(raw, fallback) {
  const source = raw && typeof raw === "object" ? raw : {};
  const requestedStatus = String(source.status || source.risk_level || fallback.status).toUpperCase();
  const normalizedSource = Object.fromEntries(Object.entries(source).map(([key, value]) => [key, typeof value === "string" ? safeText(value) : value]));
  for (const field of numericFields) {
    if (field in normalizedSource) normalizedSource[field] = numberOrFallback(normalizedSource[field], fallback[field]);
  }

  return {
    ...fallback,
    ...normalizedSource,
    id: safeText(source.id || source.node_id || fallback.id),
    location: safeText(source.location || source.name || fallback.location),
    zone: safeText(source.zone || fallback.zone),
    status: supportedStatuses.has(requestedStatus) ? requestedStatus : fallback.status,
    lat: numberOrFallback(source.lat ?? source.latitude, fallback.lat),
    lng: numberOrFallback(source.lng ?? source.lon ?? source.longitude, fallback.lng),
    pos: [...fallback.pos]
  };
}

export function riskFromScore(score, thresholds) {
  if (score <= thresholds[0]) return "NORMAL";
  if (score <= thresholds[1]) return "WATCH";
  if (score <= thresholds[2]) return "WARNING";
  return "HIGH";
}
