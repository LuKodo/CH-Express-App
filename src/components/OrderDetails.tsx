import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { StatusCheckList, Task, TaskList, getCheckList, getTask } from "../services/task.service";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonText } from "@ionic/react";

export const OrderDetails = () => {
    const [order, setOrder] = useState<Task | undefined>();
    const [statusCheckList, setStatusCheckList] = useState<StatusCheckList[] | undefined>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getTask(id);
                setOrder(data);

                const status = data && await getCheckList(data.tipo);
                setStatusCheckList(status);
            } catch (error) {

            }
        }

        fetchOrder();
    }, []);

    return (
        <IonPage id="main">
            <IonContent className="ion-padding">
                <div className="d-flex align-items-center px-3">
                    <IonButton mode="ios" size="small" color={"warning"} onClick={() => window.history.back()} className="ms-42 fw-bold">
                        <i className="bi bi-arrow-left" />
                    </IonButton>
                    <IonText className="ms-3" style={{ fontWeight: "bold", fontSize: "19px" }}>Detalles del pedido {order?.numero_pedido}</IonText>
                </div>

                {order && (
                    <IonCard mode="ios">
                        <IonCardHeader>
                            <IonCardSubtitle className="fw-bold">Pedido N° {order.numero_pedido}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent className="ion-padding row">
                            <div className="mb-2">
                                <i className="bi bi-geo-alt text-warning" />&nbsp;<b>Origen:</b>&nbsp;{order.origen}
                            </div>

                            <div className="mb-2">
                                <i className="bi bi-geo-alt text-danger" />&nbsp;<b>Destino:</b>&nbsp;{order.destino}
                            </div>

                            <div className="mb-2">
                                <i className="bi bi-calendar-check text-success" />&nbsp;<b>Fecha de Entrega:</b>&nbsp;{order.fecha_entrega}
                            </div>
                        </IonCardContent>
                    </IonCard>
                )}

                <IonCard mode="ios">
                    <IonCardHeader>
                        <IonCardSubtitle className="fw-bold">Detalles</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {
                            statusCheckList && (
                                <IonList mode="ios">
                                    {
                                        statusCheckList.map((status, index) => (
                                            <IonItem key={index}>
                                                <IonCheckbox labelPlacement="start" mode="ios" className="fw-bold small">{status.status}</IonCheckbox>
                                            </IonItem>
                                        ))
                                    }
                                </IonList>
                            )
                        }
                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage>
    )
}