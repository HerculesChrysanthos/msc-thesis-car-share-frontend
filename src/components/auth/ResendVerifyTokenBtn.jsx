import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resendVerificationToken } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';

function ResendVerifyTokenBtn() {
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);

  const resendEmail = () => {
    dispatch(resendVerificationToken())
      .unwrap()
      .then((res) => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <>
      <button className='resend-verification-token' onClick={resendEmail}>
        Επαναποστολή email επαλήθευσης
      </button>
      {success && (
        <div className='success-message'>
          Το e-mail σας στάλθηκε με επιτυχία. Παρακαλούμε ελέγξτε τα εισερχόμενα
          σας για περισσότερες οδηγίες
        </div>
      )}
    </>
  );
}

export default ResendVerifyTokenBtn;
