// Importaciones de core.
import { ApiResponse } from '@core/models/api/api-response.model';
import { Logger } from '@core/libs';
import { ApiException } from '@core/exceptions/api.exception';
import LoggerConstants from '@core/constants/logger.constants';

/**
 * @name BaseMiddleware
 * @description Middleware base de la aplicación.
 */
export default abstract class BaseMiddleware {
    constructor() { }

    /**
     * @name getResponseException
     * @description Construye la respuesta de la API partiendo de la excepción proporcionada.
     * @param ex - Excepción a devolver.
     * @param logMessage - Mensaje a escribir por defecto en el log.
     * @returns Retorna una respuesta API con los datos de la excepción.
     */
    protected getResponseException<T>(ex: any, logMessage: string): ApiResponse<T> {
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
        if (showLog) Logger.write(logLevel, logMessage, { ex });

        return response;
    }
}
