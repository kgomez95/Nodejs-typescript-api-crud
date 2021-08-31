// Librerías.
import { Request, Response } from 'express';

// Importaciones de core.
import BaseController from '@core/base-components/base.controller';

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
        res.status(200).json({
            message: 'Esto es el login.'
        });
    }
}
