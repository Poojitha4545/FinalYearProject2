import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './infrastructure/db';
import RegistrationRouter from './api/Registration';
import userContentRouter from './api/userContent';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/api/registrations', RegistrationRouter);
app.use("/api/user-content", userContentRouter);
connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});