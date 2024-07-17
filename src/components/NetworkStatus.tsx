import {useEffect, useState} from "react";
import { Network} from "@capacitor/network";


export const NetworkStatus = () => {
    const [networkStatus, setNetworkStatus] = useState(false);

    useEffect(() => {
        const checkNetworkStatus = async () => {
            const status = await Network.getStatus();
            setNetworkStatus(status.connected);
        }

        checkNetworkStatus();

        Network.addListener('networkStatusChange', (status) => {
            setNetworkStatus(status.connected);
            console.log("Network status changed", status);
        })
    }, [networkStatus]);

    return (
        <div className={`bg-${networkStatus ? 'success' : 'danger'} text-center text-white fw-bold`}>
            {
                networkStatus ? (
                    <span>Estás en línea <i className={"bi bi-wifi"}/></span>
                ) : (
                    <span>Sin conexión a Internet <i className={"bi bi-wifi-off"}/></span>
                )
            }
        </div>
    )
}