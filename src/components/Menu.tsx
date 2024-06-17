import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useHistory } from 'react-router-dom';

interface AppPage {
  url: string;
  icon: string;
  title: string;
  out?: boolean;
}

const appPages: AppPage[] = [
  {
    title: 'Ordenes de Servicio',
    url: '/orders',
    icon: 'file-earmark-binary',
  },
  {
    title: 'Flete Destino',
    url: '/destination',
    icon: 'truck',
  },
  {
    title: 'Relación de Viaje',
    url: '/travel_relation',
    icon: 'geo-alt',
  },
  {
    title: 'Información del Vehículo',
    url: '/folder/Archived',
    icon: 'truck',
  },
  {
    title: 'Perfil',
    url: '/folder/Trash',
    icon: 'person-gear',
  },
  {
    title: 'Ajustes',
    url: '/folder/Spam',
    icon: 'gear',
  },
  {
    title: 'Salir',
    url: '/',
    icon: 'box-arrow-left',
    out: true,
  }
];

const Menu: React.FC = () => {
  const history = useHistory();

  const navigateTo = (path: AppPage) => {
    if (path.out) {
      logout();
      return;
    }
    history.push(path.url);
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle autoHide={false} key={index}>
                <IonItem onClick={() => navigateTo(appPage)} button>
                  <i className={`bi bi-${appPage.icon} text-warning me-2`} />
                  &nbsp;{` ` + appPage.title}
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
