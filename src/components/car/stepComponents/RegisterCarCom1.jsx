import React, { useEffect, useState, useRef } from 'react';
import { getBrandModels, getCarBrands } from '../../../features/car/carSlice';
import { useDispatch } from 'react-redux';
import { FaEuroSign } from 'react-icons/fa';
import Select from 'react-select';

function RegisterCarCom1({ step, setStep }) {
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
  const [form, setForm] = useState({
    make: null,
    model: null,
    plate: '',
    password: '',
    passwordConfirmation: '',
  });

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

  const options = Array.from(
    { length: new Date().getFullYear() - 1899 },
    (_, index) => new Date().getFullYear() - index
  );

  const makeOptions = makes?.map((make) => ({
    value: make?._id,
    label: make?.name,
  }));

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const selectRef = useRef(null);

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
      // selectRef.current.select.openMenu('first');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onDataChange = (value, action) => {
    setForm((prevState) => ({
      ...prevState,
      [action.name]: value,
    }));
  };

  const handleLP = (event) => {
    const { value } = event.target;
    // Define a regex pattern for the desired format: 3 letters, a hyphen, and 4 digits
    const regex = /^[A-Za-z]{0,3}(-[0-9]{0,4})?$/;

    // Check if the current input value matches the pattern
    if (regex.test(value)) {
      setForm((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);
  //const inputRef = useRef(null);

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
      model: null,
    }));
    if (form.make !== null) {
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
  return (
    <div ref={wrapperRef}>
      <form>
        <h2>Στοιχεία οχήματος</h2>
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
              value={form.model || ''}
              isDisabled={form.make === null ? true : false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name='model'
              onChange={onDataChange}
              placeholder='πχ Golf'
              styles={colourStyles}
              options={models?.map((model) => ({
                value: model?._id,
                label: model?.name,
              }))}
            />
          </div>
          <div className='create-input full-row'>
            <div className='input-label'>Αριθμός κυκλοφορίας</div>
            <input
              type='text'
              placeholder='πχ ΧΧΧ-0000'
              className='single-input'
              onChange={handleLP}
              name='plate'
            />
            <FaEuroSign color={'#912740'} className='euro' size={18} />
          </div>
          <div>
            <Select
              className='basic-single'
              classNamePrefix='select'
              // defaultValue={colourOptions[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name='color'
              options={makes}
            />
          </div>
          <div>
            <Select
              className='basic-single'
              classNamePrefix='select'
              // defaultValue={colourOptions[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name='color'
              options={makes}
            />
          </div>
          <div>
            <Select
              className='basic-single'
              classNamePrefix='select'
              // defaultValue={colourOptions[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name='color'
              options={makes}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterCarCom1;
