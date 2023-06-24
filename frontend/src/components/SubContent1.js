import * as React from "react";

export function SubContent1({ listTimer }) {
  const reversedList = [...listTimer].reverse(); // Đảo ngược danh sách
  return (
    <div style={{ flexBasis: "60%" }}>
      <h3
        style={{
          fontSize: "24px",
        }}
      >
        最近の活動
      </h3>

      <ul
        className="timeListContainer"
        style={{
          paddingInlineStart: "unset",
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          overflowY: "clip",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        {reversedList.map((time, index) => (
          <li key={index} className="styleList_sub">
            <div>{time.date}</div>
            <div>{time.time}</div>
            <div
              style={{
                backgroundColor: `${
                  time.action === "checkIn" ? "blue" : "red"
                }`,
                minWidth: "64px",
                minHeight: "33px",
                borderRadius: "5px",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                color: "white",
              }}
            >
              {time.action === "checkOut" ? "退勤" : "出勤"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
