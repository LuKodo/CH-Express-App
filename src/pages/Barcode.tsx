import { useEffect, useState } from "react";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner'

export const Barcode = () => {
    const scan = CapacitorBarcodeScanner
    useEffect(() => {
        scan.scanBarcode({
            scanText: 'qr',
            hint: CapacitorBarcodeScannerTypeHintALLOption.ALL,
        })
    })

    return (
        <>
        </>
    )
}