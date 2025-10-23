import { createServer } from "./index.js";

const app = createServer();
const port = process.env.PORT || 3001; // Changed from 3000 to avoid conflicts

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
