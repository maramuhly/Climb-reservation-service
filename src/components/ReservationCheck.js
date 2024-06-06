import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../App.css';

function ReservationCheck() {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCheck = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/reserve/${username}/${phoneNumber}`);
      setReservation(response.data);
    } catch (err) {
      setError('예약을 찾을 수 없습니다. 다시 시도해주세요.');
    }
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await axios.delete(`http://localhost:8000/reserve/${username}/${phoneNumber}`);
      alert('예약이 삭제되었습니다.');
      navigate('/');
    } catch (err) {
      setError('예약을 삭제하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleEdit = () => {
    navigate('/edit-reservation', { state: { reservation } });
  };

  const handleConfirm = () => {
    navigate('/');
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('ko-KR', options);
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return `${date.getHours()}시`;
  };

  return (
    <div>
      <Header />
      <div className="main-content reservation-check">
        {!reservation ? (
          <div className="reservation-form">
            <form onSubmit={handleCheck}>
              <h2>예약 확인</h2>
              <div className="form-group">
                <label>이름:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>연락처:</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              </div>
              <div className="button-group-center">
                <button type="submit" className="next-button">확인</button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        ) : (
          <div className="confirmation-details">
            <h2>예약자 정보 확인</h2>
            <div className="reservation-info">
              <span className="reservation-item park-name">{reservation.park}</span>
              <span className="reservation-item">{formatDate(reservation.datetime)}</span>
              <span className="reservation-item">{formatTime(reservation.datetime)}</span>
            </div>
            <div className="button-group">
              <button className="confirm-button" onClick={handleConfirm}>확인</button>
              <button className="edit-button" onClick={handleEdit}>수정</button>
              <button className="delete-button" onClick={handleDelete}>삭제</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationCheck;