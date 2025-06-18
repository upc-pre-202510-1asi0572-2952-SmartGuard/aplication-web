export interface Home {
    /** Id generado por el backend (GUID) */
    id?: string;

    /** Campos que envías al crear */
    nombre: string;
    direccion: string;
    tipoPropiedad: string;
    habitaciones: number;
    baños: number;
    calefaccion: boolean;
    nickname: string;
    abastecimientoAgua: string;
    proveedorInternet: string;
    sistemaSeguridad: string;
    funcionesInteligentes: number;
    imgUrl: string;
}
