// Librerías.
import * as dotenv from 'dotenv';
import path from 'path';

// Hacemos uso del módulo dotenv para leer el fichero '.env'.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * @name SqlConfig
 * @description Almacena la configuración de la aplicación.
 */
export default class SqlConfig {
    /**
     * Prefijo utilizado en las consultas sql con la tabla DEPARTMENTS.
     */
    public static readonly DEPARTMENTS_PREFIX: string = process.env.DATABASE_DEPARTMENTS_PREFIX || 'dep';
    /**
     * Prefijo utilizado en las consultas sql con la tabla EMPLOYEES.
     */
    public static readonly EMPLOYEES_PREFIX: string = process.env.DATABASE_EMPLOYEES_PREFIX || 'emp';
}
