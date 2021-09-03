// Importaciones de core.
import { SqlFilter } from '@core/models/sql/sql-filter.model';

/**
 * @name BaseRepository
 * @description Repositorio base de la aplicación.
 */
export default class BaseRepository {
    constructor() { }

    /**
     * @name buildFilters
     * @description Construye los filtros sql con los filtros proporcionados por parámetros.
     * @param filters - Filtros a construir.
     * @returns Retorna la cadena con los filtros construidos.
     */
    protected buildFilters(filters: SqlFilter[]): string {
        let whereFilter: string = '';

        filters.forEach((filter: SqlFilter) => {
            whereFilter += ` AND ${filter.tablePrefix}.${filter.key} ${filter.operator} ?`;
        });

        // NOTE: Quitamos los cinco primeros caracteres, porque no nos interesa mantener el primer "and".
        return (whereFilter) ? ' WHERE ' + whereFilter.slice(5) : '';
    }

    /**
     * @name getFilterValues
     * @description Coge los valores de los filtros formateados.
     * @param filters - Filtros con los valores a retornar.
     * @returns Retorna los valores de los filtros formateados en un listado.
     */
    protected getFilterValues(filters: SqlFilter[]): any[] {
        let values: any[] = [];

        filters.forEach((filter: SqlFilter) => {
            values.push(filter.format.replace('{0}', filter.value));
        });

        return values;
    }
}
