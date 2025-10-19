import { createServer } from './server/index.ts';

const app = createServer();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
