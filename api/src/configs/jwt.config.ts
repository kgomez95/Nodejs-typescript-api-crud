// Librerías.
import * as dotenv from 'dotenv';
import path from 'path';

// Hacemos uso del módulo dotenv para leer el fichero '.env'.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * @name JwtConfig
 * @description Almacena la configuración del JwtLib.
 */
export default class JwtConfig {
    public static readonly SECRET_KEY: string = process.env.JWT_SECRETKEY || '';
    public static readonly EXPIRE_TIME: string = process.env.JWT_EXPIRETIME || '1h';
}
