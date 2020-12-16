import React from "react";

import { Card, Col } from "react-bootstrap";

function Today(props) {
  return (
    <Col className="mt-3 pt-3">
      <h1
        style={{
          fontSize: "24px",
          color: "white",
        }}>{`${props.place},${props.country}`}</h1>

      <p
        style={{
          fontSize: "16px",
          color: "white",
        }}>
        {props.description}
      </p>
      <Card.Text>
        <img
          alt="icon"
          className="d-block m-auto"
          src={`http://openweathermap.org/img/wn/${props.icon}@4x.png`}
        />{" "}
        <span
          style={{
            fontSize: "34px",
            color: "white",
          }}>
          {props.temp}
          <sup className="pl-1">&#8457;</sup>
        </span>
      </Card.Text>
    </Col>
  );
}

export default Today;
