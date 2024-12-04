import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import professionalRoutes from './routes/professionalRoutes.js';
import professionalProfileRoute from './routes/professionalProfileRoute.js';
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
    'http://localhost:5173', // Your React frontend local environment
    'https://your-erlang-deploy-link.com', // Your Erlang deploy link
    'https://another-allowed-origin.com', // Add any other origins you need
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/professional', professionalProfileRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
