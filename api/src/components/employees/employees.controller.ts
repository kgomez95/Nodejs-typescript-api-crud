// Librerías.
import { Request, Response } from 'express';

// Importaciones de core.
import BaseController from '@core/base-components/base.controller';
import { authorize } from '@core/middlewares/auth-middleware';
import { ApiResponse } from '@core/models/api/api-response.model';
import { ApiRequest } from '@core/models/api/api-request.model';
import { EmployeeDTO } from '@core/db-models/employees/employee.dto-model';

// Importaciones del componente.
import { GetEmployeesBody } from './models/get-employees-body.model';
import EmployeesService from './employees.service';
import { CreateBody } from './models/create-body.model';

/**
 * @name EmployeesController
 * @description Controlador que almacena las acciones para administrar los empleados.
 */
export default class EmployeesController extends BaseController {
    private employeesService: EmployeesService;

    constructor() {
        super('/employees');
        this.employeesService = new EmployeesService();
    }

    /**
     * @name initRoutes
     * @description Inicializa las rutas del controlador.
     */
    protected override initRoutes(): void {
        // NOTE: El 'authorize' es una importación del 'auth-middleware' y su comentido es comprobar que el peticionario
        //       esté identificado en la aplicación antes de proceder a resolver su solicitud.
        this._router.get(`${this.prefix}/getEmployees`, authorize, this.getEmployees.bind(this));
        this._router.post(`${this.prefix}/create`, authorize, this.create.bind(this));
    }

    /**
     * @name getEmployees
     * @description Gestiona la petición para coger varios empleados.
     * @param req - Petición del cliente.
     * @param res - Respuesta de la API.
     */
    public async getEmployees(req: Request, res: Response): Promise<any> {
        let request: ApiRequest<GetEmployeesBody> = new ApiRequest<GetEmployeesBody>();
        let response: ApiResponse<EmployeeDTO[]> = new ApiResponse<EmployeeDTO[]>();

        try {
            // Cogemos la petición comprobando a la vez que tenga los campos obligatorios informados.
            request = this.getRequest<GetEmployeesBody>(req.body);

            // Llama al servicio para buscar los empleados.
            response.data = await this.employeesService.getEmployees(request.data as GetEmployeesBody);
            response.status = 200;
        } catch (ex) {
            response = this.getResponseException(ex, 'EmployeesController -> getEmployees -> Se ha producido una excepción general no controlada.', request);
        }

        res.status(response.status).json(response);
    }

    /**
     * @name create
     * @description Gestiona la petición para crear un empleado.
     * @param req - Petición del cliente.
     * @param res - Respuesta de la API.
     */
    public async create(req: Request, res: Response): Promise<any> {
        let request: ApiRequest<CreateBody> = new ApiRequest<CreateBody>();
        let response: ApiResponse<EmployeeDTO> = new ApiResponse<EmployeeDTO>();

        try {
            // Cogemos la petición comprobando a la vez que tenga los campos obligatorios informados.
            request = this.getRequest<CreateBody>(req.body);

            // Comprobamos si los datos la petición tiene los campos obligatorios informados.
            this.checkRequiredData(request.data, 'name', 'last_name', 'nif', 'department_id');

            // Llama al servicio para crear el empleado.
            response.data = await this.employeesService.createEmployee(request.data as CreateBody);
            response.status = 200;
        } catch (ex) {
            response = this.getResponseException(ex, 'EmployeesController -> create -> Se ha producido una excepción general no controlada.', request);
        }

        res.status(response.status).json(response);
    }
}
