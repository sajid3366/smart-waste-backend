import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from './routes/authRoutes.js';

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))


app.get('/health', (req, res) => res.json({ status: 'ok', service: 'auth' }));

app.get('/', (req, res) => {
    res.send('Smart Waste [auth] is running properly')
})

// Routes
app.use('/api/auth', authRoutes);




export default app;
