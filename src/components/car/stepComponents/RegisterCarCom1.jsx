import React, { useEffect, useState } from 'react';
import { getBrandModels, getCarBrands } from '../../../features/car/carSlice';
import { useDispatch } from 'react-redux';

function RegisterCarCom1({ step, setStep }) {
  const dispatch = useDispatch();
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({
    brand: null,
    model: null,
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
  console.log(form.brand);
  useEffect(() => {
    if (form.brand !== null) {
      dispatch(getBrandModels(form.brand))
        .unwrap()
        .then((res) => {
          setModels(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [form?.brand]);
  return (
    <div>
      <form>
        <h2>Στοιχεία οχήματος</h2>
        <select name='brand' defaultValue='' onChange={handleForm}>
          <option value='' disabled hidden>
            πχ Volkswagen
          </option>
          {makes?.map((make) => (
            <option value={make?._id} key={make?._id}>
              {make?.name}
            </option>
          ))}
        </select>
        {form.brand !== null && (
          <select name='model' defaultValue='' onChange={handleForm}>
            <option value='' disabled hidden>
              πχ 2
            </option>
            {models?.map((model) => (
              <option value={model?._id} key={model?._id}>
                {model?.name}
              </option>
            ))}
          </select>
        )}
      </form>
    </div>
  );
}

export default RegisterCarCom1;
