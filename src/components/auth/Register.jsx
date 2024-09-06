import React, { useState } from 'react';
import CarImg from '../../assets/login/login.jpg';
import Logo from '../../assets/logo/Logo.png';
import { BiShowAlt, BiHide } from 'react-icons/bi';
import { FaGoogle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authSlice';

function Register({ showRegister, setShowRegister }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setErrorMessage('Password should be at least 8 characters long.');
      setHasError(true);
      return;
    }
    if (!hasLowerCase) {
      setErrorMessage('Password should contain at least 1 lower-cased letter.');
      setHasError(true);
      return;
    }
    if (!hasUpperCase) {
      setErrorMessage('Password should contain at least 1 upper-cased letter.');
      setHasError(true);
      return;
    }
    if (!hasSymbol) {
      setErrorMessage('Password should contain at least 1 symbol.');
      setHasError(true);
      return;
    }
    setHasError(false);
    return;
  };

  function validateName(name) {
    const hasNumber = /\d/.test(name);

    if (hasNumber) {
      setErrorMessage('invalid name or surname');
      setHasError(true);
      return;
    }
    setHasError(false);
    return;
  }

  const [trigerClose, setTrigerClose] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    surname: '',
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

  const closeModal = () => {
    setTrigerClose(true);
    setTimeout(() => {
      setShowRegister((prevState) => !prevState);
      setTrigerClose(false);
    }, 240);
  };

  const submitRegister = (e) => {
    e.preventDefault();

    const { name, surname, email, password, passwordConfirmation } = form;

    const userData = { name, surname, email, password, passwordConfirmation };

    validateName(name);
    validateName(surname);

    if (password !== passwordConfirmation) {
      setErrorMessage('Οι κωδικοί δεν είναι ίδιοι');
      setHasError(true);
      return;
    }

    validatePassword(password);

    if (hasError) return;

    //console.log(userData);

    dispatch(register(userData))
      .unwrap()
      .then((res) => {
        setShowRegister(false);
        //navigate(location?.state?.prevUrl ? location?.state?.prevUrl : '/');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setHasError(true);
      });
  };

  const registerWithGoogle = () => {
    window.open('http://localhost:8080/api/users/google', '_self');
  };

  return (
    <div className='register'>
      <div
        className={
          trigerClose
            ? 'register-container close-register'
            : 'register-container'
        }
      >
        <div className='close-btn' onClick={closeModal}>
          <IoMdClose size={14} fill='#000' />
        </div>
        <div className='img-container'>
          <img src={CarImg} alt='Register Template Image' />
          <h2>WELCOME</h2>
        </div>
        <div className='register-form'>
          <div className='logo-container'>
            <img src={Logo} alt='Logo Image' />
          </div>
          <form onSubmit={submitRegister}>
            <h2>Εγγραφή</h2>
            <div className='fullName-input'>
              <input
                placeholder='Όνομα'
                type='text'
                name='name'
                onChange={handleForm}
                required
              />
              <input
                placeholder='Επίθετο'
                type='text'
                name='surname'
                onChange={handleForm}
                required
              />
            </div>
            <div className='username-input'>
              <div className='user'>
                <FaEnvelope size={16} />
              </div>
              <input
                placeholder='Email'
                type='email'
                name='email'
                onChange={handleForm}
                required
              />
            </div>
            <div className='password-input'>
              <div className='locker'>
                <RiLockPasswordFill size={16} />
              </div>
              <input
                placeholder='Κωδικός'
                type={showPassword === true ? 'text' : 'password'}
                name='password'
                onChange={handleForm}
                required
              />
              <div className='password-toggle'>
                {showPassword ? (
                  <BiHide onClick={() => setShowPassword(false)} />
                ) : (
                  <BiShowAlt onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
            <div className='password-input'>
              <div className='locker'>
                <RiLockPasswordFill size={16} />
              </div>
              <input
                placeholder='Κωδικός'
                type={showPassword === true ? 'text' : 'password'}
                name='passwordConfirmation'
                onChange={handleForm}
                required
              />
              <div className='password-toggle'>
                {showPassword ? (
                  <BiHide onClick={() => setShowPassword(false)} />
                ) : (
                  <BiShowAlt onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
            {hasError && <span className='errorMessage'>{errorMessage}</span>}
            <label className='term-of-use'>
              <input type='checkbox' name='termOfUse' required />
              <div>
                Έχω διαβάσει τους <u>Ορούς και προϋποθέσεις </u>
              </div>
            </label>
            <button type='submit' disabled={isLoading} className='login-btn'>
              {isLoading ? 'Φόρτωση..' : 'Συνέχεια'}
            </button>
            <div className='google-login'>
              <span>Ή εναλλακτικά</span>
              <div className='google-btn' onClick={registerWithGoogle}>
                <FaGoogle size={18} /> Συνέχεια με την Google
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
