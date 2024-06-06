import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function CommunityRecommendation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { park_id } = location.state || {};
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    console.log("Received park_id:", park_id); // 디버깅을 위해 추가
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://localhost:8000/community-recommend', { park_id });
        console.log("Response:", response); // 디버깅을 위해 추가
        setRecommendations(response.data);
      } catch (err) {
        console.error('커뮤니티 추천을 가져오는 중 오류가 발생했습니다.', err);
      }
    };

    if (park_id) {
      fetchRecommendations();
    }
  }, [park_id]);

  const handleParkClick = (park) => {
    navigate('/reservation-form', { state: { park } });
  };

  return (
    <div className="main-content community-recommendation">
      <h2>추가 추천 클라이밍 파크</h2>
      <div className="parks-container">
        {recommendations.map((rec) => (
          <div key={rec.name} className="park-card" onClick={() => handleParkClick(rec)}>
            <div className="Com-card-header">
              <p>{rec.name}</p>
            </div>
            <div className="card-body">
              <img src={rec.image_url} alt={rec.name} className="gym-image" />
              <div className="score">
                <span role="img" aria-label="fire">🔥</span> {rec.priority}점
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityRecommendation;
