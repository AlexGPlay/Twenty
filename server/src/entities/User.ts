import { Invitation } from './Invitation';
import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column({unique: true})
  email!: string;

  @Column()
  password!: string;

  @Field(() => String)
  @Column({ default: '' })
  name!: string;

  @Field(() => String)
  @Column({ default: '' })
  surname!: string;

  @Field(() => Int)
  @Column({ default: 0 })
  visits!: Number;

  @Field(() => Int)
  @Column({ default: 10 })
  pendingInvitations!: Number;

  @OneToMany(() => Invitation, invitation => invitation.fromUser)
  sentInvitations: Invitation[];

}