import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function ConfirmationMessage({ reservation }) {
  const navigate = useNavigate();

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('ko-KR', options);
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return `${date.getHours()}시`;
  };

  const handleConfirm = () => {
    navigate('/');
  };

  return (
    <div className="main-content confirmation-message">
      <h2>예약 확정</h2>
      <p>클라이밍 파크: {reservation.park}</p>
      <p>이름: {reservation.username}</p>
      <p>연락처: {reservation.phone_number}</p>
      <div className="reservation-info">
        <span className="reservation-item">{formatDate(reservation.datetime)}</span>
        <span className="reservation-item">{formatTime(reservation.datetime)}</span>
      </div>
      <button className="confirm-button" onClick={handleConfirm}>확인</button>
    </div>
  );
}

export default ConfirmationMessage;
