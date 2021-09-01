/**
 * @name LoginDTO
 * @description Modelo DTO de login de base de datos.
 */
export class LoginDTO {
    public id: number = 0;
    public username: string = '';
    public password: string = '';
    public enabled: boolean = false;
    public created_at: Date = new Date();
    public updated_at: Date = new Date();

    public token?: string;
}
