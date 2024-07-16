import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Logo from '../assets/logo/Logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isLoading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <>
      <header className='container'>
        <div className='logo'>
          <img src={Logo} alt='Logo' />
        </div>
        <nav>
          <ul className='flex-center-32'>
            {user ? (
              <>
                <li>
                  {user?.user?.name} {user?.user?.surname}
                </li>
                <li onClick={() => navigate('/car-registration')}>
                  Προσθήκη αυτοκινήτου
                </li>
              </>
            ) : (
              <>
                <li onClick={() => setShowLogin((prevState) => !prevState)}>
                  Login
                </li>
                <li onClick={() => setShowRegister((prevState) => !prevState)}>
                  Register
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} />}
      {showRegister && (
        <Register
          showRegister={showRegister}
          setShowRegister={setShowRegister}
        />
      )}
    </>
  );
}

export default Header;
