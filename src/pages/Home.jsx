import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LocationSearch from '../components/home/LocationSearch';
import DatesSearch from '../components/home/DatesSearch';
import {
  setHours,
  setMinutes,
  addHours,
  isSameDay,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Brands from '../components/home/Brands';
import NewAdditions from '../components/home/NewAdditions';
import AccorditionHome from '../components/home/AccorditionHome';
import ExtraIncome from '../components/home/ExtraIncome';

function formatToISOString(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  // Ensure that seconds are always '00'
  const seconds = '00';

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

function Home() {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const now = new Date();
  const nextHour = setMinutes(setHours(now, now.getHours() + 1), 0);
  const [startDate, setStartDate] = useState(nextHour);
  const [endDate, setEndDate] = useState(addHours(nextHour, 1));

  const navigate = useNavigate();

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(addHours(date, 1));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const navigateToSearch = (e) => {
    e.preventDefault();

    if (!startDate)
      return toast.error('Παρακαλώ επιλέξτε ημερομηνία παραλαβής');
    if (!endDate) return toast.error('Παρακαλώ επιλέξτε ημερομηνία παράδοσης');
    if (!lat || !long) return toast.error('Παρακαλώ επιλέξτε τοποθεσία');

    const formatedStartDate = formatToISOString(startDate);
    const formatedEndDate = formatToISOString(endDate);

    navigate(
      `/search?startDate=${formatedStartDate}&endDate=${formatedEndDate}&lat=${lat}&long=${long}`
    );
  };

  return (
    <div className='home-page'>
      <section className='container'>
        <form onSubmit={navigateToSearch} className='hero-search'>
          <h1>Βρες το ιδανικό αυτοκίνητο για εσένα οποτεδήποτε, οπουδήποτε</h1>
          <p>Ενοικίασε μοναδικά αυτοκίνητα από ανθρώπους κοντά σου.</p>
          <LocationSearch setLat={setLat} setLong={setLong} />
          <DatesSearch
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
          />
          <button type='submit' className='search-btn'>
            Αναζήτηση
          </button>
        </form>
      </section>
      <section className='home-brands'>
        <Brands />
      </section>
      <section className='home-new-additions'>
        <h2>Νέες προσθήκες</h2>
        <NewAdditions />
      </section>
      <div className='extra-income container'>
        <h2>Μετατρέψτε το αυτοκίνητό σου σε επιπλέον εισόδημα</h2>
        <p>
          Ξεκίνησε να κερδίζεις ενοικιάζοντας το αυτοκίνητό σου, είναι ασφαλές
          και εύκολο.
        </p>
        <ExtraIncome />
      </div>
      <section className='home-accordition container'>
        <AccorditionHome />
      </section>
    </div>
  );
}

export default Home;
