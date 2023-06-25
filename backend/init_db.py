from models import Base, engine
#  khởi tạo cơ sở dữ liệu để tạo ra bảng timers
if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)

