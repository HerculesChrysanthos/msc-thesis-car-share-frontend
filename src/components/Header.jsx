import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Logo from '../assets/logo/Logo.png';
import { useNavigate } from 'react-router-dom';
import Avatar from '../assets/profile/Avatar.png';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [displaySubmenu, setDisplaySubMenu] = useState(false);
  const { isLoading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className='container'>
        <div className='logo' onClick={() => navigate('/')}>
          <img src={Logo} alt='Logo' />
        </div>
        <nav className='navigation'>
          <ul>
            {user ? (
              <>
                <li
                  onClick={() => setDisplaySubMenu((prevState) => !prevState)}
                >
                  <div className='profile-thumbnail'>
                    <img
                      src={
                        user.user?.profileImage?.url
                          ? user.user?.profileImage?.url
                          : Avatar
                      }
                      alt='Profile image'
                    />
                  </div>
                  <p>{user?.user?.name}</p>
                </li>
                <li onClick={() => navigate('/car-registration')}>
                  Νοίκιασε το αμάξι σου
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
      {displaySubmenu && (
        <div className='submenu'>
          <ul>
            <li onClick={() => navigate('/profile') & setDisplaySubMenu(false)}>
              Ο Λογαριασμός μου
            </li>
            <li
              className='mobile'
              onClick={() =>
                navigate('/car-registration') & setDisplaySubMenu(false)
              }
            >
              Νοίκιασε το αμάξι σου
            </li>
            <li onClick={logout}>Αποσύνδεση</li>
          </ul>
        </div>
      )}

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
