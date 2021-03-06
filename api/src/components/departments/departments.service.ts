// Importaciones de core.
import { SqlFilter } from '@core/models/sql/sql-filter.model';
import { Department } from '@core/db-models/departments/department.db-model';
import { DepartmentDTO } from '@core/db-models/departments/department.dto-model';
import OperatorTypesConstants from '@core/constants/sql/operator-types.constants';
import BaseService from '@core/base-components/base.service';
import { SqlUpdater } from '@core/models/sql/sql-updater.model';
import { ApiException } from '@core/exceptions/api.exception';

// Configs.
import SqlConfig from '@configs/sql.config';

// Importaciones del componente.
import DepartmentsRepository from './departments.repository';
import { CreateBody } from './models/create-body.model';
import { GetDepartmentsBody } from './models/get-departments-body.model';
import { UpdateBody } from './models/update-body.model';

/**
 * @name DepartmentsService
 * @description Servicio encargado de gestionar las peticiones que recibe el DepartmentsController.
 */
export default class DepartmentsService extends BaseService {
    private departmentsRepository: DepartmentsRepository;

    constructor() {
        super();
        this.departmentsRepository = new DepartmentsRepository();
    }

    /**
     * @name getDepartment
     * @description Busca el departamento proporcionado por parámetros.
     * @param id - Identificador del departamento a buscar.
     * @returns Retorna el departamento o una excepción.
     */
    public async getDepartment(id: number): Promise<DepartmentDTO> {
        let department: Department = await this.departmentsRepository.findById(id);
        return Department.toDTO(department);
    }

    /**
     * @name getDepartments
     * @description Busca los departamentos proporcionado por parámetros.
     * @param body - Datos para filtrar departamentos.
     * @returns Retorna un listado de departamentos o una excepción.
     */
    public async getDepartments(body: GetDepartmentsBody): Promise<DepartmentDTO[]> {
        let filters: SqlFilter[] = [];

        // Creamos los filtros sql.
        this.getSqlFilter('id', body.id, OperatorTypesConstants.EQUAL, '{0}', SqlConfig.DEPARTMENTS_PREFIX, filters);
        this.getSqlFilter('code', body.code, OperatorTypesConstants.EQUAL, '{0}', SqlConfig.DEPARTMENTS_PREFIX, filters);
        this.getSqlFilter('name', body.name, OperatorTypesConstants.LIKE, '%{0}%', SqlConfig.DEPARTMENTS_PREFIX, filters);
        this.getSqlFilter('description', body.description, OperatorTypesConstants.LIKE, '%{0}%', SqlConfig.DEPARTMENTS_PREFIX, filters);
        this.getSqlFilter('created_at', body.created_at_from, OperatorTypesConstants.GREATER_EQUAL, '{0}', SqlConfig.DEPARTMENTS_PREFIX, filters);
        this.getSqlFilter('created_at', body.created_at_to, OperatorTypesConstants.SMALLER_EQUAL, '{0}', SqlConfig.DEPARTMENTS_PREFIX, filters);
        this.getSqlFilter('updated_at', body.updated_at_from, OperatorTypesConstants.GREATER_EQUAL, '{0}', SqlConfig.DEPARTMENTS_PREFIX, filters);
        this.getSqlFilter('updated_at', body.updated_at_to, OperatorTypesConstants.SMALLER_EQUAL, '{0}', SqlConfig.DEPARTMENTS_PREFIX, filters);

        // Buscamos los departamentos en base de datos y los retornamos mapeados.
        let departments: Department[] = await this.departmentsRepository.find(filters);
        return Department.toDTOArray(departments);
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

    /**
     * @name updateDepartment
     * @description Actualiza el departamento proporcionado por parámetros.
     * @param id - Identificador del departamento a actualizar.
     * @param body - Datos del departamento a actualizar.
     * @returns Retorna el departamento actualizado o una excepción.
     */
    public async updateDepartment(id: number, body: UpdateBody): Promise<DepartmentDTO> {
        let updaters: SqlUpdater[] = [];

        // Creamos el listado de campos a actualizar.
        this.getSqlUpdater('name', body.name, updaters);
        this.getSqlUpdater('description', body.description, updaters);

        if (updaters.length === 0)
            throw new ApiException(400)
                .setError('ERR-400', `No se ha especificado ningún campo para actualizar.`)
                .setLogMessage(`DepartmentsService -> updateDepartment -> No se ha especificado ningún campo para actualizar.`)
                .setAsError();

        let department: Department = await this.departmentsRepository.update(id, updaters);
        return Department.toDTO(department);
    }

    /**
     * @name deleteDepartment
     * @description Borra el departamento proporcionado por parámetros.
     * @param id - Identificador del departamento a borrar.
     * @returns Retorna "true" en caso de borrar el departamento o una excepción.
     */
    public async deleteDepartment(id: number): Promise<boolean> {
        return await this.departmentsRepository.delete(id);
    }
}
