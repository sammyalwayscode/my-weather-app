import React, { useEffect, useState } from "react";
import "./Main.css";
import { Button, Input } from "antd";
import { RadiusUprightOutlined } from "@ant-design/icons";
import { MoreOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
// import CloudIcon from "@material-ui/icons/Cloud";
// import Storm from "../Images/storm.png";
import Drop from "../Images/drop.png";
import Rain from "../Images/rain.png";
import Wind from "../Images/wind.png";
import Stormy from "../Images/stormyy.png";
import Wind1 from "../Images/wind-1.png";
import Warm from "../Images/cloudy.png";
import Cold from "../Images/raining.png";
// import Sun from "../Images/sun.png";
import axios from "axios";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import { app } from "../SignUp/Base";

const BaseGet = app.firestore().collection("Authers");
function Main() {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [getBase, setGetBase] = useState([]);

  const GetAuthers = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await BaseGet.doc(newUser.uid)
        .get()
        .then((doc) => {
          setGetBase(doc.data());
        });
    }
  };

  React.useEffect(() => {
    GetAuthers();
  }, []);

  const showDate = new Date();

  const displayTime =
    showDate.getHours() +
    ":" +
    showDate.getMinutes() +
    ":" +
    showDate.getSeconds();

  const Search = async () => {
    const weatherURL = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=1dddec5bb1f81b184a2f5cf72a85e134`
    );
    console.log(weatherURL);

    if (weatherURL) {
      const data = await weatherURL.data;
      return setWeatherData(data);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    Search();
  }, []);

  // date builder
  const dateBuilder = (d) => {
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
  };
  return (
    <div className="GeneralDiv">
      <div className="SubGeneralDiv">
        {weatherData ? (
          <div className="WetherDivMain">
            <div className="WeatherUp">
              <div className="HeaderSearch">
                <RadiusUprightOutlined
                  style={{ color: "#fff", fontSize: "20px" }}
                />
                <div>
                  <Input
                    placeholder="Know Your Weather"
                    style={{ width: "160px" }}
                    onChange={handleChange}
                    value={input}
                  />
                  <Button
                    onClick={Search}
                    style={{
                      backgroundColor: "#4285f4",
                      border: "none",
                      outline: "none",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    Search
                  </Button>
                </div>
                <MoreOutlined style={{ color: "#fff", fontSize: "20px" }} />
              </div>
              <div
                style={{
                  color: "#fff",
                  marginTop: "5px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {weatherData.name}, {weatherData.sys.country}
              </div>
              <div>
                {" "}
                {typeof weatherData.main != "undefined" ? (
                  weatherData.main.temp > 300 ? (
                    <img
                      src={Warm}
                      alt="Tunderstorm"
                      style={{ width: "100px" }}
                    />
                  ) : (
                    <img
                      src={Cold}
                      alt="Tunderstorm"
                      style={{ width: "100px" }}
                    />
                  )
                ) : (
                  <img
                    src={Warm}
                    alt="Tunderstorm"
                    style={{ width: "100px" }}
                  />
                )}{" "}
              </div>
              <div
                style={{
                  fontSize: "50px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {Math.round(weatherData.main.temp)}°c
              </div>
              <div
                style={{ color: "#fff", fontSize: "18px", fontWeight: "600" }}
              >
                {weatherData.weather[0].description}
              </div>
              <div style={{ color: "#FBEB05", fontWeight: "600" }}>
                {" "}
                {dateBuilder(new Date())}{" "}
              </div>
              <hr />
              <div className="OtherWether">
                <div className="OtherContent">
                  <img src={Wind} alt="Wind" width="23px" />
                  <div>{weatherData.wind.speed}km/h</div>
                  <div style={{ fontWeight: "lighter" }}>Wind</div>
                </div>
                <div className="OtherContent">
                  <img src={Drop} alt="Wind" width="16px" />
                  <div>{weatherData.main.humidity}%</div>
                  <div style={{ fontWeight: "lighter" }}>Humidity</div>
                </div>
                <div className="OtherContent">
                  <img src={Rain} alt="Wind" width="20px" />
                  <div>{weatherData.cod}%</div>
                  <div style={{ fontWeight: "lighter" }}>COR</div>
                </div>
              </div>
            </div>
            <div className="WeatherDown">
              <div style={{ marginTop: "10px", color: "#ffffff" }}>Today</div>
              <div className="Days">
                <div className="Day1">
                  <div>98°</div>
                  <img src={Stormy} alt="Wind" width="20px" />
                  <div style={{ fontWeight: "lighter" }}>10:00</div>
                </div>
                <div className="Day2">
                  <div>{Math.round(weatherData.main.temp)}°</div>
                  <img src={Rain} alt="Wind" width="20px" />
                  <div style={{ fontWeight: "lighter" }}>Now</div>
                </div>
                <div className="Day1">
                  <div>154°</div>
                  <img src={Stormy} alt="Wind" width="20px" />
                  <div style={{ fontWeight: "lighter" }}>12:00</div>
                </div>
                <div className="Day1">
                  <div>212°</div>
                  <img src={Wind1} alt="Wind" width="20px" />
                  <div style={{ fontWeight: "lighter" }}>13:00</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="WetherDivMain">
            <div className="WeatherUp">
              <div className="HeaderSearch">
                <RadiusUprightOutlined
                  style={{ color: "#fff", fontSize: "20px" }}
                />
                <div>
                  <Input
                    placeholder="Know Your Weather"
                    style={{ width: "160px" }}
                    onChange={handleChange}
                    value={input}
                  />
                  <Button
                    onClick={Search}
                    style={{
                      backgroundColor: "#4285f4",
                      border: "none",
                      outline: "none",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    Search
                  </Button>
                </div>
                <MoreOutlined style={{ color: "#fff", fontSize: "20px" }} />
              </div>
              <div
                style={{
                  color: "#fff",
                  marginTop: "5px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {getBase && getBase.name}
              </div>
              <img
                src={getBase && getBase.Avatar}
                alt="Tunderstorm"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "500px",
                  backgroundColor: "darkcyan",
                }}
              />

              <div style={{ color: "#fff", textAlign: "center" }}>
                Use the search Input above to make a search
              </div>
              <div style={{ color: "#FBEB05", fontWeight: "600" }}>
                {" "}
                {dateBuilder(new Date())}{" "}
              </div>
              <hr />
              <div className="OtherWether">
                <div className="OtherContent">
                  <img src={Wind} alt="Wind" width="23px" />
                  <div>0km/h</div>
                  <div style={{ fontWeight: "lighter" }}>Wind</div>
                </div>
                <div className="OtherContent">
                  <img src={Drop} alt="Wind" width="16px" />
                  <div>0%</div>
                  <div style={{ fontWeight: "lighter" }}>Humidity</div>
                </div>
                <div className="OtherContent">
                  <img src={Rain} alt="Wind" width="20px" />
                  <div>0%</div>
                  <div style={{ fontWeight: "lighter" }}>COR</div>
                </div>
              </div>
            </div>
            <div className="WeatherDown">
              <div style={{ marginTop: "10px", color: "#ffffff" }}>Today</div>
              <div className="Days">
                <div className="Day1">
                  <div>
                    0<sup>0</sup>
                  </div>
                  <img src={Stormy} alt="Wind" width="20px" />
                  <div style={{ fontWeight: "lighter" }}>10:00</div>
                </div>
                <div className="Day2">
                  <div>
                    0<sup>0</sup>
                  </div>
                  <img src={Rain} alt="Wind" width="20px" />
                  <div style={{ fontWeight: "lighter" }}>Now</div>
                </div>
                <div className="Day1">
                  <div>
                    0<sup>0</sup>
                  </div>
                  <img src={Stormy} alt="Wind" width="20px" />
                  <div style={{ fontWeight: "lighter" }}>12:00</div>
                </div>
                <div className="Day1">
                  <div>
                    0<sup>0</sup>
                  </div>
                  <img src={Wind1} alt="Wind" width="20px" />
                  <div style={{ fontWeight: "lighter" }}>13:00</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="CalenderDivMain">
          <div className="TimeDiv">
            <div
              style={{ fontSize: "60px", fontWeight: "bold", color: "#fff" }}
            >
              {" "}
              {displayTime}{" "}
            </div>
          </div>
          <div className="CalendarDiv">
            <CalendarComponent></CalendarComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
