import { IonPage } from "@ionic/react";
import {Link, Outlet, useLocation} from "react-router-dom";
import { NetworkStatus } from "./NetworkStatus";
import {ReactNode, useState} from "react";

interface iProps {
    children: ReactNode
}

interface AppPage {
    url: string;
    icon: string;
    title: string;
    out?: boolean;
}

const appPages: AppPage[] = [
    {
        title: 'Flete Destino',
        url: '/destination',
        icon: 'truck',
    },
    {
        title: 'Información del Vehículo',
        url: '/cars',
        icon: 'truck',
    },
    {
        title: 'Perfil',
        url: '/folder/Trash',
        icon: 'person-gear',
    },
    {
        title: 'Salir',
        url: '/',
        icon: 'box-arrow-left',
        out: true,
    }
];

export const Layout: React.FC = () => {
    const location = useLocation();
    const [show, setShow] = useState(false);

    return (
        <IonPage id="main">
            <div className={`offcanvas offcanvas-start ${show && 'show'}`} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {
                        appPages.map((appPage) => (
                            <Link
                                to={appPage.url}
                                key={appPage.title}
                                className="btn btn-warning w-100 d-flex align-items-center py-2 mb-3"
                                onClick={() => setShow(false)}
                            >
                                <i className={`bi bi-${appPage.icon} me-3 fs-4`}></i>
                                <span className="text-decoration-none fw-semibold text-dark">{appPage.title}</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="row">
                <NetworkStatus/>
                <div className="col-12">
                    <div className="d-flex align-items-baseline px-3 bg-light py-2">
                        <i className="bi bi-list fs-2" onClick={() => setShow(true)}></i>
                        <h2 className="h5 ms-5">
                            {
                                appPages.find((page) => {
                                    return page.url.split('/')[1] === location.pathname.split('/')[1]
                                })?.title
                            }
                        </h2>
                    </div>
                    <Outlet />
                </div>
            </div>
        </IonPage>
    );
}