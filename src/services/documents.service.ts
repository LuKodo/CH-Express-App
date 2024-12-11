const user = "demo";
const pwd = "demo";
const base64Credentials = btoa(`${user}:${pwd}`);

export const getData = async (
    id: number,
    model: string,
    fields: string,
) => {
    const queryParams = new URLSearchParams({
        model: model,
        fields: fields,
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