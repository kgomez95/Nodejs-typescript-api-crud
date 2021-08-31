// Importaciones de core.
import { ApiError } from '@core/models/api/api-error.model';

/**
 * @name ApiResponse
 * @description Modelo genérico para las respuestas de la API.
 */
export class ApiResponse<T> {
    public status: number = 200;
    public data?: T;
    public errors?: ApiError[];

    /**
     * @name setStatus
     * @description Asigna el valor proporcionado al estado de la respuesta.
     * @param status - Código de estado HTTP.
     * @returns Retorna la propia respuesta Api.
     */
    public setStatus(status: number): ApiResponse<T> {
        this.status = status;
        return this;
    }

    /**
     * @name setErrors
     * @description Asigna los errores proporcionados a la respuesta Api.
     * @param errors - Errores a asignar.
     * @returns Retorna la propia respuesta Api.
     */
    public setErrors(errors?: ApiError[]): ApiResponse<T> {
        this.errors = errors;
        return this;
    }
}
