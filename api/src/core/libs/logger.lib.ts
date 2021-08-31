// Librerías.
import winston, { Logger } from 'winston';
import { Format } from 'logform';
import 'winston-daily-rotate-file';

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
}
