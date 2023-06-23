import "./style/index.css";
import { LeftSideBar } from "./components/LeftSideBar";
import { MainContent } from "./components/MainContent";
import { SubContent1 } from "./components/SubContent1";
import { SubContent2 } from "./components/SubContent2";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ja";
import axios from "axios";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timer, setTimer] = useState("");
  const [listTimer, setListTimer] = useState([]);
  const [totalWorkTime, setTotalWorkTime] = useState();

  // Cập nhật currentTime mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // action cho こんにちは
  useEffect(() => {
    const currentHour = currentTime.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      setTimer("おはよう");
    } else if (currentHour >= 12 && currentHour < 18) {
      setTimer("こんにちは");
    } else {
      setTimer("こんばんは");
    }
  }, [currentTime]);

  // action cho 出勤、退勤
  const handleButtonClick = async (action, time) => {
    const originalTime = time;
    const convertedDate = moment(originalTime).format("YYYY年MM月DD日（dd）");
    const convertedTime = moment(originalTime).format("HH時mm分ss秒");
    moment.locale("ja");

    const newTimer = {
      action: action,
      time: convertedTime,
      date: convertedDate,
    };

    setListTimer((prevList) => [...prevList, newTimer]);

    // Gửi yêu cầu POST lên backend để gửi thời gian checkin, checkout và tổng thời gian làm việc
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/data",
        newTimer
      );
      console.log("Dữ liệu đã được gửi lên backend:", response.data);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu POST tới backend:", error);
      // Xử lý lỗi nếu có
    }
  };
  // Gửi yêu cầu GET lên backend để nhận dữ liệu thời gian checkin, checkout và tổng thời gian làm việc
  useEffect(() => {
    const fetchTotalWorkTime = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/totalworktime"
        );
        const data = response.data;
        console.log("Tổng thời gian làm việc nhận được từ backend:", data);
        // Cập nhật state totalWorkTime để hiển thị tổng thời gian làm việc
        setTotalWorkTime(data.total_work_time);
      } catch (error) {
        console.error(
          "Lỗi khi gửi yêu cầu GET tổng thời gian làm việc tới backend:",
          error
        );
        // Xử lý lỗi nếu ccó
      }
    };

    fetchTotalWorkTime();
  }, [listTimer]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/data");
        const data = response.data;
        console.log("Dữ liệu nhận được từ backend:", data);
        // Cập nhật state listTimer để hiển thị dữ liệu
        setListTimer(data);
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu GET tới backend:", error);
        // Xử lý lỗi nếu có
      }
    };
    fetchData(); // Gọi hàm fetchData khi chưa tải dữ liệu

    // code chỉ chạy khi ứng dụng khởi động, không phụ thuộc vào sự thay đổi của listTimer
  }, []);



  return (
    <div
      className="container"
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        columnGap: "74px",
      }}
    >
      <LeftSideBar timer={timer} />
      <div
        className="content"
        style={{
          flexBasis: "90%",
          marginTop: "69px",
          marginBottom: "70px",
          marginRight: "70px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "24px",
            }}
          >
            {timer}、HOANG VAN HIEU
          </h2>
        </div>
        <MainContent
          handleButtonClick={handleButtonClick}
          currentTime={currentTime}
        />
        <div
          style={{ display: "flex", flexDirection: "row", columnGap: "50px" }}
        >
          <SubContent1 listTimer={listTimer} />
          <SubContent2 totalWorkTime={totalWorkTime} listTimer={listTimer} />
        </div>
      </div>
    </div>
  );
}

export default App;
