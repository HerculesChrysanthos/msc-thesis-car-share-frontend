import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeBookingState,
  getBookingAccepted,
  getBookingPending,
  getBookingPrevious,
} from '../../../../../features/booking/bookingSlice';
import { useNavigate } from 'react-router-dom';
import { IoStar } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft } from 'react-icons/go';
import { GoChevronRight } from 'react-icons/go';
import Spinner16 from '../../../../Spinner24';
import toast from 'react-hot-toast';

function CarReservations({ car, setDisplayedCar }) {
  const [pendingPageNum, setPendingPageNum] = useState(1);
  const [acceptedPageNum, setAcceptedPageNum] = useState(1);
  const [previousPageNum, setPreviousPageNum] = useState(1);
  const [pendingLimit, setPendingLimit] = useState(9);
  const [acceptedLimit, setAcceptedLimit] = useState(9);
  const [previousLimit, setPreviousLimit] = useState(9);

  const [forceRender, setForceRender] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    bookingPending,
    bookingAccepted,
    bookingPrevious,
    bookingPendingLoading,
    bookingAcceptedLoading,
    bookingPreviousLoading,
  } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(
      getBookingPending({
        carId: car._id,
        pageNum: pendingPageNum,
        limit: pendingLimit,
      })
    )
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [car._id, pendingPageNum, forceRender]);

  useEffect(() => {
    dispatch(
      getBookingAccepted({
        carId: car._id,
        pageNum: acceptedPageNum,
        limit: acceptedLimit,
      })
    )
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [car._id, acceptedPageNum, forceRender]);

  useEffect(() => {
    dispatch(
      getBookingPrevious({
        carId: car._id,
        pageNum: previousPageNum,
        limit: previousLimit,
      })
    )
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [car._id, previousPageNum]);

  const formatDate = (dateIncoming) => {
    const date = new Date(dateIncoming);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'DONE':
        return <div className='status accepted'>Ολοκληρωμένη</div>;
      case 'REJECTED':
        return <div className='status rejected'>Ακυρωμένη</div>;
      case 'CANCELLED':
        return <div className='status cancelled'>Απορριφθείσα</div>;
      default:
        return <div className='status accepted'>Ολοκληρωμένη</div>;
    }
  };

  const handlePageClick = (event) => {
    setPendingPageNum(event.selected + 1);
  };

  const acceptReservation = (id) => {
    dispatch(changeBookingState({ id, state: 'accept' }))
      .unwrap()
      .then((res) => {
        toast.success('Η κράτηση έγινε αποδεχτή');
        setForceRender((prev) => !prev);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const declineReservation = (id) => {
    dispatch(changeBookingState({ id, state: 'reject' }))
      .unwrap()
      .then((res) => {
        toast.success('Η κράτηση απορρίφθηκε');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  if (
    bookingPending[0]?.paginatedResults.length === 0 &&
    bookingAccepted[0]?.paginatedResults.length === 0 &&
    bookingPrevious[0]?.paginatedResults.length === 0
  )
    return <div>Δεν υπάρχουν κρατήσεις</div>;

  return (
    <div className='car-reservations'>
      {bookingPending[0]?.paginatedResults.length > 0 && (
        <div className='booking-list'>
          <h2>
            Αιτήματα{' '}
            {bookingPendingLoading && (
              <div className='spinner-24'>
                <Spinner16 />
              </div>
            )}
          </h2>
          <div className='bookings'>
            {bookingPending[0]?.paginatedResults.map((book) => (
              <div className='book' key={book._id}>
                <div className='for'>
                  <h3>Έχεις νεα κράτηση για τις:</h3>
                  <div className='dates'>
                    <div className='date'>{formatDate(book.startDate)} - </div>
                    <div className='date'>{formatDate(book.endDate)}</div>
                  </div>
                </div>
                <div className='from pending'>
                  Από τον:{' '}
                  <button onClick={() => navigate(`/user/${book.renter._id}`)}>
                    {book.renter.name} {book.renter.surname}
                  </button>{' '}
                  <div className='stars'>
                    <IoStar fill='#912740' size='18px' /> (
                    {book?.renter?.ratingsScore}/5)
                  </div>
                </div>
                <div className='buttons'>
                  <button
                    className='accept'
                    onClick={() => acceptReservation(book._id)}
                  >
                    Αποδοχή
                  </button>
                  <button
                    className='decline'
                    onClick={() => declineReservation(book._id)}
                  >
                    Απόρριψη
                  </button>
                </div>
              </div>
            ))}
          </div>
          {Math.ceil(bookingPending[0].totalCount[0].count / pendingLimit) >
            1 && (
            <ReactPaginate
              breakLabel='...'
              nextLabel={<GoChevronRight size='16px' />}
              onPageChange={(event) => setPendingPageNum(event.selected + 1)}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(
                bookingPending[0].totalCount[0].count / pendingLimit
              )}
              previousLabel={<GoChevronLeft size='16px' />}
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      )}
      {bookingAccepted[0]?.paginatedResults.length > 0 && (
        <div className='booking-list'>
          <h2>Προγραμματισμένες</h2>
          <div className='bookings'>
            {bookingAccepted[0]?.paginatedResults.map((book) => (
              <div className='book' key={book._id}>
                <div className='for'>
                  <h3>Έχεις κράτηση για τις:</h3>
                  <div className='dates'>
                    <div className='date'>{formatDate(book.startDate)} - </div>
                    <div className='date'>{formatDate(book.endDate)}</div>
                  </div>
                </div>
                <div className='from'>
                  Από τον:{' '}
                  <button onClick={() => navigate(`/user/${book.renter._id}`)}>
                    {book.renter.name} {book.renter.surname}
                  </button>{' '}
                  <div className='stars'>
                    <IoStar fill='#912740' size='18px' /> (
                    {book?.renter?.ratingsScore}/5)
                  </div>
                </div>
              </div>
            ))}
          </div>
          {Math.ceil(bookingAccepted[0].totalCount[0].count / acceptedLimit) >
            1 && (
            <ReactPaginate
              breakLabel='...'
              nextLabel={<GoChevronRight size='16px' />}
              onPageChange={(event) => setAcceptedPageNum(event.selected + 1)}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(
                bookingAccepted[0].totalCount[0].count / acceptedLimit
              )}
              previousLabel={<GoChevronLeft size='16px' />}
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      )}
      {bookingPrevious[0]?.paginatedResults.length > 0 && (
        <div className='booking-list'>
          <h2>Προηγούμενες</h2>
          <div className='bookings'>
            {bookingPrevious[0]?.paginatedResults.map((book) => (
              <div className='book previous' key={book._id}>
                {formatStatus(book.status)}
                <div className='for'>
                  <div className='dates'>
                    <div className='date'>{formatDate(book.startDate)} - </div>
                    <div className='date'>{formatDate(book.endDate)}</div>
                  </div>
                </div>
                <div className='from'>
                  Από τον:{' '}
                  <button onClick={() => navigate(`/user/${book.renter._id}`)}>
                    {book.renter.name} {book.renter.surname}
                  </button>{' '}
                  <div className='stars'>
                    <IoStar fill='#912740' size='18px' /> (
                    {book?.renterReview?.rating}/5)
                  </div>
                </div>
              </div>
            ))}
          </div>
          {Math.ceil(bookingPrevious[0].totalCount[0].count / previousLimit) >
            1 && (
            <ReactPaginate
              breakLabel='...'
              nextLabel={<GoChevronRight size='16px' />}
              onPageChange={(event) => setPreviousPageNum(event.selected + 1)}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(
                bookingPrevious[0].totalCount[0].count / previousLimit
              )}
              previousLabel={<GoChevronLeft size='16px' />}
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CarReservations;
