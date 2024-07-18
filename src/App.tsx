import { IonApp, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';
import '@fontsource-variable/inter';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import { Login } from './pages/Login';
import { Navigate, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useState } from "react";
import Tasks from './pages/Tasks';
import Cars from './pages/Cars';
import PackageRelation from './pages/PackageRelation';
import PackagesRelation from './pages/PackagesRelation';

setupIonicReact();

const ErrorPage = () => {
  return <>Error</>
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to={"/package-relation"} />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/destination',
        element: <Tasks />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/package-relation',
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/package-relation/",
            element: <PackagesRelation />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/package-relation/:id",
            element: <PackageRelation />,
            errorElement: <ErrorPage />,
          }
        ]
      },
      {
        path: '/cars',
        element: <Cars />,
        errorElement: <ErrorPage />,
      }]
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  return (
    <IonApp>
      <RouterProvider router={router} />
    </IonApp >
  );
};

export default App;
