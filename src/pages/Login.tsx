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
        if (username !== "" && password !== "") {
            const user = users.find((user) => user.usuario === username && user.contrasena === password);

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                navigate('/destination');
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
        <div className="page-content header-clear-medium">
            <div className="card card-style">
                <div className="content">
                    <IonImg
                        src="logo.jpg"
                        alt="logo"
                        className="mt-5 img-fluid"
                    />

                    <div className="form-custom form-label form-icon mb-3">
                        <i className="bi bi-person-circle font-14"></i>
                        <input
                            type="text"
                            className="form-control rounded-xs"
                            id="c1"
                            placeholder="JohnDoe"
                            onChange={(e) => setUsername(e.target.value!)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                            value={username}
                        />
                        <label htmlFor="c1" className="color-theme">Nombre de usuario</label>
                        <span>(requerido)</span>
                    </div>
                    <div className="form-custom form-label form-icon mb-3">
                        <i className="bi bi-asterisk font-12"></i>
                        <input
                            type="password"
                            className="form-control rounded-xs"
                            id="c2"
                            placeholder="Password"
                            onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                            onChange={(e) => setPassword(e.target.value!)}
                            value={password}
                        />
                        <label htmlFor="c2" className="color-theme">Contraseña</label>
                        <span>(requerido)</span>
                    </div>
                    <button
                        onClick={handleLogin} className="btn w-100 rounded-sm btn-m gradient-yellow text-uppercase font-700 mt-4 mb-3 btn-full shadow-bg shadow-bg-s">Ingresar</button>
                </div>
            </div>
        </div>
    )
}