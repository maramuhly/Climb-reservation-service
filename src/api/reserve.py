
from datetime import datetime

from database.orm import Reservation
from database.repository import ReservationRepository
from fastapi import Depends,HTTPException,Body, APIRouter

from schema.request import ReservationRequest
from schema.response import ReservationSchema

router = APIRouter()

@router.post("/reserve", status_code=200)
def select_park_reservation_handler(
    request: ReservationRequest,
    reserv_repo: ReservationRepository = Depends(ReservationRepository),
) -> ReservationSchema:
    #예약하기 -> 사용자 정보 저장
    reservation: Reservation = Reservation.reserve_park(request=request)
    reservation: Reservation = reserv_repo.save_reserv(reservation=reservation)
    return ReservationSchema.from_orm(reservation)

@router.get("/reserve/{username}/{phone_number}", status_code=200)
def check_user_reservation_handler(
    username: str,
    phone_number: str,
    user_repo: ReservationRepository = Depends(ReservationRepository),
) -> ReservationSchema:
    #확인하기 -> 이름, 전화번호 입력 -> DB 저장된 정보와 대조해서 확인
    reservation: Reservation | None = user_repo.check_user(username=username, phone_number=phone_number)
    if reservation:
        return ReservationSchema.from_orm(reservation)
    raise HTTPException(status_code=404, detail="Reservation Not Found")

@router.patch("/reserve/{username}/{phone_number}", status_code=200)
def update_reservation_handler(
    username: str,
    phone_number: str,
    datetime: datetime = Body(..., embed=True),
    user_repo: ReservationRepository = Depends(ReservationRepository),
) -> ReservationSchema:
    #확인하기 -> 예약 관리(수정 -> 시간 수정만!)
    reservation: Reservation | None = user_repo.check_user(username=username, phone_number=phone_number)
    if reservation:
        reservation.new_datetime(datetime)
        reservation: Reservation = user_repo.update_reservation(reservation=reservation)
        return ReservationSchema.from_orm(reservation)
    raise HTTPException(status_code=404, detail="Reservation Not Found")

@router.delete("/reserve/{username}/{phone_number}", status_code=200)
def delete_reservation_handler(
    username: str,
    phone_number: str,
    user_repo: ReservationRepository = Depends(ReservationRepository),
): #확인하기 -> 예약 관리(삭제)
    reservation: Reservation | None = user_repo.check_user(username=username, phone_number=phone_number)
    if reservation:
        user_repo.delete_reservation(reservation.id)
        return {"message": "Reservation deleted successfully"}
    raise HTTPException(status_code=404, detail="Reservation Not Found")


