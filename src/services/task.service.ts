export interface Task {
  numero_pedido: string;
  origen: string;
  destino: string;
  fecha_entrega: string;
  tipo: string;
}

export interface SaleOrder {
  partner_id: [number, string];
  name: string;
  amount_total: number;
  state: string;
  city?: string;
}

const user = "demo";
const pwd = "demo";
const base64Credentials = btoa(`${user}:${pwd}`);

export interface FleteDestino {
  id: number;
  name: string;
  partner_id: [number, string];
  shipping_destination_id: [number, string];
  shipping_origin_id: [number, string];
  number_of_packages: number;
  note: string;
  state: string;
}

export const getRestParnetInfo = async (
  id: number
): Promise<{ id: number; city: string }> => {
  const queryParams = new URLSearchParams({
    model: "res.partner",
    fields: '["city"]',
    domain: '[["id","=","' + id + '"]]',
  }).toString();

  const response = await fetch(
    `https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/search_read?${queryParams}`,
    {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  );

  const data = await response.json();
  return data[0];
};

export const getSaleOrder = async (): Promise<SaleOrder[]> => {
  const queryParams = new URLSearchParams({
    model: "sale.order",
    fields: '["name","partner_id","amount_total","state"]',
    domain: "[]",
  }).toString();

  const response = await fetch(
    `https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/search_read?${queryParams}`,
    {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  );
  const data = await response.json();

  const ciudadesPromesas = data.map(async (order: SaleOrder) => {
    const response2 = await getRestParnetInfo(order.partner_id[0]);
    return { ...order, city: response2.city };
  });

  return await Promise.all(ciudadesPromesas);
};

export const getTasks = async (): Promise<FleteDestino[]> => {
  const queryParams = new URLSearchParams({
    model: "tms.package",
    fields:
      '["name","partner_id","shipping_destination_id","shipping_origin_id","number_of_packages","note","state"]',
    domain: "[]",
  }).toString();

  const response = await fetch(
    `https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/search_read?${queryParams}`,
    {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  );

  const data = await response.json();
  return data;
};

export const changeStatus = async (id: number, status: string) => {
  const queryParams = new URLSearchParams({
    model: "tms.package",
    ids: "[" + id + "]",
    values: '{"state": "' + status + '"}',
  }).toString();

  const response = await fetch(
    `https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/write?${queryParams}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  );

  const data = await response.json();
  return data;
};

export const getCars = async () => {
  const queryParams = new URLSearchParams({
    model: "fleet.vehicle",
    fields: '["name","license_plate","state_id","odometer","image_128"]',
    domain: '[["driver_id", "=", 35067]]',
  }).toString();

  const response = await fetch(
    `https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/search_read?${queryParams}`,
    {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  );

  const data = await response.json();
  return data;
};

export const getTask = async (name: string): Promise<FleteDestino[]> => {
  const queryParams = new URLSearchParams({
    model: "tms.package",
    fields:
      '["name","partner_id","shipping_destination_id","shipping_origin_id","number_of_packages","note","state"]',
    domain: '[["name","=","' + name + '"]]',
  }).toString();

  const response = await fetch(
    `https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/search_read?${queryParams}`,
    {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  );

  const data = await response.json();
  return data;
};
