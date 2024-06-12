import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { OrderComponent } from "./orderComponent"
import { useEffect, useState } from "react";
import { Task, getTasks } from "../services/task.service";

export const Orders = () => {
    const [orders, setOrders] = useState<Task[]>([]);
    const [searchText, setSearchText] = useState("");
    const [filterOrders, setFilterOrders] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();

                setOrders(data);
                setFilterOrders(data);
            } catch (error) {

            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        try {
            if (searchText) {
                const timeoutId = setTimeout(() => {
                    setFilterOrders(orders.filter((order) => order.numero_pedido === Number(searchText.toLowerCase())));

                }, 1000);

                return () => clearTimeout(timeoutId);
            } else {
                setFilterOrders(orders);
            }
        } catch (error) {

        }
    }, [searchText]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton color={"warning"} />
                    </IonButtons>
                    <IonTitle style={{ fontWeight: "bold", fontSize: "17px" }}>Ordenes de Servicio</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonContent className="ion-padding">
                    <div className="input-group mb-3">
                        <input type="number" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="form-control" placeholder="12024" aria-label="Username" aria-describedby="basic-addon1" />
                        <span className="input-group-text bg-warning text-white" id="basic-addon1">
                            <i className="bi bi-search" />
                        </span>
                    </div>
                    <IonList>
                        {
                            filterOrders?.map((order) => (
                                <OrderComponent key={order.numero_pedido} numero_pedido={order.numero_pedido} origen={order.origen} destino={order.destino} fecha_entrega={order.fecha_entrega} />
                            ))
                        }
                        {
                            filterOrders?.length === 0 && (
                                <IonItem>
                                    <IonText>
                                        <p>No hay pedidos</p>
                                    </IonText>
                                </IonItem>
                            )
                        }
                    </IonList>
                </IonContent>
            </IonContent>
        </IonPage>

    )
}