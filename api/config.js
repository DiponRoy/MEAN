import dotenv from "dotenv"
import { config } from "process";

dotenv.config();

const configs = {
    environment: process.env.ENVIROMMENT,
    server: {
        port: process.env.PORT,
        host: process.env.HOST
    }
};

export default configs; /*if file name and this same, throwing error*/