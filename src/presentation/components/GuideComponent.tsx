import { Card } from "react-bootstrap";
import { IonButton } from "@ionic/react";
import { GuideDB } from "../pages/Details";

interface props {
    guide: GuideDB
    scan: (qty: number) => void
}

export const GuideComponent: React.FC<props> = ({ guide, scan }) => {
    return (
        <Card className="card-style">
            <Card.Body>
                <h5 className="card-title d-flex justify-content-between align-items-center">{guide.name} {guide.stage_id[1] === 'Recogida en Cliente' && (guide.number_of_packages > guide.counted) && <>
                    <IonButton onClick={() => scan(guide.number_of_packages)} color="warning" size='large'>
                        <i className='bi bi-qr-code fs-1' />
                    </IonButton>
                </>}</h5>
                <p className="card-text mb-0">N° de bultos: {guide.counted}/{guide.number_of_packages}</p>
                <p className="card-text mb-0">Transportista: {guide.shipping_partner_id[1]}</p>
                <p className="card-text mb-0">Destino: {guide.partner_id[1]}</p>
                <p className="card-text mb-0">N° de FV: {guide.nro_fv}</p>
                <p className="card-text mb-0">N° de FV Adicional: {guide.nro_fv_adicional}</p>
                <p className="card-text mb-0">Estado: {guide.stage_id[1]}</p>
            </Card.Body>
        </Card>
    );
};