import { OrderComponent } from "../components/Order";
import { startTransition, useCallback, useEffect, useState } from "react";
import { FleteDestino, getTasks } from "../services/task.service";
import { Loader } from "../components/Loader";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Tasks: React.FC = () => {
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
      });
    } catch (error) {
      startTransition(() => {
        setError(error);
      });
    } finally {
      startTransition(() => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInput = (value: string) => {
    let query = "";
    if (value) query = value!.toLowerCase();

    setFilterTasks(
      data.filter((d) => d.name.toLowerCase().indexOf(query) > -1)
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Flete Destino</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          onIonChange={(event) => handleInput(event.detail.value!)}
          placeholder="Numero de pedido"
        />
        <Loader setError={setError} loading={loading} error={error} />
        {filterTasks.length > 0 &&
          filterTasks?.map((order) => {
            return <OrderComponent key={order.name} order={order} />;
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
