import React, { useState } from 'react';
import { RiMapPin2Fill } from 'react-icons/ri';
import { LuCalendarDays } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import { IoStar } from 'react-icons/io5';
import { GiGearStickPattern } from 'react-icons/gi';
import { FaCar } from 'react-icons/fa6';
import { MdLocalGasStation, MdGroups } from 'react-icons/md';
import { createBooking } from '../../../features/booking/bookingSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import CarImage from '../../../assets/car/no_cars.png';
import Spinner24 from '../../Spinner24';
import { useNavigate } from 'react-router-dom';

function CarCreateBook({ car, startDate, endDate, address, rentPerHour }) {
  const [displayReservation, setDisplayReservation] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const { bookingLoading } = useSelector((state) => state.booking);

  function formatDate(dateStr) {
    const date = new Date(dateStr);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('el-GR', { month: 'short' });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'μμ' : 'πμ';
    hours = hours % 12 || 12; // Convert to 12-hour format, handling midnight/noon

    // Return formatted date and time
    return {
      date: `${day} ${month} ${year}`,
      time: `${hours}:${minutes} ${period}`,
    };
  }

  const { date: startDateFormatted, time: startTimeFormatted } =
    formatDate(startDate);
  const { date: endDateFormatted, time: endTimeFormatted } =
    formatDate(endDate);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMs = end - start;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  function isMobile() {
    return window.innerWidth <= 1280;
  }

  function DisplayDateRange() {
    if (isMobile()) {
      return (
        <div className='option'>
          <div className='icon'>
            <LuCalendarDays />
          </div>
          <div className='text'>
            {startDateFormatted} {startTimeFormatted} {'->'} {endDateFormatted}{' '}
            {endTimeFormatted}
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
            <div className='text'>
              {startDateFormatted}, {startTimeFormatted}
            </div>
          </div>
          <div className='option'>
            <div className='icon'>
              <LuCalendarDays />
            </div>
            <div className='text'>
              {endDateFormatted}, {endTimeFormatted}
            </div>
          </div>
        </>
      );
    }
  }

  const navigate = useNavigate();
  const closeSuccess = () => {
    navigate('/');
  };

  const closeRejected = () => {
    setReservationSuccess(false);
    setDisplayReservation(false);
    setShowSuccess(false);
    setShowError(false);
  };

  const sendBooking = () => {
    if (!startDate || !endDate) {
      toast.error('Πρέπει να διαλέξεις ημερομηνίες κράτησεις');
      return;
    }

    const body = {
      car: car._id,
      startDate,
      endDate,
      price: diffInHours * rentPerHour,
    };

    dispatch(createBooking({ body }))
      .unwrap()
      .then(() => {
        setReservationSuccess(true);
        setShowSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setReservationSuccess(true);
        setShowError(true);
      });
  };

  return (
    <>
      <div className='single-car-create-book'>
        <div className='options'>
          <div className='option'>
            <div className='icon'>
              <RiMapPin2Fill />
            </div>
            <div className='text'>
              {address?.street} {address?.number}, {address?.city},{' '}
              {address?.postalCode}
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
        <button type='button' onClick={() => setDisplayReservation(true)}>
          Κράτηση
        </button>
      </div>
      {displayReservation && (
        <div className='reservation-modal'>
          <div className='modal'>
            {reservationSuccess ? (
              <>
                {showSuccess && (
                  <div className='booking-messsage'>
                    <div className='close-modal' onClick={closeSuccess}>
                      <IoMdClose size={14} fill='#000' />
                    </div>
                    <h4>Το αίτημα σου καταχωρήθηκε με επιτυχία!</h4>
                    <div className='message'>
                      <span>
                        Τώρα αναμένεις τον ιδιοκτήτη να αποδεχτεί την κράτηση
                        σου!
                      </span>
                      <span>
                        Μπορείς να παρακολουθείς το αίτημα για την κράτηση σου
                        στο προφίλ σου
                      </span>
                    </div>
                    <div className='car-image'>
                      <img src={CarImage} alt='Car image' />
                    </div>
                  </div>
                )}
                {showError && (
                  <div className='booking-messsage'>
                    <div className='close-modal' onClick={closeRejected}>
                      <IoMdClose size={14} fill='#000' />
                    </div>
                    <h4>
                      Παρουσιάστηκε σφάλμα κατά την καταχώρηση του αιτήματος!
                    </h4>
                    <div className='message'>
                      Προέκυψε κάποιο πρόβλημα, δοκίμασε ξανά
                    </div>
                    <div className='car-image'>
                      <img src={CarImage} alt='Car image' />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  className='close-modal'
                  onClick={() => setDisplayReservation(false)}
                >
                  <IoMdClose size={14} fill='#000' />
                </div>
                <h3>Κράτηση και πληρωμή</h3>
                <div className='img-and-info'>
                  <div className='car-thumbnail'>
                    <img src={car?.thumbnail?.url || CarImage} alt='' />
                  </div>
                  <div className='car-info'>
                    <div className='name'>
                      <h4>
                        {car.make.name} {car.model.name}
                      </h4>
                      <p>
                        <IoStar fill='#912740' size='18px' /> (7) Αξιολογήσεις
                      </p>
                    </div>
                    <div className='display-features'>
                      <div className='feature'>
                        <div className='icon'>
                          <FaCar fill='#912740' />
                        </div>
                        {car?.gearboxType}
                      </div>
                      <div className='feature'>
                        <div className='icon'>
                          <GiGearStickPattern fill='#912740' size='18px' />
                        </div>
                        {car?.gearboxType}
                      </div>
                      <div className='feature'>
                        <div className='icon'>
                          <MdLocalGasStation fill='#912740' size='20px' />
                        </div>
                        {car?.fuelType}
                      </div>
                      <div className='feature'>
                        <div className='icon'>
                          <MdGroups fill='#912740' size='21px' />
                        </div>
                        {car?.seats} θέσεις
                      </div>
                    </div>
                    <div className='display-car-details'>
                      <div className='bottom'>
                        {car?.features?.map((feature, index) => (
                          <div key={index} className='detail'>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='reservation-info'>
                  <h3>Ημέρες κράτησης</h3>
                  <div className='dates'>
                    <div className='from-date'>
                      <div className='from'>Από</div>
                      <div className='date'>
                        <div className='formated-date'>
                          {startDateFormatted}
                        </div>
                        <div className='formated-hours'>
                          {startTimeFormatted}
                        </div>
                      </div>
                    </div>
                    <div className='to-date'>
                      <div className='from'>Εώς</div>
                      <div className='date'>
                        <div className='formated-date'>{endDateFormatted}</div>
                        <div className='formated-hours'>{endTimeFormatted}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='total'>
                  <div className='days'>
                    Σύνολο: <span>{diffInDays} ημέρες</span>
                  </div>
                  <div className='price'>{diffInHours * rentPerHour}€</div>
                </div>
                <div className='message'>
                  Ο τρόπος πληρωμής είναι μετρητά κατά την ολοκλήρωση της
                  κράτησης
                </div>
                <button
                  className='send-booking'
                  type='button'
                  onClick={sendBooking}
                >
                  {bookingLoading ? (
                    <>
                      Ολοκλήρωση κράτησης
                      <div className='spinner-24'>
                        <Spinner24 />
                      </div>
                    </>
                  ) : (
                    'Ολοκλήρωση κράτησης'
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CarCreateBook;
