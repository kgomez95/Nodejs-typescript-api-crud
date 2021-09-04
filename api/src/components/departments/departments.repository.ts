// Librerías.
import fs from 'fs';
import path from 'path';

// Importaciones de core.
import { ApiException } from '@core/exceptions/api.exception';
import MySql from '@core/database';
import { Department } from '@core/db-models/departments/department.db-model';
import BaseRepository from '@core/base-components/base.repository';
import { SqlFilter } from '@core/models/sql/sql-filter.model';
import { SqlUpdater } from '@core/models/sql/sql-updater.model';

/**
 * @name DepartmentsRepository
 * @description Repositorio para el componente de departamentos, encargado de realizar consultas a base de datos.
 */
export default class DepartmentsRepository extends BaseRepository {
    private static _findByIdQuery: string = '';
    private static _insertQuery: string = '';
    private static _findQuery: string = '';
    private static _updateQuery: string = '';
    private static _deleteQuery: string = '';

    constructor() {
        super();
    }

    /**
     * @name findById
     * @description Busca un departamento por el identificador.
     * @param id - Identificador del departamento a buscar.
     * @returns Retorna el departamento o una excepción.
     */
    public async findById(id: number): Promise<Department> {
        try {
            let result: Department[] = await MySql.executeQueryParameters(this.findByIdQuery, [id]);
            if (!result[0])
                throw new ApiException(500)
                    .setError('ERR-500', `No se ha podido coger el departamento '${id}'.`)
                    .setLogMessage(`DepartmentRepository -> findById -> No se ha podido coger el departamento '${id}'.`)
                    .setAsError();
            return result[0] as Department;
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar recuperar el departamento en base de datos.`)
                    .setLogMessage(`DepartmentRepository -> findById -> Se ha producido un error al intentar recuperar el departamento '${id}' en base de datos.`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    /**
     * @name find
     * @description Realiza una búsqueda de departamentos en base de datos.
     * @param filters - Filtros a aplicar en la búsqueda.
     * @returns Retorna un listado de departamentos o una excepción.
     */
    public async find(filters: SqlFilter[]): Promise<Department[]> {
        try {
            let result: Department[] = await MySql.executeQueryParameters(this.findQuery + this.buildFilters(filters), this.getFilterValues(filters));
            if (!result[0])
                throw new ApiException(204)
                    .setError('ERR-204', `No se han encontrado departamentos.`)
                    .setLogMessage(`DepartmentRepository -> find -> No se han podido coger los departamento: ${JSON.stringify(filters)}`)
                    .setAsDebug();
            return result;
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar recuperar los departamentos en base de datos.`)
                    .setLogMessage(`DepartmentRepository -> find -> Se ha producido un error al intentar recuperar los departamentos de base de datos: ${JSON.stringify(filters)}`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    /**
     * @name insert
     * @description Inserta el nuevo departamento en base de datos.
     * @param code - Código del nuevo departamento.
     * @param name - Nombre del nuevo departamento.
     * @param description - Descripción del nuevo departamento.
     * @returns Retorna el nuevo departamento que se ha insertado.
     */
    public async insert(code: string, name: string, description: string): Promise<Department> {
        try {
            let result: any = await MySql.executeQueryParameters(this.insertQuery, [code, name, description]);
            if (!result || !result.insertId)
                throw new ApiException(500)
                    .setError('ERR-500', `No se ha podido añadir el departamento '${name}'.`)
                    .setLogMessage(`DepartmentRepository -> insert -> No se ha podido añadir el departamento.`)
                    .setAsError();
            return await this.findById(result.insertId);
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar insertar el departamento en base de datos.`)
                    .setLogMessage(`DepartmentRepository -> insert -> Se ha producido un error al intentar insertar el nuevo departamento en base de datos.`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    /**
     * @name update
     * @description Actualiza el departamento proporcionado en base de datos.
     * @param id - Identificador del departamento a actualizar.
     * @param updaters - Listado de campos a actualizar.
     * @returns Retorna el departamento actualizado o un excepción.
     */
    public async update(id: number, updaters: SqlUpdater[]): Promise<Department> {
        try {
            let result: any = await MySql.executeQueryParameters(this.updateQuery(this.buildUpdaters(updaters)), this.getUpdaterValues(updaters, id));
            if (!result || !result.affectedRows)
                throw new ApiException(404)
                    .setError('ERR-404', `No se ha podido actualizar el departamento '${id}'.`)
                    .setLogMessage(`DepartmentRepository -> update -> No se ha podido actualizar el departamento '${id}'.`)
                    .setAsWarning();
            return await this.findById(id);
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar actualizar el departamento '${id}' en base de datos.`)
                    .setLogMessage(`DepartmentRepository -> update -> Se ha producido un error al intentar actualizar el departamento '${id}' en base de datos.`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    /**
     * @name delete
     * @description Borra el departamento proporcionado de base de datos.
     * @param id - Identificador del departamento a borrar.
     * @returns Retorna "true" en caso de borrar el departamento o una excepción.
     */
    public async delete(id: number): Promise<boolean> {
        try {
            let result: any = await MySql.executeQueryParameters(this.deleteQuery, [id]);
            if (!result || !result.affectedRows)
                throw new ApiException(404)
                    .setError('ERR-404', `No se ha podido borrar el departamento '${id}'.`)
                    .setLogMessage(`DepartmentRepository -> delete -> No se ha podido borrar el departamento '${id}'.`)
                    .setAsWarning();
            return true;
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar borrar el departamento '${id}' en base de datos.`)
                    .setLogMessage(`DepartmentRepository -> delete -> Se ha producido un error al intentar borrar el departamento '${id}' en base de datos.`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    //#region - Funciones para coger las queries de base de datos.

    /**
     * @name findByIdQuery
     * @description Coge la query sql "findById" de la carpeta db-queries, la carga en memoria y la retorna.
     */
    private get findByIdQuery(): string {
        return DepartmentsRepository._findByIdQuery || (
            DepartmentsRepository._findByIdQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/find-by-id.query.sql'), 'utf8')
        );
    }

    /**
     * @name insertQuery
     * @description Coge la query sql "insert" de la carpeta db-queries, la carga en memoria y la retorna.
     */
    private get insertQuery(): string {
        return DepartmentsRepository._insertQuery || (
            DepartmentsRepository._insertQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/insert.query.sql'), 'utf8')
        );
    }

    /**
     * @name findQuery
     * @description Coge la query sql "find" de la carpeta db-queries, la carga en memoria y la retorna.
     */
    private get findQuery(): string {
        return DepartmentsRepository._findQuery || (
            DepartmentsRepository._findQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/find.query.sql'), 'utf8')
        );
    }

    /**
     * @name updateQuery
     * @description Coge la query sql "update" de la carpeta db-queries, la carga en memoria y la retorna.
     * @param updaters - Listado de campos sql a actualizar.
     * @returns Retorna la query de actualizar departamentos con el listado de campos sql a actualizar.
     */
    private updateQuery(updaters: string): string {
        let query: string = DepartmentsRepository._updateQuery || (
            DepartmentsRepository._updateQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/update.query.sql'), 'utf8')
        );
        return query.replace(':updaters', updaters);
    }

    /**
     * @name deleteQuery
     * @description Coge la query sql "delete" de la carpeta db-queries, la carga en memoria y la retorna.
     */
    private get deleteQuery(): string {
        return DepartmentsRepository._deleteQuery || (
            DepartmentsRepository._deleteQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/delete.query.sql'), 'utf8')
        );
    }

    //#endregion
}
