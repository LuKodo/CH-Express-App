import { useState } from "react";
import { IQrScannerService } from "../../application/IQrScannerService";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHintALLOption } from "@capacitor/barcode-scanner";

export const useQrScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startScan = async () => {
    try {
      const { ScanResult } = await CapacitorBarcodeScanner.scanBarcode({
        scanText: "qr",
        hint: CapacitorBarcodeScannerTypeHintALLOption.ALL,
      });
      if (ScanResult) {
        return ScanResult;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al escanear QR");
    } finally {
      setScanning(false);
    }
  };

  return { scanning, error, startScan };
};