import React from 'react';

function UserInformation({ user }) {
  const calculateYearsPassed = (drivingSince) => {
    const { month, year } = drivingSince;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adjust for zero-indexed month

    let yearsPassed = currentYear - year;
    let monthsPassed = currentMonth - month;

    if (monthsPassed < 0) {
      yearsPassed--;
    }

    return yearsPassed;
  };

  return (
    <div className='user-info'>
      <div>
        <h2>Βασικά στοιχεία</h2>
        <div className='select-container'>
          <div className='create-input '>
            <div className='input-label'>Όνομα</div>
            <div className='single-input'>{user?.name}</div>
          </div>
          <div className='create-input '>
            <div className='input-label'>Επίθετο</div>
            <div className='single-input'>{user?.surname}</div>
          </div>
          <div className='create-input '>
            <div className='input-label'>Email</div>
            <div className='single-input'>{user?.email}</div>
          </div>
          <div className='create-input '>
            <div className='input-label'>Phone</div>
            <div className='single-input'>{user?.phone}</div>
          </div>
          <div className='create-input '>
            <div className='input-label'>Γενέθλια</div>
            <div className='single-input'>
              {user?.dateOfBirth?.day &&
              user?.dateOfBirth?.day &&
              user?.dateOfBirth?.day
                ? `${user?.dateOfBirth?.day}/${user?.dateOfBirth?.month}/${user?.dateOfBirth?.year}`
                : ''}
            </div>
          </div>
          <div className='create-input '>
            <div className='input-label'>Οδικά έτη</div>
            {user?.drivingSince && (
              <div className='single-input'>
                {calculateYearsPassed(user?.drivingSince)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
