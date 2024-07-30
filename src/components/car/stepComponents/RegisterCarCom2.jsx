import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterCarCom2({ step, setStep }) {
  const [enabledDoorTile, setEnabledDoorTile] = useState(null);
  const [enabledSeatTile, setEnabledSeatTile] = useState(null);
  const [enabledColorTile, setEnabledColorTile] = useState(null);
  const [enabledInteriorColorTile, setEnabledInteriorColorTile] =
    useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { carIsLoading } = useSelector((state) => state.car);

  const [form, setForm] = useState({
    doors: '',
    seats: '',
    exteriorColor: '',
    interiorColor: '',
    extras: [],
  });

  const doors = ['3', '5', '7+'];

  const seats = ['2', '3', '4', '5', '6', '7+'];

  const exteriorColors = [
    { name: 'Άσπρο', color: '#F0F0F1' },
    { name: 'Μαύρο', color: '#000000' },
    { name: 'Γκρί', color: '#8A8A8A' },
    { name: 'Καφέ', color: '#8E3009' },
    { name: 'Μπλέ', color: '#000E8E' },
    { name: 'Κίτρινο', color: '#D8C93C' },
    { name: 'Κόκκινο', color: '#D20000' },
    { name: 'Πράσσινο', color: '#008E17' },
    { name: 'Ρόζ', color: '#F89F9F' },
    { name: 'Άλλο', color: '' },
  ];

  const interiorColors = [
    { name: 'Άσπρο', color: '#F0F0F1' },
    { name: 'Μαύρο', color: '#000000' },
    { name: 'Γκρί', color: '#8A8A8A' },
    { name: 'Καφέ', color: '#8E3009' },
    { name: 'Δίχρωμο', color: '#000E8E' },
    { name: 'Άλλο', color: '' },
  ];

  const extras = [
    'ABS',
    'ESP',
    'GPS',
    'Κάμερα Οπισθοπορείας',
    'Air condition',
    'Bluetooth',
  ];

  // const handleForm = (e) => {
  //   console.log(e.target.value);
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleForm = (name, value) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDoorClick = (door) => {
    setEnabledDoorTile(door);
  };

  const handleSeatClick = (door) => {
    setEnabledSeatTile(door);
  };

  const handleExteriorColorClick = (color) => {
    setEnabledColorTile(color.name);
  };

  const handleInteriorColorClick = (color) => {
    setEnabledInteriorColorTile(color.name);
  };

  const validateForm = (state) => {
    const requiredFields = ['seats', 'doors'];

    const isValid = requiredFields.every(
      (field) => state[field] !== '' && state[field] !== null
    );

    setIsButtonDisabled(!isValid);
  };

  const hanldeExtras = (event) => {
    const { value, checked } = event.target;

    setForm((prevForm) => {
      const newExtras = checked
        ? [...prevForm.extras, value]
        : prevForm.extras.filter((extra) => extra !== value);

      return { ...prevForm, extras: newExtras };
    });
  };

  const handleGoBackButton = (e) => {
    setFromNextStep(true);
    setStep(1);
  };

  const sumbitCarFeatures = (e) => {
    e.preventDefault();

    const { doors, seats, exteriorColor, interiorColor, extras } = form;

    const carFeatures = {
      doors,
      seats,
      exteriorColor: exteriorColor.name,
      interiorColor: interiorColor.name,
      extras,
    };

    console.log(carFeatures);
  };

  useEffect(() => {
    validateForm(form);
  }, [form]);

  return (
    <div>
      <form onSubmit={sumbitCarFeatures}>
        <h2>Επιπλέον χαρακτηριστικά</h2>
        <div className='com2-container'>
          <div className='feature-area'>
            <h3>Αριθμός θυρών</h3>
            <div className='tile-area'>
              {doors.map((door, index) => (
                <div
                  key={door}
                  className={`tile ${
                    enabledDoorTile === door ? 'enabled' : ''
                  }`}
                  onClick={() => {
                    handleDoorClick(door);
                    handleForm('doors', door);
                  }}
                >
                  <h4>{door}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className='feature-area'>
            <h3>Αριθμός θέσεων</h3>
            <div className='tile-area'>
              {seats.map((seat, index) => (
                <div
                  key={seat}
                  className={`tile ${
                    enabledSeatTile === seat ? 'enabled' : ''
                  }`}
                  onClick={() => {
                    handleSeatClick(seat);
                    handleForm('seats', seat);
                  }}
                >
                  <h4>{seat}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className='feature-area'>
            <h3>
              Εξωτερικό χρώμα
              <span className='additional-text'> (προαιρετικό)</span>
            </h3>
            <div className='color-area'>
              {exteriorColors.map((color) => (
                <div
                  key={color.name}
                  className={`color-tile ${
                    enabledColorTile === color.name ? 'enabled' : ''
                  }`}
                  onClick={() => {
                    handleExteriorColorClick(color);
                    handleForm('exteriorColor', color);
                  }}
                >
                  <div className='color-display'>
                    {color.color !== '' ? (
                      <div className='out-color-circle'>
                        <div
                          className='color-circle'
                          style={{ backgroundColor: color.color }}
                        ></div>
                      </div>
                    ) : (
                      ''
                    )}

                    <h4 className='color-name'>{color.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='feature-area'>
            <h3>
              Εσωτερικό χρώμα
              <span className='additional-text'> (προαιρετικό)</span>
            </h3>
            <div className='color-area'>
              {interiorColors.map((color) => (
                <div
                  key={color.name}
                  className={`color-tile ${
                    enabledInteriorColorTile === color.name ? 'enabled' : ''
                  }`}
                  onClick={() => {
                    handleInteriorColorClick(color);
                    handleForm('interiorColor', color);
                  }}
                >
                  <div className='color-display'>
                    {color.color !== '' ? (
                      <div className='out-color-circle'>
                        <div
                          className='color-circle'
                          style={{ backgroundColor: color.color }}
                        ></div>
                      </div>
                    ) : (
                      ''
                    )}

                    <h4 className='color-name'>{color.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='feature-area'>
            <h3>
              Επιπλέον
              <span className='additional-text'> (προαιρετικό)</span>
            </h3>

            <div className='checkbox-container'>
              {extras.map((option) => (
                <div key={option} className='checkbox-item'>
                  <label htmlFor={option}>
                    <input
                      type='checkbox'
                      name={option}
                      value={option}
                      onChange={hanldeExtras}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='buttons'>
          <button
            type='submit'
            disabled={isButtonDisabled}
            className='register-car-btn'
          >
            {carIsLoading ? 'Φόρτωση..' : ' Επόμενο'}
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

export default RegisterCarCom2;
