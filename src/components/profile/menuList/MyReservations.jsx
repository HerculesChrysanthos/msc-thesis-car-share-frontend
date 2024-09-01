import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getMyBookingAccepted,
  getMyBookingPrevious,
} from '../../../features/user/userSlice';
import { IoStar } from 'react-icons/io5';

function MyReservations() {
  const [pendingPageNum, setPendingPageNum] = useState(1);
  const [acceptedPageNum, setAcceptedPageNum] = useState(1);
  const [previousPageNum, setPreviousPageNum] = useState(1);
  const [pendingLimit, setPendingLimit] = useState(9);
  const [acceptedLimit, setAcceptedLimit] = useState(9);
  const [previousLimit, setPreviousLimit] = useState(9);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myAcceptedBooking, myPreviousBooking, previousLoading } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      getMyBookingAccepted({
        userId: user.user._id,
        pageNum: previousPageNum,
        limit: previousLimit,
      })
    )
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [user.user._id, previousPageNum]);

  useEffect(() => {
    dispatch(
      getMyBookingPrevious({
        userId: user.user._id,
        pageNum: previousPageNum,
        limit: previousLimit,
      })
    )
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [user.user._id, previousPageNum]);

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

  if (
    myAcceptedBooking[0]?.paginatedResults.length === 0 &&
    myPreviousBooking[0]?.paginatedResults.length === 0
  )
    return <div>Δεν υπάρχουν κρατήσεις</div>;

  return (
    <div className='car-reservations'>
      {myAcceptedBooking[0]?.paginatedResults.length > 0 && (
        <div className='booking-list'>
          <h2>Προγραμματισμένες</h2>
          <div className='bookings'>
            {myAcceptedBooking[0]?.paginatedResults.map((book) => (
              <div className='book' key={book._id}>
                <div className='for'>
                  <div className='dates'>
                    <div className='date'>{formatDate(book.startDate)} - </div>
                    <div className='date'>{formatDate(book.endDate)}</div>
                  </div>
                </div>
                <div className='from'>
                  Από τον:{' '}
                  <button onClick={() => navigate(`/user/${book.renter._id}`)}>
                    {book.car.owner.name} {book.car.owner.surname}
                  </button>{' '}
                  <div className='stars'>
                    <IoStar fill='#912740' size='18px' /> (4/5)
                  </div>
                </div>
              </div>
            ))}
          </div>
          {Math.ceil(myAcceptedBooking[0].totalCount[0].count / acceptedLimit) >
            1 && (
            <ReactPaginate
              breakLabel='...'
              nextLabel={<GoChevronRight size='16px' />}
              onPageChange={(event) => setAcceptedPageNum(event.selected + 1)}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(
                myAcceptedBooking[0].totalCount[0].count / acceptedLimit
              )}
              previousLabel={<GoChevronLeft size='16px' />}
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      )}
      {myPreviousBooking[0]?.paginatedResults.length > 0 && (
        <div className='booking-list'>
          <h2>Προηγούμενες</h2>
          <div className='bookings'>
            {myPreviousBooking[0]?.paginatedResults.map((book) => (
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
                    {book.car.owner.name} {book.car.owner.surname}
                  </button>{' '}
                  <div className='stars'>
                    <IoStar fill='#912740' size='18px' /> (4/5)
                  </div>
                </div>
              </div>
            ))}
          </div>
          {Math.ceil(myPreviousBooking[0].totalCount[0].count / previousLimit) >
            1 && (
            <ReactPaginate
              breakLabel='...'
              nextLabel={<GoChevronRight size='16px' />}
              onPageChange={(event) => setPreviousPageNum(event.selected + 1)}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(
                myPreviousBooking[0].totalCount[0].count / previousLimit
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

export default MyReservations;
