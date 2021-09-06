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
import { SqlUpdater } from '@core/models/sql/sql-updater.model';

/**
 * @name EmployeesRepository
 * @description Repositorio para el componente de empleados, encargado de realizar consultas a base de datos.
 */
export default class EmployeesRepository extends BaseRepository {
    private static _findQuery: string = '';
    private static _insertQuery: string = '';
    private static _findByIdQuery: string = '';
    private static _updateQuery: string = '';
    private static _deleteQuery: string = '';

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

    /**
     * @name update
     * @description Actualiza el empleado proporcionado en base de datos.
     * @param id - Identificador del empleado a actualizar.
     * @param updaters - Listado de campos a actualizar.
     * @returns Retorna el empleado actualizado o un excepción.
     */
    public async update(id: number, updaters: SqlUpdater[]): Promise<Employee> {
        try {
            let result: any = await MySql.executeQueryParameters(this.updateQuery(this.buildUpdaters(updaters)), this.getUpdaterValues(updaters, id));
            if (!result || !result.affectedRows)
                throw new ApiException(404)
                    .setError('ERR-404', `No se ha podido actualizar el empleado '${id}'.`)
                    .setLogMessage(`EmployeesRepository -> update -> No se ha podido actualizar el empleado '${id}'.`)
                    .setAsWarning();
            return await this.findById(id);
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar actualizar el empleado '${id}' en base de datos.`)
                    .setLogMessage(`EmployeesRepository -> update -> Se ha producido un error al intentar actualizar el empleado '${id}' en base de datos.`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    /**
     * @name delete
     * @description Borra el empleado proporcionado de base de datos.
     * @param id - Identificador del empleado a borrar.
     * @returns Retorna "true" en caso de borrar el empleado o una excepción.
     */
    public async delete(id: number): Promise<boolean> {
        try {
            let result: any = await MySql.executeQueryParameters(this.deleteQuery, [id]);
            if (!result || !result.affectedRows)
                throw new ApiException(404)
                    .setError('ERR-404', `No se ha podido borrar el empleado '${id}'.`)
                    .setLogMessage(`EmployeesRepository -> delete -> No se ha podido borrar el empleado '${id}'.`)
                    .setAsWarning();
            return true;
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar borrar el empleado '${id}' en base de datos.`)
                    .setLogMessage(`EmployeesRepository -> delete -> Se ha producido un error al intentar borrar el empleado '${id}' en base de datos.`)
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

    /**
     * @name updateQuery
     * @description Coge la query sql "update" de la carpeta db-queries, la carga en memoria y la retorna.
     * @param updaters - Listado de campos sql a actualizar.
     * @returns Retorna la query de actualizar empleados con el listado de campos sql a actualizar.
     */
    private updateQuery(updaters: string): string {
        let query: string = EmployeesRepository._updateQuery || (
            EmployeesRepository._updateQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/update.query.sql'), 'utf8')
        );
        return query.replace(':updaters', updaters);
    }

    /**
     * @name deleteQuery
     * @description Coge la query sql "delete" de la carpeta db-queries, la carga en memoria y la retorna.
     */
    private get deleteQuery(): string {
        return EmployeesRepository._deleteQuery || (
            EmployeesRepository._deleteQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/delete.query.sql'), 'utf8')
        );
    }

    //#endregion

}
