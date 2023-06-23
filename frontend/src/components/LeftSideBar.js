// @flow
import * as React from "react";
import home from "../img/Home.png";
import use from "../img/Use.png";
import timesheet from "../img/Timesheet.png";
import setting from "../img/Setting.png";
import vector from "../img/Vector.png";

export function LeftSideBar({ timer }) {
  const currentHour = new Date().getHours();
  const isAM = currentHour >= 0 && currentHour < 12;

  return (
    <div
      className="leftSideBar"
      style={{
        width: "102px",
        marginTop: "69px",
        marginBottom: "70px",
        marginLeft: "74px",
        backgroundColor: "#6F6AF2",
        textAlign: "center",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          marginBottom: "132px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "35px",
          }}
        >
          <p style={{ fontSize: "28px", fontWeight: "900", color: "white" }}>
            {isAM ? "AM" : "PM"}
          </p>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "900",
              color: "white",
              margin: "0",
            }}
          >
            RIKEI
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "30px",
        }}
      >
        <div className="styleIconSideBar">
          <img src={home} alt="home" />
          <p>ホーム</p>
        </div>
        <div className="styleIconSideBar">
          <img src={use} alt="use" />
          <p>ユーザー</p>
        </div>
        <div className="styleIconSideBar">
          <img src={timesheet} alt="timesheet" />
          <p>タイムシート</p>
        </div>
        <div className="styleIconSideBar">
          <img src={setting} alt="setting" />
          <p>設定</p>
        </div>
      </div>
      <div>
        <div
          className="styleIconSideBar"
          style={{
            marginTop: "186px",
            marginBottom: "35px",
          }}
        >
          <img src={vector} alt="vector" />
          <p>ログアウト </p>
        </div>
      </div>
    </div>
  );
}
