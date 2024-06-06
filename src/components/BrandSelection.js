import React from 'react';
import theClimbLogo from '../assets/images/the_climb_logo.png';
import seoulForestLogo from '../assets/images/seoul_forest_logo.png';
import songSangLogo from '../assets/images/song_sang_logo.png';
import allezLogo from '../assets/images/allez_logo.png';
import peakersLogo from '../assets/images/peakers_logo.png';
import climbingParkLogo from '../assets/images/climbing_park_logo.png';

const brands = [
    { name: 'The Climb', logo: theClimbLogo },
    { name: 'Seoul Forest', logo: seoulForestLogo },
    { name: 'Song Sang Won', logo: songSangLogo },
    { name: 'Allez', logo: allezLogo },
    { name: 'Peakers', logo: peakersLogo },
    { name: 'ClimbingPark', logo: climbingParkLogo },
];

function BrandSelection({ onSelectBrand }) {
    return (
        <div className="main-content brand-selection">
            <div className="gyms-container">
                {brands.map(brand => (
                    <div key={brand.name} className="gym" onClick={() => onSelectBrand(brand.name)}>
                        <img src={brand.logo} alt={brand.name} />
                        <p>{brand.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BrandSelection;
