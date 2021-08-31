// Importaciones de core.
import { ApiError } from '@core/models/api/api-error.model';
import LoggerConstants from '@core/constants/logger.constants';

/**
 * @name ApiException
 * @description Excepción general de la API.
 */
export class ApiException extends Error {
    public status: number;
    public errors?: ApiError[];
    public logMessage?: string;
    public exception?: Error;
    public showLog: boolean;
    public logLevel?: string;

    /**
     * @param status - Código de estado HTTP.
     * @param showLog - Indica si es necesario exportar el log ("true" por defecto).
     */
    constructor(status: number, showLog: boolean = true) {
        super();
        this.status = status;
        this.showLog = showLog;
        this.logLevel = LoggerConstants.LEVEL_ERROR;
        Object.setPrototypeOf(this, ApiException.prototype);
    }

    /**
     * @name setError
     * @description Añade un error a la excepción.
     * @param code - Código del error.
     * @param message - Mensaje del error.
     * @param details - Detalles del error.
     * @returns Retorna la propia instancia ApiException.
     */
    public setError(code: string, message: string, details?: string): ApiException {
        if (!this.errors) this.errors = [];
        this.errors.push({
            code,
            message,
            details
        });
        return this;
    }

    /**
     * @name setLogMessage
     * @description Añade el mensaje que se guardará en el log.
     * @param logMessage - Mensaje para guardar en el log.
     * @returns Retorna la propia instancia ApiException.
     */
    public setLogMessage(logMessage: string): ApiException {
        this.logMessage = logMessage;
        return this;
    }

    /**
     * @name setException
     * @description Añade la excepción proporcionada.
     * @param exception - Excepción a guardar.
     * @returns Retorna la propia instancia ApiException.
     */
    public setException(exception: Error): ApiException {
        this.exception = exception;
        return this;
    }

    /**
     * @name setAsError
     * @description Indica que el log que pintará esta excepción será de tipo error.
     * @returns Retorna la propia instancia ApiException.
     */
    public setAsError(): ApiException {
        this.logLevel = LoggerConstants.LEVEL_ERROR;
        return this;
    }

    /**
     * @name setAsWarning
     * @description Indica que el log que pintará esta excepción será de tipo warning.
     * @returns Retorna la propia instancia ApiException.
     */
    public setAsWarning(): ApiException {
        this.logLevel = LoggerConstants.LEVEL_WARNING;
        return this;
    }

    /**
     * @name setAsInfo
     * @description Indica que el log que pintará esta excepción será de tipo info.
     * @returns Retorna la propia instancia ApiException.
     */
    public setAsInfo(): ApiException {
        this.logLevel = LoggerConstants.LEVEL_INFO;
        return this;
    }


    /**
     * @name setAsDebug
     * @description Indica que el log que pintará esta excepción será de tipo debug.
     * @returns Retorna la propia instancia ApiException.
     */
    public setAsDebug(): ApiException {
        this.logLevel = LoggerConstants.LEVEL_DEBUG;
        return this;
    }
}
