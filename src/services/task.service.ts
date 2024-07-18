const user = "demo";
const pwd = "demo";
const base64Credentials = btoa(`${user}:${pwd}`);

export interface Task {
  numero_pedido: string;
  origen: string;
  destino: string;
  fecha_entrega: string;
  tipo: string;
}

export interface SaleOrder {
  id: number
  partner_id: [number, string];
  name: string;
  amount_total: number;
  state: string;
  city?: string;
}

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

export interface iPackageRelationLine {
    id: number
    name: string
    nro_fv: string
    nro_fv_adicional: string | boolean
    number_of_packages: number
    partner_id: [number, string]
    shipping_destination_id: [number, string]
    state: string
}

export interface iPackageRelation {
    id: number,
    lines: iPackageRelationLine[]
    order_partner_id: [number, string]
    tms_carga_ids: [number]
    shipping_origin_id: [number, string]
    state: string
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

export const changeStatusCarga = async (id: number, status: string) => {
  const queryParams = new URLSearchParams({
    model: "tms.carga",
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

export const getTMSCarga = async (id: [number]) => {
  const queryParams = new URLSearchParams({
    model: "tms.carga",
    fields:
      '["name", "partner_id", "nro_fv", "nro_fv_adicional", "number_of_packages", "shipping_destination_id", "state"]',
    ids: '['+ id + ']',
  }).toString();

  const response = await fetch(
    `https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/read?${queryParams}`,
    {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  );
  const data = await response.json();
  return data
}

export const getTask = async (id: string): Promise<iPackageRelation[]> => {
  const queryParams = new URLSearchParams({
    model: "sale.order.line",
    fields:
      '["tms_carga_ids", "order_partner_id", "shipping_origin_id","state"]',
    domain: '[["order_id","=",' + id + ']]',
  }).toString();

  const response = await fetch(
    `https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/search_read?${queryParams}`,
    {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  );

  const data = await response.json() as { id: number, tms_carga_ids: [number]}[];
  const tms_carga_ids = data.map(async (tms_carga_id: { id: number, tms_carga_ids: [number]}) => {
    const response2 = await getTMSCarga(tms_carga_id.tms_carga_ids);
    return { ...tms_carga_id, lines: response2 };
  })

  return await Promise.all(tms_carga_ids) as iPackageRelation[];
};
