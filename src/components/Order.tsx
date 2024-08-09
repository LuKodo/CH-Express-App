import { changeStatus, FleteDestino } from "../services/task.service"
import { StatusManage } from "../services/StatusManage";
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader } from "@ionic/react";

interface OrderComponentProps {
    order: FleteDestino
}

export const OrderComponent: React.FC<OrderComponentProps> = ({ order }) => {
    const statusManage = new StatusManage()
    const changeStatusOrder = async (id: number, status: string) => {
        await changeStatus(id, status)
        window.location.reload()
    }

    return (
        <IonCard>
            <IonCardHeader>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold h6 card-title mb-0 pb-0">Pedido N° {order.name}</h3>
                    <IonBadge className="text-bg-dark" slot="start">{statusManage.getStateDefinition(order.state, '')}</IonBadge>
                </div>
            </IonCardHeader>
            <IonCardContent className="d-flex flex-column">
                <div className="d-flex flex-column align-items-start mb-2">
                    <span className="fw-bold text-uppercase">Cliente: </span>
                    <span>{order.partner_id[1]}</span>
                </div>
                <div className="d-flex flex-column align-items-start mb-2">
                    <span className="fw-bold text-uppercase">Origen: </span>
                    <span>{order.shipping_origin_id[1]}</span>
                </div>
                <div className="d-flex flex-column align-items-start mb-2">
                    <span className="fw-bold text-uppercase"><i className="bi bi-geo-alt-fill text-danger me-2" />Destino: </span>
                    <span>{order.shipping_destination_id[1]}</span>
                </div>
                <div className="d-flex flex-column align-items-start">
                    <span className="fw-bold text-uppercase">Observaciones: </span>
                    <span>{order.note ? order.note : ''}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    {
                        statusManage.getNextStatus(order.state)?.map((status) => {
                            return (
                                <IonButton
                                    key={status}
                                    onClick={() => changeStatusOrder(order.id, status)}
                                    className={`w-100 mx-1 fw-bold`}
                                    fill="solid"
                                    size="small"
                                    color={`${statusManage.getStateDefinition(status, '') === 'Cancelado' ? 'danger' : 'warning'}`}
                                >
                                    {statusManage.getStateDefinition(status, '') === 'Cancelado' ? 'Cancelar' : statusManage.getStateDefinition(status, '')}
                                </IonButton>
                            )
                        })
                    }
                </div>
            </IonCardContent>
        </IonCard>
    )
}