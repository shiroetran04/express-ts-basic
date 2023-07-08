import { SignInDto } from "../dto/sign-in.dto";
import { UserService } from "../services/user.service";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()
export class AuthService {
    private userService: UserService
    constructor() {
        this.userService = new UserService()
    }
    async signIn(signInDto: SignInDto) {
        const user = await this.userService.findByUserName(signInDto.username);
        if (!user) return {
            status: false,
            data: null
        };
        if (user.password !== signInDto.password) return {
            status: false,
            data: null
        };
        const payload = {
            id: user?.id,
            username: user?.username,
            firstName: user?.firstName,
            lastname: user?.lastName,
            phoneNumber: user?.phoneNumber,
            address: user?.address,
            email: user?.email
        }
        const accressToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "", {
            expiresIn: '20h',
        })
        let refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "", {
            expiresIn: '40h',
        })
        if (user.refreshToken && user.refreshToken?.length > 0) {
            refreshToken = user.refreshToken
        } else {
            //@ts-ignore
            await this.userService.updateRefreshToken(refreshToken, user.id)
        }
        return {
            status: true,
            data: {
                payload: payload,
                accressToken: accressToken,
                refreshToken: refreshToken
            }
        }
    }
}