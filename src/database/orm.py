from sqlalchemy import Column, Integer, String,  DateTime
from sqlalchemy.orm import declarative_base
from schema.request import ReservationRequest

Base = declarative_base()


class Reservation(Base):
    __tablename__ = "reservation"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(256), nullable=False)
    phone_number = Column(String(256), nullable=False)
    park = Column(String(256), nullable=False)
    datetime = Column(DateTime, nullable=False)

    def __repr__(self):
        return f"Reservation(id={self.id}, username={self.username}, phone_number={self.phone_number}, park={self.park}, datetime={self.datetime})"


    @classmethod
    def reserve_park(cls, request: ReservationRequest) -> "Reservation":
        return cls(
            park=request.park,
            username=request.username,
            phone_number=request.phone_number,
            datetime=request.datetime
        )

    def new_datetime(self, new_datetime: datetime):
        self.datetime = new_datetime
        return self


