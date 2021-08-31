// Importaciones de core.
import App from '@core/app';

// Importaciones de componentes.
import { controllers } from '@components/export.controllers';

/**
 * @name Server
 * @description Encargado de crear la instancia de la aplicación e iniciarla.
 */
export default class Server {
    constructor() { }

    /**
     * @name start
     * @description Inicia el servidor.
     */
    public start(): void {
        new App(controllers).start();
    }

}
