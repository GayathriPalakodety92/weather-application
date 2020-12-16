import React from "react";

import { Card, Table } from "react-bootstrap";

function HourlyForecastCard(props) {
  function getDayName(dateStr, locale) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "short" });
  }

  if (props.data.length) {
    var day = getDayName(props.data[0] ? props.data[0].dt_txt : "", "en");
  }

  return (
    <Card className="mt-3" style={{ marginBottom: props.isLast ? "4rem" : "" }}>
      <h6 className="text-left p-2">{day}</h6>
      <Table striped hover responsive size="sm">
        <thead>
          <tr style={{ minWidth: "100px" }}>
            {props.data.length
              ? props.data.map((el) => {
                  return <th>{el.dt_txt.substr(11, 2)}</th>;
                })
              : ""}
          </tr>
        </thead>
        <tbody>
          <tr style={{ minWidth: "100px" }}>
            {props.data.length
              ? props.data.map((el) => {
                  return <td>{el.weather[0].description}</td>;
                })
              : ""}
          </tr>
          <tr style={{ minWidth: "100px" }}>
            {props.data.length
              ? props.data.map((el) => {
                  return (
                    <td style={{ padding: "5px" }}>
                      {el.main.temp} <span>&#8457;</span>
                    </td>
                  );
                })
              : ""}
          </tr>
        </tbody>
      </Table>
    </Card>
  );
}

export default HourlyForecastCard;
