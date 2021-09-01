// Importaciones de core.
import { LoginDTO } from "@core/db-models/logins/login.dto-model";

/**
 * @name Login
 * @description Modelo de login de base de datos.
 */
export class Login {
    public id: number = 0;
    public username: string = '';
    public password: string = '';
    public enabled: boolean = false;
    public created_at: Date = new Date();
    public updated_at: Date = new Date();

    /**
     * @name toDTO
     * @description Mapea el objeto Login a LoginDTO.
     * @param login - Login a mapear.
     * @returns Retorna el login mapeado.
     */
    public static toDTO(login: Login): LoginDTO {
        if (!login) return new LoginDTO();

        return {
            id: login.id,
            username: login.username,
            enabled: login.enabled,
            created_at: login.created_at,
            updated_at: login.updated_at
        };
    }
}
