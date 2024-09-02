import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getMyBookingAccepted,
  getMyBookingPrevious,
  postBookingReview,
} from '../../../features/user/userSlice';
import { IoStar } from 'react-icons/io5';
import { FaEuroSign } from 'react-icons/fa';
import NoReservationsImage from '../../../assets/profile/no-reservation.png';
import AddReview from '../../review/AddReview';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft } from 'react-icons/go';
import { GoChevronRight } from 'react-icons/go';
import { changeBookingState } from '../../../features/booking/bookingSlice';

function MyReservations() {
  const [acceptedPageNum, setAcceptedPageNum] = useState(1);
  const [previousPageNum, setPreviousPageNum] = useState(1);
  const [acceptedLimit, setAcceptedLimit] = useState(9);
  const [previousLimit, setPreviousLimit] = useState(9);

  const [displayNewReview, setDisplayNewReview] = useState(false);
  const [bookForReview, setBookForReview] = useState({});
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');

  const [forceRender, setForceRender] = useState(true);
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
        pageNum: acceptedPageNum,
        limit: acceptedLimit,
      })
    )
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [user.user._id, acceptedPageNum, acceptedLimit, forceRender]);

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
  }, [user.user._id, previousPageNum, previousLimit, forceRender]);

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

  const displayReviewModal = (book) => {
    setDisplayNewReview(true);
    setBookForReview(book);
  };

  const cancellBooking = (id) => {
    dispatch(changeBookingState({ id, state: 'cancel' }))
      .unwrap()
      .then((res) => {
        toast.success('Η κράτηση ακυρώθηκε');
        setForceRender((prev) => !prev);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  if (
    myAcceptedBooking[0]?.paginatedResults.length === 0 &&
    myPreviousBooking[0]?.paginatedResults.length === 0
  )
    return (
      <div className='no-cars-registered'>
        <h2>Δεν υπάρχει κάποια κράτηση ακόμα</h2>
        <div className='img'>
          <img src={NoReservationsImage} alt='No reservations image' />
        </div>
      </div>
    );

  return (
    <div className='my-reservations'>
      {myAcceptedBooking[0]?.paginatedResults.length > 0 && (
        <div className='booking-list'>
          <h2>Προγραμματισμένες</h2>
          <div className='bookings'>
            {myAcceptedBooking[0]?.paginatedResults.map((book) => (
              <div className='book' key={book._id}>
                <div className='car-img'>
                  <img src={book.car?.thumbnail?.url} alt='Car Thumbnail' />
                </div>
                <div>
                  <div className='name-price'>
                    <div className='make'>
                      {book.car.make.name} {book.car.model.name}
                    </div>
                    <div className='price'>
                      {book.totalPrice}{' '}
                      <FaEuroSign className='euro' size={20} />
                    </div>
                  </div>
                  <div className='for'>
                    <div className='dates'>
                      <div className='date'>
                        {formatDate(book.startDate)} -{' '}
                      </div>
                      <div className='date'>{formatDate(book.endDate)}</div>
                    </div>
                  </div>
                  <div className='from'>
                    <div className='client'>
                      Από τον:{' '}
                      <button
                        onClick={() => navigate(`/user/${book.car.owner._id}`)}
                      >
                        {book.car.owner.name} {book.car.owner.surname}
                      </button>{' '}
                    </div>
                    {book?.ownerReview?.rating && (
                      <div className='stars'>
                        <IoStar fill='#912740' size='18px' /> (
                        {book?.ownerReview?.rating}/5)
                      </div>
                    )}
                  </div>
                  <div
                    className='cancellation'
                    onClick={() => cancellBooking(book._id)}
                  >
                    <button>Ακύρωση</button>
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
              <div className='book' key={book._id}>
                <div className='car-img'>
                  <img src={book.car.thumbnail?.url} alt='Car Thumbnail' />
                </div>
                <div>
                  <div className='name-price'>
                    <div className='make'>
                      {book.car.make.name} {book.car.model.name}
                    </div>
                    <div className='price'>
                      {book.totalPrice}{' '}
                      <FaEuroSign className='euro' size={20} />
                    </div>
                  </div>
                  <div className='for'>
                    <div className='dates'>
                      <div className='date'>
                        {formatDate(book.startDate)} -{' '}
                      </div>
                      <div className='date'>{formatDate(book.endDate)}</div>
                    </div>
                  </div>
                  <div className='from'>
                    <div className='client'>
                      Από τον:{' '}
                      <button
                        onClick={() => navigate(`/user/${book.car.owner._id}`)}
                      >
                        {book.car.owner.name} {book.car.owner.surname}
                      </button>{' '}
                    </div>
                    {book?.ownerReview?.rating && (
                      <div className='stars'>
                        <IoStar fill='#912740' size='18px' /> (
                        {book?.ownerReview?.rating}/5)
                      </div>
                    )}
                  </div>
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
    </div>
  );
}

export default MyReservations;
