import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Container, Row, Col, Tabs, Tab } from "react-bootstrap";

import { geolocated } from "react-geolocated";
import HourlyForecast from "../Components/HourlyForecast";
import Today from "../Components/Today";

function Location(props) {
  const [key, setKey] = useState("home");

  const [isLoading, setIsLoading] = useState(false);
  const [sys, setSys] = useState(false);
  const [coords, setCoords] = useState(0);
  const [mainData, setMainData] = useState(0);
  const [weather, setWeather] = useState(0);
  const [place, setPlace] = useState(0);
  const [foreCast, setForeCast] = useState(0);
  const [error, setError] = useState(0);
  const [api, setApi] = useState("30472f9117f851538c7e62d6193a1361");

  useEffect(() => {
    props.coords ? setCoords(props.coords) : console.log("nothing");
    if (props.coords) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${props.coords.latitude}&lon=${props.coords.longitude}&appid=${api}`
        )
        .then((response) => {
          setIsLoading(true);
          setMainData(response.data.main);
          setPlace(response.data.name);
          setWeather(response.data.weather[0]);
          setSys(response.data.sys);
          setIsLoading(false);

          console.log(response);
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        });

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${props.coords.latitude}&lon=${props.coords.longitude}&appid=${api}`
        )
        .then((response) => {
          setForeCast(response.data.list);
          console.log(response);
        })
        .catch((error) => {
          setError(error);

          console.log(error);
        });
    }
  }, [props.coords]);

  const dataToRender =
    !isLoading && weather ? (
      <Container className="mt-3">
        <Row className="">
          <Col>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}>
              <Tab eventKey="home" title="Today">
                <Today
                  place={place}
                  country={sys.country}
                  description={weather.description}
                  icon={weather.icon}
                  temp={mainData.temp}
                />
              </Tab>
              <Tab
                eventKey="profile"
                title="5 Day Temperatures"
                className="color-white">
                <HourlyForecast
                  data={foreCast[0] ? foreCast : ""}
                  day={foreCast[0] ? foreCast[0].dt_txt : ""}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    ) : (
      <Spinner
        animation="border"
        role="status"
        className="mt-2"
        style={{ color: "white" }}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  return !error ? (
    dataToRender
  ) : (
    <div>
      <h1>Sorry there was a problem loading the data</h1>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);
