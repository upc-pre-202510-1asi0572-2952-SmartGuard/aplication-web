export interface User {
    id: string;               // viene como "Id" (GUID)
    nombre: string;           // "Nombre"
    apellido: string;         // "Apellido"
    Nickname: string;         // "Nickname"
    contrasenia: string;      // "Contrasenia"
    rutaRostros: string;      // "RutaRostros"
    email: string;            // "Email"
    telefono: string;         // "Telefono"
    fotoPerfil: string;       // "FotoPerfil"
    fechaNacimiento: string;  // "FechaNacimiento" (ISO)
    genero: string;           // "Genero"
    ubicacion: string;        // "Ubicacion"
    ocupacion: string;        // "Ocupacion"
    direccion: string;        // "Direccion"

    // Campos sólo del formulario (frontend-only)
    confirmpassword: string;
    terminos: boolean;
}
