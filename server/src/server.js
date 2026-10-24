import 'dotenv/config';
import app from './app.js';
import { APP_NAME, PORT,MONGODB_URI } from "./config/index.js";
import connectDB from './database/db.js';

const port = PORT || 5000;

try {
  await connectDB();
  
  app.listen(port, () => console.log(`${APP_NAME} running on http://localhost:${port}`));
} catch (err) {
  console.error('Failed to start server:', err.message);
  process.exit(1);
}
