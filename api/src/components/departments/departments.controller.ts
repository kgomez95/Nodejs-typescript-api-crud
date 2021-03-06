// Librerías.
import { Request, Response } from 'express';

// Importaciones de core.
import BaseController from '@core/base-components/base.controller';
import { authorize } from '@core/middlewares/auth-middleware';
import { ApiResponse } from '@core/models/api/api-response.model';
import { ApiRequest } from '@core/models/api/api-request.model';
import { DepartmentDTO } from '@core/db-models/departments/department.dto-model';
import { ApiException } from '@core/exceptions/api.exception';

// Importaciones del componente.
import { CreateBody } from './models/create-body.model';
import DepartmentsService from './departments.service';
import { GetDepartmentsBody } from './models/get-departments-body.model';
import { UpdateBody } from './models/update-body.model';

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
        // NOTE: El 'authorize' es una importación del 'auth-middleware' y su comentido es comprobar que el peticionario
        //       esté identificado en la aplicación antes de proceder a resolver su solicitud.
        this._router.get(`${this.prefix}/get/:id`, authorize, this.get.bind(this));
        this._router.post(`${this.prefix}/getDepartments`, authorize, this.getDepartments.bind(this));
        this._router.post(`${this.prefix}/create`, authorize, this.create.bind(this));
        this._router.put(`${this.prefix}/update/:id`, authorize, this.update.bind(this));
        this._router.delete(`${this.prefix}/delete/:id`, authorize, this.delete.bind(this));
    }

    /**
     * @name get
     * @description Gestiona la petición para coger un departamento.
     * @param req - Petición del cliente.
     * @param res - Respuesta de la API.
     */
    public async get(req: Request, res: Response): Promise<any> {
        let id: number;
        let response: ApiResponse<any> = new ApiResponse<any>();

        try {
            // Cogemos el identificador del departamento a buscar.
            id = Number.parseInt(req.params.id);

            if (!Number.isNaN(id)) {
                // Llamamos al servicio para buscar el departamento.
                response.data = await this.departmentsService.getDepartment(id);
                response.status = 200;
            }
            else {
                throw new ApiException(400)
                    .setError('ERR-400', `El identificador '${req.params.id}' no es válido.`, 'El valor proporcionado no corresponde a un identificador de departamentos.')
                    .setLogMessage(`DepartmentsController -> get -> El identificador proporcionado del departamento no es válido: '${req.params.id}'`)
                    .setAsWarning();
            }
        } catch (ex) {
            response = this.getResponseException(ex, 'DepartmentsController -> get -> Se ha producido una excepción general no controlada.', req.params.id);
        }

        res.status(response.status).json(response);
    }

    /**
     * @name getDepartments
     * @description Gestiona la petición para coger varios departamentos.
     * @param req - Petición del cliente.
     * @param res - Respuesta de la API.
     */
    public async getDepartments(req: Request, res: Response): Promise<any> {
        let request: ApiRequest<GetDepartmentsBody> = new ApiRequest<GetDepartmentsBody>();
        let response: ApiResponse<DepartmentDTO[]> = new ApiResponse<DepartmentDTO[]>();

        try {
            // Cogemos la petición comprobando a la vez que tenga los campos obligatorios informados.
            request = this.getRequest<GetDepartmentsBody>(req.body);

            // Llama al servicio para buscar los departamentos.
            response.data = await this.departmentsService.getDepartments(request.data as GetDepartmentsBody);
            response.status = 200;
        } catch (ex) {
            response = this.getResponseException(ex, 'DepartmentsController -> getDepartments -> Se ha producido una excepción general no controlada.', request);
        }

        res.status(response.status).json(response);
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
            request = this.getRequest<CreateBody>(req.body);

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

    /**
     * @name update
     * @description Gestiona la petición para acualizar un departamento.
     * @param req - Petición del cliente.
     * @param res - Respuesta de la API.
     */
    public async update(req: Request, res: Response): Promise<any> {
        let id: number;
        let request: ApiRequest<UpdateBody> = new ApiRequest<UpdateBody>();
        let response: ApiResponse<DepartmentDTO> = new ApiResponse<DepartmentDTO>();

        try {
            // Cogemos el identificador del departamento a actualizar.
            id = Number.parseInt(req.params.id);

            // Cogemos la petición comprobando a la vez que tenga los campos obligatorios informados.
            request = this.getRequest<UpdateBody>(req.body);

            if (!Number.isNaN(id)) {
                // Llamamos al servicio para actualizar el departamento.
                response.data = await this.departmentsService.updateDepartment(id, request.data as UpdateBody);
                response.status = 200;
            }
            else {
                throw new ApiException(400)
                    .setError('ERR-400', `El identificador '${req.params.id}' no es válido.`, 'El valor proporcionado no corresponde a un identificador de departamentos.')
                    .setLogMessage(`DepartmentsController -> update -> El identificador proporcionado del departamento no es válido: '${req.params.id}'`)
                    .setAsWarning();
            }
        } catch (ex) {
            response = this.getResponseException(ex, 'DepartmentsController -> update -> Se ha producido una excepción general no controlada.', request);
        }

        res.status(response.status).json(response);
    }

    /**
     * @name delete
     * @description Gestiona la petición para borrar un departamento.
     * @param req - Petición del cliente.
     * @param res - Respuesta de la API.
     */
    public async delete(req: Request, res: Response): Promise<any> {
        let id: number;
        let response: ApiResponse<any> = new ApiResponse<any>();

        try {
            // Cogemos el identificador del departamento a borrar.
            id = Number.parseInt(req.params.id);

            if (!Number.isNaN(id)) {
                // Llamamos al servicio para borrar el departamento.
                await this.departmentsService.deleteDepartment(id);
                response.status = 204;
            }
            else {
                throw new ApiException(400)
                    .setError('ERR-400', `El identificador '${req.params.id}' no es válido.`, 'El valor proporcionado no corresponde a un identificador de departamentos.')
                    .setLogMessage(`DepartmentsController -> delete -> El identificador proporcionado del departamento no es válido: '${req.params.id}'`)
                    .setAsWarning();
            }
        } catch (ex) {
            response = this.getResponseException(ex, 'DepartmentsController -> delete -> Se ha producido una excepción general no controlada.', req.params.id);
        }

        res.status(response.status).json(response);
    }
}
