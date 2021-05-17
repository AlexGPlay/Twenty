import { Invitation } from './Invitation';
import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Friendship } from './Friendship';

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

  @Field(() => Date)
  @Column({ default: new Date(2000, 1, 1) })
  birthday!: Date;

  @Field(() => String)
  @Column({ default: '' })
  city!: string;

  @Field(() => String)
  @Column({ default: '' })
  country!: string;

  @Field(() => String)
  @Column({ default: '' })
  gender!: string;

  @Field(() => Int)
  @Column({ default: 0 })
  visits!: Number;

  @Field(() => Int)
  @Column({ default: 10 })
  pendingInvitations!: Number;

  @OneToMany(() => Invitation, invitation => invitation.fromUser)
  sentInvitations: Invitation[];

  @OneToMany(() => Friendship, friendship => friendship.friend1)
  friendships: Friendship[];

}