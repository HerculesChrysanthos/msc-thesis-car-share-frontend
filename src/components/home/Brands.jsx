import React from 'react';
import Audi from '../../assets/home/brands/audi.png';
import Bmw from '../../assets/home/brands/bmw.png';
import Ford from '../../assets/home/brands/ford.png';
import Mercedes from '../../assets/home/brands/mercedes.png';
import Peugeot from '../../assets/home/brands/peugeot.png';
import Vw from '../../assets/home/brands/vw.png';

function Brands() {
  const brandList = [
    {
      name: 'Audi',
      img: Audi,
    },
    {
      name: 'Bmw',
      img: Bmw,
    },
    {
      name: 'Ford',
      img: Ford,
    },
    {
      name: 'Mercedes',
      img: Mercedes,
    },
    {
      name: 'Peugeot',
      img: Peugeot,
    },
    {
      name: 'Volkswagen',
      img: Vw,
    },
  ];
  return (
    <div className='brands-container'>
      {brandList.map((brand, index) => (
        <div key={index} className='brand'>
          <div className='img'>
            <img src={brand.img} alt={`${brand.name} Logo`} />
          </div>
          <h2>{brand.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Brands;
