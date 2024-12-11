export interface Guide {
    id: number
    name: string
    type: string
    number_of_packages: number
    shipping_partner_id: [number, string]
    partner_id: [number, string]
    nro_fv: string
    nro_fv_adicional: string | boolean
    stage_id: [number, string]
}