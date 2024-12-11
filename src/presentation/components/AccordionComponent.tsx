import { Card } from "react-bootstrap"
import { AccordionItemComponent } from "./AccordionItemComponent"
import { Guide } from "../../domain/entities/Guide"
import { FilledGuides } from "../../domain/entities/FilledGuides"
import { GuideDB } from "../pages/Details"
import { useEffect, useState } from "react"

interface props {
    data: GuideDB[]
    scan: (qty: number) => void
}
export const AccordionComponent: React.FC<props> = ({ scan, data }) => {
    const [guides, setGuide] = useState<{ data: GuideDB[], qty: number }>({ data: [], qty: 0 })
    const [flete, setFlete] = useState<{ data: GuideDB[], qty: number }>({ data: [], qty: 0 })
    const [retiro, setRetiro] = useState<{ data: GuideDB[], qty: number }>({ data: [], qty: 0 })

    useEffect(() => {
        data.map((guide: GuideDB) => {
            guide.type === 'contra' && setFlete({ data: [...flete.data, guide], qty: flete.qty + 1 })
            guide.type === 'flete' && setGuide({ data: [...guides.data, guide], qty: guides.qty + 1 })
            guide.type === 'retiro' && setRetiro({ data: [...retiro.data, guide], qty: retiro.qty + 1 })
        })
    }, [data])

    return (
        <Card className="card-style">
            <Card.Body>
                <div className="accordion mt-0" id="accordionExample">
                    <AccordionItemComponent
                        name="Guías de despacho"
                        target="one"
                        scan={scan}
                        data={guides.data}
                    />
                    <AccordionItemComponent
                        name="Fletes Contraentrega"
                        target="two"
                        scan={scan}
                        data={flete.data}
                    />
                    <AccordionItemComponent
                        name="Órdenes de Retiro"
                        target="three"
                        scan={scan}
                        data={retiro.data}
                    />
                </div>
            </Card.Body>
        </Card>
    )
}