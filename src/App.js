import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MakeReservation from './pages/MakeReservation';
import EditReservation from './pages/EditReservation';
import CheckReservation from './pages/CheckReservation';
import CommunityRecommendation from './components/CommunityRecommendation';
import ReservationForm from './components/ReservationForm';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/make-reservation" element={<MakeReservation />} />
      <Route path="/edit-reservation" element={<EditReservation />} />
      <Route path="/check-reservation" element={<CheckReservation />} />
      <Route path="/community-recommendation" element={<CommunityRecommendation />} />
      <Route path="/reservation-form" element={<ReservationForm />} />
    </Routes>
  );
}

export default App;
