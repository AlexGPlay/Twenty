import { Status } from "../entities/Status";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { ApolloContext } from "src/types";

@ObjectType()
class StatusError{
  @Field(() => Status, { nullable: true })
  status?: Status;

  @Field(() => String, { nullable: true })
  error?: string;
}

@Resolver(Status)
export class StatusResolver{

  @Query(() => StatusError)
  async currentStatus(@Ctx() { req }: ApolloContext){
    if(!req.session.userId) return { error: 'authentication error' };
    const currentStatus = await Status.findOne({ 
      where: { userId: req.session.userId },
      order: { id: 'DESC' }
    });

    if(!currentStatus) return { error: 'non existing status' };
    return { status: currentStatus };
  }

  @Mutation(() => StatusError)
  async createStatus(
    @Arg('status', () => String!) status: string,
    @Ctx() { req }: ApolloContext
  ): Promise<StatusError>{
    if(!req.session.userId) return { error: 'authentication error' };
    if(!status) return { error: 'error' };
    
    const statusInstance = await Status.create({
      userId: req.session.userId,
      status
    }).save();

    if(!statusInstance) return { error: 'status could not be created' };

    return { status: statusInstance };
  }

}

export default StatusResolver;