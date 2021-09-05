import { Department } from '@core/db-models/departments/department.db-model';
import { EmployeeDTO } from '@core/db-models/employees/employee.dto-model';

/**
 * @name Employee
 * @description Modelo de empleado de base de datos.
 */
export class Employee {
    public id: number = 0;
    public name: string = '';
    public last_name: string = '';
    public nif: string = '';
    public department_id: number = 0;
    public created_at: Date = new Date();
    public updated_at: Date = new Date();

    public department?: Department;

    /**
     * @name toDTO
     * @description Mapea el objeto Employee a EmployeeDTO.
     * @param department - Empleado a mapear.
     * @returns Retorna el empleado mapeado.
     */
    public static toDTO(employee: Employee): EmployeeDTO {
        if (!employee) return new EmployeeDTO();

        return {
            id: employee.id,
            name: employee.name,
            last_name: employee.last_name,
            nif: employee.nif,
            department_id: employee.department_id,
            created_at: employee.created_at,
            updated_at: employee.updated_at,
            department: (employee.department) ? Department.toDTO(employee.department as Department) : undefined
        };
    }

    /**
     * @name toDTOArray
     * @description Mapea el listado de empleados a empleados DTO.
     * @param departments - Listado de empleados.
     * @returns Retorna el listado de empleados mapeados.
     */
    public static toDTOArray(employees: Employee[]): EmployeeDTO[] {
        let dtoEmployees: EmployeeDTO[] = [];

        if (!employees) return dtoEmployees;

        employees.forEach((employee: EmployeeDTO) => {
            dtoEmployees.push(this.toDTO(employee));
        });

        return dtoEmployees;
    }
}
