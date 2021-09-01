// Importaciones de core.
import BcryptLib from '@core/libs/bcrypt.lib';
import JwtLib from '@core/libs/jwt.lib';
import LoggerLib from '@core/libs/logger.lib';

// Instanciamos las librerías.
const Bcrypt: BcryptLib = new BcryptLib();
const Jwt: JwtLib = new JwtLib();
const Logger: LoggerLib = new LoggerLib();

// Exportamos las librerías instanciadas.
export { Bcrypt, Jwt, Logger };
