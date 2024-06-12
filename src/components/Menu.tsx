import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, carOutline, cardOutline, constructOutline, documentsOutline, heartOutline, heartSharp, mailOutline, mailSharp, mapOutline, navigateOutline, paperPlaneOutline, paperPlaneSharp, peopleOutline, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Ordenes de Servicio',
    url: '/orders',
    iosIcon: documentsOutline,
    mdIcon: documentsOutline
  },
  {
    title: 'Flete Destino',
    url: '/folder/Outbox',
    iosIcon: navigateOutline,
    mdIcon: navigateOutline
  },
  {
    title: 'Relación de Viaje',
    url: '/folder/Favorites',
    iosIcon: mapOutline,
    mdIcon: mapOutline
  },
  {
    title: 'Información del Vehículo',
    url: '/folder/Archived',
    iosIcon: carOutline,
    mdIcon: carOutline
  },
  {
    title: 'Perfil',
    url: '/folder/Trash',
    iosIcon: peopleOutline,
    mdIcon: peopleOutline
  },
  {
    title: 'Ajustes',
    url: '/folder/Spam',
    iosIcon: constructOutline,
    mdIcon: constructOutline
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader style={{ marginBottom: '15px', textAlign: 'center'}}>
            <IonAvatar>
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
          </IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
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
