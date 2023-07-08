import { DataSource } from "typeorm";
import * as dotenv from "dotenv"
dotenv.config()
export class DatabaseConfig {
    public static dataSource: DataSource;
    constructor() {
        DatabaseConfig.dataSource = new DataSource({
            type: "mysql",
            host: process.env.HOST_DB,
            port: parseInt(process.env.PORT_DB || "3306"),
            username: process.env.USERNAME,
            password: process.env.PASSWORD_,
            database: process.env.DATABASE,
            synchronize: true,
            logging: true,
            entities: []
        })
        DatabaseConfig.dataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            })
    }
}