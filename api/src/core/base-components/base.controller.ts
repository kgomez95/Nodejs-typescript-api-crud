// Librerías.
import { Router } from 'express';

/**
 * @name BaseController
 * @description Controlador base de la aplicación.
 */
export default abstract class BaseController {
    protected _router: Router;
    protected prefix: string;

    /**
     * @param prefix - Prefijo de las rutas ("/" por defecto).
     */
    constructor(prefix: string = '/') {
        this._router = Router();
        this.prefix = prefix;
        this.initRoutes();
    }

    /**
     * @name initRoutes
     * @description Inicializa las rutas del controlador.
     */
    protected abstract initRoutes(): void;

    /**
     * @name router
     * @description Coge el objeto router del controlador.
     */
    public get router(): Router {
        return this._router;
    }
}
