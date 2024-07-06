import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { useSelector } from 'react-redux';

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { isLoading, user } = useSelector((state) => state.auth);

  console.log(user);

  return (
    <div>
      {user ? (
        <div>
          {user.user.name} {user.user.surname}
        </div>
      ) : (
        <>
          <div onClick={() => setShowLogin((prevState) => !prevState)}>
            Login
          </div>
          <div onClick={() => setShowRegister((prevState) => !prevState)}>
            Register
          </div>
        </>
      )}

      {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} />}
      {showRegister && (
        <Register
          showRegister={showRegister}
          setShowRegister={setShowRegister}
        />
      )}
    </div>
  );
}

export default Home;
