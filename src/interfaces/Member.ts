export interface Member {
    id?: string;
    nombre: string;
    edad: number;
    parentesco?: string;
    descripcion: string;
    fotoPerfil: string;
    userNickname?: string;
    userId?: string;
    dni: string;
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
    dni: string;
}


