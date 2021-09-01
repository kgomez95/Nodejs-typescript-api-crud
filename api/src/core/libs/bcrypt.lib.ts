// Librerías.
import bcrypt from 'bcrypt';

// Importaciones de core.
import { ApiException } from '@core/exceptions/api.exception';

/**
 * @name BcryptLib
 * @description Interactúa con el módulo bcrypt para encriptar y comprobar cadenas de texto encriptadas.
 */
export default class BcryptLib {
    constructor() { }

    /**
     * @name crypt
     * @description Encripta el valor proporcionado.
     * @param value - Valor a encriptar.
     * @returns Retorna encriptado el valor proporcionado.
     */
    public async crypt(value: string): Promise<string> {
        try {
            let saltValue: string = await bcrypt.genSalt(10);
            let hash: string = await bcrypt.hash(value, saltValue);
            return hash;
        } catch (ex) {
            throw new ApiException(500)
                .setError('ERR-500', 'Se ha producido un error general. Por favor, contacte con un administrador.', 'No se ha podido encriptar el valor proporcionado.')
                .setLogMessage(`BcryptLib -> crypt -> Se ha producido un error al intentar encriptar el valor proporcionado. Hay valor a encriptar: ${(value) ? true : false}`)
                .setException(ex)
                .setAsError();
        }
    }

    /**
     * @name compare
     * @description Compara una cadena normal con una cadena encriptada para ver si el valor coincide.
     * @param value - Cadena normal a comprobar.
     * @param hash - Cadena encriptada a comparar.
     * @returns Retorna "true" si los valores coinciden, "false" en caso de que no coincidan o una excepción en caso de error.
     */
    public async compare(value: string, hash: string): Promise<boolean> {
        try {
            let isValid: boolean = await bcrypt.compare(value, hash);
            return isValid;
        } catch (ex) {
            throw new ApiException(500)
                .setError('ERR-500', 'Se ha producido un error general. Por favor, contacte con un administrador.', 'No se ha podido comprobar el valor encriptado.')
                .setLogMessage(`BcryptLib -> compare -> Se ha producido un error al intentar comparar una cadena encriptada. Hay valor a comprobar: ${(value) ? true : false}; Hay hash para comparar: ${(hash) ? true : false}`)
                .setException(ex)
                .setAsError();
        }
    }
}
