import audit from 'express-requests-logger';
import bunyan from 'bunyan';


/*https://github.com/PayU/express-request-logger*/
const log = bunyan.createLogger({
	name: 'audit log',
	streams: [
	  {
		level: 'info',
		path: '../logs/audit.log'  // log ERROR and above to a file
	  }
	]
});


/*https://github.com/PayU/express-request-logger*/
const options = {
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
};
const handler = audit(options);


/*https://github.com/PayU/express-request-logger/issues/45*/
const additionalAudit = (req, name, value) => {
	if(!req.additionalAudit){
		req.additionalAudit = {};
	}
	req.additionalAudit[name] = value
};

export default additionalAudit;
export let addAuditLog = additionalAudit;
// export let auditLogHandler = handler;