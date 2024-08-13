import { IonPage } from "@ionic/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { NetworkStatus } from "./NetworkStatus";
import { Fragment, useState } from "react";
import { logout } from "../services/user.service";
import { Offcanvas } from "react-bootstrap";

interface AppPage {
    url: string;
    icon: string;
    title: string;
    out?: boolean;
    color?: string;
}

const appPages: AppPage[] = [
    {
        title: 'Relación de Carga',
        url: '/package-relation',
        icon: 'truck',
        color: 'blue',
    },
    {
        title: 'Flete Destino',
        url: '/destination',
        icon: 'truck',
        color: 'red',
    },
    {
        title: 'Info. del Vehículo',
        url: '/cars',
        icon: 'truck',
        color: 'orange',
    },
    {
        title: 'Perfil',
        url: '/profile',
        icon: 'person-gear',
        color: 'green',
    }
];

export const Layout: React.FC = () => {
    const location = useLocation();
    const [show, setShow] = useState(false);

    return (
        <>
            <div className="header-bar header-fixed header-app header-bar-detached">
                <a role="button" onClick={() => setShow(true)}>
                    <i className="bi bi-list color-theme" />
                </a>
                <a href="#" className="header-title color-theme">{appPages.find((appPage) => location.pathname.includes(appPage.url))?.title}</a>
            </div>

            <Offcanvas id="menu-main" show={show} onHide={() => setShow(false)} className="offcanvas-detached rounded-m"
                style={{ width: '280px' }}
            >
                <div className="card card-style bg-23 mb-3 rounded-m mt-3" style={{ height: '150px' }}>
                    <div className="card-top m-3">
                        <a
                            href="#"
                            onClick={() => setShow(false)}
                            className="icon icon-xs bg-theme rounded-s color-theme float-end"
                        >
                            <i className="bi bi-caret-left-fill"></i>
                        </a>
                    </div>
                    <div className="card-bottom p-3">
                        <h1 className="color-white font-20 font-700 mb-n2">CH Express</h1>
                    </div>
                    <div className="card-overlay bg-gradient-fade rounded-0"></div>
                </div>

                <span className="menu-divider">MENU</span>
                <div className="menu-list">
                    <div className="card card-style rounded-m p-3 py-2 mb-0">
                        {appPages.map((appPage) => (
                            <Link
                                key={appPage.title}
                                to={appPage.url}
                                className={`${location.pathname.includes(appPage.url) ? 'active-item' : ''}`}
                            >
                                <i className={`gradient-${appPage.color} shadow-bg shadow-bg-xs bi bi-${appPage.icon}`}></i>
                                <span>{appPage.title}</span>
                            </Link>
                        ))}
                    </div>

                </div>
            </Offcanvas>

            <div className="page-content header-clear-medium" style={{ overflow: 'hidden', overflowY: 'auto', height: 'calc(100vh - 20px)' }}>
                <Outlet />
            </div>

            <div
                id="footer-bar"
                className="footer-bar footer-fixed footer-bar-detached"
            >
                {
                    appPages.map((appPage) => (
                        <Link
                            key={appPage.title}
                            to={appPage.url}
                            className={`${location.pathname.includes(appPage.url) ? 'active-nav' : ''}`}
                        >
                            <i className={`bi bi-${appPage.icon} font-15`}></i>
                            <span>{appPage.title}</span>
                        </Link>
                    ))
                }
                <a role="button" onClick={() => setShow(true)}><i className="bi bi-list"></i><span>Menu</span></a>
            </div>
        </>
    );
}