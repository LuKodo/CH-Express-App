import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";


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
        <div className={`text-center fw-bold rounded rounded-4 px-1`}>
            {
                networkStatus ? (
                    <i className={"bi bi-wifi text-success px-1"} />
                ) : (
                    <i className={"bi bi-wifi-off text-danger px-1"} />
                )
            }
        </div>
    )
}