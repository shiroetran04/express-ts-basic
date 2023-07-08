import { DataSource, Repository } from "typeorm";
import { DatabaseConfig } from "../configs/db.config";
import { IRepo } from "../interfaces/repository.interface";
import { UserEntity } from "../models/user.model";

export class UserRepository implements IRepo<UserEntity>{
    getRepository() {
        return DatabaseConfig.dataSource.getRepository(UserEntity).extend({
            findByUserName: (username: string) => {
                return this.getRepository().findOne({
                    where: {
                        deleted: false,
                        username: username
                    }
                })
            },
            findByEmail: (email:string) => {
                return  this.getRepository().findOne({
                    where: {
                        deleted: false,
                        email: email
                    }
                })
            },
            findById: (id:number)=>{
                return  this.getRepository().findOne({
                    where:{
                        deleted:false,
                        id: id
                    }
                })
            },
            findByRefreshToken:(token:string)=>{
                return  this.getRepository().findOne({
                    where:{
                        refreshToken:token,
                        deleted:false
                    }
                })
            },
            updateToken: async (token:string, id:number)=>{
                const user:UserEntity|null = await this.getRepository().findById(id)
                if(user){
                    user.refreshToken = token;
                    this.getRepository().save(user);
                }
            }
        })
    }
}