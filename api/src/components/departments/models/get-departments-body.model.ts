/**
 * @name GetDepartmentsBody
 * @description Modelo para el cuerpo de la petición de la acción "getDepartments" del DepartmentController.
 */
export interface GetDepartmentsBody {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    created_at_from?: Date;
    created_at_to?: Date;
    updated_at_from?: Date;
    updated_at_to?: Date;
}
