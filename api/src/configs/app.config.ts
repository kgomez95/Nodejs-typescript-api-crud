// Librerías.
import * as dotenv from 'dotenv';
import path from 'path';

// Hacemos uso del módulo dotenv para leer el fichero '.env'.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * @name AppConfig
 * @description Almacena la configuración de la aplicación.
 */
export default class AppConfig {
    public static readonly ROUTER_PREFIX: string = process.env.APP_ROUTER_PREFIX || '/api';
    public static readonly PORT: number = parseInt(process.env.APP_PORT || '5000');
}
