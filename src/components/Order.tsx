import { changeStatus, FleteDestino } from "../services/task.service"
import { StatusManage } from "../services/StatusManage";
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import { Card } from "react-bootstrap";

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
        <Card className="card-style">
            <div className="content">
                <div className="d-flex">
                    <div>
                        <h6 className="fw-bold">Pedido N° {order.name}</h6>
                    </div>
                    <div className="align-self-center ms-auto">
                        <span className="badge badge-s bg-yellow-dark" slot="start">{statusManage.getStateDefinition(order.state, '')}</span>
                    </div>
                </div>
                <p>
                    <div className="d-flex flex-column align-items-start mb-2">
                        <span className="fw-bold text-uppercase">Cliente: </span>
                        <span>{order.partner_id[1]}</span>
                    </div>
                    <div className="d-flex flex-column align-items-start mb-2">
                        <span className="fw-bold text-uppercase">
                            <i className="bi bi-geo-alt-fill text-success me-2" />Origen: </span>
                        <span>{order.shipping_origin_id[1]}</span>
                    </div>
                    <div className="d-flex flex-column align-items-start mb-2">
                        <span className="fw-bold text-uppercase">
                            <i className="bi bi-geo-alt-fill text-danger me-2" />Destino: </span>
                        <span>{order.shipping_destination_id[1]}</span>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <span className="fw-bold text-uppercase">Observaciones: </span>
                        <span>{order.note ? order.note : ''}</span>
                    </div>
                </p>

                <div className="d-flex justify-content-between align-items-center gap-2">
                    {
                        statusManage.getNextStatus(order.state)?.map((status) => {
                            return (
                                <span
                                    className={`btn btn-xs w-100 bg-${statusManage.getStateDefinition(status, '') === 'Cancelado' ? 'red' : 'yellow'}-light`}
                                    onClick={() => changeStatusOrder(order.id, status)}
                                >
                                    {statusManage.getStateDefinition(status, '') === 'Cancelado' ? 'Cancelar' : statusManage.getStateDefinition(status, '')}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </Card>
    )
}