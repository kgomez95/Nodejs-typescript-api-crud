/**
 * @name CreateBody
 * @description Modelo para el cuerpo de la petición de la acción "create" del EmployeesController.
 */
export interface CreateBody {
    name: string;
    last_name: string;
    nif: string;
    department_id: number;
}
