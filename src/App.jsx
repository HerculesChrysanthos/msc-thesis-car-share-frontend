import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Header from './components/Header';
import CarRegistration from './pages/CarRegistration';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Search from './pages/Search';
import PrivateRoute from './components/auth/PrivateRoute';
import User from './pages/User';
import Car from './pages/Car';

function App() {
  const Routes = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };

  const ProtectedRoutes = () => {
    return (
      <>
        <Header />
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Routes />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/search',
          element: <Search />,
        },
        {
          path: '/user/:id',
          element: <User />,
        },
        {
          path: '/car/:id',
          element: <Car />,
        },
      ],
    },
    {
      path: '/profile',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/car-registration',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/car-registration',
          element: <CarRegistration />,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
