export interface IService<Entity, CreateEntityDto, UpdateEntityDto> {
    create(createEntityDto: CreateEntityDto): Promise<Entity|any>;
    update(updateEntityDto: UpdateEntityDto): Promise<Entity>;
    findAll(): Promise<Entity[]>;
    remove(id: number): void;
    findById(id: number): Promise<Entity | null>;
}