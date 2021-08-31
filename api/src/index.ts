// Librerías.
import 'module-alias/register';

// Importaciones de core.
import Server from '@core/server';

// Iniciamos la aplicación.
const server: Server = new Server();
server.start();
