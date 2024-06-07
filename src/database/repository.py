from typing import List

from fastapi import Depends
from sqlalchemy import select, delete
from sqlalchemy.orm import Session

from database.connection import get_db
from database.orm import Reservation

class ReservationRepository:
    def __init__(self, session: Session = Depends(get_db)):
        self.session = session

    def save_reserv(self, reservation: Reservation) -> Reservation:
        self.session.add(instance=reservation)
        self.session.commit() #db save
        self.session.refresh(instance=reservation)
        return reservation

    def get_reserv_id(self, reserve_id: int):
        return self.session.scalar(select(Reservation).where(Reservation.id == reserve_id))

    def check_user(
        self, username: str, phone_number: str
    ) -> Reservation | None:
        return self.session.scalar(select(Reservation).where(
            (Reservation.username == username) & (Reservation.phone_number == phone_number)
        ))

    def update_reservation(self, reservation: Reservation) -> Reservation:
        self.session.add(instance=reservation)
        self.session.commit() #db save
        self.session.refresh(instance=reservation)
        return reservation

    def delete_reservation(self, reservation_id: int):
        reservation = self.session.query(Reservation).filter(Reservation.id == reservation_id).first()
        if reservation:
            self.session.delete(reservation)
            self.session.commit()


