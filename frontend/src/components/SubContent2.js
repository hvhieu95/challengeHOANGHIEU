import * as React from "react";
import moment from "moment";

export function SubContent2({ totalWorkTime }) {
  if (typeof totalWorkTime === "undefined" || !totalWorkTime) {
    return <div>Lỗi: Dữ liệu thời gian làm việc không khả dụng</div>;
  }

  return (
    <div style={{ flexBasis: "40%" }}>
      <h3
        style={{
          fontSize: "24px",
        }}
      >
        退勤統計
      </h3>
      <ul
        style={{
          paddingInlineStart: "unset",
          display: "flex",
          flexDirection: "column",
          rowGap: "30px",
        }}
      >
        <li
          className="styleList_sub2"
          style={{
            flexDirection: "row",
            columnGap: "30px",
          }}
        >
          <div
            className=" style_common"
            style={{
              flexBasis: "60%",
              flexDirection: "column",
              rowGap: "5px",
            }}
          >
            <div>出勤日</div>
            <div>14日</div>
          </div>
          <div
            className="style_common"
            style={{
              flexBasis: "40%",
              flexDirection: "column",
              rowGap: "5px",
            }}
          >
            <div>土日祝</div>
            <div>6日</div>
          </div>
        </li>
        <li
          className="style_common"
          style={{
            flexDirection: "column",
            rowGap: "5px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "500" }}>
                出勤時間
              </div>
              <div>{totalWorkTime}</div>
            </div>

            <button className="style_button3"> 詳細</button>
          </div>
        </li>
        <li className="styleList_sub2">
          <div
            className="style_common"
            style={{
              flexBasis: "45%",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              残業時間
            </div>
            <div>10時</div>
          </div>
          <div
            className="style_common"
            style={{
              flexBasis: "45%",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              休憩時間
            </div>
            <div>15時</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
