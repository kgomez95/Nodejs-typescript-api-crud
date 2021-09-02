// Librerías.
import { RequestHandler } from 'express';

// Importaciones de core.
import AuthMiddleware from '@core/middlewares/auth-middleware/auth.middleware';

// Creamos la instancia del middleware.
const authMiddleware: AuthMiddleware = new AuthMiddleware();

// Cogemos las funciones que nos interesen y las exportamos.
const authorize: RequestHandler = authMiddleware.authorize.bind(authMiddleware);

export { authorize };
