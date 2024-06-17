export interface Task {
  numero_pedido: string;
  origen: string;
  destino: string;
  fecha_entrega: string;
  tipo: string;
}

export interface TaskList {
  order_service: StatusCheckList[];
  destination: StatusCheckList[];
  travel_relation: StatusCheckList[];
}

export interface StatusCheckList {
  status: string;
  description: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch("tasks.json");

  const data = await response.json();
  return data;
};

export const getChekTasks = async (): Promise<TaskList> => {
  const response = await fetch("checklist.json");

  const data = await response.json();
  return data;
}

export const getTask = async (id: string): Promise<Task | undefined> => {
  const tasks = await getTasks();
  return tasks.find((task) => task.numero_pedido === id);
};

export const getCheckList = async (type: string): Promise<StatusCheckList[] | undefined> => {
  const tasks = await getChekTasks();
  if (type === "order_service") {
    return tasks.order_service;
  } else if (type === "destination") {
    return tasks.destination;
  } else if (type === "travel_relation") {
    return tasks.travel_relation;
  }
};

export const getTypesTasks = async (): Promise<string[]> => {
  const response = await fetch("task_types.json");

  const data = await response.json();
  return data;
}