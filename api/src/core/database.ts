// Librerías.
import mysql, { Connection, MysqlError } from 'mysql';

// Importaciones de core.
import { Logger } from '@core/libs';

// Configs.
import DatabaseConfig from '@configs/database.config';

/**
 * @name MySql
 * @description Conexión contra la base de datos MySql.
 */
export default class MySql {
    private static _instance: MySql;
    private connection: Connection;

    constructor() {
        this.connection = this.createConnection();
        this.openConnection();
    }

    /**
     * @name instance
     * @description Crea la instancia MySql si no existe y la retorna.
     */
    public static get instance(): MySql {
        return this._instance || (this._instance = new MySql());
    }

    /**
     * @name executeQuery
     * @description Ejecuta la sentencia sql proporcionada.
     * @param query - Sentencia sql a ejecutar.
     * @returns Retorna el resultado de la sentencia sql o un error.
     */
    public static async executeQuery(query: string): Promise<any> {
        this.instance.reconnect();
        Logger.debug(`Sql: ${query}`);
        return new Promise<any>((resolve, rejec) => {
            this.instance.connection.query(query, (error: MysqlError | null, data: any): void => {
                if (error) {
                    rejec(error);
                }
                resolve(data);
            });
        });
    }

    /**
     * @name executeQueryParameters
     * @description Ejecuta la sentencia sql proporcionada con sus parámetros.
     * @param query - Sentencia sql a ejecutar.
     * @param parameters - Parámetros de la sentencia sql.
     * @returns Retorna el resultado de la sentencia sql o un error.
     */
    public static async executeQueryParameters(query: string, parameters: Array<any>): Promise<any> {
        this.instance.reconnect();
        Logger.debug(`Sql: ${query}`, { parameters });
        return new Promise<any>((resolve, rejec) => {
            this.instance.connection.query(query, parameters, (error: MysqlError | null, data: any): void => {
                if (error) {
                    rejec(error);
                }
                resolve(data);
            });
        });
    }

    /**
     * @name createConnection
     * @returns Crea y devuelve la conexión contra la base de datos.
     */
    private createConnection(): Connection {
        return mysql.createConnection({
            host: DatabaseConfig.HOST,
            port: DatabaseConfig.PORT,
            user: DatabaseConfig.USER,
            password: DatabaseConfig.PASSWORD,
            database: DatabaseConfig.DATABASE
        });
    }

    /**
     * @name openConnection
     * @description Abre la conexión contra la base de datos.
     */
    private openConnection(): void {
        this.connection.connect((error: MysqlError) => {
            if (error) {
                Logger.error('MySql -> openConnection -> Se ha producido un error al intentar conectar a la base de datos.', { error });
            }
            else {
                Logger.info('Conexión con la base de datos establecida.');
            }
        });
    }

    /**
     * @name reconnect
     * @description Si el estado de la conexión es "disconnected" (desconectado) vuelve a abrir la conexión.
     */
    private reconnect(): void {
        if (this.connection.state === 'disconnected') {
            this.connection = this.createConnection();
            this.openConnection();
        }
    }
}
