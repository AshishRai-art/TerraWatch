import test from "node:test";
import assert from "node:assert/strict";
import { normalizeMonitoringNode, riskFromScore } from "../src/models/monitoring-node.mjs";
import { createPrototypeNodes } from "../src/models/prototype-data.mjs";
import { fetchMonitoringNodes } from "../src/services/sensor-service.mjs";
import { askAssistant } from "../src/services/assistant-service.mjs";

const fallback = createPrototypeNodes()[0];

test("normalizes API coordinate aliases without losing the stable view shape", () => {
  const node = normalizeMonitoringNode({ node_id: "N99", latitude: "11.4", longitude: "77.2", risk_level: "watch" }, fallback);
  assert.equal(node.id, "N99");
  assert.equal(node.lat, 11.4);
  assert.equal(node.lng, 77.2);
  assert.equal(node.status, "WATCH");
  assert.deepEqual(node.pos, fallback.pos);
});

test("unknown status safely falls back and score bands remain ordered", () => {
  assert.equal(normalizeMonitoringNode({ status: "unsafe-new-status" }, fallback).status, "NORMAL");
  assert.equal(riskFromScore(19, [19, 44, 69]), "NORMAL");
  assert.equal(riskFromScore(45, [19, 44, 69]), "WARNING");
});

test("sensor service returns normalized live records", async () => {
  const result = await fetchMonitoringNodes({
    baseUrl: "http://localhost:8000/",
    fallbackNodes: createPrototypeNodes(),
    fetchImpl: async (url, options) => {
      assert.equal(url, "http://localhost:8000/sensors");
      assert.equal(options.headers.Accept, "application/json");
      return { ok: true, json: async () => ({ sensors: [{ id: "N03", lat: 12.1, lon: 77.4, status: "warning", apci: "61" }] }) };
    }
  });
  assert.equal(result.ok, true);
  assert.equal(result.source, "backend");
  assert.equal(result.nodes[0].apci, 61);
  assert.equal(result.nodes[0].lng, 77.4);
});

test("sensor service fails closed to labelled prototype data", async () => {
  const fallbackNodes = createPrototypeNodes();
  const result = await fetchMonitoringNodes({
    baseUrl: "http://localhost:8000",
    fallbackNodes,
    fetchImpl: async () => { throw new Error("connection refused"); }
  });
  assert.equal(result.ok, false);
  assert.equal(result.source, "prototype");
  assert.equal(result.nodes.length, fallbackNodes.length);
  assert.match(result.error, /connection refused/);
});

test("assistant service accepts only a narrow, valid bridge request", async () => {
  const calls = [];
  const bridge = { ask: async (...args) => { calls.push(args); return { ok: true, answer: "Prototype-only answer." }; } };
  const result = await askAssistant({ bridge, question: "  Summarize N03  ", context: { nodes: [] }, maxLength: 30 });
  assert.deepEqual(result, { ok: true, answer: "Prototype-only answer." });
  assert.deepEqual(calls, [["Summarize N03", { nodes: [] }]]);
  assert.equal((await askAssistant({ bridge, question: "x".repeat(31), context: {}, maxLength: 30 })).ok, false);
  assert.equal((await askAssistant({ bridge: null, question: "hello", context: {} })).ok, false);
});
