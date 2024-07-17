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

const user = "demo"
const pwd = "demo"
const base64Credentials = btoa(`${user}:${pwd}`)

export interface FleteDestino {
  id: number,
  name: string,
  partner_id: [number, string],
  shipping_destination_id: [number, string],
  shipping_origin_id: [number, string],
  number_of_packages: number,
  note: string,
  state: string
}

export const getTasks = async (): Promise<FleteDestino[]> => {
  const queryParams = new URLSearchParams({
    model: "tms.package",
    fields: '["name","partner_id","shipping_destination_id","shipping_origin_id","number_of_packages","note","state"]',
    domain: '[]',
  }).toString()

  const response = await fetch(`https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/search_read?${queryParams}`, {
    headers: {
      'Authorization': `Basic ${base64Credentials}`,
    }
  });

  const data = await response.json();
  return data
};

export const changeStatus = async (id: number, status: string) => {
  const queryParams = new URLSearchParams({
    model: "tms.package",
    ids: "["+id+"]",
    values: '{"state": "'+status+'"}',
  }).toString()

  const response = await fetch(`https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/write?${queryParams}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${base64Credentials}`,
    }
  });

  const data = await response.json();
  return data
}

export const getCars = async () => {
  const queryParams = new URLSearchParams({
    model: "fleet.vehicle",
    fields: '["name","license_plate","state_id","odometer","image_128"]',
    domain: '[["driver_id", "=", 35067]]',
  }).toString()

  const response = await fetch(`https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/search_read?${queryParams}`, {
    headers: {
      'Authorization': `Basic ${base64Credentials}`,
    }
  });

  const data = await response.json();
  return data
}

export const getTask = async (name: string): Promise<FleteDestino[]> => {
  const queryParams = new URLSearchParams({
    model: "tms.package",
    fields: '["name","partner_id","shipping_destination_id","shipping_origin_id","number_of_packages","note","state"]',
    domain: '[["name","=",'+name+']]',
  }).toString()

  const response = await fetch(`https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/search_read?${queryParams}`, {
    headers: {
      'Authorization': `Basic ${base64Credentials}`,
    }
  });

  const data = await response.json();
  return data
};
