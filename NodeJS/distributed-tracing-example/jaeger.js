// tracing.js
const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-grpc");
const grpc = require("@grpc/grpc-js");

// Create an exporter for sending traces to Jaeger
const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4317',
  credentials: grpc.credentials.createInsecure(),
});

// Set up the OpenTelemetry SDK to use the exporter
const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start the SDK
sdk.start()
  .then(() => console.log('Tracing initialized'))
  .catch((error) => console.log('Error initializing tracing', error));

// Export the sdk instance for use in other parts of the app
module.exports = sdk;
