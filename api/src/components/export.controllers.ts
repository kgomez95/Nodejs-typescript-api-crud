// Importaciones de core.
import BaseController from '@core/base-components/base.controller';

// Importaciones de componentes.
import AuthController from '@components/auth/auth.controller';

// NOTE: Aquí se crean las instancias de todos los controladores para que el 'server.ts' los obtenga y se los proporcione al 'app.ts'.
const controllers: BaseController[] = [
    new AuthController()
];

export { controllers };
