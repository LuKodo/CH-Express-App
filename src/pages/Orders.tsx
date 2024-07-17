import { OrderComponent } from "../components/Order"
import { useEffect, useState } from "react";
import { FleteDestino } from "../services/task.service";
import { loggedIn } from "../services/user.service";
import { useNavigate, useLoaderData } from "react-router-dom";

const Tasks: React.FC = () => {
    const navigate = useNavigate()
    const data = useLoaderData() as FleteDestino[]
    const [filterTasks, setFilterTasks] = useState<FleteDestino[]>(data);

    useEffect(() => {
        const isLogged = loggedIn();

        if (!isLogged) {
            navigate('/login');
        }
    }, []);

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

            <div className="row" style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
                <div className="col">
                    {
                        filterTasks?.map((order) => {
                            return <OrderComponent key={order.name} order={order} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Tasks