export type CalendarEvt = {
  text: string;
  url: string;
  date: string;
};

export type CalendarEvtGroup = {
  today: CalendarEvt[];
  tomorrow: CalendarEvt[];
  week: CalendarEvt[];
  future: CalendarEvt[];
};

export type CalendarEvtResult = {
  getCalendarEvts: {
    error?: string;
    calendar?: CalendarEvtGroup;
  };
};
