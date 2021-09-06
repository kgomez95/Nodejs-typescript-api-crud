// Importaciones de core.
import { EmployeeDTO } from '@core/db-models/employees/employee.dto-model';
import { Employee } from '@core/db-models/employees/employee.db-model';
import BaseService from '@core/base-components/base.service';
import { SqlFilter } from '@core/models/sql/sql-filter.model';
import OperatorTypesConstants from '@core/constants/sql/operator-types.constants';
import { SqlUpdater } from '@core/models/sql/sql-updater.model';
import { ApiException } from '@core/exceptions/api.exception';

// Configs.
import SqlConfig from '@configs/sql.config';

// Importaciones del componente.
import { GetEmployeesBody } from './models/get-employees-body.model';
import EmployeesRepository from './employees.repository';
import { CreateBody } from './models/create-body.model';
import { UpdateBody } from './models/update-body.model';

/**
 * @name EmployeesService
 * @description Servicio encargado de gestionar las peticiones que recibe el EmployeesController.
 */
export default class EmployeesService extends BaseService {
    private employeesRepository: EmployeesRepository;

    constructor() {
        super();
        this.employeesRepository = new EmployeesRepository();
    }

    /**
     * @name getEmployees
     * @description Busca los empleados proporcionados por parámetros.
     * @param body - Datos para filtrar empleados.
     * @returns Retorna un listado de empleados o una excepción.
     */
    public async getEmployees(body: GetEmployeesBody): Promise<EmployeeDTO[]> {
        let filters: SqlFilter[] = [];

        // Creamos los filtros sql.
        this.getSqlFilter('id', body.id, OperatorTypesConstants.EQUAL, '{0}', SqlConfig.EMPLOYEES_PREFIX, filters);
        this.getSqlFilter('name', body.name, OperatorTypesConstants.LIKE, '%{0}%', SqlConfig.EMPLOYEES_PREFIX, filters);
        this.getSqlFilter('last_name', body.last_name, OperatorTypesConstants.LIKE, '%{0}%', SqlConfig.EMPLOYEES_PREFIX, filters);
        this.getSqlFilter('nif', body.nif, OperatorTypesConstants.LIKE, '%{0}%', SqlConfig.EMPLOYEES_PREFIX, filters);
        this.getSqlFilter('created_at', body.created_at_from, OperatorTypesConstants.GREATER_EQUAL, '{0}', SqlConfig.EMPLOYEES_PREFIX, filters);
        this.getSqlFilter('created_at', body.created_at_to, OperatorTypesConstants.SMALLER_EQUAL, '{0}', SqlConfig.EMPLOYEES_PREFIX, filters);
        this.getSqlFilter('updated_at', body.updated_at_from, OperatorTypesConstants.GREATER_EQUAL, '{0}', SqlConfig.EMPLOYEES_PREFIX, filters);
        this.getSqlFilter('updated_at', body.updated_at_to, OperatorTypesConstants.SMALLER_EQUAL, '{0}', SqlConfig.EMPLOYEES_PREFIX, filters);

        // Buscamos los empleados en base de datos y los retornamos mapeados.
        let employees: Employee[] = await this.employeesRepository.find(filters);
        return Employee.toDTOArray(employees);
    }

    /**
     * @name createEmployee
     * @description Crea el empleado proporcionado por parámetros.
     * @param body - Nuevo empleado a crear.
     * @returns Retorna el nuevo empleado creado o una excepción.
     */
    public async createEmployee(body: CreateBody): Promise<EmployeeDTO> {
        let employee: Employee = await this.employeesRepository.insert(body.name, body.last_name, body.nif, body.department_id);
        return Employee.toDTO(employee);
    }

    /**
     * @name updateEmployee
     * @description Actualiza el empleado proporcionado por parámetros.
     * @param id - Identificador del empleado a actualizar.
     * @param body - Datos del empleado a actualizar.
     * @returns Retorna el empleado actualizado o una excepción.
     */
    public async updateEmployee(id: number, body: UpdateBody): Promise<EmployeeDTO> {
        let updaters: SqlUpdater[] = [];

        // Creamos el listado de campos a actualizar.
        this.getSqlUpdater('name', body.name, updaters);
        this.getSqlUpdater('last_name', body.last_name, updaters);
        this.getSqlUpdater('nif', body.nif, updaters);
        this.getSqlUpdater('department_id', body.department_id, updaters);

        if (updaters.length === 0)
            throw new ApiException(400)
                .setError('ERR-400', `No se ha especificado ningún campo para actualizar.`)
                .setLogMessage(`EmployeesService -> updateEmployee -> No se ha especificado ningún campo para actualizar.`)
                .setAsError();

        let employee: Employee = await this.employeesRepository.update(id, updaters);
        return Employee.toDTO(employee);
    }

    /**
     * @name deleteEmployee
     * @description Borra el empleado proporcionado por parámetros.
     * @param id - Identificador del empleado a borrar.
     * @returns Retorna "true" en caso de borrar el empleado o una excepción.
     */
    public async deleteEmployee(id: number): Promise<boolean> {
        return await this.employeesRepository.delete(id);
    }
}
