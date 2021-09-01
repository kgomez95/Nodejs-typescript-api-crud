// Importaciones de core.
import { LoginDTO } from '@core/db-models/logins/login.dto-model';
import { Login } from '@core/db-models/logins/login.db-model';
import { Bcrypt, Jwt } from '@core/libs';
import { ApiException } from '@core/exceptions/api.exception';

// Importaciones del componente.
import { LoginBody } from "./models/login-body.model";
import AuthRepository from './auth.repository';

/**
 * @name AuthService
 * @description Servicio de autenticación encargado de gestionar las peticiones que recibe el AuthController.
 */
export default class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    /**
     * @name doLogin
     * @description Coge el login proporcionado de base de datos, comprueba si la contraseña coincide y genera un token de autenticación.
     * @param body - Datos de la petición con el nombre de usuario y la contraseña.
     * @returns Retorna el login y su token de autenticación, o una excepción en caso de error de autenticación o en caso de ocurrir algún problema.
     */
    public async doLogin(body: LoginBody): Promise<LoginDTO> {
        // Cogemos el usuario de base de datos.
        let userDTO: LoginDTO;
        let user: Login = await this.authRepository.getLogin(body.username);

        // Comprobamos si la contraseña es correcta, si es así la vaciamos para no retornarla.
        if (!await Bcrypt.compare(body.password, user.password)) {
            throw new ApiException(401, false)
                .setError('ERR-401', 'La contraseña no es correcta.');
        }

        // Mapeamos el objeto a DTO.
        userDTO = Login.toDTO(user);

        // Generamos el token para el usuario.
        userDTO.token = Jwt.sign(userDTO);

        return userDTO;
    }
}
