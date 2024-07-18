import {changeStatus, FleteDestino} from "../services/task.service"
import {StatusManage} from "../services/StatusManage";

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
        <div className={`card border-warning mb-3`}>
            <div className="card-header d-flex justify-content-between align-content-center">
                <h3 className="fw-bold h6 card-title mb-0 pb-0">Pedido N° {order.name}</h3>
                <span className="badge text-bg-secondary">
                    {statusManage.getStateDefinition(order.state)}
                </span>
            </div>
            <div className="card-body p-3">
                <div className="row">
                    <div className="col">
                        <div className="mb-2">
                            <label className="label fw-bold">Cliente</label>
                            <div className="input-group">
                                <i className="bi bi-person-fill text-info input-group-text bg-secondary-subtle" />
                                <input type="text" value={order.partner_id[1]} disabled className="form-control" />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="label fw-bold">Origen</label>
                            <div className="input-group">
                                <i className="bi bi-geo-alt-fill text-warning input-group-text bg-secondary-subtle" />
                                <input type="text" className="form-control" disabled value={order.shipping_origin_id[1]} />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="label fw-bold">Destino</label>
                            <div className="input-group">
                                <i className="bi bi-geo-alt-fill text-danger input-group-text bg-secondary-subtle" />
                                <input type="text" className="form-control" disabled value={order.shipping_destination_id[1]} />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="label fw-bold">Comentarios</label>
                            <textarea className="form-control" disabled value={order.note ? order.note : ''} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
                {
                    statusManage.getNextStatus(order.state)?.map((status) => {
                        return <button key={status} onClick={() => changeStatusOrder(order.id, status)} className={`btn w-100 mx-1 ${statusManage.getStateDefinition(status) === 'Cancelado' ? 'btn-danger' : 'btn-warning'}`}>{statusManage.getStateDefinition(status) === 'Cancelado' ? 'Cancelar' : statusManage.getStateDefinition(status)}</button>
                    })
                }
            </div>
        </div>
    )
}