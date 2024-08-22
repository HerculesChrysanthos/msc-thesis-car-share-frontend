import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { carUpdate } from '../../../../../features/car/carSlice';
import toast from 'react-hot-toast';

function CarExtraFeatures() {
  const dispatch = useDispatch();
  const { carIsLoading, car } = useSelector((state) => state.car);
  const [form, setForm] = useState({
    doors: car?.doors ? car?.doors : '3',
    seats: car?.seats ? car?.seats : '2',
    exteriorColor: car?.exteriorColor ? car?.exteriorColor : '',
    interiorColor: car?.interiorColor ? car?.interiorColor : '',
    extras: car?.features.length ? car?.features : [],
  });

  const [enabledDoorTile, setEnabledDoorTile] = useState(form.doors);
  const [enabledSeatTile, setEnabledSeatTile] = useState(form.seats);
  const [enabledColorTile, setEnabledColorTile] = useState(form.exteriorColor);
  const [enabledInteriorColorTile, setEnabledInteriorColorTile] = useState(
    form.interiorColor
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const doors = ['3', '5', '7+'];

  const seats = ['2', '3', '4', '5', '6', '7+'];

  const exteriorColors = [
    { name: 'Άσπρο', color: '#F0F0F1' },
    { name: 'Μαύρο', color: '#000000' },
    { name: 'Γκρι', color: '#8A8A8A' },
    { name: 'Καφέ', color: '#8E3009' },
    { name: 'Μπλε', color: '#000E8E' },
    { name: 'Κίτρινο', color: '#D8C93C' },
    { name: 'Κόκκινο', color: '#D20000' },
    { name: 'Πράσσινο', color: '#008E17' },
    { name: 'Ρόζ', color: '#F89F9F' },
    { name: 'Άλλο', color: '' },
  ];

  const interiorColors = [
    { name: 'Άσπρο', color: '#F0F0F1' },
    { name: 'Μαύρο', color: '#000000' },
    { name: 'Γκρι', color: '#8A8A8A' },
    { name: 'Καφέ', color: '#8E3009' },
    { name: 'Δίχρωμο', color: '#000E8E' },
    { name: 'Άλλο', color: '' },
  ];

  const extras = [
    'ABS',
    'ESP',
    'GPS',
    'Κάμερα οπισθοπορείας',
    'Air condition',
    'Bluetooth',
  ];

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
      features: extras,
    };

    dispatch(carUpdate({ carId: car._id, body: carFeatures }))
      .unwrap()
      .then((res) => {
        setIsButtonDisabled(false);
        toast.success('Επιτυχής ενημέρωση αυτοκινήτου');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        toast.error(error.message);
        setHasError(true);
        setIsButtonDisabled(false);
      });
  };

  useEffect(() => {
    validateForm(form);
  }, [form]);
  return (
    <div>
      <form onSubmit={sumbitCarFeatures}>
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
                      checked={form.extras.includes(option)}
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
            {carIsLoading ? 'Φόρτωση..' : ' Αποθήκευση'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarExtraFeatures;
