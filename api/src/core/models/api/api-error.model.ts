/**
 * @name ApiError
 * @description Modelo genérico para los errores de la API.
 */
export interface ApiError {
    code: string,
    message: string,
    details?: string
}
