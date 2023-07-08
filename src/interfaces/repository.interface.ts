import { DataSource, Repository } from "typeorm";

export interface IRepo<Entity> {
    getRepository(): Repository<Entity | any>
}