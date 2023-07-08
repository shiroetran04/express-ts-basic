import { Router } from "express"
import { AuthService } from "./auth.service"

export class AuthController{
    public route:Router|any
    private authService: AuthService
    private path:string = "/auth"
    constructor() {
        this.authService = new AuthService()
        this.route = Router()
        this.setRoute()
    }
    private setRoute = () => {
        this.route.post(`${this.path}/login`, this.authService.signIn)
    }
}