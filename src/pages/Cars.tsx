import React, { startTransition, useCallback, useEffect, useState } from "react";
import { getCars } from "../services/task.service";
import { Loader } from "../components/Loader";
import { IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonCardTitle, IonToolbar, IonThumbnail, IonItem, IonLabel, IonList } from "@ionic/react";
import { Card } from "react-bootstrap";

interface iCars {
    id: number,
    license_plate: string,
    name: string,
    odometer: number,
    state_id: [number, string],
    image_128: string,
    location: string, //Capacidad de carga
}

const Cars: React.FC = () => {
    const [data, setData] = useState<iCars[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const [filter, setFilter] = useState<iCars[]>([]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getCars();
            startTransition(() => {
                setData(data);
                setFilter(data);
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

        setFilter(data.filter((d) => d.license_plate.toLowerCase().indexOf(query) > -1));
    };

    return (
        <>
            <Loader setError={setError} loading={loading} error={error} />
            {
                filter.length > 0 &&
                filter.map((car) => (
                    <Card className="card-style" key={car.id}>
                        <div className="content">
                            <h6 className="fw-bold">
                                <img src={`data:image/png;base64,${car.image_128}`} className="img-fluid w-25" alt="" /> {car.name.split('/')[0]}
                            </h6>
                            <div className="list-group list-custom list-group-m rounded-xs">
                                <a href="#" className="list-group-item">
                                    <div>Placa: <b className="ms-1">{car.license_plate}</b></div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div>Capacidad: <b className="ms-1"></b></div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div>Refrigeración: <b className="ms-1"></b></div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div>Odometro: <b className="ms-1">{car.odometer}</b></div>
                                </a>
                            </div>
                        </div>
                    </Card>
                ))
            }
        </>
    )
}

export default Cars