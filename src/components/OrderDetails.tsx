import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { FleteDestino, getTask, StatusCheckList, Task } from "../services/task.service";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonContent, IonItem, IonList, IonPage, IonText } from "@ionic/react";

export const OrderDetails = () => {
    const [order, setOrder] = useState<FleteDestino | undefined>();
    const [statusCheckList, setStatusCheckList] = useState<StatusCheckList[] | undefined>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchTasks = async () => {
            if (!id) {
                return
            }

            try {
                const data = await getTask(id);

                setOrder(data[0]);
            } catch (error) {

            }
        };

        fetchTasks();
    }, []);

    return (
        <IonPage id="main">
            <IonContent className="ion-padding">
                <div className="d-flex align-items-center px-3">
                    <IonButton size="small" color={"warning"} onClick={() => window.history.back()} className="ms-42 fw-bold">
                        <i className="bi bi-arrow-left" />
                    </IonButton>
                    <IonText className="ms-3" style={{ fontWeight: "bold", fontSize: "19px" }}>Detalles del pedido {order?.name}</IonText>
                </div>

                {order && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle className="fw-bold">Pedido N° {order.name}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent className="ion-padding row">
                            <div className="mb-2">
                                <i className="bi bi-geo-alt text-warning" />&nbsp;<b>Origen:</b>&nbsp;{order.shipping_origin_id[1]}
                            </div>

                            <div className="mb-2">
                                <i className="bi bi-geo-alt text-danger" />&nbsp;<b>Destino:</b>&nbsp;{order.shipping_destination_id[1]}
                            </div>

                            <div className="mb-2">
                                <i className="bi bi-calendar-check text-success" />&nbsp;<b>Comentarios:</b>&nbsp;{order.note}
                            </div>
                        </IonCardContent>
                    </IonCard>
                )}

                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle className="fw-bold">Detalles</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {
                            statusCheckList && (
                                <IonList>
                                    {
                                        statusCheckList.map((status, index) => (
                                            <IonItem key={index}>
                                                <IonCheckbox labelPlacement="start" className="fw-bold small">{status.status}</IonCheckbox>
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