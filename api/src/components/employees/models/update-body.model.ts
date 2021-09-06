/**
 * @name UpdateBody
 * @description Modelo para el cuerpo de la petición de la acción "update" del EmployeesController.
 */
export interface UpdateBody {
    name?: string;
    last_name?: string;
    nif?: string;
    department_id?: number;
}
