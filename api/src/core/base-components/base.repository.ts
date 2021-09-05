// Importaciones de core.
import { SqlFilter } from '@core/models/sql/sql-filter.model';
import { SqlUpdater } from '@core/models/sql/sql-updater.model';
import { MySqlException } from '@core/models/sql/mysql-exception.model';

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

    /**
     * @name buildUpdaters
     * @description Construye los campos sql a actualizar proporcionados por parámetros.
     * @param updaters - Listado de campos sql a actualizar.
     * @returns Retorna la cadena con los campos construidos.
     */
    protected buildUpdaters(updaters: SqlUpdater[]): string {
        let setUpdater: string = '';

        updaters.forEach((updater: SqlUpdater) => {
            setUpdater += `, ${updater.key} = ?`;
        });

        return (setUpdater) ? ' SET ' + setUpdater.slice(2) : '';
    }

    /**
     * @name getUpdaterValues
     * @description Coge los valores de los campos a actualizar.
     * @param updaters - Listado de campos sql a actualizar.
     * @param moreValues - Más valores para añadir en los parámetros de la sentencia sql.
     * @returns Retorna los valores de los campos a actualizar en un listado.
     */
    protected getUpdaterValues(updaters: SqlUpdater[], ...moreValues: any[]): any[] {
        let values: any[] = [];

        updaters.forEach((updater: SqlUpdater) => {
            values.push(updater.value);
        });

        moreValues.forEach((value: any) => {
            values.push(value);
        });

        return values;
    }

    /**
     * @name isDuplicateException
     * @description Comprueba si la excepción proporcionada es por una entrada duplicada.
     * @param exception - Excepción a comprobar.
     * @returns Retorna "true" en caso de que la excepción sea por campo duplicado o "false" en caso de que no lo sea.
     */
    protected isDuplicateException(exception: MySqlException): boolean {
        return (exception) ? exception.code === 'ER_DUP_ENTRY' : false;
    }
}
