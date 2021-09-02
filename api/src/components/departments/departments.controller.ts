// Librerías.
import { Request, Response } from 'express';

// Importaciones de core.
import BaseController from '@core/base-components/base.controller';
import { authorize } from '@core/middlewares/auth-middleware';
import { ApiResponse } from '@core/models/api/api-response.model';
import { ApiRequest } from '@core/models/api/api-request.model';
import { DepartmentDTO } from '@core/db-models/departments/department.dto-model';

// Importaciones del componente.
import { CreateBody } from './models/create-body.model';
import DepartmentsService from './departments.service';

/**
 * @name DepartmentsController
 * @description Controlador que almacena las acciones para administrar los departamentos.
 */
export default class DepartmentsController extends BaseController {
    private departmentsService: DepartmentsService;

    constructor() {
        super('/departments');
        this.departmentsService = new DepartmentsService();
    }

    /**
     * @name initRoutes
     * @description Inicializa las rutas del controlador.
     */
    protected override initRoutes(): void {
        this._router.post(`${this.prefix}/create`, authorize, this.create.bind(this));
    }

    /**
     * @name create
     * @description Gestiona la petición para crear un departamento.
     * @param req - Petición del cliente.
     * @param res - Respuesta de la API.
     */
    public async create(req: Request, res: Response): Promise<any> {
        let request: ApiRequest<CreateBody> = new ApiRequest<CreateBody>();
        let response: ApiResponse<DepartmentDTO> = new ApiResponse<DepartmentDTO>();

        try {
            // Cogemos la petición comprobando a la vez que tenga los campos obligatorios informados.
            request = this.getRequest<DepartmentDTO>(req.body);

            // Comprobamos si los datos la petición tiene los campos obligatorios informados.
            this.checkRequiredData(request.data, 'code', 'name', 'description');

            // Llama al servicio para crear el departamento.
            response.data = await this.departmentsService.createDepartment(request.data as CreateBody);
            response.status = 200;
        } catch (ex) {
            response = this.getResponseException(ex, 'DepartmentsController -> create -> Se ha producido una excepción general no controlada.', request);
        }

        res.status(response.status).json(response);
    }
}
