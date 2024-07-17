import {Fragment, useState} from "react";
import {useLoaderData} from "react-router-dom";

interface iCars {
    id: number,
    license_plate: string,
    name: string,
    odometer: number,
    state_id: [number, string],
    image_128: string,
    location: string, //Capacidad de carga
}

export const Cars = () => {
    const data = useLoaderData() as iCars[]
    const [filter, setFilter] = useState(data)

    const handleInput = (value: string) => {
        let query = '';
        if (value) query = value!.toLowerCase();

        setFilter(data.filter((d) => d.license_plate.toLowerCase().indexOf(query) > -1));
    };

    return (
        <div className={"container"}>
            <div className="row">
                <div className="col">
                    <div className="input-group my-3">
                        <input
                            className="form-control form-control-lg border-warning"
                            placeholder="Placa del vehículo"
                            onChange={(event) => handleInput(event.target.value)}
                        />
                        <span className="input-group-text bg-warning text-white border-0" id="basic-addon1">
                            <i className="bi bi-search"/>
                        </span>
                    </div>
                </div>
            </div>

            <div className="row" style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
                <div className="col">
                {
                    filter.map((car) => (
                        <div className="card border-warning mb-3" key={car.id}>
                            <div className="card-body p-3 d-flex justify-content-between">
                                <img src={`data:image/png;base64,${car.image_128}`} alt=""
                                     className={'border rounded w-50'}/>
                                <div className='row w-50'>
                                    <span className={"fw-bold"}>{car.name.split('/')[0]}</span>
                                    <span>Placa: <b>{car.license_plate}</b></span>
                                    <span>Capacidad: </span>
                                    <span>Refrigeración: </span>
                                    <span>Odometro: {car.odometer} Km</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}