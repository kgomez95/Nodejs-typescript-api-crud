// Librerías.
import { Request, Response } from 'express';

// Importaciones de core.
import BaseController from '@core/base-components/base.controller';
import { ApiResponse } from '@core/models/api/api-response.model';
import { ApiRequest } from '@core/models/api/api-request.model';

// Importaciones del componente.
import { LoginBody } from './models/login-body.model';

/**
 * @name AuthController
 * @description Controlador que almacena las acciones de la parte de autenticación.
 */
export default class AuthController extends BaseController {
    constructor() {
        super('/auth');
    }

    /**
     * @name initRoutes
     * @description Inicializa las rutas del controlador.
     */
    protected override initRoutes(): void {
        this._router.post(`${this.prefix}/login`, this.login.bind(this));
    }

    /**
     * @name login
     * @description Gestiona la petición para identificarse en la aplicación.
     * @param req - Petición del cliente.
     * @param res - Respuesta de la API.
     */
    public async login(req: Request, res: Response): Promise<any> {
        let request: ApiRequest<LoginBody> = new ApiRequest<LoginBody>();
        let response: ApiResponse<string> = new ApiResponse<string>();

        try {
            // Cogemos la petición comprobando a la vez que tenga los campos obligatorios informados.
            request = this.getRequest<LoginBody>(req.body);

            // Comprobamos si los datos la petición tiene los campos obligatorios informados.
            this.checkRequiredData(request.data, 'username', 'password');

            // Llamamos al servicio para hacer logins y construir la respuesta.
            response.data = 'Esto es el login.';
            response.status = 200;
        } catch (ex) {
            // NOTE: Si la contraseña viene informada debemos quitarla para no pintarla en los logs.
            if (request.data && request.data.password) request.data.password = '########';
            response = this.getResponseException(ex, 'AuthController -> login -> Se ha producido una excepción general no controlada.', request);
        }
        
        // Devolvemos la respuesta al peticionario.
        res.status(response.status).json(response);
    }
}
