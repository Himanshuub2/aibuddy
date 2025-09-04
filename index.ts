import express from "express";
import cors from 'cors'
import aiRouter from "./routes/ai";
import authRouter from "./routes/auth";
import errorHandler from "./middleware/errorHandler";
import passportInstance from './passport/init';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
	origin: [
		'http://localhost:5173', // Vite dev server (removed trailing slash)
		'http://localhost:3000', // In case you serve from same port
		'http://127.0.0.1:5174', // Alternative localhost
		'http://localhost:4173', // Vite preview
		process.env.VM_IP,
	],
	credentials: true, // Important for cookies/auth
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'Accept',
		'Origin',
		'Cache-Control'
	],
	exposedHeaders: ['Set-Cookie'], // If you're using cookies
}))

app.use('/api/ai', aiRouter);
app.use('/api/auth', authRouter);

app.use(passportInstance.initialize());


// Error handler must be registered AFTER all routes
app.use(errorHandler);
if (process.env.NODE_ENV === 'development') {
	console.log('here')
	app.use(express.static(path.join(__dirname, './client/dist')));
	app.get('/{*any}', (req, res) => {
		res.sendFile(path.join(__dirname, './client/dist/index.html'));
	});
}


app.listen(process.env.PORT, () => {
	console.log("Server is running on port- ", process.env.PORT);
})