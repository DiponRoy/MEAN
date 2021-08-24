
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

/*https://dev.to/nedsoft/central-error-handling-in-express-3aej*/
const error_middleware = (err, req, res, next) => {
    console.log(err)
	return res.status(500).json({
		message: "Internal server error"
	});
};


export default authenticate_middleware;
export let authenticate = authenticate_middleware;
export let developer = developer_middleware;
export let errorHandeler = error_middleware;