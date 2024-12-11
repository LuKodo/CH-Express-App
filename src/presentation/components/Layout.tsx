import { Link, Outlet, useLocation } from "react-router-dom";
import { NetworkStatus } from "./NetworkStatus";
import { PrivateRoute } from "./PrivateRoute";

interface AppPage {
    url: string;
    icon: string;
    title: string;
    out?: boolean;
    color?: string;
}

const appPages: AppPage[] = [
    {
        title: 'Escanear',
        url: '/home',
        icon: 'qr-code-scan',
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

    return (
        <PrivateRoute>
            <div className="header-bar header-fixed header-app header-bar-detached d-flex justify-content-between|align-items-center px-3">
                <a href="#" className="header-title color-theme"><b>{appPages.find((appPage) => location.pathname.includes(appPage.url))?.title || 'Detalles'}</b></a>
                <NetworkStatus />
            </div>

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
            </div>
        </PrivateRoute>
    );
}