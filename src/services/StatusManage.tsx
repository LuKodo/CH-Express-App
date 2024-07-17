import Swal from 'sweetalert2'
import {changeStatus} from "./task.service";
export class StatusManage {
    draft ="Borrador"
    pending ="Pendiente"
    ready ="Preparado"
    progress ="En proceso"
    loading ="Cargando"
    transit ="En tránsito"
    unloading ="Descargando"
    done ="Terminado"
    cancel ="Cancelado"

    getStateDefinition(stateName: string): string {
        switch (stateName) {
            case 'draft':
                return this.draft;
            case 'pending':
                return this.pending;
            case 'ready':
                return this.ready;
            case 'progress':
                return this.progress;
            case 'loading':
                return this.loading;
            case 'transit':
                return this.transit;
            case 'unloading':
                return this.unloading;
            case 'done':
                return this.done;
            case 'cancel':
                return this.cancel;
            default:
                throw new Error(`Estado '${stateName}' no encontrado.`);
        }
    }

    getNextStatus(status: string): string[] | undefined {
        switch (status) {
            case 'draft':
                return ['pending', 'cancel'];
            case 'pending':
                return ['ready', 'cancel'];
            case 'ready':
                return ['progress', 'cancel'];
            case 'progress':
                return ['loading', 'cancel']
            case 'loading':
                return ['transit', 'cancel'];
            case 'transit':
                return ['unloading', 'cancel'];
            case 'unloading':
                return ['done', 'cancel'];
        }
    }

    async setNewStatus(prev:string, next: string, id:number) {
        await changeStatus(id, next)
    }
}
