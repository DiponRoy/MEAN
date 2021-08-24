import dotenv from "dotenv"
import { config } from "process";

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