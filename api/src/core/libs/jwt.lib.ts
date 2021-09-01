// Librerías.
import jtoken from 'jsonwebtoken';

// Importaciones de core.
import { LoginDTO } from '@core/db-models/logins/login.dto-model';
import { JwtSession } from '@core/models/jwt/jwt-session.model';

// Configs.
import JwtConfig from '@configs/jwt.config';

/**
 * @name JwtLib
 * @description Interactua con la librería jsonwebtoken para generar y verificars tokens.
 */
export default class JwtLib {
    constructor() { }

    /**
     * @name sign
     * @description Genera un json web token con la información del usuario proporcionado.
     * @param loginDTO - Datos del usuario a almacenar en el token.
     * @returns Retorna el token con los datos del usuario.
     */
    public sign(loginDTO: LoginDTO): string {
        let jwtSession: JwtSession = {
            user_id: loginDTO.id,
            username: loginDTO.username
        };
        return jtoken.sign(jwtSession, JwtConfig.SECRET_KEY, { expiresIn: JwtConfig.EXPIRE_TIME });
    }

    /**
     * @name verify
     * @description Verifica si el token proporcionado es válido o no.
     * @param token - Token a comprobar.
     * @returns Retorna los datos de sesión del usuario o undefined.
     */
    public verify(token: string): JwtSession | undefined {
        try {
            let jwtPayload: JwtSession = <JwtSession>jtoken.verify(token, JwtConfig.SECRET_KEY);

            if (jwtPayload) return jwtPayload;
            else return undefined;
        } catch (err) {
            return undefined;
        }
    }
}
