import { IonAlert, IonLoading } from "@ionic/react";

interface ILoaderProps {
    loading: boolean;
    error?: any;
    setError: (error: any) => void;
}
export const Loader = ({ loading, error, setError }: ILoaderProps) => {
    return (
        <>
            {error && 
                <IonAlert
                    isOpen={true}
                    onDidDismiss={() => setError(undefined)}
                    header="Error"
                    message={error.message}
                    buttons={["OK"]}
                />
            }
            {loading && <IonLoading isOpen={loading} message="Cargando..." duration={3000} />}
        </>
    );
};
