import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ConfirmationMessage from './ConfirmationMessage';
import '../App.css';

function ReservationForm() {
  const location = useLocation();
  const { park } = location.state || {};

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [step, setStep] = useState(1);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);

  const handleNextStep = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = (event) => {
    event.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reservationData = {
      park: park.name,
      username: name,
      phone_number: contact,
      datetime: `${date}T${time}:00`
    };

    try {
      const response = await axios.post('http://localhost:8000/reserve', reservationData);
      setConfirmation(response.data);
    } catch (err) {
      setError('예약을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="main-content reservation-form">
      {!confirmation ? (
        <div>
          {step === 1 && (
            <form onSubmit={handleNextStep}>
              <h2>예약자 정보 입력</h2>
              <div className="form-group">
                <label>이름:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>연락처:</label>
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
              </div>
              <div className="button-group">
                <button type="button" onClick={handlePrevStep} className="prev-button">이전</button>
                <button type="submit" className="next-button">다음</button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h2>예약 날짜 및 시간 선택</h2>
              <div className="form-group">
                <label>날짜:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>시간:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="button-group">
                <button type="button" onClick={handlePrevStep} className="prev-button">이전</button>
                <button type="submit" className="submit-button">확인</button>
              </div>
            </form>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <ConfirmationMessage reservation={confirmation} />
      )}
    </div>
  );
}

export default ReservationForm;
