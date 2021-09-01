// Librerías.
import express, { Application } from 'express';
import cors from 'cors';

// Importaciones de core.
import BaseController from '@core/base-components/base.controller';
import MySql from '@core/database';
import { Logger } from '@core/libs';

// Configs.
import AppConfig from '@configs/app.config';

/**
 * @name App
 * @description Clase que inicializa la aplicación.
 */
export default class App {
    private app: Application;

    constructor(controllers: BaseController[]) {
        this.app = express();
        this.useCors();
        this.useExpress();
        this.initControllers(controllers);
    }

    /**
     * @name start
     * @description Hace que la aplicación empiece a escuchar peticiones.
     */
    public start(): void {
        this.app.listen(AppConfig.PORT, () => {
            // Inicializa la conexión con la base de datos.
            MySql.instance;
            Logger.info(`La aplicación está escuchando en http://localhost:${AppConfig.PORT}.`);
        });
    }

    /**
     * @name useCors
     * @description Se configuran las cors en la aplicación.
     */
    private useCors(): void {
        this.app.use(cors());
    }

    /**
     * @name useExpress
     * @description Hace que la aplicación haga uso de express.
     */
    private useExpress(): void {
        this.app.use(express.json());
    }

    /**
     * @name initControllers
     * @description Inicializa las rutas de la aplicación.
     * @param controllers - Listado de controladores para coger sus rutas.
     */
    private initControllers(controllers: BaseController[]): void {
        controllers.forEach((controller: BaseController) => {
            this.app.use(AppConfig.ROUTER_PREFIX, controller.router);
        });
    }
}
