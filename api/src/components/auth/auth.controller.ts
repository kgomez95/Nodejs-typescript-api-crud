// Librerías.
import { Request, Response } from 'express';

// Importaciones de core.
import BaseController from '@core/base-components/base.controller';
import { ApiResponse } from '@core/models/api/api-response.model';
import { ApiRequest } from '@core/models/api/api-request.model';
import { LoginDTO } from '@core/db-models/logins/login.dto-model';

// Importaciones del componente.
import { LoginBody } from './models/login-body.model';
import AuthService from './auth.service';

/**
 * @name AuthController
 * @description Controlador que almacena las acciones de la parte de autenticación.
 */
export default class AuthController extends BaseController {
    private authService: AuthService;
    
    constructor() {
        super('/auth');
        this.authService = new AuthService();
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
        let response: ApiResponse<LoginDTO> = new ApiResponse<LoginDTO>();

        try {
            // Cogemos la petición comprobando a la vez que tenga los campos obligatorios informados.
            request = this.getRequest<LoginBody>(req.body);

            // Comprobamos si los datos la petición tiene los campos obligatorios informados.
            this.checkRequiredData(request.data, 'username', 'password');

            // Llamamos al servicio para hacer login y construir la respuesta.
            response.data = await this.authService.doLogin(request.data as LoginBody);
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
