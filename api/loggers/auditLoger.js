import audit from 'express-requests-logger';
import bunyan from 'bunyan';


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
	serializers: bunyan.stdSerializers
});