from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import timedelta, datetime
from sqlalchemy.orm import Session
from models import Timer, SessionLocal

app = FastAPI()

# Thiết lập CORS middleware để cho phép gọi API từ các origin khác nhau
#test
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Có thể chỉ định các origin cụ thể
    allow_credentials=True,
    allow_methods=["*"],  # Có thể chỉ định các phương thức HTTP cụ thể (GET, POST, ...)
    allow_headers=["*"],  # Có thể chỉ định các header cụ thể
) 
# Định nghĩa model dữ liệu cho Timer
class TimerData(BaseModel):
    action: str
    time: str
    date: str

# Hàm để lấy session database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# Lấy dữ liệu từ cơ sở dữ liệu
def get_data_from_db(db: Session):
    data = db.query(Timer).all()
    return [record.__dict__ for record in data]


# Tính tổng thời gian làm việc ban đầu

def calculate_total_work_time(db: Session):
    data = get_data_from_db(db)
    total_work_time = timedelta()
    last_checkin = None

    for record in data:
        if record["action"] == "checkIn":
            last_checkin = record
        elif record["action"] == "checkOut" and last_checkin:
            checkin_time = datetime.strptime(last_checkin["time"], "%H時%M分%S秒")
            checkout_time = datetime.strptime(record["time"], "%H時%M分%S秒")
            work_time = checkout_time - checkin_time
            total_work_time += work_time
            last_checkin = None

    return total_work_time
# Hàm trợ giúp để định dạng thời gian làm việc
def format_work_time(work_time):
    total_seconds = int(work_time.total_seconds())
    hours, remainder = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return f"{hours}時{minutes}分{seconds}秒"

# Xác định API endpoint và phương thức POST

@app.post("/api/v1/data",response_model=dict)
def create_activity(timer: TimerData, db: Session = Depends(get_db)):
    # Kiểm tra hành động cuối cùng trong cơ sở dữ liệu
    last_action = db.query(Timer).order_by(Timer.id.desc()).first()
    if last_action and last_action.action == timer.action:
        return {"message": "lỗi : Không thể thực hiện cùng một hành động hai lần liên tiếp"}

    # Tạo một đối tượng Timer mới
    db_timer = Timer(action=timer.action, time=timer.time, date=timer.date)
    # Thêm đối tượng Timer vào session
    db.add(db_timer)
    # Lưu thay đổi vào database
    db.commit()
    # Đóng session
    db.close()

    return {"message": "Success", "data": timer}


# Xác định API endpoint và phương thức GET
@app.get("/api/v1/data")
def get_data(db: Session = Depends(get_db)):
# Gọi hàm get_data_from_db để lấy dữ liệu từ cơ sở dữ liệu
    return get_data_from_db(db)

@app.get("/api/v1/totalworktime")
def get_calculate_total_work_time(db: Session = Depends(get_db)):
    # Gọi hàm calculate_total_work_time để tính tổng thời gian làm việc
    total_work_time = calculate_total_work_time(db)
     # Trả về tổng thời gian làm việc đã được định dạng
    return {"total_work_time": format_work_time(total_work_time)}

@app.delete("/api/v1/data")
def delete_all_data(db: Session = Depends(get_db)):
    # Xóa tất cả các bản ghi từ bảng Timer
    db.query(Timer).delete()
    # Lưu thay đổi vào cơ sở dữ liệu
    db.commit()
    # Trả về thông báo thành công
    return {"message": "All data deleted"}
