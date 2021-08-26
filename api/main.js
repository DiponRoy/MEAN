import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";
import responseTime from 'response-time';
import addRequestId from 'express-request-id';
import audit from 'express-requests-logger';
import bunyan from 'bunyan';

import config from './config.js'
import helloRoutes from './routes/hello.js'
import authRoutes from './routes/auth.js'
import { errorHandeler, responseTimeViewer } from './middlewares/all.js'
import { auditLogger } from './logger.js'


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


/*https://github.com/PayU/express-request-logger*/
function reqSerializer(req) {
    return {
        id: req.id
    };
}
const log = bunyan.createLogger({
	name: 'audit log',
	streams: [
	  {
		level: 'info',
		path: './logs/audit.log'  // log ERROR and above to a file
	  }
	],
	serializers: reqSerializer
});

/*https://github.com/PayU/express-request-logger*/
app.use(audit({
    logger: log, 							// Existing bunyan logger
    excludeURLs: [], 						// Exclude paths which enclude 'health' & 'metrics'
    request: {
        maskBody: ["password"], 			// Mask 'password' field in incoming requests
        excludeHeaders: ["authorization"],	// Exclude 'authorization' header from requests
        excludeBody: ["creditCard"], 		// Exclude 'creditCard' field from requests body
        maskHeaders: [], 					// Mask 'header1' header in incoming requests
        // maxBodyLength: 50 				// limit length to 50 chars + '...'
    },
    response: {
        maskBody: ["session_token"], 		// Mask 'session_token' field in response body
        excludeHeaders: [], 				// Exclude all headers from responses,
        excludeBody: [], 					// Exclude all body from responses
        maskHeaders: [], 					// Mask 'header1' header in incoming requests
        // maxBodyLength: 50 				// limit length to 50 chars + '...'
    }
}));

/*
unique id to header
https://github.com/floatdrop/express-request-id
*/
app.use(addRequestId());

/*response time to header and console log*/
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