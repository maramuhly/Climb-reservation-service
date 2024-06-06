import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function ParkRecommendation({ brand, location, onSelectPark }) {
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedGyms = async () => {
      try {
        const response = await axios.post('http://localhost:8000/recommend-gyms', {
          location: {
            latitude: location.lat,
            longitude: location.lng
          },
          brand: brand
        });
        console.log('서버에서 받은 데이터:', response.data); // 서버에서 받은 데이터 출력
        setGyms(response.data);
      } catch (err) {
        setError('추천 암장을 가져오는 중 오류가 발생했습니다.');
      }
    };

    if (brand && location) {
      fetchRecommendedGyms();
    }
  }, [location, brand]);

  const handleParkClick = (gym) => {
    console.log('선택된 파크:', gym); // 선택된 파크 데이터 출력
    navigate('/reservation-form', { state: { park: gym } });
  };

  const handleRecommendClick = (gym) => {
    console.log('추천할 파크 아이디:', gym.id); // gym.id 확인용
    navigate('/community-recommendation', { state: { park_id: gym.id } });
  };

  return (
    <div className="main-content park-recommendation">
      <h2>추천 클라이밍 파크</h2>
      {error && <p className="error">{error}</p>}
      <div className="parks-container">
        {gyms.map((gym, index) => (
          <div key={gym.id} className="park-card">
            <div className="card-header" onClick={() => handleParkClick(gym)}>
              <h3>{index + 1}순위</h3>
              <p>{gym.name}</p>
              <p>{gym.distance}km 내</p>
            </div>
            <div className="card-body">
              <img src={gym.image_url} alt={gym.name} className="gym-image" />
              <div className="score">
                <span role="img" aria-label="fire">🔥</span> {gym.priority}점
              </div>
              <button onClick={() => handleRecommendClick(gym)}>+ 추천!</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkRecommendation;
