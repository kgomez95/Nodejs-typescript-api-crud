// Librerías.
import fs from 'fs';
import path from 'path';

// Importaciones de core.
import { ApiException } from '@core/exceptions/api.exception';
import MySql from '@core/database';
import { Department } from '@core/db-models/departments/department.db-model';

/**
 * @name DepartmentsRepository
 * @description Repositorio para el componente de departamentos, encargado de realizar consultas a base de datos.
 */
export default class DepartmentsRepository {
    private static _findByIdQuery: string = '';
    private static _insertQuery: string = '';

    constructor() { }

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
}
