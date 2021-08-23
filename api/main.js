import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";

import helloRoutes from './routes/hello.js'
import authRoutes from './routes/auth.js'

// App
const app = express();

// Constants
const host = '0.0.0.0';
const port = 80;
const apiDocOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		// servers: [
		// 	{
		// 		url: "http://localhost:4000",
		// 	},
		// ],
	},
	apis: ["./routes/*.js"],
};

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(apiDocOptions)));
app.use("/api/hello", helloRoutes)
app.use("/api/auth", authRoutes)

app.listen(port, host);
console.log(`Running on http://${host}:${port}`);