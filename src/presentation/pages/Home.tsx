import { IonButton } from '@ionic/react';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQrScanner } from '../hooks/useQrScanner';

const Home = () => {
  const location = useNavigate();

  const { startScan } = useQrScanner()

  const scan = async () => {
    try {
      const content = await startScan();
      if (content) {
        splitResult(content);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const splitResult = (result: string) => {
    const data = result.split('|');
    const id = (String(data[0].split(':')[1]).trim());
    const model = (String(data[1].split(':')[1]).trim());

    location('/details/' + id + '/' + model)
  }

  return (
    <>
      <Card className="card-style">
        <Card.Body className='d-flex flex-column align-items-center'>
          <h3 className='fw-bolder text-center mb-3'>Escaneo de código QR</h3>
          <IonButton onClick={scan} color="warning" size='large'>
            <i className='bi bi-qr-code fs-1' />
          </IonButton>
          <p className="mt-3 ">
            Escanee <b>un Tipo de Operación</b> <br />
            Escanee <b>un Documento</b>
          </p>
        </Card.Body>
      </Card>
    </>
  )
};

export default Home;