/**
 * @name DepartmentDTO
 * @description Modelo DTO de departamento de base de datos.
 */
export class DepartmentDTO {
    public id: number = 0;
    public code: string = '';
    public name: string = '';
    public description: string = '';
    public created_at: Date = new Date();
    public updated_at: Date = new Date();
}
