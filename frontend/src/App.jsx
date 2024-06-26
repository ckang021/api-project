import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import { Modal } from './context/Modal';
import Spots from './components/Spots/Spots';
import SoloSpot from './components/SoloSpot'
import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm';
import ManageSpot from './components/ManageSpot/ManageSpot';
import EditSpotForm from './components/EditSpotForm/EditSpotForm';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Modal/>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element:<Spots />
      },
      {
        path: '/spots/:spotId',
        element:<SoloSpot />
      },
      {
        path: '/spots/new',
        element:<CreateSpotForm />
      },
      {
        path: '/spots/:spotId/edit',
        element: <EditSpotForm />
      },
      {
        path: '/spots/current',
        element: <ManageSpot />
      }
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
