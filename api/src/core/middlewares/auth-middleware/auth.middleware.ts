// Librerías.
import { Request, Response, NextFunction } from 'express';

// Importaciones de core.
import { ApiResponse } from '@core/models/api/api-response.model';
import { JwtSession } from '@core/models/jwt/jwt-session.model';
import { Jwt } from '@core/libs';
import { ApiException } from '@core/exceptions/api.exception';
import BaseMiddleware from '@core/base-components/base.middleware';

/**
 * @name AuthMiddleware
 * @description Encargado de comprobar si los usuarios tienen los permisos para realizar peticiones.
 */
export default class AuthMiddleware extends BaseMiddleware {
    constructor() {
        super();
    }

    /**
     * @name authorize
     * @description Comprueba si el usuario que ha realizado la petición está identificado.
     * @param req - Petición del cliente.
     * @param res - Respuesta de la Api.
     * @param next - Próxima función a ejecutar.
     */
    public authorize(req: Request, res: Response, next: NextFunction): void {
        try {
            this.getSession(req);
            next();
        } catch (ex) {
            let response: ApiResponse<undefined> = this.getResponseException(ex, 'AuthorizeMiddleware -> authorize -> Se ha producido una excepción general.');
            res.status(response.status).json(response);
        }
    }

    /**
     * @name getSession
     * @description Comprueba si el token es válido o no.
     * @param req - Petición del cliente.
     * @returns Retorna los datos de sesión del usuario o una excepción.
     */
    private getSession(req: Request): JwtSession {
        // Cogemos la cabecera donde está el token.
        let tokenHeader: string | undefined = req.headers['authorization'];

        if (typeof tokenHeader !== 'undefined') {
            // Cogemos el token de la cabecera.
            let token: string = tokenHeader.split(' ')[1];

            // Verificamos si el token es válido o no.
            let jwtSession: JwtSession | undefined = Jwt.verify(token);

            // Si obtenemos los datos de sesión el token es válido.
            if (jwtSession) return jwtSession;
        }

        // Si no obtenemos los datos de sesión el token no es válido.
        throw new ApiException(403, false)
            .setError('ERR-403', 'Acceso no autorizado.', 'No tienes permisos para ver este contenido.');
    }
}
