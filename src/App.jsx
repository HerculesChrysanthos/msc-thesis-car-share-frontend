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

function App() {
  const ProtectedRoutes = () => {
    return (
      <>
        <Header />
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
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
