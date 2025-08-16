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

app.get('/health', (req, res)=> res.json({status: 'ok', service: 'waste'}));

app.use('/api/waste', wasteRoutes);

app.get('/', (res, req) =>{
    res.send('Smart Waste [waste-service] is running properly')
})

export default app;