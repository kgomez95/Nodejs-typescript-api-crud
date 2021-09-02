// Librerías.
import { Request, Response } from 'express';

// Importaciones de core.
import BaseController from '@core/base-components/base.controller';
import { authorize } from '@core/middlewares/auth-middleware';

/**
 * @name DepartmentsController
 * @description Controlador que almacena las acciones para administrar los departamentos.
 */
export default class DepartmentsController extends BaseController {
    constructor() {
        super('/departments');
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
        res.status(200).json('Esto es para crear departamentos.');
    }
}
