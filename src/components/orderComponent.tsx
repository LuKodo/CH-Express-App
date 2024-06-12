interface Props {
    numero_pedido: number,
    origen: string,
    destino: string,
    fecha_entrega: string
}
export const OrderComponent: React.FC<Props> = ({ numero_pedido, origen, destino, fecha_entrega}) => {
    return (
        <div className="card p-3 mb-3">
            <h4 className="fw-bold h6">Pedido N° {numero_pedido}</h4>
            <div className="text-muted"><b>Origen:</b> {origen}</div>
            <div className="text-muted"><b>Destino:</b> {destino}</div>
            <div className="text-muted"><b>Fecha de Entrega:</b> {fecha_entrega}</div>

            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-light fw-bold text-warning me-2 w-50">Ver</button>
                <button className="btn btn-warning fw-bold w-50">Ver detalles</button>
            </div>
        </div>
    )
}