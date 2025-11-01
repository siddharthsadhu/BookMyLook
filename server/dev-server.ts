import "dotenv/config";
import { createServer } from "./index.js";

const app = createServer();
const port = 3007; // Changed to 3007 to avoid port conflicts

console.log(`🔧 Starting server on port: ${port}`);
console.log(`🔧 PORT env var: ${process.env.PORT}`);

const server = app.listen(port, () => {
  console.log(`🚀 Express server running on port ${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  server.close(() => {
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  server.close(() => {
    process.exit(0);
  });
});

// Keep the process alive
process.stdin.resume();
