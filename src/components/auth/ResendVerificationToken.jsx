import React from 'react';
import ResendVerifyTokenBtn from './ResendVerifyTokenBtn';

function ResendVerificationToken() {
  return (
    <div className='container'>
      <div className='resendVerificationToken'>
        <h2>Το e-mail σας δεν έχει επαληθευτεί.</h2>
        <p>Για να προχωρήσετε, επαληυεύστε το email σας</p>
        <ResendVerifyTokenBtn />
      </div>
    </div>
  );
}

export default ResendVerificationToken;
