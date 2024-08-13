import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';

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

import { Login } from './pages/Login';
import Tasks from './pages/Tasks';
import Cars from './pages/Cars';
import PackageRelation from './pages/PackageRelation';
import PackagesRelation from './pages/PackagesRelation';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Barcode } from './pages/Barcode';

import '@fontsource-variable/inter';
import { Profile } from './pages/Profile';

setupIonicReact();
const ErrorPage = () => <div>Page Not Found</div>;
const Logout = () => {
  return <Navigate to={'/login'} />
}

const logged = localStorage.getItem("user");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to={"/login"} />,
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
      },
      {
        path: '/profile',
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/logout',
        element: <Logout />,
        errorElement: <ErrorPage />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "barcode",
    element: <Barcode />,
  }
]);

const App: React.FC = () => {
  return (
    <IonRouterOutlet>
      <RouterProvider router={router} />
    </IonRouterOutlet>
  );
};

export default App;
