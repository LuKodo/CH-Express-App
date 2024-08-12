import React, { startTransition, useCallback, useEffect, useState } from "react";
import { getCars } from "../services/task.service";
import { Loader } from "../components/Loader";
import { IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonCardTitle, IonToolbar, IonThumbnail, IonItem, IonLabel, IonList } from "@ionic/react";

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
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Vehículos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Loader setError={setError} loading={loading} error={error} />
                <IonSearchbar
                    onIonChange={(event) => handleInput(event.detail.value!)}
                    placeholder="Numero de placa"
                />
                {
                    filter.length > 0 &&
                    filter.map((car) => (
                        <IonCard key={car.id}>
                            <IonCardContent>
                                <IonItem>
                                    <IonThumbnail slot="start">
                                        <img src={`data:image/png;base64,${car.image_128}`} alt="" />
                                    </IonThumbnail>
                                    <IonLabel className="fw-bold">{car.name.split('/')[0]}</IonLabel>
                                </IonItem>
                                <IonList>
                                    <IonItem>Placa: <b className="ms-1">{car.license_plate}</b></IonItem>
                                    <IonItem>Capacidad: </IonItem>
                                    <IonItem>Refrigeración: </IonItem>
                                    <IonItem>Odometro: {car.odometer} Km</IonItem>

                                </IonList>
                            </IonCardContent>
                        </IonCard>
                    ))
                }
            </IonContent>
        </IonPage>
    )
}

export default Cars