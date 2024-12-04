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
    'http://localhost:5173', // Local React environment
    'https://professionals-directory-new-frontend.vercel.app', // Deployed frontend on Vercel
    'https://professionals-directory-api-erdi.onrender.com', // API itself if needed
];

// CORS configuration
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (e.g., Postman or server-to-server)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.error(`Blocked by CORS: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials (cookies, auth headers, etc.)
    })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/professional', professionalProfileRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
