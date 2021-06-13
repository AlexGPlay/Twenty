import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class ProfileComment extends BaseEntity {
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
  @Column()
  comment: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.profileComments)
  commentedTo: User;

  @Field(() => Int)
  @Column()
  commentedToId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentProfileComments)
  commentedBy: User;

  @Field(() => Int)
  @Column()
  commentedById: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  replyToId: number;
}
