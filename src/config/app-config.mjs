export const appConfig = Object.freeze({
  apiBaseUrl: window.TERRAWATCH_API_URL || "http://127.0.0.1:8000",
  sensorRequestTimeoutMs: 7000,
  maxAssistantQuestionLength: 1200
});
