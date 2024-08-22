import React, { useEffect, useState, useRef } from 'react';
import {
  getBrandModels,
  getCarBrands,
  carRegistration,
  carUpdate,
} from '../../../../../features/car/carSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEuroSign } from 'react-icons/fa';
import Select from 'react-select';
import toast from 'react-hot-toast';

function CarInfomrations({ car }) {
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: '#fff',
        color: '#000',
        cursor: 'pointer',
        border: 'none',

        ':active': {
          ...styles[':active'],
          backgroundColor: 'red',
          color: '#fff',
        },
        ':hover': {
          ...styles[':active'],
          backgroundColor: '#912740',
          color: '#fff',
        },
      };
    },
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({ ...styles }),
    singleValue: (styles, { data }) => ({ ...styles }),
  };
  const dispatch = useDispatch();
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { carIsLoading } = useSelector((state) => state.car);

  // console.log(car);

  const monthsInGreek = [
    'Ιανουάριος',
    'Φεβρουάριος',
    'Μάρτιος',
    'Απρίλιος',
    'Μάιος',
    'Ιούνιος',
    'Ιούλιος',
    'Αύγουστος',
    'Σεπτέμβριος',
    'Οκτώβριος',
    'Νοέμβριος',
    'Δεκέμβριος',
  ];

  const greekMonthsToNumbers = {
    Ιανουάριος: 1,
    Φεβρουάριος: 2,
    Μάρτιος: 3,
    Απρίλιος: 4,
    Μάιος: 5,
    Ιούνιος: 6,
    Ιούλιος: 7,
    Αύγουστος: 8,
    Σεπτέμβριος: 9,
    Οκτώβριος: 10,
    Νοέμβριος: 11,
    Δεκέμβριος: 12,
  };
  //   key={`my_unique_select_key__${form.model}`}
  const [form, setForm] = useState({
    make: car?.make?.name
      ? { label: car?.make?.name, value: car?.make?._id }
      : '',
    model: car?.model?.name
      ? { label: car?.model?.name, value: car?.model?._id }
      : '',
    plate: car?.registrationPlate || '',
    mileage: car?.mileage || '',
    fuelType: car?.fuelType
      ? { label: car?.fuelType, value: car?.fuelType }
      : '',
    engineSize: car?.engineSize || '',
    gearboxType: car?.gearboxType
      ? { label: car?.gearboxType, value: car?.gearboxType }
      : '',
    enginePower: car?.enginePower || '',
    kilowatt: car?.kilowatt || '',
    price: car?.rentPerHour || '',
    year: car?.registration?.year
      ? { label: car?.registration?.year, value: car?.registration?.year }
      : '',
    month: car?.registration?.month
      ? {
          label: car?.registration?.month,
          value: monthsInGreek[car?.registration?.month - 1],
        }
      : '',
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(currentYear - 1900 + 1),
    (val, index) => 1900 + index
  ).reverse();

  const fuelTypes = ['Βενζίνη', 'Πετρέλαιο', 'Αέριο', 'Ηλεκτρικό'];

  const gearboxTypes = ['Αυτόματο', 'Μηχανικό', 'Ημιαυτόματο'];

  // const handleForm = (e) => {
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const validateForm = (state) => {
    const requiredFields = [
      'make',
      'model',
      'plate',
      'mileage',
      'fuelType',
      'gearboxType',
      'enginePower',
      'price',
      'year',
      'month',
    ];

    const extraField =
      state.fuelType.value === 'Ηλεκτρικό' ? 'kilowatt' : 'engineSize';
    requiredFields.push(extraField);

    const isValid = requiredFields.every(
      (field) => state[field] !== '' && state[field] !== null
    );
    setIsButtonDisabled(!isValid);
  };

  const handleForm = (name, value) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDataChange = (value, action) => {
    handleForm(action.name, value);

    if (action.name === 'fuelType' && value.value === 'Ηλεκτρικό') {
      handleForm('engineSize', '');
    }

    if (action.name === 'fuelType' && value.value !== 'Ηλεκτρικό') {
      handleForm('kilowatt', '');
    }
  };

  const handleLP = (event) => {
    let value = event.target.value;

    value = value.replace(/[^Α-Ω0-9-]/g, '');

    let firstThree = value.substring(0, 3);
    firstThree = firstThree.replace(/[^Α-Ω]/g, '');

    if (value.length > 3 && value[3] !== '-') {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }

    let hyphen = value.substring(3, 4);
    hyphen = hyphen.replace(/[^-]/g, '');

    let nextFour = value.substring(4, 9);
    nextFour = nextFour.replace(/[^0-9]/g, '');

    value = firstThree + hyphen + nextFour;

    if (value.length <= 8) {
      handleForm(event.target.name, value);
    }
  };

  const handleNumbers = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    if (value <= 1000000 && value >= 0) {
      handleForm(event.target.name, value);
    }
  };

  const validatePlate = (plate) => {
    const plateRegex = /^[Α-Ω]{3}-\d{4}$/;

    if (!plateRegex.test(plate)) {
      toast.error('Ο αριθμός κυκλοφορίας πρέπει να είναι της μορφής ΑΒΓ-1234');
      return false;
    }

    return true;
  };

  const sumbitCarRegistration = (e) => {
    e.preventDefault();

    const {
      make,
      model,
      plate,
      mileage,
      fuelType,
      engineSize,
      gearboxType,
      enginePower,
      kilowatt,
      price,
      month,
      year,
    } = form;

    const carData = {
      make: make.value,
      model: model.value,
      mileage: Number(mileage),
      fuelType: fuelType.value,
      gearboxType: gearboxType.value,
      enginePower: Number(enginePower),
      rentPerHour: Number(price),
      registration: {
        month: greekMonthsToNumbers[month.value],
        year: year.value,
      },
    };

    if (engineSize !== '' && engineSize !== null) {
      carData.engineSize = Number(engineSize);
    } else {
      carData.kilowatt = Number(kilowatt);
    }

    if (!validatePlate(plate)) {
      return;
    }

    setIsButtonDisabled(true);

    if (!car) {
      return;
    } else {
      /**
       * check if plate is not the same with previous
       * if not, add new plates for update
       */
      if (plate !== car.registrationPlate) {
        carData.registrationPlate = plate;
      }

      dispatch(carUpdate({ carId: car._id, body: carData }))
        .unwrap()
        .then((res) => {
          setIsButtonDisabled(false);
          toast.success('Επιτυχής ενημέρωση αυτοκινήτου');
        })
        .catch((error) => {
          setErrorMessage(error.message);
          toast.error(error.message);
          setHasError(true);
          setIsButtonDisabled(false);
        });
    }
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    dispatch(getCarBrands())
      .unwrap()
      .then((res) => {
        setMakes(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      model: car?.model?.name
        ? { label: car?.model?.name, value: car?.model?._id }
        : '',
    }));
    if (form.make !== '' && form.make !== null) {
      dispatch(getBrandModels(form.make.value))
        .unwrap()
        .then((res) => {
          setModels(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [form?.make]);

  useEffect(() => {
    validateForm(form);
  }, [form]);
  return (
    <div ref={wrapperRef}>
      <form onSubmit={sumbitCarRegistration}>
        <div className='select-container'>
          <div className='create-select'>
            <div className='select-label'>Mάρκα</div>
            <Select
              className='single-select'
              classNamePrefix='custom-select'
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name='make'
              onChange={onDataChange}
              placeholder='πχ Volkswagen'
              required={true}
              defaultValue={form.make}
              styles={colourStyles}
              options={makes?.map((model) => ({
                value: model?._id,
                label: model?.name,
              }))}
            />
          </div>
          <div className='create-select'>
            <div className='select-label'>Μοντέλο</div>
            <Select
              className='single-select'
              classNamePrefix='custom-select'
              defaultValue={form.model}
              key={`my_unique_select_key__${form.model}`}
              isDisabled={form.make === null ? true : false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name='model'
              onChange={onDataChange}
              placeholder='πχ Golf'
              styles={colourStyles}
              required={true}
              options={models?.map((model) => ({
                value: model?._id,
                label: model?.name,
              }))}
            />
          </div>
          <div className='create-select'>
            <div className='select-label'>Έτος</div>
            <Select
              required={true}
              className='single-select'
              classNamePrefix='custom-select'
              defaultValue={form.year}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name='year'
              onChange={onDataChange}
              placeholder='πχ 2006'
              styles={colourStyles}
              options={years.map((year) => ({
                value: year,
                label: year,
              }))}
            />
          </div>
          <div className='create-select'>
            <div className='select-label'>Μήνας</div>
            <Select
              className='single-select'
              classNamePrefix='custom-select'
              defaultValue={form.month}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name='month'
              onChange={onDataChange}
              placeholder='πχ Σεπτέμβριος'
              styles={colourStyles}
              required={true}
              options={monthsInGreek.map((month) => ({
                value: month,
                label: month,
              }))}
            />
          </div>
          <div className='create-input '>
            <div className='input-label'>Αριθμός κυκλοφορίας</div>
            <input
              type='text'
              placeholder='πχ ΧΧΧ-0000'
              className='single-input'
              onChange={handleLP}
              name='plate'
              value={form.plate}
              required={true}
            />
          </div>
          <div className='create-input '>
            <div className='input-label'>Χιλιόμετρα</div>
            <input
              type='text'
              placeholder='πχ 78.000'
              className='single-input'
              onChange={handleNumbers}
              name='mileage'
              value={form.mileage}
              required={true}
            />
          </div>
          <div className='create-select full-row'>
            <div className='select-label'>Καύσιμο</div>
            <Select
              className='single-select'
              classNamePrefix='custom-select'
              isClearable={true}
              isRtl={false}
              isSearchable={false}
              name='fuelType'
              defaultValue={form.fuelType}
              onChange={onDataChange}
              placeholder='Επιλέξτε καύσιμο'
              styles={colourStyles}
              required={true}
              options={fuelTypes.map((fuel) => ({
                value: fuel,
                label: fuel,
              }))}
            />
          </div>
          {form.fuelType?.value === 'Ηλεκτρικό' ? (
            <div className='create-input '>
              <div className='input-label'>Kilowatt</div>
              <input
                type='text'
                placeholder='πχ 350'
                className='single-input'
                onChange={handleNumbers}
                name='kilowatt'
                value={form.kilowatt}
                required={true}
              />
            </div>
          ) : (
            <div className='create-input '>
              <div className='input-label'>Κυβικά</div>
              <input
                type='text'
                placeholder='πχ 1400'
                className='single-input'
                onChange={handleNumbers}
                name='engineSize'
                value={form.engineSize}
                required={true}
              />
            </div>
          )}
          <div className='create-input '>
            <div className='input-label'>Ίπποι</div>
            <input
              type='text'
              placeholder='πχ 100'
              className='single-input'
              onChange={handleNumbers}
              name='enginePower'
              value={form.enginePower}
              required={true}
            />
          </div>
          <div className='create-select full-row'>
            <div className='select-label'>Κιβώτιο ταχυτήτων</div>
            <Select
              className='single-select'
              classNamePrefix='custom-select'
              isClearable={true}
              defaultValue={form.gearboxType}
              isRtl={false}
              isSearchable={false}
              name='gearboxType'
              onChange={onDataChange}
              placeholder='Επιλέξτε κιβώτιο ταχυτήτων'
              styles={colourStyles}
              required={true}
              options={gearboxTypes.map((type) => ({
                value: type,
                label: type,
              }))}
            />
          </div>
          <div className='create-input full-row'>
            <div className='input-label'>Τιμή ενικοίασης ανά ώρα</div>
            <input
              type='text'
              placeholder='πχ 15'
              className='single-input'
              onChange={handleNumbers}
              value={form.price}
              name='price'
              required={true}
            />
            <FaEuroSign color={'#912740'} className='euro' size={18} />
          </div>
        </div>
        <div className='buttons'>
          {' '}
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

export default CarInfomrations;
