// Importaciones de core.
import { SqlFilter } from '@core/models/sql/sql-filter.model';

/**
 * @name BaseService
 * @description Servicio base de la aplicación.
 */
export default class BaseService {
    constructor() { }

    /**
     * @name getSqlFilter
     * @description Crea los filtros sql y los guarda en los filtros proporcionados por parámetros.
     * @param key - Nombre del campo en base de datos.
     * @param value - Valor a buscar.
     * @param operator - Operador del campo a filtrar.
     * @param format - Formato del valor a buscar.
     * @param tablePrefix - Prefijo de la tabla (prefijo de la tabla de la query).
     * @param filters - Listado de filtros donde guardar el nuevo filtro creado.
     */
    protected getSqlFilter(key: string, value: any, operator: string, format: string, tablePrefix: string, filters: SqlFilter[]): void {
        if (value || value === 0) {
            filters.push({
                key: key,
                value: value,
                operator: operator,
                format: format,
                tablePrefix: tablePrefix
            });
        }
    }
}
