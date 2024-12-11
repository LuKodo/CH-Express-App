export interface Document {
  id: number;
  task_sequence: number;
  driver_id: [number, string];
  tractor_id: [number, string];
  x_studio_ayudante: [number, string];
  tms_carga_flete_ids: [number];
  tms_carga_contra_ids: [number];
  tms_carga_retiro_ids: [number];
}
