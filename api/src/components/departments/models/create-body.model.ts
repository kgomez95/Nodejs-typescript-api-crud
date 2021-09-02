/**
 * @name CreateBody
 * @description Modelo para el cuerpo de la petición de la acción "create" del DepartmentController.
 */
export interface CreateBody {
    code: string;
    name: string;
    description: string;
}
