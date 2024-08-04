import React, { startTransition, useCallback, useEffect, useState } from "react";
import { changeStatusCarga, getTask, iPackageRelation } from "../services/task.service.ts";
import { Loader } from "../components/Loader.tsx";
import { useParams } from "react-router-dom";
import { StatusManage } from "../services/StatusManage.tsx";
import { startScan } from "../components/QRCodeScanner.tsx";

const PackageRelation: React.FC = () => {
    const { id } = useParams()
    const statusManage = new StatusManage()

    const [data, setData] = useState<iPackageRelation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const [orders, setOrders] = useState<iPackageRelation[]>([])

    const fetchData = useCallback(async () => {
        try {
            if (!id) {
                return
            }
            setLoading(true);
            const data = await getTask(id);
            startTransition(() => {

                const withAdditional = data.flatMap((item) =>
                    item.lines.filter((line) => line.nro_fv_adicional)
                );

                const withoutAdditional = data.flatMap((item) =>
                    item.lines.filter((line) => !line.nro_fv_adicional)
                );

                const newData = withoutAdditional.map((line) => {
                    const matchingLine = withAdditional.find((item) => line.nro_fv === item.nro_fv_adicional);

                    if (matchingLine) {
                        return {
                            ...line,
                            nro_fv_adicional: matchingLine.name,
                        };
                    }
                    return line;
                });

                setData([{
                    ...data[0],
                    lines: newData
                }]);
                setOrders([{
                    ...data[0],
                    lines: newData
                }]);
                setError(undefined);
            })
        } catch (error) {
            startTransition(() => {
                setError(error);
            })
        } finally {
            startTransition(() => {
                setLoading(false);
            })
        }
    }, [])

    const changeStatusOrder = async (id: number, status: string) => {
        await changeStatusCarga(id, status)
        window.location.reload()
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container">
            {orders.length > 0 && orders.map((order) => (
                <div className="row mt-2" key={order.id} style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
                    <div className="col">
                        {order.lines.map((line) => (
                            <div className="card mb-3" key={line.id}>
                                <div className="card-body row">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="badge bg-light text-dark">{line.name}</span>
                                        <span className="badge bg-warning">{line.state}</span>
                                    </div>
                                    <div className='d-flex mt-3'>
                                        <span className="small">Remitente: <b>{order.order_partner_id && order.order_partner_id[1]}</b></span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="small">Cliente: <b>{line.partner_id[1]}</b></span>
                                    </div>
                                    <span className="small">Factura: <b>{line.nro_fv}</b></span>
                                    {line.nro_fv_adicional && <span>Adicional: <b className="badge bg-warning">{line.nro_fv_adicional}</b></span>}
                                    <span className="small">Origen: <b>{order.shipping_origin_id[1]}</b></span>
                                    <span className="small">Destino: <b>{line.shipping_destination_id[1]}</b></span>
                                    <span className="small"># Bultos: <b>{line.number_of_packages}</b></span>

                                    <div className="d-flex mt-3">
                                        {
                                            statusManage.getNextStatus(line.state)?.map((status) => {
                                                return <button key={status} onClick={() => changeStatusOrder(line.id, status)} className={`btn fw-bold w-100 me-2 ${statusManage.getStateDefinition(status) === 'Cancelado' ? 'btn-danger' : 'btn-warning'}`}>{statusManage.getStateDefinition(status) === 'Cancelado' ? 'Cancelar' : statusManage.getStateDefinition(status)}</button>
                                            })
                                        }
                                        <button className="btn btn-warning" onClick={() => startScan()}>
                                            <i className="bi bi-qr-code-scan" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {error && <div className="alert alert-danger">{error.message}</div>}
            {loading && <Loader />}
        </div>
    )
}

export default PackageRelation