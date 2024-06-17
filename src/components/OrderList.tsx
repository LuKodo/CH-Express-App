import { IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonSearchbar, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { OrderComponent } from "./Order"
import { useEffect, useState } from "react";
import { Task, getTasks } from "../services/task.service";
import { loggedIn } from "../services/user.service";
import Menu from "./Menu";
import { useHistory } from "react-router";

interface TaskProps {
    type: string
}

export const Tasks: React.FC<TaskProps> = ({ type }) => {
    const history = useHistory();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filterTasks, setFilterTasks] = useState<Task[]>([]);

    useEffect(() => {
        const isLogged = loggedIn();

        if (!isLogged) {
            history.push('/login');
        }
        const fetchTasks = async () => {
            try {
                const unfiltered = await getTasks();
                const data = unfiltered.filter((order) => order.tipo === type);

                setTasks(data);
                setFilterTasks(data);
            } catch (error) {

            }
        };

        fetchTasks();
    }, []);

    const handleInput = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setFilterTasks(tasks.filter((d) => d.numero_pedido.toLowerCase().indexOf(query) > -1));
    };

    return (
        <>
            <IonPage id="main">
                <IonHeader>
                    <IonToolbar mode="ios">
                        <IonButtons slot="start">
                            <IonMenuButton className="is-white has-text-warning p-0 " />
                        </IonButtons>
                        <IonTitle style={{ fontWeight: "bold", fontSize: "17px" }}>{type === "order_service" ? "Pedidos de Servicio" : type === "destination" ? "Flete Destino" : "Relación de Viaje"}</IonTitle>
                    </IonToolbar>
                </IonHeader>


                <IonContent className="ion-padding">
                    <IonSearchbar
                        placeholder="Numero de pedido"
                        onIonInput={(e) => handleInput(e)}
                        showClearButton="always" mode="ios"
                    />

                    {
                        filterTasks?.filter((order) => order.tipo === type).map((order, index) => (
                            <OrderComponent key={order.numero_pedido} order={order} color={index + 1} />
                        ))
                    }
                </IonContent>
            </IonPage>
        </>
    )
}