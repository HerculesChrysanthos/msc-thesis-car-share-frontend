import React, { useState } from 'react';
import CreateCarSteps from './CreateCarSteps';
import RegisterCarCom1 from './stepComponents/RegisterCarCom1';
import RegisterCarCom2 from './stepComponents/RegisterCarCom2';
import RegisterCarCom3 from './stepComponents/RegisterCarCom3';
import RegisterCarCom4 from './stepComponents/RegisterCarCom4';

function RegisterNewCar() {
  const [step, setStep] = useState(1);

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return <RegisterCarCom1 step={step} setStep={setStep} />;
      case 2:
        return <RegisterCarCom2 step={step} setStep={setStep} />;
      case 3:
        return <RegisterCarCom3 step={step} setStep={setStep} />;
      case 4:
        return <RegisterCarCom4 step={step} setStep={setStep} />;
      default:
        return <div>page not found</div>;
    }
  };
  return (
    <div className='register-car container'>
      <h1>Καταχώριση οχήματος</h1>
      <CreateCarSteps step={step} />
      {renderStep(step)}
    </div>
  );
}

export default RegisterNewCar;
