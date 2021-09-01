// Librerías.
import fs from 'fs';
import path from 'path';

// Importaciones de core.
import { ApiException } from '@core/exceptions/api.exception';
import MySql from '@core/database';
import { Login } from "@core/db-models/logins/login.db-model";

/**
 * @name AuthRepository
 * @description Repositorio para el componente de autenticación, encargado de realizar consultas a base de datos.
 */
export default class AuthRepository {
    private static _getLoginQuery: string = '';

    constructor() { }

    /**
     * @name getLogin
     * @description Busca el login proporcionado en base de datos.
     * @param username - Nombre de usuario a buscar.
     * @returns Retorna el login o una excepción.
     */
    public async getLogin(username: string): Promise<Login> {
        try {
            let result: Login[] = await MySql.executeQueryParameters(this.getLoginQuery, [username]);
            if (!result[0])
                throw new ApiException(401)
                    .setError('ERR-401', `El usuario '${username}' no existe.`)
                    .setLogMessage(`AuthRepository -> getUser -> El usuario '${username}' no existe en base de datos.`)
                    .setAsError();
            return result[0] as Login;
        } catch (ex) {
            if (ex instanceof ApiException) {
                throw ex;
            }
            else {
                throw new ApiException(500)
                    .setError('ERR-500', `Se ha producido un problema al intentar recuperar el usuario de base de datos.`)
                    .setLogMessage(`AuthRepository -> getUser -> Se ha producido un error al intentar recuperar el usuario '${username}' de base de datos.`)
                    .setException(ex)
                    .setAsError();
            }
        }
    }

    /**
     * @name getLoginQuery
     * @description Coge la query sql "getLogin" de la carpeta db-queries, la carga en memoria y la retorna.
     */
    private get getLoginQuery(): string {
        return AuthRepository._getLoginQuery || (
            AuthRepository._getLoginQuery = fs.readFileSync(path.resolve(__dirname, './db-queries/get-login.query.sql'), 'utf8')
        );
    }
}
