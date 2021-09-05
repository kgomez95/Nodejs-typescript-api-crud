/**
 * @name GetEmployeesBody
 * @description Modelo para el cuerpo de la petición de la acción "getEmployees" del EmployeesController.
 */
export interface GetEmployeesBody {
    id?: number;
    name?: string;
    last_name?: string;
    nif?: string;
    department_id?: number;
    created_at_from?: Date;
    created_at_to?: Date;
    updated_at_from?: Date;
    updated_at_to?: Date;
}
