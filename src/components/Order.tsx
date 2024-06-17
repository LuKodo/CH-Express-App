import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList } from "@ionic/react"
import { Task } from "../services/task.service"

interface OrderComponentProps {
    order: Task,
    color: number
}

export const OrderComponent: React.FC<OrderComponentProps> = ({ order, color }) => {
    return (
        <IonCard mode="ios" className={`p-2 mb-3 ${color % 2 === 0 && "text-bg-light"}`}>
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
                    <i className="bi bi-calendar-check text-success" />&nbsp;<b>Fecha Entrega:</b>&nbsp;{order.fecha_entrega}
                </div>

                <IonButton mode="ios" color={"warning"} onClick={() => window.location.href = `/details/${order.numero_pedido}`} expand="block" className="mt-4 fw-bold" size="small">Ver detalles &nbsp;<i className="bi bi-arrow-right" /></IonButton>
            </IonCardContent>
        </IonCard>
    )
}