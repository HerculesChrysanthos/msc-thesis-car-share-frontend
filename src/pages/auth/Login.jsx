import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';

function Login() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const submitLogin = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData))
      .unwrap()
      .then((res) => {
        console.log('ok');
        //navigate(location?.state?.prevUrl ? location?.state?.prevUrl : '/');
      })
      .catch(
        (error) => console.log(error)
        // toast.error('Παρακαλώ εισάγεται έγκυρα στοιχεία εισόδου')
      );
  };

  return <div>Login</div>;
}

export default Login;
