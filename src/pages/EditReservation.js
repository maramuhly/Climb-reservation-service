import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function EditReservation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservation } = location.state || {};
  const [datetime, setDatetime] = useState(reservation ? reservation.datetime : '');

  const handleEdit = async () => {
    try {
      await axios.patch(`http://localhost:8000/reserve/${reservation.username}/${reservation.phone_number}`, {
        datetime
      });
      alert('예약이 수정되었습니다.');
      navigate('/');
    } catch (err) {
      alert('예약을 수정하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (!reservation) {
    return <p>잘못된 접근입니다. 예약 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="main-content edit-reservation">
      <Header />
      <h2>예약 수정</h2>
      <label>
        날짜와 시간:
        <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} required />
      </label>
      <button onClick={handleEdit}>수정</button>
    </div>
  );
}

export default EditReservation;
