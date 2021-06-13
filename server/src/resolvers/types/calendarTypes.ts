import { Field, ObjectType } from "type-graphql";

@ObjectType()
class CalendarEvt{
  @Field()
  text: string; 

  @Field()
  url: string; 

  @Field()
  date: string;
}

@ObjectType()
export class CalendarEvtGroup{
  @Field(() => [CalendarEvt])
  today: CalendarEvt[];

  @Field(() => [CalendarEvt])
  tomorrow: CalendarEvt[];

  @Field(() => [CalendarEvt])
  week: CalendarEvt[];

  @Field(() => [CalendarEvt])
  future: CalendarEvt[];
}

@ObjectType()
export class CalendarEvts{

  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => CalendarEvtGroup)
  calendar?: CalendarEvtGroup;
}