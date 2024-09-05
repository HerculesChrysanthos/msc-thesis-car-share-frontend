import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { googleLogin, login } from '../../features/auth/authSlice';
import CarImg from '../../assets/login/login.jpg';
import Logo from '../../assets/logo/Logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiShowAlt, BiHide } from 'react-icons/bi';
import { FaGoogle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEnvelope } from 'react-icons/fa';

function Login({ showLogin, setShowLogin }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [trigerClose, setTrigerClose] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {
    setTrigerClose(true);
    setTimeout(() => {
      setShowLogin((prevState) => !prevState);
      setTrigerClose(false);
    }, 240);
  };

  const submitLogin = (e) => {
    e.preventDefault();

    const userData = { email, password };

    console.log(userData);

    dispatch(login(userData))
      .unwrap()
      .then((res) => {
        setShowLogin(false);
        //navigate(location?.state?.prevUrl ? location?.state?.prevUrl : '/');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setHasError(true);
      });
  };

  const loginWithGoogle = () => {
    // dispatch(googleLogin())
    //    .unwrap()
    //    .then((res) => {
    //       setShowLogin(false)
    //    })
    //    .catch((error) => {
    //       setErrorMessage(error.message)
    //       setHasError(true)
    //    })

    window.open('http://localhost:8080/api/users/google', '_self');
  };
  return (
    <div className='login'>
      <div
        className={
          trigerClose ? 'login-container close-login' : 'login-container'
        }
      >
        <div className='close-btn' onClick={closeModal}>
          <IoMdClose size={14} fill='#000' />
        </div>
        <div className='img-container'>
          <img src={CarImg} alt='Login Template Image' />
          <h2>
            WELCOME
            <br />
            BACK
          </h2>
        </div>
        <div className='login-form'>
          <div className='logo-container'>
            <img src={Logo} alt='Logo Image' />
          </div>
          <form onSubmit={submitLogin}>
            <h2>Σύνδεση</h2>
            <div className='username-input'>
              <div className='user'>
                <FaEnvelope size={16} />
              </div>
              <input
                placeholder='Email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='password-input'>
              <div className='locker'>
                <RiLockPasswordFill size={16} />
              </div>
              <input
                placeholder='Κωδικός'
                type={showPassword === true ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
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
            <span className='forgot-pass' onClick={() => navigate('/')}>
              Ξέχασες τον κωδικό σου;
            </span>
            <button type='submit' disabled={isLoading} className='login-btn'>
              {isLoading ? 'Φόρτωση..' : 'Συνέχεια'}
            </button>
            <div className='google-login'>
              <span>Ή εναλλακτικά</span>
              <div className='google-btn' onClick={loginWithGoogle}>
                <FaGoogle size={18} /> Συνέχεια με την Google
              </div>
            </div>
            <div className='register-text'>
              Δεν έχει λογαριασμό;
              <br />
              Κάνε την εγγραφή σου <span>εδώ</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
