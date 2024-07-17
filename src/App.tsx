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
import { Tasks } from './pages/Orders';
import { Login } from './pages/Login';
import { OrderDetails } from './components/OrderDetails';
import { Navigate, Route, RouterProvider, Routes } from 'react-router';
import {BrowserRouter, createBrowserRouter} from 'react-router-dom';
import { Layout } from './components/Layout';
import {lazy, Suspense} from "react";
import {Loader} from "./components/Loader";
import {getCars, getTasks} from "./services/task.service";
import {Cars} from "./pages/Cars";

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
        path: '/destination',
        HydrateFallback: Loader,
        async lazy()
        {
          const { Tasks } = await import('./pages/Orders')
          return {
            Component: Tasks,
            loader: async () => {
              return await getTasks()
            },
          }
        },
      },
      {
        path: "/details/:id",
        element: <OrderDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/cars",
        HydrateFallback: Loader,
        async lazy()
        {
          const { Cars } = await import('./pages/Cars')
          return {
            Component: Cars,
            loader: async () => {
              return await getCars()
            },
          }
        },
      }]
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  return (
    <IonApp>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
    </IonApp >
  );
};

export default App;
