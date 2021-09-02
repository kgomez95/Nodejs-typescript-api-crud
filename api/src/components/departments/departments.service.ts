// Importaciones de core.
import { Department } from '@core/db-models/departments/department.db-model';
import { DepartmentDTO } from '@core/db-models/departments/department.dto-model';

// Importaciones del componente.
import DepartmentsRepository from './departments.repository';
import { CreateBody } from './models/create-body.model';

/**
 * @name DepartmentsService
 * @description Servicio encargado de gestionar las peticiones que recibe el DepartmentsController.
 */
export default class DepartmentsService {
    private departmentsRepository: DepartmentsRepository;

    constructor() {
        this.departmentsRepository = new DepartmentsRepository();
    }

    /**
     * @name createDepartment
     * @description Crea el departamento proporcionado por parámetros.
     * @param body - Nuevo departamento a crear.
     * @returns Retorna el nuevo departamento creado o una excepción.
     */
    public async createDepartment(body: CreateBody): Promise<DepartmentDTO> {
        let department: Department = await this.departmentsRepository.insert(body.code, body.name, body.description);
        return Department.toDTO(department);
    }
}
