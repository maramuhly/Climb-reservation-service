import React from 'react';

const Reservation = () => {
  const handleReservation = (letter) => {
    alert(`${letter}가 예약되었습니다!`);
  };

  return (
    <div>
      <h1>Reservation Page</h1>
      <button onClick={() => handleReservation('A')}>A</button>
      <button onClick={() => handleReservation('B')}>B</button>
      <button onClick={() => handleReservation('C')}>C</button>
      <button onClick={() => handleReservation('D')}>D</button>
    </div>
  );
};

export default Reservation;
