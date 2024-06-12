export interface Task {
  numero_pedido: number;
  origen: string;
  destino: string;
  fecha_entrega: string
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch("tasks.json");

  const data = await response.json();
  return data;
};
