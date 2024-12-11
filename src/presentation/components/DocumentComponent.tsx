import { Card } from "react-bootstrap";
import { Document } from "../../domain/entities/Document";

interface props {
    data: Document
}

export const DocumentComponent: React.FC<props> = ({ data: dataDocument }) => {
    return (
        <>
            <Card className="card-style">
                <Card.Body>
                    <h4 className='fw-bolder mb-3'>{dataDocument.task_sequence}</h4>
                    <h6 className='mb-3'><i className='bi bi-person me-2' />Conductor: {dataDocument.driver_id[1]}</h6>
                    <h6 className='mb-3'><i className='bi bi-person me-2' />Ayudante: {dataDocument.x_studio_ayudante[1]}</h6>
                    <h6 className="mb-4"><i className="bi bi-truck me-2" />Vehículo: {dataDocument.tractor_id[1]}</h6>
                </Card.Body>
            </Card>
        </>
    );
};