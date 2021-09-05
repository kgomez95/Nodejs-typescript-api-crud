/**
 * @name MySqlException
 * @description Modelo de las excepciones de MySql.
 */
export interface MySqlException {
    code: string;
    errno: string;
    sqlMessage: string;
    sqlState: string;
    index: number;
    sql: string;
}
