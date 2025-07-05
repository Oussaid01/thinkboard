import express from "express";
import dotenv from "dotenv"
import cors from 'cors'

import { connectDB } from "./config/db.js";
import notesRoutes from './routes/notesRoutes.js'
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config()
const PORT = process.env.PORT
const app = express();


// middleware 
app.use(express.json())

app.use(cors({
    origin : "http://localhost:5173",
}))

app.use(rateLimiter)
app.use("/api/notes",notesRoutes)


connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server started on PORT : ",PORT)
    });
})

