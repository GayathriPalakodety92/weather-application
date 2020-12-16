import React from "react";

import HourlyForecastCard from "./HourlyForeCastCard.js";
function HourlyForecast(props) {
  function getDayName(dateStr, locale) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "short" });
  }
  let day1,
    day2,
    day3,
    day4,
    day5 = [];
    
  if (props.data[0]) {
    let firstDay = getDayName(props.data[0].dt_txt);

    const result = props.data.filter(
      (el) => getDayName(el.dt_txt) === firstDay
    );
    let count = result.length;
    day1 = props.data.slice(0, count);
    day2 = props.data.slice(count, (count += 8));
    day3 = props.data.slice(count, (count += 8));
    day4 = props.data.slice(count, (count += 8));
    day5 = props.data.slice(count, (count += 8));
  }

  return props.data.length ? (
    <div>
      <HourlyForecastCard data={day1} />
      <HourlyForecastCard data={day2} />
      <HourlyForecastCard data={day3} />
      <HourlyForecastCard data={day4} />
      <HourlyForecastCard data={day5} isLast={true} />
    </div>
  ) : (
    ""
  );
}

export default HourlyForecast;
