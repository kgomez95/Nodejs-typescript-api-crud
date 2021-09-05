// Librerías.
import fs from 'fs';
import path from 'path';

// Importaciones de core.
import { ApiException } from '@core/exceptions/api.exception';
import MySql from '@core/database';
import BaseRepository from '@core/base-components/base.repository';
import { SqlFilter } from '@core/models/sql/sql-filter.model';
import { Employee } from '@core/db-models/employees/employee.db-model';
import { MySqlException } from '@core/models/sql/mysql-exception.model';

/**
 * @name EmployeesRepository
 * @description Repositorio para el componente de empleados, encargado de realizar consultas a base de datos.
 */
export default class EmployeesRepository extends BaseRepository {
    private static _findQuery: string = '';
    private static _insertQuery: string = '';
    private static _findByIdQuery: string = '';

    constructor() {
        super();
    }

    /**
     * @name findById
     * @description Busca un empleado por el identificador.
     * @param id - Identificador del empleado a buscar.
     * @returns Retorna el empleado o una excepción.
     */
    public async findById(id: number): Promise<Employee> {
        try {
            let result: Employee[] = await MySql.executeQueryParameters(this.findByIdQuery, [id]);
            if (!result[0])
                throw new ApiException(500)
                    .setError('ERR-500', `No se ha podido coger el empleado '${id}'.`)
                    .setLogMessage(`EmployeesRepository -> findById -> No se ha podido coger el empleado '${id}'.`)
                    .setAsError();
            return result[0] as Employee;
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar recuperar el empleado en base de datos.`)
                    .setLogMessage(`EmployeesRepository -> findById -> Se ha producido un error al intentar recuperar el empleado '${id}' en base de datos.`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    /**
     * @name find
     * @description Realiza una búsqueda de empleados en base de datos.
     * @param filters - Filtros a aplicar en la búsqueda.
     * @returns Retorna un listado de empleados o una excepción.
     */
    public async find(filters: SqlFilter[]): Promise<Employee[]> {
        try {
            let result: Employee[] = await MySql.executeQueryParameters(this.findQuery + this.buildFilters(filters), this.getFilterValues(filters));
            if (!result[0])
                throw new ApiException(204)
                    .setError('ERR-204', `No se han encontrado empleados.`)
                    .setLogMessage(`EmployeesRepository -> find -> No se han podido coger los empleados: ${JSON.stringify(filters)}`)
                    .setAsDebug();
            return result;
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar recuperar los empleados en base de datos.`)
                    .setLogMessage(`EmployeesRepository -> find -> Se ha producido un error al intentar recuperar los empleados de base de datos: ${JSON.stringify(filters)}`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    /**
     * @name insert
     * @description Inserta el nuevo empleado en base de datos.
     * @param name - Nombre del nuevo empleado.
     * @param last_name - Apellidos del nuevo empleado.
     * @param nif - NIF del nuevo empleado.
     * @param department_id - Identificador del departamento del nuevo empleado.
     * @returns Retorna el nuevo empleado que se ha insertado.
     */
    public async insert(name: string, last_name: string, nif: string, department_id: number): Promise<Employee> {
        try {
            let result: any = await MySql.executeQueryParameters(this.insertQuery, [name, last_name, nif, department_id]);
            if (!result || !result.insertId)
                throw new ApiException(500)
                    .setError('ERR-500', `No se ha podido añadir el empleado '${nif}'.`)
                    .setLogMessage(`EmployeesRepository -> insert -> No se ha podido añadir el empleado.`)
                    .setAsError();
            return await this.findById(result.insertId);
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else if (this.isDuplicateException(ex as MySqlException)) {
                throw new ApiException(400)
                    .setError('ERR-400', `Ya existe un empleado con el nif '${nif}' en base de datos.`)
                    .setLogMessage(`EmployeesRepository -> insert -> Se ha producido un error al intentar insertar un empleado que ya existe en base de datos.`)
                    .setException(ex)
                    .setAsWarning();
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar insertar el empleado '${nif}' en base de datos.`)
                    .setLogMessage(`EmployeesRepository -> insert -> Se ha producido un error al intentar insertar el nuevo empleado en base de datos.`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    //#region - Funciones para coger las queries de base de datos.

    /**
     * @name findQuery
     * @description Coge la query sql "find" de la carpeta db-queries, la carga en memoria y la retorna.
     */
    private get findQuery(): string {
        return EmployeesRepository._findQuery || (
            EmployeesRepository._findQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/find.query.sql'), 'utf8')
        );
    }

    /**
     * @name insertQuery
     * @description Coge la query sql "insert" de la carpeta db-queries, la carga en memoria y la retorna.
     */
    private get insertQuery(): string {
        return EmployeesRepository._insertQuery || (
            EmployeesRepository._insertQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/insert.query.sql'), 'utf8')
        );
    }

    /**
     * @name findByIdQuery
     * @description Coge la query sql "findById" de la carpeta db-queries, la carga en memoria y la retorna.
     */
    private get findByIdQuery(): string {
        return EmployeesRepository._findByIdQuery || (
            EmployeesRepository._findByIdQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/find-by-id.query.sql'), 'utf8')
        );
    }

    //#endregion

}
