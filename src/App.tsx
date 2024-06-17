import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';
import '@fontsource-variable/inter';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import { Tasks } from './components/OrderList';
import { Login } from './pages/Login';
import { OrderDetails } from './components/OrderDetails';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/login" />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>

          <IonSplitPane contentId="main">
            <Menu />
            <Route path="/orders" exact={true}>
              <Tasks type="order_service" />
            </Route>
            <Route path="/destination" exact={true}>
              <Tasks type="destination" />
            </Route>
            <Route path="/travel_relation" exact={true}>
              <Tasks type="travel_relation" />
            </Route>
            <Route path="/details/:id" exact={true}>
              <OrderDetails />
            </Route>
          </IonSplitPane>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
