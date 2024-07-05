import React, { useState } from 'react';
import Login from '../components/auth/Login';

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      <div onClick={() => setShowLogin((prevState) => !prevState)}>Login</div>
      {showLogin && <Login showLogin={showLogin} setShowLogin={setShowLogin} />}
    </div>
  );
}

export default Home;
