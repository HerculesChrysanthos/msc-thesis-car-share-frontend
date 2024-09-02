import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserReviewsAsOwner,
  getUserReviewsAsRenter,
} from '../../features/user/userSlice';
import Spinner from '../Spinner';
import Avatar from '../../assets/profile/Avatar.png';
import { IoMdClose } from 'react-icons/io';
import RatingStars from '../../assets/reviews/rating-stars.png';
import ReactPaginate from 'react-paginate';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

function DisplayReviews({ userId, setDisplayReviews }) {
  const dispatch = useDispatch();
  const {
    reviewsAsOwner,
    reviewsAsRenter,
    reviewsAsOwnerLoading,
    reviewsAsRenterLoading,
  } = useSelector((state) => state.user);

  const [ownerPageNum, setOwnerPageNum] = useState(1);
  const [renterPageNum, setRenterPageNum] = useState(1);
  const [ownerLimit, setOwnerLimit] = useState(9);
  const [renterLimit, setRenterLimit] = useState(9);
  const [displayedMode, setDisplayedMode] = useState('Owner');

  useEffect(() => {
    dispatch(
      getUserReviewsAsOwner({ userId, page: ownerPageNum, limit: ownerLimit })
    )
      .unwrap()
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, userId, ownerPageNum, ownerLimit]);

  useEffect(() => {
    dispatch(
      getUserReviewsAsRenter({
        userId,
        page: renterPageNum,
        limit: renterLimit,
      })
    )
      .unwrap()
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, userId, renterPageNum, renterLimit]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className='display-reviews'>
      <div className='display-reviews-container'>
        <div className='close' onClick={() => setDisplayReviews(false)}>
          <IoMdClose fill='#272728' />
        </div>
        <div className='mode'>
          <div
            className={`${
              displayedMode === 'Owner' ? 'option selected' : 'option'
            }`}
            onClick={() => setDisplayedMode('Owner')}
          >
            Ως ιδιοκτήτης ({reviewsAsOwner?.totalCount})
          </div>
          <div
            className={`${
              displayedMode === 'Renter' ? 'option selected' : 'option'
            }`}
            onClick={() => setDisplayedMode('Renter')}
          >
            Ως ενοικιαστής ({reviewsAsRenter?.totalCount})
          </div>
        </div>
        <div className='reviews'>
          {displayedMode === 'Owner' ? (
            reviewsAsOwnerLoading ? (
              <div className='spinner-full-width'>
                <Spinner />
              </div>
            ) : reviewsAsOwner?.totalCount > 0 ? (
              <>
                {reviewsAsOwner?.paginatedResults.map((review) => (
                  <div key={review._id} className='single-review'>
                    <div className='user'>
                      <div className='profile-img'>
                        <img
                          src={
                            review.reviewer?.profileImage?.url
                              ? review.reviewer.profileImage.url
                              : Avatar
                          }
                          alt='User profile'
                        />
                      </div>
                      <div className='info'>
                        <h3>
                          {review.reviewer.name} {review.reviewer.surname}
                        </h3>
                        <p>{formatDate(review.createdAt)}</p>
                      </div>
                    </div>
                    <div className='comment'>{review.comment}</div>
                  </div>
                ))}
                {Math.ceil(reviewsAsOwner?.totalCount / ownerLimit) > 1 && (
                  <ReactPaginate
                    key={ownerPageNum}
                    breakLabel='...'
                    nextLabel={<GoChevronRight size='16px' />}
                    onPageChange={(event) =>
                      setOwnerPageNum(event.selected + 1)
                    }
                    pageRangeDisplayed={3}
                    pageCount={Math.ceil(
                      reviewsAsOwner?.totalCount / ownerLimit
                    )}
                    previousLabel={<GoChevronLeft size='16px' />}
                    renderOnZeroPageCount={null}
                    forcePage={ownerPageNum - 1}
                  />
                )}
              </>
            ) : (
              <div className='no-results'>
                <h4>Δεν υπάρχουν κριτικές ακόμα</h4>
                <div className='img'>
                  <img src={RatingStars} alt='No reviews image' />
                </div>
              </div>
            )
          ) : reviewsAsRenterLoading ? (
            <div className='spinner-full-width'>
              <Spinner />
            </div>
          ) : reviewsAsRenter?.totalCount > 0 ? (
            <>
              {reviewsAsRenter?.paginatedResults.map((review) => (
                <div key={review._id} className='single-review'>
                  <div className='user'>
                    <div className='profile-img'>
                      <img
                        src={
                          review.reviewer?.profileImage?.url
                            ? review.reviewer.profileImage.url
                            : Avatar
                        }
                        alt='User profile'
                      />
                    </div>
                    <div className='info'>
                      <h3>
                        {review.reviewer.name} {review.reviewer.surname}
                      </h3>
                      <p>{formatDate(review.createdAt)}</p>
                    </div>
                  </div>
                  <div className='comment'>{review.comment}</div>
                </div>
              ))}
              {Math.ceil(reviewsAsRenter?.totalCount / renterLimit) > 1 && (
                <ReactPaginate
                  key={renterPageNum}
                  breakLabel='...'
                  nextLabel={<GoChevronRight size='16px' />}
                  onPageChange={(event) => setRenterPageNum(event.selected + 1)}
                  pageRangeDisplayed={3}
                  pageCount={Math.ceil(
                    reviewsAsRenter?.totalCount / renterLimit
                  )}
                  previousLabel={<GoChevronLeft size='16px' />}
                  renderOnZeroPageCount={null}
                  forcePage={renterPageNum - 1}
                />
              )}
            </>
          ) : (
            <div className='no-results'>
              <h4>Δεν υπάρχουν κριτικές ακόμα</h4>
              <div className='img'>
                <img src={RatingStars} alt='No reviews image' />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayReviews;
