// Librerías.
import * as dotenv from 'dotenv';
import path from 'path';

// Hacemos uso del módulo dotenv para leer el fichero '.env'.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * @name LoggerConfig
 * @description Almacena la configuración del Logger.
 */
export default class LoggerConfig {
    public static readonly LEVEL: string = process.env.LOGGER_LEVEL || 'error';
    public static readonly PATH: string = path.resolve(__dirname, process.env.LOGGER_PATH || '../logs/log_%DATE%.log');
    public static readonly DATE_PATTERN: string = process.env.LOGGER_DATE_PATTERN || 'YYYYMMDD';
    public static readonly MAX_SIZE: string = process.env.LOGGER_MAX_SIZE || '15m';

    public static readonly SHOW_ON_CONSOLE: boolean = (/true/i).test((process.env.LOGGER_SHOW_CONSOLE || 'true'));
}
