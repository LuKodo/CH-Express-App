import { Card } from "react-bootstrap"

export const Profile = () => {
    return (
        <Card className="card-style">
            <div className="content">
                <h6 className="fw-bold">Perfil</h6>
                <div className="form-custom form-label form-icon my-3">
                    <i className="bi bi-person-circle font-14"></i>
                    <input type="text" className="form-control rounded-xs bg-white" disabled id="c1" placeholder="Karla Black" />
                    <label htmlFor="c1" className="color-theme form-label-always-active font-10 opacity-50">Name</label>
                </div>
                <div className="form-custom form-label form-icon my-3">
                    <i className="bi bi-person-circle font-14"></i>
                    <input type="text" className="form-control rounded-xs bg-white" disabled id="c1" placeholder="Karla Black" />
                    <label htmlFor="c1" className="color-theme form-label-always-active font-10 opacity-50">Name</label>
                </div>
                <div className="form-custom form-label form-icon my-3">
                    <i className="bi bi-person-circle font-14"></i>
                    <input type="text" className="form-control rounded-xs bg-white" disabled id="c1" placeholder="Karla Black" />
                    <label htmlFor="c1" className="color-theme form-label-always-active font-10 opacity-50">Name</label>
                </div>
            </div>
        </Card>
    )
}