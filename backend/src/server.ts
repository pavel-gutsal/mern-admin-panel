// to use environment variables
require('dotenv').config();

import express from 'express';
import { router } from './routes/routes';
import { connectDB } from './config/db';
const cors = require("cors");

// initiating express app
const app = express();
const port = process.env.PORT || 8000;
connectDB();

app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})