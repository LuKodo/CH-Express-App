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
            {loading &&
                <div className="d-flex justify-content-center">
                    <div className="preloader-l">
                        <div
                            className="spinner-border color-yellow-dark"
                            style={{ borderWidth: "7px" }}
                            role="status"
                        />
                    </div>
                </div>
            }
        </>
    );
};
