/**
 * @name SqlFilter
 * @description Modelo de los filtros sql.
 */
 export interface SqlFilter {
    key: string;
    value: any;
    operator: string;
    format: string;
    tablePrefix: string;
}
