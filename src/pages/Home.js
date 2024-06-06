import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../App.css';

function Home() {
  const navigate = useNavigate();

  const handleMakeReservation = () => {
    navigate('/make-reservation');
  };

  const handleCheckReservation = () => {
    navigate('/check-reservation');
  };

  return (
    <div className="main-content home">
      <Header />
      <button onClick={handleMakeReservation}>예약하기</button>
      <button onClick={handleCheckReservation}>확인하기</button>
    </div>
  );
}

export default Home;


