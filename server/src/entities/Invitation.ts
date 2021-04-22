import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Invitation extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  fromUserId: number;

  @ManyToOne(() => User, user => user.sentInvitations)
  fromUser: User;

  @Column()
  toEmail: string;

  @Column()
  key: string;

  @Column({ default: false })
  claimed: boolean;

}