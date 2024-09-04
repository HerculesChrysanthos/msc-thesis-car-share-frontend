import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ProfileInfo from '../components/profile/ProfileInfo';

function Profile() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to='/' />;

  return (
    <div>
      <ProfileInfo />
    </div>
  );
}

export default Profile;
