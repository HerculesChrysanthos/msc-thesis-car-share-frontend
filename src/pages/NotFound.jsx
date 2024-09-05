import React from 'react';
import { TbError404 } from 'react-icons/tb';

function NotFound() {
  return (
    <div className='container'>
      <div className='not-found-page'>
        <TbError404 color='rgb(145, 39, 64)' size='86px' />
        <h2>H σελίδα δεν βρέθηκε</h2>
      </div>
    </div>
  );
}

export default NotFound;
