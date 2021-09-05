import { DepartmentDTO } from '@core/db-models/departments/department.dto-model';

/**
 * @name EmployeeDTO
 * @description Modelo DTO de empleado de base de datos.
 */
export class EmployeeDTO {
    public id: number = 0;
    public name: string = '';
    public last_name: string = '';
    public nif: string = '';
    public department_id: number = 0;
    public created_at: Date = new Date();
    public updated_at: Date = new Date();

    public department?: DepartmentDTO;
}
