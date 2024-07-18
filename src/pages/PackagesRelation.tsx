import { startTransition, useCallback, useEffect, useState } from "react";
import { getSaleOrder, SaleOrder } from "../services/task.service.ts";
import { Loader } from "../components/Loader.tsx";
import { Link } from "react-router-dom";

const PackagesRelation: React.FC = () => {
    const [data, setData] = useState<SaleOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const [orders, setOrders] = useState<SaleOrder[]>([])

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getSaleOrder();
            startTransition(() => {
                setData(data);
                setOrders(data);
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

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleInput = (value: string) => {
        let query = '';
        if (value) query = value!.toLowerCase();

        setOrders(data.filter((d) => d.name.toLowerCase().indexOf(query) > -1));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="input-group my-3">
                        <input
                            className="form-control form-control-lg border-warning"
                            placeholder="Numero de pedido"
                            onChange={(event) => handleInput(event.target.value)}
                        />
                        <span className="input-group-text bg-warning text-white border-0" id="basic-addon1">
                            <i className="bi bi-search" />
                        </span>
                    </div>
                </div>
            </div>
            {
                orders.length > 0 && (
                    <div className="row" style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
                        <div className="col">
                            {
                                orders.map((order) => (
                                    <div className="card border-warning mb-3" key={order.name}>
                                        <div className="card-body p-3">
                                            <div className='d-flex flex-column mb-3'>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span className={"fw-bold"}>{order.name.split('/')[0]}</span>
                                                    <span className={"badge text-bg-dark"}>{order.state}</span>
                                                </div>
                                                <span>Cliente: <b>{order.partner_id[1]}</b></span>
                                                <span>Ciudad: {order.city || 'N/A'}</span>
                                                <span>Valor Total: $ {order.amount_total}</span>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-between">
                                                <Link to={`/package-relation/${order.id}`} className="btn btn-warning w-100 fw-bold">
                                                    <i className="bi bi-info-circle" /> Detalles
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }

            {error && <div>{error.message}</div>}
            {loading && <Loader />}
        </div>
    )
}

export default PackagesRelation