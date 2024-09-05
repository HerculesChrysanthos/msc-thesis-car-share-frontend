import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMe } from '../../features/auth/authSlice';
import Spinner from '../Spinner';
import ResendVerificationToken from './ResendVerificationToken';

function PrivateRoute({ children }) {
  const { user, checkAuthLoading } = useSelector((state) => state.auth);

  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getMe())
      .unwrap()
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        const { message } = error;
        setError(message);
      });
  }, []);

  if (checkAuthLoading) return <Spinner />;

  if (error === 'Πρέπει να κάνεις verify το email σου για να προχωρήσεις.')
    return <ResendVerificationToken state={{ prevUrl: location.pathname }} />;

  if (!user)
    return <Navigate to='/not-found' state={{ prevUrl: location.pathname }} />;

  //   if (user) return children;
  return children;
}

export default PrivateRoute;
