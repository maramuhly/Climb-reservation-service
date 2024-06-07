from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

from typing import List

class ReservationSchema(BaseModel):
    id: int
    park: str
    username: str
    phone_number: str
    datetime: datetime

    class Config:
        orm_mode = True