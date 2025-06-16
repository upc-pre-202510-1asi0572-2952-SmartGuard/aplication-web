export enum MemberRole {
    Familiar = 'Familiar',
    Invitado = 'Invitado',
}
export interface Member {
    id: string
    nombre: string
    edad: number
    parentesco: string
    descripcion: string
    fotoPerfil: string
    userId: string
}
export interface MemberHome {
    id: string
    nombre: string
    edad: number
    parentesco: string
    descripcion: string
    fotoPerfil: string
    userId: string,
    estatus: string
}



