import React, { useEffect } from 'react';
import Spinner24 from '../components/Spinner24';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { verifyUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

function VerifyToken() {
  const { user, userVerificationLoading } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();

  const verificationToken = searchParams?.get('token');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!verificationToken) return navigate('/');

    dispatch(verifyUser({ verificationToken }))
      .unwrap()
      .then((res) => {
        toast.success('Επιτυχής επαλήθευση');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Το e-mail δεν επαληθεύτηκε');
      });
  }, [verificationToken]);

  if (!user)
    return <Navigate to='/not-found' state={{ prevUrl: location.pathname }} />;

  if (user.user.verified === 'true')
    return <Navigate to='/not-found' state={{ prevUrl: location.pathname }} />;

  return (
    <div className='container'>
      <div className='verify-token'>
        <h2>Γίνεται επαλήθευση του e-mail</h2>
        {userVerificationLoading && (
          <div className='spinner-24'>
            <Spinner24 />
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyToken;
