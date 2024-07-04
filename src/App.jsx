import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';
import Register from './pages/auth/Register';
import Home from './pages/Home';

function App() {
  const ProtectedRoutes = () => {
    return (
      <>
        <Outlet />
        {/* <Header />
        <div className='app'>
          <Sidebar />
          <PrivateRoute>
            <main>
              <Outlet />
            </main>
          </PrivateRoute>
        </div> */}
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
