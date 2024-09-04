import React from 'react';
import { RiMapPin2Fill } from 'react-icons/ri';
import { LuCalendarDays } from 'react-icons/lu';

function CarCreateBook({ car, startDate, endDate, address, rentPerHour }) {
  function formatDateTime(dateStr) {
    const date = new Date(dateStr);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('el-GR', { month: 'short' });
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const period = hours >= 12 ? 'μμ' : 'πμ';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${day} ${month}, ${formattedHours}:${minutes} ${period}`;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInMs = end - start;

  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  function isMobile() {
    return window.innerWidth <= 1280;
  }

  function DisplayDateRange() {
    const formattedStartDate = formatDateTime(startDate);
    const formattedEndDate = formatDateTime(endDate);

    if (isMobile()) {
      return (
        <div className='option'>
          <div className='icon'>
            <LuCalendarDays />
          </div>
          <div className='text'>
            {formattedStartDate} {'->'} {formattedEndDate}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className='option'>
            <div className='icon'>
              <LuCalendarDays />
            </div>
            <div className='text'>{formattedStartDate}</div>
          </div>
          <div className='option'>
            <div className='icon'>
              <LuCalendarDays />
            </div>
            <div className='text'>{formattedEndDate}</div>
          </div>
        </>
      );
    }
  }
  return (
    <div className='single-car-create-book'>
      <div className='options'>
        <div className='option'>
          <div className='icon'>
            <RiMapPin2Fill />
          </div>
          <div className='text'>
            {address?.street}
            {address?.number},{address?.city},{address?.postalCode}
          </div>
        </div>
        <DisplayDateRange />
      </div>
      <div className='cost'>
        <div className='hours'>
          {diffInDays} μέρες, {rentPerHour}€ την ώρα
        </div>
        <div className='money'>{diffInHours * rentPerHour}€</div>
      </div>
      <button type='button'>Κράτηση</button>
    </div>
  );
}

export default CarCreateBook;
