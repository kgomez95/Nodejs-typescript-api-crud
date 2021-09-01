// Librerías.
import * as dotenv from 'dotenv';
import path from 'path';

// Hacemos uso del módulo dotenv para leer el fichero '.env'.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * @name DatabaseConfig
 * @description Almacena la configuración de la base de datos.
 */
export default class DatabaseConfig {
    public static readonly HOST: string = process.env.DATABASE_HOST || '127.0.0.1';
    public static readonly PORT: number = parseInt(process.env.DATABASE_PORT || '3306');
    public static readonly USER: string = process.env.DATABASE_USER || 'root';
    public static readonly PASSWORD: string = process.env.DATABASE_PASSWORD || '';
    public static readonly DATABASE: string = process.env.DATABASE_DATABASE || 'CRUD_001';
}
