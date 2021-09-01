/**
 * @name JwtSession
 * @description Modelo de la sessión almacenada en el token jwt bearer.
 */
export interface JwtSession {
    user_id: number;
    username: string;

    /**
     * Timestamp (Unix milliseconds) que indica cuándo se ha creado la sesión.
     */
    iat?: number;
    /**
     * Timestamp (Unix milliseconds) que indica cuándo debe expirar la sesión.
     */
    exp?: number;
}
