import { IonAlert, IonButton, IonContent, IonImg, IonInput, IonItem } from "@ionic/react";
import { useEffect, useState } from "react";
import { User, getUsers } from "../services/user.service";
import { useNavigate } from "react-router";

export const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
        header: "",
        message: "",
        buttons: ["OK"],
    });
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        localStorage.removeItem("user");

        const fetchTasks = async () => {
            try {
                const data = await getUsers();

                setUsers(data);
            } catch (error) {

            }
        };

        fetchTasks();
    }, []);

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(username, password);

        if (username !== "" && password !== "") {
            const user = users.find((user) => user.usuario === username && user.contrasena === password);

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                navigate('/');
            } else {
                setAlertMessage({
                    header: "Login Failed",
                    message: "User not found",
                    buttons: ["OK"],
                })
                setShowAlert(true);
                return;
            }
        } else {
            setAlertMessage({
                header: "Login Failed",
                message: "Invalid username or password",
                buttons: ["OK"],
            });
            setShowAlert(true);
        }
    }

    return (
        <IonContent className="ion-padding">
            <IonImg
                src="logo.jpg"
                alt="logo"
                className="mt-5 img-fluid"
            />

            <IonItem className="mt-5">
                <IonInput
                    label="Usuario"
                    labelPlacement="floating"
                    onIonInput={(e) => setUsername(e.detail.value!)}
                    value={username}

                />
            </IonItem>

            <IonItem className="mt-4">
                <IonInput
                    label="Contraseña"
                    labelPlacement="floating"
                    type="password"
                    onIonInput={(e) => setPassword(e.detail.value!)}
                    value={password}
                />
            </IonItem>
            <IonButton
                id="present-alert"
                color="warning"
                expand="block"
                className="fw-bold mt-5"
                onClick={handleLogin}
            >
                Ingresar
            </IonButton>

            <IonAlert
                isOpen={showAlert}
                header={alertMessage.header}
                message={alertMessage.message}
                buttons={alertMessage.buttons}
                onDidDismiss={() => setShowAlert(false)}
            />
        </IonContent>
    )
}