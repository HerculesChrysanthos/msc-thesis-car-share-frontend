import React from 'react';

function RegisterCarCom4({ setStep }) {
  const handleGoBackButton = (e) => {
    setStep(2);
  };
  return (
    <div>
      <form action=''>
        <div className='buttons'>
          <button type='submit' className='register-car-btn'>
            {/* {carIsLoading ? 'Φόρτωση..' : ' Επόμενο'} */}Epomeno
          </button>
          <button
            type='button'
            className='go-back-car-btn'
            onClick={handleGoBackButton}
          >
            Προηγούμενο
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCarCom4;
