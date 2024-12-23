import { startTransition, useCallback, useEffect, useState } from "react";
import { getSaleOrder, SaleOrder } from "../services/task.service.ts";
import { Loader } from "../components/Loader.tsx";
import { Link } from "react-router-dom";
import { IonBadge, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { StatusManage } from "../services/StatusManage.tsx";

const PackagesRelation: React.FC = () => {
    const [data, setData] = useState<SaleOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const [orders, setOrders] = useState<SaleOrder[]>([])
    
    const statusManage = new StatusManage()

    

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
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Relacion de Carga</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSearchbar
                    onIonChange={(event) => handleInput(event.detail.value!)}
                    placeholder="Numero de pedido"
                />
                <Loader setError={setError} loading={loading} error={error} />
                {
                    !loading &&
                    orders.length > 0 &&
                    orders.map((order) => (
                        <IonCard key={order.name}>
                            <IonCardContent>
                                <div className='d-flex flex-column mb-3'>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className={"fw-bold"}>{order.name.split('/')[0]}</span>
                                        <IonBadge className="text-bg-dark" slot="start">{statusManage.getStateDefinition(order.state, 'package')}</IonBadge>
                                    </div>
                                    <div className="d-flex flex-column align-items-start">
                                        <span className="small">Cliente: </span>
                                        <b>{order.partner_id[1]}</b>
                                    </div>
                                    <span>Ciudad: {order.city || 'N/A'}</span>
                                    <span>Valor Total: $ {order.amount_total}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <IonButton className="w-100 fw-bold" fill="solid" size="small" color="warning" href={`/package-relation/${order.id}`}>
                                        <i className="bi bi-info-circle me-2" /> Detalles
                                    </IonButton>
                                </div>
                            </IonCardContent>


                        </IonCard>
                    ))
                }
            </IonContent>
        </IonPage>
    )
}

export default PackagesRelation