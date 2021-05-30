import React from "react";
import Category from "../../../components/category/Category";
import { useCalendarEventsQuery } from "../../../queries/useCalendarEventsQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import styles from "./calendar.module.scss";

const Calendar: React.FC<{}> = () => {
  const { data, isLoading, isError } = useCalendarEventsQuery();

  console.log(data);

  const content = {
    today: "Hoy",
    tomorrow: "Mañana",
    week: "Próximos 7 días",
    future: "Futuros",
  };

  return isLoading || isError ? null : (
    <Category title="Calendario" paddingRight>
      {Object.keys(content).map((group, idx) => (
        <div className={styles.calendarGroup} key={idx}>
          {content[group]}{" "}
          {data.getCalendarEvts.calendar[group].length === 0 && (
            <span> no tienes ningún evento</span>
          )}
          {data.getCalendarEvts.calendar[group].map((birthday, idx) => (
            <div className={styles.evt} key={idx}>
              <FontAwesomeIcon icon={faGift} />
              <div>{birthday.text}</div>
              <div className={styles.date}>
                {format(parseInt(birthday.date), "PP", { locale: es })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </Category>
  );
};

export default Calendar;
