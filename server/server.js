import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongoDBConnect.js';

dotenv.config();
connectDB();

import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server started at http://localhost:${PORT} and is running on PORT: ${PORT}`
  );
});
