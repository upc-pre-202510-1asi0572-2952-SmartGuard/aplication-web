export interface Member {
    /** En GET vendrá desde el back */
    id?: string;

    /** Campos que el POST espera */
    nombre: string;
    edad: number;
    parentesco?: string;    // opcional si es invitado
    descripcion: string;
    fotoPerfil: string;
    userNickname?: string;// opcional, lo es asignado estático
    userId?: string;
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