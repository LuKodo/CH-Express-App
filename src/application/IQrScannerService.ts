export interface IQrScannerService {
    scanQR(): Promise<string>;
}