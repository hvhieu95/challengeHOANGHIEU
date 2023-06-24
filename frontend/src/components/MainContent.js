import React from "react";
import checkOut from "../img/checkout.png";
import checkIn from "../img/checkin.png";
import overtime from "../img/Overtime.png";
import rest from "../img/Rest.png";

export function MainContent({ handleButtonClick, currentTime }) {
  return (
    <div
      className="content1"
      style={{
        width: "100%",
        marginTop: "60px",
        marginBottom: "70px",

        display: "flex",
        flexDirection: "row",
        columnGap: "25px",
        justifyContent: "center",
      }}
    >
      <button
        className="styleIconConten1"
        data-type="checkIn"
        onClick={() => handleButtonClick("checkIn", currentTime)}
      >
        <div className="mark1"></div>
        <div>
          <img src={checkIn} alt="checkIn" />
          <p> 出勤</p>
        </div>
      </button>
      <button
        className="styleIconConten1"
        data-type="checkOut"
        onClick={() => handleButtonClick("checkOut", currentTime)}
      >
        <div className="mark2"></div>
        <div>
          <img src={checkOut} alt="checkOut" />
          <p>退勤</p>
        </div>
      </button>
      <button className="styleIconConten1">
        <div className="mark3"></div>
        <div>
          <img src={overtime} alt="overtime" />
          <p>残業</p>
        </div>
      </button>
      <button className="styleIconConten1">
        <div className="mark4"></div>
        <div>
          <img src={rest} alt="rest" />
          <p>休憩</p>
        </div>
      </button>
    </div>
  );
}
