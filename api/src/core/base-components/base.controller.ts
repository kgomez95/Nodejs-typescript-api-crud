// Librerías.
import { Router } from 'express';

// Importaciones de core.
import { ApiRequest } from '@core/models/api/api-request.model';
import { ApiException } from '@core/exceptions/api.exception';
import { ApiResponse } from '@core/models/api/api-response.model';
import { Logger } from '@core/libs';
import LoggerConstants from '@core/constants/logger.constants';

/**
 * @name BaseController
 * @description Controlador base de la aplicación.
 */
export default abstract class BaseController {
    protected _router: Router;
    protected prefix: string;

    /**
     * @param prefix - Prefijo de las rutas ("/" por defecto).
     */
    constructor(prefix: string = '/') {
        this._router = Router();
        this.prefix = prefix;
        this.initRoutes();
    }

    /**
     * @name initRoutes
     * @description Inicializa las rutas del controlador.
     */
    protected abstract initRoutes(): void;

    /**
     * @name router
     * @description Coge el objeto router del controlador.
     */
    public get router(): Router {
        return this._router;
    }

    /**
     * @name getRequest
     * @description Comprueba si la petición tiene el formato correcto.
     * @param request - Petición a comprobar.
     * @returns Retorna la petición parseada o una excepción en caso de que falte algún campo.
     */
    protected getRequest<T>(request: any): ApiRequest<T> {
        // NOTE: Recorremos un array de strings, que son los nombres de los campos que tiene que tener la petición.
        ['data'].forEach((field: string) => {
            if (!(field in request)) {
                throw new ApiException(400)
                    .setError('ERR-400', `Falta el campo '${field}' en la petición.`)
                    .setLogMessage('BaseController -> getRequest -> Faltan campos obligatorios en la petición.')
                    .setAsWarning();
            }
        });
        return request as ApiRequest<T>;
    }

    /**
     * @name checkRequiredData
     * @description Comprueba si los datos de la petición tiene informados los campos obligatorios, si no los tiene se genera una excepción.
     * @param data - Datos de la petición a comprobar.
     * @param fields - Nombre de los campos a comprobar.
     */
    protected checkRequiredData(data: any, ...fields: string[]): void {
        fields.forEach((field: string) => {
            if (!(field in data) || data[field] === '') {
                throw new ApiException(400)
                    .setError('ERR-400', `Falta el campo '${field}' en los datos de la petición.`)
                    .setLogMessage('BaseController -> checkRequiredData -> Faltan campos obligatorios en los datos la petición.')
                    .setAsWarning();
            }
        });
    }

    /**
     * @name getResponseException
     * @description Construye la respuesta de la API partiendo de la excepción proporcionada.
     * @param ex - Excepción a devolver.
     * @param logMessage - Mensaje a escribir por defecto en el log.
     * @param request - Datos de la petición a guardar en el log.
     * @returns Retorna una respuesta API con los datos de la excepción.
     */
    protected getResponseException<T>(ex: any, logMessage: string, request: any): ApiResponse<T> {
        let response: ApiResponse<T> = new ApiResponse<T>();
        let showLog: boolean = true;
        let logLevel: string = LoggerConstants.LEVEL_ERROR;

        if (ex instanceof ApiException) {
            if (ex.logMessage) {
                // NOTE: Si viene un mensaje de log en la excepción lo cogemos y seguidamente lo eliminamos para no pintarlo dos veces en el log.
                logMessage = ex.logMessage;
                ex.logMessage = undefined;
            }

            if (ex.logLevel) {
                // NOTE: Si viene el nivel del log en la excepción lo cogemos y seguidamente lo eliminamos para no pintarlo dos veces en el log.
                logLevel = ex.logLevel;
                ex.logLevel = undefined;
            }

            response.status = ex.status;
            response.errors = ex.errors;
            showLog = ex.showLog;
        }
        else {
            response.status = 500;
            response.errors = [
                { code: 'ERR-500', message: 'Se ha producido un error general. Por favor, contacte con un administrador.' }
            ];
        }

        // Trazamos el log en caso de tener que hacerlo.
        if (showLog) Logger.write(logLevel, logMessage, { request, ex });

        return response;
    }
}
