import { CalendarEvtResult } from "./calendarEvts.d";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { client } from "../graphql/client";

export function useCalendarEventsQuery() {
  return useQuery<CalendarEvtResult>("calendarEvts", () => {
    return client.request(
      gql`
        query {
          getCalendarEvts {
            error
            calendar {
              today {
                text
                url
                date
              }
              tomorrow {
                text
                url
                date
              }
              week {
                text
                url
                date
              }
              future {
                text
                url
                date
              }
            }
          }
        }
      `
    );
  });
}
