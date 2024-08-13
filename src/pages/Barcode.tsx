import { useEffect, useState } from "react";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner'
import { Modal } from "react-bootstrap";

interface Props {
    show: boolean
    setShow: (show: boolean) => void
}

export const Barcode: React.FC<Props> = ({ show, setShow }) => {
    const scan = CapacitorBarcodeScanner
    useEffect(() => {
        const scanQr = async () => {
            const result = await scan.scanBarcode({
                scanText: 'qr',
                hint: CapacitorBarcodeScannerTypeHintALLOption.ALL,
            })

            if (result) {
                console.log(result)
            }
        }

        scanQr()
    })

    return (
        <Modal show={show} onHide={() => { setShow(false) }} size="sm">
            <Modal.Body>
            </Modal.Body>
        </Modal>
    )
}