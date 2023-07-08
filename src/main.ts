import e from "express"
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import "reflect-metadata"
import { DatabaseConfig } from "./configs/db.config";
import { AuthController } from "./auth/auth.controller";
dotenv.config()
class App {
    private app: Express.Application | any;
    private port:number;
    constructor() {
        this.app = e();
        this.port = parseInt(process.env.PORT?.trim() || '3000')
        this.run()
    }
    private configRoute = () => {
        this.app.use('/', new AuthController().route)
    }
    private configApp = () => {
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use(bodyParser.json())
        new DatabaseConfig()
    }
    private run = () => {
        this.configApp()
        this.configRoute()
        this.app.listen(this.port, ()=>{
            console.log(`Running on http://localhost:${this.port}`);
        })
    }
}
new App()