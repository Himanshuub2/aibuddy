import express from "express";
import cors from 'cors'
import aiRouter from "./routes/ai";
import authRouter from "./routes/auth";
import sendEmail from "./twilio";
import errorHandler from "./middleware/errorHandler";


const app = express();
app.use(cors())
app.use(express.json());

app.use('/ai', aiRouter);
app.use('/auth', authRouter);

// Error handler must be registered AFTER all routes
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})