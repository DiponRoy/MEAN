import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";
import responseTime from 'response-time';


import config from './config.js'
import helloRoutes from './routes/hello.js'
import authRoutes from './routes/auth.js'
import { errorHandeler, responseTimeViewer } from './middlewares/all.js'


// App
const app = express();

// Constants
const host = config.server.host;
const port = config.server.port;
const env = config.env.current

const apiDocOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
	},
	apis: ["./routes/*.js"],
};

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

/*responseTime*/
app.use(responseTime(function (req, res, time) {
	responseTimeViewer(req, res, time)
}));

// app.use((req, res, next) => {
// 	console.log("before any call")
// });
 

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(apiDocOptions)));
app.use("/api/hello", helloRoutes)
app.use("/api/auth", authRoutes)


/*
Error Handeler
it should be just before app.listen()
*/
app.use((err, req, res, next) => {
	errorHandeler(err, req, res, next)
});

// app.use((req, res) => {
// 	console.log("after any call")
// });

app.listen(port, host);
console.log(`App running on http://${host}:${port} with ${env} environment settings`);