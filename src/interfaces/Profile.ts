export interface Profile {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    fechaNacimiento: string; // O Date si vas a manipularla como objeto de fecha
    genero: string;
    ubicacion: string;
    ocupacion: string;
    direccion: string;
    contrasenia: string;
    photoUrl: string;
}