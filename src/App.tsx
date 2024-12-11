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

import Cars from './presentation/pages/Cars';
import { BrowserRouter, Navigate, Route, Routes, createBrowserRouter } from 'react-router-dom';

import '@fontsource-variable/inter';
import { Profile } from './presentation/pages/Profile';
import Home from './presentation/pages/Home';
import Details from './presentation/pages/Details';
import { Layout } from './presentation/components/Layout';
import { LoginPage } from './presentation/pages/Login';
import { AuthProvider } from './presentation/context/AuthContext';

setupIonicReact();
const ErrorPage = () => <div>Page Not Found</div>;
const Logout = () => {
  return <Navigate to={'/login'} />
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <IonRouterOutlet>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route path='/home' element={<Home />} />
              <Route path="/details/:id/:model" element={<Details />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IonRouterOutlet>
    </AuthProvider>
  );
};

export default App;
