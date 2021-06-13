import { isAuth } from "./middleware/isAuth";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { ApolloContext } from "../types";
import { findCalendarEvts } from "../finders/calendar";
import { CalendarEvts, CalendarEvtGroup } from "./types/calendarTypes";

@Resolver()
export class CalendarResolver {
  @Query(() => CalendarEvts)
  @UseMiddleware(isAuth)
  async getCalendarEvts(@Ctx() { req }: ApolloContext): Promise<CalendarEvts> {
    const calendarResults = await findCalendarEvts(req.session.userId!);
    const calendar: CalendarEvtGroup = {
      today: [],
      tomorrow: [],
      week: [],
      future: [],
    };

    calendarResults.forEach((res) => {
      let calType;
      if (res.group === 0) calType = calendar.today;
      else if (res.group === 1) calType = calendar.tomorrow;
      else if (res.group === 2) calType = calendar.week;
      else if (res.group === 3) calType = calendar.future;
      if (!calType) return;
      calType.push({
        date: new Date(res.next_birthday).getTime().toString(),
        text: `${res.name} ${res.surname}`,
        url: `/profile/${res.id}`,
      });
    });

    return { calendar };
  }
}

export default CalendarResolver;
