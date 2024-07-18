import { OrderComponent } from "../components/Order"
import { startTransition, useCallback, useEffect, useState } from "react";
import { FleteDestino, getTasks } from "../services/task.service";
import { Loader } from "../components/Loader";

const Task: React.FC = () => {
    const [data, setData] = useState<FleteDestino[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const [filterTasks, setFilterTasks] = useState<FleteDestino[]>([]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            startTransition(() => {
                setData(data);
                setFilterTasks(data);
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

        setFilterTasks(data.filter((d) => d.name.toLowerCase().indexOf(query) > -1));
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
                filterTasks.length > 0 && (
                    <div className="row" style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
                        <div className="col">
                            {
                                filterTasks?.map((order) => {
                                    return <OrderComponent key={order.name} order={order} />
                                })
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

export default Task