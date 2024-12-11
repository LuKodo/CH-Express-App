import { startTransition, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getData } from '../../services/documents.service';
import { Loader } from '../components/Loader';
import { Document } from '../../domain/entities/Document';
import { DocumentComponent } from '../components/DocumentComponent';
import { GuideComponent } from '../components/GuideComponent';
import { Guide } from '../../domain/entities/Guide';
import { AccordionComponent } from '../components/AccordionComponent';
import { useQrScanner } from '../hooks/useQrScanner';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface GuideDB extends Guide {
    counted: number;
}

const STORAGE_CONFIG = {
    key: 'packages',
    columns: [
        'name',
        'type',
        'number_of_packages',
        'shipping_partner_id',
        'partner_id',
        'nro_fv',
        'nro_fv_adicional',
        'stage_id',
        'counted',
    ]
};

const Details = () => {
    const { id, model } = useParams();
    const { getById, insertItem, updateItem, data: documents } = useLocalStorage<GuideDB>(STORAGE_CONFIG);
    const { startScan } = useQrScanner();

    const [state, setState] = useState({
        loading: false,
        error: undefined as any,
        document: undefined as Document | undefined,
        guide: undefined as GuideDB | undefined,
        guides: undefined as GuideDB[] | undefined
    });

    const handleScan = async () => {
        try {
            const content = await startScan();

            if (!content) {
                throw new Error("No se pudo leer el código QR");
            }

            const data = content.split('|');
            const id = (String(data[0].split(':')[1]).trim());
            const exists = await getById(Number(id));

            if (!exists) {
                throw new Error('No se encontró el documento');
            }

            const newData = {
                ...exists,
                counted: exists?.counted ? exists?.counted + 1 : 1
            }

            await updateItem(Number(id), newData);

            if (model === 'tms.carga') {
                setState({
                    ...state,
                    guide: exists
                });
            } else {
                const guides = state.guides ? state.guides : [];
                guides.map(guide => {
                    if (guide.id === Number(id)) {
                        guide.counted = guide.counted ? guide.counted + 1 : 1;
                    }
                })

                setState({
                    ...state,
                    guides
                });
            }
        } catch (err) {
            console.error('Error during scan:', err);
        }
    };

    const processGuideData = async (guideId: number): Promise<GuideDB | null> => {
        const existingDocument = await getById(guideId);
        if (existingDocument) return existingDocument;

        const fields = '["name", "type", "number_of_packages", "shipping_partner_id", "partner_id", "nro_fv", "nro_fv_adicional", "stage_id"]';
        const data = await getData(guideId, 'tms.carga', fields) as Guide;

        if (!data) return null;

        const newDocument: GuideDB = {
            ...data,
            counted: 0
        };

        await addTask(newDocument);
        return newDocument;
    };

    const processOneGuideData = async (guideId: number): Promise<GuideDB | null> => {
        const existingDocument = await getById(guideId);
        if (existingDocument) return existingDocument;

        const fields = '["name", "type", "number_of_packages", "shipping_partner_id", "partner_id", "nro_fv", "nro_fv_adicional", "stage_id"]';
        const data = await getData(guideId, 'tms.carga', fields) as Guide;

        if (!data) return null;

        const newDocument: GuideDB = {
            ...data,
            counted: 0
        };

        await addTask(newDocument);
        return newDocument;
    }

    const loadData = useCallback(async () => {
        if (!id) return;

        setState(prev => ({ ...prev, loading: true }));

        try {
            if (model === 'project.task') {
                const fieldsProject = '["task_sequence","driver_id","tractor_id","x_studio_ayudante","tms_carga_flete_ids", "tms_carga_contra_ids", "tms_carga_retiro_ids"]';
                const documentData = await getData(Number(id), 'project.task', fieldsProject) as Document;

                if (!documentData) {
                    throw new Error('No document data found');
                }

                const allGuideIds = [
                    ...documentData.tms_carga_flete_ids,
                    ...documentData.tms_carga_contra_ids,
                    ...documentData.tms_carga_retiro_ids
                ];

                const guides = (await Promise.all(
                    allGuideIds.map(processGuideData)
                )).filter((guide): guide is GuideDB => guide !== null);

                startTransition(() => {
                    setState(prev => ({
                        ...prev,
                        document: documentData,
                        guides,
                        error: undefined,
                        loading: false
                    }));
                });
            } else {
                const guide = await processOneGuideData(Number(id));

                if (!guide) {
                    throw new Error('No guide data found');
                }

                startTransition(() => {
                    setState(prev => ({
                        ...prev,
                        guide,
                        error: undefined,
                        loading: false
                    }));
                });

            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setState(prev => ({
                ...prev,
                error,
                loading: false
            }));
        }
    }, [id, model]);

    useEffect(() => {
        loadData();
    }, []);

    const addTask = async (task: GuideDB) => {
        await insertItem(task);
    };

    const { loading, error, document, guide, guides } = state;

    return (
        <>
            <Loader setError={(error) => setState(prev => ({ ...prev, error }))}
                loading={loading}
                error={error} />

            {!loading && document && (
                <>
                    <DocumentComponent data={document} />
                    {guides && (
                        <AccordionComponent
                            data={guides}
                            scan={handleScan}
                        />
                    )}
                </>
            )}

            {!loading && guide && (
                <GuideComponent
                    guide={guide}
                    scan={handleScan}
                />
            )}
        </>
    );
};

export default Details;