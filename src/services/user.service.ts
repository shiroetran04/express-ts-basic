import { Repository } from "typeorm";
import { IService } from "../interfaces/service.interface";
import { UserEntity } from "../models/user.model";
import { UserRepository } from "../repositories/user.repo";
import { CreateUserDto } from "../dto/create-user.dto";

export class UserService implements IService<UserEntity, CreateUserDto, Object>{
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository();
    }
    async create(createEntityDto: CreateUserDto): Promise<UserEntity | any> {
        const userEmail = await this.userRepository
            .getRepository()
            .findByEmail(createEntityDto.email);
        if (userEmail) {
            return {
                message: "email is exits",
                data: null
            }
        }
        const userUserName = await this.userRepository
            .getRepository()
            .findByUserName(createEntityDto.username)
        if (userUserName) {
            return {
                message: "username is exits",
                data: null
            }
        }
        return await new Promise<UserEntity | any>(async (resolve, reject) => {
            try {
                const user = await this.userRepository
                    .getRepository()
                    .save(createEntityDto)
                resolve({
                    message: "create user successful",
                    data: user
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    async update(updateEntityDto: Object): Promise<UserEntity> {
        return await new Promise<UserEntity>(async (resolve, reject) => {
            try {
                const user: UserEntity = await this.userRepository.getRepository().save(updateEntityDto)
                resolve(user)
            } catch (error) {
                reject(error)
            }
        })
    }
    async findAll(): Promise<UserEntity[]> {
        return await new Promise<UserEntity[]>(async (resolve, reject) => {
            try {
                const users: UserEntity[] = await this.userRepository.getRepository().find({
                    where: {
                        deleted: false
                    }
                })
                resolve(users)
            } catch (error) {
                reject(error)
            }
        })
    }
    async remove(id: number): Promise<void> {
        const user: UserEntity | null = await this.userRepository.getRepository().findById(id)
        if (user) {
            user.deleted = true;
            await this.userRepository.getRepository().save(user);
        }
    }
    async findById(id: number): Promise<UserEntity | null> {
        return await new Promise<UserEntity | null>(async (resolve, reject) => {
            try {
                const user: UserEntity | null = await this.userRepository.getRepository().findById(id)
                resolve(user)
            } catch (error) {
                reject(error)
            }
        });
    }
    async findByUserName(username:string): Promise<UserEntity | null>{
        return await new Promise<UserEntity | null>(async (resolve, reject) => {
            try {
                const user: UserEntity | null = await this.userRepository.getRepository().findByUserName(username)
                resolve(user)
            } catch (error) {
                reject(error)
            }
        });
    }
    async findByRefreshToken(token: string): Promise<UserEntity | null> {
        return await new Promise<UserEntity | null>(async (resolve, reject) => {
            try {
                const user: UserEntity | null = await this.userRepository
                    .getRepository()
                    .findByRefreshToken(token)
                resolve(user)
            } catch (error) {
                reject(error)
            }
        });
    }
    async updateRefreshToken(token: string, id: number) {
        await this.userRepository.getRepository().updateToken(token, id)
    }
}