import React from 'react';

function CreateCarSteps({ step }) {
  return (
    <div className='register-new-car-steps'>
      <h3>Βήμα {step}/6</h3>
      <div className='steps'>
        <div className={`step ${step >= 1 && 'active-step'}`}></div>
        <div className={`step ${step >= 2 && 'active-step'}`}></div>
        <div className={`step ${step >= 3 && 'active-step'}`}></div>
        <div className={`step ${step >= 4 && 'active-step'}`}></div>
        <div className={`step ${step >= 5 && 'active-step'}`}></div>
        <div className={`step ${step >= 6 && 'active-step'}`}></div>
      </div>
    </div>
  );
}

export default CreateCarSteps;
