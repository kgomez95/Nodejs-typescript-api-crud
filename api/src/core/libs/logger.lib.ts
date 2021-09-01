// Librerías.
import winston, { Logger } from 'winston';
import { Format } from 'logform';
import 'winston-daily-rotate-file';

// Importaciones de core.
import LoggerConstants from '@core/constants/logger.constants';

// Configs.
import LoggerConfig from '@configs/logger.config';

/**
 * @name LoggerLib
 * @description Almacena la instancia del Logger para guardar mensajes en ficheros logs.
 */
export default class LoggerLib {

    /**
     * @name use
     * @description Crea una instancia de Logger y la retorna (se tiene que crear una instancia cada vez que se usa para comprobar la configuración del módulo 'winston-daily-rotate-file').
     */
    public get use(): Logger {
        return this.createLogger();
    }

    /**
     * @name write
     * @description Traza un mensaje en los logs con el nivel de log especificado por parámetros.
     * @param logLevel - Nivel de log a trazar (debug, info, warn, error).
     * @param message - Mensaje a trazar.
     * @param params - Parámetros a trazar (opcionales).
     */
    public write(logLevel: string, message: string, params?: object): void {
        switch (logLevel) {
            case LoggerConstants.LEVEL_DEBUG:
                this.debug(message, params);
                break;
            case LoggerConstants.LEVEL_INFO:
                this.info(message, params);
                break;
            case LoggerConstants.LEVEL_WARNING:
                this.warn(message, params);
                break;
            case LoggerConstants.LEVEL_ERROR:
            default:
                this.error(message, params);
                break;
        }
    }

    /**
     * @name debug
     * @description Muestra el mensaje proporcionado por consola y lo exporta en el fichero log como tipo "debug".
     * @param message - Mensaje a mostrar en la consola.
     * @param params - Parámetros a mostrar en consola.
     */
    public debug(message: string, params?: object): void {
        if (LoggerConfig.SHOW_ON_CONSOLE) this.consoleLog(message, params);

        if (params) this.use.debug(message, params);
        else this.use.debug(message);
    }

    /**
     * @name info
     * @description Muestra el mensaje proporcionado por consola y lo exporta en el fichero log como tipo "info".
     * @param message - Mensaje a mostrar en la consola.
     * @param params - Parámetros a mostrar en consola.
     */
    public info(message: string, params?: object): void {
        if (LoggerConfig.SHOW_ON_CONSOLE) this.consoleLog(message, params);

        if (params) this.use.info(message, params);
        else this.use.info(message);
    }

    /**
     * @name warn
     * @description Muestra el mensaje proporcionado por consola y lo exporta en el fichero log como tipo "warn".
     * @param message - Mensaje a mostrar en la consola.
     * @param params - Parámetros a mostrar en consola.
     */
    public warn(message: string, params?: object): void {
        if (LoggerConfig.SHOW_ON_CONSOLE) this.consoleLog(message, params);

        if (params) this.use.warn(message, params);
        else this.use.warn(message);
    }

    /**
     * @name error
     * @description Muestra el mensaje proporcionado por consola y lo exporta en el fichero log como tipo "error".
     * @param message - Mensaje a mostrar en la consola.
     * @param params - Parámetros a mostrar en consola.
     */
    public error(message: string, params?: object): void {
        if (LoggerConfig.SHOW_ON_CONSOLE) this.consoleLog(message, params);

        if (params) this.use.error(message, params);
        else this.use.error(message);
    }

    /**
     * @name createLogger
     * @returns Crea una instancia de Logger y la retorna.
     */
    private createLogger(): Logger {
        return winston.createLogger({
            level: LoggerConfig.LEVEL,
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.timestamp(),
                this.logFormat()
            ),
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: LoggerConfig.PATH,
                    datePattern: LoggerConfig.DATE_PATTERN,
                    maxSize: LoggerConfig.MAX_SIZE
                })
            ]
        });
    }

    /**
     * @name logFormat
     * @returns Retorna una función de winston para formatear el mensaje que se va a escribir en el fichero log.
     */
    private logFormat(): Format {
        return winston.format.printf(({ level, message, timestamp, ...metadata }) => {
            let msg = `[${level.toUpperCase().padEnd(5)}][${new Date().toLocaleString()}] ${message} `;

            if (metadata && Object.keys(metadata).length > 0) {
                msg += JSON.stringify(metadata);
            }

            return msg;
        });
    }

    /**
     * @name consoleLog
     * @description Muestra el mensaje proporcionado en consola.
     * @param message - Mensaje a mostrar en la consola.
     * @param params - Parámetros a mostrar en consola.
     */
    private consoleLog(message: string, params?: object): void {
        if (params) console.log(`${message} ${JSON.stringify(params)}`);
        else console.log(message);
    }
}
