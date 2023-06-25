# Tạo model SQLAlchemy để đại diện cho dữ liệu checkin và checkout trong cơ sở dữ liệu
# test
#tung

from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "postgresql://postgres:160295@localhost:5432/postgres"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Timer(Base):
    __tablename__ = "timers"

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String)
    time = Column(String)
    date = Column(String)

    def __str__(self):
        return f"Action: {self.action}, Time: {self.time}, Date: {self.date}"
