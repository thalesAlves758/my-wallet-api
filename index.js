import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';

import errorHandler from './src/middlewares/errorHandler.js';
import router from './src/routes/index.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000; /* eslint-disable-line */

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
