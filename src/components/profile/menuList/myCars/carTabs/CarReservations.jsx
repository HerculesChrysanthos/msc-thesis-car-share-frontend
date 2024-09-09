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
import AddReview from '../../../../review/AddReview';
import { postBookingReview } from '../../../../../features/user/userSlice';

function CarReservations({ car, setDisplayedCar }) {
  const [pendingPageNum, setPendingPageNum] = useState(1);
  const [acceptedPageNum, setAcceptedPageNum] = useState(1);
  const [previousPageNum, setPreviousPageNum] = useState(1);
  const [pendingLimit, setPendingLimit] = useState(9);
  const [acceptedLimit, setAcceptedLimit] = useState(9);
  const [previousLimit, setPreviousLimit] = useState(9);

  // Review
  const [displayNewReview, setDisplayNewReview] = useState(false);
  const [bookForReview, setBookForReview] = useState({});
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');

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

  const displayStars = (review) => {
    const totalStars = 5;
    const filledStars = review.rating;
    const emptyStars = totalStars - filledStars;

    return (
      <div className='stars'>
        {Array.from({ length: filledStars }, (_, index) => (
          <div className='star' key={index}>
            <IoStar key={`filled-${index}`} fill='#912740' size='18px' />
          </div>
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <div className='star' key={index}>
            <IoStar key={`empty-${index}`} fill='#EFD4DA' size='18px' />
          </div>
        ))}
      </div>
    );
  };

  const displayEmptyStars = (book) => {
    const stars = 5;

    return (
      <div className='stars' onClick={() => displayReviewModal(book)}>
        {Array.from({ length: stars }, (_, index) => (
          <div className='star' key={index}>
            <IoStar key={`empty-${index}`} fill='#EFD4DA' size='18px' />
          </div>
        ))}
      </div>
    );
  };

  const displayReviewModal = (book) => {
    setDisplayNewReview(true);
    setBookForReview(book);
  };

  const submitReview = (e) => {
    e.preventDefault();

    if (!bookForReview) return toast.error('Παρακαλώ διαλέξτε κράτηση');
    if (!rating) return toast.error('Παρακαλώ διαλέξτε βαθμολογία');

    const body = comment ? { rating, comment } : { rating };

    dispatch(postBookingReview({ bookingId: bookForReview._id, body }))
      .unwrap()
      .then((res) => {
        setRating(null);
        setComment('');
        setDisplayNewReview(false);
        setBookForReview({});
      })
      .catch((error) => {
        console.log(error);
      });
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
    bookingPending?.totalCount === 0 &&
    bookingAccepted?.totalCount === 0 &&
    bookingPrevious?.totalCount === 0
  )
    return <div>Δεν υπάρχουν κρατήσεις</div>;

  return (
    <>
      <div className='car-reservations'>
        {bookingPending?.totalCount > 0 && (
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
              {bookingPending?.paginatedResults.map((book) => (
                <div className='book' key={book._id}>
                  <div className='for'>
                    <h3>Έχεις νεα κράτηση για τις:</h3>
                    <div className='dates'>
                      <div className='date'>
                        {formatDate(book.startDate)} -{' '}
                      </div>
                      <div className='date'>{formatDate(book.endDate)}</div>
                    </div>
                  </div>
                  <div className='from pending'>
                    Από τον:{' '}
                    <button
                      onClick={() => navigate(`/user/${book.renter._id}`)}
                    >
                      {book.renter.name} {book.renter.surname}
                    </button>{' '}
                    {book?.renter?.ratingsScore && (
                      <div className='stars'>
                        <IoStar fill='#912740' size='18px' /> (
                        {book?.renter?.ratingsScore.toFixed(2)}/5)
                      </div>
                    )}
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
            {Math.ceil(bookingPending?.totalCount / pendingLimit) > 1 && (
              <ReactPaginate
                breakLabel='...'
                nextLabel={<GoChevronRight size='16px' />}
                onPageChange={(event) => setPendingPageNum(event.selected + 1)}
                pageRangeDisplayed={3}
                pageCount={Math.ceil(bookingPending?.totalCount / pendingLimit)}
                previousLabel={<GoChevronLeft size='16px' />}
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        )}
        {bookingAccepted?.totalCount > 0 && (
          <div className='booking-list'>
            <h2>Προγραμματισμένες</h2>
            <div className='bookings'>
              {bookingAccepted?.paginatedResults.map((book) => (
                <div className='book' key={book._id}>
                  <div className='for'>
                    <h3>Έχεις κράτηση για τις:</h3>
                    <div className='dates'>
                      <div className='date'>
                        {formatDate(book.startDate)} -{' '}
                      </div>
                      <div className='date'>{formatDate(book.endDate)}</div>
                    </div>
                  </div>
                  <div className='from'>
                    Από τον:{' '}
                    <button
                      onClick={() => navigate(`/user/${book.renter._id}`)}
                    >
                      {book.renter.name} {book.renter.surname}
                    </button>{' '}
                    {book?.renter?.ratingsScore && (
                      <div className='stars'>
                        <IoStar fill='#912740' size='18px' /> (
                        {book?.renter?.ratingsScore.toFixed(2)}/5)
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {Math.ceil(bookingAccepted?.totalCount / acceptedLimit) > 1 && (
              <ReactPaginate
                breakLabel='...'
                nextLabel={<GoChevronRight size='16px' />}
                onPageChange={(event) => setAcceptedPageNum(event.selected + 1)}
                pageRangeDisplayed={3}
                pageCount={Math.ceil(
                  bookingAccepted?.totalCount / acceptedLimit
                )}
                previousLabel={<GoChevronLeft size='16px' />}
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        )}
        {bookingPrevious?.totalCount > 0 && (
          <div className='booking-list'>
            <h2>Προηγούμενες</h2>
            <div className='bookings'>
              {bookingPrevious?.paginatedResults.map((book) => (
                <div className='book previous' key={book._id}>
                  {formatStatus(book.status)}
                  <div className='for'>
                    <div className='dates'>
                      <div className='date'>
                        {formatDate(book.startDate)} -{' '}
                      </div>
                      <div className='date'>{formatDate(book.endDate)}</div>
                    </div>
                  </div>
                  <div className='from'>
                    Από τον:{' '}
                    <button
                      onClick={() => navigate(`/user/${book.renter._id}`)}
                    >
                      {book.renter.name} {book.renter.surname}
                    </button>{' '}
                    {book?.renter?.ratingsScore && (
                      <div className='stars'>
                        <IoStar fill='#912740' size='18px' /> (
                        {book?.renter?.ratingsScore.toFixed(2)}/5)
                      </div>
                    )}
                  </div>
                  {book.status === 'DONE' && (
                    <div className='renter-review'>
                      {book.renterReview ? (
                        <div className='my-review'>
                          H δική σου κρητική {displayStars(book.renterReview)}
                        </div>
                      ) : (
                        <div className='my-review'>
                          Άσε την δική σου κρητική {displayEmptyStars(book)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {Math.ceil(bookingPrevious?.totalCount / previousLimit) > 1 && (
              <ReactPaginate
                breakLabel='...'
                nextLabel={<GoChevronRight size='16px' />}
                onPageChange={(event) => setPreviousPageNum(event.selected + 1)}
                pageRangeDisplayed={3}
                pageCount={Math.ceil(
                  bookingPrevious?.totalCount / previousLimit
                )}
                previousLabel={<GoChevronLeft size='16px' />}
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        )}
      </div>
      {displayNewReview && (
        <AddReview
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          setDisplayNewReview={setDisplayNewReview}
          submitReview={submitReview}
        />
      )}
    </>
  );
}

export default CarReservations;
