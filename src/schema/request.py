from pydantic import BaseModel
from datetime import datetime


class ReservationRequest(BaseModel):
    park: str
    username: str
    phone_number: str
    datetime: datetime



