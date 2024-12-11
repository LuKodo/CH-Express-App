export class StatusManage {
    draft ="Borrador"
    pending ="Efectuada"
    ready ="No Efectuada"
    progress ="No Despachada"
    loading ="Por Redespachar"
    transit ="Despachada"
    unloading ="En Transito"
    done ="Entregada"
    cancel ="Devuelta"

    getStateDefinition(stateName: string, tms: string): string {
        switch (stateName) {
            case 'draft':
                return this.draft;
            case 'pending':
                return tms === 'package' ? 'Recolectada': this.pending;
            case 'ready':
                return tms === 'package' ? 'No Despachada': this.ready;
            case 'progress':
                return tms === 'package' ? 'Por Redespachar': this.progress;
            case 'loading':
                return tms === 'package' ? 'Despachada': this.loading;
            case 'transit':
                return tms === 'package' ? 'En Transito': this.transit;
            case 'unloading':
                return tms === 'package' ? 'Descargando': this.unloading;
            case 'done':
                return this.done;
            case 'cancel':
                return this.cancel;
            default:
                return '';
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
}
