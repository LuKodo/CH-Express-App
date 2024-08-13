import React, { startTransition, useCallback, useEffect, useState } from "react";
import { changeStatusCarga, getTask, iPackageRelation } from "../services/task.service.ts";
import { Loader } from "../components/Loader.tsx";
import { useParams } from "react-router-dom";
import { StatusManage } from "../services/StatusManage.tsx";
import { Card } from "react-bootstrap";
import { Barcode } from "./Barcode.tsx";

const PackageRelation: React.FC = () => {
    const { id } = useParams()
    const statusManage = new StatusManage()

    const [data, setData] = useState<iPackageRelation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const [orders, setOrders] = useState<iPackageRelation[]>([])
    const [showBarcode, setShowBarcode] = useState(false)

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
        <>
            {showBarcode && <Barcode show={showBarcode} setShow={setShowBarcode} />}
            <Loader setError={setError} loading={loading} error={error} />
            {!loading && orders.length > 0 && orders.map((order) => (
                <>
                    {order.lines.map((line) => (
                        <Card className="card-style" key={line.id}>
                            <div className="content">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge text-bg-dark">{line.name}</span>
                                    <span className="badge bg-warning">{statusManage.getStateDefinition(line.state, 'package')}</span>
                                </div>
                                <div className="d-flex flex-column align-items-start justify-content-start mt-2">
                                    <span className="fw-bold">Remitente: </span>
                                    <span>{order.order_partner_id && order.order_partner_id[1]}</span>
                                </div>
                                <div className="d-flex flex-column align-items-start justify-content-start mt-2">
                                    <span className="fw-bold">Cliente: </span>
                                    <span>{line.partner_id[1]}</span>
                                </div>
                                <div className="d-flex flex-column align-items-start justify-content-start mt-2">
                                    <span className="fw-bold">Factura: </span>
                                    <span>{line.nro_fv}</span>
                                </div>
                                <div className="d-flex flex-column align-items-start justify-content-start mt-2">
                                    {line.nro_fv_adicional && <span className="fw-bold">Adicional: </span>}
                                    {line.nro_fv_adicional && <span className="badge bg-warning">{line.nro_fv_adicional}</span>}
                                </div>
                                <div className="d-flex align-items-start justify-content-between mt-2">
                                    <div>
                                        <span className="fw-bold"><i className="bi bi-geo-alt-fill text-success me-2" />Origen: </span>
                                        <span>{order.shipping_origin_id[1]}</span>
                                    </div>
                                    <div>
                                        <span className="fw-bold"><i className="bi bi-geo-alt-fill text-danger me-2" />Destino: </span>
                                        <span>{line.shipping_destination_id[1] ? line.shipping_destination_id[1] : 'Sin Destino'}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-start justify-content-start mt-2">
                                    <span className="fw-bold"># Bultos: </span>
                                    <span>{line.number_of_packages}</span>
                                </div>
                                <div className="d-flex mt-3">
                                    {
                                        statusManage.getNextStatus(line.state)?.map((status) => {
                                            return <button key={status} onClick={() => changeStatusOrder(line.id, status)} className={`btn btn-xs fw-bold w-100 me-2 ${statusManage.getStateDefinition(status, 'package') === 'Devuelta' ? 'btn-danger' : 'btn-warning'}`}>{statusManage.getStateDefinition(status, 'package') === 'Cancelado' ? 'Cancelar' : statusManage.getStateDefinition(status, 'package')}</button>
                                        })
                                    }
                                    <button className="btn btn-xs btn-warning" onClick={() => setShowBarcode(true)}>
                                        <i className="bi bi-qr-code-scan" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </>
            ))}
        </>
    )
}

export default PackageRelation