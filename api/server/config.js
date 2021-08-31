import dotenv from "dotenv"



/*
.env injected from compose file, or use
// dotenv.config({
//     path: "server/.env"
// });
*/
dotenv.config();


const configs = {
    env: {
        current: process.env.ENV_CURRENT,
        prod: process.env.ENV_PROD,
        dev: process.env.ENV_DEV,
    
    },
    server: {
        port: process.env.PORT,
        host: process.env.HOST
    }
};

export default configs; /*if file name and this same, throwing error*/