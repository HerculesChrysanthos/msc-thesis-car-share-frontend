import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Spinner24 from '../Spinner24';

function AddReview({
  rating,
  setRating,
  comment,
  setComment,
  setDisplayNewReview,
  submitReview,
}) {
  const [hover, setHover] = useState(null);

  const closeModal = () => {
    setRating(null);
    setComment('');
    setDisplayNewReview(false);
  };

  const { reviewLoading } = useSelector((state) => state.user);

  return (
    <div className='add-new-review'>
      <form className='modal' onSubmit={submitReview}>
        <div className='close-modal' onClick={closeModal}>
          <IoMdClose size={14} fill='#000' />
        </div>
        <h3>Αφησε την κριτική σου!</h3>
        <p>
          Πες μας την γνώμη σου για την έμπειρα σου πού είχες νοικιάζοντας αμάξι
          απο Car Share!
        </p>
        <div className='stars'>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type='radio'
                  name='rating'
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                />
                <IoStar
                  fill={
                    currentRating <= (hover || rating) ? '#912740' : '#EFD4DA'
                  }
                  size='48px'
                  className='star'
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <textarea
          placeholder='Πρόσθεσε τα σχόλια σου...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='submit'
          className={!rating ? 'disabled-review' : 'submit-review'}
          disabled={!rating}
        >
          {reviewLoading ? (
            <>
              Καταχώρηση
              <div className='spinner-24'>
                <Spinner24 />
              </div>
            </>
          ) : (
            'Καταχώρηση'
          )}
        </button>
      </form>
    </div>
  );
}

export default AddReview;
