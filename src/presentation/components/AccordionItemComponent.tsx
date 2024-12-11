import { IonButton } from "@ionic/react"
import { GuideDB } from "../pages/Details"

interface props {
    data: GuideDB[]
    scan: (qty: number) => void
    name: string
    target: string
}

interface WithId {
    id: number | string;
    [key: string]: any;
}

export const removeDuplicatesById = <T extends WithId>(arr: T[]): T[] => {
    const idMap = new Map<number | string, T>();

    arr.forEach(item => {
        idMap.set(item.id, item);
    });

    return Array.from(idMap.values());
};

export const AccordionItemComponent: React.FC<props> = ({ data, scan, name, target }) => {
    const uniqueData = removeDuplicatesById(data);
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${target}`} aria-expanded="true" aria-controls="collapseOne">
                    {name} [{uniqueData.length}]
                </button>
            </h2>
            <div id={target} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body m-0 p-0">
                    {
                        uniqueData.length > 0 && uniqueData.map((guide: GuideDB) => (
                            <div className="border mb-3 rounded-3 shadow-sm" key={guide.id}>
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-between align-items-center">{guide.name} {guide.stage_id[1] === 'Recogida en Cliente' && (guide.number_of_packages > guide.counted) &&
                                        <>
                                            <IonButton onClick={() => scan(guide.number_of_packages)} color="warning" size='large'>
                                                <i className='bi bi-qr-code fs-1' />
                                            </IonButton>
                                        </>
                                    }
                                    </h5>
                                    <p className="card-text mb-0">N° de bultos: {guide.counted}/{guide.number_of_packages}</p>
                                    <p className="card-text mb-0">Transportista: {guide.shipping_partner_id[1]}</p>
                                    <p className="card-text mb-0">Destino: {guide.partner_id[1]}</p>
                                    <p className="card-text mb-0">N° de FV: {guide.nro_fv}</p>
                                    <p className="card-text mb-0">N° de FV Adicional: {guide.nro_fv_adicional}</p>
                                    <p className="card-text mb-0">Estado: {guide.stage_id[1]}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}