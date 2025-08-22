import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import wasteRoutes from './routes/wasteRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.get('/waste/health', (req, res) => res.json({ status: 'ok', service: 'waste' }));
// Fix parameter order
app.get('/', (req, res) => {
    res.send('Smart Waste [waste-service] is running properly')
});
app.use('/waste', wasteRoutes);

export default app;