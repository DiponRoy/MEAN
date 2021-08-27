import audit from 'express-requests-logger';
import bunyan from 'bunyan';



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