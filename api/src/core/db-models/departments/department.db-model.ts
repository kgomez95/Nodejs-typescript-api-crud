// Importaciones de core.
import { DepartmentDTO } from '@core/db-models/departments/department.dto-model';

/**
 * @name Department
 * @description Modelo de departamento de base de datos.
 */
export class Department {
    public id: number = 0;
    public code: string = '';
    public name: string = '';
    public description: string = '';
    public created_at: Date = new Date();
    public updated_at: Date = new Date();

    /**
     * @name toDTO
     * @description Mapea el objeto Department a DepartmentDTO.
     * @param department - Departamento a mapear.
     * @returns Retorna el departamento mapeado.
     */
    public static toDTO(department: Department): DepartmentDTO {
        if (!department) return new DepartmentDTO();

        return {
            id: department.id,
            code: department.code,
            name: department.name,
            description: department.description,
            created_at: department.created_at,
            updated_at: department.updated_at
        };
    }

    /**
     * @name toDTOArray
     * @description Mapea el listado de departamentos a departamentos DTO.
     * @param departments - Listado de departamentos.
     * @returns Retorna el listado de departamentos mapeados.
     */
    public static toDTOArray(departments: Department[]): DepartmentDTO[] {
        let dtoDepartments: DepartmentDTO[] = [];

        if (!departments) return dtoDepartments;

        departments.forEach((department: Department) => {
            dtoDepartments.push(this.toDTO(department));
        });

        return dtoDepartments;
    }
}
