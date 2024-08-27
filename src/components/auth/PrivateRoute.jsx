import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function PrivateRoute({ children }) {
  // const { user } = useSelector((state) => state.auth)

  // const dispatch = useDispatch()
  // const location = useLocation()

  // useEffect(() => {
  //    const status = async () => {
  //       dispatch(checkLoginStatus())
  //    }

  //    status()
  // })

  //   if (user) return children;
  return children;

  //  return <Navigate to='/login' state={{ prevUrl: location.pathname }} />;
}

export default PrivateRoute;
