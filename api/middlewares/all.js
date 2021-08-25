import { validationResult  } from "express-validator";
import log from "../logger.js";


const authenticate_middleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const items = authHeader.split(' ');
        /*check count 2*/
        /*check 1st item is barner*/
        /*check and validate 2nd item*/
        const token = items[1];

        let user = {
            id: 1,
            token: token
        }
        req.user = user;
        next();
    } else {
        res.sendStatus(401);
    }
};

const developer_middleware = (req, res, next) => {
    const authHeader = req.headers.developer;   /*all lower case apiKey was undefined*/
    if (authHeader) {
        let developer = {
            id: 1,
            apiKey: authHeader
        }
        req.developer = developer;
        next();
    } else {
        res.sendStatus(401);
    }
};

/*https://express-validator.github.io/docs/running-imperatively.html*/
const validate_middleware = validations => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  };

/*https://dev.to/nedsoft/central-error-handling-in-express-3aej*/
const error_middleware = (err, req, res, next) => {
    console.log(err)
    const logId = log.error(err.stack, req.id)
	return res.status(500).json({
		message: "Internal server error",
        errorLogId: logId
	});
};

/*http://expressjs.com/en/resources/middleware/response-time.html*/
const responseTime_middleware = function (req, res, time) {
	let display_time = `${time}ms`
	console.log(`${req.method}\t${req.originalUrl}\t${res.statusCode}\t${display_time}`)
	res.setHeader("X-Response-Time", display_time)	
};

export default authenticate_middleware;
export let authenticate = authenticate_middleware;
export let developer = developer_middleware;
export let errorHandeler = error_middleware;
export let validate = validate_middleware;
export let responseTimeViewer = responseTime_middleware;