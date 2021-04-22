import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Friendship extends BaseEntity{

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @PrimaryColumn()
  friend1Id: number;

  @PrimaryColumn()
  friend2Id: number;

  @ManyToOne(() => User, user => user.friendships)
  @JoinColumn()
  friend1: User;

  @ManyToOne(() => User)
  friend2: User;

}