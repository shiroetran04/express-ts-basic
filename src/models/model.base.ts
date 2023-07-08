import { PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm"
export class EntityBase {
    @PrimaryGeneratedColumn({ name: "id" })
    public id: number | undefined;
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    public created_at: Date | undefined;
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    public updated_at: Date | undefined;
    @Column({
        name: "deleted",
        type: 'bool',
        default: false
    })
    public deleted: boolean | undefined;
}